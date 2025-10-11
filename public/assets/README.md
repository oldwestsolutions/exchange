# Assets Folder

This folder contains static assets for the BridgeObserver application.

## Folder Structure

```
public/assets/
├── images/     # Photos, backgrounds, hero images
├── icons/      # Logo files, favicons, app icons
└── fonts/      # Custom web fonts (if any)
```

## Usage

### Accessing Assets in Code

Files in the `public` folder can be referenced directly:

```tsx
// In React components
<img src="/assets/images/logo.png" alt="Logo" />
<img src="/assets/icons/favicon.ico" />

// In CSS
background-image: url('/assets/images/hero-bg.jpg');
```

### Best Practices

1. **Images**
   - Use descriptive filenames (e.g., `hero-background.jpg`, `article-thumbnail.png`)
   - Optimize images before adding (compress, resize)
   - Recommended formats: WebP for photos, SVG for icons/logos

2. **Icons**
   - Use SVG format for scalability
   - Keep icon files small (<50KB)
   - Name consistently (e.g., `icon-dashboard.svg`)

3. **Fonts**
   - Only add if custom fonts are needed
   - Include all font weights/styles being used
   - Consider using system fonts or Google Fonts CDN first

## File Size Recommendations

- Icons: < 50KB
- Images: < 500KB (optimize larger images)
- Fonts: < 200KB per font file

## Adding Assets

Simply drag and drop your files into the appropriate subfolder:

- Logo → `public/assets/icons/logo.svg`
- Hero image → `public/assets/images/hero.jpg`
- Favicon → `public/assets/icons/favicon.ico`

Assets are served at: `http://localhost:3003/assets/...`

