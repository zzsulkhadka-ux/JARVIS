// ═══════════════════════════════════════════════
//   J.A.R.V.I.S — script.js
//   FULL OFFLINE AI | NO API | FAKE BRAIN
//   VOICE DETECTION + RESPONSE
//   3D EARTH | MATRIX | IRON MAN HUD
// ═══════════════════════════════════════════════

const WAKE  = "hey jarvis";
const STOP  = "stop jarvis";

let isListening = false;
let recognition = null;
let synth       = window.speechSynthesis;
let startTime   = Date.now();
let radarAng    = 0;
let earthAng    = 0;
let orbRadarCtx = null;
let earthCtx    = null;

// ═══════════════════════════════════════════════
//  SOUND ENGINE
// ═══════════════════════════════════════════════
function sound(freq, dur = 0.2, type = 'sine', vol = 0.08) {
  try {
    const ctx  = new (window.AudioContext || window.webkitAudioContext)();
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = type; osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + dur + 0.05);
  } catch(e) {}
}

function bootSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    // Epic boot chord sequence
    const notes = [
      {f:200,t:0.0,d:0.3,type:'sawtooth'},
      {f:300,t:0.1,d:0.3,type:'sawtooth'},
      {f:400,t:0.2,d:0.4,type:'square'},
      {f:600,t:0.3,d:0.4,type:'square'},
      {f:800,t:0.5,d:0.3,type:'sine'},
      {f:1000,t:0.7,d:0.5,type:'sine'},
      {f:1200,t:0.9,d:0.6,type:'sine'},
    ];
    notes.forEach(n => {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = n.type; osc.frequency.value = n.f;
      gain.gain.setValueAtTime(0.07, ctx.currentTime + n.t);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + n.t + n.d);
      osc.start(ctx.currentTime + n.t);
      osc.stop(ctx.currentTime + n.t + n.d + 0.1);
    });
  } catch(e) {}
}

function hackSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    for (let i = 0; i < 12; i++) {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = 'sawtooth';
      osc.frequency.value = Math.random() * 800 + 100;
      const t = i * 0.06;
      gain.gain.setValueAtTime(0.06, ctx.currentTime + t);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.08);
      osc.start(ctx.currentTime + t);
      osc.stop(ctx.currentTime + t + 0.1);
    }
  } catch(e) {}
}

function activateSound() {
  [600, 800, 1000, 1400].forEach((f, i) =>
    setTimeout(() => sound(f, 0.15, 'sine', 0.1), i * 80)
  );
}

function deactivateSound() {
  [1000, 700, 400, 200].forEach((f, i) =>
    setTimeout(() => sound(f, 0.12, 'sine', 0.08), i * 70)
  );
}

