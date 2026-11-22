/**
 * Compact GPU fluid field for the homepage hero.
 * Inspired by Pavel Dobryakov's WebGL Fluid Simulation (MIT):
 * https://github.com/PavelDoGreat/WebGL-Fluid-Simulation
 * The solver uses velocity advection, vorticity confinement,
 * pressure projection and dye advection; no image/video substitutes.
 */

type Target = {
  texture: WebGLTexture;
  framebuffer: WebGLFramebuffer;
  width: number;
  height: number;
};

type DoubleTarget = {
  read: Target;
  write: Target;
  swap: () => void;
};

type Splat = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: readonly [number, number, number];
  radius: number;
};

const PALETTE: ReadonlyArray<readonly [number, number, number]> = [
  [0.10, 0.77, 1.22],
  [0.50, 0.32, 1.26],
  [0.89, 0.23, 0.86],
  [0.13, 0.96, 0.70],
  [0.97, 0.52, 0.35],
];

const HEADER = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outputColor;
`;

const SHADERS = {
  splat: `
    uniform sampler2D uTarget;
    uniform vec2 uPoint;
    uniform vec3 uColor;
    uniform float uRadius;
    uniform float uAspect;
    void main() {
      vec2 p = vUv - uPoint;
      p.x *= uAspect;
      float weight = exp(-dot(p, p) / uRadius);
      outputColor = texture(uTarget, vUv) + vec4(uColor * weight, 0.0);
    }`,
  advection: `
    uniform sampler2D uVelocity;
    uniform sampler2D uSource;
    uniform float uDelta;
    uniform float uDissipation;
    void main() {
      vec2 vel = texture(uVelocity, vUv).xy;
      vec2 back = clamp(vUv - uDelta * vel, vec2(0.001), vec2(0.999));
      outputColor = texture(uSource, back) * uDissipation;
    }`,
  curl: `
    uniform sampler2D uVelocity;
    uniform vec2 uTexel;
    void main() {
      float l = texture(uVelocity, vUv - vec2(uTexel.x, 0.0)).y;
      float r = texture(uVelocity, vUv + vec2(uTexel.x, 0.0)).y;
      float t = texture(uVelocity, vUv + vec2(0.0, uTexel.y)).x;
      float b = texture(uVelocity, vUv - vec2(0.0, uTexel.y)).x;
      outputColor = vec4(0.5 * (r - l - t + b), 0.0, 0.0, 1.0);
    }`,
  vorticity: `
    uniform sampler2D uVelocity;
    uniform sampler2D uCurl;
    uniform vec2 uTexel;
    uniform float uDelta;
    void main() {
      float l = texture(uCurl, vUv - vec2(uTexel.x, 0.0)).x;
      float r = texture(uCurl, vUv + vec2(uTexel.x, 0.0)).x;
      float t = texture(uCurl, vUv + vec2(0.0, uTexel.y)).x;
      float b = texture(uCurl, vUv - vec2(0.0, uTexel.y)).x;
      float c = texture(uCurl, vUv).x;
      vec2 force = 0.5 * vec2(abs(t) - abs(b), abs(r) - abs(l));
      force /= length(force) + 0.0001;
      force *= 24.0 * c * uDelta;
      force.y = -force.y;
      vec2 velocity = texture(uVelocity, vUv).xy + force;
      outputColor = vec4(clamp(velocity, vec2(-4.0), vec2(4.0)), 0.0, 1.0);
    }`,
  divergence: `
    uniform sampler2D uVelocity;
    uniform vec2 uTexel;
    void main() {
      vec2 l = texture(uVelocity, vUv - vec2(uTexel.x, 0.0)).xy;
      vec2 r = texture(uVelocity, vUv + vec2(uTexel.x, 0.0)).xy;
      vec2 t = texture(uVelocity, vUv + vec2(0.0, uTexel.y)).xy;
      vec2 b = texture(uVelocity, vUv - vec2(0.0, uTexel.y)).xy;
      float div = 0.5 * (r.x - l.x + t.y - b.y);
      outputColor = vec4(div, 0.0, 0.0, 1.0);
    }`,
  pressure: `
    uniform sampler2D uPressure;
    uniform sampler2D uDivergence;
    uniform vec2 uTexel;
    void main() {
      float l = texture(uPressure, vUv - vec2(uTexel.x, 0.0)).x;
      float r = texture(uPressure, vUv + vec2(uTexel.x, 0.0)).x;
      float t = texture(uPressure, vUv + vec2(0.0, uTexel.y)).x;
      float b = texture(uPressure, vUv - vec2(0.0, uTexel.y)).x;
      float div = texture(uDivergence, vUv).x;
      outputColor = vec4((l + r + t + b - div) * 0.25, 0.0, 0.0, 1.0);
    }`,
  gradient: `
    uniform sampler2D uPressure;
    uniform sampler2D uVelocity;
    uniform vec2 uTexel;
    void main() {
      float l = texture(uPressure, vUv - vec2(uTexel.x, 0.0)).x;
      float r = texture(uPressure, vUv + vec2(uTexel.x, 0.0)).x;
      float t = texture(uPressure, vUv + vec2(0.0, uTexel.y)).x;
      float b = texture(uPressure, vUv - vec2(0.0, uTexel.y)).x;
      vec2 vel = texture(uVelocity, vUv).xy - 0.5 * vec2(r - l, t - b);
      outputColor = vec4(vel, 0.0, 1.0);
    }`,
  display: `
    uniform sampler2D uDye;
    uniform vec2 uTexel;
    void main() {
      vec3 dye = texture(uDye, vUv).rgb;
      float shadeX = length(texture(uDye, vUv + vec2(uTexel.x, 0.0)).rgb)
                   - length(texture(uDye, vUv - vec2(uTexel.x, 0.0)).rgb);
      float shadeY = length(texture(uDye, vUv + vec2(0.0, uTexel.y)).rgb)
                   - length(texture(uDye, vUv - vec2(0.0, uTexel.y)).rgb);
      vec3 normal = normalize(vec3(shadeX, shadeY, 0.9));
      float lighting = 0.77 + 0.28 * dot(normal, normalize(vec3(0.3, 0.45, 1.0)));
      vec3 color = (1.0 - exp(-dye * 1.5)) * lighting;
      float alpha = clamp(max(max(color.r, color.g), color.b) * 0.90, 0.0, 0.92);
      outputColor = vec4(color, alpha);
    }`,
} as const;

function resolution(base: number, w: number, h: number) {
  const ratio = w / Math.max(h, 1);
  return ratio >= 1
    ? { width: Math.round(base * ratio), height: base }
    : { width: base, height: Math.round(base / ratio) };
}

export function mountFluid(canvas: HTMLCanvasElement, hero: HTMLElement): (() => void) | null {
  const gl = canvas.getContext('webgl2', {
    alpha: true,
    depth: false,
    stencil: false,
    antialias: false,
    premultipliedAlpha: false,
    preserveDrawingBuffer: false,
    powerPreference: 'low-power',
  });
  if (!gl || !gl.getExtension('EXT_color_buffer_float')) return null;

  const floatLinear = !!gl.getExtension('OES_texture_float_linear');
  const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const textures = new Set<WebGLTexture>();
  const framebuffers = new Set<WebGLFramebuffer>();
  const programs: WebGLProgram[] = [];
  let velocity: DoubleTarget | null = null;
  let dye: DoubleTarget | null = null;
  let pressure: DoubleTarget | null = null;
  let divergence: Target | null = null;
  let curl: Target | null = null;
  let simW = 0;
  let simH = 0;
  let dyeW = 0;
  let dyeH = 0;
  let animationFrame = 0;
  let isVisible = false;
  let disposed = false;
  let lastFrame = 0;
  let lastAmbient = 0;
  let paletteIndex = 0;
  const pending: Splat[] = [];
  let previousPointer: { x: number; y: number } | null = null;

  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  if (!vertexShader) return null;
  gl.shaderSource(vertexShader, `#version 300 es
    layout(location = 0) in vec2 aPosition;
    out vec2 vUv;
    void main() {
      vUv = aPosition * 0.5 + 0.5;
      gl_Position = vec4(aPosition, 0.0, 1.0);
    }`);
  gl.compileShader(vertexShader);
  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    gl.deleteShader(vertexShader);
    return null;
  }

  const compile = (body: string): WebGLProgram => {
    const shader = gl.createShader(gl.FRAGMENT_SHADER);
    const program = gl.createProgram();
    if (!shader || !program) throw new Error('WebGL shader allocation failed');
    gl.shaderSource(shader, HEADER + body);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const message = gl.getShaderInfoLog(shader) || 'Fragment shader compilation failed';
      gl.deleteShader(shader);
      gl.deleteProgram(program);
      throw new Error(message);
    }
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, shader);
    gl.linkProgram(program);
    gl.deleteShader(shader);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const message = gl.getProgramInfoLog(program) || 'Shader link failed';
      gl.deleteProgram(program);
      throw new Error(message);
    }
    programs.push(program);
    return program;
  };

  let shaderPrograms: Record<keyof typeof SHADERS, WebGLProgram>;
  try {
    shaderPrograms = Object.fromEntries(
      (Object.keys(SHADERS) as Array<keyof typeof SHADERS>).map(name => [name, compile(SHADERS[name])]),
    ) as Record<keyof typeof SHADERS, WebGLProgram>;
  } catch {
    programs.forEach(p => gl.deleteProgram(p));
    gl.deleteShader(vertexShader);
    return null;
  }
  gl.deleteShader(vertexShader);

  const triangle = gl.createBuffer();
  const vao = gl.createVertexArray();
  if (!triangle || !vao) return null;
  gl.bindVertexArray(vao);
  gl.bindBuffer(gl.ARRAY_BUFFER, triangle);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  gl.bindVertexArray(null);
  gl.disable(gl.BLEND);
  gl.disable(gl.DEPTH_TEST);

  const locationCache = new Map<WebGLProgram, Map<string, WebGLUniformLocation | null>>();
  const loc = (program: WebGLProgram, key: string) => {
    let map = locationCache.get(program);
    if (!map) {
      map = new Map();
      locationCache.set(program, map);
    }
    if (!map.has(key)) map.set(key, gl.getUniformLocation(program, key));
    return map.get(key) ?? null;
  };
  const one = (p: WebGLProgram, name: string, value: number) => gl.uniform1f(loc(p, name), value);
  const two = (p: WebGLProgram, name: string, x: number, y: number) => gl.uniform2f(loc(p, name), x, y);
  const three = (p: WebGLProgram, name: string, value: readonly [number, number, number]) =>
    gl.uniform3f(loc(p, name), value[0], value[1], value[2]);
  const bindTex = (p: WebGLProgram, name: string, target: Target, unit: number) => {
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, target.texture);
    gl.uniform1i(loc(p, name), unit);
  };
  const use = (p: WebGLProgram, target: Target | null) => {
    gl.useProgram(p);
    gl.bindFramebuffer(gl.FRAMEBUFFER, target?.framebuffer ?? null);
    gl.viewport(0, 0, target?.width ?? canvas.width, target?.height ?? canvas.height);
  };
  const draw = () => {
    gl.bindVertexArray(vao);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  const target = (width: number, height: number): Target => {
    const texture = gl.createTexture();
    const framebuffer = gl.createFramebuffer();
    if (!texture || !framebuffer) throw new Error('Fluid buffer allocation failed');
    textures.add(texture);
    framebuffers.add(framebuffer);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, floatLinear ? gl.LINEAR : gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, floatLinear ? gl.LINEAR : gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, width, height, 0, gl.RGBA, gl.HALF_FLOAT, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
      throw new Error('Floating point render target unsupported');
    }
    gl.viewport(0, 0, width, height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    return { texture, framebuffer, width, height };
  };

  const doubleTarget = (width: number, height: number): DoubleTarget => ({
    read: target(width, height),
    write: target(width, height),
    swap() {
      const old = this.read;
      this.read = this.write;
      this.write = old;
    },
  });

  const disposeTargets = () => {
    textures.forEach(t => gl.deleteTexture(t));
    framebuffers.forEach(f => gl.deleteFramebuffer(f));
    textures.clear();
    framebuffers.clear();
    velocity = dye = pressure = null;
    curl = divergence = null;
  };

  const splat = ({ x, y, vx, vy, color, radius }: Splat) => {
    if (!velocity || !dye) return;
    const p = shaderPrograms.splat;
    use(p, velocity.write);
    bindTex(p, 'uTarget', velocity.read, 0);
    two(p, 'uPoint', x, y);
    three(p, 'uColor', [vx, vy, 0]);
    one(p, 'uRadius', radius);
    one(p, 'uAspect', canvas.width / canvas.height);
    draw();
    velocity.swap();

    use(p, dye.write);
    bindTex(p, 'uTarget', dye.read, 0);
    three(p, 'uColor', color);
    draw();
    dye.swap();
  };

  const initialInk = () => {
    for (let i = 0; i < 12; i++) {
      const angle = i * 2.39996323;
      splat({
        x: 0.67 + 0.16 * Math.cos(angle),
        y: 0.52 + 0.20 * Math.sin(angle),
        vx: 0.48 * Math.sin(angle),
        vy: -0.42 * Math.cos(angle),
        color: PALETTE[i % PALETTE.length],
        radius: 0.005,
      });
    }
  };

  const resize = () => {
    if (disposed) return;
    const rect = hero.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const width = Math.max(1, Math.round(rect.width * dpr));
    const height = Math.max(1, Math.round(rect.height * dpr));
    if (canvas.width === width && canvas.height === height && velocity) return;
    canvas.width = width;
    canvas.height = height;
    disposeTargets();

    const small = window.matchMedia('(max-width: 767px)').matches;
    const sim = resolution(small ? 80 : 120, width, height);
    const pigment = resolution(small ? 256 : 480, width, height);
    simW = sim.width;
    simH = sim.height;
    dyeW = pigment.width;
    dyeH = pigment.height;
    velocity = doubleTarget(simW, simH);
    pressure = doubleTarget(simW, simH);
    curl = target(simW, simH);
    divergence = target(simW, simH);
    dye = doubleTarget(dyeW, dyeH);
    initialInk();
  };

  const advect = (source: DoubleTarget, flow: Target, dt: number, decay: number) => {
    const p = shaderPrograms.advection;
    use(p, source.write);
    bindTex(p, 'uVelocity', flow, 0);
    bindTex(p, 'uSource', source.read, 1);
    one(p, 'uDelta', dt);
    one(p, 'uDissipation', Math.pow(decay, dt * 60));
    draw();
    source.swap();
  };

  const step = (dt: number) => {
    if (!velocity || !dye || !pressure || !curl || !divergence) return;
    const texX = 1 / simW;
    const texY = 1 / simH;

    advect(velocity, velocity.read, dt, 0.991);

    let p = shaderPrograms.curl;
    use(p, curl);
    bindTex(p, 'uVelocity', velocity.read, 0);
    two(p, 'uTexel', texX, texY);
    draw();

    p = shaderPrograms.vorticity;
    use(p, velocity.write);
    bindTex(p, 'uVelocity', velocity.read, 0);
    bindTex(p, 'uCurl', curl, 1);
    two(p, 'uTexel', texX, texY);
    one(p, 'uDelta', dt);
    draw();
    velocity.swap();

    p = shaderPrograms.divergence;
    use(p, divergence);
    bindTex(p, 'uVelocity', velocity.read, 0);
    two(p, 'uTexel', texX, texY);
    draw();

    p = shaderPrograms.pressure;
    for (let i = 0; i < 12; i++) {
      use(p, pressure.write);
      bindTex(p, 'uPressure', pressure.read, 0);
      bindTex(p, 'uDivergence', divergence, 1);
      two(p, 'uTexel', texX, texY);
      draw();
      pressure.swap();
    }

    p = shaderPrograms.gradient;
    use(p, velocity.write);
    bindTex(p, 'uPressure', pressure.read, 0);
    bindTex(p, 'uVelocity', velocity.read, 1);
    two(p, 'uTexel', texX, texY);
    draw();
    velocity.swap();

    advect(dye, velocity.read, dt, 0.986);
  };

  const render = () => {
    if (!dye) return;
    const p = shaderPrograms.display;
    use(p, null);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    bindTex(p, 'uDye', dye.read, 0);
    two(p, 'uTexel', 1 / dyeW, 1 / dyeH);
    draw();
  };

  const frame = (now: number) => {
    animationFrame = 0;
    if (disposed || !isVisible || document.hidden) return;
    if (isCoarsePointer && lastFrame && now - lastFrame < 32) {
      animationFrame = requestAnimationFrame(frame);
      return;
    }
    const dt = lastFrame ? Math.min((now - lastFrame) / 1000, 0.033) : 0.016;
    lastFrame = now;

    if (now - lastAmbient > 155) {
      lastAmbient = now;
      const t = now / 1000;
      const idx = (paletteIndex++) % PALETTE.length;
      pending.push({
        x: 0.67 + 0.19 * Math.sin(t * 0.32),
        y: 0.52 + 0.23 * Math.cos(t * 0.26),
        vx: 0.22 * Math.cos(t * 0.32),
        vy: -0.19 * Math.sin(t * 0.26),
        color: PALETTE[idx],
        radius: 0.0025,
      });
    }

    try {
      step(dt);
      // Coalesce pointer events so a fast mouse does not stall the GPU.
      for (const item of pending.splice(0, 3)) splat(item);
      if (pending.length > 3) pending.splice(0, pending.length - 3);
      render();
      animationFrame = requestAnimationFrame(frame);
    } catch {
      stop();
    }
  };

  const stop = () => {
    if (animationFrame) cancelAnimationFrame(animationFrame);
    animationFrame = 0;
    lastFrame = 0;
  };
  const start = () => {
    if (!disposed && isVisible && !document.hidden && !animationFrame) {
      animationFrame = requestAnimationFrame(frame);
    }
  };

  const onPointerMove = (event: PointerEvent) => {
    if (event.pointerType === 'touch') return; // never hijack normal mobile scrolling
    const rect = hero.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, 1 - (event.clientY - rect.top) / rect.height));
    if (previousPointer) {
      const dx = (event.clientX - previousPointer.x) / rect.width;
      const dy = -(event.clientY - previousPointer.y) / rect.height;
      if (Math.abs(dx) + Math.abs(dy) > 0.0003) {
        pending.push({
          x, y,
          vx: Math.max(-2, Math.min(2, dx * 25)),
          vy: Math.max(-2, Math.min(2, dy * 25)),
          color: PALETTE[paletteIndex++ % PALETTE.length],
          radius: 0.0028,
        });
      }
    }
    previousPointer = { x: event.clientX, y: event.clientY };
  };
  const onPointerLeave = () => { previousPointer = null; };
  const onPointerDown = (event: PointerEvent) => {
    if (event.pointerType !== 'touch') return;
    const rect = hero.getBoundingClientRect();
    pending.push({
      x: (event.clientX - rect.left) / rect.width,
      y: 1 - (event.clientY - rect.top) / rect.height,
      vx: 0.12, vy: 0.08,
      color: PALETTE[paletteIndex++ % PALETTE.length],
      radius: 0.004,
    });
  };
  const onVisibilityChange = () => document.hidden ? stop() : start();
  const onContextLost = (e: Event) => { e.preventDefault(); stop(); };

  const observer = new IntersectionObserver(entries => {
    isVisible = entries.some(e => e.isIntersecting);
    if (isVisible) start();
    else stop();
  }, { threshold: 0.02 });
  const sizeObserver = new ResizeObserver(() => {
    try { resize(); render(); } catch { stop(); }
  });
  try {
    resize();
    render();
    observer.observe(hero);
    sizeObserver.observe(hero);
    hero.addEventListener('pointermove', onPointerMove, { passive: true });
    hero.addEventListener('pointerleave', onPointerLeave);
    hero.addEventListener('pointerdown', onPointerDown, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);
    canvas.addEventListener('webglcontextlost', onContextLost);
  } catch {
    observer.disconnect();
    sizeObserver.disconnect();
    disposeTargets();
    programs.forEach(p => gl.deleteProgram(p));
    gl.deleteBuffer(triangle);
    gl.deleteVertexArray(vao);
    return null;
  }

  return () => {
    disposed = true;
    stop();
    observer.disconnect();
    sizeObserver.disconnect();
    hero.removeEventListener('pointermove', onPointerMove);
    hero.removeEventListener('pointerleave', onPointerLeave);
    hero.removeEventListener('pointerdown', onPointerDown);
    document.removeEventListener('visibilitychange', onVisibilityChange);
    canvas.removeEventListener('webglcontextlost', onContextLost);
    disposeTargets();
    programs.forEach(p => gl.deleteProgram(p));
    gl.deleteBuffer(triangle);
    gl.deleteVertexArray(vao);
  };
}
