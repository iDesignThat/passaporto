// Cielo animato dietro il gioco: aerei visti dall'alto che volano su traiettorie curve,
// si inclinano in virata e lasciano dietro di sé una scia tratteggiata che sfuma.
(function () {
  'use strict';
  const cv = document.getElementById('cielo');
  if (!cv) return;
  const c = cv.getContext('2d');
  const fermo = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (fermo) return;

  const INK = '#1E1B3A';
  const COLORI = ['#FFC531', '#0F8B8D', '#D6246E', '#2E8BEF', '#3CC46B', '#9B5DE5'];
  const VITA_SCIA = 6.5;        // secondi prima che la scia sparisca
  const MAX_AEREI = 3;          // quanti in volo contemporaneamente
  let W = 0, H = 0, DPR = 1, unita = 1;

  function dimensiona() {
    DPR = Math.min(2, window.devicePixelRatio || 1);
    W = innerWidth; H = innerHeight;
    cv.width = Math.round(W * DPR); cv.height = Math.round(H * DPR);
    cv.style.width = W + 'px'; cv.style.height = H + 'px';
    unita = Math.max(.6, Math.min(W, H) / 900);   // aerei e velocità in proporzione allo schermo
    if (/[?&]aerei-grandi/.test(location.search)) unita *= 3.5;   // solo per controllare il disegno da vicino
  }
  addEventListener('resize', dimensiona);
  dimensiona();

  const rnd = (a, b) => a + Math.random() * (b - a);
  const bez = (P, t) => { const u = 1 - t; return [0, 1].map(k => u * u * u * P[0][k] + 3 * u * u * t * P[1][k] + 3 * u * t * t * P[2][k] + t * t * t * P[3][k]); };
  const dbez = (P, t) => { const u = 1 - t; return [0, 1].map(k => 3 * u * u * (P[1][k] - P[0][k]) + 6 * u * t * (P[2][k] - P[1][k]) + 3 * t * t * (P[3][k] - P[2][k])); };

  // nuovo aereo: entra da un lato, esce dal lato opposto con una curva a S
  function nuovoAereo(inVolo) {
    const m = 90 * unita, lato = Math.floor(Math.random() * 4);
    let p0, p3;
    if (lato === 0) { p0 = [-m, rnd(.1, .9) * H]; p3 = [W + m, rnd(.1, .9) * H]; }
    else if (lato === 1) { p0 = [W + m, rnd(.1, .9) * H]; p3 = [-m, rnd(.1, .9) * H]; }
    else if (lato === 2) { p0 = [rnd(.1, .9) * W, -m]; p3 = [rnd(.1, .9) * W, H + m]; }
    else { p0 = [rnd(.1, .9) * W, H + m]; p3 = [rnd(.1, .9) * W, -m]; }
    const dx = p3[0] - p0[0], dy = p3[1] - p0[1], L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L;
    const k1 = rnd(-.4, .4) * L, k2 = rnd(-.4, .4) * L;
    const P = [p0, [p0[0] + dx * .33 + nx * k1, p0[1] + dy * .33 + ny * k1], [p0[0] + dx * .66 + nx * k2, p0[1] + dy * .66 + ny * k2], p3];
    return {
      P, t: inVolo ? rnd(.15, .45) : 0, v: rnd(75, 120) * unita, dim: rnd(.8, 1.15) * unita,
      col: COLORI[Math.floor(Math.random() * COLORI.length)], scia: [], dist: 0, ang: null, rollio: 0, finito: false,
    };
  }

  // ---- disegno dell'aereo, muso verso destra, coordinate in "unità aereo" ----
  function ala(lato) {          // lato: 1 = destra, -1 = sinistra
    c.beginPath();
    c.moveTo(10, -5 * lato);
    c.bezierCurveTo(4, -14 * lato, -4, -24 * lato, -8, -31 * lato);
    c.quadraticCurveTo(-13, -34 * lato, -16, -30 * lato);
    c.lineTo(-7, -5 * lato);
    c.closePath();
  }
  function coda(lato) {
    c.beginPath();
    c.moveTo(-21, -3 * lato);
    c.lineTo(-29, -13 * lato);
    c.quadraticCurveTo(-32, -15 * lato, -34, -12 * lato);
    c.lineTo(-30, -3 * lato);
    c.closePath();
  }
  function fusoliera() {
    c.beginPath();
    c.moveTo(-31, -4.5);
    c.lineTo(18, -5.5);
    c.bezierCurveTo(28, -5.5, 34, -2.5, 35, 0);
    c.bezierCurveTo(34, 2.5, 28, 5.5, 18, 5.5);
    c.lineTo(-31, 4.5);
    c.quadraticCurveTo(-38, 0, -31, -4.5);
    c.closePath();
  }
  function motore(lato) { c.beginPath(); c.ellipse(1, 15 * lato, 6.5, 3.2, 0, 0, Math.PI * 2); }

  function sagoma(colore) {
    const ombra = !colore;
    const riempi = (col) => { c.fillStyle = ombra ? 'rgba(30,27,58,.16)' : col; c.fill(); if (!ombra) c.stroke(); };
    c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; c.lineWidth = 2.4;
    [1, -1].forEach(l => { coda(l); riempi('#EEF2F7'); });
    [1, -1].forEach(l => { ala(l); riempi('#F4F7FB'); });
    if (!ombra) {
      // banda colorata sul bordo delle ali
      [1, -1].forEach(l => {
        c.beginPath(); c.moveTo(-8, -31 * l); c.quadraticCurveTo(-13, -34 * l, -16, -30 * l); c.lineTo(-12.5, -24 * l); c.closePath();
        c.fillStyle = colore; c.fill();
      });
    }
    [1, -1].forEach(l => { motore(l); riempi('#D3DAE3'); });
    fusoliera(); riempi('#FFFFFF');
    if (ombra) return;
    // striscia colorata lungo la fusoliera e deriva di coda
    c.beginPath(); c.moveTo(-30, -1.6); c.lineTo(14, -1.6); c.lineTo(14, 1.6); c.lineTo(-30, 1.6); c.closePath();
    c.fillStyle = colore; c.fill();
    c.beginPath(); c.moveTo(-34, 0); c.lineTo(-22, 0); c.lineWidth = 3.4; c.strokeStyle = colore; c.stroke();
    c.lineWidth = 2.4; c.strokeStyle = INK;
    // parabrezza
    c.beginPath(); c.moveTo(24, -3.6); c.quadraticCurveTo(31, -2.2, 31.5, 0); c.quadraticCurveTo(31, 2.2, 24, 3.6); c.quadraticCurveTo(26, 0, 24, -3.6); c.closePath();
    c.fillStyle = '#2B3A5C'; c.fill();
    c.beginPath(); c.moveTo(26.5, -2.2); c.quadraticCurveTo(29.5, -1.4, 30, 0); c.strokeStyle = 'rgba(255,255,255,.75)'; c.lineWidth = 1.2; c.stroke();
    c.lineWidth = 2.4; c.strokeStyle = INK;
  }

  function disegnaAereo(a, pos) {
    const roll = 1 - Math.min(.38, Math.abs(a.rollio) * .55);   // in virata le ali si accorciano: sembra inclinato
    c.save();
    c.translate(pos[0], pos[1]); c.rotate(a.ang); c.scale(a.dim, a.dim);
    c.save(); c.translate(7, 11); c.scale(1, roll); sagoma(null); c.restore();   // ombra sul "terreno"
    c.save(); c.scale(1, roll); sagoma(a.col); c.restore();
    c.restore();
  }

  // scia tratteggiata: i trattini restano fermi nel cielo (non scorrono) e sfumano con il tempo
  function disegnaScia(a, ora) {
    const s = a.scia;
    if (s.length < 2) return;
    c.lineCap = 'round';
    c.setLineDash([.1, 13 * a.dim]);
    c.lineWidth = 4.2 * a.dim;
    const passo = 6;
    for (let i = 0; i < s.length - 1; i += passo) {
      const fine = Math.min(s.length - 1, i + passo);
      const eta = (ora - s[Math.floor((i + fine) / 2)].nato) / VITA_SCIA;
      const alfa = Math.max(0, .62 * (1 - eta));
      if (alfa <= .01) continue;
      c.beginPath();
      c.moveTo(s[i].x, s[i].y);
      for (let k = i + 1; k <= fine; k++) c.lineTo(s[k].x, s[k].y);
      c.lineDashOffset = s[i].d;   // il tratteggio è ancorato alla distanza percorsa: i puntini non si sdoppiano tra un pezzo e l'altro
      c.strokeStyle = `rgba(255,255,255,${alfa.toFixed(3)})`;
      c.stroke();
    }
    c.setLineDash([]);
  }

  const aerei = [nuovoAereo(true), nuovoAereo(true)];
  let ultimoLancio = 0, prima = performance.now();

  function frame(ora) {
    const dt = Math.max(0, Math.min(.05, (ora - prima) / 1000)); prima = ora;
    const sec = ora / 1000;
    c.setTransform(DPR, 0, 0, DPR, 0, 0);
    c.clearRect(0, 0, W, H);

    const inVolo = aerei.filter(a => !a.finito).length;
    if (inVolo < MAX_AEREI && sec - ultimoLancio > rnd(2.5, 5)) { aerei.push(nuovoAereo(false)); ultimoLancio = sec; }

    for (const a of aerei) {
      // la scia invecchia anche dopo che l'aereo è uscito dallo schermo
      while (a.scia.length && sec - a.scia[0].nato > VITA_SCIA) a.scia.shift();
      if (!a.finito) {
        const d = dbez(a.P, a.t), vel = Math.max(1, Math.hypot(d[0], d[1]));
        a.t += a.v * dt / vel;
        if (a.t >= 1) a.finito = true;
        const t = Math.min(1, a.t), dd = dbez(a.P, t), ang = Math.atan2(dd[1], dd[0]);
        if (a.ang === null) a.ang = ang;
        let diff = ang - a.ang; while (diff > Math.PI) diff -= 2 * Math.PI; while (diff < -Math.PI) diff += 2 * Math.PI;
        a.rollio += ((diff / Math.max(dt, .001)) - a.rollio) * Math.min(1, dt * 4);   // virata morbida
        a.ang = ang;
        a.pos = bez(a.P, t);
        // la scia nasce dalla coda
        const coda = [a.pos[0] - Math.cos(ang) * 36 * a.dim, a.pos[1] - Math.sin(ang) * 36 * a.dim];
        const ult = a.scia[a.scia.length - 1];
        const passo = ult ? Math.hypot(coda[0] - ult.x, coda[1] - ult.y) : 0;
        if (!ult || passo > 3) { a.dist += passo; a.scia.push({ x: coda[0], y: coda[1], d: a.dist, nato: sec }); }
      }
    }
    for (let i = aerei.length - 1; i >= 0; i--) if (aerei[i].finito && !aerei[i].scia.length) aerei.splice(i, 1);

    for (const a of aerei) disegnaScia(a, sec);
    for (const a of aerei) if (!a.finito && a.pos) disegnaAereo(a, a.pos);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
