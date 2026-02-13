const yesButton = document.getElementById("yes-btn");
const noButton = document.getElementById("no-btn");
const message = document.getElementById("result-message");

let noScale = 1;
let yesScale = 1;
const minNoScale = 0.12;
const maxYesScale = 2.9;

noButton.addEventListener("click", () => {
  noScale = Math.max(minNoScale, noScale * 0.72);
  yesScale = Math.min(maxYesScale, yesScale * 1.2);

  noButton.style.transform = `scale(${noScale})`;
  noButton.style.opacity = `${Math.max(0.15, noScale)}`;

  yesButton.style.transform = `scale(${yesScale})`;

  if (noScale <= minNoScale + 0.001) {
    noButton.style.visibility = "hidden";
    noButton.disabled = true;
  }
});

yesButton.addEventListener("click", () => {
  message.textContent = "Congrats Marijana Trisic ❤️";
  yesButton.disabled = true;
  noButton.disabled = true;

  startConfetti(2200);

  setTimeout(() => {
    window.location.href = "wishlist.html";
  }, 2400);
});

function startConfetti(durationMs) {
  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener("resize", resize);

  const colors = ["#ff4d88", "#f06595", "#845ef7", "#22b8cf", "#51cf66", "#fcc419"];
  const pieces = Array.from({ length: 180 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * -canvas.height,
    size: 4 + Math.random() * 6,
    speedY: 1.6 + Math.random() * 2.8,
    speedX: -1.2 + Math.random() * 2.4,
    rotation: Math.random() * Math.PI,
    rotationSpeed: -0.18 + Math.random() * 0.36,
    color: colors[Math.floor(Math.random() * colors.length)]
  }));

  let startTime = null;

  function drawFrame(timestamp) {
    if (!startTime) {
      startTime = timestamp;
    }
    const elapsed = timestamp - startTime;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pieces.forEach((p) => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.rotation += p.rotationSpeed;

      if (p.y > canvas.height + 12) {
        p.y = -15;
        p.x = Math.random() * canvas.width;
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.65);
      ctx.restore();
    });

    if (elapsed < durationMs) {
      requestAnimationFrame(drawFrame);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      window.removeEventListener("resize", resize);
    }
  }

  requestAnimationFrame(drawFrame);
}
