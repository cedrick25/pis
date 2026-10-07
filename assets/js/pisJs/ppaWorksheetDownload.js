/**
 * Download the PPA worksheet print HTML as a PDF or an editable Word file.
 * PDF pages keep the print layout. Word is real document text (paragraphs
 * and tables), not a picture of the PDF.
 */
(function (global) {
    "use strict";

    var JPEG_QUALITY = 0.92;
    var A4_W_MM = 210;
    var A4_H_MM = 297;
    var exportFont = "Arial";
    var exportFlow = false;
    var seenRunningHeader = false;
    var docHasCover = false;

    function saveBlob(blob, filename) {
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(function () {
            URL.revokeObjectURL(url);
        }, 2500);
    }

    function isIgnorable(node) {
        if (!node) return true;
        if (node.nodeType === 8) return true;
        if (node.nodeType === 3) return !node.nodeValue || !String(node.nodeValue).trim();
        return false;
    }

    function isPrintPage(node) {
        return node && node.nodeType === 1 && node.classList && node.classList.contains("print-page");
    }

    function isSplittableTable(node) {
        if (!node || node.nodeType !== 1 || node.tagName !== "TABLE" || !node.rows) return false;
        var bodyRows = 0;
        for (var i = 0; i < node.rows.length; i++) {
            if (node.rows[i].parentNode && node.rows[i].parentNode.tagName !== "THEAD") bodyRows++;
        }
        return bodyRows > 1;
    }

    function isSplittableElement(node) {
        if (!node || node.nodeType !== 1) return false;
        if (node.tagName === "TABLE" || node.tagName === "TR" || node.tagName === "TD" || node.tagName === "TH") return false;
        if (node.classList && node.classList.contains("field-line")) return false;
        var elements = 0;
        for (var i = 0; i < node.childNodes.length; i++) {
            var child = node.childNodes[i];
            if (child.nodeType === 3 && child.nodeValue && String(child.nodeValue).trim()) return false;
            if (child.nodeType === 1) elements++;
        }
        return elements > 1;
    }

    function fits(content) {
        return content.scrollHeight <= content.clientHeight + 2;
    }

    function shellIsEmpty(node) {
        if (!node || node.nodeType !== 1 || node.getAttribute("data-ws-shell") !== "1") return false;
        if (node.children && node.children.length) return false;
        return !node.textContent || !String(node.textContent).trim();
    }

    function trimShells(content) {
        var nodes = Array.prototype.slice.call(content.childNodes);
        for (var i = 0; i < nodes.length; i++) {
            if (shellIsEmpty(nodes[i])) content.removeChild(nodes[i]);
        }
    }

    function contentIsEmpty(content) {
        trimShells(content);
        for (var i = 0; i < content.childNodes.length; i++) {
            if (!isIgnorable(content.childNodes[i])) return false;
        }
        return true;
    }

    function makePage(doc, host) {
        var page = doc.createElement("div");
        page.className = "ws-export-page";
        page.style.cssText = "width:210mm;height:297mm;box-sizing:border-box;background:#ffffff;padding:12mm 11mm;overflow:hidden;position:relative;";
        var content = doc.createElement("div");
        content.className = "ws-export-content sheet";
        content.style.cssText = "width:100%;height:100%;max-width:none;margin:0;padding:0;overflow:hidden;box-sizing:border-box;";
        page.appendChild(content);
        host.appendChild(page);
        return { page: page, content: content };
    }

    function markSlice(state) {
        state.page.setAttribute("data-slice", "1");
        state.page.style.height = "auto";
        state.page.style.overflow = "visible";
        state.content.style.height = "auto";
        state.content.style.overflow = "visible";
    }

    function breakPage(state) {
        if (state.pages.length > 50) throw new Error("Worksheet is too long to export.");
        if (!contentIsEmpty(state.content)) {
            state.pages.push(state.page);
        } else if (state.page.parentNode) {
            state.page.parentNode.removeChild(state.page);
        }
        var made = makePage(state.doc, state.host);
        state.page = made.page;
        state.content = made.content;
        return state;
    }

    function cloneTableShell(table) {
        var doc = table.ownerDocument;
        var clone = table.cloneNode(false);
        var groups = table.getElementsByTagName("colgroup");
        for (var i = 0; i < groups.length; i++) {
            if (groups[i].parentNode === table) clone.appendChild(groups[i].cloneNode(true));
        }
        if (table.tHead) clone.appendChild(table.tHead.cloneNode(true));
        var tbody = doc.createElement("tbody");
        clone.appendChild(tbody);
        return { table: clone, tbody: tbody };
    }

    function bodyRowsOf(table) {
        var rows = [];
        for (var i = 0; i < table.rows.length; i++) {
            var parentTag = table.rows[i].parentNode && table.rows[i].parentNode.tagName;
            if (parentTag !== "THEAD") rows.push(table.rows[i]);
        }
        return rows;
    }

    function splitTable(table, state) {
        var rows = bodyRowsOf(table);
        if (!rows.length) {
            state.content.appendChild(table);
            if (!fits(state.content)) markSlice(state);
            return state;
        }
        var parts = null;
        function startTable() {
            parts = cloneTableShell(table);
            state.content.appendChild(parts.table);
        }
        startTable();
        for (var i = 0; i < rows.length; i++) {
            parts.tbody.appendChild(rows[i]);
            if (fits(state.content)) continue;
            parts.tbody.removeChild(rows[i]);
            if (parts.tbody.rows.length) {
                state = breakPage(state);
                startTable();
                parts.tbody.appendChild(rows[i]);
                if (!fits(state.content)) {
                    markSlice(state);
                    state = breakPage(state);
                    startTable();
                }
            } else {
                parts.tbody.appendChild(rows[i]);
                markSlice(state);
                state = breakPage(state);
                startTable();
            }
        }
        if (parts && parts.table.parentNode && parts.tbody.rows.length === 0) {
            parts.table.parentNode.removeChild(parts.table);
        }
        return state;
    }

    function startShell(node, state) {
        var shell = node.cloneNode(false);
        shell.style.minHeight = "0";
        shell.setAttribute("data-ws-shell", "1");
        state.content.appendChild(shell);
        return shell;
    }

    function splitChildren(node, state) {
        var kids = Array.prototype.slice.call(node.childNodes);
        var shell = startShell(node, state);
        for (var i = 0; i < kids.length; i++) {
            var kid = kids[i];
            if (isIgnorable(kid)) continue;
            shell.appendChild(kid);
            if (fits(state.content)) continue;
            shell.removeChild(kid);
            if (shellIsEmpty(shell) || !shell.textContent.trim() && shell.children.length === 0) {
                if (isSplittableTable(kid)) {
                    if (shell.parentNode) shell.parentNode.removeChild(shell);
                    state = splitTable(kid, state);
                    shell = startShell(node, state);
                    continue;
                }
                if (isSplittableElement(kid)) {
                    if (shell.parentNode) shell.parentNode.removeChild(shell);
                    state = splitChildren(kid, state);
                    shell = startShell(node, state);
                    continue;
                }
                shell.appendChild(kid);
                if (!fits(state.content)) markSlice(state);
                state = breakPage(state);
                shell = startShell(node, state);
                continue;
            }
            state = breakPage(state);
            shell = startShell(node, state);
            shell.appendChild(kid);
            if (!fits(state.content)) {
                shell.removeChild(kid);
                if (shell.parentNode) shell.parentNode.removeChild(shell);
                if (isSplittableTable(kid)) state = splitTable(kid, state);
                else if (isSplittableElement(kid)) state = splitChildren(kid, state);
                else {
                    shell = startShell(node, state);
                    shell.appendChild(kid);
                    if (!fits(state.content)) markSlice(state);
                    state = breakPage(state);
                }
                shell = startShell(node, state);
            }
        }
        if (shell && shell.parentNode && (shellIsEmpty(shell) || (!shell.textContent.trim() && shell.children.length === 0))) {
            shell.parentNode.removeChild(shell);
        }
        return state;
    }

    function placeBlock(node, state) {
        if (isIgnorable(node)) return state;
        var printPage = isPrintPage(node);
        if (printPage && !contentIsEmpty(state.content)) state = breakPage(state);

        state.content.appendChild(node);
        if (fits(state.content)) {
            if (printPage) state = breakPage(state);
            return state;
        }
        state.content.removeChild(node);

        if (!contentIsEmpty(state.content)) {
            state = breakPage(state);
            state.content.appendChild(node);
            if (fits(state.content)) {
                if (printPage) state = breakPage(state);
                return state;
            }
            state.content.removeChild(node);
        }

        if (printPage) {
            node.style.minHeight = "0";
            state.content.appendChild(node);
            if (fits(state.content)) {
                state = breakPage(state);
                return state;
            }
            state.content.removeChild(node);
        }

        if (isSplittableTable(node)) return splitTable(node, state);
        if (isSplittableElement(node)) return splitChildren(node, state);

        state.content.appendChild(node);
        if (!fits(state.content)) markSlice(state);
        if (printPage) state = breakPage(state);
        return state;
    }

    function paginate(doc) {
        var sheet = doc.querySelector(".sheet");
        if (!sheet) throw new Error("Worksheet layout was empty.");
        var host = doc.createElement("div");
        host.id = "ws-export-host";
        doc.body.appendChild(host);
        var made = makePage(doc, host);
        var state = {
            doc: doc,
            host: host,
            page: made.page,
            content: made.content,
            pages: []
        };
        var metrics = {
            pageW: made.page.offsetWidth,
            pageH: made.page.offsetHeight,
            padX: made.page.clientLeft || 0,
            padY: made.page.clientTop || 0
        };
        metrics.padX = Math.max(0, Math.round((metrics.pageW - made.content.clientWidth) / 2));
        metrics.padY = Math.max(0, Math.round((metrics.pageH - made.content.clientHeight) / 2));

        var nodes = Array.prototype.slice.call(sheet.childNodes);
        sheet.style.display = "none";
        for (var i = 0; i < nodes.length; i++) {
            state = placeBlock(nodes[i], state);
        }
        if (made.content.clientHeight < 50 || made.page.offsetWidth < 50) {
            throw new Error("Could not measure the worksheet page.");
        }
        if (!contentIsEmpty(state.content)) state.pages.push(state.page);
        else if (state.page.parentNode) state.page.parentNode.removeChild(state.page);
        if (!state.pages.length) throw new Error("Worksheet layout was empty.");
        return { pages: state.pages, metrics: metrics };
    }

    function canvasToJpeg(canvas) {
        return canvas.toDataURL("image/jpeg", JPEG_QUALITY);
    }

    function sliceOntoA4(contentCanvas, metrics) {
        var scale = 2;
        var images = [];
        var pageW = metrics.pageW * scale;
        var pageH = metrics.pageH * scale;
        var padX = metrics.padX * scale;
        var padY = metrics.padY * scale;
        var sliceH = Math.max(1, (metrics.pageH - metrics.padY * 2) * scale);
        var y = 0;
        while (y < contentCanvas.height - 2) {
            var pageCanvas = document.createElement("canvas");
            pageCanvas.width = pageW;
            pageCanvas.height = pageH;
            var ctx = pageCanvas.getContext("2d");
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
            var h = Math.min(sliceH, contentCanvas.height - y);
            ctx.drawImage(contentCanvas, 0, y, contentCanvas.width, h, padX, padY, contentCanvas.width, h);
            images.push(canvasToJpeg(pageCanvas));
            y += sliceH;
        }
        return images;
    }

    function captureElement(el) {
        return global.html2canvas(el, {
            scale: 2,
            backgroundColor: "#ffffff",
            useCORS: true,
            logging: false,
            width: el.offsetWidth,
            height: el.offsetHeight
        });
    }

    function capturePages(doc) {
        var laid = paginate(doc);
        var images = [];
        var chain = Promise.resolve();
        laid.pages.forEach(function (page) {
            chain = chain.then(function () {
                if (page.getAttribute("data-slice") === "1") {
                    var content = page.querySelector(".ws-export-content");
                    return captureElement(content).then(function (canvas) {
                        sliceOntoA4(canvas, laid.metrics).forEach(function (url) {
                            images.push(url);
                        });
                    });
                }
                return captureElement(page).then(function (canvas) {
                    images.push(canvasToJpeg(canvas));
                });
            });
        });
        return chain.then(function () {
            if (!images.length) throw new Error("Worksheet pages could not be drawn.");
            return images;
        });
    }

    function renderWorksheetImages(html) {
        return new Promise(function (resolve, reject) {
            var iframe = document.createElement("iframe");
            iframe.setAttribute("aria-hidden", "true");
            iframe.setAttribute("title", "Worksheet export");
            iframe.style.cssText = "position:fixed;left:-12000px;top:0;width:220mm;height:320mm;border:0;background:#fff;";
            var settled = false;
            function finish(err, images) {
                if (settled) return;
                settled = true;
                if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
                if (err) reject(err);
                else resolve(images);
            }
            var started = false;
            function begin() {
                if (started || settled) return;
                var doc = iframe.contentDocument;
                if (!doc || !doc.body || !doc.querySelector(".sheet")) return;
                started = true;
                global.requestAnimationFrame(function () {
                    global.requestAnimationFrame(function () {
                        try {
                            capturePages(doc).then(function (images) {
                                finish(null, images);
                            }, function (err) {
                                finish(err || new Error("Could not draw the worksheet."));
                            });
                        } catch (err) {
                            finish(err);
                        }
                    });
                });
            }
            iframe.onload = begin;
            document.body.appendChild(iframe);
            var doc = iframe.contentDocument || iframe.contentWindow.document;
            doc.open();
            doc.write(html);
            doc.close();
            global.setTimeout(begin, 60);
            global.setTimeout(function () {
                if (!started && !settled) finish(new Error("Worksheet preview did not load."));
            }, 5000);
        });
    }

    function buildPdfBlob(images) {
        if (typeof global.jsPDF !== "function") throw new Error("jsPDF is not loaded.");
        var doc = new global.jsPDF("p", "mm", "a4");
        for (var i = 0; i < images.length; i++) {
            if (i > 0) doc.addPage();
            doc.addImage(images[i], "JPEG", 0, 0, A4_W_MM, A4_H_MM, "ws" + i, "FAST");
        }
        var blob = doc.output("blob");
        if (!blob || blob.size < 1000) throw new Error("PDF was empty.");
        return blob;
    }

    function xmlEscape(value) {
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
    }

    function hasClass(node, name) {
        return !!(node && node.nodeType === 1 && node.classList && node.classList.contains(name));
    }

    function isBlockTag(node) {
        if (!node || node.nodeType !== 1) return false;
        var tag = node.tagName;
        return tag === "DIV" || tag === "P" || tag === "TABLE" || tag === "UL" || tag === "OL" || tag === "LI" ||
            tag === "H1" || tag === "H2" || tag === "H3" || tag === "SECTION" ||
            tag === "HEADER" || tag === "FOOTER" || tag === "ARTICLE";
    }

    function skipNode(node) {
        if (hasClass(node, "dot") || hasClass(node, "pdot") || hasClass(node, "clr") || hasClass(node, "cover-hdr-center-spacer")) {
            return true;
        }
        if (!exportFlow || !node || node.nodeType !== 1) return false;
        return hasClass(node, "photo-ph") || hasClass(node, "mast-gutter") ||
            hasClass(node, "cover-hdr-red-rule-full") || hasClass(node, "cover-signature-gap") ||
            hasClass(node, "cover-footer-graphic") || hasClass(node, "cover-hdr-left") ||
            hasClass(node, "cover-hdr-logos-pair") || hasClass(node, "of3-document-page") ||
            hasClass(node, "of3-tabgap") || hasClass(node, "ruled-line") || hasClass(node, "of3-ruled") ||
            hasClass(node, "cover-emspace");
    }

    function containsBlockChild(node) {
        for (var i = 0; i < node.childNodes.length; i++) {
            var child = node.childNodes[i];
            if (child.nodeType === 1 && isBlockTag(child)) return true;
        }
        return false;
    }

    function isSideBySide(node) {
        return hasClass(node, "waiver-top") || hasClass(node, "witness-row") || hasClass(node, "sign-grid");
    }

    function isBoldNode(node) {
        if (!node || node.nodeType !== 1) return false;
        if (node.tagName === "B" || node.tagName === "STRONG" || node.tagName === "TH") return true;
        return hasClass(node, "section-num") || hasClass(node, "subsection") || hasClass(node, "hdr-main") ||
            hasClass(node, "section-title") || hasClass(node, "cert-title") || hasClass(node, "waiver-title") ||
            hasClass(node, "cert-folio") || hasClass(node, "waiver-form-label") || hasClass(node, "waiver-code") ||
            hasClass(node, "sign-label") || hasClass(node, "col-title-under") ||
            hasClass(node, "sec-head") || hasClass(node, "sub-sec-head") || hasClass(node, "of3-sec") ||
            hasClass(node, "psir-banner") || hasClass(node, "of3-banner") || hasClass(node, "cover-hdr-ppa");
    }

    function isUnderlineNode(node) {
        return hasClass(node, "uline") || hasClass(node, "blank") || hasClass(node, "item-blank") ||
            hasClass(node, "filled-name") || hasClass(node, "sign-rule") || hasClass(node, "ul") ||
            hasClass(node, "of3-ul") || hasClass(node, "of3-hfill");
    }

    function styleOf(node) {
        var align = "";
        var bold = false;
        var italic = false;
        var sz = 20;
        var justify = false;
        var before = 40;
        var after = 40;
        var n = node;
        while (n && n.nodeType === 1) {
            if (!align) {
                if (hasClass(n, "meta-id") || hasClass(n, "sign-right")) align = "right";
                else if (
                    hasClass(n, "hdr-center") || hasClass(n, "hdr-main") || hasClass(n, "section-title") ||
                    hasClass(n, "cert-title") || hasClass(n, "waiver-title") || hasClass(n, "cert-body") ||
                    hasClass(n, "cert-line") || hasClass(n, "intro-line") || hasClass(n, "jurat") ||
                    hasClass(n, "sign-page-center") || hasClass(n, "sign-center") || hasClass(n, "col-title-under") ||
                    hasClass(n, "psir-banner") || hasClass(n, "of3-banner") || hasClass(n, "cover-hdr-center") ||
                    hasClass(n, "cover-hdr-line") || hasClass(n, "cover-hdr-center-stack") || hasClass(n, "cover-hdr-addr")
                ) align = "center";
            }
            if (hasClass(n, "legal-para") || hasClass(n, "justified")) justify = true;
            if (isBoldNode(n)) bold = true;
            if (hasClass(n, "meta-id") || hasClass(n, "sign-hint") || hasClass(n, "muted-label")) italic = true;
            if (hasClass(n, "cert-page") || hasClass(n, "waiver-page") || hasClass(n, "hdr-main") || hasClass(n, "section-title")) sz = 22;
            if (hasClass(n, "field-line")) {
                before = 20;
                after = 20;
            } else if (hasClass(n, "section-num") || hasClass(n, "section-title") || hasClass(n, "subsection")) {
                before = 160;
                after = 60;
            }
            n = n.parentNode;
        }
        if (!align) align = justify ? "both" : "left";
        return { align: align, bold: bold, italic: italic, sz: sz, before: before, after: after };
    }

    function normalizeText(value) {
        return String(value == null ? "" : value)
            .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
            .replace(/\u00a0/g, " ")
            .replace(/[ \t\r\n]+/g, " ");
    }

    function blankText(node) {
        if (hasClass(node, "sign-rule")) return "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0";
        if (hasClass(node, "short")) return "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0";
        if (hasClass(node, "item-blank")) return "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0";
        return "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0";
    }

    function runXml(text, props) {
        props = props || {};
        var font = props.font || exportFont;
        var sz = props.sz || 20;
        var rPr = '<w:rFonts w:ascii="' + xmlEscape(font) + '" w:hAnsi="' + xmlEscape(font) + '" w:cs="' + xmlEscape(font) + '"/>' +
            "<w:sz w:val=\"" + sz + "\"/><w:szCs w:val=\"" + sz + "\"/>";
        if (props.bold) rPr += "<w:b/><w:bCs/>";
        if (props.italic) rPr += "<w:i/><w:iCs/>";
        if (props.underline) rPr += '<w:u w:val="single"/>';
        return "<w:r><w:rPr>" + rPr + "</w:rPr><w:t xml:space=\"preserve\">" + xmlEscape(text) + "</w:t></w:r>";
    }

    function paraXml(runs, style, pageBreak) {
        style = style || {};
        var align = style.align || "left";
        var pr = "";
        if (pageBreak) pr += "<w:pageBreakBefore/>";
        if (align === "center" || align === "right" || align === "both") pr += '<w:jc w:val="' + align + '"/>';
        pr += '<w:spacing w:before="0" w:after="0" w:line="480" w:lineRule="auto"/>';
        return "<w:p><w:pPr>" + pr + "</w:pPr>" + (runs || "") + "</w:p>";
    }

    function injectPageBreak(xml) {
        if (!xml) return paraXml("", {}, true);
        if (xml.indexOf("<w:p>") === 0) {
            if (xml.indexOf("<w:p><w:pPr>") === 0) return xml.replace("<w:p><w:pPr>", "<w:p><w:pPr><w:pageBreakBefore/>");
            return "<w:p><w:pPr><w:pageBreakBefore/></w:pPr>" + xml.substring(4);
        }
        return paraXml("", { before: 0, after: 0 }, true) + xml;
    }

    function paragraphsFromInline(node, style) {
        var paragraphs = [];
        var runs = "";
        var broke = false;
        var endedWithSpace = true;
        function flush(force) {
            if (!runs && !force) return;
            paragraphs.push(paraXml(runs, style, broke));
            runs = "";
            broke = false;
        }
        function walk(n, props) {
            if (!n || skipNode(n)) return;
            if (n.nodeType === 3) {
                var text = normalizeText(n.nodeValue);
                if (text) {
                    endedWithSpace = /\s$/.test(text);
                    runs += runXml(text, props);
                }
                return;
            }
            if (n.nodeType !== 1) return;
            if (n.tagName === "BR") {
                flush(true);
                return;
            }
            if (n.tagName === "IMG" || n.tagName === "SVG") return;
            var next = {
                bold: props.bold || isBoldNode(n),
                italic: props.italic || hasClass(n, "meta-id") || hasClass(n, "sign-hint"),
                underline: props.underline,
                sz: props.sz,
                font: props.font
            };
            if (hasClass(n, "chk") || hasClass(n, "pch")) {
                runs += runXml(hasClass(n, "on") ? "\u2611 " : "\u2610 ", {
                    font: "Segoe UI Symbol",
                    sz: next.sz,
                    bold: next.bold
                });
                for (var c = 0; c < n.childNodes.length; c++) walk(n.childNodes[c], next);
                runs += runXml("  ", next);
                return;
            }
            if (isUnderlineNode(n)) {
                var value = normalizeText(n.textContent).trim();
                var shown = value ? value : blankText(n);
                if (value && value.length < 6) shown = value + "\u00A0\u00A0\u00A0\u00A0";
                if (shown && !/^\s/.test(shown) && !endedWithSpace) shown = " " + shown;
                endedWithSpace = /\s$/.test(shown);
                runs += runXml(shown, {
                    bold: next.bold,
                    italic: next.italic,
                    underline: true,
                    sz: next.sz
                });
                return;
            }
            for (var i = 0; i < n.childNodes.length; i++) walk(n.childNodes[i], next);
        }
        walk(node, {
            bold: !!style.bold,
            italic: !!style.italic,
            underline: false,
            sz: style.sz || 20
        });
        flush(false);
        return paragraphs;
    }

    function tableHasBorder(table) {
        var cell = table.querySelector("td, th");
        if (!cell || !table.ownerDocument.defaultView) return false;
        var cs = table.ownerDocument.defaultView.getComputedStyle(cell);
        var width = parseFloat(cs.borderTopWidth);
        return width > 0 && cs.borderTopStyle !== "none" && cs.borderTopStyle !== "hidden";
    }

    function borderXml(on) {
        var val = on ? "single" : "nil";
        var edge = '<w:' + "EDGE" + ' w:val="' + val + '" w:sz="4" w:space="0" w:color="000000"/>';
        return "<w:tblBorders>" +
            edge.replace("EDGE", "top") + edge.replace("EDGE", "left") +
            edge.replace("EDGE", "bottom") + edge.replace("EDGE", "right") +
            edge.replace("EDGE", "insideH") + edge.replace("EDGE", "insideV") +
            "</w:tblBorders>";
    }

    function cellXml(cell, widthPct, bordered) {
        var blocks = [];
        for (var i = 0; i < cell.childNodes.length; i++) {
            blocks = blocks.concat(emitNode(cell.childNodes[i]));
        }
        if (!blocks.length) blocks.push(paraXml("", styleOf(cell), false));
        if (blocks[blocks.length - 1].indexOf("<w:tbl>") === 0 || blocks[blocks.length - 1].indexOf("<w:tbl ") === 0) {
            blocks.push(paraXml("", {}, false));
        }
        var span = cell.colSpan && cell.colSpan > 1 ? '<w:gridSpan w:val="' + cell.colSpan + '"/>' : "";
        var shd = cell.tagName === "TH" ? '<w:shd w:val="clear" w:color="auto" w:fill="F2F2F2"/>' : "";
        var borders = "";
        if (!bordered) {
            borders = "<w:tcBorders>" +
                '<w:top w:val="nil"/><w:left w:val="nil"/><w:bottom w:val="nil"/><w:right w:val="nil"/>' +
                "</w:tcBorders>";
        }
        return "<w:tc><w:tcPr><w:tcW w:w=\"" + widthPct + "\" w:type=\"pct\"/>" + span + shd + borders +
            '<w:tcMar><w:top w:w="40" w:type="dxa"/><w:left w:w="60" w:type="dxa"/><w:bottom w:w="40" w:type="dxa"/><w:right w:w="60" w:type="dxa"/></w:tcMar>' +
            "</w:tcPr>" + blocks.join("") + "</w:tc>";
    }

    function tableXml(table, forceBorder) {
        var bordered = forceBorder == null ? tableHasBorder(table) : forceBorder;
        var rows = [];
        for (var r = 0; r < table.rows.length; r++) {
            var cells = table.rows[r].cells;
            var count = 0;
            for (var n = 0; n < cells.length; n++) count += cells[n].colSpan || 1;
            if (!count) count = 1;
            var base = Math.floor(5000 / count);
            var used = 0;
            var tds = "";
            for (var c = 0; c < cells.length; c++) {
                var spanN = cells[c].colSpan || 1;
                var width = c === cells.length - 1 ? 5000 - used : base * spanN;
                used += width;
                tds += cellXml(cells[c], width, bordered);
            }
            if (tds) rows.push("<w:tr>" + tds + "</w:tr>");
        }
        if (!rows.length) return "";
        var cols = 1;
        for (var rc = 0; rc < table.rows.length; rc++) {
            var spanSum = 0;
            var rowCells = table.rows[rc].cells;
            for (var cc = 0; cc < rowCells.length; cc++) spanSum += rowCells[cc].colSpan || 1;
            if (spanSum > cols) cols = spanSum;
        }
        var grid = "";
        var colW = Math.floor(10600 / cols);
        for (var g = 0; g < cols; g++) grid += '<w:gridCol w:w="' + colW + '"/>';
        return "<w:tbl><w:tblPr><w:tblW w:w=\"5000\" w:type=\"pct\"/>" + borderXml(bordered) +
            '<w:tblLayout w:type="fixed"/></w:tblPr><w:tblGrid>' + grid + "</w:tblGrid>" + rows.join("") + "</w:tbl>";
    }

    function sideBySideXml(node) {
        var kids = [];
        for (var i = 0; i < node.childNodes.length; i++) {
            if (node.childNodes[i].nodeType === 1) kids.push(node.childNodes[i]);
        }
        if (kids.length < 2) return emitChildren(node);
        var base = Math.floor(5000 / kids.length);
        var used = 0;
        var tds = "";
        for (var c = 0; c < kids.length; c++) {
            var width = c === kids.length - 1 ? 5000 - used : base;
            used += width;
            var blocks = emitNode(kids[c]);
            if (!blocks.length) blocks.push(paraXml("", styleOf(kids[c]), false));
            tds += "<w:tc><w:tcPr><w:tcW w:w=\"" + width + "\" w:type=\"pct\"/>" +
                '<w:tcBorders><w:top w:val="nil"/><w:left w:val="nil"/><w:bottom w:val="nil"/><w:right w:val="nil"/></w:tcBorders>' +
                "</w:tcPr>" + blocks.join("") + "</w:tc>";
        }
        var grid = "";
        var colW = Math.floor(10600 / kids.length);
        for (var g = 0; g < kids.length; g++) grid += '<w:gridCol w:w="' + colW + '"/>';
        return ["<w:tbl><w:tblPr><w:tblW w:w=\"5000\" w:type=\"pct\"/>" + borderXml(false) +
            '</w:tblPr><w:tblGrid>' + grid + "</w:tblGrid><w:tr>" + tds + "</w:tr></w:tbl>"];
    }

    function emitChildren(node) {
        var blocks = [];
        var inline = [];
        var children = Array.prototype.slice.call(node.childNodes);
        function flushInline() {
            if (!inline.length) return;
            var doc = node.ownerDocument;
            var holder = doc.createElement("div");
            for (var i = 0; i < inline.length; i++) holder.appendChild(inline[i]);
            inline = [];
            blocks = blocks.concat(paragraphsFromInline(holder, styleOf(node)));
        }
        for (var c = 0; c < children.length; c++) {
            var child = children[c];
            if (child.nodeType === 1 && isBlockTag(child)) {
                flushInline();
                blocks = blocks.concat(emitNode(child));
            } else {
                inline.push(child);
            }
        }
        flushInline();
        return blocks;
    }

    function emitNode(node) {
        if (!node || node.nodeType === 8 || skipNode(node)) return [];
        if (exportFlow && hasClass(node, "of3-hdr")) {
            if (seenRunningHeader) return [];
            seenRunningHeader = true;
        }
        if (exportFlow && docHasCover && hasClass(node, "mast")) return [];
        if (node.nodeType === 3) {
            var text = normalizeText(node.nodeValue);
            if (!text.trim()) return [];
            return [paraXml(runXml(text, { sz: 20 }), {}, false)];
        }
        if (node.nodeType !== 1) return [];
        if (node.tagName === "IMG" || node.tagName === "SVG") return [];
        if (node.tagName === "TABLE") {
            if (exportFlow && (hasClass(node, "of3-hdr-t") || hasClass(node, "meta-hdr"))) {
                return flattenChromeTable(node);
            }
            var table = tableXml(node);
            return table ? [table] : [];
        }
        if (hasClass(node, "cover-footer-cert-lines")) {
            var certLines = [];
            for (var cert = 0; cert < node.childNodes.length; cert++) {
                certLines = certLines.concat(emitNode(node.childNodes[cert]));
            }
            return certLines;
        }
        if (hasClass(node, "sign-rule") || hasClass(node, "ruled-line") || hasClass(node, "of3-rec-sign-rule") || hasClass(node, "rule")) {
            return [paraXml(runXml(blankText(node), { underline: true, sz: styleOf(node).sz }), styleOf(node), false)];
        }
        if (isSideBySide(node)) return sideBySideXml(node);
        var blocks;
        if (hasClass(node, "waiver-item")) blocks = paragraphsFromInline(node, styleOf(node));
        else if (isBlockTag(node) && containsBlockChild(node)) blocks = emitChildren(node);
        else if (isBlockTag(node) || node.tagName === "SPAN") blocks = paragraphsFromInline(node, styleOf(node));
        else blocks = emitChildren(node);
        if (!exportFlow && hasClass(node, "print-page") && blocks.length) blocks[0] = injectPageBreak(blocks[0]);
        if (!exportFlow && hasClass(node, "page-break-after") && blocks.length) {
            blocks.push(paraXml("", { before: 0, after: 0 }, true));
        }
        return blocks;
    }

    function flattenChromeTable(table) {
        var blocks = [];
        var cells = table.querySelectorAll("td, th");
        for (var i = 0; i < cells.length; i++) {
            var kids = Array.prototype.slice.call(cells[i].childNodes);
            for (var k = 0; k < kids.length; k++) {
                var child = kids[k];
                if (child.nodeType === 1 && /^p\.\s*\d+$/i.test(normalizeText(child.textContent).trim())) continue;
                blocks = blocks.concat(emitNode(child));
            }
        }
        return blocks;
    }

    function worksheetBodyXml(doc) {
        exportFlow = !!doc.querySelector(".psir-cover-sheet, .sheet-of3, .of3-page");
        seenRunningHeader = false;
        docHasCover = !!doc.querySelector(".psir-cover-sheet");
        exportFont = exportFlow ? "Times New Roman" : "Arial";
        if (!doc.body) throw new Error("Worksheet layout was empty.");
        var blocks = [];
        var children = Array.prototype.slice.call(doc.body.childNodes);
        for (var i = 0; i < children.length; i++) {
            blocks = blocks.concat(emitNode(children[i]));
        }
        if (!blocks.length) throw new Error("Worksheet layout was empty.");
        return blocks.join("") +
            "<w:sectPr>" +
            '<w:pgSz w:w="11906" w:h="16838"/>' +
            '<w:pgMar w:top="680" w:right="624" w:bottom="680" w:left="624" w:header="0" w:footer="0" w:gutter="0"/>' +
            "</w:sectPr>";
    }

    function packageDocx(bodyXml, title) {
        if (typeof global.JSZip !== "function") {
            return Promise.reject(new Error("JSZip is not loaded."));
        }
        var zip = new global.JSZip();
        zip.file(
            "[Content_Types].xml",
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
                '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
                '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>' +
                '<Default Extension="xml" ContentType="application/xml"/>' +
                '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>' +
                '<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>' +
                "</Types>"
        );
        zip.file(
            "_rels/.rels",
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
                '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
                '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>' +
                '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>' +
                "</Relationships>"
        );
        zip.file(
            "docProps/core.xml",
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
                '<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/">' +
                "<dc:title>" + xmlEscape(title || "PPA Worksheet") + "</dc:title><dc:creator>PIS</dc:creator>" +
                "</cp:coreProperties>"
        );
        zip.file(
            "word/_rels/document.xml.rels",
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
                '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"></Relationships>'
        );
        zip.file(
            "word/document.xml",
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
                '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">' +
                "<w:body>" + bodyXml + "</w:body></w:document>"
        );
        return zip.generateAsync({
            type: "blob",
            mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        }).then(function (blob) {
            if (!blob || blob.size < 200) throw new Error("Word file was empty.");
            return blob;
        });
    }

    function readWorksheetDocument(html) {
        return new Promise(function (resolve, reject) {
            var iframe = document.createElement("iframe");
            iframe.setAttribute("aria-hidden", "true");
            iframe.setAttribute("title", "Worksheet export");
            iframe.style.cssText = "position:fixed;left:-12000px;top:0;width:220mm;height:320mm;border:0;background:#fff;";
            var settled = false;
            var started = false;
            function finish(err, value) {
                if (settled) return;
                settled = true;
                if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
                if (err) reject(err);
                else resolve(value);
            }
            function begin() {
                if (started || settled) return;
                var doc = iframe.contentDocument;
                if (!doc || !doc.body || !doc.querySelector(".sheet")) return;
                started = true;
                global.requestAnimationFrame(function () {
                    try {
                        finish(null, worksheetBodyXml(doc));
                    } catch (err) {
                        finish(err);
                    }
                });
            }
            iframe.onload = begin;
            document.body.appendChild(iframe);
            var doc = iframe.contentDocument || iframe.contentWindow.document;
            doc.open();
            doc.write(html);
            doc.close();
            global.setTimeout(begin, 60);
            global.setTimeout(function () {
                if (!started && !settled) finish(new Error("Worksheet preview did not load."));
            }, 5000);
        });
    }

    function buildTextDocx(html, title) {
        return readWorksheetDocument(html).then(function (bodyXml) {
            return packageDocx(bodyXml, title);
        });
    }

    global.fsBuildTextDocx = buildTextDocx;

    global.fsDownloadPpaWorksheet = function (html, format, fileBase) {
        var base = fileBase || "PPA_Worksheet";
        if (format === "word") {
            return buildTextDocx(html).then(function (blob) {
                saveBlob(blob, base + ".docx");
            });
        }
        if (typeof global.html2canvas !== "function") {
            return Promise.reject(new Error("html2canvas is not loaded."));
        }
        return renderWorksheetImages(html).then(function (images) {
            saveBlob(buildPdfBlob(images), base + ".pdf");
        });
    };
})(typeof window !== "undefined" ? window : this);
