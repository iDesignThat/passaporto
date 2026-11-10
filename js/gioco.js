// Passaporto: motore del gioco.
(function () {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const casuale = a => a[Math.floor(Math.random() * a.length)];
  const mescola = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  const MAPPA = window.MAPPA, DOMANDE = window.DOMANDE || [], AV = window.Avatar;
  const SALVA_SETUP = 'passaporto-setup-v1', SALVA_PARTITA = 'passaporto-partita-v1';

  const CATS = ['geo', 'sto', 'art', 'cib', 'sci', 'spo'];
  const CAT = {
    geo: { n: 'Geografia', col: '#2E8BEF' },
    sto: { n: 'Storia', col: '#F0543C' },
    art: { n: 'Arte e cultura', col: '#9B5DE5' },
    cib: { n: 'Cibo e tradizioni', col: '#FFC531' },
    sci: { n: 'Scienza e natura', col: '#3CC46B' },
    spo: { n: 'Sport e spettacolo', col: '#FF6FB5' },
  };
  const COL = ['#0F8B8D', '#D6246E'];
  const INK = '#1E1B3A';
  const NOMI = ['Alessandro', 'Claudia'];

  // ---------- Icone ----------
  function icona(c, col, sw = 2) {
    const g = d => `<g fill="none" stroke="${col}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${d}</g>`;
    switch (c) {
      case 'geo': return g(`<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3,12 H21 M5,7.5 H19 M5,16.5 H19"/>`);
      case 'sto': return g(`<path d="M3,8 L12,3 L21,8 Z M5,10 V17 M9.7,10 V17 M14.3,10 V17 M19,10 V17 M4,19.5 H20"/>`);
      case 'art': return g(`<path d="M12,3 a9,9 0 1 0 0,18 c1.5,0 2,-1 2,-2 c0,-1.2 -1,-1.6 -1,-2.6 c0,-1 .8,-1.6 1.8,-1.6 H17 a4,4 0 0 0 4,-4 C21,6.5 17,3 12,3 Z"/>`) + `<g fill="${col}"><circle cx="7.5" cy="11" r="1.4"/><circle cx="10" cy="7" r="1.4"/><circle cx="15" cy="7" r="1.4"/></g>`;
      case 'cib': return g(`<path d="M6,3 V9 a2.5,2.5 0 0 0 5,0 V3 M8.5,3 V21 M17,3 c-2.5,2 -2.5,8 0,10 V21"/>`);
      case 'sci': return g(`<ellipse cx="12" cy="12" rx="9.5" ry="3.6"/><ellipse cx="12" cy="12" rx="9.5" ry="3.6" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9.5" ry="3.6" transform="rotate(-60 12 12)"/>`) + `<circle cx="12" cy="12" r="1.8" fill="${col}"/>`;
      case 'spo': return g(`<path d="M12,2.8 L14.7,8.6 L21,9.3 L16.3,13.6 L17.6,20 L12,16.8 L6.4,20 L7.7,13.6 L3,9.3 L9.3,8.6 Z"/>`);
      case 'scudo': return g(`<path d="M12,3 L20,6 V11 C20,16 16.5,19.5 12,21 C7.5,19.5 4,16 4,11 V6 Z M8.5,12 L11,14.5 L15.5,9.5"/>`);
      case 'resurrezione': return g(`<path d="M9,18 H15 M10,21 H14 M12,3 a6,6 0 0 1 3.5,10.9 C14.7,14.6 14.5,15.5 14.5,16 H9.5 C9.5,15.5 9.3,14.6 8.5,13.9 A6,6 0 0 1 12,3 Z"/>`);
      case 'doppio': return g(`<rect x="2.5" y="7" width="10" height="10" rx="2"/><rect x="11.5" y="4" width="10" height="10" rx="2" transform="rotate(12 16.5 9)"/>`) + `<g fill="${col}"><circle cx="5.5" cy="10" r="1"/><circle cx="9.5" cy="14" r="1"/><circle cx="16.5" cy="9" r="1"/></g>`;
      case 'difficile': return g(`<rect x="4" y="8" width="16" height="12" rx="2"/><path d="M9,8 V5 a1,1 0 0 1 1,-1 H14 a1,1 0 0 1 1,1 V8 M12,12 V15"/>`);
      case 'scambio': return g(`<path d="M4,8 H18 L15,5 M20,16 H6 L9,19"/>`);
      case '5050': return g(`<circle cx="12" cy="12" r="9.5"/><path d="M12,2.5 V21.5"/>`) + `<text x="7" y="15" text-anchor="middle" style="font:700 6.5px sans-serif;fill:${col}">50</text><text x="17" y="15" text-anchor="middle" style="font:700 6.5px sans-serif;fill:${col}">50</text>`;
      case 'cambio': return g(`<path d="M5,9 a7.5,7.5 0 0 1 13.5,-2.5 M18.5,3 V6.5 H15 M19,15 a7.5,7.5 0 0 1 -13.5,2.5 M5.5,21 V17.5 H9"/>`);
      default: return '';
    }
  }
  const iconaSvg = (c, col, sw) => `<svg viewBox="0 0 24 24">${icona(c, col, sw)}</svg>`;
  function timbroSvg(c, i) {
    const col = CAT[c].col, rot = [-9, 6, -4, 10, -12, 3][i % 6];
    return `<svg viewBox="0 0 60 60" style="--rot:${rot}deg"><g transform="rotate(${rot} 30 30)"><circle cx="30" cy="30" r="27" fill="none" stroke="${col}" stroke-width="3"/><circle cx="30" cy="30" r="21.5" fill="none" stroke="${col}" stroke-width="1.4" stroke-dasharray="3 2"/><g transform="translate(18 18)">${icona(c, col, 2.2)}</g></g></svg>`;
  }

  // ---------- Audio ----------
  let ctx = null, audioOn = true, musicaOn = true;
  try { audioOn = localStorage.getItem('passaporto-audio') !== '0'; musicaOn = localStorage.getItem('passaporto-musica') !== '0'; } catch (e) { }

  // Musica di sottofondo: il gioco usa il primo di questi file che trova nella cartella audio
  const MUSICA = ['audio/musica.ogg', 'audio/musica.mp3', 'audio/musica.m4a', 'audio/musica.wav'];   // musica.ogg è la versione leggera (Opus 32 kbps); l'originale è in originali/
  const VOL_MUSICA = .32;
  const musica = new Audio();
  let iMusica = 0, musicaPronta = false, musicaVoluta = false, volObiettivo = VOL_MUSICA, sfumatura = null;
  musica.loop = true; musica.preload = 'auto'; musica.volume = 0;
  musica.addEventListener('error', () => { if (++iMusica < MUSICA.length) musica.src = MUSICA[iMusica]; });
  musica.addEventListener('canplay', () => { if (!musicaPronta) { musicaPronta = true; if (musicaVoluta) avviaMusica(); } });
  musica.src = MUSICA[0];
  function sfuma(target, ms = 1200, poi) {
    clearInterval(sfumatura);
    const da = musica.volume, t0 = performance.now();
    sfumatura = setInterval(() => {
      const k = Math.min(1, (performance.now() - t0) / ms);
      musica.volume = Math.max(0, Math.min(1, da + (target - da) * k));
      if (k >= 1) { clearInterval(sfumatura); if (poi) poi(); }
    }, 40);
  }
  function avviaMusica() {
    musicaVoluta = true;
    if (!musicaOn || !musicaPronta) return;
    if (musica.paused) musica.play().then(() => sfuma(volObiettivo, 2000)).catch(() => {
      // il browser blocca l'audio finché non c'è un clic o un tasto: lo segnaliamo nella schermata iniziale
      const h = document.getElementById('avvio-musica'); if (h) h.hidden = false;
    });
    else sfuma(volObiettivo, 600);
  }
  musica.addEventListener('playing', () => { const h = document.getElementById('avvio-musica'); if (h) h.hidden = true; });
  function fermaMusica(ms = 1500) { sfuma(0, ms, () => musica.pause()); }
  // durante le domande la musica si abbassa, così vi concentrate
  function abbassaMusica(si) { volObiettivo = si ? VOL_MUSICA * .4 : VOL_MUSICA; if (!musica.paused) sfuma(volObiettivo, 500); }
  // i browser fanno partire l'audio solo dopo un clic o un tasto: al primo gesto riproviamo
  ['keydown', 'pointerdown'].forEach(ev => addEventListener(ev, () => { if (musicaVoluta && musica.paused) avviaMusica(); }));

  // Effetti registrati: se un file manca si usa il suono sintetico di riserva
  const EFFETTI = window.EFFETTI || {};
  const effettiPronti = new Set();
  Object.values(EFFETTI).flat().forEach(src => {
    const a = new Audio(); a.preload = 'auto';
    a.addEventListener('canplaythrough', () => effettiPronti.add(src), { once: true });
    a.src = src;
  });
  // maxMs: dopo questo tempo il suono sfuma e si ferma (per i suoni lunghi del pubblico)
  // entrataMs: il suono parte dal silenzio e sale in questo tempo, così non parte mai di scatto
  function effetto(nome, vol = 1, maxMs = 0, entrataMs = 0, rate = 1) {
    if (!audioOn) return true;
    const pronti = (EFFETTI[nome] || []).filter(s => effettiPronti.has(s));
    if (!pronti.length) return false;
    const a = new Audio(casuale(pronti)); a.volume = entrataMs ? 0 : vol;
    if (rate !== 1) { a.preservesPitch = false; a.playbackRate = rate; }
    a.play().catch(() => { });
    if (entrataMs) {
      const t0 = performance.now();
      const id = setInterval(() => { const k = Math.min(1, (performance.now() - t0) / entrataMs); a.volume = vol * k; if (k >= 1) clearInterval(id); }, 25);
    }
    if (maxMs) {
      setTimeout(() => {
        const t0 = performance.now(), v0 = a.volume;
        const id = setInterval(() => {
          const k = Math.min(1, (performance.now() - t0) / 600);
          a.volume = v0 * (1 - k);
          if (k >= 1) { clearInterval(id); a.pause(); }
        }, 30);
      }, maxMs);
    }
    return true;
  }
  function tono(f, dur = .12, tipo = 'sine', vol = .12, quando = 0, slide = 0) {
    if (!audioOn) return;
    try {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      const t = ctx.currentTime + quando, o = ctx.createOscillator(), g = ctx.createGain();
      o.type = tipo; o.frequency.setValueAtTime(f, t); if (slide) o.frequency.exponentialRampToValueAtTime(slide, t + dur);
      g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(.0001, t + dur);
      o.connect(g).connect(ctx.destination); o.start(t); o.stop(t + dur + .02);
    } catch (e) { }
  }
  // gracchio da walkie-talkie: rumore filtrato come quello di una radio, con il "bip" di fine trasmissione
  function rumoreRadio(dur, vol) {
    if (!audioOn) return;
    try {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      if (ctx.state === 'suspended') ctx.resume();
      const n = ctx.createBuffer(1, Math.round(ctx.sampleRate * dur), ctx.sampleRate), d = n.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (Math.random() < .03 ? 1.6 : 1);
      const src = ctx.createBufferSource(); src.buffer = n;
      const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 1900; bp.Q.value = .9;
      const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 500;
      const g = ctx.createGain(), t = ctx.currentTime;
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + .006);
      g.gain.setValueAtTime(vol * .85, t + dur * .6); g.gain.exponentialRampToValueAtTime(.001, t + dur);
      src.connect(bp).connect(hp).connect(g).connect(ctx.destination); src.start(t);
    } catch (e) { }
  }

  // ogni suono prova prima il file registrato, poi ripiega sul sintetico
  const suono = {
    radio: () => { rumoreRadio(.26, .32); tono(1250, .045, 'square', .03, .02); },
    radioFine: () => { tono(1450, .07, 'square', .035); rumoreRadio(.14, .26); },
    tick: () => effetto('tick', .5) || tono(900, .04, 'square', .04),
    dadoAgita: () => effetto('dadoAgita', .9) || null,
    dadoLancia: () => effetto('dadoLancia', .9) || tono(700, .05, 'square', .05),
    passo: () => effetto('passo', .7) || tono(520, .06, 'triangle', .08),
    luce: () => effetto('luce', .35) || tono(1200 + Math.random() * 800, .05, 'sine', .04),
    // ogni giocatore ha il suo suono; il tono sale di un tono intero a ogni coppia di mete (i = 0..9)
    accendi: (i, g) => {
      const semi = Math.floor(i / 2) * 2, r = Math.pow(2, semi / 12);
      return effetto(g === 0 ? 'accendiAle' : 'accendiCla', .6, 0, 0, r) || (tono(440 * r * (g === 0 ? 1 : 1.5), .35, 'triangle', .1), tono(880 * r * (g === 0 ? 1 : 1.5), .3, 'sine', .04, .02));
    },
    ok: () => effetto('ok', .85, 2000, 300) || (tono(660, .12, 'triangle', .12), tono(880, .12, 'triangle', .12, .1), tono(1320, .25, 'triangle', .1, .2)),
    ko: () => effetto('ko', .9, 2400) || tono(220, .3, 'sawtooth', .06, 0, 140),
    timbro: () => effetto('timbro', 1) || (tono(90, .25, 'sine', .35, 0, 40), tono(1600, .03, 'square', .05)),
    // la lampadina sfarfalla con scintille elettriche e poi l'interruttore fa clic
    spegni: () => {
      if (effetto('scintilla', .7)) {
        [140, 320, 470, 640].forEach(t => setTimeout(() => effetto('scintilla', .5 + Math.random() * .3), t));
        setTimeout(() => effetto('interruttore', .9), 900);
        return;
      }
      for (let i = 0; i < 6; i++) tono(120 + Math.random() * 60, .05, 'sawtooth', .05, i * .12);
      tono(400, .5, 'sine', .08, .75, 60);
    },
    carta: () => effetto('carta', .9) || (tono(300, .08, 'triangle', .08), tono(600, .15, 'triangle', .08, .08)),
    fanfara: () => effetto('fanfara', .9) || [523, 659, 784, 1047, 784, 1047].forEach((f, i) => tono(f, i === 5 ? .7 : .18, 'triangle', .12, i * .16)),
    urgente: () => effetto('urgente', .6) || tono(1000, .05, 'square', .05),
  };

  // ---------- Tastiera ----------
  let tasti = {};
  const setTasti = m => { tasti = m || {}; };
  document.addEventListener('keydown', e => {
    if (e.repeat) return;
    const inInput = e.target && (e.target.tagName === 'INPUT');
    let k = e.key; if (k.length === 1) k = k.toLowerCase();
    if (inInput) return;
    if (k === 'f') { schermoIntero(); return; }
    if (k === 'a') { alternaMusica(); return; }
    if (k === 'c') { alternaComandante(); return; }
    if (k === 'r' && $('#ov-regole').hidden) { apriRegole(); return; }
    if (k === 'm' && S && S.fase === 'board' && liberoPerMappa()) { vediMappa(); return; }
    const fn = tasti[k] || (k === 'enter' ? tasti[' '] : null) || (k === 'Enter' ? tasti[' '] : null);
    if (fn) { e.preventDefault(); fn(); }
  });
  function schermoIntero() {
    try { if (!document.fullscreenElement) document.documentElement.requestFullscreen(); else document.exitFullscreen(); } catch (e) { }
  }

  // ---------- Comandante Turbolenza (narratore) ----------
  const BATTUTE = window.BATTUTE || {};
  let comandanteOn = true, timerAttesa = null;
  try { comandanteOn = localStorage.getItem('passaporto-comandante') !== '0'; } catch (e) { }
  const narrCoda = [];
  let narrAttivo = false, narrChiudi = null;
  // Memoria delle battute, per avere tanta varietà:
  // - nella partita il Comandante sceglie sempre tra le battute non ancora dette (l'elenco è salvato con la partita);
  // - se per un momento le ha già dette tutte, ripete quella detta più tempo fa;
  // - nelle partite successive preferisce le battute mai sentite.
  const CHIAVE_SENTITE = 'passaporto-battute-sentite';
  let sentite = [];
  try { sentite = JSON.parse(localStorage.getItem(CHIAVE_SENTITE)) || []; } catch (e) { }
  function scegliBattuta(evento, chi) {
    const ev = BATTUTE[evento] || {};
    const pool = [...(ev[chi] || []), ...(ev.tutti || [])];
    if (!pool.length) return null;
    const usate = S ? (S.battuteUsate = S.battuteUsate || []) : [];
    const libere = pool.filter(t => !usate.includes(t));
    let t;
    if (libere.length) {
      const maiSentite = libere.filter(t => !sentite.includes(t));
      t = casuale(maiSentite.length ? maiSentite : libere);
    } else {
      t = pool.reduce((a, b) => (usate.indexOf(a) <= usate.indexOf(b) ? a : b));   // la più vecchia
      usate.splice(usate.indexOf(t), 1);
    }
    usate.push(t);
    if (!sentite.includes(t)) {
      sentite.push(t);
      try { localStorage.setItem(CHIAVE_SENTITE, JSON.stringify(sentite)); } catch (e) { }
    }
    return t;
  }
  // prob: probabilità che il Comandante intervenga (1 = sempre), così non parla a ogni mossa
  // sceglie una battuta e riempie i segnaposto; null se il Comandante è zitto o non ha battute
  function testoBattuta(evento, dati = {}) {
    if (!comandanteOn) return null;
    const g = dati.g ?? (S ? S.turno : 0);
    const testo = scegliBattuta(evento, g === 0 ? 'ale' : 'cla');
    if (!testo) return null;
    return testo.replace(/\{nome\}/g, NOMI[g]).replace(/\{altro\}/g, NOMI[avv(g)])
      .replace(/\{meta\}/g, dati.meta || '').replace(/\{n\}/g, dati.n ?? '')
      .replace(/\{metaA\}/g, dati.metaA || '').replace(/\{metaB\}/g, dati.metaB || '');
  }
  function narra(evento, dati = {}, prob = 1) {
    if (!comandanteOn || Math.random() > prob) return;
    const t = testoBattuta(evento, dati);
    if (!t) return;
    if (narrCoda.length >= 2) narrCoda.shift();
    narrCoda.push(t);
    if (!narrAttivo) prossimoAnnuncio();
  }
  async function prossimoAnnuncio() {
    const t = narrCoda.shift();
    if (!t) { narrAttivo = false; return; }
    narrAttivo = true;
    const box = $('#narratore'), av = $('#narr-av'), tx = $('#narr-testo');
    let chiuso = false;
    narrChiudi = () => { chiuso = true; };
    box.onclick = narrChiudi;
    tx.textContent = '';
    av.innerHTML = window.Ritratti.comandante('neutro');
    box.classList.remove('esce'); box.hidden = false;
    suono.radio();
    await sleep(320);
    // il testo compare come se lo stesse dicendo, e intanto muove la bocca
    av.classList.add('parla');
    let aperta = false;
    const bocca = setInterval(() => { aperta = !aperta; av.innerHTML = window.Ritratti.comandante(aperta ? 'parla' : 'neutro'); }, 150);
    for (let i = 1; i <= t.length && !chiuso; i++) { tx.textContent = t.slice(0, i); await sleep(24); }
    tx.textContent = t;
    clearInterval(bocca); av.classList.remove('parla'); av.innerHTML = window.Ritratti.comandante('neutro');
    // resta il tempo di leggerla con calma (clic sul fumetto per chiuderlo prima)
    const fineLettura = performance.now() + Math.min(8000, 2200 + t.length * 38);
    while (!chiuso && performance.now() < fineLettura) await sleep(100);
    suono.radioFine();
    box.classList.add('esce');
    await sleep(350);
    box.hidden = true; box.classList.remove('esce');
    prossimoAnnuncio();
  }
  function commentaRisposta(g, cat, ok, tempoScaduto, opt) {
    if (opt.silenzioso) return;
    const G = S.giocatori[g];
    if (tempoScaduto) return narra('tempoScaduto', { g });
    // domande sulla mappa: commenti sull'orientamento
    if (opt.tipo === 'mappa' && opt.km != null) {
      if (ok && opt.km <= 40) return narra('mappaPrecisa', { g, n: opt.km });
      if (!ok) return narra(g === 0 ? 'mappaAle' : 'mappaLontano', { g, n: opt.km }, .85);
    }
    if (ok) {
      if ((G.serie || 0) >= 3) return narra('serieGiuste', { g, n: G.serie });
      if (!opt.zittoSeGiusta) narra('giusta', { g }, .35);
    } else {
      if ((G.serie || 0) <= -2) return narra('serieSbagliate', { g, n: -G.serie });
      if (g === 0 && cat === 'geo') return narra('geografiaAle', { g }, .8);
      narra('sbagliata', { g }, .45);
    }
  }
  function alternaComandante() {
    comandanteOn = !comandanteOn;
    try { localStorage.setItem('passaporto-comandante', comandanteOn ? '1' : '0'); } catch (e) { }
    if (!comandanteOn) { narrCoda.length = 0; if (narrChiudi) narrChiudi(); }
    else if (S && S.fase !== 'setup') narra('inizio');
  }

  // ---------- Stato ----------
  let S = null;
  let attesa = null; // 'tira' | 'direzione' | null
  const salva = () => { try { localStorage.setItem(SALVA_PARTITA, JSON.stringify(S)); } catch (e) { } };
  const avv = g => 1 - g;
  const vive = g => S.giocatori[g].mete.map((m, i) => ({ m, i })).filter(x => x.m.viva);
  // indice della stessa città nella lista dell'avversario (meta in comune), oppure -1
  const gemella = (g, m) => S.giocatori[avv(g)].mete.findIndex(x => x.n === m.n);

  function mostra(id) {
    $$('.schermo').forEach(s => { s.hidden = s.id !== id; });
  }

  // ---------- Preparazione ----------
  // Ritratti disegnati su misura (js/ritratti.js)
  const AV_VERSIONE = 4;
  const AV_DEFAULT = [{ ritratto: 'alessandro' }, { ritratto: 'claudia' }];
  // le mete di Alessandro sono quelle vere (scelte il 10/11/2026), quelle di Claudia sono solo un esempio
  const METE_ESEMPIO = [['Praga', 'Siviglia', 'Malta', 'Vienna', 'Barcellona'], ['Parigi', 'Amsterdam', 'Budapest', 'Dubrovnik', 'Lisbona']];
  let setup = null;
  function caricaSetup() {
    try {
      const s = JSON.parse(localStorage.getItem(SALVA_SETUP));
      if (s && s.avatar && s.mete) {
        if (s.esempio) s.mete = METE_ESEMPIO.map(m => m.slice());   // mete di esempio salvate da una versione vecchia
        if (s.avatarV !== AV_VERSIONE) { s.avatar = AV_DEFAULT.map(a => ({ ...a })); s.avatarV = AV_VERSIONE; }
        return s;
      }
    } catch (e) { }
    return { avatar: AV_DEFAULT.map(a => ({ ...a })), avatarV: AV_VERSIONE, mete: METE_ESEMPIO.map(m => m.slice()), esempio: true };
  }
  // "Malta" come meta: l'isola intera, sulla mappa sta dove c'è La Valletta (non usata nelle domande sulla mappa)
  if (!MAPPA.luoghi.some(l => l.n === 'Malta')) { const v = MAPPA.luoghi.find(l => l.n === 'La Valletta'); if (v) MAPPA.luoghi.push({ ...v, n: 'Malta', p: 'Malta', alias: true }); }
  const trovaLuogo = n => MAPPA.luoghi.find(l => l.n.toLowerCase() === String(n).trim().toLowerCase());

  // ---------- Schermata iniziale: la musica parte da qui ----------
  function schermoStart() {
    mostra('s-start');
    [0, 1].forEach(g => { $('#start-av-' + g).innerHTML = AV.render(AV_DEFAULT[g], 'felice'); });
    avviaMusica();
    const vai = () => { setTasti({}); schermoSetup(); };
    $('#btn-avvia').onclick = vai;
    setTasti({ ' ': vai });
  }

  function schermoSetup() {
    avviaMusica();
    setup = caricaSetup();
    mostra('s-setup');
    $('#setup-griglia').innerHTML = [0, 1].map(g => `
      <div class="scheda-gioc" data-g="${g}">
        <h2>${NOMI[g]}</h2>
        <div class="editor-avatar"><div class="anteprima" id="anteprima-${g}"></div></div>
        <div class="mete-input">
          <label>Le 5 mete di ${NOMI[g]}</label>
          ${[0, 1, 2, 3, 4].map(i => `<div class="campo-meta"><input id="meta-${g}-${i}" autocomplete="off" spellcheck="false" placeholder="Scrivi una città o un'isola" value="${esc(setup.mete[g][i] || '')}"><button type="button" class="caret" tabindex="-1" aria-label="Apri l'elenco dei luoghi">▾</button></div>`).join('')}
          ${setup.esempio ? '<p class="nota-esempio">Le mete di Claudia sono solo un esempio: sostituitele con le sue. Scrivete e scegliete dall\'elenco.</p>' : ''}
        </div>
      </div>`).join('');
    [0, 1].forEach(disegnaEditor);
    $$('.campo-meta').forEach(collegaTendina);
    let salvata = null; try { salvata = JSON.parse(localStorage.getItem(SALVA_PARTITA)); } catch (e) { }
    $('#btn-riprendi').hidden = !(salvata && ['board', 'finale'].includes(salvata.fase));
    $('#setup-msg').textContent = '';
    setTasti({});
  }
  // Tendina dei luoghi (sostituisce il datalist del browser, che filtrava sul testo già scritto)
  const norm = s => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
  const tendina = document.createElement('div');
  tendina.className = 'tendina'; tendina.hidden = true; tendina.setAttribute('role', 'listbox');
  document.body.appendChild(tendina);
  let tInput = null, tVoci = [], tAttiva = -1;
  function apriTendina(input, tutto) {
    tInput = input;
    const q = norm(input.value);
    const lista = (tutto || !q || trovaLuogo(input.value)) ? MAPPA.luoghi : MAPPA.luoghi.filter(l => norm(l.n).includes(q) || norm(l.p).includes(q));
    const paesi = [...new Set(lista.map(l => l.p))].sort((a, b) => a.localeCompare(b, 'it'));
    tVoci = [];
    let h = '';
    for (const p of paesi) {
      h += `<div class="gruppo">${esc(p)}</div>`;
      for (const l of lista.filter(x => x.p === p).sort((a, b) => a.n.localeCompare(b.n, 'it'))) { h += `<div class="opz" role="option" data-i="${tVoci.length}">${esc(l.n)}</div>`; tVoci.push(l); }
    }
    tendina.innerHTML = h || '<div class="vuota">Nessun luogo trovato. Scrivimi quale manca e lo aggiungo.</div>';
    const r = input.getBoundingClientRect(), sotto = innerHeight - r.bottom;
    tendina.style.left = r.left + 'px'; tendina.style.width = r.width + 'px';
    if (sotto < 260 && r.top > sotto) { tendina.style.top = ''; tendina.style.bottom = (innerHeight - r.top + 4) + 'px'; }
    else { tendina.style.bottom = ''; tendina.style.top = (r.bottom + 4) + 'px'; }
    tendina.hidden = false;
    const sel = tVoci.findIndex(l => l.n === input.value);
    evidenzia(sel >= 0 ? sel : (q && !trovaLuogo(input.value) ? 0 : -1));
  }
  function evidenzia(i) {
    tAttiva = i;
    $$('.opz', tendina).forEach((o, j) => o.classList.toggle('attiva', j === i));
    const o = $(`.opz[data-i="${i}"]`, tendina); if (o) o.scrollIntoView({ block: 'nearest' });
  }
  function chiudiTendina() { tendina.hidden = true; tInput = null; }
  function scegli(i) {
    if (!tInput || !tVoci[i]) return;
    tInput.value = tVoci[i].n; tInput.classList.remove('errore');
    chiudiTendina(); salvaSetup();
  }
  tendina.addEventListener('mousedown', e => { e.preventDefault(); const o = e.target.closest('.opz'); if (o) scegli(+o.dataset.i); });
  function collegaTendina(campo) {
    const input = $('input', campo);
    $('.caret', campo).addEventListener('mousedown', e => {
      e.preventDefault();
      if (!tendina.hidden && tInput === input) return chiudiTendina();
      input.focus(); apriTendina(input, true);
    });
    input.addEventListener('input', () => apriTendina(input));
    input.addEventListener('blur', () => setTimeout(() => { if (tInput === input) chiudiTendina(); }, 120));
    input.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') { e.preventDefault(); if (tendina.hidden) apriTendina(input, true); else evidenzia(Math.min(tVoci.length - 1, tAttiva + 1)); }
      else if (e.key === 'ArrowUp' && !tendina.hidden) { e.preventDefault(); evidenzia(Math.max(0, tAttiva - 1)); }
      else if (e.key === 'Enter' && !tendina.hidden && tAttiva >= 0) { e.preventDefault(); scegli(tAttiva); }
      else if (e.key === 'Escape' && !tendina.hidden) { e.preventDefault(); chiudiTendina(); }
    });
  }
  $('#s-setup').addEventListener('scroll', chiudiTendina);
  addEventListener('resize', chiudiTendina);

  function disegnaEditor(g) {
    $('#anteprima-' + g).innerHTML = AV.render(AV_DEFAULT[g], 'felice');
  }
  function salvaSetup(conMete = true) {
    if (conMete) for (const g of [0, 1]) for (let i = 0; i < 5; i++) setup.mete[g][i] = $(`#meta-${g}-${i}`).value.trim();
    try { localStorage.setItem(SALVA_SETUP, JSON.stringify(setup)); } catch (e) { }
  }
  function validaSetup() {
    const errori = []; const viste = new Map();
    $$('.mete-input input').forEach(el => el.classList.remove('errore'));
    for (const g of [0, 1]) for (let i = 0; i < 5; i++) {
      const el = $(`#meta-${g}-${i}`), v = el.value.trim();
      const l = trovaLuogo(v);
      if (!l) { el.classList.add('errore'); errori.push(v ? `"${v}" non è nell'elenco dei luoghi` : `manca una meta di ${NOMI[g]}`); continue; }
      el.value = l.n;
      // la stessa città può stare nelle liste di tutti e due, ma non due volte nella stessa lista
      if (viste.has(g + '|' + l.n)) { el.classList.add('errore'); errori.push(`${l.n} è due volte nella lista di ${NOMI[g]}`); }
      viste.set(g + '|' + l.n, true);
    }
    return errori;
  }
  function avviaDaSetup() {
    const errori = validaSetup();
    if (errori.length) { $('#setup-msg').textContent = 'Da sistemare: ' + [...new Set(errori)].slice(0, 3).join(', ') + '.'; return; }
    setup.esempio = setup.esempio && METE_ESEMPIO.every((m, g) => m.every((n, i) => $(`#meta-${g}-${i}`).value === n));
    salvaSetup();
    S = {
      fase: 'intro', turno: 0, usate: [],
      giocatori: [0, 1].map(g => ({
        nome: NOMI[g], avatar: AV_DEFAULT[g], pos: 0, salta: false, carte: [],
        timbri: {}, mete: setup.mete[g].map(n => ({ ...trovaLuogo(n), viva: true })),
      })),
    };
    schermoIntro();
  }

  // ---------- Mappa ----------
  let uidMappa = 0;
  function disegnaMappa(el, opt = {}) {
    const u = 'm' + (++uidMappa), W = MAPPA.w, H = MAPPA.h, I = MAPPA.inset;
    let s = `<svg class="mappa-svg" viewBox="-8 -8 ${W + 16} ${H + 26}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="${u}-clip"><rect width="${W}" height="${H}" rx="28"/></clipPath>
        <pattern id="${u}-onde" width="56" height="26" patternUnits="userSpaceOnUse"><rect width="56" height="26" fill="#8FD3FF"/><path d="M4,14 q5,-6 10,0 q5,6 10,0" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="2" stroke-linecap="round"/><path d="M32,24 q4,-5 8,0" fill="none" stroke="#fff" stroke-opacity=".4" stroke-width="2" stroke-linecap="round"/><animateTransform attributeName="patternTransform" type="translate" values="0 0;56 0" dur="9s" repeatCount="indefinite"/></pattern>
        <radialGradient id="${u}-alone"><stop offset="0" stop-color="#FFE48A" stop-opacity="1"/><stop offset=".45" stop-color="#FFC531" stop-opacity=".55"/><stop offset="1" stop-color="#FFC531" stop-opacity="0"/></radialGradient>
        <filter id="${u}-ombra" x="-5%" y="-5%" width="110%" height="115%"><feOffset dx="0" dy="4"/><feComponentTransfer><feFuncA type="linear" slope=".35"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <rect y="10" width="${W}" height="${H}" rx="28" fill="${INK}"/>
      <g clip-path="url(#${u}-clip)">
      <rect width="${W}" height="${H}" fill="url(#${u}-onde)"/>
      <path class="reticolo" d="${MAPPA.graticule}"/>
      <g filter="url(#${u}-ombra)">${MAPPA.countries.map(c => `<path class="paese${c.eu ? ' ue' : ''}" d="${c.d}"/>`).join('')}</g>
      <g>${opt.senzaNomi ? "" : MAPPA.countries.filter(c => c.it).map(c => `<text class="nome-paese${c.eu ? ' ue' : ''}" x="${c.lx}" y="${c.ly}"${c.it.length < 8 && !['Italia', 'Francia', 'Spagna', 'Svezia', 'Polonia', 'Germania'].includes(c.it) ? ' style="font-size:11px"' : ''}>${c.it}</text>`).join('')}</g>
      <g>${MAPPA.seas.map(m => `<text class="nome-mare" x="${m.x}" y="${m.y}" transform="rotate(${m.r} ${m.x} ${m.y})">${m.t}</text>`).join('')}</g>
      <g transform="translate(${I.x},${I.y})">
        <rect x="2" y="6" width="${I.w}" height="${I.h}" rx="16" fill="#1E1B3A"/>
        <rect width="${I.w}" height="${I.h}" rx="16" fill="url(#${u}-onde)" stroke="#1E1B3A" stroke-width="3"/>
        <path class="reticolo" d="${I.graticule}"/>
        ${I.countries.map(c => `<path class="paese${c.eu ? ' ue' : ''}" d="${c.d}"/>`).join('')}
        <text class="nome-mare" x="${I.w / 2}" y="${I.h - 12}" style="font-size:14px">Azzorre, Madeira e Canarie</text>
      </g>
      ${rosaDeiVenti(78, 840, 46)}
      <g transform="translate(${W - 236},22) rotate(3 110 34)"><g class="cartiglio">
        <rect x="0" y="7" width="220" height="64" rx="16" fill="#1E1B3A"/>
        <rect width="220" height="64" rx="16" fill="#FFC531" stroke="#1E1B3A" stroke-width="3.5"/>
        <text x="110" y="44" text-anchor="middle" style="font-family:var(--f-display);font-size:38px;fill:#1E1B3A">Europa</text>
      </g></g>`;
    if (opt.lucine) s += `<g class="lucine">${MAPPA.luoghi.map((l, i) => `<circle class="lucina" data-i="${i}" cx="${l.x}" cy="${l.y}" r="3.4"/>`).join('')}</g>`;
    // mete
    const mete = [];
    if (!opt.senzaMete) S.giocatori.forEach((G, g) => G.mete.forEach((m, i) => mete.push({ g, i, m })));
    const occupati = [];
    const sovrappone = r => occupati.some(o => r.x < o.x + o.w && r.x + r.w > o.x && r.y < o.y + o.h && r.y + r.h > o.y);
    mete.forEach(({ m }) => occupati.push({ x: m.x - 12, y: m.y - 12, w: 24, h: 24 }));
    // mete in comune: un solo punto, metà con il colore di Alessandro e metà con quello di Claudia.
    // Ogni copia resta un gruppo a sé (si spegne da sola), l'etichetta unica sta in un gruppo a parte.
    const comuni = [];
    const gemellaK = ({ g, m }) => { const j = opt.senzaMete ? -1 : gemella(g, m); return j < 0 ? null : `${avv(g)}-${j}`; };
    let gm = `<defs><clipPath id="${u}-sx"><rect x="-40" y="-40" width="40" height="80"/></clipPath><clipPath id="${u}-dx"><rect x="0" y="-40" width="40" height="80"/></clipPath></defs><g class="mete">`;
    const etichetta = (m, tw, th, pos, linguetta) => `<g class="etichetta" transform="translate(${pos[0]},${pos[1]})"><rect x="1.5" y="4" width="${tw}" height="${th}" rx="9" fill="#1E1B3A" stroke="none"/><rect width="${tw}" height="${th}" rx="9"/>${linguetta}<text x="${tw / 2 + 4}" y="20.5" text-anchor="middle">${esc(m.n)}</text></g>`;
    for (const { g, i, m } of mete) {
      const gk = gemellaK({ g, m });
      if (gk) {
        const lato = g === 0 ? 'sx' : 'dx';
        let et = '';
        if (g === 0) {
          const tw = m.n.length * 8.6 + 30, th = 28;
          const cand = [[16, -13], [-16 - tw, -13], [-tw / 2, -44], [-tw / 2, 18], [14, -36], [14, 10], [-14 - tw, -36], [-14 - tw, 10]];
          const pos = cand.find(([dx, dy]) => { const r = { x: m.x + dx, y: m.y + dy, w: tw, h: th }; return r.x > 4 && r.x + r.w < W - 4 && r.y > 4 && r.y + r.h < H - 4 && !sovrappone(r); }) || cand[m.x > W - 200 ? 1 : 0];
          occupati.push({ x: m.x + pos[0], y: m.y + pos[1], w: tw, h: th });
          const lin = `<rect class="linguetta" x="2" y="2" width="8" height="${(th - 4) / 2}" rx="3" style="fill:${COL[0]}"/><rect class="linguetta" x="2" y="${th / 2}" width="8" height="${(th - 4) / 2}" rx="3" style="fill:${COL[1]}"/>`;
          comuni.push(`<g class="meta-luce etichetta-comune" data-a="${g}-${i}" data-b="${gk}" transform="translate(${m.x},${m.y})">${etichetta(m, tw, th, pos, lin)}</g>`);
        }
        gm += `<g class="meta-luce comune" data-k="${g}-${i}" transform="translate(${m.x},${m.y})">
          <circle class="alone" r="34" fill="url(#${u}-alone)"/>
          <g class="raggi" stroke="#1E1B3A" stroke-width="2.6" stroke-linecap="round">${[0, 45, 90, 135, 180, 225, 270, 315].map(a => `<line x1="0" y1="-15" x2="0" y2="-21" transform="rotate(${a})"/>`).join('')}</g>
          <g clip-path="url(#${u}-${lato})">
            <circle class="anello" r="12" stroke="${COL[g]}"/>
            <circle class="nucleo" r="7.5"/>
            <path class="croce" d="M-9,-9 L9,9 M9,-9 L-9,9"/>
          </g>
          ${g === 1 ? '<line x1="0" y1="-7.5" x2="0" y2="7.5" stroke="#1E1B3A" stroke-width="2"/>' : ''}
          <circle r="22" fill="transparent"/>
        </g>`;
        continue;
      }
      const tw = m.n.length * 8.6 + 30, th = 28;
      const cand = [[16, -13], [-16 - tw, -13], [-tw / 2, -44], [-tw / 2, 18], [14, -36], [14, 10], [-14 - tw, -36], [-14 - tw, 10]];
      let pos = cand.find(([dx, dy]) => { const r = { x: m.x + dx, y: m.y + dy, w: tw, h: th }; return r.x > 4 && r.x + r.w < W - 4 && r.y > 4 && r.y + r.h < H - 4 && !sovrappone(r); }) || cand[m.x > W - 200 ? 1 : 0];
      occupati.push({ x: m.x + pos[0], y: m.y + pos[1], w: tw, h: th });
      gm += `<g class="meta-luce" data-k="${g}-${i}" transform="translate(${m.x},${m.y})">
        <circle class="alone" r="34" fill="url(#${u}-alone)"/>
        <g class="raggi" stroke="#1E1B3A" stroke-width="2.6" stroke-linecap="round">${[0, 45, 90, 135, 180, 225, 270, 315].map(a => `<line x1="0" y1="-15" x2="0" y2="-21" transform="rotate(${a})"/>`).join('')}</g>
        <circle class="anello" r="12" stroke="${COL[g]}"/>
        <circle class="nucleo" r="7.5"/>
        <path class="croce" d="M-9,-9 L9,9 M9,-9 L-9,9"/>
        <g class="etichetta" transform="translate(${pos[0]},${pos[1]})"><rect x="1.5" y="4" width="${tw}" height="${th}" rx="9" fill="#1E1B3A" stroke="none"/><rect width="${tw}" height="${th}" rx="9"/><rect class="linguetta" x="2" y="2" width="8" height="${th - 4}" rx="4" fill="${COL[g]}"/><text x="${tw / 2 + 4}" y="20.5" text-anchor="middle">${esc(m.n)}</text></g>
        <circle r="22" fill="transparent"/>
      </g>`;
    }
    gm += comuni.join('') + '</g>';
    s += gm + `</g><rect width="${W}" height="${H}" rx="28" fill="none" stroke="${INK}" stroke-width="6"/></svg>`;
    el.innerHTML = s;
    const svg = el.querySelector('svg');
    const els = {}; $$('.meta-luce[data-k]', svg).forEach(n => { els[n.dataset.k] = n; });
    // l'etichetta unica di una meta in comune segue lo stato delle due copie
    $$('.etichetta-comune', svg).forEach(et => {
      const a = els[et.dataset.a], b = els[et.dataset.b];
      const sync = () => {
        const ha = c => a.classList.contains(c) || b.classList.contains(c);
        const accesa = ha('accesa');
        et.classList.toggle('accesa', accesa);
        et.classList.toggle('spenta', !accesa && ha('spenta'));
        et.classList.toggle('puntata', ha('puntata'));
        et.classList.toggle('vincitrice', ha('vincitrice'));
        et.classList.toggle('attenuata', a.classList.contains('attenuata') && b.classList.contains('attenuata'));
        const op = [a, b].map(n => n.style.opacity === '' ? 1 : +n.style.opacity);
        et.style.transition = a.style.transition || b.style.transition; et.style.opacity = Math.max(...op);
      };
      sync();
      const mo = new MutationObserver(sync);
      [a, b].forEach(n => mo.observe(n, { attributes: true, attributeFilter: ['class', 'style'] }));
    });
    return { svg, els, lucine: $$('.lucina', svg) };
  }
  function rosaDeiVenti(cx, cy, r) {
    let p = '';
    for (let k = 0; k < 8; k++) {
      const a = k * 45, lungo = k % 2 === 0, R = lungo ? r : r * .62, w = lungo ? r * .16 : r * .12;
      p += `<path d="M0,${-R} L${w},0 L${-w},0 Z" fill="${lungo ? '#FFC531' : '#fff'}" stroke="#1E1B3A" stroke-width="2" stroke-linejoin="round" transform="rotate(${a})"/>`;
    }
    return `<g transform="translate(${cx},${cy})"><g class="bussola"><circle r="${r * .62}" fill="#fff" stroke="#1E1B3A" stroke-width="2.5"/>${p}<circle r="5" fill="#1E1B3A"/><text y="${-r - 6}" text-anchor="middle" style="font-family:var(--f-display);font-size:18px;fill:#1E1B3A">N</text></g></g>`;
  }
  function statoMete(map, opt = {}) {
    S.giocatori.forEach((G, g) => G.mete.forEach((m, i) => {
      const n = map.els[`${g}-${i}`]; if (!n) return;
      n.classList.toggle('accesa', m.viva);
      n.classList.toggle('spenta', !m.viva);
      n.classList.toggle('attenuata', !!(opt.attenua && opt.attenua(g, i, m)));
    }));
  }

  // ---------- Intro ----------
  async function schermoIntro() {
    S.fase = 'intro';
    avviaMusica();
    mostra('s-intro');
    $$('#s-intro .intro-lato').forEach(el => {
      const g = +el.dataset.g, G = S.giocatori[g];
      el.innerHTML = `<h3><span class="mini-av">${AV.render(G.avatar, 'felice')}</span>${G.nome}</h3>` +
        G.mete.map((m, i) => `<div class="voce-meta" data-k="${g}-${i}"><span>${esc(m.n)}</span><small>${esc(m.p)}</small></div>`).join('');
    });
    const map = disegnaMappa($('#intro-mappa'), { lucine: true });
    Object.values(map.els).forEach(n => { n.style.opacity = 0; });
    $('#btn-intro-avanti').hidden = true;
    $('#intro-stato').textContent = "Le luci d'Europa si accendono…";
    setTasti({});
    await sleep(700);
    // giro di luci casuali
    let ritardo = 55; const t0 = performance.now();
    while (performance.now() - t0 < 5200) {
      map.lucine.forEach(c => c.classList.remove('on'));
      const n = 6 + Math.floor(Math.random() * 10);
      for (let k = 0; k < n; k++) casuale(map.lucine).classList.add('on');
      suono.luce();
      await sleep(ritardo);
      ritardo = Math.min(260, ritardo * 1.045);
    }
    map.lucine.forEach(c => c.classList.remove('on'));
    $('#intro-stato').textContent = 'Ecco le vostre mete';
    await sleep(600);
    const ordine = [];
    for (let i = 0; i < 5; i++) for (const g of [0, 1]) ordine.push([g, i]);
    let k = 0;
    for (const [g, i] of ordine) {
      const n = map.els[`${g}-${i}`];
      n.style.transition = 'opacity .3s'; n.style.opacity = 1; n.classList.add('accesa');
      $(`#s-intro .voce-meta[data-k="${g}-${i}"]`).classList.add('vista');
      suono.accendi(k++, g);
      await sleep(650);
    }
    const nComuni = S.giocatori[0].mete.filter(m => gemella(0, m) >= 0).length;
    $('#intro-stato').textContent = nComuni
      ? `${10 - nComuni} mete accese, ${nComuni === 1 ? 'una in comune' : nComuni + ' in comune'}. Una sola resterà.`
      : '10 mete accese. Una sola resterà.';
    $('#btn-intro-avanti').hidden = false;
    setTasti({ ' ': sorteggio });
  }

  async function sorteggio() {
    setTasti({});
    const p = $('#pannello-msg');
    p.innerHTML = `<h2>Chi parte per primo?</h2><div style="display:flex;gap:3em;justify-content:center">${[0, 1].map(g => `<div class="av-grande" data-g="${g}" style="--col:${COL[g]};transition:transform .1s,opacity .1s">${AV.render(S.giocatori[g].avatar, 'stupito')}</div>`).join('')}</div><p id="sorteggio-txt">&nbsp;</p>`;
    $('#ov-msg').hidden = false;
    const avs = $$('.av-grande', p);
    let r = 70, g = 0;
    const fine = Math.random() < .5 ? 0 : 1;
    for (let k = 0; k < 18 || g !== fine; k++) {
      g = k % 2;
      avs.forEach((a, j) => { a.style.opacity = j === g ? 1 : .3; a.style.transform = j === g ? 'scale(1.08)' : 'scale(.92)'; });
      suono.tick(); await sleep(r); r *= 1.12;
    }
    avs[g].innerHTML = AV.render(S.giocatori[g].avatar, 'felice');
    suono.ok();
    $('#sorteggio-txt').innerHTML = `Inizia <b style="color:${COL[g]}">${S.giocatori[g].nome}</b>. Si parte dalla casella VIA.`;
    p.insertAdjacentHTML('beforeend', `<button class="btn pieno" id="btn-sorteggio">Al tabellone <span class="kbd">Spazio</span></button>`);
    S.turno = g;
    const vai = () => { $('#ov-msg').hidden = true; S.fase = 'board'; schermoBoard(); iniziaTurno(); setTimeout(() => narra('inizio'), 700); };
    $('#btn-sorteggio').onclick = vai; setTasti({ ' ': vai });
  }

  // ---------- Tabellone ----------
  const N = 36;
  function casella(i) {
    const k = Math.floor(i / 6), j = i % 6;
    if (j === 0) return k === 0 ? { t: 'via' } : (k % 2 === 0 ? { t: 'duello' } : { t: 'imprevisto' });
    if (j === 3) return { t: 'dogana', c: CATS[(k + 3) % 6] };
    if (j === 5 && (k === 1 || k === 4)) return { t: 'volante' };   // Dogana volante: si ruba un timbro all'avversario
    return { t: 'cat', c: CATS[(k + j) % 6] };
  }
  const polar = (r, deg) => { const a = deg * Math.PI / 180; return [500 + r * Math.cos(a), 500 + r * Math.sin(a)]; };
  const angolo = i => -90 + i * (360 / N);
  function settore(r0, r1, a0, a1) {
    const [x0, y0] = polar(r1, a0), [x1, y1] = polar(r1, a1), [x2, y2] = polar(r0, a1), [x3, y3] = polar(r0, a0);
    return `M${x0.toFixed(1)},${y0.toFixed(1)} A${r1},${r1} 0 0 1 ${x1.toFixed(1)},${y1.toFixed(1)} L${x2.toFixed(1)},${y2.toFixed(1)} A${r0},${r0} 0 0 0 ${x3.toFixed(1)},${y3.toFixed(1)} Z`;
  }
  let pedine = [];
  function schermoBoard() {
    avviaMusica();
    mostra('s-board');
    const b = $('#board');
    // piatto del tabellone: un grande adesivo tondo con ombra piena
    let s = `<circle cx="500" cy="514" r="508" fill="${INK}"/>
      <circle cx="500" cy="500" r="508" fill="#FFF9EE" stroke="${INK}" stroke-width="6"/>
      <circle cx="500" cy="500" r="316" fill="#FFE9B8" stroke="${INK}" stroke-width="5"/>`;
    // raggi del centro: girano piano
    s += '<g class="raggi-centro">';
    for (let k = 0; k < 12; k++) { const [x, y] = polar(316, k * 30 + 15); s += `<line x1="500" y1="500" x2="${x}" y2="${y}" stroke="#FFD27A" stroke-width="22" stroke-linecap="round" opacity=".55"/>`; }
    s += '</g>';
    s += `<circle cx="500" cy="500" r="200" fill="#FFE9B8"/>`;
    // ogni casella ha l'icona che dondola e un luccichio che gira intorno all'anello come un'onda
    const ritardo = i => `style="animation-delay:${(-(N - i) * .11).toFixed(2)}s"`;
    for (let i = 0; i < N; i++) {
      const c = casella(i), m = angolo(i), grande = c.t !== 'cat';
      const r0 = grande ? 326 : 340, r1 = grande ? 496 : 478, d = settore(r0, r1, m - 4.6, m + 4.6);
      const [cx, cy] = polar(408, m);
      let fill, extra = '';
      if (c.t === 'cat') { fill = CAT[c.c].col; extra = `<g transform="translate(${cx - 19},${cy - 19}) scale(1.6)"><g class="ico" ${ritardo(i)}>${icona(c.c, INK, 2.4)}</g></g>`; }
      else if (c.t === 'dogana') {
        fill = CAT[c.c].col;
        extra = `<g class="timbro-dogana" ${ritardo(i)}><circle cx="${cx}" cy="${cy}" r="35" fill="#fff" stroke="${INK}" stroke-width="3.5"/><circle cx="${cx}" cy="${cy}" r="28" fill="none" stroke="${INK}" stroke-width="2" stroke-dasharray="5 4"/><g transform="translate(${cx - 17},${cy - 17}) scale(1.42)">${icona(c.c, INK, 2.4)}</g></g>`;
        const [tx, ty] = polar(468, m);
        extra += `<text x="${tx}" y="${ty + 6}" text-anchor="middle" style="font-family:var(--f-display);font-size:17px;fill:${INK}">Dogana</text>`;
      } else if (c.t === 'volante') {
        fill = '#8FD3FF';
        extra = `<g class="timbro-dogana" ${ritardo(i)}><circle cx="${cx}" cy="${cy}" r="35" fill="#FFC531" stroke="${INK}" stroke-width="3.5"/><circle cx="${cx}" cy="${cy}" r="28" fill="none" stroke="${INK}" stroke-width="2" stroke-dasharray="5 4"/><g transform="translate(${cx - 18},${cy - 18}) scale(1.5)"><path d="M4,8 H18 M14,4 L18,8 L14,12 M20,16 H6 M10,12 L6,16 L10,20" fill="none" stroke="${INK}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></g></g>`;
        const [tx, ty] = polar(468, m);
        extra += `<text x="${tx}" y="${ty + 6}" text-anchor="middle" style="font-family:var(--f-display);font-size:19px;fill:${INK}">Ruba!</text>`;
      } else if (c.t === 'imprevisto') { fill = '#fff'; extra = `<text class="ico-domanda" x="${cx}" y="${cy + 24}" text-anchor="middle" style="font-family:var(--f-display);font-size:70px;fill:${INK};animation-delay:${(-i * .37).toFixed(2)}s">?</text>`; }
      else if (c.t === 'duello') { fill = INK; extra = `<text class="ico-via" x="${cx}" y="${cy + 14}" text-anchor="middle" style="font-family:var(--f-display);font-size:40px;fill:#FFC531">VS</text>`; }
      else { fill = '#FFC531'; extra = `<text class="ico-via" x="${cx}" y="${cy + 13}" text-anchor="middle" style="font-family:var(--f-display);font-size:38px;fill:${INK}">Via</text>`; }
      s += `<g class="casella" data-i="${i}"><path class="forma" d="${d}" fill="${fill}"${c.t === 'dogana' || c.t === 'volante' ? ' style="stroke-width:5"' : ''}/><path class="luccichio" d="${d}" ${ritardo(i)}/>${extra}<path class="evidenzia" d="${d}"/></g>`;
    }
    s += `<g id="frecce"></g><g id="pedine"></g>`;
    b.innerHTML = s;
    pedine = [0, 1].map(g => {
      const G = S.giocatori[g];
      const el = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      el.setAttribute('class', 'pedina');
      // la pedina di chi è di turno saltella sul posto (animazione sul gruppo interno, la posizione resta sul gruppo esterno)
      el.innerHTML = `<g class="saltella"><circle r="44" cy="6" fill="${INK}"/><circle r="44" fill="${COL[g]}" stroke="${INK}" stroke-width="5"/><g transform="translate(-36,-36) scale(.36)">${AV.render(G.avatar, 'neutro').replace('<svg ', '<svg width="200" height="200" ')}</g><circle r="37" fill="none" stroke="${INK}" stroke-width="3"/></g>`;
      $('#pedine').appendChild(el);
      return el;
    });
    b.onclick = e => { const c = e.target.closest('.casella.bersaglio'); if (c && sceltaDir) sceltaDir(+c.dataset.i); };
    posizionaPedine(true);
    [0, 1].forEach(renderCarta);
    renderDadi([1]);
    $('#btn-tira').onclick = () => { if (attesa === 'tira') tira(1); };
  }
  function xyPedina(g, pos) {
    const altro = S.giocatori[avv(g)].pos === pos;
    const r = altro ? (g === 0 ? 372 : 440) : 406;
    return polar(r, angolo(pos));
  }
  function posizionaPedine(subito) {
    pedine.forEach((el, g) => {
      const [x, y] = xyPedina(g, S.giocatori[g].pos);
      if (subito) { el.style.transition = 'none'; requestAnimationFrame(() => { el.style.transition = ''; }); }
      el.style.transform = `translate(${x}px,${y}px)`;
      el.classList.toggle('attiva', g === S.turno);
    });
    $('#pedine').appendChild(pedine[S.turno]);
  }
  function renderCarta(g) {
    const G = S.giocatori[g], el = $(`.carta-gioc[data-g="${g}"]`);
    const nt = CATS.filter(c => G.timbri[c]).length, nv = G.mete.filter(m => m.viva).length;
    el.classList.toggle('attivo', S.turno === g && S.fase === 'board');
    el.innerHTML = `
      <div class="gioc-testa"><div class="av" id="av-${g}">${AV.render(G.avatar, G._mood || 'neutro')}</div><h2>${G.nome}</h2><span class="turno-tag">Tocca a te</span></div>
      <div class="passaporto"><p class="sez-titolo"><span>Timbri</span><span class="conta">${nt}/6</span></p>
        <div class="timbri">${CATS.map((c, i) => `<div class="slot-timbro${G.timbri[c] ? ' preso' : ''}" title="${CAT[c].n}" style="border-color:${CAT[c].col}">${G.timbri[c] ? timbroSvg(c, i) : `<svg viewBox="0 0 24 24" style="width:52%;height:52%;opacity:.5">${icona(c, CAT[c].col, 2.4)}</svg>`}</div>`).join('')}</div></div>
      <div><p class="sez-titolo"><span>Destinazioni</span><span class="conta">${nv}/5</span></p><div class="elenco-mete">${G.mete.map(m => `<div class="mini-meta${m.viva ? '' : ' out'}"><i></i>${esc(m.n)}${gemella(g, m) >= 0 ? '<span class="in-comune">in comune</span>' : ''}</div>`).join('')}</div></div>
      <div><p class="sez-titolo"><span>Carte in mano</span></p><div class="mano">${G.carte.length ? G.carte.map(c => `<span class="chip-carta">${CARTE[c].titolo}</span>`).join('') : '<span class="vuoto">Nessuna per ora</span>'}</div></div>`;
  }
  function umore(g, mood, ms = 2600) {
    const G = S.giocatori[g]; G._mood = mood;
    const el = $('#av-' + g); if (el) el.innerHTML = AV.render(G.avatar, mood);
    clearTimeout(G._t);
    if (ms) G._t = setTimeout(() => { G._mood = 'neutro'; const e2 = $('#av-' + g); if (e2) e2.innerHTML = AV.render(G.avatar, 'neutro'); }, ms);
  }
  const PIPS = { 1: [[50, 50]], 2: [[28, 28], [72, 72]], 3: [[25, 25], [50, 50], [75, 75]], 4: [[28, 28], [72, 28], [28, 72], [72, 72]], 5: [[26, 26], [74, 26], [50, 50], [26, 74], [74, 74]], 6: [[28, 24], [72, 24], [28, 50], [72, 50], [28, 76], [72, 76]] };
  function renderDadi(v, rotola) {
    $('#dadi').innerHTML = v.map(n => `<div class="dado${rotola ? ' rotola' : ''}">${PIPS[n].map(([x, y]) => `<i style="left:${x}%;top:${y}%"></i>`).join('')}</div>`).join('');
  }
  function istruzione(html) {
    $('#istruzione').innerHTML = html;
    $('.centro-info').style.setProperty('--col-attivo', COL[S.turno]);
  }
  const nomeB = g => `<b style="color:${COL[g]}">${S.giocatori[g].nome}</b>`;

  async function iniziaTurno() {
    S.fase = 'board'; salva();
    const G = S.giocatori[S.turno];
    [0, 1].forEach(renderCarta);
    posizionaPedine();
    if (G.salta) {
      G.salta = false;
      narra('saltaTurno', { g: S.turno });
      await messaggio({ titolo: `${G.nome} salta il turno`, testo: 'Il controllo bagagli è andato storto. Si riparte dal prossimo giro.', g: S.turno, mood: 'triste' });
      return passaTurno();
    }
    renderEvento();
    istruzione(`Tocca a ${nomeB(S.turno)}`);
    $('#btn-tira').hidden = false; $('#dadi').classList.add('invita');
    attesa = 'tira';
    clearTimeout(timerAttesa);
    timerAttesa = setTimeout(() => { if (attesa === 'tira' && $$('.velo').every(v => v.hidden)) narra('attesa', { g: S.turno }); }, 25000);
    setTasti({ ' ': () => tira(1) });
  }
  function liberoPerMappa() { return (attesa === 'tira' || attesa === 'direzione') && $$('.velo').every(v => v.hidden); }

  let sceltaDir = null;
  async function tira(nDadi) {
    if (attesa !== 'tira' && nDadi === 1) return;
    attesa = null; setTasti({}); $('#btn-tira').hidden = true; clearTimeout(timerAttesa); $('#dadi').classList.remove('invita');
    if (nDadi === 1 && eventoAttivo('vento')) nDadi = 2;
    const facce = eventoAttivo('sciopero') ? 3 : 6;
    const v = Array.from({ length: nDadi }, () => 1 + Math.floor(Math.random() * facce));
    suono.dadoAgita();
    for (let k = 0; k < 10; k++) { renderDadi(v.map(() => 1 + Math.floor(Math.random() * 6)), true); await sleep(70 + k * 8); }
    suono.dadoLancia();
    renderDadi(v);
    if (nDadi === 1 && v[0] === 6) narra('dadoAlto', {}, .35);
    if (nDadi === 1 && v[0] === 1) narra('dadoBasso', {}, .4);
    const tot = v.reduce((a, b) => a + b, 0);
    const pos = S.giocatori[S.turno].pos;
    const orario = (pos + tot) % N, antiorario = (pos - tot + N * 4) % N;
    if (orario === antiorario) { await sleep(400); return muovi(orario, 1, tot); }
    const inv = eventoAttivo('turbolenza');
    istruzione(`${nomeB(S.turno)} fa ${tot}<br><span style="white-space:nowrap">Scegli con <span class="kbd">←</span> <span class="kbd">→</span></span>${inv ? '<br><span class="avviso-turbolenza">Turbolenza: comandi invertiti!</span>' : ''}`);
    attesa = 'direzione';
    const bers = { [antiorario]: -1, [orario]: 1 };
    $$('#board .casella').forEach(c => c.classList.toggle('bersaglio', c.dataset.i in bers));
    // le caselle d'arrivo passano sopra le vicine (così lo zoom non finisce sotto) e il resto del tabellone si attenua
    $$('#board .casella.bersaglio').forEach(c => $('#board').insertBefore(c, $('#frecce')));
    $('#board').classList.add('scelta');
    // frecce
    $('#frecce').innerHTML = [[antiorario, inv ? '→' : '←'], [orario, inv ? '←' : '→']].map(([i, t]) => {
      const [x, y] = polar(278, angolo(i));
      return `<g transform="translate(${x},${y})"><g class="freccia-salta"><circle r="30" cy="5" fill="${INK}"/><circle r="30" fill="#FFC531" stroke="${INK}" stroke-width="4"/><text y="11" text-anchor="middle" style="font-family:var(--f-display);font-size:36px;fill:${INK}">${t}</text></g></g>`;
    }).join('');
    return new Promise(res => {
      sceltaDir = i => {
        sceltaDir = null; attesa = null; setTasti({});
        $$('#board .casella').forEach(c => c.classList.remove('bersaglio'));
        $('#board').classList.remove('scelta');
        $('#frecce').innerHTML = '';
        res(muovi(i, bers[i], tot));
      };
      const sx = inv ? orario : antiorario, dx = inv ? antiorario : orario;
      setTasti({ arrowleft: () => sceltaDir(sx), ArrowLeft: () => sceltaDir(sx), arrowright: () => sceltaDir(dx), ArrowRight: () => sceltaDir(dx) });
    });
  }
  async function muovi(dest, dir, passi) {
    const G = S.giocatori[S.turno];
    for (let k = 0; k < passi; k++) { G.pos = (G.pos + dir + N) % N; posizionaPedine(); suono.passo(); await sleep(190); }
    G.pos = dest; posizionaPedine();
    await sleep(350);
    return risolviCasella();
  }
  async function risolviCasella() {
    const g = S.turno, G = S.giocatori[g], c = casella(G.pos);
    if (c.t === 'via') {
      istruzione(`Casella Via. ${nomeB(g)} tira ancora.`); await sleep(1200); return iniziaTurno();
    }
    if (c.t === 'imprevisto') { await imprevisto(); return; }
    if (c.t === 'duello') {
      const v = await duello();
      if (v >= 0) await daCarta(v, 'Duello vinto');
      if (v === g) return iniziaTurno();          // chi è di turno e vince il duello tira ancora
      return passaTurno();
    }
    if (c.t === 'volante') return doganaVolante();
    const dogana = c.t === 'dogana' && !G.timbri[c.c];
    const ok = await domanda(c.c, { g, badge: dogana ? 'Dogana, vale un timbro' : (c.t === 'dogana' ? 'Timbro già preso' : null), esitoOk: dogana ? 'Giusto! Timbro conquistato' : 'Giusto! Tira ancora', zittoSeGiusta: dogana });
    if (!ok) return passaTurno();
    if (eventoAttivo('happyhour')) await daCarta(g, 'Happy hour');
    if (dogana) {
      await prendiTimbro(g, c.c);
      if (await controllaFinale(g)) return;
    }
    return iniziaTurno();
  }

  // ---------- Cambio turno ed eventi del Comandante ----------
  const EVENTI = {
    turbolenza: { titolo: 'Turbolenza!', testo: 'Per un giro i comandi sono invertiti: la freccia ← porta a destra e la freccia → porta a sinistra.' },
    happyhour: { titolo: 'Happy hour a bordo', testo: 'Per un giro ogni risposta giusta regala una carta aiuto.' },
    sciopero: { titolo: 'Sciopero dei voli', testo: 'Per un giro il dado arriva al massimo a 3. Si procede a passo d\'uomo.' },
    ritardo: { titolo: 'Volo in ritardo', testo: 'Per un giro il tempo per rispondere è dimezzato. Sbrigatevi!' },
    vento: { titolo: 'Vento in coda', testo: 'Per un giro si tirano due dadi e si vola veloci.' },
  };
  const eventoAttivo = id => !!(S && S.evento && S.evento.id === id);
  function renderEvento() {
    const b = $('#evento-badge'); if (!b) return;
    if (!S.evento) { b.hidden = true; return; }
    const r = S.evento.rimasti;
    b.innerHTML = `<b>${EVENTI[S.evento.id].titolo}</b> ancora ${r} ${r === 1 ? 'turno' : 'turni'}`;
    b.hidden = false;
  }
  // la ruota del Comandante: gira, rallenta e si ferma sull'evento estratto
  const RUOTA_COL = { turbolenza: '#2E8BEF', happyhour: '#FF6FB5', sciopero: '#F0543C', ritardo: '#9B5DE5', vento: '#3CC46B' };
  const RUOTA_NOME = { turbolenza: 'Turbolenza', happyhour: 'Happy hour', sciopero: 'Sciopero', ritardo: 'Ritardo', vento: 'Vento in coda' };
  async function giraRuota(id) {
    // la battuta sta dentro il pannello: il fumetto in basso coprirebbe la ruota sugli schermi bassi
    const battuta = testoBattuta('ruota', {});
    const ids = Object.keys(EVENTI), n = ids.length, sett = 360 / n, R = 200;
    const pt = (r, a) => { const t = (a - 90) * Math.PI / 180; return [(r * Math.cos(t)).toFixed(1), (r * Math.sin(t)).toFixed(1)]; };
    const spicchi = ids.map((e, k) => {
      const a0 = k * sett, a1 = a0 + sett, [x0, y0] = pt(R, a0), [x1, y1] = pt(R, a1), am = a0 + sett / 2;
      return `<path d="M0,0 L${x0},${y0} A${R},${R} 0 0 1 ${x1},${y1} Z" fill="${RUOTA_COL[e]}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
        <g transform="rotate(${am})"><text x="0" y="-${R * .56}" text-anchor="middle" dominant-baseline="middle" transform="rotate(90 0 -${R * .56})" style="font-family:var(--f-display);font-size:25px;fill:#fff;paint-order:stroke;stroke:${INK};stroke-width:6px;stroke-linejoin:round">${RUOTA_NOME[e]}</text></g>`;
    }).join('');
    const pioli = ids.map((e, k) => { const [x, y] = pt(R - 12, k * sett); return `<circle cx="${x}" cy="${y}" r="7" fill="#FFC531" stroke="${INK}" stroke-width="3"/>`; }).join('');
    const p = $('#pannello-msg');
    p.style.setProperty('--col', 'var(--sole)');
    p.classList.add('con-ruota');
    p.innerHTML = `<div class="av-grande comandante-msg">${window.Ritratti.comandante('parla')}</div><div class="annuncio-cabina">Annuncio dalla cabina</div>
      <h2>La ruota del Comandante</h2>${battuta ? `<p class="ruota-battuta">${esc(battuta)}</p>` : ''}
      <div class="ruota-eventi"><svg viewBox="-230 -250 460 480">
        <circle r="${R + 14}" cy="10" fill="${INK}"/><circle r="${R + 14}" fill="#FFF9EE" stroke="${INK}" stroke-width="6"/>
        <g class="ruota-disco">${spicchi}${pioli}</g>
        <circle r="34" fill="#FFC531" stroke="${INK}" stroke-width="6"/><circle r="10" fill="${INK}"/>
        <path class="ruota-lancetta" d="M-22,-${R + 34} L22,-${R + 34} L0,-${R - 22} Z" fill="#fff" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
      </svg></div>`;
    $('#ov-msg').hidden = false;
    setTasti({});
    const disco = $('.ruota-disco', p), lanc = $('.ruota-lancetta', p);
    const k = ids.indexOf(id);
    // dove fermarsi: il centro dello spicchio giusto sotto la lancetta, con un po' di scarto per non sembrare finto
    const fine = 360 * 5 + (360 - (k * sett + sett / 2)) + (Math.random() - .5) * sett * .6;
    const durata = matchMedia('(prefers-reduced-motion: reduce)').matches ? 600 : 4600;
    let ultimo = 0;
    await new Promise(res => {
      const t0 = performance.now();
      const step = t => {
        const q = Math.min(1, (t - t0) / durata), e = 1 - Math.pow(1 - q, 4), a = fine * e;
        disco.setAttribute('transform', `rotate(${a.toFixed(2)})`);
        const scatti = Math.floor(a / sett);   // un clic ogni volta che un piolo passa sotto la lancetta
        if (scatti !== ultimo) { ultimo = scatti; suono.tick(); lanc.classList.remove('scatta'); void lanc.getBBox(); lanc.classList.add('scatta'); }
        if (q < 1) requestAnimationFrame(step); else res();
      };
      requestAnimationFrame(step);
    });
    suono.carta();
    $$('.ruota-disco path', p)[k].classList.add('vinto');
    await sleep(1100);
    p.classList.remove('con-ruota');
  }
  async function avviaEvento() {
    const id = casuale(Object.keys(EVENTI).filter(k => k !== S.ultimoEvento));
    S.evento = { id, rimasti: 2 }; S.ultimoEvento = id;
    S.prossimoEvento = S.turniContati + 2 + 4 + Math.floor(Math.random() * 2);
    suono.radio();
    await giraRuota(id);
    renderEvento();
    await messaggio({
      titolo: EVENTI[id].titolo, testo: EVENTI[id].testo, g: null, bottone: 'Allacciate le cinture',
      extra: `<div class="av-grande comandante-msg">${window.Ritratti.comandante('parla')}</div><div class="annuncio-cabina">Annuncio dalla cabina</div>`,
    });
    narra('evento_' + id, {});
  }
  async function passaTurno() {
    S.turno = avv(S.turno);
    S.turniContati = (S.turniContati || 0) + 1;
    if (S.prossimoEvento == null) S.prossimoEvento = 4 + Math.floor(Math.random() * 2);
    if (S.evento) {
      S.evento.rimasti--;
      if (S.evento.rimasti <= 0) { S.evento = null; narra('eventoFinito', {}, .7); }
    } else if (S.turniContati >= S.prossimoEvento && S.fase === 'board') {
      await avviaEvento();
    }
    renderEvento();
    return iniziaTurno();
  }

  // ---------- Carte aiuto ----------
  const CARTE_MANO = ['scudo', '5050', 'cambio'];
  const quante = (G, id) => G.carte.filter(c => c === id).length;
  // regala una carta aiuto (vincitore del duello, happy hour)
  async function daCarta(g, motivo) {
    const G = S.giocatori[g];
    const possibili = CARTE_MANO.filter(id => quante(G, id) < 2);
    if (!possibili.length) return;
    const id = casuale(possibili);
    G.carte.push(id); renderCarta(g); suono.carta();
    await messaggio({ titolo: `${motivo}: ${CARTE[id].titolo}`, testo: `${G.nome} riceve una carta. ${CARTE[id].testo}`, g, extra: `<div class="icona-carta">${iconaSvg(id, INK, 2)}</div>` });
  }

  // ---------- Statistiche per la pagella finale ----------
  function stat(g) {
    S.stats = S.stats || [{}, {}];
    const x = S.stats[g];
    x.giuste = x.giuste || 0; x.sbagliate = x.sbagliate || 0; x.scaduti = x.scaduti || 0;
    x.cat = x.cat || {}; x.duelli = x.duelli || 0; x.rubati = x.rubati || 0; x.serieMax = x.serieMax || 0;
    return x;
  }
  const statistica = (g, chiave, n = 1) => { stat(g)[chiave] += n; };
  function registraRisposta(g, cat, ok, scaduto, ms, tipo, km) {
    const x = stat(g);
    ok ? x.giuste++ : x.sbagliate++;
    if (scaduto) x.scaduti++;
    const c = x.cat[cat] = x.cat[cat] || [0, 0];
    c[1]++; if (ok) c[0]++;
    if (ok && tipo !== 'ordine' && tipo !== 'mappa' && (x.veloce == null || ms < x.veloce)) x.veloce = ms;
    if (tipo === 'mappa' && km != null) {
      if (x.kmMin == null || km < x.kmMin) x.kmMin = km;
      if (!ok && (x.kmMax == null || km > x.kmMax)) x.kmMax = km;
    }
    x.serieMax = Math.max(x.serieMax, S.giocatori[g].serie || 0);
  }

  // ---------- Domande ----------
  function pescaDomanda(cat, diff) {
    const libere = DOMANDE.map((d, i) => ({ d, i })).filter(x => x.d.c === cat && !S.usate.includes(x.i));
    let pool = libere;
    if (!pool.length) { S.usate = S.usate.filter(i => DOMANDE[i].c !== cat); pool = DOMANDE.map((d, i) => ({ d, i })).filter(x => x.d.c === cat); }
    // facili più rare, medie e difficili più frequenti (20% / 42% / 38%)
    const r = Math.random(), target = diff || (r < .2 ? 1 : r < .62 ? 2 : 3);
    const conDiff = pool.filter(x => x.d.d === target);
    const scelta = casuale(conDiff.length ? conDiff : pool);
    S.usate.push(scelta.i);
    return scelta.d;
  }
  // pesca da una lista senza ripetere finché non le ha usate tutte (l'elenco delle usate resta nella partita salvata)
  function pescaDa(lista, chiave, filtro) {
    S[chiave] = S[chiave] || [];
    const pool = lista.map((d, i) => ({ d, i })).filter(x => filtro(x.d));
    if (!pool.length) return null;
    let libere = pool.filter(x => !S[chiave].includes(x.i));
    if (!libere.length) { S[chiave] = S[chiave].filter(i => !pool.some(x => x.i === i)); libere = pool; }
    const s = casuale(libere); S[chiave].push(s.i); return s.d;
  }
  const DOM_VF = () => window.DOMANDE_VF || [], DOM_ORD = () => window.DOMANDE_ORDINE || [];
  const TIPO_NOME = { vf: 'Vero o falso lampo', ordine: 'Metti in ordine', mappa: 'Dov\'è sulla mappa?', bandiera: 'Bandiere' };
  const BANDIERE = () => window.BANDIERE || [];
  // domanda sulle bandiere: o si riconosce il paese dalla bandiera, o si sceglie la bandiera giusta tra quattro.
  // Le risposte sbagliate sono prese prima tra le bandiere che si somigliano (stessa famiglia).
  function domandaBandiera(B) {
    const altre = BANDIERE().filter(x => x !== B);
    const punteggio = x => x.f.filter(f => B.f.includes(f)).length + Math.random() * .9;
    const simili = altre.sort((a, b) => punteggio(b) - punteggio(a));
    // la domanda inversa ("qual è la bandiera di…?") è la più frequente: tra le risposte ci sono
    // una o due versioni truccate della bandiera vera (colori scambiati, croce spostata, stemma girato)
    const inversa = Math.random() < .7;
    if (!inversa) return { B, inversa, risposte: mescola([B, ...simili.slice(0, 3)].map(x => ({ t: x.n, di: x.di, svg: x.svg(), giusta: x === B }))) };
    const finte = mescola(B.finte()).slice(0, Math.random() < .75 ? 2 : 1);
    const usate = new Set([B.firma, ...finte.map(f => f.firma)]);
    const vere = simili.filter(x => !usate.has(x.firma)).slice(0, 3 - finte.length);
    return {
      B, inversa, risposte: mescola([
        { t: B.n, di: B.di, svg: B.svg(), giusta: true },
        // una finta può coincidere con la bandiera vera di un altro paese (es. Polonia e Monaco invertite)
        ...finte.map(f => { const vera = BANDIERE().find(x => x.firma === f.firma); return vera ? { t: vera.n, di: vera.di, svg: f.svg() } : { t: B.n, svg: f.svg(), finta: true }; }),
        ...vere.map(x => ({ t: x.n, di: x.di, svg: x.svg() })),
      ]),
    };
  }
  const SOGLIA_KM = 125;
  function scegliTipo(cat, opt) {
    if (opt.tipo) return opt.tipo;
    if (opt.D || opt.diff) return 'classica';
    const r = Math.random();
    if (cat === 'geo' && r < .25) return 'mappa';
    if (cat === 'geo' && r < .45 && BANDIERE().length >= 4) return 'bandiera';
    if (r < .46 && DOM_VF().some(d => d.c === cat)) return 'vf';
    if (r < .6 && DOM_ORD().some(d => d.c === cat)) return 'ordine';
    return 'classica';
  }
  const tempoDomanda = tipo => ({ classica: 30000, vf: 10000, ordine: 40000, mappa: 30000, bandiera: 20000 }[tipo]) * (eventoAttivo('ritardo') ? .5 : 1);

  function domanda(cat, opt = {}) {
    const g = opt.g ?? S.turno, G = S.giocatori[g];
    let tipo = scegliTipo(cat, opt), D = null, luogo = null;
    if (tipo === 'vf') D = pescaDa(DOM_VF(), 'usateVF', d => d.c === cat);
    if (tipo === 'ordine') D = pescaDa(DOM_ORD(), 'usateOrd', d => d.c === cat);
    if (tipo === 'mappa') luogo = pescaDa(MAPPA.luoghi, 'usateMappa', l => !l.ins && !l.alias);
    let band = null;
    if (tipo === 'bandiera') { const B = pescaDa(BANDIERE(), 'usateBand', () => true); if (B) band = domandaBandiera(B); else tipo = 'classica'; }
    if ((tipo === 'vf' || tipo === 'ordine') && !D) tipo = 'classica';
    if (tipo === 'mappa' && !luogo) tipo = 'classica';
    if (tipo === 'classica') D = opt.D || pescaDomanda(cat, opt.diff);

    const p = $('#pannello-domanda');
    p.style.setProperty('--cat', CAT[cat].col);
    p.classList.toggle('con-mappa', tipo === 'mappa');
    const sotto = tipo === 'classica' ? `Domanda ${['', 'facile', 'media', 'difficile'][D.d] || ''}` : TIPO_NOME[tipo];
    let testo, corpo, risposte = null, mescolati = null;
    if (tipo === 'classica') {
      testo = D.q;
      risposte = mescola(D.a.map((t, i) => ({ t, giusta: i === 0 })));
      corpo = `<div class="risposte">${risposte.map((r, i) => `<button class="risposta" data-i="${i}"><span class="kbd">${i + 1}</span><span>${esc(r.t)}</span></button>`).join('')}</div>`;
    } else if (tipo === 'bandiera') {
      risposte = band.risposte;
      if (band.inversa) {
        testo = `Qual è la bandiera ${band.B.di}?`;
        corpo = `<div class="risposte bandiere">${risposte.map((r, i) => `<button class="risposta" data-i="${i}"><span class="kbd">${i + 1}</span><span class="bandiera">${r.svg}</span></button>`).join('')}</div>`;
      } else {
        testo = 'Di quale paese è questa bandiera?';
        corpo = `<div class="bandiera-grande">${band.B.svg()}</div>
          <div class="risposte">${risposte.map((r, i) => `<button class="risposta" data-i="${i}"><span class="kbd">${i + 1}</span><span>${esc(r.t)}</span></button>`).join('')}</div>`;
      }
    } else if (tipo === 'vf') {
      testo = D.q;
      corpo = `<div class="risposte vf"><button class="risposta vero" data-i="0"><span class="kbd">1</span><span>Vero</span></button><button class="risposta falso" data-i="1"><span class="kbd">2</span><span>Falso</span></button></div>`;
    } else if (tipo === 'ordine') {
      testo = D.q;
      mescolati = mescola(D.el.map((t, i) => ({ t, pos: i })));
      corpo = `<div class="ordine-slot">${[0, 1, 2, 3].map(k => `<div class="slot"><b>${k + 1}°</b><span></span></div>`).join('')}</div>
        <div class="risposte">${mescolati.map((r, i) => `<button class="risposta" data-i="${i}"><span class="kbd">${i + 1}</span><span>${esc(r.t)}</span></button>`).join('')}</div>
        <p class="aiuto-domanda">Premi i quattro numeri nell'ordine giusto. <span class="kbd">⌫</span> toglie l'ultimo.</p>`;
    } else {
      testo = `Dov'è ${luogo.n}?`;
      corpo = `<div class="mappa-domanda" id="mappa-domanda"></div>
        <p class="aiuto-domanda">Clicca sul punto giusto, oppure muovi il mirino con le frecce (<span class="kbd">Shift</span> per andare veloce) e conferma con <span class="kbd">↵</span>. Vale se sei entro ${SOGLIA_KM} km.</p>`;
    }
    const aiuti = [];
    if ((tipo === 'classica' || tipo === 'bandiera') && G.carte.includes('5050')) aiuti.push(`<button class="btn aiuto" data-a="5050">50/50 <span class="kbd">5</span></button>`);
    if (G.carte.includes('cambio')) aiuti.push(`<button class="btn aiuto" data-a="cambio">Cambio volo <span class="kbd">6</span></button>`);
    p.innerHTML = `
      <div class="domanda-griglia">
        <div class="domanda-av" style="--col:${COL[g]}">
          <div class="fumetto">${casuale(['Mmm…', 'Ci penso!', 'Questa la so?', 'Uhm…'])}</div>
          <div class="av-q">${AV.render(G.avatar, 'stupito')}</div>
          <div class="nome-q">${G.nome}</div>
        </div>
        <div>
          <div class="domanda-testa"><div class="bollo-cat">${iconaSvg(cat, INK, 2.4)}</div>
            <div><div class="cat-nome">${CAT[cat].n}</div><div class="chi">${sotto}</div></div>
            ${opt.badge ? `<span class="badge-dogana">${opt.badge}</span>` : ''}</div>
          <p class="domanda-testo">${esc(testo)}</p>
          ${corpo}
          ${aiuti.length ? `<div class="aiuti">${aiuti.join('')}</div>` : ''}
          <div class="timer"><i></i></div>
          <div class="esito">&nbsp;</div>
        </div>
      </div>`;
    $('#ov-domanda').hidden = false;
    if (S.fase === 'board') umore(g, 'stupito', 0);
    abbassaMusica(true);
    let TEMPO = tempoDomanda(tipo);
    const t0 = performance.now();
    let finito = false, ultimoSec = 99, km = null;
    const barra = $('.timer i', p), timer = $('.timer', p);

    return new Promise(res => {
      // fine comune a tutti i tipi: reazione dell'avatar, esito, commento del Comandante
      const chiudi = async (ok, scaduto, testoEsito, attesaExtra = 0) => {
        if (finito) return; finito = true; setTasti({});
        G.serie = ok ? Math.max(0, G.serie || 0) + 1 : Math.min(0, G.serie || 0) - 1;
        registraRisposta(g, cat, ok, scaduto, performance.now() - t0, tipo, km);
        $$('.risposta, .aiuto', p).forEach(b => { b.disabled = true; });
        const es = $('.esito', p);
        es.className = 'esito ' + (ok ? 'ok' : 'ko');
        const coda = opt.esitoKo !== undefined ? opt.esitoKo : (S.fase === 'board' ? `. Tocca a ${S.giocatori[avv(g)].nome}` : '');
        es.textContent = testoEsito || (ok ? (opt.esitoOk || 'Giusto!') : (scaduto ? 'Tempo scaduto' : 'Sbagliato') + coda);
        $('.risposte', p)?.classList.add('finito');
        ok ? suono.ok() : suono.ko();
        const avq = $('.av-q', p), fum = $('.fumetto', p);
        avq.innerHTML = AV.render(G.avatar, ok ? 'felice' : 'triste');
        avq.classList.add(ok ? 'salta' : 'trema');
        fum.className = 'fumetto pop ' + (ok ? 'ok' : 'ko');
        fum.textContent = ok ? casuale(['Esatto!', 'Lo sapevo!', 'Sììì!', 'Facile!']) : (scaduto ? 'Tempo scaduto!' : casuale(['Noooo!', 'Ahia…', 'Ma dai!', 'Uffa!']));
        if (S.fase === 'board') umore(g, ok ? 'felice' : 'triste');
        await sleep(500);
        await attendiAvanti(p);
        $('#ov-domanda').hidden = true;
        p.classList.remove('con-mappa');
        abbassaMusica(false);
        commentaRisposta(g, cat, ok, scaduto, { ...opt, tipo, km });
        res(ok);
      };
      const coda = ok => ok ? '' : (opt.esitoKo !== undefined ? opt.esitoKo : (S.fase === 'board' ? `. Tocca a ${S.giocatori[avv(g)].nome}` : ''));
      const tasti4 = fn => ({ 1: () => fn(0), 2: () => fn(1), 3: () => fn(2), 4: () => fn(3) });
      let tastiTipo = {};

      if (tipo === 'classica' || tipo === 'bandiera') {
        const fine = i => {
          const btns = $$('.risposta', p);
          if (i >= 0 && btns[i].disabled) return;
          const giusta = risposte.findIndex(r => r.giusta), ok = i === giusta;
          if (i >= 0) btns[i].classList.add('scelta', ok ? 'giusta' : 'sbagliata');
          btns[giusta].classList.add('giusta');
          // nella domanda inversa sotto le bandiere non c'è scritto niente: l'esito dice di chi era quella giusta
          let esitoBand = null;
          if (tipo === 'bandiera' && !ok) {
            const scelta = i >= 0 ? risposte[i] : null;
            if (!band.inversa) esitoBand = `${scelta ? 'Sbagliato' : 'Tempo scaduto'}: era la bandiera ${band.B.di}`;
            else if (scelta && scelta.finta) esitoBand = 'Sbagliato: quella era truccata';
            else if (scelta) esitoBand = `Sbagliato: quella è la bandiera ${scelta.di}`;
            else esitoBand = 'Tempo scaduto: era questa';
            esitoBand += coda(false);
          }
          chiudi(ok, i < 0, esitoBand);
        };
        $$('.risposta', p).forEach(b => { b.onclick = () => fine(+b.dataset.i); });
        tastiTipo = tasti4(fine);
        tastiTipo.scadenza = () => fine(-1);
      } else if (tipo === 'vf') {
        const fine = i => {
          const btns = $$('.risposta', p), giusta = D.v ? 0 : 1, ok = i === giusta;
          if (i >= 0) btns[i].classList.add('scelta', ok ? 'giusta' : 'sbagliata');
          btns[giusta].classList.add('giusta');
          chiudi(ok, i < 0, ok ? null : `${i < 0 ? 'Tempo scaduto' : 'Sbagliato'}: era ${D.v ? 'vero' : 'falso'}${coda(false)}`);
        };
        $$('.risposta', p).forEach(b => { b.onclick = () => fine(+b.dataset.i); });
        tastiTipo = { 1: () => fine(0), 2: () => fine(1), v: () => fine(0), f: () => fine(1) };
        tastiTipo.scadenza = () => fine(-1);
      } else if (tipo === 'ordine') {
        const scelti = [], slots = $$('.slot span', p), btns = $$('.risposta', p);
        const mostraGiusto = () => {
          $$('.slot', p).forEach((s, k) => { const ok = mescolati[scelti[k]] && mescolati[scelti[k]].pos === k; s.classList.add(ok ? 'giusto' : 'sbagliato'); });
          const sol = document.createElement('p'); sol.className = 'soluzione';
          sol.innerHTML = 'Ordine giusto: ' + D.el.map((t, k) => `<b>${k + 1}°</b> ${esc(t)}`).join(' · ');
          $('.ordine-slot', p).after(sol);
        };
        const prendi = i => {
          if (finito || scelti.includes(i) || scelti.length >= 4) return;
          scelti.push(i); slots[scelti.length - 1].textContent = mescolati[i].t;
          btns[i].classList.add('presa'); suono.tick();
          if (scelti.length === 4) {
            const ok = scelti.every((x, k) => mescolati[x].pos === k);
            mostraGiusto();
            chiudi(ok, false, ok ? (opt.esitoOk || 'Ordine perfetto!') : 'Ordine sbagliato' + coda(false), 1500);
          }
        };
        const togli = () => { if (finito || !scelti.length) return; const i = scelti.pop(); slots[scelti.length].textContent = ''; btns[i].classList.remove('presa'); };
        btns.forEach(b => { b.onclick = () => prendi(+b.dataset.i); });
        tastiTipo = { ...tasti4(prendi), Backspace: togli, backspace: togli };
        tastiTipo.scadenza = () => { mostraGiusto(); chiudi(false, true, 'Tempo scaduto' + coda(false), 1500); };
      } else {
        // domanda sulla mappa: si clicca o si muove il mirino con le frecce
        const map = disegnaMappa($('#mappa-domanda'), { senzaMete: true, senzaNomi: true });
        const svg = map.svg, NS = 'http://www.w3.org/2000/svg';
        const strato = document.createElementNS(NS, 'g'); svg.appendChild(strato);
        const mir = { x: MAPPA.w / 2, y: MAPPA.h / 2 };
        strato.innerHTML = `<g class="mirino"><circle r="18" fill="none" stroke="${INK}" stroke-width="4"/><circle r="18" fill="none" stroke="#fff" stroke-width="1.6"/><path d="M-30,0 H-10 M10,0 H30 M0,-30 V-10 M0,10 V30" stroke="${INK}" stroke-width="4" stroke-linecap="round"/><circle r="3.5" fill="${COL[g]}"/></g>`;
        const mirino = strato.firstChild;
        const sposta = () => mirino.setAttribute('transform', `translate(${mir.x},${mir.y})`);
        sposta();
        const conferma = () => {
          if (finito) return;
          km = Math.round(Math.hypot(mir.x - luogo.x, mir.y - luogo.y) * MAPPA.kmPx);
          const ok = km <= SOGLIA_KM;
          strato.insertAdjacentHTML('afterbegin', `<path d="M${mir.x},${mir.y} L${luogo.x},${luogo.y}" stroke="${INK}" stroke-width="4" stroke-dasharray="2 9" stroke-linecap="round" fill="none"/>
            <g transform="translate(${luogo.x},${luogo.y})" class="meta-vera"><circle r="${SOGLIA_KM / MAPPA.kmPx}" fill="rgba(60,196,107,.18)" stroke="#3CC46B" stroke-width="2.5" stroke-dasharray="6 6"/><circle r="11" fill="#FFC531" stroke="${INK}" stroke-width="3.5"/>
            <g transform="translate(16,-14)"><rect x="1.5" y="4" width="${luogo.n.length * 9 + 26}" height="30" rx="9" fill="${INK}"/><rect width="${luogo.n.length * 9 + 26}" height="30" rx="9" fill="#fff" stroke="${INK}" stroke-width="2.4"/><text x="13" y="21" style="font-family:var(--f-display);font-size:17px;fill:${INK}">${esc(luogo.n)}</text></g></g>`);
          const testoKm = km < 5 ? 'in pieno centro' : `a ${km} km`;
          chiudi(ok, false, ok ? `${opt.esitoOk || 'Giusto!'} Sei ${testoKm}` : `Sei a ${km} km da ${luogo.n}${coda(false)}`, 1800);
        };
        svg.style.cursor = 'crosshair';
        svg.addEventListener('pointermove', e => { if (finito) return; const q = new DOMPoint(e.clientX, e.clientY).matrixTransform(svg.getScreenCTM().inverse()); mir.x = q.x; mir.y = q.y; sposta(); });
        svg.addEventListener('click', e => { if (finito) return; const q = new DOMPoint(e.clientX, e.clientY).matrixTransform(svg.getScreenCTM().inverse()); mir.x = q.x; mir.y = q.y; sposta(); conferma(); });
        const muovi = (dx, dy) => e => { const v = (window.event && window.event.shiftKey) ? 4 : 1; mir.x = Math.max(0, Math.min(MAPPA.w, mir.x + dx * v)); mir.y = Math.max(0, Math.min(MAPPA.h, mir.y + dy * v)); sposta(); };
        tastiTipo = {
          ArrowLeft: muovi(-9, 0), ArrowRight: muovi(9, 0), ArrowUp: muovi(0, -9), ArrowDown: muovi(0, 9),
          arrowleft: muovi(-9, 0), arrowright: muovi(9, 0), arrowup: muovi(0, -9), arrowdown: muovi(0, 9),
          ' ': conferma, enter: conferma, Enter: conferma,
        };
        tastiTipo.scadenza = () => { km = null; strato.insertAdjacentHTML('afterbegin', `<g transform="translate(${luogo.x},${luogo.y})"><circle r="11" fill="#FFC531" stroke="${INK}" stroke-width="3.5"/></g>`); chiudi(false, true, `Tempo scaduto: ${luogo.n} era qui` + coda(false), 1800); };
      }

      // carte aiuto
      const usa5050 = () => {
        if (finito || (tipo !== 'classica' && tipo !== 'bandiera') || !G.carte.includes('5050')) return;
        G.carte.splice(G.carte.indexOf('5050'), 1); renderCarta(g);
        const btns = $$('.risposta', p);
        mescola(risposte.map((r, i) => ({ r, i })).filter(x => !x.r.giusta)).slice(0, 2).forEach(x => { btns[x.i].disabled = true; btns[x.i].classList.add('tolta'); });
        const b = $('.aiuto[data-a="5050"]', p); if (b) b.remove();
        suono.carta(); narra('cinquanta', { g });
      };
      // Cambio volo: questa domanda sparisce e ne arriva un'altra della stessa categoria
      const usaCambio = () => {
        if (finito || !G.carte.includes('cambio')) return;
        G.carte.splice(G.carte.indexOf('cambio'), 1); renderCarta(g);
        finito = true; setTasti({});
        suono.carta(); narra('cambio', { g });
        res(domanda(cat, { ...opt, tipo: undefined, D: undefined }));
      };
      $$('.aiuto', p).forEach(b => { b.onclick = () => (b.dataset.a === '5050' ? usa5050() : usaCambio()); });
      const scadenza = tastiTipo.scadenza; delete tastiTipo.scadenza;
      setTasti({ ...tastiTipo, 5: usa5050, 6: usaCambio });

      const loop = () => {
        if (finito) return;
        const t = performance.now() - t0, rest = Math.max(0, 1 - t / TEMPO);
        barra.style.transform = `scaleX(${rest})`;
        const sec = Math.ceil((TEMPO - t) / 1000);
        timer.classList.toggle('urgente', sec <= 5);
        if (sec <= 5 && sec !== ultimoSec && sec > 0) { ultimoSec = sec; suono.urgente(); }
        if (t >= TEMPO) return scadenza();
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    });
  }

  // ---------- Duello: tutti e due giocano, prenota chi preme prima ----------
  const TASTO_DUELLO = ['Q', 'P'];
  function duello() {
    const cat = casuale(CATS), D = pescaDomanda(cat);
    const risposte = mescola(D.a.map((t, i) => ({ t, giusta: i === 0 })));
    const p = $('#pannello-domanda');
    p.classList.remove('con-mappa');
    p.style.setProperty('--cat', CAT[cat].col);
    const duellante = g => `<div class="duellante" data-g="${g}" style="--col:${COL[g]}"><div class="av-q">${AV.render(S.giocatori[g].avatar, 'stupito')}</div><div class="nome-q">${S.giocatori[g].nome}</div><span class="kbd tasto-duello">${TASTO_DUELLO[g]}</span></div>`;
    p.innerHTML = `
      <div class="duello-griglia">
        ${duellante(0)}
        <div class="duello-centro">
          <div class="duello-titolo">Duello!</div>
          <div class="domanda-testa"><div class="bollo-cat">${iconaSvg(cat, INK, 2.4)}</div><div><div class="cat-nome">${CAT[cat].n}</div><div class="chi">Chi preme per primo risponde</div></div></div>
          <div class="duello-pronti">
            <p>Mettetevi in posizione! Premete il vostro tasto per dire che ci siete.</p>
            <div class="pronti-stato"><span data-g="0"><span class="kbd">${TASTO_DUELLO[0]}</span> ${esc(S.giocatori[0].nome)}</span><span data-g="1"><span class="kbd">${TASTO_DUELLO[1]}</span> ${esc(S.giocatori[1].nome)}</span></div>
            <div class="conto" aria-live="polite"></div>
            <button class="btn pieno btn-via">Siamo pronti <span class="kbd">Spazio</span></button>
          </div>
          <div class="duello-gioco" hidden>
            <p class="domanda-testo">${esc(D.q)}</p>
            <div class="risposte in-attesa">${risposte.map((r, i) => `<button class="risposta" data-i="${i}" disabled><span class="kbd">${i + 1}</span><span>${esc(r.t)}</span></button>`).join('')}</div>
            <div class="stato-duello">Prenotatevi! <span class="kbd">${TASTO_DUELLO[0]}</span> ${esc(S.giocatori[0].nome)}, <span class="kbd">${TASTO_DUELLO[1]}</span> ${esc(S.giocatori[1].nome)}</div>
            <div class="timer"><i></i></div>
          </div>
          <div class="esito">&nbsp;</div>
        </div>
        ${duellante(1)}
      </div>`;
    $('#ov-domanda').hidden = false;
    abbassaMusica(true);
    suono.radio();
    const barra = $('.timer i', p), stato = $('.stato-duello', p), btns = $$('.risposta', p), giusta = risposte.findIndex(r => r.giusta);
    const tentato = [false, false];
    let chi = -1, finito = false, scade = 0, durata = 1, ultimoSec = 99;
    const avvia = ms => { scade = performance.now() + ms; durata = ms; };
    let inGioco = false;
    return new Promise(res => {
      const fine = async vincitore => {
        if (finito) return; finito = true; setTasti({});
        if (vincitore >= 0) statistica(vincitore, 'duelli');
        btns.forEach(b => { b.disabled = true; }); btns[giusta].classList.add('giusta');
        $('.risposte', p).classList.add('finito');
        [0, 1].forEach(g => {
          const el = $(`.duellante[data-g="${g}"] .av-q`, p);
          const mood = vincitore === g ? 'felice' : (tentato[g] ? 'triste' : 'neutro');
          el.innerHTML = AV.render(S.giocatori[g].avatar, mood);
          if (vincitore === g) el.classList.add('salta'); else if (tentato[g]) el.classList.add('trema');
        });
        const es = $('.esito', p);
        es.className = 'esito ' + (vincitore >= 0 ? 'ok' : 'ko');
        es.textContent = vincitore >= 0 ? `Duello vinto da ${S.giocatori[vincitore].nome}!` : 'Nessuno vince il duello';
        vincitore >= 0 ? suono.ok() : suono.ko();
        await sleep(500);
        await attendiAvanti(p);
        $('#ov-domanda').hidden = true;
        abbassaMusica(false);
        narra(vincitore >= 0 ? 'duelloVinto' : 'duelloNessuno', { g: vincitore >= 0 ? vincitore : S.turno });
        res(vincitore);
      };
      const prenota = g => {
        if (finito || chi >= 0 || tentato[g]) return;
        chi = g; tentato[g] = true;
        tono(880, .09, 'square', .08); tono(1320, .14, 'square', .07, .08);
        $$('.duellante', p).forEach(d => { d.classList.toggle('prenotato', +d.dataset.g === g); d.classList.toggle('escluso', +d.dataset.g !== g); });
        $('.risposte', p).classList.remove('in-attesa');
        btns.forEach(b => { if (!b.classList.contains('sbagliata')) b.disabled = false; });
        stato.innerHTML = `<b style="color:${COL[g]}">${esc(S.giocatori[g].nome)}</b> risponde! <span class="kbd">1</span>–<span class="kbd">4</span>`;
        avvia(10000);
        setTasti({ 1: () => rispondi(0), 2: () => rispondi(1), 3: () => rispondi(2), 4: () => rispondi(3) });
      };
      const rispondi = i => {
        if (finito || chi < 0 || btns[i].disabled) return;
        const g = chi;
        if (i === giusta) { btns[i].classList.add('scelta'); return fine(g); }
        btns[i].classList.add('sbagliata'); btns[i].disabled = true; suono.ko();
        passaMano(g);
      };
      // chi ha sbagliato (o non ha risposto in tempo) passa la mano all'altro, se non ha già provato
      const passaMano = g => {
        const altro = avv(g);
        chi = -1;
        $(`.duellante[data-g="${g}"] .av-q`, p).innerHTML = AV.render(S.giocatori[g].avatar, 'triste');
        if (tentato[altro]) return fine(-1);
        $$('.duellante', p).forEach(d => d.classList.remove('prenotato', 'escluso'));
        btns.forEach(b => { b.disabled = true; });
        stato.innerHTML = `Sbagliato! <b style="color:${COL[altro]}">${esc(S.giocatori[altro].nome)}</b>, premi <span class="kbd">${TASTO_DUELLO[altro]}</span> per rubare la risposta`;
        avvia(8000);
        setTasti({ [TASTO_DUELLO[altro].toLowerCase()]: () => prenota(altro) });
      };
      // prima fase: ognuno preme il suo tasto per dire che è in posizione, poi conto alla rovescia
      const pronti = [false, false];
      const pronto = g => {
        if (inGioco || pronti[g]) return;
        pronti[g] = true; tono(660 + g * 220, .08, 'triangle', .1);
        $(`.pronti-stato [data-g="${g}"]`, p).classList.add('ok');
        $(`.duellante[data-g="${g}"] .av-q`, p).innerHTML = AV.render(S.giocatori[g].avatar, 'felice');
        if (pronti[0] && pronti[1]) via();
      };
      let partito = false;
      const via = async () => {
        if (partito) return; partito = true;
        setTasti({});
        $('.btn-via', p).hidden = true;
        const conto = $('.conto', p);
        for (const n of ['3', '2', '1']) { conto.textContent = n; conto.classList.remove('batti'); void conto.offsetWidth; conto.classList.add('batti'); tono(520, .12, 'square', .07); await sleep(650); }
        // via: la domanda compare e si può prenotare
        $('.duello-pronti', p).hidden = true;
        $('.duello-gioco', p).hidden = false;
        tono(1040, .25, 'square', .08);
        [0, 1].forEach(g => { $(`.duellante[data-g="${g}"] .av-q`, p).innerHTML = AV.render(S.giocatori[g].avatar, 'stupito'); });
        inGioco = true;
        avvia(15000);
        setTasti({ q: () => prenota(0), p: () => prenota(1) });
        requestAnimationFrame(loop);
      };
      $$('.duellante', p).forEach(d => { d.onclick = () => (inGioco ? prenota : pronto)(+d.dataset.g); });
      $('.btn-via', p).onclick = via;
      btns.forEach(b => { b.onclick = () => rispondi(+b.dataset.i); });
      setTasti({ q: () => pronto(0), p: () => pronto(1), ' ': via });
      const loop = () => {
        if (finito) return;
        const rest = Math.max(0, scade - performance.now());
        barra.style.transform = `scaleX(${rest / durata})`;
        const sec = Math.ceil(rest / 1000);
        if (sec <= 3 && sec !== ultimoSec && sec > 0) { ultimoSec = sec; suono.urgente(); }
        if (rest <= 0) {
          if (chi >= 0) passaMano(chi);          // chi si era prenotato non ha risposto in tempo
          else return fine(-1);                  // nessuno si è prenotato
        }
        requestAnimationFrame(loop);
      };
    });
  }

  // dopo ogni risposta il gioco aspetta il vostro ok, così avete il tempo di leggere la soluzione
  function attendiAvanti(p) {
    return new Promise(res => {
      const es = $('.esito', p);
      const b = document.createElement('button');
      b.className = 'btn pieno btn-avanti';
      b.innerHTML = 'Avanti <span class="kbd">Spazio</span>';
      es.appendChild(b);
      const vai = () => { setTasti({}); b.disabled = true; res(); };
      b.onclick = vai;
      // piccola pausa, così chi ha appena premuto un tasto non salta la soluzione per sbaglio
      setTimeout(() => setTasti({ ' ': vai }), 450);
    });
  }

  // ---------- Messaggi ----------
  function messaggio({ titolo, testo, g, mood = 'felice', extra = '', bottone = 'Avanti' }) {
    const p = $('#pannello-msg');
    p.style.setProperty('--col', g != null ? COL[g] : 'var(--sole)');
    p.innerHTML = `${g != null ? `<div class="av-grande">${AV.render(S.giocatori[g].avatar, mood)}</div>` : ''}${extra}<h2 style="color:${g != null ? COL[g] : 'var(--ink)'}">${titolo}</h2>${testo ? `<p>${testo}</p>` : ''}<button class="btn pieno">${bottone} <span class="kbd">Spazio</span></button>`;
    $('#ov-msg').hidden = false;
    return new Promise(res => {
      const vai = () => { setTasti({}); $('#ov-msg').hidden = true; res(); };
      $('button', p).onclick = vai; setTasti({ ' ': vai });
    });
  }
  function siNo(contenitore, testo, siTxt, noTxt) {
    const box = document.createElement('div');
    box.className = 'scelta-sino';
    box.innerHTML = `<p>${testo}</p><div class="riga"><button class="btn pieno" data-v="1">${siTxt} <span class="kbd">S</span></button><button class="btn" data-v="0">${noTxt} <span class="kbd">N</span></button></div>`;
    contenitore.appendChild(box);
    return new Promise(res => {
      const fine = v => { setTasti({}); box.remove(); res(v); };
      $$('button', box).forEach(b => { b.onclick = () => fine(b.dataset.v === '1'); });
      setTasti({ s: () => fine(true), n: () => fine(false) });
    });
  }

  // ---------- Timbri ed eliminazioni ----------
  async function prendiTimbro(g, cat, rubato = false) {
    const opp = avv(g);
    S.giocatori[g].timbri[cat] = true;
    if (rubato) { delete S.giocatori[opp].timbri[cat]; statistica(g, 'rubati'); renderCarta(opp); }
    narra(rubato ? 'timbroRubato' : 'timbro', { g });
    renderCarta(g); suono.timbro();
    await sleep(900);
    const ov = vive(opp).length;
    const titolo = rubato ? `Timbro di ${CAT[cat].n} rubato!` : `Timbro di ${CAT[cat].n}`;
    const prima = rubato ? `${S.giocatori[opp].nome} perde il timbro e potrà riprenderselo alla sua Dogana. ` : '';
    if (ov <= 1) {
      await messaggio({ titolo, testo: `${prima}${S.giocatori[opp].nome} ha una sola meta rimasta ed è intoccabile. Questo timbro vale come vantaggio per la finale.`, g, extra: `<div style="width:7em;height:7em">${timbroSvg(cat, 0)}</div>` });
      return;
    }
    await messaggio({ titolo, testo: `${prima}Ora ${S.giocatori[g].nome} può spegnere una meta di ${S.giocatori[opp].nome}.`, g, extra: `<div style="width:7em;height:7em">${timbroSvg(cat, 0)}</div>`, bottone: 'Alla mappa' });
    await eliminazione(g, opp);
  }
  // Dogana volante: domanda nella categoria di un timbro che l'avversario ha e tu no. Giusta: il timbro passa a te.
  async function doganaVolante() {
    const g = S.turno, G = S.giocatori[g], opp = avv(g), O = S.giocatori[opp];
    const rubabili = CATS.filter(c => O.timbri[c] && !G.timbri[c]);
    if (!rubabili.length) {
      // niente da rubare: domanda normale che vale una carta aiuto
      const cat = casuale(CATS);
      const ok = await domanda(cat, { g, badge: 'Dogana volante, niente da rubare: vale una carta', esitoOk: 'Giusto! Carta aiuto in arrivo' });
      if (!ok) return passaTurno();
      await daCarta(g, 'Dogana volante');
      return iniziaTurno();
    }
    const cat = casuale(rubabili);
    await messaggio({ titolo: 'Dogana volante!', testo: `${G.nome} può rubare il timbro di <b>${CAT[cat].n}</b> a ${O.nome}. Basta rispondere giusto.`, g, mood: 'stupito', extra: `<div style="width:6em;height:6em">${timbroSvg(cat, 0)}</div>`, bottone: 'Alla domanda' });
    const ok = await domanda(cat, { g, badge: 'Dogana volante, ruba il timbro', esitoOk: 'Giusto! Timbro rubato', zittoSeGiusta: true });
    if (!ok) return passaTurno();
    if (eventoAttivo('happyhour')) await daCarta(g, 'Happy hour');
    await prendiTimbro(g, cat, true);
    if (await controllaFinale(g)) return;
    return iniziaTurno();
  }
  async function eliminazione(g, opp) {
    const sel = vive(opp).map(x => `${opp}-${x.i}`);
    const { map, k, chiudi } = await sceltaSullaMappa({
      titolo: `${S.giocatori[g].nome}, quale meta di ${S.giocatori[opp].nome} spegni?`, selezionabili: sel, col: COL[g],
    });
    const i = +k.split('-')[1], meta = S.giocatori[opp].mete[i];
    const G2 = S.giocatori[opp];
    if (G2.carte.includes('scudo')) {
      const usa = await siNo($('#ov-mappa-svg'), `${G2.nome}, vuoi usare lo <b>Scudo</b> per salvare <b>${esc(meta.n)}</b>?`, 'Sì, usa lo Scudo', 'No, tienilo');
      if (usa) {
        G2.carte.splice(G2.carte.indexOf('scudo'), 1);
        narra('scudo', { g: opp });
        $('#mappa-titolo').textContent = `Scudo! ${meta.n} resta accesa.`; suono.carta();
        map.els[k].classList.remove('puntata', 'selezionabile');
        await sleep(1800); chiudi(); [0, 1].forEach(renderCarta); return;
      }
    }
    $('#mappa-titolo').textContent = `${meta.n} si spegne…`;
    const n = map.els[k]; n.classList.remove('puntata', 'selezionabile'); n.classList.add('sfarfalla');
    suono.spegni();
    await sleep(1000);
    meta.viva = false; n.classList.remove('sfarfalla', 'accesa'); n.classList.add('spenta');
    const gem = gemella(opp, meta);
    if (gem >= 0 && S.giocatori[g].mete[gem].viva) {
      // meta in comune: si spegne solo la copia dell'avversario
      $('#mappa-titolo').textContent = `${meta.n} si spegne per ${G2.nome}, ma resta accesa per ${S.giocatori[g].nome}`;
      narra('spentaComune', { g, meta: meta.n });
    } else narra('spenta', { g, meta: meta.n });
    umore(opp, 'triste');
    await sleep(1500);
    chiudi(); [0, 1].forEach(renderCarta);
  }
  function sceltaSullaMappa({ titolo, aiuto, selezionabili, col }) {
    $('#mappa-titolo').innerHTML = esc(titolo);
    $('#mappa-titolo').style.color = col || 'var(--ink)';
    $('#mappa-aiuto').innerHTML = aiuto || 'Usa <span class="kbd">←</span><span class="kbd">→</span> e conferma con <span class="kbd">↵</span>, oppure clicca due volte';
    $('#ov-mappa').hidden = false;
    const map = disegnaMappa($('#ov-mappa-svg'));
    statoMete(map, { attenua: (g, i) => !selezionabili.includes(`${g}-${i}`) });
    const ordine = selezionabili.slice().sort((a, b) => posMeta(a).x - posMeta(b).x);
    ordine.forEach(k => map.els[k].classList.add('selezionabile'));
    let idx = 0;
    const punta = j => { idx = (j + ordine.length) % ordine.length; ordine.forEach(k => map.els[k].classList.remove('puntata')); map.els[ordine[idx]].classList.add('puntata'); suono.tick(); };
    punta(0);
    const chiudi = () => { $('#ov-mappa').hidden = true; };
    return new Promise(res => {
      const conferma = () => { setTasti({}); ordine.forEach(k => { map.els[k].onclick = null; }); res({ map, k: ordine[idx], chiudi }); };
      ordine.forEach((k, j) => { map.els[k].onclick = () => { if (idx === j) conferma(); else punta(j); }; });
      setTasti({ arrowleft: () => punta(idx - 1), ArrowLeft: () => punta(idx - 1), arrowright: () => punta(idx + 1), ArrowRight: () => punta(idx + 1), ArrowUp: () => punta(idx - 1), ArrowDown: () => punta(idx + 1), ' ': conferma });
    });
  }
  const posMeta = k => { const [g, i] = k.split('-').map(Number); return S.giocatori[g].mete[i]; };

  function vediMappa() {
    const salvati = tasti;
    $('#mappa-titolo').textContent = 'Le mete ancora in gara'; $('#mappa-titolo').style.color = 'var(--ink)';
    $('#mappa-aiuto').innerHTML = 'Chiudi con <span class="kbd">M</span> o <span class="kbd">Spazio</span>';
    $('#ov-mappa').hidden = false;
    const map = disegnaMappa($('#ov-mappa-svg'));
    statoMete(map);
    const chiudi = () => { $('#ov-mappa').hidden = true; setTasti(salvati); };
    setTasti({ m: chiudi, ' ': chiudi });
  }

  // ---------- Imprevisti ----------
  const CARTE = {
    scudo: { titolo: 'Scudo', peso: 3, testo: 'Tienila in mano. Quando l\'avversario prova a spegnere una tua meta, puoi usarla per salvarla.' },
    resurrezione: { titolo: 'Ritorno di fiamma', peso: 2, testo: 'Riaccendi una delle tue mete che era stata spenta.' },
    doppio: { titolo: 'Volo diretto', peso: 3, testo: 'Tira due dadi e muoviti della somma.' },
    difficile: { titolo: 'Controllo bagagli', peso: 3, testo: 'L\'avversario risponde a una domanda difficile. Se sbaglia, salta il prossimo turno.' },
    scambio: { titolo: 'Cambio di posto', peso: 2, testo: 'Scambi la tua posizione sul tabellone con quella dell\'avversario. Poi tiri ancora.' },
    '5050': { titolo: '50/50', peso: 2, testo: 'Tienila in mano. In una domanda a quattro risposte toglie due risposte sbagliate. Si usa con il tasto 5.' },
    cambio: { titolo: 'Cambio volo', peso: 2, testo: 'Tienila in mano. Se una domanda non ti piace, la cambi con un\'altra della stessa categoria. Si usa con il tasto 6.' },
  };
  // carte buone: chi è indietro di almeno 2 mete le pesca molto più spesso, così la partita resta aperta
  const CARTE_BUONE = ['scudo', 'resurrezione', '5050', 'cambio'];
  function pescaCarta(G) {
    const g = S.giocatori.indexOf(G);
    const indietro = vive(avv(g)).length - vive(g).length >= 2;
    const ok = Object.keys(CARTE).filter(id => {
      if (id === 'resurrezione') return G.mete.some(m => !m.viva);
      if (CARTE_MANO.includes(id)) return quante(G, id) < 2;
      if (id === 'scambio') return S.giocatori[0].pos !== S.giocatori[1].pos;
      return true;
    });
    const peso = id => CARTE[id].peso * (indietro ? (CARTE_BUONE.includes(id) ? 2.5 : .5) : 1);
    const tot = ok.reduce((a, id) => a + peso(id), 0);
    let r = Math.random() * tot;
    for (const id of ok) { r -= peso(id); if (r <= 0) return id; }
    return ok[0];
  }
  async function imprevisto() {
    const g = S.turno, G = S.giocatori[g], id = pescaCarta(G), C = CARTE[id];
    const p = $('#pannello-carta');
    p.innerHTML = `<div class="tipo">Imprevisto per ${esc(G.nome)}</div><div class="icona">${iconaSvg(id, INK, 2)}</div><h2>${C.titolo}</h2><p>${C.testo}</p><button class="btn">Avanti <span class="kbd">Spazio</span></button>`;
    $('#ov-carta').hidden = false; suono.carta(); narra('imprevisto', { g }, .45);
    await new Promise(res => { const vai = () => { setTasti({}); $('#ov-carta').hidden = true; res(); }; $('button', p).onclick = vai; setTasti({ ' ': vai }); });
    if (CARTE_MANO.includes(id)) { G.carte.push(id); renderCarta(g); return iniziaTurno(); }
    if (id === 'resurrezione') {
      const spente = G.mete.map((m, i) => ({ m, i })).filter(x => !x.m.viva).map(x => `${g}-${x.i}`);
      const { map, k, chiudi } = await sceltaSullaMappa({ titolo: `${G.nome}, quale meta riaccendi?`, selezionabili: spente, col: COL[g] });
      const meta = posMeta(k); meta.viva = true;
      narra('resurrezione', { g, meta: meta.n });
      const n = map.els[k]; n.classList.remove('spenta', 'puntata', 'selezionabile', 'attenuata'); n.classList.add('accesa');
      $('#mappa-titolo').textContent = `${meta.n} torna in gara!`; suono.accendi(8, g); umore(g, 'felice');
      await sleep(1800); chiudi(); renderCarta(g); return iniziaTurno();
    }
    if (id === 'doppio') {
      istruzione(`${nomeB(g)} tira due dadi`); attesa = 'tira'; $('#btn-tira').hidden = false;
      return new Promise(res => { const vai = () => { $('#btn-tira').onclick = () => { if (attesa === 'tira') tira(1); }; res(tira(2)); }; $('#btn-tira').onclick = vai; setTasti({ ' ': vai }); });
    }
    if (id === 'difficile') {
      const opp = avv(g);
      const ok = await domanda(casuale(CATS), { g: opp, diff: 3, badge: 'Controllo bagagli', esitoOk: `Giusto! ${S.giocatori[opp].nome} passa il controllo`, esitoKo: `. ${S.giocatori[opp].nome} salterà il prossimo turno` });
      if (!ok) S.giocatori[opp].salta = true;
      return iniziaTurno();
    }
    if (id === 'scambio') {
      const a = S.giocatori[0].pos; S.giocatori[0].pos = S.giocatori[1].pos; S.giocatori[1].pos = a;
      posizionaPedine(); suono.passo(); await sleep(800); return iniziaTurno();
    }
  }

  // ---------- Finale ----------
  async function controllaFinale(gUltimo) {
    const v0 = vive(0).length, v1 = vive(1).length;
    const completo = CATS.every(c => S.giocatori[gUltimo].timbri[c]);
    if (!(v0 === 1 && v1 === 1) && !completo) return false;
    attesa = null;
    if (completo && !(v0 === 1 && v1 === 1)) {
      await messaggio({ titolo: 'Passaporto completo!', testo: `${S.giocatori[gUltimo].nome} ha tutti e 6 i timbri. Si va dritti all'Ultimo volo: chi ha ancora più mete ne sceglie una da portare in finale.`, g: gUltimo });
    } else {
      await messaggio({ titolo: 'Ultimo volo', testo: 'È rimasta una meta a testa. Si decide tutto in finale.', g: null });
    }
    const finalisti = [];
    for (const g of [gUltimo, avv(gUltimo)]) {
      const vv = vive(g);
      if (vv.length === 1) { finalisti[g] = vv[0].i; continue; }
      const { k, chiudi } = await sceltaSullaMappa({ titolo: `${S.giocatori[g].nome}, quale meta porti in finale?`, selezionabili: vv.map(x => `${g}-${x.i}`), col: COL[g] });
      finalisti[g] = +k.split('-')[1]; chiudi();
    }
    const t = [0, 1].map(g => CATS.filter(c => S.giocatori[g].timbri[c]).length);
    const punti = [t[0] > t[1] ? 1 : 0, t[1] > t[0] ? 1 : 0];
    S.finale = { mete: finalisti, punti, turno: punti[0] === punti[1] ? (Math.random() < .5 ? 0 : 1) : (punti[0] < punti[1] ? 0 : 1), timbri: t };
    const metaA = S.giocatori[0].mete[finalisti[0]].n, metaB = S.giocatori[1].mete[finalisti[1]].n;
    if (metaA === metaB) {
      // stessa città in finale: il viaggio è deciso, l'Ultimo volo vale solo per l'onore
      S.finale.stessa = true;
      narra('finaleComune', { meta: metaA });
      await messaggio({ titolo: 'Stessa meta!', testo: `Avete portato tutti e due ${esc(metaA)} in finale. Il viaggio è deciso, si va a ${esc(metaA)}. L'Ultimo volo si gioca lo stesso, per l'onore.`, g: null });
    }
    S.fase = 'finale'; salva();
    schermoFinale();
    if (metaA !== metaB) setTimeout(() => narra('finale', { metaA, metaB }), 900);
    return true;
  }
  const PUNTI_FINALE = 5;   // risposte giuste per vincere l'Ultimo volo
  function schermoFinale() {
    avviaMusica();
    mostra('s-final');
    const F = S.finale;
    const blocco = g => { const G = S.giocatori[g], m = G.mete[F.mete[g]]; return `<div class="sfidante${F.turno === g ? ' attivo' : ''}" data-g="${g}"><div class="av" id="fav-${g}">${AV.render(G.avatar, 'neutro')}</div><div class="nome">${G.nome}</div><div class="meta-finale">${esc(m.n)}</div><div class="paese-finale">${esc(m.p)}, ${F.timbri[g]} ${F.timbri[g] === 1 ? "timbro" : "timbri"}</div><div class="punti">${Array.from({ length: PUNTI_FINALE }, (_, k) => k).map(k => `<i class="${k < F.punti[g] ? 'pieno' : ''}"></i>`).join('')}</div></div>`; };
    $('#duello').innerHTML = blocco(0) + '<div class="vs">vs</div>' + blocco(1);
    const vant = F.punti[0] !== F.punti[1] ? `${S.giocatori[F.punti[0] > F.punti[1] ? 0 : 1].nome} parte con un punto di vantaggio per i timbri. ` : '';
    $('#finale-istr').innerHTML = `${F.stessa ? 'Il viaggio è deciso, si gioca per l\'onore. ' : ''}${vant}Domanda per ${nomeB(F.turno)}`;
    const vai = async () => {
      setTasti({}); $('#btn-finale').disabled = true;
      const g = F.turno;
      const ok = await domanda(casuale(CATS), { g, badge: 'Ultimo volo', esitoKo: '' });
      if (ok) F.punti[g]++;
      $('#btn-finale').disabled = false;
      if (F.punti[g] >= PUNTI_FINALE) { salva(); return vittoria(g); }
      F.turno = avv(g); salva(); schermoFinale();
      $(`#fav-${g}`).innerHTML = AV.render(S.giocatori[g].avatar, ok ? 'felice' : 'triste');
    };
    $('#btn-finale').onclick = vai; setTasti({ ' ': vai });
  }
  async function vittoria(g) {
    S.fase = 'vittoria'; salva();
    const F = S.finale, meta = S.giocatori[g].mete[F.mete[g]];
    mostra('s-vittoria');
    S.giocatori.forEach((G, gg) => G.mete.forEach((m, i) => { m._fin = (gg === g && i === F.mete[g]) || (F.stessa && i === F.mete[gg]); }));
    const map = disegnaMappa($('#vittoria-mappa'));
    S.giocatori.forEach((G, gg) => G.mete.forEach((m, i) => {
      const n = map.els[`${gg}-${i}`]; n.classList.add(m._fin ? 'accesa' : 'spenta'); if (m._fin) n.classList.add('vincitrice'); else n.classList.add('attenuata');
    }));
    $('#vittoria-meta').textContent = meta.n;
    $('#vittoria-sub').innerHTML = F.stessa
      ? `${nomeB(g)} vince l'Ultimo volo e si tiene l'onore. Ma la meta l'avevate scelta tutti e due. Destinazione ${esc(meta.p)}, inizio febbraio. Si prenota!`
      : `Ha vinto ${nomeB(g)} all'Ultimo volo. Destinazione ${esc(meta.p)}, inizio febbraio. Si prenota!`;
    // zoom sulla meta
    const W = MAPPA.w, H = MAPPA.h, zw = 420, zh = zw * H / W;
    const da = [0, 0, W, H], a = [Math.max(0, Math.min(W - zw, meta.x - zw / 2)), Math.max(0, Math.min(H - zh, meta.y - zh * .66)), zw, zh];
    const t0 = performance.now();
    const step = t => { const k = Math.min(1, (t - t0) / 3200), e = 1 - Math.pow(1 - k, 3); map.svg.setAttribute('viewBox', da.map((v, j) => v + (a[j] - v) * e).join(' ')); if (k < 1) requestAnimationFrame(step); };
    setTimeout(() => requestAnimationFrame(step), 600);
    fermaMusica(1200); suono.fanfara(); coriandoli();
    setTimeout(() => narra('vittoria', { g, meta: meta.n }), 2600);
    try { localStorage.removeItem(SALVA_PARTITA); } catch (e) { }
    S.vincitore = g;
    const btnP = $('#btn-pagella');
    btnP.onclick = apriPagella;
    setTasti({ ' ': apriPagella });
  }
  // La pagella del Comandante: premi buffi calcolati sulle statistiche vere della serata
  function premiPagella() {
    const x = [stat(0), stat(1)], nome = g => NOMI[g];
    const premi = [];
    // chi vince un premio: il migliore secondo "meglio"; a pari merito vincono tutti e due
    const assegna = (titolo, val, meglio, testo, filtro = v => v != null) => {
      const v = [val(x[0]), val(x[1])];
      const ok = [0, 1].filter(g => filtro(v[g]));
      if (!ok.length) return;
      let vinc = ok.length === 1 ? ok : (v[0] === v[1] ? [0, 1] : [meglio(v[0], v[1]) ? 0 : 1]);
      premi.push({ titolo, g: vinc, testo: testo(v[vinc[0]], vinc) });
    };
    const sec = ms => (ms / 1000).toFixed(1).replace('.', ',');
    assegna('Fulmine', s => s.veloce, (a, b) => a < b, v => `Risposta giusta in ${sec(v)} secondi.`);
    assegna('Serie d\'oro', s => s.serieMax, (a, b) => a > b, v => `${v} risposte giuste di fila.`, v => v >= 2);
    assegna('Mani veloci', s => s.duelli, (a, b) => a > b, v => `${v} ${v === 1 ? 'duello vinto' : 'duelli vinti'}.`, v => v > 0);
    assegna('Ladro di timbri', s => s.rubati, (a, b) => a > b, v => `${v} ${v === 1 ? 'timbro rubato' : 'timbri rubati'} alla Dogana volante.`, v => v > 0);
    assegna('Cecchino', s => s.kmMin, (a, b) => a < b, v => v < 5 ? 'Città centrata in pieno sulla mappa.' : `Il clic più preciso sulla mappa, a ${v} km.`);
    assegna('Bussola rotta', s => s.kmMax, (a, b) => a > b, v => `L'errore più lontano sulla mappa, ${v} km.`);
    assegna('Tartaruga', s => s.scaduti, (a, b) => a > b, v => `${v} ${v === 1 ? 'volta' : 'volte'} il tempo è scaduto.`, v => v > 0);
    const perc = s => { const t = s.giuste + s.sbagliate; return t >= 4 ? Math.round(s.giuste * 100 / t) : null; };
    assegna('Primo della classe', perc, (a, b) => a > b, v => `${v}% di risposte giuste.`);
    return premi.map(p => ({ ...p, chi: p.g.length === 2 ? 'Pari merito' : nome(p.g[0]) }));
  }
  function apriPagella() {
    setTasti({});
    const x = [stat(0), stat(1)];
    const migliorePeggiore = s => {
      const c = Object.entries(s.cat).filter(([, v]) => v[1] >= 2).map(([k, v]) => ({ k, p: v[0] / v[1], n: v[1] }));
      if (!c.length) return ['', ''];
      c.sort((a, b) => b.p - a.p || b.n - a.n);
      const fmt = o => `${CAT[o.k].n} (${Math.round(o.p * 100)}%)`;
      return [fmt(c[0]), c.length > 1 ? fmt(c[c.length - 1]) : ''];
    };
    const colonna = g => {
      const s = x[g], tot = s.giuste + s.sbagliate, [mi, pe] = migliorePeggiore(s);
      return `<div class="pagella-gioc" style="--col:${COL[g]}"><div class="av">${AV.render(S.giocatori[g].avatar, 'felice')}</div>
        <div><b class="nome">${NOMI[g]}</b>
        <div>${s.giuste} giuste su ${tot}${tot ? ` (${Math.round(s.giuste * 100 / tot)}%)` : ''}</div>
        ${mi ? `<div>Forte in <b>${mi}</b></div>` : ''}${pe ? `<div>Da ripassare <b>${pe}</b></div>` : ''}</div></div>`;
    };
    const premi = premiPagella();
    const html = `<h2>La pagella del Comandante</h2><div class="pagella">
      <div class="pagella-gioc-riga">${colonna(0)}${colonna(1)}</div>
      <div class="premi">${premi.map((p, k) => `<div class="premio${p.g.length === 2 ? " pari" : ""}" style="--col:${p.g.length === 2 ? 'var(--sole)' : COL[p.g[0]]};--k:${k}"><div class="premio-titolo">${p.titolo}</div><div class="premio-chi">${p.chi}</div><div class="premio-testo">${p.testo}</div></div>`).join('') || '<p>Partita troppo corta per dare premi.</p>'}</div></div>`;
    narra('pagella', { g: S.vincitore ?? 0 });
    const p = $('#pannello-msg');
    p.classList.add('con-pagella');
    messaggio({ titolo: '', testo: '', g: null, extra: html, bottone: 'Chiudi' }).then(() => {
      p.classList.remove('con-pagella');
      setTasti({ ' ': apriPagella });
    });
  }
  function coriandoli() {
    const c = $('#coriandoli'); c.hidden = false;
    const x = c.getContext('2d'); c.width = innerWidth; c.height = innerHeight;
    const cols = ['#FFC531', '#2E8BEF', '#FF6FB5', '#3CC46B', '#9B5DE5', '#F0543C', '#FFFFFF'];
    const P = Array.from({ length: 220 }, () => ({ x: Math.random() * c.width, y: -Math.random() * c.height, v: 2 + Math.random() * 4, r: Math.random() * 6.28, vr: (Math.random() - .5) * .3, w: 6 + Math.random() * 8, col: casuale(cols), o: Math.random() * 6.28 }));
    const t0 = performance.now();
    const f = t => {
      x.clearRect(0, 0, c.width, c.height);
      for (const p of P) { p.y += p.v; p.o += .05; p.x += Math.sin(p.o) * 1.2; p.r += p.vr; x.save(); x.translate(p.x, p.y); x.rotate(p.r); x.fillStyle = p.col; x.fillRect(-p.w / 2, -p.w / 4, p.w, p.w / 2); x.restore(); }
      if (t - t0 < 9000) requestAnimationFrame(f); else c.hidden = true;
    };
    requestAnimationFrame(f);
  }

  // ---------- Regole ----------
  function apriRegole() {
    const salvati = tasti;
    $('#pannello-regole').innerHTML = `<h2>Come si gioca</h2>
      <div class="colonne">
      <div>
        <h3>Lo scopo</h3><p>Ognuno ha 5 mete accese sulla mappa. Vincendo timbri spegnete le mete dell'altro. Alla fine resta una meta a testa e l'Ultimo volo decide dove si va.</p>
        <h3>Il turno</h3><ul><li>Tira il dado e scegli se andare a sinistra o a destra.</li><li>Rispondi alla domanda della casella. Giusta: tiri ancora. Sbagliata: tocca all'altro.</li></ul>
        <h3>I tipi di domanda</h3><ul><li><b>Classica</b>: quattro risposte, 30 secondi.</li><li><b>Vero o falso lampo</b>: 10 secondi.</li><li><b>Metti in ordine</b>: premi i numeri nell'ordine giusto.</li><li><b>Dov'è sulla mappa?</b> (Geografia): clicca la città, vale entro ${SOGLIA_KM} km.</li><li><b>Bandiere</b> (Geografia): riconosci il paese o scegli la bandiera giusta, 20 secondi.</li></ul>
        <h3>Le Dogane</h3><ul><li>Una per categoria: rispondi giusto e prendi il timbro.</li><li>Ogni timbro nuovo spegne una meta dell'avversario, la scegli tu. L'ultima meta di ognuno è intoccabile.</li><li><b>Dogana volante</b> (casella Ruba!): domanda nella categoria di un timbro che l'altro ha e tu no. Giusta: il timbro passa a te e spegni una sua meta. Se non c'è niente da rubare vale una carta aiuto.</li></ul>
      </div>
      <div>
        <h3>Il Duello (casella VS)</h3><ul><li>Domanda per tutti e due. Prenotatevi: <span class="kbd">Q</span> ${esc(NOMI[0])}, <span class="kbd">P</span> ${esc(NOMI[1])}.</li><li>Chi sbaglia passa la mano all'altro. Chi vince prende una carta aiuto.</li><li>Se vince chi è di turno tira ancora, altrimenti il turno passa.</li></ul>
        <h3>Gli Imprevisti (casella ?)</h3><ul><li><b>Scudo</b>, <b>50/50</b> e <b>Cambio volo</b> si tengono in mano.</li><li><b>Ritorno di fiamma</b> riaccende una tua meta. <b>Volo diretto</b>: tiri due dadi.</li><li><b>Controllo bagagli</b>: domanda difficile all'altro, se sbaglia salta un turno. <b>Cambio di posto</b>: scambi la pedina.</li><li>Chi è indietro di 2 mete pesca più spesso le carte buone.</li></ul>
        <h3>Le carte aiuto</h3><ul><li><span class="kbd">5</span> <b>50/50</b>: toglie due risposte sbagliate.</li><li><span class="kbd">6</span> <b>Cambio volo</b>: cambia la domanda con un'altra.</li></ul>
      </div>
      <div>
        <h3>Gli eventi del Comandante</h3><ul><li>Ogni 4-5 turni il Comandante gira la sua ruota ed esce una regola speciale per un giro: Turbolenza (comandi invertiti), Happy hour (carta a ogni risposta giusta), Sciopero (dado fino a 3), Volo in ritardo (metà tempo), Vento in coda (due dadi).</li></ul>
        <h3>L'Ultimo volo</h3><ul><li>Quando resta una meta a testa, o qualcuno completa i 6 timbri.</li><li>Domande alternate: vince chi arriva prima a ${PUNTI_FINALE} risposte giuste. Chi ha più timbri parte con un punto.</li><li>Alla fine il Comandante consegna la pagella con i premi della serata.</li></ul>
        <h3>Tasti</h3><ul><li><span class="kbd">Spazio</span> tira e va avanti, <span class="kbd">←</span> <span class="kbd">→</span> direzione, <span class="kbd">1</span>–<span class="kbd">4</span> rispondi</li><li><span class="kbd">S</span> <span class="kbd">N</span> Scudo, <span class="kbd">M</span> mappa, <span class="kbd">F</span> schermo intero</li><li><span class="kbd">A</span> musica, <span class="kbd">C</span> zittisci il Comandante</li></ul>
      </div></div>
      <p style="text-align:center;margin-top:1em"><button class="btn pieno" id="chiudi-regole">Chiudi <span class="kbd">R</span></button></p>`;
    $('#ov-regole').hidden = false;
    const chiudi = () => { $('#ov-regole').hidden = true; setTasti(salvati); };
    $('#chiudi-regole').onclick = chiudi;
    setTasti({ r: chiudi, ' ': chiudi });
  }

  // ---------- Avvio ----------
  function aggiornaAudioBtn() {
    $('#btn-audio').classList.toggle('spento', !audioOn); $('#btn-audio').title = audioOn ? 'Effetti sonori accesi' : 'Effetti sonori spenti';
    $('#btn-musica').classList.toggle('spento', !musicaOn); $('#btn-musica').title = musicaOn ? 'Musica accesa (A)' : 'Musica spenta (A)';
  }
  function alternaMusica() {
    musicaOn = !musicaOn;
    try { localStorage.setItem('passaporto-musica', musicaOn ? '1' : '0'); } catch (e) { }
    if (musicaOn) { if (musicaVoluta) avviaMusica(); } else fermaMusica(500);
    aggiornaAudioBtn();
  }
  $('#btn-audio').onclick = () => { audioOn = !audioOn; try { localStorage.setItem('passaporto-audio', audioOn ? '1' : '0'); } catch (e) { } aggiornaAudioBtn(); };
  $('#btn-musica').onclick = alternaMusica;
  aggiornaAudioBtn();
  $('#btn-full').onclick = schermoIntero;
  $('#btn-regole-setup').onclick = apriRegole;
  $('#btn-via').onclick = avviaDaSetup;
  $('#btn-intro-avanti').onclick = () => tasti[' '] && tasti[' ']();
  $('#btn-rivincita').onclick = () => { $('#coriandoli').hidden = true; schermoSetup(); };
  $('#setup-griglia').addEventListener('change', () => salvaSetup());
  $('#btn-riprendi').onclick = () => {
    try { S = JSON.parse(localStorage.getItem(SALVA_PARTITA)); } catch (e) { return; }
    S.giocatori.forEach((G, g) => { G.avatar = AV_DEFAULT[g]; });
    if (S.fase === 'finale') return schermoFinale();
    schermoBoard(); iniziaTurno();
  };
  // Scorciatoia per provare: index.html#prova salta la preparazione e l'intro
  if (location.hash === '#prova') {
    setup = caricaSetup();
    S = { fase: 'board', turno: 0, usate: [], giocatori: [0, 1].map(g => ({ nome: NOMI[g], avatar: AV_DEFAULT[g], pos: 0, salta: false, carte: [], timbri: {}, mete: setup.mete[g].map(n => ({ ...trovaLuogo(n), viva: true })) })) };
    schermoBoard(); iniziaTurno();
  } else schermoStart();

  // Solo per le prove
  window.__passaporto = {
    get S() { return S; }, get musica() { return { src: musica.currentSrc, paused: musica.paused, volume: +musica.volume.toFixed(2), durata: Math.round(musica.duration), loop: musica.loop, tempo: Math.round(musica.currentTime) }; }, finale: () => controllaFinale(S.turno), imprevisto: () => imprevisto(),
    test: {
      domanda: (D, g = 0) => domanda(D.c, { D, g, badge: 'Controllo bagagli' }),
      messaggio: () => messaggio({ titolo: 'Timbro di Sport e spettacolo', testo: 'Claudia ha una sola meta rimasta ed è intoccabile. Questo timbro vale come vantaggio per la finale.', g: 0, extra: `<div style="width:7em;height:7em">${timbroSvg('spo', 0)}</div>` }),
      mappa: () => sceltaSullaMappa({ titolo: 'Alessandro, quale meta di Claudia spegni?', selezionabili: ['1-0', '1-1', '1-2'], col: COL[0] }),
      sino: () => { sceltaSullaMappa({ titolo: 'Prova', selezionabili: ['1-0'], col: COL[0] }); return siNo($('#ov-mappa-svg'), 'Claudia, vuoi usare lo <b>Scudo</b> per salvare <b>Dubrovnik</b>?', 'Sì, usa lo Scudo', 'No, tienilo'); },
      regole: () => apriRegole(), setup: () => schermoSetup(), intro: () => schermoIntro(),
      elimina: () => eliminazione(S.turno, avv(S.turno)),
      volante: () => doganaVolante(),
      pagella: () => apriPagella(),
      finale: () => { S.finale = { mete: [0, 2], punti: [1, 2], turno: 1, timbri: [3, 1] }; S.fase = 'finale'; schermoFinale(); },
      vittoria: (mete = [0, 2], stessa = false) => { S.finale = { mete, punti: [1, 3], turno: 1, timbri: [3, 1], stessa }; vittoria(1); },
      carta: () => { S.giocatori[0].carte = ['scudo', 'scudo']; renderCarta(0); },
      narra: (ev, dati) => narra(ev, dati),
      tipo: (cat, tipo, g = 0) => domanda(cat, { tipo, g }),
      duello: () => duello(),
      evento: async id => { S.turniContati = S.turniContati || 0; S.ultimoEvento = null; const k = Object.keys(EVENTI); while (true) { await avviaEvento(); if (!id || S.evento.id === id) break; } },
      carte: (g = 0) => { S.giocatori[g].carte = ['5050', 'cambio', 'scudo']; renderCarta(g); },
      zitto: () => { musicaVoluta = false; musica.pause(); },
    },
  };
})();
