/* ============================================================
   Pardonne-moi Hebbouba — Interactive apology page
   ============================================================ */

// ---------- Three.js guard ----------
if (typeof THREE === 'undefined') {
    console.error('[Three.js] Library not loaded.');
} else {
    console.log('[Three.js] Library detected.');
}

// ---------- Floating background hearts ----------
(function spawnFloatingHearts() {
    const layer = document.getElementById('floatingHearts');
    const emojis = ['💖', '💗', '💕', '💘', '❤️', '💝'];
    function createHeart() {
        const h = document.createElement('span');
        h.className = 'heart';
        h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        h.style.left = Math.random() * 100 + 'vw';
        const dur = 6 + Math.random() * 8;
        h.style.animationDuration = dur + 's';
        h.style.fontSize = (16 + Math.random() * 28) + 'px';
        h.style.opacity = 0.5 + Math.random() * 0.5;
        layer.appendChild(h);
        setTimeout(() => h.remove(), dur * 1000 + 200);
    }
    for (let i = 0; i < 10; i++) setTimeout(createHeart, i * 400);
    setInterval(createHeart, 700);
})();

// ============================================================
// THREE.JS 3D BOY — more realistic
// ============================================================
let scene, camera, renderer, boy = {}, tears = [];
let currentMode = 'sad';
let clock;

function initThree() {
    if (typeof THREE === 'undefined') return;
    console.log('[Three.js] initThree() start');

    const container = document.getElementById('canvasContainer');
    const width = container.clientWidth;
    const height = container.clientHeight;

    scene = new THREE.Scene();
    scene.background = null;

    camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.5, 5.2);
    camera.lookAt(0, 1.3, 0);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace || THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);
    console.log('[Three.js] Renderer attached to canvas container.');

    // Lights — softer, more cinematic
    const ambient = new THREE.AmbientLight(0xfff0f5, 0.55);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.1);
    keyLight.position.set(3, 5, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xc5d8ff, 0.4);
    fillLight.position.set(-4, 2, 3);
    scene.add(fillLight);

    const rimPink = new THREE.PointLight(0xff4d94, 0.9, 12);
    rimPink.position.set(-2.5, 3, -1);
    scene.add(rimPink);

    const rimPurple = new THREE.PointLight(0xc084fc, 0.7, 12);
    rimPurple.position.set(2.5, 1, -2);
    scene.add(rimPurple);

    // Subtle ground shadow disc
    const shadowGeo = new THREE.CircleGeometry(1.1, 32);
    const shadowMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.18 });
    const ground = new THREE.Mesh(shadowGeo, shadowMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.52;
    scene.add(ground);
    boy.ground = ground;

    buildBoy();
    clock = new THREE.Clock();
    animate();
    console.log('[Three.js] Scene ready, animation loop running.');

    window.addEventListener('resize', onResize);
}

