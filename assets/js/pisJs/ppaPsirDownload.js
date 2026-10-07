/**
 * Download the PPA PSIR print HTML as a PDF or an editable Word file.
 * PDF pages keep the print layout (html2canvas). Word is a separate
 * editable document: A4, 25.4 mm margins, single spacing, with the same
 * columns, rules, tables, and logos as the print form. The cover sheet
 * and each long-form official page stay on their own page.
 */
(function (global) {
    "use strict";

    var JPEG_QUALITY = 0.92;
    var A4_W_MM = 210;
    var A4_H_MM = 297;
    var PAGE_W_EMU = 7560315;
    var PAGE_H_EMU = 10692130;

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

    function jpegPayload(dataUrl) {
        var comma = dataUrl.indexOf(",");
        return comma >= 0 ? dataUrl.substring(comma + 1) : dataUrl;
    }

    function isIgnorable(node) {
        if (!node) return true;
        if (node.nodeType === 8) return true;
        if (node.nodeType === 3) return !node.nodeValue || !String(node.nodeValue).trim();
        return false;
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
        if (node.classList && (node.classList.contains("field-line") || node.classList.contains("psir-cover-sheet") || node.classList.contains("cond-item") || node.classList.contains("sig-block"))) return false;
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
        if (!node || node.nodeType !== 1 || node.getAttribute("data-psir-shell") !== "1") return false;
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

    function contentClass(kind) {
        if (kind === "short") return "psir-export-content sheet";
        if (kind === "long") return "psir-export-content sheet sheet-of3";
        return "psir-export-content";
    }

    function makePage(doc, host, kind) {
        var page = doc.createElement("div");
        page.className = "psir-export-page";
        page.style.cssText = "width:210mm;height:297mm;box-sizing:border-box;background:#ffffff;padding:25.4mm;overflow:hidden;position:relative;";
        var content = doc.createElement("div");
        content.className = contentClass(kind);
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
        if (state.pages.length > 50) throw new Error("PSIR is too long to export.");
        if (!contentIsEmpty(state.content)) {
            state.pages.push(state.page);
        } else if (state.page.parentNode) {
            state.page.parentNode.removeChild(state.page);
        }
        var made = makePage(state.doc, state.host, state.kind);
        state.page = made.page;
        state.content = made.content;
        return state;
    }

    function useKind(state, kind) {
        state.kind = kind;
        state.content.className = contentClass(kind);
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
        shell.setAttribute("data-psir-shell", "1");
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
            var kidTooTall = kid.offsetHeight > state.content.clientHeight + 2;
            shell.removeChild(kid);
            if (kidTooTall && (isSplittableTable(kid) || isSplittableElement(kid))) {
                if (shellIsEmpty(shell) || (!shell.textContent.trim() && shell.children.length === 0)) {
                    if (shell.parentNode) shell.parentNode.removeChild(shell);
                }
                state = isSplittableTable(kid) ? splitTable(kid, state) : splitChildren(kid, state);
                shell = startShell(node, state);
                continue;
            }
            if (shellIsEmpty(shell) || (!shell.textContent.trim() && shell.children.length === 0)) {
                if (shell.parentNode) shell.parentNode.removeChild(shell);
                shell = startShell(node, state);
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
        state.content.appendChild(node);
        if (fits(state.content)) return state;
        state.content.removeChild(node);

        if (!contentIsEmpty(state.content)) {
            state = breakPage(state);
            state.content.appendChild(node);
            if (fits(state.content)) return state;
            state.content.removeChild(node);
        }

        if (isSplittableTable(node)) return splitTable(node, state);
        if (isSplittableElement(node)) return splitChildren(node, state);

        state.content.appendChild(node);
        if (!fits(state.content)) markSlice(state);
        return state;
    }

    function placeDedicated(node, state) {
        if (!contentIsEmpty(state.content)) state = breakPage(state);
        var isCover = node.classList && node.classList.contains("psir-cover-sheet");
        state.content.appendChild(node);
        if (!fits(state.content) && isCover) {
            node.style.minHeight = state.content.clientHeight + "px";
            node.style.height = state.content.clientHeight + "px";
        }
        if (fits(state.content)) return breakPage(state);
        state.content.removeChild(node);
        if (isCover) {
            node.style.minHeight = "";
            node.style.height = "";
        }
        state = placeBlock(node, state);
        if (!contentIsEmpty(state.content)) state = breakPage(state);
        return state;
    }

    function measurePage(page) {
        var content = page.querySelector(".psir-export-content");
        var metrics = {
            pageW: page.offsetWidth,
            pageH: page.offsetHeight,
            padX: 0,
            padY: 0
        };
        metrics.padX = Math.max(0, Math.round((metrics.pageW - content.clientWidth) / 2));
        metrics.padY = Math.max(0, Math.round((metrics.pageH - content.clientHeight) / 2));
        return metrics;
    }

    function paginate(doc) {
        var sheet = doc.querySelector(".sheet");
        var cover = doc.querySelector(".psir-cover-sheet");
        var of3 = sheet ? Array.prototype.slice.call(sheet.querySelectorAll(".of3-page")) : [];
        if (!sheet && !cover) throw new Error("PSIR layout was empty.");

        var host = doc.createElement("div");
        host.id = "psir-export-host";
        doc.body.appendChild(host);

        var kind = of3.length ? "long" : (cover ? "cover" : "short");
        var made = makePage(doc, host, kind);
        var state = {
            doc: doc,
            host: host,
            page: made.page,
            content: made.content,
            pages: [],
            kind: kind
        };
        var metrics = measurePage(made.page);
        if (metrics.pageW < 50 || metrics.pageH < 50) {
            throw new Error("Could not measure the PSIR page.");
        }

        if (cover) {
            state = placeDedicated(cover, state);
            if (!of3.length) useKind(state, "short");
        }

        if (of3.length) {
            if (state.kind !== "long") useKind(state, "long");
            for (var i = 0; i < of3.length; i++) {
                state = placeDedicated(of3[i], state);
            }
        } else if (sheet) {
            var nodes = Array.prototype.slice.call(sheet.childNodes);
            sheet.style.display = "none";
            for (var j = 0; j < nodes.length; j++) {
                var sheetNode = nodes[j];
                if (sheetNode.nodeType === 1 && sheetNode.classList && sheetNode.classList.contains("page-break-before")) {
                    state = placeDedicated(sheetNode, state);
                } else {
                    state = placeBlock(sheetNode, state);
                }
            }
        }

        if (sheet && host.contains && !host.contains(sheet)) sheet.style.display = "none";

        if (!contentIsEmpty(state.content)) state.pages.push(state.page);
        else if (state.page.parentNode) state.page.parentNode.removeChild(state.page);
        if (!state.pages.length) throw new Error("PSIR layout was empty.");
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
                    var content = page.querySelector(".psir-export-content");
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
            if (!images.length) throw new Error("PSIR pages could not be drawn.");
            return images;
        });
    }

    function waitForImages(doc) {
        var imgs = doc.images || [];
        var wait = [];
        for (var i = 0; i < imgs.length; i++) {
            if (imgs[i].complete) continue;
            (function (img) {
                wait.push(new Promise(function (resolve) {
                    img.onload = resolve;
                    img.onerror = resolve;
                }));
            })(imgs[i]);
        }
        if (!wait.length) return Promise.resolve();
        return Promise.race([
            Promise.all(wait),
            new Promise(function (resolve) {
                global.setTimeout(resolve, 4000);
            })
        ]);
    }

    function renderPsirImages(html) {
        return new Promise(function (resolve, reject) {
            var iframe = document.createElement("iframe");
            iframe.setAttribute("aria-hidden", "true");
            iframe.setAttribute("title", "PSIR export");
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
                if (!doc || !doc.body || (!doc.querySelector(".sheet") && !doc.querySelector(".psir-cover-sheet"))) return;
                started = true;
                waitForImages(doc).then(function () {
                    global.requestAnimationFrame(function () {
                        global.requestAnimationFrame(function () {
                            try {
                                capturePages(doc).then(function (images) {
                                    finish(null, images);
                                }, function (err) {
                                    finish(err || new Error("Could not draw the PSIR."));
                                });
                            } catch (err) {
                                finish(err);
                            }
                        });
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
                if (!started && !settled) finish(new Error("PSIR preview did not load."));
            }, 8000);
        });
    }

    function buildPdfBlob(images) {
        if (typeof global.jsPDF !== "function") throw new Error("jsPDF is not loaded.");
        var doc = new global.jsPDF("p", "mm", "a4");
        for (var i = 0; i < images.length; i++) {
            if (i > 0) doc.addPage();
            doc.addImage(images[i], "JPEG", 0, 0, A4_W_MM, A4_H_MM, "psir" + i, "FAST");
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

    function buildDocxBlob(images) {
        if (typeof global.JSZip !== "function") {
            return Promise.reject(new Error("JSZip is not loaded."));
        }
        var zip = new global.JSZip();
        var rels = [];
        var body = [];
        for (var i = 0; i < images.length; i++) {
            var n = i + 1;
            var name = "page" + n + ".jpg";
            zip.file("word/media/" + name, jpegPayload(images[i]), { base64: true });
            rels.push(
                '<Relationship Id="rId' + n + '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/' + name + '"/>'
            );
            body.push(
                "<w:p>" +
                    "<w:pPr>" +
                    (i > 0 ? "<w:pageBreakBefore/>" : "") +
                    '<w:spacing w:before="0" w:after="0" w:line="1" w:lineRule="exact"/>' +
                    '<w:rPr><w:sz w:val="2"/><w:szCs w:val="2"/></w:rPr>' +
                    "</w:pPr>" +
                    "<w:r><w:rPr><w:sz w:val=\"2\"/><w:szCs w:val=\"2\"/></w:rPr>" +
                    "<w:drawing>" +
                    '<wp:anchor distT="0" distB="0" distL="0" distR="0" simplePos="0" relativeHeight="' + (251658240 + n) + '" behindDoc="0" locked="0" layoutInCell="1" allowOverlap="1">' +
                    '<wp:simplePos x="0" y="0"/>' +
                    '<wp:positionH relativeFrom="page"><wp:posOffset>0</wp:posOffset></wp:positionH>' +
                    '<wp:positionV relativeFrom="page"><wp:posOffset>0</wp:posOffset></wp:positionV>' +
                    '<wp:extent cx="' + PAGE_W_EMU + '" cy="' + PAGE_H_EMU + '"/>' +
                    '<wp:effectExtent l="0" t="0" r="0" b="0"/>' +
                    "<wp:wrapNone/>" +
                    '<wp:docPr id="' + n + '" name="Page ' + n + '"/>' +
                    "<wp:cNvGraphicFramePr><a:graphicFrameLocks noChangeAspect=\"1\"/></wp:cNvGraphicFramePr>" +
                    '<a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">' +
                    "<pic:pic><pic:nvPicPr><pic:cNvPr id=\"" + n + "\" name=\"" + xmlEscape(name) + "\"/><pic:cNvPicPr/></pic:nvPicPr>" +
                    '<pic:blipFill><a:blip r:embed="rId' + n + '"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill>' +
                    "<pic:spPr><a:xfrm><a:off x=\"0\" y=\"0\"/><a:ext cx=\"" + PAGE_W_EMU + "\" cy=\"" + PAGE_H_EMU + "\"/></a:xfrm>" +
                    '<a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic>' +
                    "</a:graphicData></a:graphic></wp:anchor></w:drawing></w:r></w:p>"
            );
        }
        body.push(
            "<w:sectPr>" +
                '<w:pgSz w:w="11906" w:h="16838"/>' +
                '<w:pgMar w:top="0" w:right="0" w:bottom="0" w:left="0" w:header="0" w:footer="0" w:gutter="0"/>' +
                "</w:sectPr>"
        );

        zip.file(
            "[Content_Types].xml",
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
                '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
                '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>' +
                '<Default Extension="xml" ContentType="application/xml"/>' +
                '<Default Extension="jpg" ContentType="image/jpeg"/>' +
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
                "<dc:title>PPA PSIR</dc:title><dc:creator>PIS</dc:creator>" +
                "</cp:coreProperties>"
        );
        zip.file(
            "word/_rels/document.xml.rels",
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
                '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
                rels.join("") +
                "</Relationships>"
        );
        zip.file(
            "word/document.xml",
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
                '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">' +
                "<w:body>" + body.join("") + "</w:body></w:document>"
        );
        return zip.generateAsync({
            type: "blob",
            mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        }).then(function (blob) {
            if (!blob || blob.size < 1000) throw new Error("Word file was empty.");
            return blob;
        });
    }

    var DOCX_CONTENT_W = 9026;

    function docxMm(mm) {
        return Math.round(mm * 56.7);
    }

    function docxEmu(mm) {
        return Math.round(mm * 36000);
    }

    function docxClass(node, name) {
        return !!(node && node.nodeType === 1 && node.classList && node.classList.contains(name));
    }

    function docxElements(node) {
        var list = [];
        if (!node) return list;
        for (var i = 0; i < node.childNodes.length; i++) {
            if (node.childNodes[i].nodeType === 1) list.push(node.childNodes[i]);
        }
        return list;
    }

    function docxSkip(node) {
        return docxClass(node, "cover-hdr-center-spacer") || docxClass(node, "of3-tabgap") ||
            docxClass(node, "pdot") || docxClass(node, "dot") || docxClass(node, "clr") ||
            docxClass(node, "cust-gap");
    }

    function docxText(node) {
        if (!node) return "";
        return String(node.textContent || "")
            .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
            .replace(/\u00a0/g, " ")
            .replace(/[ \t\r\n]+/g, " ")
            .trim();
    }

    function docxClean(value, upper) {
        var text = String(value == null ? "" : value)
            .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
            .replace(/\u00a0/g, " ")
            .replace(/[ \t\r\n]+/g, " ");
        if (upper) text = text.toUpperCase();
        return text;
    }

    function docxRun(text, props) {
        props = props || {};
        var font = props.font || "Times New Roman";
        var sz = props.sz || 22;
        var rPr = '<w:rFonts w:ascii="' + xmlEscape(font) + '" w:hAnsi="' + xmlEscape(font) + '" w:cs="' + xmlEscape(font) + '"/>' +
            '<w:sz w:val="' + sz + '"/><w:szCs w:val="' + sz + '"/>';
        if (props.bold) rPr += "<w:b/><w:bCs/>";
        if (props.italic) rPr += "<w:i/><w:iCs/>";
        if (props.underline) rPr += '<w:u w:val="single"/>';
        if (props.color) rPr += '<w:color w:val="' + props.color + '"/>';
        return "<w:r><w:rPr>" + rPr + "</w:rPr><w:t xml:space=\"preserve\">" + xmlEscape(text) + "</w:t></w:r>";
    }

    function docxPara(runs, opt) {
        opt = opt || {};
        var align = opt.align || "left";
        var before = opt.before != null ? opt.before : 40;
        var after = opt.after != null ? opt.after : 20;
        var line = opt.line || 276;
        var pPr = "";
        if (opt.pageBreak) pPr += "<w:pageBreakBefore/>";
        if (opt.keepNext) pPr += "<w:keepNext/>";
        if (align === "center" || align === "right" || align === "both") pPr += '<w:jc w:val="' + align + '"/>';
        pPr += '<w:spacing w:before="' + before + '" w:after="' + after + '" w:line="' + line + '" w:lineRule="auto"/>';
        if (opt.indent || opt.hanging || opt.firstLine) {
            pPr += '<w:ind w:left="' + (opt.indent || 0) + '"';
            if (opt.hanging) pPr += ' w:hanging="' + opt.hanging + '"';
            if (opt.firstLine) pPr += ' w:firstLine="' + opt.firstLine + '"';
            pPr += "/>";
        }
        if (opt.borderBottom) {
            pPr += '<w:pBdr><w:bottom w:val="' + (opt.borderVal || "single") + '" w:sz="' + (opt.borderSz || 8) +
                '" w:space="1" w:color="' + opt.borderBottom + '"/></w:pBdr>';
        }
        return "<w:p><w:pPr>" + pPr + "</w:pPr>" + (runs || "") + "</w:p>";
    }

    function docxParaOpt(ctx, extra) {
        extra = extra || {};
        var align = extra.align || ctx.align || "left";
        return {
            align: align,
            before: extra.before != null ? extra.before : ctx.before,
            after: extra.after != null ? extra.after : ctx.after,
            line: extra.line || ctx.line,
            indent: extra.indent != null ? extra.indent : ctx.indent,
            hanging: extra.hanging != null ? extra.hanging : ctx.hanging,
            firstLine: extra.firstLine != null ? extra.firstLine : ctx.firstLine,
            borderBottom: extra.borderBottom,
            borderSz: extra.borderSz,
            borderVal: extra.borderVal,
            pageBreak: extra.pageBreak,
            keepNext: extra.keepNext != null ? extra.keepNext : ctx.keepNext
        };
    }

    function docxTextPara(text, ctx, extra) {
        extra = extra || {};
        var shown = docxClean(text, extra.upper != null ? extra.upper : ctx.upper);
        if (!shown.trim() && !extra.keepEmpty) shown = extra.blank || " ";
        return docxPara(docxRun(shown, {
            font: extra.font || ctx.font,
            sz: extra.sz || ctx.sz,
            bold: extra.bold != null ? extra.bold : ctx.bold,
            italic: extra.italic != null ? extra.italic : ctx.italic,
            color: extra.color || ctx.color,
            underline: extra.underline
        }), docxParaOpt(ctx, extra));
    }

    function docxBreakBefore(blocks) {
        if (!blocks.length) return [docxPara("", { pageBreak: true, before: 0, after: 0, line: 20 })];
        var first = blocks[0];
        if (first.indexOf("<w:p>") === 0) {
            if (first.indexOf("<w:p><w:pPr>") === 0) {
                blocks[0] = first.replace("<w:p><w:pPr>", "<w:p><w:pPr><w:pageBreakBefore/>");
                return blocks;
            }
            blocks[0] = "<w:p><w:pPr><w:pageBreakBefore/></w:pPr>" + first.substring(4);
            return blocks;
        }
        blocks.unshift(docxPara("", { pageBreak: true, before: 0, after: 0, line: 20 }));
        return blocks;
    }

    function docxBaseCtx(form) {
        return {
            form: form,
            font: "Times New Roman",
            sz: form === "long" ? 21 : 22,
            line: form === "cover" ? 264 : (form === "long" ? 276 : 300),
            align: "left",
            bold: false,
            italic: false,
            color: "",
            upper: false,
            before: form === "long" ? 20 : 40,
            after: form === "long" ? 12 : 20,
            indent: 0,
            hanging: 0,
            firstLine: 0,
            keepNext: false
        };
    }

    function docxChildCtx(parent, node) {
        var next = {
            form: parent.form,
            font: parent.font,
            sz: parent.sz,
            line: parent.line,
            align: parent.align,
            bold: parent.bold,
            italic: parent.italic,
            color: parent.color,
            upper: parent.upper,
            before: parent.form === "long" ? 20 : 40,
            after: parent.form === "long" ? 12 : 20,
            indent: 0,
            hanging: 0,
            firstLine: 0,
            keepNext: false
        };
        if (docxClass(node, "of3-official-rec")) {
            next.font = "Arial";
            next.sz = 17;
            next.line = 276;
        }
        if (docxClass(node, "sec-head") || docxClass(node, "of3-sec") || docxClass(node, "of3-banner") || docxClass(node, "psir-banner")) {
            next.align = "center";
            next.bold = true;
            next.before = docxClass(node, "of3-sec") ? 120 : 180;
            next.after = 60;
            next.sz = 21;
        }
        if (docxClass(node, "rule-top")) next.before = Math.max(next.before, 140);
        if (docxClass(node, "sub-sec-head") || docxClass(node, "of3-sub")) {
            next.bold = true;
            next.before = 120;
            next.after = 40;
            next.sz = 20;
        }
        if (docxClass(node, "of3-sub2")) {
            next.bold = true;
            next.before = 100;
            next.after = 30;
            next.sz = 20;
            next.keepNext = true;
        }
        if (docxClass(node, "cover-hdr-center") || docxClass(node, "cover-hdr-center-stack") || docxClass(node, "mast-center") ||
            docxClass(node, "cover-hdr-line") || docxClass(node, "rec-sub") || docxClass(node, "of3-rec-title") ||
            docxClass(node, "soc-col-head") || docxClass(node, "of3-soc-title") || docxClass(node, "pet-sub") ||
            docxClass(node, "of3-pet-cap") || docxClass(node, "of3-rec-place") || docxClass(node, "of3-sigline")) {
            next.align = "center";
        }
        if (docxClass(node, "cover-hdr-right") || docxClass(node, "cover-hdr-right-inner") || docxClass(node, "cover-closing-block") ||
            docxClass(node, "cover-vty") || docxClass(node, "cover-head-line") || docxClass(node, "cover-head-title") ||
            docxClass(node, "meta-right") || docxClass(node, "cover-footer-iso-stack") || docxClass(node, "cover-footer-cert-lines") ||
            docxClass(node, "of3-document-page") || docxClass(node, "mast-gutter-r") || docxClass(node, "cover-hdr-logos-pair")) {
            next.align = "right";
        }
        if (docxClass(node, "cover-hdr-line")) {
            next.before = 0;
            next.after = 20;
        }
        if (docxClass(node, "cover-hdr-ppa")) {
            next.bold = true;
            next.color = "C40000";
            next.upper = true;
            next.align = "center";
            next.sz = 21;
        }
        if (docxClass(node, "cover-hdr-dojtxt") || docxClass(node, "cover-hdr-office") || docxClass(node, "b") || docxClass(node, "ppa") ||
            docxClass(node, "frm") || docxClass(node, "lbl") || docxClass(node, "cover-form-33") || docxClass(node, "cover-form-rev") ||
            docxClass(node, "pet-name-label") || docxClass(node, "sig-h") || docxClass(node, "of3-sigh") ||
            docxClass(node, "of3-rec-sign-head") || docxClass(node, "of3-formid") || docxClass(node, "soc-col-head") ||
            docxClass(node, "of3-soc-title")) {
            next.bold = true;
        }
        if (docxClass(node, "cover-form-33")) next.sz = 20;
        if (docxClass(node, "cover-form-rev")) next.sz = 19;
        if (docxClass(node, "cover-addr-role") || docxClass(node, "cover-head-title") || docxClass(node, "pet-sub") ||
            docxClass(node, "of3-pet-cap") || docxClass(node, "prior-note") || docxClass(node, "court-rec-hint")) {
            next.italic = true;
        }
        if (docxClass(node, "court-rec-hint")) {
            next.bold = false;
            next.sz = 18;
        }
        if (docxClass(node, "pet-sub") || docxClass(node, "of3-pet-cap")) next.sz = 16;
        if (docxClass(node, "prior-note")) {
            next.sz = 18;
            next.align = "both";
            next.before = 80;
            next.after = 80;
        }
        if (docxClass(node, "cover-letter-body") || docxClass(node, "justify") || docxClass(node, "of3-justify") ||
            docxClass(node, "of3-rec-para") || docxClass(node, "of3-par") || docxClass(node, "of3-law-quote") ||
            docxClass(node, "of3-law-block")) {
            next.align = "both";
        }
        if (docxClass(node, "cover-salutation")) {
            next.before = 160;
            next.after = 80;
        }
        if (docxClass(node, "cover-letter-body")) {
            next.before = 40;
            next.after = 140;
        }
        if (docxClass(node, "cover-vty")) next.before = 200;
        if (docxClass(node, "rec-sub")) {
            next.before = 20;
            next.after = 80;
        }
        if (docxClass(node, "of3-rec-indent")) next.firstLine = docxMm(12);
        if (docxClass(node, "of3-law-block") || docxClass(node, "of3-andor")) next.indent = docxMm(12);
        if (docxClass(node, "of3-law-quote")) next.sz = Math.min(next.sz, 16);
        if (docxClass(node, "addr") || docxClass(node, "hint") || docxClass(node, "of3-sigt")) next.sz = Math.min(next.sz, 20);
        if (docxClass(node, "soc-col-head") || docxClass(node, "of3-soc-title")) {
            next.before = 20;
            next.after = 60;
            next.sz = 19;
        }
        if (docxClass(node, "of3-rec-approved")) next.before = docxMm(8);
        if (docxClass(node, "of3-three") || docxClass(node, "of3-four") || docxClass(node, "of3-nameparts")) next.align = "center";
        if (docxClass(node, "of3-nameparts")) {
            next.italic = true;
            next.sz = 16;
        }
        if (docxClass(node, "ruled-line") || docxClass(node, "of3-ruled")) next.keepNext = true;
        if (docxClass(node, "cover-footer-cert-line")) {
            next.sz = 16;
            next.align = "right";
            next.before = 0;
            next.after = 0;
        }
        if (docxClass(node, "of3-hfill") || docxClass(node, "psir-banner-inner") || docxClass(node, "of3-banner-inner") ||
            docxClass(node, "cover-petitioner-name")) {
            next.upper = true;
        }
        return next;
    }

    function docxImageSize(node) {
        if (docxClass(node, "cover-img-seal-ppa")) return { cx: docxEmu(27), cy: docxEmu(27) };
        if (docxClass(node, "cover-img-seal-side")) return { cx: docxEmu(18), cy: docxEmu(18) };
        if (docxClass(node, "cover-img-redeem")) return { cx: docxEmu(98), cy: docxEmu(16) };
        if (docxClass(node, "cover-img-iso")) return { cx: docxEmu(32), cy: docxEmu(20) };
        if (docxClass(node, "photo-img")) return { cx: docxEmu(28), cy: docxEmu(35) };
        return { cx: docxEmu(20), cy: docxEmu(20) };
    }

    function docxImageParts(src) {
        var match = /^data:image\/(png|jpeg|jpg);base64,([a-z0-9+/=\r\n]+)$/i.exec(String(src || ""));
        if (!match) return null;
        var ext = match[1].toLowerCase() === "png" ? "png" : "jpg";
        return { ext: ext, b64: match[2].replace(/\s/g, "") };
    }

    function docxDrawing(relId, docId, name, cx, cy) {
        return "<w:r><w:drawing><wp:inline distT=\"0\" distB=\"0\" distL=\"0\" distR=\"0\">" +
            '<wp:extent cx="' + cx + '" cy="' + cy + '"/>' +
            '<wp:effectExtent l="0" t="0" r="0" b="0"/>' +
            '<wp:docPr id="' + docId + '" name="' + xmlEscape(name) + '"/>' +
            "<wp:cNvGraphicFramePr><a:graphicFrameLocks noChangeAspect=\"1\"/></wp:cNvGraphicFramePr>" +
            '<a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">' +
            '<pic:pic><pic:nvPicPr><pic:cNvPr id="' + docId + '" name="' + xmlEscape(name) + '"/><pic:cNvPicPr/></pic:nvPicPr>' +
            '<pic:blipFill><a:blip r:embed="' + relId + '"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill>' +
            '<pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="' + cx + '" cy="' + cy + '"/></a:xfrm>' +
            '<a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic>' +
            "</a:graphicData></a:graphic></wp:inline></w:drawing></w:r>";
    }

    function docxAddImage(state, node) {
        var src = node.getAttribute("src") || "";
        var parts = docxImageParts(src);
        if (!parts) return "";
        state.imageSeq += 1;
        var id = state.imageSeq;
        var name = "img" + id + "." + parts.ext;
        var size = docxImageSize(node);
        state.media.push({ id: id, name: name, ext: parts.ext, b64: parts.b64 });
        return docxDrawing("rIdImg" + id, id, name, size.cx, size.cy);
    }

    function docxUnderlineText(node, upper) {
        var value = docxClean(node.textContent, upper).trim();
        var wide = docxClass(node, "inline-ul") || docxClass(node, "of3-rec-fill") || docxClass(node, "cover-field-ul");
        if (!value) return "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0";
        if (wide && value.length < 16) {
            var pad = 16 - value.length;
            var left = Math.floor(pad / 2);
            var right = pad - left;
            var leftSpaces = "";
            var rightSpaces = "";
            while (left--) leftSpaces += "\u00A0";
            while (right--) rightSpaces += "\u00A0";
            value = leftSpaces + value + rightSpaces;
        }
        return value;
    }

    function docxIsUnderline(node) {
        return docxClass(node, "ul") || docxClass(node, "fill-line") || docxClass(node, "of3-ul") ||
            docxClass(node, "of3-hfill") || docxClass(node, "of3-rec-fill") || docxClass(node, "inline-ul");
    }

    function docxInlineParas(nodes, ctx, state) {
        var paragraphs = [];
        var runs = "";
        var endedSpace = true;
        function flush(force) {
            if (!runs && !force) return;
            paragraphs.push(docxPara(runs, docxParaOpt(ctx)));
            runs = "";
        }
        function walk(n, props) {
            if (!n || docxSkip(n)) return;
            if (n.nodeType === 3) {
                var text = docxClean(n.nodeValue, props.upper);
                if (!text) return;
                if (text === " ") {
                    if (!endedSpace) {
                        runs += docxRun(" ", props);
                        endedSpace = true;
                    }
                    return;
                }
                endedSpace = /\s$/.test(text);
                runs += docxRun(text, props);
                return;
            }
            if (n.nodeType !== 1) return;
            if (docxClass(n, "cover-emspace")) {
                if (!endedSpace) runs += docxRun(" ", props);
                endedSpace = true;
                return;
            }
            if (n.tagName === "BR") {
                flush(true);
                endedSpace = true;
                return;
            }
            if (n.tagName === "IMG") {
                var drawn = docxAddImage(state, n);
                if (drawn) {
                    runs += drawn;
                    endedSpace = true;
                }
                return;
            }
            if (docxClass(n, "pch") || docxClass(n, "chk")) {
                runs += docxRun(docxClass(n, "on") ? "\u25CF " : "\u25CB ", {
                    font: "Segoe UI Symbol",
                    sz: props.sz,
                    bold: props.bold
                });
                endedSpace = true;
                for (var c = 0; c < n.childNodes.length; c++) {
                    if (!docxClass(n.childNodes[c], "pdot")) walk(n.childNodes[c], props);
                }
                if (!endedSpace) runs += docxRun(" ", props);
                endedSpace = true;
                return;
            }
            if (docxIsUnderline(n) && n.tagName !== "DIV") {
                var shown = docxUnderlineText(n, props.upper || docxClass(n, "of3-hfill"));
                if (shown && !/^\s/.test(shown) && !endedSpace) shown = " " + shown;
                endedSpace = /\s$/.test(shown);
                runs += docxRun(shown, {
                    font: props.font,
                    sz: props.sz,
                    bold: props.bold,
                    italic: props.italic,
                    color: props.color,
                    underline: true
                });
                return;
            }
            var next = {
                font: props.font,
                sz: props.sz,
                bold: props.bold || n.tagName === "B" || n.tagName === "STRONG" || docxClass(n, "lbl") || docxClass(n, "frm"),
                italic: props.italic || n.tagName === "I" || n.tagName === "EM" || docxClass(n, "court-rec-hint") || docxClass(n, "cover-addr-role"),
                color: docxClass(n, "cover-hdr-ppa") ? "C40000" : props.color,
                upper: props.upper || docxClass(n, "cover-hdr-ppa") || docxClass(n, "cover-petitioner-name") || docxClass(n, "of3-hfill")
            };
            if (docxClass(n, "court-rec-hint")) {
                next.bold = false;
                next.italic = true;
                next.sz = 18;
            }
            if (docxClass(n, "cover-cc-label") || docxClass(n, "cover-cc-value") || docxClass(n, "cover-petitioner-name") ||
                docxClass(n, "of3-formid") || docxClass(n, "cover-form-33") || docxClass(n, "cover-form-rev")) next.bold = true;
            for (var i = 0; i < n.childNodes.length; i++) walk(n.childNodes[i], next);
        }
        var seed = {
            font: ctx.font,
            sz: ctx.sz,
            bold: ctx.bold,
            italic: ctx.italic,
            color: ctx.color,
            upper: ctx.upper
        };
        for (var i = 0; i < nodes.length; i++) walk(nodes[i], seed);
        flush(false);
        return paragraphs;
    }

    function docxIsBlock(node) {
        if (!node || node.nodeType !== 1) return false;
        if (docxClass(node, "cover-footer-cert-line") || docxClass(node, "soc-col-head") || docxClass(node, "of3-soc-title")) return true;
        var tag = node.tagName;
        return tag === "DIV" || tag === "P" || tag === "TABLE" || tag === "UL" || tag === "OL" || tag === "LI" ||
            tag === "H1" || tag === "H2" || tag === "H3" || tag === "SECTION" || tag === "HEADER" ||
            tag === "FOOTER" || tag === "ARTICLE";
    }

    function docxSplitWidths(avail, weights) {
        var sum = 0;
        var i;
        for (i = 0; i < weights.length; i++) sum += weights[i];
        if (!sum) sum = weights.length || 1;
        var widths = [];
        var used = 0;
        for (i = 0; i < weights.length; i++) {
            if (i === weights.length - 1) widths.push(Math.max(200, avail - used));
            else {
                var w = Math.max(200, Math.round(avail * weights[i] / sum));
                widths.push(w);
                used += w;
            }
        }
        return widths;
    }

    function docxBorders(kind) {
        function edge(tag, val, sz, color) {
            return "<w:" + tag + ' w:val="' + val + '" w:sz="' + (sz || 4) + '" w:space="0" w:color="' + (color || "000000") + '"/>';
        }
        if (kind === "box") {
            return "<w:tblBorders>" + edge("top", "single", 8) + edge("left", "single", 8) + edge("bottom", "single", 8) +
                edge("right", "single", 8) + edge("insideH", "nil", 0) + edge("insideV", "nil", 0) + "</w:tblBorders>";
        }
        if (kind === "grid") {
            return "<w:tblBorders>" + edge("top", "single", 4) + edge("left", "single", 4) + edge("bottom", "single", 4) +
                edge("right", "single", 4) + edge("insideH", "single", 4) + edge("insideV", "single", 4) + "</w:tblBorders>";
        }
        if (kind === "pri") {
            return "<w:tblBorders>" + edge("top", "single", 18) + edge("left", "nil", 0) + edge("bottom", "single", 18) +
                edge("right", "nil", 0) + edge("insideH", "nil", 0) + edge("insideV", "nil", 0) + "</w:tblBorders>";
        }
        if (kind === "soft") {
            return "<w:tblBorders>" + edge("top", "single", 4, "CCCCCC") + edge("left", "single", 4, "CCCCCC") +
                edge("bottom", "single", 4, "CCCCCC") + edge("right", "single", 4, "CCCCCC") +
                edge("insideH", "nil", 0) + edge("insideV", "nil", 0) + "</w:tblBorders>";
        }
        return "<w:tblBorders>" + edge("top", "nil", 0) + edge("left", "nil", 0) + edge("bottom", "nil", 0) +
            edge("right", "nil", 0) + edge("insideH", "nil", 0) + edge("insideV", "nil", 0) + "</w:tblBorders>";
    }

    function docxCellBorders(kind, header) {
        if (kind === "pri") {
            return "<w:tcBorders><w:top w:val=\"nil\"/><w:left w:val=\"nil\"/>" +
                (header ? '<w:bottom w:val="single" w:sz="8" w:space="0" w:color="000000"/>' : '<w:bottom w:val="nil"/>') +
                '<w:right w:val="nil"/></w:tcBorders>';
        }
        if (kind === "rule") {
            return '<w:tcBorders><w:top w:val="nil"/><w:left w:val="nil"/>' +
                '<w:bottom w:val="single" w:sz="8" w:space="0" w:color="000000"/>' +
                '<w:right w:val="nil"/></w:tcBorders>';
        }
        if (kind === "photo") {
            return '<w:tcBorders><w:top w:val="dashed" w:sz="4" w:space="0" w:color="999999"/>' +
                '<w:left w:val="dashed" w:sz="4" w:space="0" w:color="999999"/>' +
                '<w:bottom w:val="dashed" w:sz="4" w:space="0" w:color="999999"/>' +
                '<w:right w:val="dashed" w:sz="4" w:space="0" w:color="999999"/></w:tcBorders>';
        }
        return "";
    }

    function docxEnsurePara(blocks) {
        var copy = blocks.slice();
        if (!copy.length) copy.push(docxPara("", { before: 0, after: 0, line: 240 }));
        var last = copy[copy.length - 1];
        if (last.indexOf("<w:tbl>") === 0 || last.indexOf("<w:tbl ") === 0) {
            copy.push(docxPara("", { before: 0, after: 0, line: 20 }));
        }
        return copy;
    }

    function docxCell(blocks, width, opts) {
        opts = opts || {};
        var inner = docxEnsurePara(blocks);
        var span = opts.span > 1 ? '<w:gridSpan w:val="' + opts.span + '"/>' : "";
        var valign = opts.vAlign ? '<w:vAlign w:val="' + opts.vAlign + '"/>' : "";
        var borders = opts.cellBorders || "";
        var mar = opts.mar != null ? opts.mar : 40;
        return "<w:tc><w:tcPr><w:tcW w:w=\"" + width + "\" w:type=\"dxa\"/>" + span + borders + valign +
            '<w:tcMar><w:top w:w="' + mar + '" w:type="dxa"/><w:left w:w="' + mar + '" w:type="dxa"/>' +
            '<w:bottom w:w="' + mar + '" w:type="dxa"/><w:right w:w="' + mar + '" w:type="dxa"/></w:tcMar>' +
            "</w:tcPr>" + inner.join("") + "</w:tc>";
    }

    function docxTable(widths, rowsXml, borderKind, extra) {
        extra = extra || "";
        var grid = "";
        var total = 0;
        var i;
        for (i = 0; i < widths.length; i++) {
            grid += '<w:gridCol w:w="' + widths[i] + '"/>';
            total += widths[i];
        }
        return "<w:tbl><w:tblPr><w:tblW w:w=\"" + total + "\" w:type=\"dxa\"/>" + extra +
            '<w:tblLayout w:type="fixed"/>' + docxBorders(borderKind) +
            "</w:tblPr><w:tblGrid>" + grid + "</w:tblGrid>" + rowsXml + "</w:tbl>";
    }

    function docxColumnKids(node) {
        var kids = [];
        var all = docxElements(node);
        for (var i = 0; i < all.length; i++) {
            if (docxSkip(all[i])) continue;
            kids.push(all[i]);
        }
        return kids;
    }

    function docxIsColumnRow(node) {
        if (docxClass(node, "of3-row")) {
            var kids = docxColumnKids(node);
            var boxes = 0;
            for (var i = 0; i < kids.length; i++) {
                if (kids[i].tagName === "DIV") boxes++;
            }
            return boxes >= 2;
        }
        return docxClass(node, "cover-letterhead-row") || docxClass(node, "cover-sheet-footer") ||
            docxClass(node, "pet-three-col") || docxClass(node, "id-row-pair") || docxClass(node, "soc-row-three") ||
            docxClass(node, "sig-two") || docxClass(node, "mast") || docxClass(node, "of3-soc-row") ||
            docxClass(node, "of3-three") || docxClass(node, "of3-four") || docxClass(node, "of3-siggrid") ||
            docxClass(node, "of3-rec-signatures") || docxClass(node, "of3-nameparts");
    }

    function docxColumnWeights(node, count) {
        var weights = [];
        var i;
        if (docxClass(node, "cover-letterhead-row")) return [26, 48, 26];
        if (docxClass(node, "mast")) return [16, 58, 26];
        if (docxClass(node, "cover-sheet-footer")) return [68, 32];
        for (i = 0; i < count; i++) weights.push(1);
        return weights;
    }

    function docxFindChild(node, className) {
        var kids = docxElements(node);
        for (var i = 0; i < kids.length; i++) {
            if (docxClass(kids[i], className)) return kids[i];
        }
        return null;
    }

    function docxIsField(node) {
        return docxClass(node, "id-field") || docxClass(node, "id-full") || docxClass(node, "of3-item") ||
            docxClass(node, "of3-hfld") || docxClass(node, "cover-date-row");
    }

    function docxFieldTable(node, ctx, avail) {
        var labelNode = docxFindChild(node, "flab") || docxFindChild(node, "of3-ll") || docxFindChild(node, "of3-hlbl") ||
            docxFindChild(node, "cover-date-label");
        var valueNode = docxFindChild(node, "fill-line") || docxFindChild(node, "of3-ul") || docxFindChild(node, "of3-hfill") ||
            docxFindChild(node, "cover-date-field");
        var label = labelNode ? docxText(labelNode) : "";
        var value = "";
        if (valueNode) {
            value = docxText(valueNode);
            if (ctx.upper || (valueNode && docxClass(valueNode, "of3-hfill"))) value = value.toUpperCase();
        }
        var checkRuns = "";
        var checks = node.querySelectorAll ? node.querySelectorAll(".pch, .chk") : [];
        for (var i = 0; i < checks.length; i++) {
            checkRuns += docxRun(docxClass(checks[i], "on") ? "\u25CF " : "\u25CB ", {
                font: "Segoe UI Symbol",
                sz: ctx.sz
            });
            checkRuns += docxRun(docxText(checks[i]) + " ", {
                font: ctx.font,
                sz: ctx.sz,
                bold: ctx.bold
            });
        }
        if (!label && checkRuns) label = "";
        var labelGuess = Math.max(docxMm(18), (label.length + 2) * 100);
        var labelWidth = (label || checkRuns) ? Math.max(200, Math.min(labelGuess, Math.max(200, avail - 700))) : 0;
        var rows;
        if (!label && !checkRuns) {
            rows = "<w:tr>" + docxCell(
                [docxTextPara(value || " ", ctx, { before: 0, after: 0, keepEmpty: true, align: "left" })],
                avail,
                { cellBorders: docxCellBorders("rule"), vAlign: "bottom", mar: 20 }
            ) + "</w:tr>";
            return docxTable([avail], rows, "none");
        }
        var valueWidth = Math.max(400, avail - labelWidth);
        var labelBlocks = [docxPara((checkRuns || "") + docxRun(label ? label + " " : "", {
            font: ctx.font,
            sz: ctx.sz,
            bold: ctx.bold
        }), { align: "left", before: ctx.before, after: 0, line: ctx.line })];
        var valueBlocks = [docxTextPara(value || " ", ctx, { before: 0, after: 0, keepEmpty: true, align: "left", bold: false })];
        rows = "<w:tr>" +
            docxCell(labelBlocks, labelWidth, { vAlign: "bottom", mar: 20 }) +
            docxCell(valueBlocks, valueWidth, { cellBorders: docxCellBorders("rule"), vAlign: "bottom", mar: 20 }) +
            "</w:tr>";
        return docxTable([labelWidth, valueWidth], rows, "none");
    }

    function docxPhotoBox(ctx) {
        var width = docxMm(28);
        var row = '<w:tr><w:trPr><w:trHeight w:val="' + docxMm(35) + '" w:hRule="atLeast"/></w:trPr>' +
            docxCell([docxTextPara("Photo", ctx, { align: "center", sz: 16, before: 0, after: 0, color: "777777" })], width, {
                cellBorders: docxCellBorders("photo"),
                vAlign: "center",
                mar: 40
            }) + "</w:tr>";
        return docxTable([width], row, "none", '<w:jc w:val="right"/>');
    }

    function docxBanner(node, ctx, avail) {
        var text = docxText(node).toUpperCase();
        var row = "<w:tr>" + docxCell(
            [docxTextPara(text, ctx, { align: "center", bold: true, before: 60, after: 60, sz: 21, upper: true })],
            avail,
            { mar: 60 }
        ) + "</w:tr>";
        return docxTable([avail], row, "box");
    }

    function docxPetGrid(node, ctx, avail, state, footer) {
        var slots = {};
        var kids = docxElements(node);
        for (var i = 0; i < kids.length; i++) {
            var kid = kids[i];
            if (docxClass(kid, "of3-pet-lbl")) slots.lbl = kid;
            else if (docxClass(kid, "of3-pet-line") && docxClass(kid, "of3-pet-full")) slots.full = kid;
            else if (docxClass(kid, "of3-pet-line") && docxClass(kid, "of3-pet-g2")) slots.l2 = kid;
            else if (docxClass(kid, "of3-pet-line") && docxClass(kid, "of3-pet-g3")) slots.l3 = kid;
            else if (docxClass(kid, "of3-pet-line") && docxClass(kid, "of3-pet-g4")) slots.l4 = kid;
            else if (docxClass(kid, "of3-pet-cap") && docxClass(kid, "of3-pet-g2")) slots.c2 = kid;
            else if (docxClass(kid, "of3-pet-cap") && docxClass(kid, "of3-pet-g3")) slots.c3 = kid;
            else if (docxClass(kid, "of3-pet-cap") && docxClass(kid, "of3-pet-g4")) slots.c4 = kid;
        }
        var widths = docxSplitWidths(avail, [18, 27, 27, 28]);
        function lineCell(el, width) {
            return docxCell([docxTextPara(el ? docxText(el) : " ", ctx, {
                before: 0, after: 0, keepEmpty: true, align: "left", borderBottom: "000000", borderSz: 8, bold: false
            })], width, { vAlign: "bottom", mar: 30 });
        }
        function capCell(el, width) {
            return docxCell([docxTextPara(el ? docxText(el) : " ", ctx, {
                before: 0, after: 20, align: "center", italic: true, sz: 16, bold: false
            })], width, { mar: 20 });
        }
        var labelCell = docxCell(slots.lbl ? docxEmit(slots.lbl, docxChildCtx(ctx, slots.lbl), widths[0], state, footer) : [docxPara("", { before: 0, after: 0 })], widths[0], { vAlign: "bottom", mar: 30 });
        if (slots.full) {
            var fullWidth = widths[1] + widths[2] + widths[3];
            var fullRow = "<w:tr>" + labelCell +
                docxCell([docxTextPara(docxText(slots.full) || " ", ctx, {
                    before: 0, after: 0, keepEmpty: true, align: "left", borderBottom: "000000", borderSz: 8, bold: false
                })], fullWidth, { span: 3, vAlign: "bottom", mar: 30 }) + "</w:tr>";
            return docxTable(widths, fullRow, "none");
        }
        var row1 = "<w:tr>" + labelCell +
            lineCell(slots.l2, widths[1]) + lineCell(slots.l3, widths[2]) + lineCell(slots.l4, widths[3]) + "</w:tr>";
        var row2 = "<w:tr>" +
            docxCell([docxPara("", { before: 0, after: 0, line: 20 })], widths[0], { mar: 20 }) +
            capCell(slots.c2, widths[1]) + capCell(slots.c3, widths[2]) + capCell(slots.c4, widths[3]) + "</w:tr>";
        return docxTable(widths, row1 + row2, "none");
    }

    function docxColumns(node, ctx, avail, state, footer) {
        var kids = docxColumnKids(node);
        if (!kids.length) return "";
        if (kids.length === 1) return docxEmit(kids[0], docxChildCtx(ctx, kids[0]), avail, state, footer).join("");
        var widths = docxSplitWidths(avail, docxColumnWeights(node, kids.length));
        var border = docxClass(node, "of3-soc-row") ? "soft" : "none";
        var vAlign = (docxClass(node, "cover-letterhead-row") || docxClass(node, "mast")) ? "center" :
            (docxClass(node, "cover-sheet-footer") ? "bottom" : "top");
        var cells = "";
        for (var i = 0; i < kids.length; i++) {
            var childCtx = docxChildCtx(ctx, kids[i]);
            var innerAvail = Math.max(300, widths[i] - 80);
            var blocks = docxEmit(kids[i], childCtx, innerAvail, state, footer);
            cells += docxCell(blocks, widths[i], { vAlign: vAlign, mar: docxClass(node, "of3-soc-row") ? 60 : 40 });
        }
        return docxTable(widths, "<w:tr>" + cells + "</w:tr>", border);
    }

    function docxHtmlTable(table, ctx, avail, state, footer) {
        var kind = "none";
        if (docxClass(table, "pri")) kind = "pri";
        else if (docxClass(table, "of3-grid")) kind = "grid";
        var rows = [];
        for (var r = 0; r < table.rows.length; r++) rows.push(table.rows[r]);
        if (!rows.length) return "";
        var cols = 1;
        var rIndex;
        for (rIndex = 0; rIndex < rows.length; rIndex++) {
            var spanSum = 0;
            var cells = rows[rIndex].cells;
            for (var c = 0; c < cells.length; c++) spanSum += cells[c].colSpan || 1;
            if (spanSum > cols) cols = spanSum;
        }
        var weights = [];
        for (var g = 0; g < cols; g++) weights.push(1);
        if (docxClass(table, "of3-hdr-t")) weights = [62, 38];
        if (docxClass(table, "meta-hdr")) weights = [58, 42];
        var widths = docxSplitWidths(avail, weights.slice(0, cols));
        var body = "";
        for (rIndex = 0; rIndex < rows.length; rIndex++) {
            var row = rows[rIndex];
            var tds = "";
            var used = 0;
            for (var i = 0; i < row.cells.length; i++) {
                var cell = row.cells[i];
                var span = cell.colSpan || 1;
                var width = 0;
                var s;
                for (s = 0; s < span && used + s < widths.length; s++) width += widths[used + s];
                used += span;
                var cellCtx = docxChildCtx(ctx, cell);
                if (cell.tagName === "TH") {
                    cellCtx.bold = true;
                    if (kind === "grid") cellCtx.align = "center";
                }
                var blocks = docxEmitChildren(cell, cellCtx, Math.max(200, width - 80), state, footer);
                if (cell.tagName === "TH" && !blocks.length) {
                    blocks = [docxTextPara(docxText(cell), cellCtx, { bold: true, align: cellCtx.align })];
                }
                tds += docxCell(blocks, width, {
                    span: span,
                    cellBorders: docxCellBorders(kind, cell.tagName === "TH" || cell.parentNode.tagName === "THEAD"),
                    vAlign: "top",
                    mar: kind === "grid" ? 50 : 30
                });
            }
            if (tds) body += "<w:tr>" + tds + "</w:tr>";
        }
        return body ? docxTable(widths, body, kind) : "";
    }

    function docxList(node, ctx) {
        var alpha = docxClass(node, "of3-alpha-list");
        var items = [];
        var kids = docxElements(node);
        for (var i = 0; i < kids.length; i++) {
            if (kids[i].tagName === "LI") items.push(kids[i]);
        }
        var blocks = [];
        for (var n = 0; n < items.length; n++) {
            var prefix = alpha ? String.fromCharCode(97 + n) + "." : (n + 1) + ".";
            var itemCtx = docxChildCtx(ctx, items[n]);
            itemCtx.align = "both";
            blocks.push(docxTextPara(prefix + "  " + docxText(items[n]), itemCtx, {
                align: "both",
                indent: docxMm(alpha ? 16 : 12),
                hanging: docxMm(6),
                before: 30,
                after: 20
            }));
        }
        return blocks;
    }

    function docxEmitChildren(node, ctx, avail, state, footer) {
        var blocks = [];
        var inline = [];
        function flush() {
            if (!inline.length) return;
            var made = docxInlineParas(inline, ctx, state);
            inline = [];
            for (var i = 0; i < made.length; i++) blocks.push(made[i]);
        }
        for (var c = 0; c < node.childNodes.length; c++) {
            var child = node.childNodes[c];
            if (child.nodeType === 1 && docxIsBlock(child)) {
                flush();
                var piece = docxEmit(child, ctx, avail, state, footer);
                for (var p = 0; p < piece.length; p++) blocks.push(piece[p]);
            } else if (child.nodeType === 1 || (child.nodeType === 3 && String(child.nodeValue || "").trim())) {
                inline.push(child);
            }
        }
        flush();
        return blocks;
    }

    function docxEmit(node, parentCtx, avail, state, footer) {
        if (!node || node.nodeType === 8 || docxSkip(node)) return [];
        if (node.nodeType === 3) {
            var loose = docxClean(node.nodeValue, parentCtx.upper).trim();
            return loose ? [docxTextPara(loose, parentCtx)] : [];
        }
        if (node.nodeType !== 1) return [];
        if (node.tagName === "SCRIPT" || node.tagName === "STYLE") return [];
        var ctx = docxChildCtx(parentCtx, node);
        if (docxClass(node, "of3-confidential")) {
            if (footer) footer.confidential = true;
            return [];
        }
        if (docxClass(node, "of3-document-page")) {
            if (footer) footer.page = docxText(node);
            return [];
        }
        if (node.tagName === "IMG") {
            var drawn = docxAddImage(state, node);
            return drawn ? [docxPara(drawn, { align: ctx.align, before: 20, after: 20, line: ctx.line })] : [];
        }
        if (docxClass(node, "photo-ph")) return [docxPhotoBox(ctx)];
        if (docxClass(node, "cover-hdr-red-rule-full")) {
            return [docxPara(docxRun(" ", { sz: 8 }), { borderBottom: "C40000", borderSz: 12, before: 60, after: 80, line: 80 })];
        }
        if (docxClass(node, "cover-signature-gap")) {
            return [docxPara(docxRun(" ", { sz: 20 }), { before: docxMm(16), after: 40, line: 240 })];
        }
        if (docxClass(node, "ruled-line") || docxClass(node, "of3-ruled")) {
            return [docxTextPara(" ", ctx, { keepEmpty: true, borderBottom: "BFBFBF", borderSz: 6, before: 0, after: 0, line: 200 })];
        }
        if (docxClass(node, "rule") || docxClass(node, "of3-sigrule") || docxClass(node, "of3-rec-sign-rule") || docxClass(node, "sign-rule")) {
            return [docxTextPara(" ", ctx, { keepEmpty: true, borderBottom: "000000", borderSz: 8, before: docxMm(8), after: 40 })];
        }
        if (docxClass(node, "psir-banner") || docxClass(node, "of3-banner")) return [docxBanner(node, ctx, avail)];
        if (docxClass(node, "of3-pet-grid")) return [docxPetGrid(node, ctx, avail, state, footer)];
        if (ctx.form === "short" && (docxClass(node, "crim-section") || docxClass(node, "soc-section") || docxClass(node, "rec"))) {
            return docxBreakBefore(docxEmitChildren(node, ctx, avail, state, footer));
        }
        if (docxClass(node, "sig-block")) {
            var sigInner = docxEmitChildren(node, ctx, avail, state, footer);
            var sigRow = "<w:tr><w:trPr><w:cantSplit/></w:trPr>" + docxCell(sigInner, avail, { mar: 0 }) + "</w:tr>";
            return [docxTable([avail], sigRow, "none")];
        }
        if (docxClass(node, "cond-item")) {
            var num = docxFindChild(node, "cond-num");
            var txt = docxFindChild(node, "cond-txt");
            return [docxTextPara((num ? docxText(num) : "") + "  " + (txt ? docxText(txt) : ""), ctx, {
                align: "both",
                indent: docxMm(10),
                hanging: docxMm(8),
                before: 30,
                after: 16
            })];
        }
        if (node.tagName === "OL") return docxList(node, ctx);
        if (node.tagName === "TABLE") {
            var table = docxHtmlTable(node, ctx, avail, state, footer);
            return table ? [table] : [];
        }
        if (docxIsField(node)) return [docxFieldTable(node, ctx, avail)];
        if (docxIsColumnRow(node)) {
            var columns = docxColumns(node, ctx, avail, state, footer);
            return columns ? [columns] : [];
        }
        if ((docxClass(node, "fill-line") || docxClass(node, "of3-pet-line") || docxClass(node, "of3-ulblock")) && node.tagName === "DIV") {
            return [docxTextPara(docxText(node) || " ", ctx, {
                keepEmpty: true,
                borderBottom: "000000",
                borderSz: 8,
                before: 20,
                after: 10,
                align: "left",
                bold: false
            })];
        }
        var only = docxColumnKids(node);
        if (only.length === 1 && docxIsUnderline(only[0]) && node.tagName === "DIV") {
            return [docxTextPara(docxText(only[0]) || " ", ctx, {
                keepEmpty: true,
                borderBottom: "000000",
                borderSz: 8,
                before: 10,
                after: 10,
                bold: false
            })];
        }
        if (docxIsBlock(node)) {
            var hasBlock = false;
            for (var i = 0; i < node.childNodes.length; i++) {
                if (node.childNodes[i].nodeType === 1 && docxIsBlock(node.childNodes[i])) hasBlock = true;
            }
            if (hasBlock) return docxEmitChildren(node, ctx, avail, state, footer);
            return docxInlineParas(Array.prototype.slice.call(node.childNodes), ctx, state);
        }
        return docxInlineParas([node], ctx, state);
    }

    function docxSectPr(footerId) {
        var footerRef = footerId ? '<w:footerReference w:type="default" r:id="' + footerId + '"/>' : "";
        return "<w:sectPr>" + footerRef +
            '<w:pgSz w:w="11906" w:h="16838"/>' +
            '<w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="708" w:footer="708" w:gutter="0"/>' +
            "</w:sectPr>";
    }

    function docxFooterXml(info) {
        var mid = info.confidential ? docxRun("CONFIDENTIAL", { font: "Times New Roman", sz: 21, bold: true }) : "";
        var page = info.page ? docxRun(info.page, { font: "Times New Roman", sz: 21, bold: true }) : "";
        var widths = docxSplitWidths(DOCX_CONTENT_W, [20, 60, 20]);
        var row = "<w:tr>" +
            docxCell([docxPara("", { before: 0, after: 0, line: 240 })], widths[0], { mar: 0 }) +
            docxCell([docxPara(mid, { align: "center", before: 0, after: 0, line: 240 })], widths[1], { mar: 0 }) +
            docxCell([docxPara(page, { align: "right", before: 0, after: 0, line: 240 })], widths[2], { mar: 0 }) +
            "</w:tr>";
        return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
            '<w:ftr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">' +
            docxTable(widths, row, "none") +
            "</w:ftr>";
    }

    function docxWalk(node, sections, flow, state, form) {
        if (!flow) flow = { blocks: [], footer: { confidential: false, page: "" } };
        if (!node) return flow;
        if (node.nodeType === 3) {
            if (String(node.nodeValue || "").trim()) {
                flow.blocks = flow.blocks.concat(docxEmit(node, docxBaseCtx(form), DOCX_CONTENT_W, state, flow.footer));
            }
            return flow;
        }
        if (node.nodeType !== 1 || node.tagName === "SCRIPT" || node.tagName === "STYLE") return flow;
        if (docxClass(node, "psir-cover-sheet") || docxClass(node, "of3-page")) {
            if (flow.blocks.length) {
                sections.push(flow);
                flow = { blocks: [], footer: { confidential: false, page: "" } };
            }
            var sectionForm = docxClass(node, "psir-cover-sheet") ? "cover" : "long";
            var footer = { confidential: false, page: "" };
            var blocks = docxEmitChildren(node, docxBaseCtx(sectionForm), DOCX_CONTENT_W, state, footer);
            sections.push({ blocks: blocks, footer: footer });
            return flow;
        }
        var kids = docxElements(node);
        var nested = node.tagName === "BODY" || node.tagName === "ARTICLE";
        if (!nested) {
            for (var i = 0; i < kids.length; i++) {
                if (docxClass(kids[i], "psir-cover-sheet") || docxClass(kids[i], "of3-page")) nested = true;
            }
        }
        if (nested) {
            for (var c = 0; c < node.childNodes.length; c++) flow = docxWalk(node.childNodes[c], sections, flow, state, form);
            return flow;
        }
        flow.blocks = flow.blocks.concat(docxEmit(node, docxBaseCtx(form), DOCX_CONTENT_W, state, flow.footer));
        return flow;
    }

    function docxBuildParts(doc) {
        var state = { media: [], imageSeq: 0 };
        var sections = [];
        var form = doc.querySelector && doc.querySelector(".of3-page") ? "long" : "short";
        var flow = docxWalk(doc.body, sections, { blocks: [], footer: { confidential: false, page: "" } }, state, form);
        if (flow && flow.blocks && flow.blocks.length) sections.push(flow);
        if (!sections.length) throw new Error("PSIR layout was empty.");
        var footers = [];
        var body = [];
        for (var i = 0; i < sections.length; i++) {
            var section = sections[i];
            if (!section.blocks.length) section.blocks.push(docxPara("", { before: 0, after: 0 }));
            var footerId = "";
            if (section.footer && (section.footer.confidential || section.footer.page)) {
                footers.push({ id: footers.length + 1, xml: docxFooterXml(section.footer) });
                footerId = "rIdFtr" + footers.length;
            }
            var blocks = section.blocks.slice();
            if (i < sections.length - 1) {
                var sect = docxSectPr(footerId);
                var last = blocks.length ? blocks[blocks.length - 1] : "";
                if (last.indexOf("<w:p><w:pPr>") === 0) {
                    blocks[blocks.length - 1] = last.replace("</w:pPr>", sect + "</w:pPr>");
                } else {
                    blocks.push("<w:p><w:pPr><w:spacing w:before=\"0\" w:after=\"0\" w:line=\"1\" w:lineRule=\"exact\"/><w:rPr><w:sz w:val=\"2\"/></w:rPr>" +
                        sect + "</w:pPr><w:r><w:rPr><w:sz w:val=\"2\"/></w:rPr><w:t xml:space=\"preserve\"> </w:t></w:r></w:p>");
                }
            }
            body.push(blocks.join(""));
            if (i === sections.length - 1) body.push(docxSectPr(footerId));
        }
        var rels = [];
        for (var m = 0; m < state.media.length; m++) {
            rels.push('<Relationship Id="rIdImg' + state.media[m].id + '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/' + state.media[m].name + '"/>');
        }
        for (var f = 0; f < footers.length; f++) {
            rels.push('<Relationship Id="rIdFtr' + footers[f].id + '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer" Target="footer' + footers[f].id + '.xml"/>');
        }
        var types = '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>' +
            '<Default Extension="xml" ContentType="application/xml"/>' +
            '<Default Extension="png" ContentType="image/png"/>' +
            '<Default Extension="jpg" ContentType="image/jpeg"/>' +
            '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>' +
            '<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>';
        for (var t = 0; t < footers.length; t++) {
            types += '<Override PartName="/word/footer' + footers[t].id + '.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml"/>';
        }
        return {
            media: state.media,
            footers: footers,
            documentXml: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
                '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">' +
                "<w:body>" + body.join("") + "</w:body></w:document>",
            contentTypes: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
                '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' + types + "</Types>",
            rels: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
                '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' + rels.join("") + "</Relationships>",
            rootRels: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
                '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
                '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>' +
                '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>' +
                "</Relationships>",
            core: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
                '<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/">' +
                "<dc:title>PPA PSIR</dc:title><dc:creator>PIS</dc:creator></cp:coreProperties>"
        };
    }

    function packagePsirDocx(parts) {
        if (typeof global.JSZip !== "function") {
            return Promise.reject(new Error("JSZip is not loaded."));
        }
        var zip = new global.JSZip();
        zip.file("[Content_Types].xml", parts.contentTypes);
        zip.file("_rels/.rels", parts.rootRels);
        zip.file("docProps/core.xml", parts.core);
        zip.file("word/_rels/document.xml.rels", parts.rels);
        zip.file("word/document.xml", parts.documentXml);
        for (var i = 0; i < parts.media.length; i++) {
            zip.file("word/media/" + parts.media[i].name, parts.media[i].b64, { base64: true });
        }
        for (var f = 0; f < parts.footers.length; f++) {
            zip.file("word/footer" + parts.footers[f].id + ".xml", parts.footers[f].xml);
        }
        return zip.generateAsync({
            type: "blob",
            mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        }).then(function (blob) {
            if (!blob || blob.size < 1000) throw new Error("Word file was empty.");
            return blob;
        });
    }

    function readPsirDocument(html) {
        return new Promise(function (resolve, reject) {
            var iframe = document.createElement("iframe");
            iframe.setAttribute("aria-hidden", "true");
            iframe.setAttribute("title", "PSIR Word export");
            iframe.style.cssText = "position:fixed;left:-12000px;top:0;width:210mm;height:297mm;border:0;background:#fff;";
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
                if (!doc || !doc.body || (!doc.querySelector(".sheet") && !doc.querySelector(".psir-cover-sheet"))) return;
                started = true;
                global.requestAnimationFrame(function () {
                    try {
                        finish(null, docxBuildParts(doc));
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
                if (!started && !settled) finish(new Error("PSIR preview did not load."));
            }, 8000);
        });
    }

    function buildPsirTextDocx(html) {
        return readPsirDocument(html).then(packagePsirDocx);
    }

    global.fsBuildPsirDocxParts = docxBuildParts;

    global.fsDownloadPpaPsir = function (html, format, fileBase) {
        var base = fileBase || "PPA_PSIR";
        if (format === "word") {
            return buildPsirTextDocx(html).then(function (blob) {
                saveBlob(blob, base + ".docx");
            });
        }
        if (typeof global.html2canvas !== "function") {
            return Promise.reject(new Error("html2canvas is not loaded."));
        }
        return renderPsirImages(html).then(function (images) {
            saveBlob(buildPdfBlob(images), base + ".pdf");
        });
    };
})(typeof window !== "undefined" ? window : this);