// ═══════════════════════════════════════════════
//  MATRIX BACKGROUND
// ═══════════════════════════════════════════════
function initMatrix() {
  const canvas = document.getElementById('matrixBg');
  const ctx    = canvas.getContext('2d');
  function resize() { canvas.width = innerWidth; canvas.height = innerHeight; }
  resize(); window.addEventListener('resize', resize);
  const chars = 'アイウエオカキクケコ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>{}[]|/\\#@!%^&*';
  const fs    = 12;
  let drops   = Array(Math.floor(innerWidth / fs)).fill(1);
  setInterval(() => {
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drops = Array(Math.floor(canvas.width / fs)).fill(drops[0] || 1);
    drops.forEach((y, i) => {
      const ch = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillStyle = y * fs < 30 ? '#afffbf' : '#00ff41';
      ctx.font = fs + 'px Share Tech Mono';
      ctx.fillText(ch, i * fs, y * fs);
      if (y * fs > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
  }, 48);
}

// ═══════════════════════════════════════════════
//  INTRO — PHASE 1: SYSTEM HACKED
// ═══════════════════════════════════════════════
const hackPhrases = [
  'SYSTEM HACKED', 'BYPASSING FIREWALL', 'ACCESS GRANTED',
  'INFILTRATING CORE', 'DECRYPTING DATA', 'ROOT ACCESS',
  'SYSTEM HACKED', 'INITIALIZING A.I.'
];

function runPhase1() {
  return new Promise(async resolve => {
    const canvas  = document.getElementById('hackCanvas');
    const ctx     = canvas.getContext('2d');
    const textEl  = document.getElementById('hackText');
    canvas.width  = innerWidth;
    canvas.height = innerHeight;

    hackSound();

    // Draw glitch code lines on canvas
    let frame = 0;
    const iv = setInterval(() => {
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < 18; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const w = Math.random() * 200 + 50;
        ctx.fillStyle = `rgba(${Math.random()>0.5?255:0},${Math.floor(Math.random()*80)},${Math.random()>0.7?255:0},${Math.random()*0.6+0.1})`;
        ctx.fillRect(x, y, w, 2);
      }
      // Random chars
      for (let i = 0; i < 25; i++) {
        ctx.fillStyle = Math.random() > 0.5 ? '#ff2020' : '#00ff41';
        ctx.font = Math.floor(Math.random() * 14 + 8) + 'px Share Tech Mono';
        ctx.fillText(
          String.fromCharCode(Math.floor(Math.random() * 93 + 33)),
          Math.random() * canvas.width,
          Math.random() * canvas.height
        );
      }
      frame++;
    }, 50);

    // Cycle hack phrases
    for (let i = 0; i < hackPhrases.length; i++) {
      textEl.textContent = hackPhrases[i];
      await sleep(400);
    }
    clearInterval(iv);
    resolve();
  });
}

// ═══════════════════════════════════════════════
//  INTRO — PHASE 2: 3D CODE RAIN
// ═══════════════════════════════════════════════
function runPhase2() {
  return new Promise(async resolve => {
    const canvas = document.getElementById('codeCanvas3d');
    const ctx    = canvas.getContext('2d');
    canvas.width  = innerWidth;
    canvas.height = innerHeight;

    const cols   = Math.floor(canvas.width / 16);
    const drops  = Array(cols).fill(-Math.random() * 50);
    const speeds = Array(cols).fill(0).map(() => Math.random() * 2 + 1);
    const chars  = '01アイウエBYPASS_SECURE_CORE_JARVIS_IRON_MAN_AI';
    let frame    = 0;

    const iv = setInterval(() => {
      // 3D perspective effect
      ctx.fillStyle = 'rgba(0,0,0,0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < cols; i++) {
        const z    = Math.abs(Math.sin(i * 0.3 + frame * 0.02));
        const size = Math.floor(10 + z * 10);
        const alpha= 0.3 + z * 0.7;
        const ch   = chars[Math.floor(Math.random() * chars.length)];

        ctx.font      = size + 'px Share Tech Mono';
        ctx.fillStyle = drops[i] * 16 < 60
          ? `rgba(180,255,180,${alpha})`
          : `rgba(0,255,65,${alpha * 0.7})`;

        ctx.fillText(ch, i * 16, drops[i] * 16);
        if (drops[i] * 16 > canvas.height && Math.random() > 0.97) drops[i] = -10;
        drops[i] += speeds[i];
      }

      // Perspective grid lines
      if (frame % 3 === 0) {
        ctx.strokeStyle = 'rgba(0,255,65,0.04)';
        ctx.lineWidth   = 1;
        for (let y = 0; y < canvas.height; y += 40) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }
      }
      frame++;
    }, 40);

    await sleep(2800);
    clearInterval(iv);
    resolve();
  });
}

// ═══════════════════════════════════════════════
//  INTRO — PHASE 3: JARVIS TITLE
// ═══════════════════════════════════════════════
const bootLines3 = [
  'NEURAL MATRIX v9.4 LOADING...',
  'IRON MAN PROTOCOLS ACTIVE...',
  'VOICE ENGINE CALIBRATED...',
  'OFFLINE BRAIN INITIALIZED...',
  'EARTH MONITORING ONLINE...',
  'SECURITY SHIELD ARMED...',
  'ALL SYSTEMS NOMINAL.',
  'WELCOME BACK.'
];

function runPhase3() {
  return new Promise(async resolve => {
    const sub    = document.getElementById('titleSub');
    const bar    = document.getElementById('titleBar');
    const status = document.getElementById('titleStatus');
    bootSound();

    for (let i = 0; i < bootLines3.length; i++) {
      // Type each line
      let t = '';
      for (let c of bootLines3[i]) {
        t += c;
        sub.textContent = t;
        await sleep(24);
      }
      bar.style.width = ((i + 1) / bootLines3.length * 100) + '%';
      sound(300 + i * 90, 0.1, 'square', 0.07);
      await sleep(180);
    }
    status.textContent = 'JARVIS ONLINE ✓';
    await sleep(900);
    resolve();
  });
}

