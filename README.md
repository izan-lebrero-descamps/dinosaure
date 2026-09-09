# Dinosaure

Joc del dinosaure fet amb JavaScript vanilla sobre `<canvas>`, sense dependències ni build.

## Arrencar el servidor

El joc fa servir mòduls ES (`<script type="module">`), que el navegador bloqueja si obres
l'`index.html` directament amb `file://`. Cal servir-lo per HTTP:

```bash
node server.js
```

I obrir http://localhost:8000

El port es pot canviar per argument o per variable d'entorn:

```bash
node server.js 3000
PORT=3000 node server.js
```

`server.js` és un servidor estàtic mínim (només mòduls natius de Node, res a instal·lar) que
serveix els fitxers de la carpeta del projecte amb el seu MIME type i sense cache.
Requereix Node 18 o superior.

## Controls

| Tecla | Acció |
| --- | --- |
| Espai | Saltar |

## Fitxers

| Fitxer | Contingut |
| --- | --- |
| `index.html` | Canvas i marcador |
| `style.css` | Estils |
| `game.js` | Bucle del joc i dibuix del terra |
| `dinosaure.js` | Personatge: física del salt i animació del sprite |
| `server.js` | Servidor estàtic per al desenvolupament |
| `assets/jump.png` | Sprite del salt, graella de 4x2 |
