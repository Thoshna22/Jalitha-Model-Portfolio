# Jalitha Induwara — Static Portfolio

This is a pure HTML, CSS, and JavaScript website. No build step, server, API, or environment variables are required.

The inquiry form validates the fields and opens the visitor’s default email app with a pre-filled message addressed to Jalitha. The visitor sends the email from their own email app.

## Open locally

Double-click `index.html`. All asset paths are relative, so it also works from a GitHub Pages project URL.

## Add photographs

1. Place real image files in `assets/images/portfolio/` (and optionally hero or profile folders).
2. In `data.js`, set `heroImage`, `aboutImage`, or `ctaImage` to the appropriate relative image path.
3. Add each gallery image to `portfolioItems`, for example:

```js
const portfolioItems = [
  { image: "assets/images/portfolio/portrait-01.jpg", category: "Fashion", title: "Portrait 01" }
];
```

Only the categories represented by actual items appear as gallery filters. Do not add a path until the file exists.

## Update information and social links

Edit the `modelData` object in `data.js`. Leave a social-link value empty to hide it. The site does not invent social URLs.

## Add model profile PDF

Put the real profile PDF at `assets/documents/Jalitha-Induwara-Model-Profile.pdf`, then set:

```js
profilePdf: "assets/documents/Jalitha-Induwara-Model-Profile.pdf"
```

in `data.js`. The download link stays hidden until a path has been supplied.

## Deploy to GitHub Pages

1. Create a GitHub repository and upload this folder’s contents.
2. In the repository, open **Settings → Pages**.
3. Set **Build and deployment** to **Deploy from a branch**.
4. Select the `main` branch and the `/ (root)` folder, then save.
5. Open the GitHub Pages URL shown by GitHub.

Because all paths are repository-relative, no configuration change is required for a project Pages site.
