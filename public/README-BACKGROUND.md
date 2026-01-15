# Background Image Setup

## Option 1: Use CSS Gradient (Current - No Image Needed)

The website currently uses a CSS-based futuristic gradient background that doesn't require any image files. This is already implemented and working.

## Option 2: Use Custom Background Image

If you want to use a custom background image instead:

### Step 1: Generate/Create Image

Use an AI image generator (like DALL-E, Midjourney, Stable Diffusion, or similar) with this prompt:

```
A high-resolution, professional, and futuristic background image for a solar energy website. The design should feature subtle, abstract geometric patterns, glowing cyan and electric blue light accents against a dark, sleek backdrop. Incorporate minimalist representations of solar panels or abstract data streams. The style is modern, cinematic, and 8k ultra-detailed, with a wide landscape aspect ratio, subtle gradients, and high contrast. No text, no watermarks, no prominent central subjects that would obstruct the website content.
```

### Step 2: Save Image

1. Save the image as `futuristic-solar-bg.webp` (or `.jpg`, `.png`)
2. Place it in the `public/` folder
3. For high-res displays, optionally create `futuristic-solar-bg-highres.webp` (2x resolution)

### Step 3: Update CSS

In `src/index.css`, uncomment the background-image section and comment out the gradient:

```css
body {
  /* Comment out the gradient background */
  /* background: linear-gradient(...); */
  
  /* Uncomment and use your image */
  background-image: url('/futuristic-solar-bg.webp');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  background-attachment: fixed;
  background-color: rgba(0, 0, 0, 0.4);
}
```

### Step 4: High-Resolution Support

For Retina/high-DPI displays, add this to your CSS:

```css
@media screen and (-webkit-min-device-pixel-ratio: 2), 
       screen and (min-resolution: 192dpi) {
  body {
    background-image: url('/futuristic-solar-bg-highres.webp');
  }
}
```

## Recommended Image Specifications

- **Format**: WebP (best) or JPG/PNG
- **Resolution**: 3840x2160 (4K) minimum, 7680x4320 (8K) for high-res version
- **Aspect Ratio**: 16:9 (landscape)
- **File Size**: Optimize to < 500KB for web performance
- **Style**: Dark, futuristic, abstract geometric patterns
- **Colors**: Cyan (#00ffff), Electric Blue (#1E88E5), Dark backgrounds

## Current Implementation

The site currently uses a CSS gradient background that:
- ✅ No image file needed
- ✅ Fast loading
- ✅ Responsive
- ✅ Futuristic look with animated grid overlay
- ✅ Works on all devices

You can keep this or switch to a custom image using the steps above.
