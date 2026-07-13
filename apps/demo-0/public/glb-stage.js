// glb-stage.js — three.js GLB stage web component (Draco-ready, white-studio lighting)
// Usage: <glb-stage src="assets/models/drone.glb" spin-parts="propeller,rotor,blade,fan" color-parts="body,paint,frame,canopy"></glb-stage>
// API:  el.setPose({x,y,rotY,rotX,scale,opacity,idle})  — smooth-lerped targets
//       el.setColor('#1c1c1c')
//       el.ready (bool) · fires 'glb-ready' / 'glb-error'
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.1/+esm';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160.1/examples/jsm/loaders/GLTFLoader.js/+esm';
import { DRACOLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160.1/examples/jsm/loaders/DRACOLoader.js/+esm';
import { RoomEnvironment } from 'https://cdn.jsdelivr.net/npm/three@0.160.1/examples/jsm/environments/RoomEnvironment.js/+esm';

class GlbStage extends HTMLElement {
  constructor() {
    super();
    this.ready = false;
    this._pose = { x: 0, y: 0, rotY: 0, rotX: 0, scale: 1, opacity: 1, idle: 1, ground: 1 };
    this._target = { ...this._pose };
    this._raf = null;
  }

  connectedCallback() {
    // Defer one frame so attributes set by the mounting framework are present
    requestAnimationFrame(() => this._start());
  }

  _start() {
    if (this._init || !this.isConnected) return;
    this._init = true;
    this.style.display = 'block';
    this.style.width = this.style.width || '100%';
    this.style.height = this.style.height || '100%';

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = parseFloat(this.getAttribute('exposure') || '1.05');
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.style.cssText = 'width:100%;height:100%;display:block;';
    this.appendChild(renderer.domElement);
    this._renderer = renderer;

    const scene = new THREE.Scene();
    this._scene = scene;
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 60);
    camera.position.set(0, 0.35, 6.2);
    camera.lookAt(0, 0, 0);
    this._camera = camera;

    // Studio 4 nguồn sáng: key ấm (bóng mềm) + fill lạnh + rim ấm + accent cam thương hiệu
    const key = new THREE.SpotLight(0xfff0dd, 70, 0, 0.42, 0.85);
    key.position.set(4.5, 6.5, 5.5);
    key.castShadow = true;
    key.shadow.mapSize.set(768, 768);
    key.shadow.bias = -0.00018;
    key.shadow.radius = 6;
    scene.add(key);
    const fill = new THREE.SpotLight(0xdfe8ff, 22, 0, 0.6, 1);
    fill.position.set(-5.5, 3, 3.5);
    scene.add(fill);
    const rim = new THREE.DirectionalLight(0xffceaa, 2.2);
    rim.position.set(-2.5, 3.2, -5);
    scene.add(rim);
    const accent = new THREE.DirectionalLight(0xff7a1e, 0.55);
    accent.position.set(2.5, -2, -3.5);
    scene.add(accent);
    scene.add(new THREE.HemisphereLight(0xffffff, 0xcabfae, 0.55));
    const spec = new THREE.PointLight(0xffffff, 14, 12, 2);
    spec.position.set(1.6, 2.4, 3.2);
    scene.add(spec);

    // Contact shadow catcher
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.22 });
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), shadowMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.55;
    ground.receiveShadow = true;
    scene.add(ground);
    this._ground = ground;

    const group = new THREE.Group();
    scene.add(group);
    this._group = group;

    const src = this.getAttribute('src');
    const loader = new GLTFLoader();
    const draco = new DRACOLoader();
    draco.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
    loader.setDRACOLoader(draco);
    loader.load(
      src,
      (gltf) => {
        const model = gltf.scene;
        model.rotation.set(0, -Math.PI / 2, 0);
        const box = new THREE.Box3().setFromObject(model);
        const size = new THREE.Vector3();
        box.getSize(size);
        const target = parseFloat(this.getAttribute('fit') || '2.5');
        const s = target / Math.max(size.x, size.y, size.z);
        model.scale.setScalar(s);
        const center = new THREE.Vector3();
        box.getCenter(center);
        model.position.sub(center.multiplyScalar(s));
        this._meshes = [];
        const maxAniso = this._renderer.capabilities.getMaxAnisotropy();
        model.traverse((o) => {
          if (o.isMesh) {
            o.castShadow = true;
            const m = o.material;
            if (m) {
              m.userData.__wasTransparent = !!m.transparent;
              m.transparent = true;
              if ('envMapIntensity' in m) m.envMapIntensity = 1.35;
              if ('roughness' in m) m.roughness = Math.max(0.07, m.roughness);
              for (const tk of ['map', 'normalMap', 'roughnessMap', 'metalnessMap', 'aoMap']) {
                if (m[tk]) { m[tk].anisotropy = maxAniso; m[tk].needsUpdate = true; }
              }
              m.needsUpdate = true;
            }
            this._meshes.push(o);
          }
        });
        group.add(model);
        this._model = model;
        this._collectParts();
        this.ready = true;
        this.dispatchEvent(new CustomEvent('glb-ready', { bubbles: true }));
      },
      undefined,
      () => this.dispatchEvent(new CustomEvent('glb-error', { bubbles: true })),
    );

    renderer.domElement.addEventListener('webglcontextlost', (e) => e.preventDefault());

    this._ro = new ResizeObserver(() => this._resize());
    this._ro.observe(this);
    this._resize();
    this._clock = new THREE.Clock();
    const tick = () => {
      this._raf = requestAnimationFrame(tick);
      this._frame();
    };
    tick();
  }

  disconnectedCallback() {
    cancelAnimationFrame(this._raf);
    this._ro?.disconnect();
    this._renderer?.dispose();
  }

  _collectParts() {
    const spinNames = (this.getAttribute('spin-parts') || '').split(',').map((x) => x.trim()).filter(Boolean);
    const colorNames = (this.getAttribute('color-parts') || '').split(',').map((x) => x.trim()).filter(Boolean);
    this._spin = [];
    this._colored = [];
    const all = [];
    this._model.traverse((o) => {
      if (!o.isMesh) return;
      all.push(o);
      const n = o.name.toLowerCase();
      if (spinNames.some((k) => n.includes(k))) this._spin.push(o);
      if (colorNames.some((k) => n.includes(k))) this._colored.push(o);
    });

    // Fallback: không mesh nào khớp tên → tô các mesh lớn nhất (thân máy),
    // loại trừ bộ phận quay và mesh trong suốt (ống kính/kính)
    if (colorNames.length && this._colored.length === 0) {
      const box = new THREE.Box3();
      const size = new THREE.Vector3();
      const scored = all
        .filter((m) => !this._spin.includes(m) && !(m.material && m.material.opacity < 0.9 && m.material.transparent && m.material.userData.__wasTransparent))
        .map((m) => {
          box.setFromObject(m);
          box.getSize(size);
          return { m, vol: size.x * size.y * size.z };
        })
        .sort((a, b) => b.vol - a.vol);
      const keep = Math.max(1, Math.ceil(scored.length * 0.2));
      this._colored = scored.slice(0, keep).map((x) => x.m);
    }

    // Clone vật liệu các phần được tô → màu không lem sang bộ phận dùng chung material
    const seen = new Map();
    for (const m of this._colored) {
      if (!m.material || !m.material.color) continue;
      if (!seen.has(m.material)) seen.set(m.material, m.material.clone());
      m.material = seen.get(m.material);
    }
  }

  setPose(p) { Object.assign(this._target, p); }
  setColor(hex) { this._targetColor = new THREE.Color(hex); }

  _resize() {
    const w = this.clientWidth || 1, h = this.clientHeight || 1;
    this._renderer.setSize(w, h, false);
    this._camera.aspect = w / h;
    this._camera.updateProjectionMatrix();
  }

  _frame() {
    if (document.hidden) return;
    const vRect = this.getBoundingClientRect();
    if (vRect.width === 0 || vRect.bottom < -80 || vRect.top > window.innerHeight + 80) return;
    const g = this._group;
    const p = this._pose, t = this._target;
    const k = 0.085;
    for (const key of ['x', 'y', 'rotY', 'rotX', 'scale', 'opacity', 'idle', 'ground']) p[key] += (t[key] - p[key]) * k;
    const time = this._clock.getElapsedTime();

    const bob = Math.sin(time * 1.5) * 0.1 * p.idle;
    const rock = Math.sin(time * 0.6) * 0.28 * p.idle;
    g.position.set(p.x, p.y + bob, 0);
    g.rotation.y = rock + p.rotY;
    g.rotation.x = Math.sin(time * 0.8) * 0.06 * p.idle + p.rotX;
    g.rotation.z = Math.sin(time * 0.5) * 0.04 * p.idle;
    g.scale.setScalar(Math.max(p.scale, 0.001));
    g.visible = p.opacity > 0.02;
    this._ground.material.opacity = 0.22 * Math.min(1, p.opacity) * Math.max(0, 1 - Math.abs(p.y) * 0.4) * (p.ground ?? 1);

    // Skip rendering entirely while the model is faded out (photo phase, etc.)
    if (!g.visible) {
      if (!this._clearedOnce) { this._renderer.clear(); this._clearedOnce = true; }
      return;
    }
    this._clearedOnce = false;

    if (this._model) {
      if (this._spin?.length) for (const m of this._spin) m.rotation.y += 0.45;
      if (Math.abs((this._lastOpacity ?? -1) - p.opacity) > 0.004) {
        this._lastOpacity = p.opacity;
        for (const m of (this._meshes || [])) {
          if (m.material && 'opacity' in m.material) m.material.opacity = p.opacity;
        }
      }
      if (this._targetColor && this._colored?.length) {
        for (const m of this._colored) m.material?.color?.lerp(this._targetColor, 0.08);
      }
    }
    this._renderer.render(this._scene, this._camera);
  }
}

if (!customElements.get('glb-stage')) customElements.define('glb-stage', GlbStage);