function buildBoy() {
    const group = new THREE.Group();

    // ==== Materials ====
    const skinMat = new THREE.MeshStandardMaterial({
        color: 0xf1c49a,
        roughness: 0.6,
        metalness: 0.0
    });
    const shirtMat = new THREE.MeshStandardMaterial({
        color: 0x3d6fb8,
        roughness: 0.75,
        metalness: 0.05
    });
    const shirtDarkMat = new THREE.MeshStandardMaterial({
        color: 0x2a4f87,
        roughness: 0.8
    });
    const pantsMat = new THREE.MeshStandardMaterial({
        color: 0x1f2937,
        roughness: 0.85
    });
    const shoeMat = new THREE.MeshStandardMaterial({
        color: 0x111827,
        roughness: 0.5,
        metalness: 0.2
    });
    const hairMat = new THREE.MeshStandardMaterial({
        color: 0x1f1108,
        roughness: 0.9
    });
    const eyeWhiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 });
    const irisMat = new THREE.MeshStandardMaterial({ color: 0x5a3b1f, roughness: 0.3 });
    const pupilMat = new THREE.MeshStandardMaterial({ color: 0x0a0a0a, roughness: 0.2 });
    const lipMat = new THREE.MeshStandardMaterial({ color: 0xb5566c, roughness: 0.5 });
    const browMat = new THREE.MeshStandardMaterial({ color: 0x1f1108, roughness: 0.8 });

    // ==== HEAD (pivot for tilting) ====
    const headPivot = new THREE.Group();
    headPivot.position.set(0, 2.05, 0);
    group.add(headPivot);

    // Skull — slightly oval
    const headGeo = new THREE.SphereGeometry(0.42, 48, 48);
    headGeo.scale(1.0, 1.08, 0.95);
    const head = new THREE.Mesh(headGeo, skinMat);
    head.castShadow = true;
    headPivot.add(head);

    // Jaw — a smaller squashed sphere below the head to give it shape
    const jawGeo = new THREE.SphereGeometry(0.36, 32, 32);
    jawGeo.scale(0.95, 0.7, 0.9);
    const jaw = new THREE.Mesh(jawGeo, skinMat);
    jaw.position.y = -0.18;
    headPivot.add(jaw);

    // Neck
    const neck = new THREE.Mesh(
        new THREE.CylinderGeometry(0.13, 0.16, 0.22, 24),
        skinMat
    );
    neck.position.y = 1.78;
    group.add(neck);

    // Ears
    const earGeo = new THREE.SphereGeometry(0.08, 16, 16);
    earGeo.scale(0.6, 1.1, 0.4);
    const leftEar = new THREE.Mesh(earGeo, skinMat);
    leftEar.position.set(-0.42, -0.02, 0);
    headPivot.add(leftEar);
    const rightEar = leftEar.clone();
    rightEar.position.x = 0.42;
    headPivot.add(rightEar);

    // Nose
    const noseGeo = new THREE.ConeGeometry(0.055, 0.16, 16);
    const nose = new THREE.Mesh(noseGeo, skinMat);
    nose.position.set(0, -0.02, 0.4);
    nose.rotation.x = Math.PI / 2;
    headPivot.add(nose);
    // Nose bridge
    const bridge = new THREE.Mesh(new THREE.SphereGeometry(0.05, 16, 16), skinMat);
    bridge.position.set(0, 0.08, 0.39);
    bridge.scale.set(0.8, 1.4, 0.6);
    headPivot.add(bridge);

    // Eyes — white, iris, pupil
    function makeEye(x) {
        const eyeGroup = new THREE.Group();
        const eyeWhiteGeo = new THREE.SphereGeometry(0.075, 24, 24);
        const white = new THREE.Mesh(eyeWhiteGeo, eyeWhiteMat);
        eyeGroup.add(white);

        const iris = new THREE.Mesh(new THREE.SphereGeometry(0.04, 20, 20), irisMat);
        iris.position.z = 0.048;
        eyeGroup.add(iris);

        const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.02, 16, 16), pupilMat);
        pupil.position.z = 0.065;
        eyeGroup.add(pupil);

        // Highlight
        const hl = new THREE.Mesh(
            new THREE.SphereGeometry(0.008, 8, 8),
            new THREE.MeshBasicMaterial({ color: 0xffffff })
        );
        hl.position.set(0.012, 0.012, 0.072);
        eyeGroup.add(hl);

        eyeGroup.position.set(x, 0.05, 0.34);
        return eyeGroup;
    }
    const leftEye = makeEye(-0.14);
    const rightEye = makeEye(0.14);
    headPivot.add(leftEye, rightEye);

    // Eyelid upper (for sad droop)
    const lidGeo = new THREE.SphereGeometry(0.08, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5);
    const leftLid = new THREE.Mesh(lidGeo, skinMat);
    leftLid.position.set(-0.14, 0.08, 0.36);
    leftLid.rotation.x = -0.2;
    headPivot.add(leftLid);
    const rightLid = leftLid.clone();
    rightLid.position.x = 0.14;
    headPivot.add(rightLid);

    // Eyebrows — use thin boxes, positioned for sad/happy
    const browGeo = new THREE.BoxGeometry(0.15, 0.025, 0.03);
    const leftBrow = new THREE.Mesh(browGeo, browMat);
    leftBrow.position.set(-0.14, 0.18, 0.4);
    headPivot.add(leftBrow);
    const rightBrow = new THREE.Mesh(browGeo, browMat);
    rightBrow.position.set(0.14, 0.18, 0.4);
    headPivot.add(rightBrow);

    // Mouth — two variants
    // Sad: frown (half torus, opening up)
    const sadMouthGeo = new THREE.TorusGeometry(0.09, 0.018, 12, 24, Math.PI);
    const sadMouth = new THREE.Mesh(sadMouthGeo, lipMat);
    sadMouth.position.set(0, -0.2, 0.4);
    sadMouth.rotation.z = Math.PI; // frown
    headPivot.add(sadMouth);

    // Happy: smile (half torus opening down)
    const happyMouthGeo = new THREE.TorusGeometry(0.12, 0.022, 12, 28, Math.PI);
    const happyMouth = new THREE.Mesh(happyMouthGeo, lipMat);
    happyMouth.position.set(0, -0.2, 0.4);
    happyMouth.rotation.z = 0;
    happyMouth.visible = false;
    headPivot.add(happyMouth);

    // Teeth (visible when happy)
    const teethMat = new THREE.MeshStandardMaterial({ color: 0xfdf6ec, roughness: 0.3 });
    const teeth = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.03, 0.02), teethMat);
    teeth.position.set(0, -0.19, 0.41);
    teeth.visible = false;
    headPivot.add(teeth);

    // Blush (happy cheeks)
    const blushMat = new THREE.MeshBasicMaterial({ color: 0xff7aa2, transparent: true, opacity: 0.45 });
    const leftBlush = new THREE.Mesh(new THREE.CircleGeometry(0.06, 24), blushMat);
    leftBlush.position.set(-0.22, -0.06, 0.38);
    leftBlush.visible = false;
    headPivot.add(leftBlush);
    const rightBlush = leftBlush.clone();
    rightBlush.material = blushMat;
    rightBlush.position.x = 0.22;
    rightBlush.visible = false;
    headPivot.add(rightBlush);

    // Hair — stacked irregular shapes for a messier, more realistic look
    const hairGroup = new THREE.Group();
    hairGroup.position.set(0, 0.04, 0);
    const hairCap = new THREE.Mesh(
        new THREE.SphereGeometry(0.44, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.55),
        hairMat
    );
    hairCap.position.y = 0.02;
    hairGroup.add(hairCap);

    // Hair tufts
    for (let i = 0; i < 8; i++) {
        const tuft = new THREE.Mesh(new THREE.SphereGeometry(0.1 + Math.random() * 0.05, 12, 12), hairMat);
        const angle = (i / 8) * Math.PI * 2;
        tuft.position.set(Math.cos(angle) * 0.32, 0.2 + Math.random() * 0.1, Math.sin(angle) * 0.25);
        tuft.scale.set(0.8, 0.9, 0.8);
        hairGroup.add(tuft);
    }
    // Fringe
    const fringe = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), hairMat);
    fringe.position.set(0, 0.12, 0.33);
    fringe.scale.set(1.3, 0.5, 0.6);
    hairGroup.add(fringe);

    headPivot.add(hairGroup);

    // ==== TORSO ====
    // Shirt body — slightly tapered
    const torsoGeo = new THREE.CylinderGeometry(0.46, 0.52, 1.1, 24, 1);
    const torso = new THREE.Mesh(torsoGeo, shirtMat);
    torso.position.y = 1.2;
    torso.castShadow = true;
    group.add(torso);

    // Collar
    const collar = new THREE.Mesh(
        new THREE.TorusGeometry(0.2, 0.04, 12, 24),
        shirtDarkMat
    );
    collar.position.y = 1.72;
    collar.rotation.x = Math.PI / 2;
    group.add(collar);

    // Shirt hem
    const hem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.53, 0.53, 0.06, 24),
        shirtDarkMat
    );
    hem.position.y = 0.67;
    group.add(hem);

    // Heart on shirt (a small decorative heart — theme)
    const heartMat = new THREE.MeshStandardMaterial({ color: 0xff4d94, roughness: 0.4, emissive: 0x330011, emissiveIntensity: 0.3 });
    const heartShape = new THREE.Shape();
    heartShape.moveTo(0, 0);
    heartShape.bezierCurveTo(0, 0.05, -0.08, 0.12, -0.08, 0.05);
    heartShape.bezierCurveTo(-0.08, -0.02, 0, -0.05, 0, -0.1);
    heartShape.bezierCurveTo(0, -0.05, 0.08, -0.02, 0.08, 0.05);
    heartShape.bezierCurveTo(0.08, 0.12, 0, 0.05, 0, 0);
    const heartGeo = new THREE.ExtrudeGeometry(heartShape, { depth: 0.02, bevelEnabled: false });
    const shirtHeart = new THREE.Mesh(heartGeo, heartMat);
    shirtHeart.position.set(0, 1.25, 0.47);
    shirtHeart.scale.set(1.3, 1.3, 1.3);
    shirtHeart.rotation.z = Math.PI;
    group.add(shirtHeart);

    // ==== ARMS (pivot at shoulder) ====
    function makeArm(side) {
        const pivot = new THREE.Group();
        pivot.position.set(side * 0.5, 1.65, 0);

        // Upper arm
        const upper = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.1, 0.5, 16), shirtMat);
        upper.position.y = -0.25;
        pivot.add(upper);

        // Elbow
        const elbow = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), shirtMat);
        elbow.position.y = -0.5;
        pivot.add(elbow);

        // Forearm (skin)
        const forearm = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.08, 0.45, 16), skinMat);
        forearm.position.y = -0.74;
        pivot.add(forearm);

        // Hand
        const hand = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), skinMat);
        hand.position.y = -1.0;
        hand.scale.set(1, 1.2, 0.7);
        pivot.add(hand);

        pivot.rotation.z = side * 0.22;
        return pivot;
    }
    const leftArmPivot = makeArm(-1);
    const rightArmPivot = makeArm(1);
    group.add(leftArmPivot, rightArmPivot);

    // ==== LEGS ====
    function makeLeg(x) {
        const legGroup = new THREE.Group();
        const thigh = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.12, 0.5, 16), pantsMat);
        thigh.position.y = -0.25;
        legGroup.add(thigh);

        const knee = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), pantsMat);
        knee.position.y = -0.5;
        legGroup.add(knee);

        const shin = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.1, 0.5, 16), pantsMat);
        shin.position.y = -0.75;
        legGroup.add(shin);

        // Shoe
        const shoe = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.12, 0.36), shoeMat);
        shoe.position.set(0, -1.02, 0.06);
        legGroup.add(shoe);

        legGroup.position.set(x, 0.65, 0);
        return legGroup;
    }
    const leftLeg = makeLeg(-0.2);
    const rightLeg = makeLeg(0.2);
    group.add(leftLeg, rightLeg);

    // ==== TEARS ====
    const tearMat = new THREE.MeshStandardMaterial({
        color: 0x4fc3f7,
        transparent: true,
        opacity: 0.92,
        roughness: 0.05,
        metalness: 0.3,
        emissive: 0x1a6fa0,
        emissiveIntensity: 0.5
    });

    function makeTear(x) {
        const tear = new THREE.Mesh(new THREE.SphereGeometry(0.05, 16, 16), tearMat.clone());
        tear.scale.set(1, 1.8, 1);
        tear.userData.startOffset = Math.random() * Math.PI * 2;
        tear.userData.sideX = x;
        headPivot.add(tear);
        tears.push(tear);
    }
    makeTear(-0.14);
    makeTear(0.14);

    scene.add(group);

    // Store refs
    boy.group = group;
    boy.headPivot = headPivot;
    boy.leftArmPivot = leftArmPivot;
    boy.rightArmPivot = rightArmPivot;
    boy.leftLeg = leftLeg;
    boy.rightLeg = rightLeg;
    boy.sadMouth = sadMouth;
    boy.happyMouth = happyMouth;
    boy.teeth = teeth;
    boy.leftBrow = leftBrow;
    boy.rightBrow = rightBrow;
    boy.leftBlush = leftBlush;
    boy.rightBlush = rightBlush;
    boy.leftLid = leftLid;
    boy.rightLid = rightLid;

    setMode('sad');
}

