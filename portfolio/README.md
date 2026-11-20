# Mahmoud Mohammed — Personal Developer Portfolio

> **Production-grade, modern, accessible, and high-performance developer portfolio built with Pure HTML5, CSS3, and Vanilla JavaScript (No frameworks or external libraries).**

---

## 🌟 Key Features

- **Dual Color System (Dark & Light Mode)**:
  - **Dark Mode**: Primary Background (`#071B2B`), Secondary/Accent (`#167D8D`), Highlight (`#B9E4E8`), Text (`#EEEEEE`).
  - **Light Mode**: Primary Background (`#F5F5F0`), Secondary (`#E6D8C3`), Accent (`#C2A68C`), Text (`#5D866C`).
  - Fully persisted in `localStorage` across page reloads.
  - Automatic system preference detection (`prefers-color-scheme`).
- **Sticky / Adaptive Navigation Bar**:
  - Backdrop blur filter and smooth scroll transition when scrolling.
  - Active section link tracker via modern `IntersectionObserver`.
  - Responsive mobile hamburger menu with smooth toggle, body scroll lock, and ESC/click-outside dismiss.
- **Scroll Reveal Animations**:
  - Smooth element appearance with `IntersectionObserver` (fade-in, slide-up, staggered delays).
- **Subtle Background Parallax**:
  - Hardware-accelerated glowing gradient blobs and subtle geometric grid responding to mouse movement.
- **Pure Vanilla JS Testimonial Carousel**:
  - Previous / Next buttons.
  - Dynamic indicator dots.
  - Autoplay with hover pause and visibility change awareness.
  - Touch swipe support on smartphones and tablets.
- **Interactive Contact Form with Client-Side Validation**:
  - Validation for full name, email format, subject, and message length.
  - Real-time inline field feedback and alert messages.
  - Clean designated hook for EmailJS, Formspree, or custom Node.js/Express API.
- **Zero Framework Overhead**:
  - Instant loading speed, lighthouse-friendly, no npm dependencies, no build steps required.

---

## 📂 Project Structure

```text
portfolio/
│
├── index.html              # Main HTML5 semantic structure & SEO metadata
│
├── css/
│   └── style.css           # CSS3 design system, themes, animations & media queries
│
├── js/
│   └── script.js           # Vanilla JS: themes, navigation, carousel, form, parallax
│
├── assets/
│   ├── images/             # Store your personal portrait, avatar & about photos
│   ├── icons/              # Custom icons or favicons
│   └── projects/           # Store screenshots of your featured projects
│
└── README.md               # Documentation & customization guide
```

---

## 🛠️ Step-by-Step Customization Guide

All personal placeholders in `index.html` are clearly marked with `<!-- EDIT: ... -->` comments.

### 1. Adding Your Profile Image
In `index.html` inside the **Hero Section** (`#home`):
Find the comment `<!-- EDIT: Add your profile image here -->`.
Replace the placeholder with your actual image file placed in `assets/images/`:
```html
<img src="assets/images/profile.jpg" alt="Mahmoud Mohammed" style="width:100%; height:100%; object-fit:cover; border-radius:inherit;">
```

### 2. Adding Your About Me Image
In `index.html` inside the **About Me Section** (`#about`):
Find `<!-- EDIT: Add your about image or desk setup photo here -->`.
Replace the placeholder box with:
```html
<img src="assets/images/about.jpg" alt="Mahmoud Mohammed Workspace" style="width:100%; height:100%; object-fit:cover; border-radius:inherit;">
```

### 3. Editing Years of Experience & Companies
In `index.html` inside the **About Me Section** (`#about`):
- Find `<!-- EDIT: Replace X+ Years with your actual years -->` and change `X+ Years` to your value (e.g. `2+ Years`).
- Find `<!-- EDIT: Replace X+ with your number of companies -->` and change `X+` to your value (e.g. `3+`).

### 4. Updating Graduation Grade
In `index.html` inside the **Education Section** (`#education`):
Find:
```html
<span>Graduation Grade: [ADD YOUR GRADE]</span>
```
Change `[ADD YOUR GRADE]` to your grade (e.g. `Excellent with Honors` or `3.85 GPA`).

