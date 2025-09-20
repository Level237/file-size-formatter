# martindev237/file-size-formatter

Un utilitaire JavaScript pour convertir des tailles de fichiers en formats lisibles par l'humain (ex. 1024 → "1 KB").

## Objectif
Ce package simplifie l'affichage des tailles de fichiers dans vos applications, évitant de réécrire du code courant. Idéal pour les dashboards, les gestionnaires de fichiers, ou les APIs web.

## Installation
```bash
npm install martindev237/file-size-formatter
```

## Utilisation
```javascript
const formatFileSize = require('martindev237/file-size-formatter');

console.log(formatFileSize(1024)); // "1 KB"
console.log(formatFileSize(123456789, 1)); // "117.7 MB"
console.log(formatFileSize(0)); // "0 Bytes"
```

## Options
- `bytes` : Taille en bytes (requis, nombre).
- `decimals` : Nombre de décimales (optionnel, défaut : 2).

## Licence
MIT