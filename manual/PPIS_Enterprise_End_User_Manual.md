# Parole and Probation Information System (PPIS)

---

**End-User Manual**

**Version:** 1.0  

**Organization:** Parole and Probation Administration (PPA), Department of Justice, Republic of the Philippines  

**Document Date:** May 2026  

**Classification:** Official Use – Operational Staff  

---

This manual is written for day-to-day users of the web-based **Parole and Probation Information System (PPIS)**. It explains how to sign in, move through menus, record docket information, work with fact sheets and forms, print reports, and solve common problems.

<<<SCREENSHOTS:COVER>>>

---

# Table of Contents

1. [Introduction](#1-introduction)
2. [System Requirements](#2-system-requirements)
3. [Logging In](#3-logging-in)
4. [Dashboard Overview](#4-dashboard-overview)
5. [Navigation and Screen Layout](#5-navigation-and-screen-layout)
6. [Module Documentation](#6-module-documentation)
7. [Data Encoding Procedures](#7-data-encoding-procedures)
8. [Printing and Reports](#8-printing-and-reports)
9. [User Roles and Permissions](#9-user-roles-and-permissions)
10. [Troubleshooting](#10-troubleshooting)
11. [Frequently Asked Questions](#11-frequently-asked-questions)
12. [Glossary of Terms](#12-glossary-of-terms)
13. [Contact and Support](#13-contact-and-support)

---

# 1. Introduction

## 1.1 Purpose of the System

PPIS supports the processing and tracking of **probation**, **parole**, **pardon**, and related **persons deprived of liberty (PDL)** workflows in one place. It helps your office:

| Benefit | What it means for staff |
|--------|-------------------------|
| Central records | Dockets and supporting documents stay tied to the correct client and case. |
| Controlled routing | Items move between units (forward, return, inbox, sent) with a clear trail. |
| Fewer paper errors | Required fields and lists reduce missing information before a case advances. |
| Faster retrieval | Search and filters help locate a docket or client without browsing every paper folder. |

## 1.2 Overview of the Workflow (Typical Office Flow)

1. A staff member **logs in** with the account issued by your administrator.
2. Depending on the unit, users **create or open a docket** (investigation or supervision, probation or parole track).
3. **Details are encoded** (names, numbers, tasks, dates, remarks). Supporting files are **uploaded** when required.
4. Completed work may be **forwarded** through **Docket Routing**, or tracked in **Sent** / **Inbox** lists, including Pre-Parole, Parole, Pardone, and PDL queues as applicable.
5. **Fact sheets**, **worksheets**, and **PSIR** sections (where enabled) capture structured assessment information.
6. **Reports or printable documents** are generated from the appropriate screens (print preview or export, depending on the module).

Exact steps depend on your **role** and **field office**. Not every user sees every menu item.

## 1.3 Intended Users

| User type | Typical responsibilities |
|-----------|-------------------------|
| Encoder / clerk | Day-to-day data entry, uploads, routing actions allowed by your role. |
| Supervisor | Reviews work, may approve steps or oversee queues assigned to the unit. |
| Administrator | Maintains user accounts, roles, permissions, offices, and regions. |
| Viewer (read-only) | Opens and prints records but cannot change sensitive data (when configured). |

---

# 2. System Requirements

## 2.1 Browser Requirements

1. Use a **current, supported web browser** (for example, recent versions of Microsoft Edge, Google Chrome, or Mozilla Firefox).
2. Enable **JavaScript** (it is on by default in standard installations).
3. Allow the site to use **cookies** and **local storage** for your PPIS address. The system stores session-related preferences (such as permission flags) in the browser after login.

**Warning:** Private or “strict” blocking modes can prevent login or hide menus correctly. If menus look empty after login, ask IT to check browser privacy settings for your PPIS site.

## 2.2 Internet and Network Requirements

1. Connect through a **reliable network** (office LAN or approved VPN), as PPIS is normally hosted on your agency server or data center.
2. If the screen shows **connection errors** or endless loading, confirm with IT whether the **application server** and **API address** configured for your office are reachable.

**Tip:** Note your office’s official PPIS web address (URL). Bookmark it only on secure, staff-only computers.

## 2.3 Recommended Screen Resolution

1. Use a **desktop or laptop** display at **1366×768** or higher.
2. On smaller screens, use the **menu toggle** (horizontal lines icon) in the header to open the left navigation panel.

---

# 3. Logging In

<<<SCREENSHOTS:Login>>>

## 3.1 Username and Password (Email Sign-In)

1. Open your browser and go to the PPIS address provided by your administrator.
2. On the sign-in page, locate the **Email address** field. Enter the **email address** registered for your account (this is your username for PPIS).
3. Enter your **password** in the **Password** field. Characters appear hidden for security.
4. Select **Sign in**.
5. Wait for the confirmation message. If login succeeds, the system opens the **Dashboard** after a short pause.

**Tip:** You can press the **Enter** key after typing your password to submit the form, the same as clicking **Sign in**.

## 3.2 One-Time Password (OTP) – Special Sign-In Links

Some deployments use a **special login link** that includes a secure key. In that situation:

1. After the first step succeeds, the screen may switch to **OTP entry**.
2. A code is sent to your **registered mobile number** and/or **email**.
3. Type the code and select **Enter OTP**.
4. If the code expires, use **Resend OTP** when it appears.

**Warning:** Never share OTP codes. Treat them like cash passwords.

## 3.3 New Account Request (Sign Up Here)

1. If your office allows self-service requests, select **Sign Up Here** on the login page.
2. Complete the **request form** as directed by your procedure.
3. Your **administrator** must still approve and activate the account before you can sign in.

## 3.4 Forgot Password or Locked Account

The standard login screen is focused on **email and password**. If you forget your password, or see a message that your account is **locked**:

1. **Stop** trying random passwords (multiple failures can lock the account).
2. Contact your **PPIS administrator** or **IT help desk** for a password reset or unlock.
3. Do not ask another employee to sign in on your behalf.

## 3.5 Security Reminders

1. **Log out** when you finish, especially on a shared computer (use **Logout** under your name on the top right).
2. Do not save passwords in the browser on **public** or **shared** PCs.
3. Report suspected unauthorized access immediately to your supervisor.

**Warning:** Sharing your password violates agency policy and exposes client data.

---

# 4. Dashboard Overview

## 4.1 What You See After Login

1. The **Dashboard** shows a welcome card: *Welcome to Parole and Probation Information System*.
2. Your **name** appears in the **top-right header** next to your profile image.
3. The **left side** shows the main **PPIS** menu (brand “PPIS” at the top of the panel when visible).

## 4.2 Main Menu Sections (What They Represent)

Menus are grouped to match how work moves through the agency:

| Menu group | What it is for |
|------------|----------------|
| Docketing – **Probation** | Investigation, supervision, and courtesy variants under the probation program track. |
| Docketing – **Parole and Pardon** | Investigation, supervision, and courtesy variants for parole / pre-parole style workflows. |
| **Docket Routing** | Moving dockets among offices or stages (Probation, Pre-Parole, Parole, Pardone). |
| **PDL Routing** | PDL-specific routing screen when your office uses that workflow. |
| **Sent** | Lists of items your office has sent out (by track: Probation, Pre-Parole, Parole, Pardone, PDL). |
| **Inbox** | Items received or pending intake (same track breakdown). |
| **Fact Sheet** | Client fact sheets for Probation, Parole/Pardone, and PDL (Single Carpeta) lists. |
| **Forms** | Agency form templates and uploads. |
| **My Organization** | Administrative screens (accounts, roles, field office, region, permission). |

**Important:** If you do not see a section, your **role permissions** hide it. This is normal.

## 4.3 Header Controls and Profile Menu

1. **Menu toggle** (top left): Shows or hides the left navigation on smaller screens.
2. **Profile image / name**: Open the drop-down and select **Logout** to end your session.

## 4.4 Notifications and Counters

Individual modules may show **badges**, **alerts**, or **table row counts** after lists load. Treat these as reminders to refresh your work queue—not as legal deadlines unless your office defines them that way.

---

# 5. Navigation and Screen Layout

## 5.1 Breadcrumbs

Near the top of many screens, **breadcrumbs** show where you are (for example, *Dashboard › Docket Routing › Forward*). Select a breadcrumb link to go back one level when available.

## 5.2 Cards, Tables, and Buttons

1. **Cards** group related information (titles like “Forward Docket” or “Investigation Docket List”).
2. **Tables** list dockets or clients with sortable columns where enabled (click column headers if your browser shows sort arrows).
3. **Buttons** use plain language: **View**, **Update**, **Attachments** / **Upload**, **Remove**, **Search**, **Forward**, **Return**, and so on.

## 5.3 Search Fields

Many lists provide a **Search** box. Typical behavior:

- Type part of a **docket number**, **CC number**, or **client name** (exact behavior is printed on the placeholder inside the box).
- Select the **search** (magnifying glass) button or follow on-screen instructions.
- Use **clear** (×) inside the box, when shown, to reset.

**Tip:** Start with the **smallest unique part** of a docket number (for example, the numeric suffix) if full matches fail.

---

# 6. Module Documentation

The sections below follow the same order as the **left menu**, for easier lookup.

### 6.1 Probation – Investigation Docketing

**Purpose:** Create and maintain **probation investigation** dockets for your field office.

**How to access:** Left menu **Probation › Investigation** (opens **Investigation** docketing list).

**Typical steps:**

1. Open the **Investigation** list.
2. Use **Add** or **Create** (if your role allows) to start a new docket, or select an existing row.
3. Use **View** to read details without changing them.
4. Use **Update** to change names, numbers, tasks, dates, or remarks as allowed.
5. Use **Attachments** (or **Upload**) to add PDFs, images, or documents the office requires.
6. Use **Remove** only when your procedure allows removal; confirm any warning message.

**Fields and controls (general patterns):** Lists show columns such as **Docket Number**, **Client Name**, **CC Number**, **Status**, and **Actions**. Forms for update/view repeat the same data in labeled fields.

**Validation and errors:** Missing required fields usually trigger a **red message** near the top or under the field. Correct the field and save again.

**Search / filter / export:** Use the list **Search** bar; export (Excel/PDF) appears only where a dedicated export or print button exists.

<<<SCREENSHOTS:Probation-Investigation>>>

---

### 6.2 Probation – Courtesy Investigation

**Purpose:** Handle **courtesy investigation** cases referred between offices or programs under probation rules.

**How to access:** **Probation › Courtesy Investigation**.

**Usage:** Same pattern as §6.1 (list, view, update, attachments, remove). Tasks and labels follow courtesy workflows.

<<<SCREENSHOTS:Probation-Courtesy Investigation>>>

---

### 6.3 Probation – Supervision Docketing

**Purpose:** Maintain **supervision** dockets (ongoing supervision after sentencing or program placement, per office rules).

**How to access:** **Probation › Supervision**.

**Usage:** List and row actions mirror investigation screens; supervision-specific **task** lists appear in routing and update screens.

<<<SCREENSHOTS:Probation-Supervision>>>

---

### 6.4 Probation – Courtesy Supervision

**Purpose:** **Courtesy supervision** tracking for probation.

**How to access:** **Probation › Courtesy Supervision**.

<<<SCREENSHOTS:Probation-Courtesy Supervision>>>

---

### 6.5 Parole and Pardon – Investigation

**Purpose:** Docketing for **parole / pre-parole investigation** style work under the Parole and Pardon branch menu.

**How to access:** **Parole and Pardon › Investigation**.

<<<SCREENSHOTS:Parole and Pardon - Investigation>>>

---

### 6.6 Parole and Pardon – Courtesy Investigation

**Purpose:** Courtesy investigation under the Parole and Pardon menu.

**How to access:** **Parole and Pardon › Courtesy Investigation**.

<<<SCREENSHOTS:Parole and Pardon - Courtesy Investigation>>>

---

### 6.7 Parole and Pardon – Supervision

**Purpose:** Supervision dockets for the Parole and Pardon menu.

**How to access:** **Parole and Pardon › Supervision**.

<<<SCREENSHOTS:Parole and Pardon - Supervision>>>

---

### 6.8 Parole and Pardon – Courtesy Supervision

**Purpose:** Courtesy supervision under Parole and Pardon.

**How to access:** **Parole and Pardon › Courtesy Supervision**.

<<<SCREENSHOTS:Parole and Pardon - Courtesy Supervision>>>

---

### 6.9 Docket Routing (Probation, Pre-Parole, Parole, Pardone)

**Purpose:** **Forward** or **return** dockets between offices or processing stages, with **Type** (Investigation or Supervision), **Docket Number**, **Task**, and **Remarks** selections.

**How to access:** **Docket Routing** submenu:

1. **Probation** – standard probation routing.
2. **Pre-Parole** – pre-parole start/inbox/sent supported via related routes (see Sent/Inbox).
3. **Parole** – parole track routing.
4. **Pardone** – pardone track routing.

**Typical forward flow:**

1. Open **Docket Routing ›** the track your instruction names.
2. Choose **Type** – **Investigation** or **Supervision** (labels may read exactly as on screen).
3. When **Docket Number** enables, pick the correct open docket.
4. Select the **Task** that matches the paper transmittal (examples on screen include investigation types, supervision types, revocation motions, records checks, and others—pick only what your routing memo states).
5. Enter **Remarks** if required.
6. Confirm **Forward** (or the primary action button shown). Wait for **Successfully Forward** or an error message.

**Warning:** Forwarding to the wrong **task code** sends the work queue to the wrong team. When unsure, ask your supervisor before submitting.

**Return / Upload variants:** Related routes (Return, Upload) use the same discipline: confirm **type**, **docket**, and **task** before saving.

<<<SCREENSHOTS:Docket Routing - PDL Routing>>>

---

### 6.10 PDL Routing

**Purpose:** Routing dedicated to **PDL** (Persons Deprived of Liberty) docket movement when your office enables it.

**How to access:** **PDL Routing** in the left menu.

*Screenshots for PDL routing use the same figure block as §6.9 when images are placed in the Docket Routing / PDL Routing folder.*

---

### 6.11 Sent (Probation, Pre-Parole, Parole, Pardone, PDL)

**Purpose:** Review items **your office has transmitted** or marked as sent, filtered by program track.

**How to access:** **Sent** submenu and choose the matching line (Probation, Pre-Parole, Parole, Pardone, PDL).

**Typical use:** Verify date/time, destination, and reference numbers before answering audit or status questions.

---

### 6.12 Inbox (Received)

**Purpose:** Review items **received** or awaiting action, by the same program tracks, plus **PDL** receive from TSD when applicable.

**How to access:** **Inbox** submenu.

**Typical use:** Acknowledge receipt in PPIS according to local procedure, then route or assign internally.

---

### 6.13 Fact Sheet (Probation, Parole and Pardone, PDL)

**Purpose:** Central **client lists** and **fact sheet** workflows—creating clients, updating demographic and case facts, uploads, and viewing consolidated information.

**How to access:** **Fact Sheet** menu:

| Submenu | Use |
|---------|-----|
| Probation | Probation client list and fact sheet. |
| Parole and Pardone | Combined parole/pardone client list. |
| PDL (Single Carpeta) | PDL / Single Carpeta client list. |

**Common actions:**

1. **Client list** – search or browse; open a row to **view** or **update**.
2. **New client** – where enabled, use the **new client** flow from the list screen.
3. **Worksheet / PSIR** – multi-step tabs or routes (Identifying Data, Present Offense, Family Background, and other sections). Complete tabs in order unless your supervisor directs otherwise.
4. **Uploads** – attach required PDFs or scans from the client’s folder.

**Warning:** Never create duplicate client records for the same person to “fix” a typo—ask an administrator how to correct identifiers.

<<<SCREENSHOTS:Fact Sheet - Probation>>>

<<<SCREENSHOTS:Fact Sheet - Parole and Pardon>>>

<<<SCREENSHOTS:Fact Sheet - PDL>>>

---

### 6.14 Forms

**Purpose:** Access **agency forms** list and **upload** completed forms where the module is used.

**How to access:** **Forms** in the left menu.

<<<SCREENSHOTS:Forms>>>

---

### 6.15 My Organization – User Accounts

**Purpose:** Create and maintain **staff login accounts** (administrators only).

**How to access:** **My Organization › User Accounts**.

<<<SCREENSHOTS:My Organization - User Accounts>>>

---

### 6.16 My Organization – User Roles

**Purpose:** Define **roles** and bundle **permissions** for PPIS menus and actions.

**How to access:** **My Organization › User Roles**.

<<<SCREENSHOTS:My Organization - User Roles>>>

---

### 6.17 My Organization – Field Office

**Purpose:** Maintain **field office** records tied to routing and assignments.

**How to access:** **My Organization › Field Office**.

<<<SCREENSHOTS:My Organization - Field Office>>>

---

### 6.18 My Organization – Region

**Purpose:** Maintain **region** reference data used with offices and routing.

**How to access:** **My Organization › Region**.

<<<SCREENSHOTS:My Organization - Region>>>

---

### 6.19 My Organization – Permission

**Purpose:** View or adjust **permission catalog** entries that can be assigned to roles (administrator function).

**How to access:** **My Organization › Permission**.

<<<SCREENSHOTS:My Organization - Permission>>>

---

# 7. Data Encoding Procedures

## 7.1 Adding Records

1. Navigate to the correct **module** (for example, Investigation docketing or Fact Sheet client list).
2. Select **New**, **Create**, or **Add** (exact label depends on the screen).
3. Fill **required fields** first (usually marked or validated on save).
4. Save. Note the **system-generated number** (docket or reference) shown in the confirmation or list.

**Tip:** Keep a scratch paper **checklist** of required attachments before you start—this reduces half-finished records.

## 7.2 Editing Records

1. Locate the record through **search** or paging.
2. Open **View** to confirm you have the correct person or docket.
3. Select **Update**; change only fields your role allows.
4. Save and wait for the **success** message.

**Warning:** Some fields may be **locked** after routing or approval. If a field cannot be edited, do not attempt workarounds—escalate to a supervisor.

## 7.3 Removing or Archiving Records

1. **Remove** appears only where policy allows.
2. Select **Remove**, read the confirmation text, and confirm only if authorized.
3. If your office uses **archive** instead of delete, follow the on-screen wording exactly.

## 7.4 Uploading Files and Documents

1. Open **Attachments**, **Upload**, or **File upload** from the row actions.
2. Choose **Browse** / **Choose File** and pick a supported file from your computer.
3. Wait until the progress or success message appears.
4. Repeat for each required document.

**Best practices:**

- Prefer **PDF** for official submissions; use clear file names (Docket_CCIS_ClientName.pdf).
- Scan legibly; **ocr** may not be available—human readers must be able to read the scan.
- Avoid extremely large images; compress scans if the system warns about size.

**Warning:** Uploading the wrong client’s document is a serious records error. Double-check the **docket number** in the page title before selecting **Upload**.

---

# 8. Printing and Reports

## 8.1 Generating Reports

1. Open the module that holds the report (for example, fact sheet view, PSIR section, or worksheet).
2. Look for **Print**, **Preview**, **Generate PDF**, or **Export** buttons.

## 8.2 Print Preview

1. Select **Print** or **Preview**; your browser may open a **preview** window.
2. Check **headers**, **page breaks**, and **margins** before choosing the printer.

**Tip:** Use **landscape** orientation for wide tables if the preview cuts off columns (printer dialog or page setup).

## 8.3 Export to PDF or Excel (Where Available)

1. **Export to PDF** or **Download PDF** saves a portable file suitable for email or e-filing (if permitted).
2. **Excel export**, when present, is useful for sortable working lists—**do not** treat exported spreadsheets as the official record unless your policy says so.

**Warning:** Exported files may contain **personal data**. Store them only on approved drives and share only through secure channels.

---

# 9. User Roles and Permissions

Access is controlled by **User Roles** and **Permissions** configured in **My Organization**. Names below are typical; your deployment may rename them.

| Role | What they usually do |
|------|----------------------|
| **Administrator** | Creates users; assigns roles; configures offices, regions, permissions; may access all modules. |
| **Supervisor** | Oversees queues; may have broader routing rights; approves sensitive corrections per policy. |
| **Encoder** | Creates and updates daily operational records; uploads attachments; performs routing actions. assigned by office. |
| **Viewer** | Read-only access to assigned modules—no create/update/remove. |

**Important:** If a button never appears, assume **permission**, not a system fault—request access through your administrator.

---

# 10. Troubleshooting

| Problem | What to try |
|---------|-------------|
| **Cannot log in** | Check caps lock; confirm email; reset password through admin; verify account not locked. |
| **OTP not received** | Confirm mobile signal; check spam folder; wait for resend window; contact admin if repeated. |
| **Menus hidden** | Log out and log in; clear site data only with IT guidance; verify role still active. |
| **List will not load** | Reload page; try another browser; verify network; check if API/server maintenance. |
| **Validation errors** | Read field message; fill mandatory items; remove stray spaces; match date format on screen. |
| **Upload fails** | Reduce file size; try PDF; verify file type allowed; retry off-peak hours if network is slow. |
| **Print alignment wrong** | Use print preview; adjust margins; disable browser headers/footers if they collide with letterhead. |

---

# 11. Frequently Asked Questions

**Q1. Why does my colleague see menus I do not see?**  
A: Your **roles** differ. Request the same permission only if your job requires it.

**Q2. Can I use one account for the whole team?**  
A: No. Individual accounts preserve **audit accountability**.

**Q3. I picked the wrong task on forwarding—what now?**  
A: Notify your **supervisor** immediately; follow your office’s correction process (return docket or administrative fix).

**Q4. Can I work from home?**  
A: Only through **approved devices** and **VPN** per agency IT policy.

**Q5. Where do I print PSIR or worksheets?**  
A: From the **Fact Sheet / worksheet / PSIR** screens once data is complete—exact buttons vary by section.

---

# 12. Glossary of Terms

| Term | Plain meaning |
|------|----------------|
| **PPIS** | Parole and Probation Information System (this web application). |
| **Docket** | Electronic case folder tracked in PPIS with a unique number. |
| **Investigation** | Fact-finding stage before or during supervision (usage depends on program). |
| **Supervision** | Ongoing monitoring and reporting after disposition. |
| **Courtesy case** | Case handled on behalf of or in coordination with another office. |
| **Routing** | Official movement of a docket between units or offices. |
| **Fact Sheet** | Structured summary of identifying and case facts for a client. |
| **PSIR** | Pre-Sentence Investigation Report sections (when enabled). |
| **PDL** | Persons Deprived of Liberty track. |
| **OTP** | One-time password used on special login paths. |
| **Field Office** | Your parole and probation district or sub-office entity in the system. |

---

# 13. Contact and Support

1. **Application / account access:** PPIS **System Administrator** at your Field Office or Regional Office.  
2. **Password reset / locked account:** Same administrator or internal IT **help desk**.  
3. **Network, VPN, browser:** Agency **Information Technology** unit.  
4. **Policy questions (what to encode, routing, legal sufficiency):** Your **immediate supervisor** or **legal unit**—this manual does not interpret law or local memoranda.

**Office use record (optional):**

| Field | Entry |
|-------|--------|
| Issued to | _________________________ |
| Date received | _________________________ |
| Contact number | _________________________ |

---

*End of document.*
