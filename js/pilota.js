export class Pilota {
    constructor(x, y, velX, velY, color, mida) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.mida = mida;
    }

    dibuixa(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.mida, 0, 2 * Math.PI);
        ctx.fill();
    }

    mou(width, height) {
        if ((this.x + this.mida) >= width || (this.x - this.mida) <= 0) {
            this.velX = -this.velX;
        }

        if ((this.y + this.mida) >= height || (this.y - this.mida) <= 0) {
            this.velY = -this.velY;
        }

        this.x += this.velX;
        this.y += this.velY;
    }
}
