# Personal Portfolio — Software Engineer · DevOps Enthusiast · Data Analyst

A responsive, frontend-only portfolio for a B.Sc. IT student and fresher, built with
plain HTML5, CSS3 and vanilla JavaScript. No frameworks, no build step, no dependencies.

## Run it

Download the folder and open `index.html` in any browser.

The PDF preview in the Resume section is the only part that behaves differently across
browsers when opened from `file://`. If it looks blank locally, serve the folder instead:

```bash
python3 -m http.server 8000     # then visit http://localhost:8000
```

## File structure

```
portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── profile-placeholder.png
│   └── YourName_Resume.pdf
└── README.md
```

## What's included

- Sticky navbar with monogram, active-link indicator and mobile hamburger menu
- Hero with two calls to action and a profile card
- About with honest stats (no fabricated experience)
- Career focus: three cards, one colour per track (teal = software, amber = DevOps, violet = data)
- Skills with "Familiar / Practicing / Learning" labels instead of fake percentage bars
- 12 projects with category filtering (All / Software engineering / DevOps / Data analytics)
- Resume section with open, download and inline PDF preview
- Education timeline, languages, contact details and a validated contact form
- Footer, back-to-top button, dark/light theme toggle, scroll reveal animations

Accessibility and quality: semantic HTML5, correct heading order, labelled form fields,
visible focus rings, `prefers-reduced-motion` support, alt text on images, CSS variables,
and no inline CSS or JavaScript.

## Deploying to GitHub Pages

1. Push the folder to a repository.
2. Settings → Pages → Source: `main` branch, `/root`.
3. Update `og:url` in `index.html` to the published address.

---

# Personal Details to Replace

Everything below ships as a placeholder. Search for the bracketed text or the
`yourusername` / `your.email` strings and replace them.

| # | Placeholder | Where to change it |
|---|---|---|
| 1 | **[Your Name]** | `index.html` — `<title>`, meta description, `og:title`, `og:description`, `author`, navbar `.logo__text`, hero greeting, hero profile card name, resume iframe `title`, footer. Also the comment headers in `style.css` and `script.js`. |
| 2 | **Initials monogram ("US")** | `index.html` → `.logo__mark`. Use your own two initials. |
| 3 | **[College Name]** | `index.html` → Education section, `.timeline__org`. |
| 4 | **[University Name]** | `index.html` → Education section, `.timeline__org`. |
| 5 | **[City, State] / [Start Year]** | `index.html` → Education section, `.timeline__meta`. |
| 6 | **[Expected Graduation Year]** | `index.html` → Education section, second `.timeline__meta`. |
| 7 | **Email** (`your.email@example.com`) | `index.html` → Contact list (`mailto:` link and visible text) and the footer Email link. |
| 8 | **Phone** (`+91 XXXXX XXXXX`) | `index.html` → Contact list. Update both the `tel:+91XXXXXXXXXX` href and the visible number. |
| 9 | **Location** (`Mumbai, Maharashtra, India`) | `index.html` → hero profile card `.hero__card-loc` and the Contact list. |
| 10 | **GitHub** (`https://github.com/yourusername`) | `index.html` → Contact list, footer, and the "View project" / "GitHub" buttons on all 12 project cards. Point each card at its own repository. |
| 11 | **LinkedIn** (`https://www.linkedin.com/in/yourusername`) | `index.html` → Contact list and footer. |
| 12 | **Resume PDF** (`assets/YourName_Resume.pdf`) | Drop your real PDF into `assets/`. If you keep the same filename nothing else changes. If you rename it, update `RESUME_PATH` and `RESUME_FILENAME` at the top of `js/script.js`, the hero download button, the iframe `src` and the fallback link in `index.html`. |
| 13 | **Profile photo** (`assets/profile-placeholder.png`) | Replace the file with a square photo (roughly 480×480), or keep the filename and swap the image. Update the `alt` text in `index.html`. |
| 14 | **Site URL** (`og:url`) | `index.html` → Open Graph meta tag, once the site is live. |

### Before you publish

- Confirm every project card links to a repository that actually exists; remove any card you haven't built yet.
- The contact form validates input but does not send mail. To make it live, connect it to
  Formspree, EmailJS or your own endpoint inside `initForm()` in `js/script.js`, replacing
  the success message with a real request.
- Keep the wording honest — the copy deliberately says "student", "fresher", "interested in"
  and "learning" rather than claiming experience.
