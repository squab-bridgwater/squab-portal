# Squab Portal

A lightweight, installable portal for launching Squab internal web apps from one place.

## Current apps

- Social Creator
- Pricing / Unit Finder
- Insurance Audit
- Operations (Dev)
- Electricity (Dev)

## Design

- Responsive layout for laptop, tablet and mobile
- Squab brand colour palette and typography
- Installable as a Progressive Web App (PWA)
- Portal shell available offline after first visit
- No portal login; each linked app keeps its own authentication
- Hidden from search-engine indexing

## Firebase Hosting

This repository is prepared for Firebase Hosting using the project ID `squab-portal`.

When the Firebase project exists, deploy with:

```sh
firebase use squab-portal
firebase deploy --only hosting
```

## Adding another app

Edit the `apps` array in `public/app.js`. Each app has a name, description, URL, status and icon type. The page layout does not need to be rebuilt when another app is added.