### 5. Adding Work & Practical Experience
In `index.html` inside the **Experience Section** (`#experience`):
Find the placeholder timeline cards:
```html
<h3 class="timeline-title">[POSITION]</h3>
<div class="timeline-org">[COMPANY NAME]</div>
<span class="timeline-date">[DATE]</span>
```
Fill in your real experience, or duplicate the card blocks as your career progresses.

### 6. Updating Featured Projects & Screenshots
In `index.html` inside the **Featured Projects Section** (`#projects`):
For each project:
1. Replace `[PROJECT SCREENSHOT PLACEHOLDER]` with your screenshot:
   ```html
   <img src="assets/projects/project-01.png" alt="Project 01 Screenshot" style="width:100%; height:100%; object-fit:cover;">
   ```
2. Update the project title: `[Project Name 01]`.
3. Update the description and technology badges.
4. Replace `https://github.com/[YOUR_USERNAME]/[PROJECT_REPO_01]` with your real GitHub repository URL.

### 7. Configuring WhatsApp and Gmail Links
In `index.html` inside the **Contact Section** (`#contact`):
- **WhatsApp**:
  Replace `https://wa.me/[YOUR_NUMBER]` with your international phone number without spaces or `+` (e.g., `https://wa.me/201012345678`).
  Change text `[ADD YOUR WHATSAPP NUMBER]` to your visible number (e.g. `+20 10 1234 5678`).
- **Gmail**:
  Replace `mailto:[YOUR_EMAIL]` with your address (e.g., `mailto:mahmoud@gmail.com`).
  Change text `[ADD YOUR GMAIL ADDRESS]` to `mahmoud@gmail.com`.

### 8. Updating Footer & Social Links
In `index.html` inside the `<footer>`:
Replace the placeholder URLs for:
- GitHub: `https://github.com/[YOUR_GITHUB]`
- LinkedIn: `https://linkedin.com/in/[YOUR_LINKEDIN]`
- WhatsApp: `https://wa.me/[YOUR_WHATSAPP]`
- Email: `mailto:[YOUR_EMAIL]`

---

## ⚡ Connecting the Contact Form to Send Real Emails

This portfolio includes full client-side validation in `js/script.js`. To deliver submitted messages directly to your inbox without running your own server, choose one of these options:

### Option A: EmailJS (Free & Client-Side)
1. Sign up at [EmailJS](https://www.emailjs.com/).
2. Add the EmailJS script tag in `index.html` `<head>`:
   ```html
   <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
   <script type="text/javascript">
      (function(){ emailjs.init("YOUR_PUBLIC_KEY"); })();
   </script>
   ```
3. In `js/script.js` inside `initContactForm()`, replace the simulation with:
   ```javascript
   emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
     from_name: nameInput.value,
     from_email: emailInput.value,
     subject: subjectInput.value,
     message: messageInput.value
   }).then(() => {
     feedbackBox.className = 'form-feedback success';
     feedbackBox.innerHTML = `<span>Thank you! Your message was sent successfully.</span>`;
     form.reset();
   });
   ```

### Option B: Formspree
1. Create a form at [Formspree](https://formspree.io/).
2. Add `action="https://formspree.io/f/YOUR_FORM_ID"` and `method="POST"` to `#contact-form` in `index.html`.

---

## 🎨 Customizing Color Palettes

All colors are controlled through CSS variables at the top of `css/style.css`:

```css
/* Dark Mode */
[data-theme="dark"] {
  --primary-color: #071B2B;    /* Main dark background */
  --secondary-color: #167D8D;  /* Main accent */
  --highlight-color: #B9E4E8;  /* Glowing highlight */
  --text-color: #EEEEEE;       /* Base typography */
}

/* Light Mode */
[data-theme="light"] {
  --primary-color: #F5F5F0;    /* Main light background */
  --secondary-color: #E6D8C3;  /* Warm surface */
  --accent-color: #C2A68C;     /* Warm accent */
  --text-color: #5D866C;       /* Readable sage text */
}
```

---

## 🚀 How to Run the Website Locally

You can run the portfolio in any of these ways:

1. **Directly in your browser**:
   Double click `index.html` inside the `portfolio/` folder.
2. **Using VS Code Live Server**:
   Right click `index.html` -> "Open with Live Server".
3. **Using Python**:
   ```bash
   cd portfolio
   python -m http.server 3000
   ```
   Open `http://localhost:3000` in your web browser.

---

## 📄 License
© 2026 Mahmoud Mohammed. All Rights Reserved.
Distributed under the MIT License for personal use.