function animate() {
    requestAnimationFrame(animate);
    if (!boy.group) return;

    const t = clock.getElapsedTime();

    if (currentMode === 'sad') {
        // Slow breathing
        boy.group.position.y = Math.sin(t * 1.0) * 0.015;
        boy.group.rotation.y = Math.sin(t * 0.4) * 0.08;

        // Head down & slight sway
        boy.headPivot.rotation.x = 0.35 + Math.sin(t * 0.7) * 0.02;
        boy.headPivot.rotation.z = Math.sin(t * 0.5) * 0.03;

        // Sad brows: inner up, outer down
        boy.leftBrow.rotation.z = -0.25;
        boy.leftBrow.position.y = 0.19;
        boy.rightBrow.rotation.z = 0.25;
        boy.rightBrow.position.y = 0.19;

        // Drooping lids
        boy.leftLid.rotation.x = -0.05;
        boy.rightLid.rotation.x = -0.05;

        // Arms hang
        boy.leftArmPivot.rotation.z = 0.22 + Math.sin(t * 0.7) * 0.02;
        boy.rightArmPivot.rotation.z = -0.22 - Math.sin(t * 0.7) * 0.02;
        boy.leftArmPivot.rotation.x = 0;
        boy.rightArmPivot.rotation.x = 0;

        // Legs still
        boy.leftLeg.rotation.x = 0;
        boy.rightLeg.rotation.x = 0;

        // Tears animation — loop
        tears.forEach((tear) => {
            tear.visible = true;
            const phase = ((t * 0.7 + tear.userData.startOffset) % 1.8) / 1.8; // 0..1
            tear.position.x = tear.userData.sideX;
            tear.position.y = 0.02 - phase * 0.75;
            tear.position.z = 0.36;
            tear.material.opacity = phase < 0.1 ? phase * 9 : Math.max(0, 1 - (phase - 0.1) * 1.1);
            tear.scale.set(1 + phase * 0.1, 1.8 - phase * 0.3, 1);
        });

        if (boy.ground) boy.ground.position.y = -0.52;
    } else if (currentMode === 'happy') {
        // Jumping animation
        const jump = Math.abs(Math.sin(t * 4)) * 0.4;
        boy.group.position.y = jump;
        boy.group.rotation.y = Math.sin(t * 2) * 0.15;

        // Head up, bobbing
        boy.headPivot.rotation.x = -0.12 + Math.sin(t * 5) * 0.06;
        boy.headPivot.rotation.z = Math.sin(t * 3) * 0.05;

        // Happy brows: arched up
        boy.leftBrow.rotation.z = 0.12;
        boy.leftBrow.position.y = 0.22;
        boy.rightBrow.rotation.z = -0.12;
        boy.rightBrow.position.y = 0.22;

        // Open eyes
        boy.leftLid.rotation.x = -0.4;
        boy.rightLid.rotation.x = -0.4;

        // Arms raised, waving
        const wave = Math.sin(t * 7);
        boy.leftArmPivot.rotation.z = 2.3 + wave * 0.25;
        boy.rightArmPivot.rotation.z = -2.3 - wave * 0.25;
        boy.leftArmPivot.rotation.x = wave * 0.15;
        boy.rightArmPivot.rotation.x = -wave * 0.15;

        // Legs slightly tucked on jump
        const legBend = Math.max(0, Math.sin(t * 4));
        boy.leftLeg.rotation.x = -legBend * 0.2;
        boy.rightLeg.rotation.x = -legBend * 0.2;

        // Hide tears
        tears.forEach(tear => {
            tear.visible = false;
            tear.material.opacity = 0;
        });

        // Shadow scales with jump
        if (boy.ground) {
            const s = 1 - jump * 0.6;
            boy.ground.scale.set(s, s, s);
        }
    }

    renderer.render(scene, camera);
}

