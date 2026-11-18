# Squab Portal

An installable, responsive launcher for Squab internal applications and branch resources.

## Current menu

- Social Creator (Live)
- Pricing / Unit Finder (Live)
- Insurance Audit (Live)
- Operations (Dev)
- Electricity (Live)
- Group Activity (Live)
- Squab Rota (Live)
- Branch Activity Sheets (Live, expandable group of six Google Sheets)
- Digital Governance Overview (Live)
- Site Audits (Dev)

## Design and behaviour

- Four compact tiles per row on wide desktops, three or two at narrower sizes, two on mobile.
- Expandable groups use accessible native `details`/`summary` and hide links until expanded.
- Search finds apps, grouped resources and individual branch names. Searching for a branch expands its group.
- Live and Dev filters apply to the menu.
- Squab background photo, logo, colours and font remain in place.
- Linked apps open in the same tab. The Portal has no login, and Google Sheets and other apps retain their own access controls.
- Installable PWA with an offline-cached launcher.
- Portal remains hidden from search-engine indexing.

## Add or update an app

Edit the `apps` array at the top of `public/app.js`.

For a normal tile, add `name`, `description`, `url`, `status` (`Live` or `Dev`) and `icon`.

For a grouped tile, use `type: 'group'` and `links: [{ name: 'Branch name', url: 'https://...' }]` instead of a top-level `url`. The tile automatically expands to show each link. Groups can contain any number of links.

After editing `app.js`, update its version query in `public/index.html`, the cached asset version and cache name in `public/service-worker.js`. Existing GitHub Actions deploy to Firebase Hosting after pushes to `main`.

## Firebase Hosting

Project: `squab-portal`. Hosting directory: `public`.
Live site: https://squab-portal.web.app/
