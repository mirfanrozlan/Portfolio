# Portfolio Images Guide

This folder contains all images for your portfolio website. Follow this structure to organize your project images and certificates.

## Folder Structure

```
images/
├── projects/          # Project screenshots and demos
├── certificates/      # Award certificates and achievements
└── README.md         # This guide
```

## Image Placement Instructions

### 1. Featured Project (Pineapple Maturity Classification)

**Location**: `images/projects/pineapple-classification-demo.jpg`
- **Recommended Size**: 1200x675px (16:9 aspect ratio)
- **Content**: Screenshot of your system in action, showing:
  - Pineapple detection interface
  - Classification results
  - Mask R-CNN visualization
  - Real-time processing demo

### 2. Other Project Images

Place these images in the `images/projects/` folder:

- `weather-predictor-demo.jpg` - Smart Weather Predictor interface
- `taskflow-mobile-demo.jpg` - TaskFlow Mobile app screenshots
- `cloudsync-dashboard-demo.jpg` - CloudSync Dashboard interface
- `cryptowallet-dapp-demo.jpg` - CryptoWallet DApp interface
- `streamhub-platform-demo.jpg` - StreamHub Platform interface
- `dataviz-analytics-demo.jpg` - DataViz Analytics dashboard

**Recommended Size**: 800x450px (16:9 aspect ratio)

### 3. Award Certificate

**Location**: `images/certificates/silver-award-certificate.jpg`
- **Recommended Size**: 1000x700px
- **Content**: Your Silver Medal certificate from the Final Year Project competition
- **Usage**: Can be displayed in a dedicated awards section or as a modal popup

## Image Optimization Tips

1. **Format**: Use WebP for better compression, with JPG fallback
2. **Compression**: Optimize images to keep file sizes under 500KB
3. **Alt Text**: Each image should have descriptive alt text for accessibility
4. **Responsive**: Images will automatically scale on different screen sizes

## How to Add Images

1. Save your images in the appropriate folders
2. Uncomment the `<img>` tags in `index.html`
3. Update the `src` attributes to match your image filenames
4. Add appropriate `alt` text for accessibility

## Example Implementation

To replace the placeholder for the featured project:

```html
<!-- Replace this line in index.html -->
<!-- <img src="images/projects/pineapple-classification-demo.jpg" alt="Pineapple Maturity Classification Demo" class="w-full h-full object-cover rounded-xl"> -->

<!-- With this -->
<img src="images/projects/pineapple-classification-demo.jpg" alt="Pineapple Maturity Classification System showing real-time detection and classification of pineapple maturity levels" class="w-full h-full object-cover rounded-xl">
```

## Additional Features

- **Silver Award Badge**: Already implemented and visible on the featured project
- **Hover Effects**: Images have smooth hover transitions
- **Responsive Design**: Images adapt to different screen sizes
- **Loading States**: Placeholders show while images load

Once you add your images, your portfolio will have a complete visual presentation of your projects and achievements!