function onResize() {
    if (!renderer) return;
    const container = document.getElementById('canvasContainer');
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

// ============================================================
// MODE SWITCHER (public API)
// ============================================================
function setMode(mode) {
    if (mode !== 'sad' && mode !== 'happy') {
        console.warn(`[Three.js] setMode("${mode}") ignored. Use "sad" or "happy".`);
        return;
    }
    currentMode = mode;
    console.log(`[Three.js] setMode("${currentMode}")`);

    if (!boy.group) return;

    if (mode === 'happy') {
        boy.sadMouth.visible = false;
        boy.happyMouth.visible = true;
        boy.teeth.visible = true;
        boy.leftBlush.visible = true;
        boy.rightBlush.visible = true;
        tears.forEach(tear => { tear.visible = false; });
    } else {
        boy.sadMouth.visible = true;
        boy.happyMouth.visible = false;
        boy.teeth.visible = false;
        boy.leftBlush.visible = false;
        boy.rightBlush.visible = false;
        tears.forEach(tear => { tear.visible = true; });
    }
}
window.setMode = setMode;

// ============================================================
// ESCAPING "NON" BUTTON
// ============================================================
const nonBtn = document.getElementById('nonBtn');
const ouiBtn = document.getElementById('ouiBtn');
let isCelebrating = false;

function moveNonAway(px, py) {
    if (isCelebrating || nonBtn.style.display === 'none') return;
    const btn = nonBtn;
    const w = btn.offsetWidth;
    const h = btn.offsetHeight;
    const maxX = window.innerWidth - w - 20;
    const maxY = window.innerHeight - h - 20;

    let nx, ny, tries = 0;
    do {
        nx = Math.random() * maxX + 10;
        ny = Math.random() * maxY + 10;
        tries++;
    } while (tries < 10 && px !== undefined && Math.hypot((nx + w / 2) - px, (ny + h / 2) - py) < 180);

    if (!btn.classList.contains('escaping')) {
        btn.classList.add('escaping');
    }
    btn.style.left = nx + 'px';
    btn.style.top = ny + 'px';
}

function denyNonClick(event) {
    event.preventDefault();
    event.stopPropagation();
    const point = event.touches ? event.touches[0] : event;
    moveNonAway(point.clientX, point.clientY);
}

nonBtn.addEventListener('mouseenter', (e) => moveNonAway(e.clientX, e.clientY));
nonBtn.addEventListener('mousemove', (e) => moveNonAway(e.clientX, e.clientY));
nonBtn.addEventListener('mousedown', denyNonClick);
nonBtn.addEventListener('pointerdown', denyNonClick);
nonBtn.addEventListener('touchstart', denyNonClick, { passive: false });
nonBtn.addEventListener('click', denyNonClick);
nonBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') denyNonClick(e);
});

