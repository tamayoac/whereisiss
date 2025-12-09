import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title = 'project-iis';

  @ViewChild('starfieldCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D | null = null;
  private stars: Array<{ x: number; y: number; z: number }> = [];
  private animationId?: number;
  private resizeHandler = () => this.resizeCanvas();

  private readonly NUM_STARS = 800;
  private readonly SPEED = 2;

  ngAfterViewInit(): void {
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    if (!this.ctx) return;

    for (let i = 0; i < this.NUM_STARS; i++) {
      this.stars.push(this.createStar());
    }

    this.resizeCanvas();
    window.addEventListener('resize', this.resizeHandler);
    this.animate();
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resizeHandler);
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  private createStar() {
    return {
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1,
      z: Math.random() * 2,
    };
  }

  private resizeCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  private animate = () => {
    if (!this.ctx) return;
    const canvas = this.canvasRef.nativeElement;
    const ctx = this.ctx;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    ctx.save();
    ctx.translate(centerX, centerY);

    for (const star of this.stars) {
      star.z -= this.SPEED * 0.01;
      if (star.z <= 0) {
        Object.assign(star, this.createStar());
        star.z = 2;
      }

      const scale = canvas.width / star.z;
      const screenX = star.x * scale;
      const screenY = star.y * scale;
      const radius = (2 - star.z) * 1.5;
      const opacity = Math.max(0, 1 - star.z / 2);

      ctx.beginPath();
      ctx.arc(screenX, screenY, Math.max(0, radius), 0, Math.PI * 2);
      ctx.globalAlpha = opacity;
      ctx.fill();
    }

    ctx.restore();
    ctx.globalAlpha = 1;
    this.animationId = requestAnimationFrame(this.animate);
  };
}
