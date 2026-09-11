// El personatge jugable: física de salt, ajupir-se i dibuix.

const GRAVITY = 2400;      // px/s²
const JUMP_FORCE = 780;    // px/s
const GROUND_Y = 233;       // px

// Sprite del salt: graella de 4x2 (8 fotogrames) llegida per files.
const SPRITE_COLS = 4;
const SPRITE_ROWS = 2;
const FRAME_COUNT = SPRITE_COLS * SPRITE_ROWS;

// Proporcions mesurades dins de cada cel·la: el dino fa un 58% de l'alçada,
// deixa un 10% de buit sota els peus i un 21% a l'esquerra.
const CONTENT_HEIGHT = 0.58;
const FEET_GAP = 0.10;
const LEFT_GAP = 0.21;

// L'animació dura exactament el que dura el salt, així els 8 fotogrames
// (anticipació → enlaire → aterratge) hi encaixen sense repetir-se.
const JUMP_DURATION = (2 * JUMP_FORCE) / GRAVITY;   // segons
const FRAME_DURATION = JUMP_DURATION / FRAME_COUNT;

export class Dinosaure {
  constructor() {
    this.x = 50;
    this.y = GROUND_Y;
    this.width = 44;
    this.height = 47;
    this.velocityY = 0;
    this.isJumping = false;

    this.frame = 0;
    this.frameTimer = 0;

    this.sprite = new Image();
    this.spriteReady = false;
    this.sprite.addEventListener('load', () => {
      this.spriteReady = true;
      this.frameWidth = this.sprite.width / SPRITE_COLS;
      this.frameHeight = this.sprite.height / SPRITE_ROWS;
    });
    this.sprite.src = 'assets/jump.png';

    // capturar el event de teclat de barra espaiadora
    document.addEventListener('keydown', (event) => {
      if (event.code === 'Space' && !this.isJumping) {
        this.jump();
      }
    });
  }

  jump() {
    this.isJumping = true;
    this.velocityY = -JUMP_FORCE;
    this.frame = 0;
    this.frameTimer = 0;
  }

  draw(ctx) {
    if (this.isJumping) {
      // estem saltant
      this.velocityY += GRAVITY * (1 / 60); // aplicar gravetat
      this.y += this.velocityY * (1 / 60); // actualitzar posició

      // avançar l'animació, aturant-se a l'últim fotograma
      this.frameTimer += 1 / 60;
      this.frame = Math.min(
        Math.floor(this.frameTimer / FRAME_DURATION),
        FRAME_COUNT - 1
      );

      if (this.y >= GROUND_Y) {
        // hem aterrat
        this.isJumping = false;
        this.y = GROUND_Y;
        this.velocityY = 0;
        this.frame = 0;
        this.frameTimer = 0;
      }
    }

    if (!this.spriteReady) {
      // mentre no tenim el sprite, dibuixem la caixa
      ctx.fillStyle = '#000';
      ctx.fillRect(this.x, this.y, this.width, this.height);
      return;
    }

    const col = this.frame % SPRITE_COLS;
    const row = Math.floor(this.frame / SPRITE_COLS);

    // Escalem la cel·la sencera i ancorem els peus a terra, de manera que
    // el moviment que ja porta el sprite se sumi al salt.
    const size = this.height / CONTENT_HEIGHT;
    const dx = this.x - size * LEFT_GAP;
    const dy = this.y + this.height - size * (1 - FEET_GAP);

    // El sprite és molt gran (cel·la de 443px a ~81px): cal filtratge, si no s'alia.
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(
      this.sprite,
      col * this.frameWidth,
      row * this.frameHeight,
      this.frameWidth,
      this.frameHeight,
      dx,
      dy,
      size,
      size
    );
  }
}