document.addEventListener('mousemove', (e) => {
    if (!nonBtn) return;
    const r = nonBtn.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
    if (dist < 110) {
        moveNonAway(e.clientX, e.clientY);
    }
});

// ============================================================
// GROWING "OUI" BUTTON ON ANY CLICK
// ============================================================
let ouiScale = 1;
const MAX_OUI_SCALE = 17;

function growOui() {
    if (ouiScale < MAX_OUI_SCALE) {
        ouiScale += 0.45;
        const fontSize = 1.2 * ouiScale;
        const padV = Math.min(window.innerHeight * 0.3, 18 * ouiScale);
        const padH = Math.min(window.innerWidth * 0.42, 40 * ouiScale);
        ouiBtn.style.fontSize = fontSize + 'rem';
        ouiBtn.style.padding = `${padV}px ${padH}px`;
        ouiBtn.style.borderRadius = (50 + ouiScale * 7) + 'px';
        ouiBtn.style.minWidth = Math.min(window.innerWidth * 0.9, 180 + ouiScale * 45) + 'px';
        ouiBtn.style.minHeight = Math.min(window.innerHeight * 0.55, 80 + ouiScale * 32) + 'px';
    }
}

function handleGlobalGrow(e) {
    if (isCelebrating) return;
    if (e.target === nonBtn) return;
    growOui();
}