// ═══════════════════════════════════════════════
//  MAIN BOOT SEQUENCE
// ═══════════════════════════════════════════════
window.addEventListener('load', () => {
  initMatrix();
  runIntro();
  setInterval(updateClock, 1000);
  setInterval(updateUptime, 1000);
  updateClock();
});

async function runIntro() {
  // Phase 1 — Hack glitch
  showPhase('phaseHack');
  await runPhase1();
  await sleep(200);

  // Phase 2 — 3D code
  showPhase('phaseCode');
  await runPhase2();
  await sleep(200);

  // Phase 3 — Title
  showPhase('phaseTitle');
  await runPhase3();
  await sleep(400);

  // Launch app
  document.getElementById('intro').style.opacity = '0';
  document.getElementById('intro').style.transition = 'opacity 0.8s';
  await sleep(800);
  document.getElementById('intro').style.display = 'none';

  const app = document.getElementById('app');
  app.classList.remove('hidden');
  app.style.opacity = '0';
  app.style.transition = 'opacity 0.8s';
  await sleep(50);
  app.style.opacity = '1';

  initEarth();
  initOrbRadar();
  initEyeCanvases();
  initSpeech();

  speak("J.A.R.V.I.S online. All systems fully operational. Say Hey Jarvis to begin.");
  addLog("boot complete");
  addLog("voice ready");
  addLog("brain loaded");
}

