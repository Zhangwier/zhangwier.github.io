(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = window.matchMedia("(pointer: fine)").matches;

  // Scroll reveal
  const revealables = document.querySelectorAll(".masthead, .toc, .block, .colophon, .entry, .case, .pillars li, .steps li");
  revealables.forEach((el) => el.classList.add("reveal"));
  if (!reduce && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealables.forEach((el) => io.observe(el));
  } else {
    revealables.forEach((el) => el.classList.add("in"));
  }

  // Custom cursor
  if (fine && !reduce) {
    document.documentElement.classList.add("has-cursor");
    const dot = document.createElement("div");
    const ring = document.createElement("div");
    dot.className = "cursor-dot";
    ring.className = "cursor-ring";
    document.body.append(dot, ring);

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let hovering = false;

    window.addEventListener(
      "pointermove",
      (e) => {
        x = e.clientX;
        y = e.clientY;
        dot.style.transform = `translate(${x}px, ${y}px)`;
      },
      { passive: true }
    );

    const hoverables = "a, button, .entry, .case, .pillars li, .steps li, h1, h2, h3, .cta";
    document.addEventListener("pointerover", (e) => {
      if (e.target.closest(hoverables)) {
        hovering = true;
        document.documentElement.classList.add("cursor-hover");
      }
    });
    document.addEventListener("pointerout", (e) => {
      if (e.target.closest(hoverables)) {
        hovering = false;
        document.documentElement.classList.remove("cursor-hover");
      }
    });

    const tickCursor = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      const s = hovering ? 1.55 : 1;
      ring.style.transform = `translate(${rx}px, ${ry}px) scale(${s})`;
      requestAnimationFrame(tickCursor);
    };
    requestAnimationFrame(tickCursor);
  }

  // Particles
  if (reduce) return;
  const canvas = document.createElement("canvas");
  canvas.className = "fx-canvas";
  canvas.setAttribute("aria-hidden", "true");
  document.body.prepend(canvas);
  const ctx = canvas.getContext("2d", { alpha: true });

  let w = 0;
  let h = 0;
  let dpr = 1;
  let particles = [];
  let mx = -9999;
  let my = -9999;

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.max(28, Math.min(70, Math.floor((w * h) / 22000)));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.6 + 0.6,
    }));
  };

  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener(
    "pointermove",
    (e) => {
      mx = e.clientX;
      my = e.clientY;
    },
    { passive: true }
  );
  resize();

  const linkDist = 120;
  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      const dx = p.x - mx;
      const dy = p.y - my;
      const dist = Math.hypot(dx, dy);
      if (dist < 140) {
        p.vx += (dx / (dist || 1)) * 0.02;
        p.vy += (dy / (dist || 1)) * 0.02;
      }
      const sp = Math.hypot(p.vx, p.vy);
      if (sp > 0.7) {
        p.vx *= 0.96;
        p.vy *= 0.96;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(44, 44, 44, 0.28)";
      ctx.fill();
    }

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d = Math.hypot(dx, dy);
        if (d < linkDist) {
          ctx.strokeStyle = `rgba(44, 44, 44, ${0.12 * (1 - d / linkDist)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  };
  requestAnimationFrame(draw);
})();
