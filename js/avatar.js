// Avatar SVG personalizzabili per il gioco Passaporto.
(function () {
  const OPZIONI = {
    viso: { label: 'Viso', valori: ['ovale', 'tondo', 'allungato'] },
    pelle: { label: 'Pelle', valori: ['#F7D9BE', '#EFC6A0', '#E0AE85', '#C98F64', '#A06A45', '#6E4630'] },
    capelli: { label: 'Capelli', valori: ['spettinati', 'corti', 'ciuffo', 'rasati', 'ricci', 'lisci lunghi', 'mossi lunghi', 'caschetto', 'raccolti', 'mezza lunghezza', 'calvo'] },
    coloreCapelli: { label: 'Colore', valori: ['#1E1A1A', '#3A2A21', '#5C3B26', '#7E5634', '#A47A4C', '#D3AE6C', '#9C4A2B', '#8E8C8A'] },
    meches: { label: 'Meches', valori: ['no', 'sì'] },
    occhi: { label: 'Occhi', valori: ['#4A2E1D', '#6B4A2A', '#6E7A3A', '#5E7A3A', '#4B7A9A', '#2F4F6B'] },
    barba: { label: 'Barba', valori: ['nessuna', 'accenno', 'corta', 'piena', 'baffi', 'pizzetto', 'baffi e pizzetto'] },
    occhiali: { label: 'Occhiali', valori: ['nessuno', 'sottili', 'a gatto', 'tondi', 'squadrati'] },
    orecchino: { label: 'Orecchino', valori: ['nessuno', 'cerchio con croce', 'punto luce'] },
    lentiggini: { label: 'Lentiggini', valori: ['no', 'sì'] },
    vestito: { label: 'Vestito', valori: ['girocollo', 'scollo a V', 'giacca di pelle'] },
    maglia: { label: 'Colore abiti', valori: ['#26262E', '#2E5E8C', '#C2475A', '#2F7D6B', '#D08A2E', '#5B4B8A', '#E4E0D6'] },
  };
  const BASE = { viso: 'ovale', pelle: '#EFC6A0', capelli: 'corti', coloreCapelli: '#3A2A21', meches: 'no', occhi: '#4A2E1D', barba: 'nessuna', occhiali: 'nessuno', orecchino: 'nessuno', lentiggini: 'no', vestito: 'scollo a V', maglia: '#2E5E8C' };
  const VISO = { ovale: [42, 52], tondo: [46, 50], allungato: [39, 53] };

  function shade(hex, f) {
    const n = parseInt(hex.slice(1), 16);
    let r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    r = Math.round(Math.min(255, Math.max(0, r * f))); g = Math.round(Math.min(255, Math.max(0, g * f))); b = Math.round(Math.min(255, Math.max(0, b * f)));
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
  const LUNGHI = ['lisci lunghi', 'mossi lunghi', 'mezza lunghezza', 'caschetto'];

  function capelliDietro(cfg) {
    const c = cfg.coloreCapelli, m = cfg.meches === 'sì' ? '#C9A06A' : null;
    const strisce = m ? `<g stroke="${m}" stroke-width="4" fill="none" stroke-linecap="round" opacity=".75"><path d="M56,112 C50,132 58,152 52,176"/><path d="M144,112 C150,132 142,152 148,176"/><path d="M64,124 C60,142 66,162 62,184" stroke-width="3"/><path d="M136,124 C140,142 134,162 138,184" stroke-width="3"/></g>` : '';
    switch (cfg.capelli) {
      case 'lisci lunghi': return `<path d="M52,92 C48,38 152,38 148,92 L154,182 C128,190 72,190 46,182 Z" fill="${c}"/>${strisce}`;
      case 'mossi lunghi': return `<path d="M52,92 C46,36 154,36 148,92 C156,110 146,124 156,140 C164,158 148,170 156,186 C126,194 74,194 44,186 C52,170 36,158 44,140 C54,124 44,110 52,92 Z" fill="${c}"/>${strisce}`;
      case 'caschetto': return `<path d="M54,92 C48,40 152,40 146,92 L150,146 C140,154 128,150 122,144 L78,144 C72,150 60,154 50,146 Z" fill="${c}"/>`;
      case 'mezza lunghezza': return `<path d="M54,92 C48,40 152,40 146,92 L150,160 C132,168 68,168 50,160 Z" fill="${c}"/>${strisce}`;
      case 'raccolti': return `<circle cx="100" cy="38" r="17" fill="${c}"/><circle cx="100" cy="38" r="17" fill="none" stroke="${shade(c, .75)}" stroke-width="2" stroke-dasharray="6 5"/>`;
      default: return '';
    }
  }

  function capelliDavanti(cfg) {
    const c = cfg.coloreCapelli, d = shade(c, .78), l = shade(c, 1.9);
    const m = cfg.meches === 'sì' && LUNGHI.includes(cfg.capelli) ? `<g stroke="#C9A06A" stroke-width="3" fill="none" stroke-linecap="round" opacity=".8"><path d="M118,64 C128,72 138,84 142,100"/><path d="M110,62 C116,70 124,78 132,84"/><path d="M80,72 C72,78 64,88 60,100"/></g>` : '';
    switch (cfg.capelli) {
      case 'spettinati': return `<path d="M57,100 C54,74 58,60 64,52 L58,40 L72,44 L70,30 L84,38 L88,22 L99,35 L108,21 L114,37 L127,28 L126,44 L139,39 L137,54 C143,64 146,80 143,100 C140,84 133,73 121,68 C110,74 89,75 73,73 C64,80 59,90 57,100 Z" fill="${c}"/><g stroke="${l}" stroke-width="1.8" fill="none" stroke-linecap="round" opacity=".5"><path d="M86,40 L92,58"/><path d="M106,36 L104,56"/><path d="M122,44 L116,60"/><path d="M72,48 L80,62"/></g>`;
      case 'corti': return `<path d="M57,98 C52,52 80,40 101,40 C124,40 148,52 143,98 C140,80 132,70 118,66 C104,73 84,74 70,71 C62,78 59,88 57,98 Z" fill="${c}"/>`;
      case 'ciuffo': return `<path d="M57,98 C52,56 70,44 84,42 C88,32 104,30 112,36 C126,32 146,46 143,98 C140,80 133,70 120,66 C112,72 96,60 90,66 C80,72 66,72 62,80 C59,86 58,92 57,98 Z" fill="${c}"/><path d="M96,44 C104,46 112,52 116,60" stroke="${d}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
      case 'rasati': return `<path d="M58,94 C56,56 80,44 100,44 C120,44 144,56 142,94 C138,76 124,64 100,63 C76,64 62,76 58,94 Z" fill="${c}" opacity=".55"/>`;
      case 'ricci': {
        let s = '';
        const pts = [[60, 86], [62, 70], [70, 57], [82, 48], [96, 44], [110, 45], [123, 50], [134, 60], [140, 74], [141, 88], [76, 66], [90, 60], [106, 59], [121, 64], [100, 52], [86, 52], [116, 52]];
        for (const [x, y] of pts) s += `<circle cx="${x}" cy="${y}" r="11" fill="${c}"/>`;
        return s + `<path d="M68,60 a6,6 0 0 1 8,-4 M104,48 a6,6 0 0 1 8,2 M128,64 a6,6 0 0 1 6,6" stroke="${d}" stroke-width="2" fill="none"/>`;
      }
      case 'lisci lunghi': case 'mezza lunghezza': case 'caschetto':
        return `<path d="M56,100 C50,50 78,40 102,40 C128,40 150,54 144,104 C140,84 132,72 116,64 C108,78 88,84 70,84 C62,88 58,94 56,100 Z" fill="${c}"/><path d="M116,64 C110,76 100,82 88,84" stroke="${d}" stroke-width="2" fill="none"/>${m}`;
      case 'mossi lunghi':
        return `<path d="M55,108 C46,50 78,37 103,37 C131,37 153,54 145,110 C143,90 137,77 123,66 C116,79 94,86 74,84 C64,92 58,100 55,108 Z" fill="${c}"/><path d="M123,66 C117,78 105,85 91,87 M74,70 C80,64 90,60 98,60" stroke="${d}" stroke-width="2" fill="none"/>${m}`;
      case 'raccolti':
        return `<path d="M57,98 C52,52 80,42 101,42 C124,42 148,52 143,98 C140,78 128,64 100,62 C74,64 60,78 57,98 Z" fill="${c}"/><path d="M100,44 C98,52 99,58 100,62" stroke="${d}" stroke-width="2" fill="none"/>`;
      case 'calvo': return `<path d="M58,102 C58,92 60,86 62,82 L64,100 Z M142,102 C142,92 140,86 138,82 L136,100 Z" fill="${c}" opacity=".7"/>`;
      default: return '';
    }
  }

  function barba(stile, c) {
    const baffi = `<path d="M80,119 C85,110 95,109 100,113 C105,109 115,110 120,119 C116,121 112,118 107,118 C104,118 102,119.5 100,119.5 C98,119.5 96,118 93,118 C88,118 84,121 80,119 Z" fill="${c}"/>`;
    switch (stile) {
      case 'accenno': return `<path d="M60,104 C60,140 80,150 100,150 C120,150 140,140 140,104 C137,120 128,130 116,132 C108,126 92,126 84,132 C72,130 63,120 60,104 Z" fill="${c}" opacity=".22"/>`;
      case 'corta': return `<path d="M60,102 C60,142 80,153 100,153 C120,153 140,142 140,102 C137,118 128,128 118,130 C110,123 90,123 82,130 C72,128 63,118 60,102 Z" fill="${c}" opacity=".92"/><path d="M86,116 C92,112 108,112 114,116 C108,118 92,118 86,116 Z" fill="${c}"/>`;
      case 'piena': return `<path d="M58,98 C56,150 82,164 100,164 C118,164 144,150 142,98 C138,118 130,128 118,128 C110,121 90,121 82,128 C70,128 62,118 58,98 Z" fill="${c}"/><path d="M84,117 C92,111 108,111 116,117 C108,120 92,120 84,117 Z" fill="${c}"/>`;
      case 'baffi': return `<path d="M83,118 C90,111 98,113 100,116 C102,113 110,111 117,118 C110,121 104,119 100,118 C96,119 90,121 83,118 Z" fill="${c}"/>`;
      case 'pizzetto': return `<path d="M88,136 C92,132 108,132 112,136 C110,148 104,152 100,152 C96,152 90,148 88,136 Z" fill="${c}"/><path d="M85,118 C92,112 108,112 115,118 C108,120 92,120 85,118 Z" fill="${c}"/>`;
      case 'baffi e pizzetto': return `<path d="M62,108 C62,138 80,150 100,151 C120,150 138,138 138,108 C136,124 128,134 116,136 C110,130 90,130 84,136 C72,134 64,124 62,108 Z" fill="${c}" opacity=".32"/>${baffi}<path d="M93.5,134 C96.5,132 103.5,132 106.5,134 C106.5,142 104,148.5 100,149.5 C96,148.5 93.5,142 93.5,134 Z" fill="${c}"/>`;
      default: return '';
    }
  }

  function occhiali(tipo) {
    const k = '#161616';
    switch (tipo) {
      case 'tondi': return `<g fill="rgba(255,255,255,.12)" stroke="${k}" stroke-width="3"><circle cx="84" cy="98" r="13"/><circle cx="116" cy="98" r="13"/></g><path d="M97,97 C99,94 101,94 103,97 M71,96 L59,92 M129,96 L141,92" stroke="${k}" stroke-width="3" fill="none"/>`;
      case 'squadrati': return `<g fill="rgba(255,255,255,.12)" stroke="${k}" stroke-width="3"><rect x="70" y="88" width="28" height="20" rx="5"/><rect x="102" y="88" width="28" height="20" rx="5"/></g><path d="M98,96 L102,96 M70,94 L59,91 M130,94 L141,91" stroke="${k}" stroke-width="3" fill="none"/>`;
      case 'sottili': return `<g fill="rgba(160,190,255,.12)" stroke="${k}" stroke-width="1.9"><path d="M70,90 L98,90 L97,104 C96,107 94,108 91,108 L76,108 C73,108 71,106 70.5,103 Z"/><path d="M130,90 L102,90 L103,104 C104,107 106,108 109,108 L124,108 C127,108 129,106 129.5,103 Z"/></g><path d="M98,93 C99.5,91.5 100.5,91.5 102,93 M70,92 L59,90 M130,92 L141,90" stroke="${k}" stroke-width="1.9" fill="none"/>`;
      case 'a gatto': return `<g fill="rgba(255,255,255,.12)" stroke="${k}" stroke-width="3.4" stroke-linejoin="round"><path d="M64,85 C72,88 88,87 98,92 C98,103 93,110 84,110 C74,110 69,103 68,95 Z"/><path d="M136,85 C128,88 112,87 102,92 C102,103 107,110 116,110 C126,110 131,103 132,95 Z"/></g><path d="M98,94 C99.5,92 100.5,92 102,94" stroke="${k}" stroke-width="3" fill="none"/><circle cx="66" cy="87" r="1.2" fill="#ddd"/><circle cx="134" cy="87" r="1.2" fill="#ddd"/>`;
      default: return '';
    }
  }

  function viso(cfg, mood) {
    const sk = cfg.pelle, skd = shade(sk, .86), ink = '#2a1d17', eye = cfg.occhi;
    const [rx, ry] = VISO[cfg.viso] || VISO.ovale;
    const hc = cfg.capelli === 'calvo' ? shade(cfg.coloreCapelli, 1.2) : cfg.coloreCapelli;
    let brows;
    if (mood === 'triste') brows = `<path d="M74,84 C80,82 88,79 92,76 M108,76 C112,79 120,82 126,84" stroke="${hc}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
    else if (mood === 'stupito') brows = `<path d="M74,76 C80,71 87,71 92,74 M108,74 C113,71 120,71 126,76" stroke="${hc}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
    else brows = `<path d="M74,82 C80,78 87,78 92,80 M108,80 C113,78 120,78 126,82" stroke="${hc}" stroke-width="4" fill="none" stroke-linecap="round"/>`;

    let eyes;
    if (mood === 'felice') eyes = `<path d="M76,99 C80,92 88,92 92,99 M108,99 C112,92 120,92 124,99" stroke="${ink}" stroke-width="3.6" fill="none" stroke-linecap="round"/>`;
    else {
      const r = mood === 'stupito' ? 7 : 6;
      eyes = '';
      for (const x of [84, 116]) eyes += `<ellipse cx="${x}" cy="98" rx="${r + 2.5}" ry="${r + 1.5}" fill="#fff"/><circle cx="${x}" cy="98.5" r="${r}" fill="${eye}"/><circle cx="${x}" cy="98.5" r="${r * .45}" fill="#140d0a"/><circle cx="${x + 2}" cy="96" r="1.7" fill="#fff"/>`;
    }
    let mouth;
    if (mood === 'felice') mouth = `<path d="M84,121 C90,136 110,136 116,121 Z" fill="#7a2630"/><path d="M87,122 L113,122 L112,126 C104,128 96,128 88,126 Z" fill="#fff"/>`;
    else if (mood === 'triste') mouth = `<path d="M89,131 C94,123 106,123 111,131" stroke="#7a2630" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
    else if (mood === 'stupito') mouth = `<ellipse cx="100" cy="127" rx="6" ry="8" fill="#7a2630"/>`;
    else mouth = `<path d="M88,122 C94,130 106,130 112,122" stroke="#7a2630" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;

    const lent = cfg.lentiggini === 'sì' ? `<g fill="#9a5a3a" opacity=".45">${[[78, 108], [82, 111], [75, 112], [86, 108], [122, 108], [118, 111], [125, 112], [114, 108], [95, 106], [105, 106]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.2"/>`).join('')}</g>` : '';
    const ex = 100 - rx, ex2 = 100 + rx;
    let orecchino = '';
    if (cfg.orecchino === 'cerchio con croce') orecchino = `<g stroke="#121212" stroke-width="2.2" fill="none" stroke-linecap="round"><circle cx="${ex - 1}" cy="112" r="4.2"/><path d="M${ex - 1},116 V128 M${ex - 4},120 H${ex + 2}"/></g>`;
    if (cfg.orecchino === 'punto luce') orecchino = `<circle cx="${ex}" cy="110" r="2.2" fill="#F3EEE4" stroke="#b9b2a6" stroke-width=".8"/><circle cx="${ex2}" cy="110" r="2.2" fill="#F3EEE4" stroke="#b9b2a6" stroke-width=".8"/>`;

    const orecchieCoperte = LUNGHI.includes(cfg.capelli);
    return `
      ${orecchieCoperte ? '' : `<ellipse cx="${ex}" cy="100" rx="8" ry="12" fill="${skd}"/><ellipse cx="${ex2}" cy="100" rx="8" ry="12" fill="${skd}"/>${orecchino}`}
      <ellipse cx="100" cy="96" rx="${rx}" ry="${ry}" fill="${sk}"/>
      <circle cx="76" cy="114" r="7" fill="#e86a6a" opacity=".18"/><circle cx="124" cy="114" r="7" fill="#e86a6a" opacity=".18"/>
      ${lent}
      ${barba(cfg.barba, cfg.coloreCapelli)}
      ${brows}${eyes}
      <path d="M100,102 C97,110 96,113 100,114 C102,114 104,113 104,112" stroke="${skd}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      ${mouth}${occhiali(cfg.occhiali)}`;
  }

  function vestito(cfg) {
    const m = cfg.maglia, md = shade(m, .72), ml = m === '#26262E' ? '#4a4a58' : shade(m, 1.25), skd = shade(cfg.pelle, .86);
    const busto = `<path d="M24,206 C26,168 58,152 100,152 C142,152 174,168 176,206 Z" fill="${m}"/><path d="M34,184 C40,168 56,160 74,157" stroke="${ml}" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".7"/><path d="M166,184 C160,168 144,160 126,157" stroke="${ml}" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".7"/>`;
    switch (cfg.vestito) {
      case 'girocollo': return busto + `<path d="M82,152 C86,164 114,164 118,152 Z" fill="${skd}"/><path d="M80,152 C85,167 115,167 120,152" stroke="${md}" stroke-width="4" fill="none"/>`;
      case 'giacca di pelle': return busto +
        `<path d="M78,146 C84,162 116,162 122,146 L126,160 C112,172 88,172 74,160 Z" fill="#4C505B"/><g fill="#C9CCD3" opacity=".7"><circle cx="86" cy="158" r="1.6"/><circle cx="96" cy="163" r="1.6"/><circle cx="108" cy="161" r="1.6"/><circle cx="117" cy="156" r="1.6"/></g>` +
        `<path d="M74,162 L90,190 L84,206 M126,162 L110,190 L116,206" stroke="${ml}" stroke-width="2.4" fill="none"/><path d="M100,170 V206" stroke="#BFC3CA" stroke-width="2.4"/><rect x="97.5" y="176" width="5" height="8" rx="1" fill="#D7DADF"/>`;
      default: return busto + `<path d="M84,152 L100,170 L116,152 Z" fill="${skd}"/><path d="M80,152 L100,174 L120,152" stroke="${md}" stroke-width="3" fill="none"/>`;
    }
  }

  // Avatar da foto con effetto fumetto: cfg.foto = { neutro, felice, triste, stupito }
  function renderFoto(foto, mood) {
    const src = foto[mood] || foto.neutro;
    const id = 'av' + Math.random().toString(36).slice(2, 8);
    return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="avatar-svg" aria-hidden="true">
      <defs><clipPath id="${id}"><circle cx="100" cy="100" r="98"/></clipPath></defs>
      <rect width="200" height="200" fill="#14233A" clip-path="url(#${id})"/>
      <image href="${src}" x="0" y="0" width="200" height="200" preserveAspectRatio="xMidYMid slice" clip-path="url(#${id})"/>
    </svg>`;
  }

  function render(cfgIn, mood = 'neutro', opts = {}) {
    if (cfgIn && cfgIn.ritratto && window.Ritratti) return window.Ritratti[cfgIn.ritratto](mood);
    if (cfgIn && cfgIn.foto) return renderFoto(cfgIn.foto, mood);
    const cfg = { ...BASE, ...cfgIn };
    const skd = shade(cfg.pelle, .86), bg = opts.bg || 'transparent';
    const id = 'av' + Math.random().toString(36).slice(2, 8);
    return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="avatar-svg" aria-hidden="true">
      <defs><clipPath id="${id}"><circle cx="100" cy="100" r="98"/></clipPath></defs>
      <g clip-path="url(#${id})">
        <rect width="200" height="200" fill="${bg}"/>
        ${capelliDietro(cfg)}
        <path d="M84,128 L116,128 L118,160 L82,160 Z" fill="${skd}"/>
        ${vestito(cfg)}
        ${viso(cfg, mood)}
        ${capelliDavanti(cfg)}
      </g></svg>`;
  }

  window.Avatar = { OPZIONI, BASE, render, shade };
})();
