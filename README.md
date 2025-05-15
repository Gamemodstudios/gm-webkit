# gm-webkit

A toolkit by Gamemodstudios for web-based applications. This package provides reusable web components for progress indicators, including loading bars, spinners, animated text, and more.

## Features

- Custom HTML elements for progress indicators
- Easy to use and style
- No dependencies

## Installation

```sh
npm install gm-webkit
```

Or use directly in the browser by adding a script tag in the header:

```html
<script src="https://cdn.jsdelivr.net/npm/gm-webkit@0.0.1/spiners/progress-indicators.js"></script>
```

## Usage

### In HTML (Browser)

Add the following script tag to your HTML `<head>` to load the components from the CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/gm-webkit@0.0.1/spiners/progress-indicators.js"></script>
```

Then use the custom elements:

```html
<loading-bar></loading-bar>
<loading-spinner></loading-spinner>
<loading-text></loading-text>
<loading-jumping-container count="5"></loading-jumping-container>
```

You can customize color, size, and text:

```html
<loading-bar color="#e91e63" height="8px"></loading-bar>
<loading-spinner color="#009688" size="64px"></loading-spinner>
<loading-text color="#ff9800" text="Please Wait"></loading-text>
<loading-jumping-container color="#673ab7" size="12px" count="7"></loading-jumping-container>
```

### Example

See `spiners/index.html` for a live example.

## License

MIT

## Author

Gamemodstudios

## Links

- [GitHub Repository](https://github.com/Gamemodstudios/gm-webkit)
- [Report Issues](https://github.com/Gamemodstudios/gm-webkit/issues)
