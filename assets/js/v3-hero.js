// V3 hero: real-time 3D house in gold, echoing the FSBO4u logo (roof, chimney,
// window and the sun arc). Reacts to pointer and scroll. Static frame when the
// visitor prefers reduced motion; silently skipped if WebGL is unavailable.
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

const canvas = document.querySelector('[data-three]');
const hero = document.querySelector('[data-v3-hero]');
if (canvas && hero) init();

function init() {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch { return; }
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.25));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  camera.position.set(0, 0.6, 9);

  const gold = new THREE.Color('#D4B26A');
  const goldBright = new THREE.Color('#F0D891');

  /* ---------- Materials ---------- */
  const edgeMat = new THREE.LineBasicMaterial({ color: gold, transparent: true, opacity: 0.95 });
  const glassMat = new THREE.MeshLambertMaterial({ color: 0x1a1a22, transparent: true, opacity: 0.6 });
  const metalMat = new THREE.MeshStandardMaterial({ color: gold, metalness: 1, roughness: 0.28, emissive: new THREE.Color('#3a2a08'), emissiveIntensity: 0.4 });
  const glowMat = new THREE.MeshBasicMaterial({ color: goldBright, transparent: true, opacity: 0.9 });

  const house = new THREE.Group();
  const addSolid = (geo, mat = glassMat) => {
    const m = new THREE.Mesh(geo, mat);
    const e = new THREE.LineSegments(new THREE.EdgesGeometry(geo, 20), edgeMat);
    const g = new THREE.Group(); g.add(m, e); return g;
  };

  // Walls
  const walls = addSolid(new THREE.BoxGeometry(2.4, 1.5, 1.8));
  walls.position.y = 0.75;
  house.add(walls);

  // Gable roof (triangular prism)
  const tri = new THREE.Shape();
  tri.moveTo(-1.5, 0); tri.lineTo(0, 1.15); tri.lineTo(1.5, 0); tri.lineTo(-1.5, 0);
  const roofGeo = new THREE.ExtrudeGeometry(tri, { depth: 2.1, bevelEnabled: false });
  roofGeo.translate(0, 0, -1.05);
  const roof = addSolid(roofGeo);
  roof.position.y = 1.5;
  house.add(roof);

  // Roof rim in solid gold (the logo's roofline)
  const rim = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(-1.75, 1.32, 1.08), new THREE.Vector3(0, 2.74, 1.08), new THREE.Vector3(1.75, 1.32, 1.08)], false, 'catmullrom', 0), 24, 0.045, 6, false), metalMat);
  house.add(rim);

  // Chimney
  const chimney = addSolid(new THREE.BoxGeometry(0.32, 0.8, 0.32), metalMat);
  chimney.position.set(0.85, 2.3, -0.2);
  house.add(chimney);

  // Four-pane window (glowing), as in the logo
  const win = new THREE.Group();
  for (const [x, y] of [[-0.13, 0.13], [0.13, 0.13], [-0.13, -0.13], [0.13, -0.13]]) {
    const p = new THREE.Mesh(new THREE.PlaneGeometry(0.22, 0.22), glowMat);
    p.position.set(x, y, 0); win.add(p);
  }
  win.position.set(-0.55, 0.9, 0.91);
  const win2 = win.clone(); win2.position.x = 0.55;
  house.add(win, win2);

  // Door
  const door = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.PlaneGeometry(0.5, 0.85)), edgeMat);
  door.position.set(0, 0.43, 0.905);
  house.add(door);

  // The sun arc from the logo, as a 3D ring behind the house
  const arc = new THREE.Mesh(new THREE.TorusGeometry(2.25, 0.035, 6, 96, Math.PI * 1.22), metalMat);
  arc.rotation.z = -0.25;
  arc.position.set(0.7, 1.7, -1.4);
  house.add(arc);

  // Ground swoosh
  const swoosh = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(-3.4, -0.05, 1.6), new THREE.Vector3(-1, 0.12, 1.2), new THREE.Vector3(1.4, -0.1, 1.4), new THREE.Vector3(3.6, 0.05, 0.6)]), 48, 0.03, 6, false), metalMat);
  house.add(swoosh);

  house.position.y = -1.15;
  scene.add(house);

  // Gold dust
  const N = 260;
  const pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const r = 3 + Math.random() * 9;
    const t = Math.random() * Math.PI * 2;
    pos[i * 3] = Math.cos(t) * r;
    pos[i * 3 + 1] = (Math.random() - 0.4) * 8;
    pos[i * 3 + 2] = Math.sin(t) * r - 3;
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({ color: gold, size: 0.035, transparent: true, opacity: 0.7, depthWrite: false }));
  scene.add(dust);

  // Lights
  scene.add(new THREE.AmbientLight(0xffffff, 0.35));
  const key = new THREE.DirectionalLight(0xfff1d6, 2.2); key.position.set(4, 6, 6); scene.add(key);
  const rimLight = new THREE.DirectionalLight(0xd4b26a, 1.4); rimLight.position.set(-4, 2, -3); scene.add(rimLight);

  // Theme: glass a little lighter on the light theme
  const applyTheme = () => {
    const light = document.documentElement.dataset.theme === 'light';
    glassMat.color.set(light ? 0xf3ece0 : 0x1a1a22);
    glassMat.opacity = light ? 0.5 : 0.55;
    edgeMat.color.set(light ? '#9C7B2F' : '#D4B26A');
    dust.material.color.set(light ? '#A88638' : '#D4B26A');
  };
  applyTheme();
  document.addEventListener('theme:change', applyTheme);

  // Layout: house sits to the right on wide screens, centred behind text on narrow
  let wideNow = true;
  const resize = () => {
    const w = hero.clientWidth, h = hero.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const wide = w > 900;
    house.position.x = wide ? 3.5 : 0; wideNow = wide;
    house.scale.setScalar(wide ? 0.95 : 0.75);
    camera.position.z = wide ? 13 : 14;
  };
  resize();
  let rz; addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(resize, 150); });

  // Pointer + scroll
  const target = { x: 0, y: 0 }, cur = { x: 0, y: 0 };
  addEventListener('pointermove', (e) => { target.x = e.clientX / innerWidth - 0.5; target.y = e.clientY / innerHeight - 0.5; }, { passive: true });
  let scrollP = 0;
  let heroH = hero.offsetHeight; addEventListener('resize', () => { heroH = hero.offsetHeight; });

  // Pause when off-screen
  let visible = true;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(hero);

  const clock = new THREE.Clock();
  const tick = () => {
    const t = clock.getElapsedTime();
    scrollP = Math.min(1, scrollY / Math.max(1, heroH));
    cur.x += (target.x - cur.x) * 0.05;
    cur.y += (target.y - cur.y) * 0.05;
    house.rotation.y = -0.55 + t * 0.12 + cur.x * 0.6 + scrollP * 1.4;
    house.rotation.x = 0.06 + cur.y * 0.18;
    house.position.y = (wideNow ? 0.35 : 2.1) + Math.sin(t * 0.9) * 0.08 - scrollP * 0.8;
    arc.rotation.z = -0.25 + Math.sin(t * 0.5) * 0.06;
    dust.rotation.y = t * 0.02;
    camera.position.y = 0.6 - scrollP * 0.6;
    renderer.render(scene, camera);
  };

  canvas.classList.add('is-ready');
  if (reduced) { tick(); return; }
  renderer.setAnimationLoop(() => { if (visible && !document.hidden) tick(); });
}
