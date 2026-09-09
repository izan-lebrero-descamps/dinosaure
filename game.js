import { Dinosaure } from './dinosaure.js';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const dino = new Dinosaure();

function floor() {
  // Dibuixa el terra al canvas
  ctx.fillStyle = '#8B4513';
  ctx.fillRect(0, canvas.height - 20, canvas.width, 20);
}

function engine() {
  // Buidar el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibuixar el terra 
  floor();
  // Dibuixar el dinosaure
  dino.draw(ctx);

  requestAnimationFrame(engine);
}

requestAnimationFrame(engine);