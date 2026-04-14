const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
let particles = [];
let animId = null;

const COLORS = [
  '#ff6b35', '#f7c59f', '#efefd0',
  '#004e89', '#1a936f', '#ffd700',
  '#ff4d6d', '#c77dff'
];
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function burst(x, y) {
  for (let i = 0; i < 70; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = rand(2, 9);
    particles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      decay: rand(0.010, 0.022),
      size: rand(3, 8),
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    });
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles = particles.filter(p => p.life > 0);

  for (const p of particles) {
    ctx.globalAlpha = p.life;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
    ctx.fill();

    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.18;
    p.life -= p.decay;
  }

  ctx.globalAlpha = 1;

  if (particles.length > 0) {
    animId = requestAnimationFrame(animate);
  }
}

function celebrate() {
  document.getElementById('message').classList.add('show');
  document.getElementById('sub-msg').classList.add('show');
  document.getElementById('ny-btn').textContent = '🌸 සුභ අලුත් අවුරුද්ද!';

  if (animId) cancelAnimationFrame(animId);
  particles = [];

  const w = canvas.width;
  const h = canvas.height;

  const spots = [
    [w * 0.15, h * 0.3],
    [w * 0.5,  h * 0.15],
    [w * 0.85, h * 0.3],
    [w * 0.3,  h * 0.55],
    [w * 0.7,  h * 0.55],
    [w * 0.5,  h * 0.4]
  ];

  spots.forEach(([x, y], i) => {
    setTimeout(() => burst(x, y), i * 160);
  });

  setTimeout(() => {
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        burst(rand(w * 0.1, w * 0.9), rand(h * 0.1, h * 0.7));
      }, i * 110);
    }
  }, 700);

  animate();
}

resize();
window.addEventListener('resize', resize);