document.addEventListener('click', handleGlobalGrow);
document.addEventListener('touchstart', handleGlobalGrow, { passive: true });

// ============================================================
// CONFETTI
// ============================================================
const confettiCanvas = document.getElementById('confettiCanvas');
const cctx = confettiCanvas.getContext('2d');
let confettiPieces = [];
let confettiRunning = false;

function resizeConfetti() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
}
resizeConfetti();
window.addEventListener('resize', resizeConfetti);

function launchConfetti() {
    confettiPieces = [];
    const colors = ['#ff4d94', '#ff3366', '#ffd166', '#06d6a0', '#118ab2', '#c084fc', '#ffffff'];
    for (let i = 0; i < 220; i++) {
        confettiPieces.push({
            x: Math.random() * confettiCanvas.width,
            y: -20 - Math.random() * confettiCanvas.height * 0.5,
            w: 6 + Math.random() * 8,
            h: 8 + Math.random() * 10,
            color: colors[Math.floor(Math.random() * colors.length)],
            vx: -2 + Math.random() * 4,
            vy: 2 + Math.random() * 4,
            rot: Math.random() * Math.PI * 2,
            vr: -0.2 + Math.random() * 0.4
        });
    }
    confettiRunning = true;
    renderConfetti();

    let bursts = 0;
    const burstInterval = setInterval(() => {
        for (let i = 0; i < 60; i++) {
            confettiPieces.push({
                x: Math.random() * confettiCanvas.width,
                y: -20,
                w: 6 + Math.random() * 8,
                h: 8 + Math.random() * 10,
                color: colors[Math.floor(Math.random() * colors.length)],
                vx: -2 + Math.random() * 4,
                vy: 2 + Math.random() * 4,
                rot: Math.random() * Math.PI * 2,
                vr: -0.2 + Math.random() * 0.4
            });
        }
        bursts++;
        if (bursts > 20) clearInterval(burstInterval);
    }, 500);
}

