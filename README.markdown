# @martindev/file-size-formatter

A JavaScript utility to convert file sizes into human-readable formats (e.g., 1024 → “1 KB”).

## Objectif
This package simplifies the display of file sizes in your applications, avoiding the need to rewrite common code. Ideal for dashboards, file managers, or web APIs.

## Installation
```bash
npm install @martindev237/file-size-formatter
```

## Usage
```javascript
const formatFileSize = require('@martindev237/file-size-formatter');

console.log(formatFileSize(1024)); // "1 KB"
console.log(formatFileSize(123456789, 1)); // "117.7 MB"
console.log(formatFileSize(0)); // "0 Bytes"
```

## Options
- `bytes` : Size in bytes (required, number).
- `decimals` : Number of decimal places (optional, default: 2).

## Licence
MIT