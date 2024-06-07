import { Pilota } from './pilota.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const width = canvas.width;
const height = canvas.height;

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

const pilotes = []; // Definición del array pilotes fuera de la función loop

for (let i = 0; i < 25; i++) {
  const x = random(10, width - 10);
  const y = random(10, height - 10);
  const velX = random(-7, 7);
  const velY = random(-7, 7);
  const color = randomRGB();
  const mida = random(10, 20);
  const pilota = new Pilota(x, y, velX, velY, color, mida);
  pilotes.push(pilota);
}

function detectarColision(pilota1, pilota2) {
  const dx = pilota1.x - pilota2.x;
  const dy = pilota1.y - pilota2.y;
  const distancia = Math.sqrt(dx * dx + dy * dy);

  return distancia < (pilota1.mida + pilota2.mida);
}

function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < pilotes.length; i++) {
    const pilota = pilotes[i];
    pilota.dibuixa(ctx);
    pilota.mou(width, height);
  }

  // Detección de colisiones y manejo de las mismas
  for (let i = 0; i < pilotes.length; i++) {
    for (let j = i + 1; j < pilotes.length; j++) {
      if (detectarColision(pilotes[i], pilotes[j])) {
        // Lógica para manejar la colisión
        // Por ejemplo, cambiar las velocidades de las pilotes involucradas
        const tempVelX = pilotes[i].velX;
        const tempVelY = pilotes[i].velY;
        pilotes[i].velX = pilotes[j].velX;
        pilotes[i].velY = pilotes[j].velY;
        pilotes[j].velX = tempVelX;
        pilotes[j].velY = tempVelY;
      }
    }
  }

  requestAnimationFrame(loop);
}

loop(); // Llamada inicial a la función loop para comenzar la animación