function renderConfetti() {
    if (!confettiRunning) return;
    cctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettiPieces.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        cctx.save();
        cctx.translate(p.x, p.y);
        cctx.rotate(p.rot);
        cctx.fillStyle = p.color;
        cctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        cctx.restore();
    });
    confettiPieces = confettiPieces.filter(p => p.y < confettiCanvas.height + 30);
    requestAnimationFrame(renderConfetti);
}

// ============================================================
// BALLOONS
// ============================================================
function launchBalloons() {
    const layer = document.getElementById('balloonsLayer');
    const colors = ['#ff4d94', '#ff80b5', '#c084fc', '#ffd166', '#06d6a0', '#4fc3f7', '#ffffff'];
    let count = 0;
    const interval = setInterval(() => {
        for (let i = 0; i < 3; i++) {
            const b = document.createElement('div');
            b.className = 'balloon';
            b.style.left = Math.random() * 100 + 'vw';
            b.style.background = `radial-gradient(circle at 30% 30%, #ffffff99, ${colors[Math.floor(Math.random() * colors.length)]})`;
            const dur = 6 + Math.random() * 5;
            b.style.animationDuration = dur + 's';
            b.style.width = (36 + Math.random() * 28) + 'px';
            b.style.height = (46 + Math.random() * 34) + 'px';
            layer.appendChild(b);
            setTimeout(() => b.remove(), dur * 1000 + 200);
        }
        count++;
        if (count > 12) clearInterval(interval);
    }, 400);
}

// ============================================================
// OUI CLICK HANDLER
// ============================================================
ouiBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    isCelebrating = true;

    const title = document.getElementById('mainTitle');
    title.textContent = 'Merciiii ❤️ Tu es la meilleure !';
    title.classList.add('happy');

    nonBtn.style.display = 'none';

    launchConfetti();
    launchBalloons();

    setMode('happy');
});

// ============================================================
// INIT
// ============================================================
window.addEventListener('load', () => {
    if (typeof THREE !== 'undefined') {
        console.log('[Three.js] window.load fired.');
        initThree();
    } else {
        console.error('[Three.js] window.load fired but library missing.');
    }
});
