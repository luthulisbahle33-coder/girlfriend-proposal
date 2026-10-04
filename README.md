# For Khanya — GitHub Pages bundle

A standalone, mobile-first scrapbook love letter. It has no build step, packages, API, framework, analytics, or backend. This folder is the complete static site source; upload its **contents**, not the enclosing `github-pages` folder, to a GitHub repository.

## Files included

- `index.html` — page content, photo references, Apple Music player, and metadata.
- `style.css` — layout, colors, typography, and responsive styling.
- `script.js` — photo fallbacks, scroll reveals, player loading, and proposal interactions.
- `favicon.svg`, `favicon.ico`, `favicon-32x32.png`, and `apple-touch-icon.png` — browser-tab and mobile-home-screen icons.
- `.nojekyll` — tells GitHub Pages to serve the static files without Jekyll processing.
- `robots.txt` — asks search crawlers not to index this personal page. It is not access protection; anyone with the public Pages URL can still view the site.
- `photos/` — all 12 scrapbook images, the final couple photo, and photo replacement notes.
- `README.md` — these setup and editing instructions.

## Replace the photographs

The supplied photos are included and optimized in `photos/`. The final-page image is the couple photo by the brick wall. Replace any file later with another image using the same filename:

- `photo-01.jpg` — Khanya in a pink top, sitting in sunlight
- `photo-02.jpg` — Khanya with a star sticker
- `photo-03.jpg` — a close selfie of you together
- `photo-04.jpg` — a close selfie in a white top
- `photo-05.jpg` — skincare-mask selfie
- `photo-06.jpg` — a cozy selfie from bed
- `photo-07.jpg` — mirror selfie in a white top
- `photo-08.jpg` — a sleepy FaceTime moment
- `photo-09.jpg` — cropped mirror selfie
- `photo-10.jpg` — full-length mirror selfie in a black dress
- `photo-11.jpg` — your shoes together
- `photo-12.jpg` — Khanya in her pink bonnet
- `final-couple-photo.jpg` — the photo of you together in the final heart

Keep the names and `.jpg` extension, or update the corresponding relative `src`/`href` in `index.html` if using another format. The scrapbook photos use `object-fit: cover`; the final couple photo is clipped to the heart. The supplied files have been resized and compressed for web use. Photo 09 was cropped to remove the phone lock-screen text and controls.

Each memory keeps a labeled illustrated fallback in case a photo is missing. The supplied photos load locally from this folder; the album art and music player need an internet connection.

## Content and interactions

- `index.html` contains all proposal copy, photo slots, memory captions, visual song cards, and page structure.
- `style.css` controls the paper, color, type, responsive layouts, decorative art, and motion.
- `script.js` handles photo fallbacks, scroll reveals, the Apple Music player, the playful NO joke, YES celebration, and replay.
- `photos/README.md` repeats the replacement filenames beside the image folder.

The first song, “Letter Home” by Childish Gambino, loads Apple’s official embedded player when requested. Press play inside that player to listen; a direct Apple Music link is available if the embed is restricted. Apple may limit visitors who are not signed in with an eligible Apple Music subscription to a short preview; full playback requires Apple Music access and authorization. The six album-cover Polaroids link to their songs on Apple Music in a new tab. Album artwork is served from Apple’s CDN, so these music features need an internet connection. This bundle does not include or rehost the song audio.

The NO button is a transparent joke, not a gate: it dodges at most twice, then settles into a clearly labeled no-pressure message. It works by touch and mouse, and nothing blocks leaving or navigating away. Choosing YES triggers an on-page celebration only; no data is sent or stored.

## Publish with GitHub Pages

1. Create a GitHub repository for the site.
2. Upload or copy the **contents** of this `github-pages/` folder so `index.html` is at the repository root. Keep `photos/`, the CSS, JavaScript, icons, `robots.txt`, and `.nojekyll` beside it. Alternatively, put the same contents inside a folder named `docs`.
3. In the repository, open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, select your publishing branch (often `main`) and `/ (root)`—or `/docs` if you used that folder—and save.
4. Wait for GitHub Pages to finish publishing, then open the site URL shown in **Settings → Pages**.

There is no build command or package installation. All local page and photo paths are relative, so the site works at a repository URL such as `/repository-name/`. Do not add a leading slash to local asset paths. The Google Fonts import is optional; local font fallbacks are included. Photos are stored locally, while Google Fonts and Apple Music artwork/player need an internet connection.