function showPhase(id) {
  document.querySelectorAll('.phase').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ═══════════════════════════════════════════════
//  CLOCK + UPTIME
// ═══════════════════════════════════════════════
function updateClock() {
  const now = new Date();
  const t   = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  const d   = now.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' });
  const c   = document.getElementById('tbClock');
  const dd  = document.getElementById('tbDate');
  if (c)  c.textContent  = t;
  if (dd) dd.textContent = d;
}

function updateUptime() {
  const s   = Math.floor((Date.now() - startTime) / 1000);
  const h   = String(Math.floor(s / 3600)).padStart(2, '0');
  const m   = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
  const sec = String(s % 60).padStart(2, '0');
  const el  = document.getElementById('uptimeVal');
  if (el) el.textContent = `${h}:${m}:${sec}`;

  // Animate CPU bar
  const cpu = document.getElementById('vCPU');
  if (cpu) {
    const v = 40 + Math.round(Math.sin(Date.now() / 2000) * 25 + Math.random() * 8);
    cpu.style.width = v + '%';
  }
}

// ═══════════════════════════════════════════════
//  3D EARTH (wireframe green hacker globe)
// ═══════════════════════════════════════════════
function initEarth() {
  const canvas = document.getElementById('earthCanvas');
  earthCtx     = canvas.getContext('2d');
  drawEarth();
}

function drawEarth() {
  const canvas = document.getElementById('earthCanvas');
  if (!canvas || !earthCtx) return;
  const W  = canvas.width;
  const H  = canvas.height;
  const cx = W / 2;
  const cy = H / 2;
  const R  = W / 2 - 6;
  const ctx= earthCtx;

  ctx.clearRect(0, 0, W, H);

  // Glow bg
  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
  grad.addColorStop(0, 'rgba(0,255,65,0.04)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.fill();

  // Latitude lines
  for (let lat = -80; lat <= 80; lat += 20) {
    const latR   = lat * Math.PI / 180;
    const yLat   = cy + R * Math.sin(latR);
    const rLat   = R * Math.cos(latR);
    if (rLat < 2) continue;
    ctx.beginPath();
    ctx.ellipse(cx, yLat, rLat, rLat * 0.28, 0, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(0,255,65,${lat === 0 ? 0.5 : 0.18})`;
    ctx.lineWidth   = lat === 0 ? 1.2 : 0.7;
    ctx.stroke();
  }

  // Longitude lines (rotating)
  const numLon = 12;
  for (let i = 0; i < numLon; i++) {
    const lon   = (i / numLon) * Math.PI * 2 + earthAng;
    const cosL  = Math.cos(lon);
    const alpha = (cosL + 1) / 2;
    ctx.beginPath();
    ctx.strokeStyle = `rgba(0,255,65,${0.08 + alpha * 0.28})`;
    ctx.lineWidth   = 0.7;

    for (let lat = -90; lat <= 90; lat += 4) {
      const latR = lat * Math.PI / 180;
      const x    = cx + R * Math.cos(latR) * cosL;
      const y    = cy + R * Math.sin(latR);
      if (lat === -90) ctx.moveTo(x, y);
      else             ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  // Outer ring
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(0,255,65,0.45)';
  ctx.lineWidth   = 1.5;
  ctx.stroke();

  // Moving dots (satellites)
  const sats = [
    { a: earthAng * 2.1,   r: R * 0.6, lat: 30 },
    { a: earthAng * 1.5+1, r: R * 0.75,lat: -40 },
    { a: earthAng * 3.0+2, r: R * 0.5, lat: 60 },
  ];
  sats.forEach(s => {
    const latR = s.lat * Math.PI / 180;
    const x    = cx + R * Math.cos(latR) * Math.cos(s.a);
    const y    = cy + R * Math.sin(latR);
    ctx.beginPath();
    ctx.arc(x, y, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = '#00ff41';
    ctx.shadowColor = '#00ff41';
    ctx.shadowBlur  = 8;
    ctx.fill();
    ctx.shadowBlur  = 0;
  });

  // Matrix chars on globe
  if (Math.random() > 0.7) {
    ctx.fillStyle = 'rgba(0,255,65,0.35)';
    ctx.font      = '9px Share Tech Mono';
    const angle   = Math.random() * Math.PI * 2;
    const dist    = Math.random() * R * 0.8;
    const mx      = cx + Math.cos(angle) * dist;
    const my      = cy + Math.sin(angle) * dist * 0.5;
    ctx.fillText(String.fromCharCode(Math.floor(Math.random() * 60 + 48)), mx, my);
  }

  earthAng += 0.008;
  requestAnimationFrame(drawEarth);
}

// ═══════════════════════════════════════════════
//  ORB RADAR
// ═══════════════════════════════════════════════
function initOrbRadar() {
  const canvas = document.getElementById('orbRadar');
  if (!canvas) return;
  orbRadarCtx  = canvas.getContext('2d');
  drawOrbRadar();
}

function drawOrbRadar() {
  if (!orbRadarCtx) return;
  const ctx = orbRadarCtx;
  const W   = 140; const H = 140;
  const cx  = W / 2; const cy = H / 2; const r = 62;

  ctx.clearRect(0, 0, W, H);

  // Grid circles
  ctx.strokeStyle = 'rgba(255,100,0,0.12)';
  ctx.lineWidth   = 0.8;
  [0.33, 0.66, 1.0].forEach(f => {
    ctx.beginPath();
    ctx.arc(cx, cy, r * f, 0, Math.PI * 2);
    ctx.stroke();
  });

  // Cross
  ctx.beginPath();
  ctx.moveTo(cx - r, cy); ctx.lineTo(cx + r, cy);
  ctx.moveTo(cx, cy - r); ctx.lineTo(cx, cy + r);
  ctx.stroke();

  // Sweep
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(radarAng);
  const g = ctx.createLinearGradient(0, 0, r, 0);
  g.addColorStop(0, 'rgba(255,100,0,0.5)');
  g.addColorStop(1, 'rgba(255,100,0,0)');
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.arc(0, 0, r, -0.45, 0);
  ctx.fillStyle = g;
  ctx.fill();
  ctx.restore();

  radarAng += 0.045;
  requestAnimationFrame(drawOrbRadar);
}

// ═══════════════════════════════════════════════
//  EYE CANVASES (Iron Man eyes)
// ═══════════════════════════════════════════════
function initEyeCanvases() {
  drawEye('leftEyeCanvas', true);
  drawEye('rightEyeCanvas', false);
}

function drawEye(id, isLeft) {
  const canvas = document.getElementById(id);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let scanY   = 0;
  let frame   = 0;

  function render() {
    const W = canvas.width; const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // Eye shape bg
    ctx.fillStyle = '#0d0000';
    ctx.fillRect(0, 0, W, H);

    // Glowing grid
    ctx.strokeStyle = 'rgba(255,80,0,0.12)';
    ctx.lineWidth   = 0.6;
    for (let x = 0; x < W; x += 14) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y < H; y += 14) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }

    // Scan line
    const grad = ctx.createLinearGradient(0, scanY - 10, 0, scanY + 10);
    grad.addColorStop(0, 'rgba(255,80,0,0)');
    grad.addColorStop(0.5, 'rgba(255,120,0,0.7)');
    grad.addColorStop(1, 'rgba(255,80,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, scanY - 10, W, 20);

    // Corner brackets
    ctx.strokeStyle = '#ff6400';
    ctx.lineWidth   = 1.5;
    const bs = 12;
    // TL
    ctx.beginPath(); ctx.moveTo(0, bs); ctx.lineTo(0, 0); ctx.lineTo(bs, 0); ctx.stroke();
    // TR
    ctx.beginPath(); ctx.moveTo(W - bs, 0); ctx.lineTo(W, 0); ctx.lineTo(W, bs); ctx.stroke();
    // BL
    ctx.beginPath(); ctx.moveTo(0, H - bs); ctx.lineTo(0, H); ctx.lineTo(bs, H); ctx.stroke();
    // BR
    ctx.beginPath(); ctx.moveTo(W - bs, H); ctx.lineTo(W, H); ctx.lineTo(W, H - bs); ctx.stroke();

    // Center reticle
    const cx = W / 2; const cy = H / 2;
    ctx.strokeStyle = `rgba(255,100,0,${0.4 + Math.sin(frame * 0.1) * 0.3})`;
    ctx.lineWidth   = 1;
    ctx.beginPath(); ctx.arc(cx, cy, 12, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx - 18, cy); ctx.lineTo(cx - 14, cy);
    ctx.moveTo(cx + 14, cy); ctx.lineTo(cx + 18, cy);
    ctx.moveTo(cx, cy - 18); ctx.lineTo(cx, cy - 14);
    ctx.moveTo(cx, cy + 14); ctx.lineTo(cx, cy + 18);
    ctx.stroke();

    // Random blip dots
    if (frame % 8 === 0) {
      ctx.fillStyle = '#ff8800';
      ctx.beginPath();
      ctx.arc(Math.random() * W, Math.random() * H, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    scanY += 1.5;
    if (scanY > H) scanY = 0;
    frame++;
    requestAnimationFrame(render);
  }
  render();
}

// ═══════════════════════════════════════════════
//  SPEECH RECOGNITION
// ═══════════════════════════════════════════════
function initSpeech() {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    setStatus('⚠ VOICE NOT SUPPORTED — USE CHROME');
    typeOut('Voice recognition not supported. Please use Google Chrome.');
    return;
  }
  const SR    = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SR();
  recognition.continuous     = true;
  recognition.interimResults = false;
  recognition.lang           = 'en-US';

  recognition.onresult = e => {
    const raw = e.results[e.results.length - 1][0].transcript.toLowerCase().trim();
    console.log('Heard:', raw);
    addLog(raw.substring(0, 22));

    if (raw.includes(STOP) && isListening) { deactivate(); return; }
    if (raw.includes(WAKE) && !isListening){ activate();   return; }
    if (isListening) {
      const cmd = raw.replace(WAKE, '').replace(STOP, '').trim();
      if (cmd.length > 1) handleCommand(cmd);
    }
  };

  recognition.onerror = e => {
    if (e.error === 'no-speech' || e.error === 'aborted') return;
    console.warn('SR error:', e.error);
  };

  recognition.onend = () => {
    try { recognition.start(); } catch(e) {}
  };

  try { recognition.start(); } catch(e) {}
}

// ═══════════════════════════════════════════════
//  ACTIVATE / DEACTIVATE
// ═══════════════════════════════════════════════
function activate() {
  isListening = true;
  activateSound();
  setStatus('▮ LISTENING — SPEAK YOUR COMMAND');
  setOrbState('listening');
  setBBVoice('LISTENING');
  setPsVoice('ACTIVE');
  updateBtn(true);
  showW
