// Ritratti disegnati su misura di Alessandro e Claudia (stile cartoon), con 4 umori:
// neutro, felice (ha risposto giusto), triste (ha sbagliato), stupito (sta pensando).
// Quando sbaglia Alessandro diventa triste, Claudia invece si arrabbia e diventa rossa.
(function () {
  const uid = () => 'r' + Math.random().toString(36).slice(2, 8);

  // ---- pezzi comuni ----
  function occhio(x, y, iride, mood, opt = {}) {
    const ink = opt.ink || '#22170f';
    if (mood === 'felice') {
      return `<path d="M${x - 8.5},${y + 1.5} C${x - 4},${y - 5} ${x + 4},${y - 5} ${x + 8.5},${y + 1.5}" stroke="${ink}" stroke-width="3.4" fill="none" stroke-linecap="round"/>` +
        (opt.ciglia ? `<path d="M${x + (opt.lato * 8)},${y} l${opt.lato * 3.5},-3" stroke="${ink}" stroke-width="2" stroke-linecap="round"/>` : '');
    }
    const ry = mood === 'stupito' ? 7.8 : mood === 'triste' ? 5.2 : mood === 'arrabbiata' ? 5.6 : 6.2;
    const ri = mood === 'stupito' ? 4.6 : 4.8;
    let s = `<ellipse cx="${x}" cy="${y}" rx="8.6" ry="${ry}" fill="#fbf8f3"/>
      <circle cx="${x}" cy="${y + .4}" r="${ri}" fill="${iride}"/>
      <circle cx="${x}" cy="${y + .4}" r="${ri * .5}" fill="#120b07"/>
      <circle cx="${x + 1.8}" cy="${y - 1.6}" r="1.6" fill="#fff"/>
      <path d="M${x - 9},${y - .5} C${x - 5},${y - ry - 2} ${x + 5},${y - ry - 2} ${x + 9},${y - .5}" stroke="${ink}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
    if (mood === 'triste') s += `<path d="M${x - 9.5},${y - 3 - (opt.lato < 0 ? 2.5 : 0)} L${x + 9.5},${y - 3 - (opt.lato > 0 ? 2.5 : 0)} L${x + 9.5},${y - 10} L${x - 9.5},${y - 10} Z" fill="${opt.pelle}"/>`;
    // arrabbiata: la palpebra scende verso il naso (lato interno più basso)
    if (mood === 'arrabbiata') s += `<path d="M${x - 9.5},${y - (opt.lato < 0 ? 6.5 : 1)} L${x + 9.5},${y - (opt.lato < 0 ? 1 : 6.5)} L${x + 9.5},${y - 11} L${x - 9.5},${y - 11} Z" fill="${opt.pelle}"/>`;
    if (opt.ciglia) s += `<path d="M${x + opt.lato * 8.5},${y - 1.5} l${opt.lato * 3.8},-3.2 M${x + opt.lato * 6.5},${y - 4.8} l${opt.lato * 2.6},-3.4" stroke="${ink}" stroke-width="1.8" stroke-linecap="round"/>`;
    // occhio aperto e palpebra chiusa: il CSS li alterna per far sbattere gli occhi
    return `<g class="occhio-aperto">${s}</g><path class="occhio-chiuso" d="M${x - 9},${y + 1} C${x - 4},${y + 4} ${x + 4},${y + 4} ${x + 9},${y + 1}" stroke="${ink}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  }
  // ogni avatar sbatte gli occhi con un ritmo sfasato rispetto agli altri
  const svgApri = (id, extraDefs = '') => `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="avatar-svg" aria-hidden="true" style="--batt:-${(Math.random() * 6).toFixed(2)}s;--batt-dur:${(4.2 + Math.random() * 2.4).toFixed(2)}s"><defs><clipPath id="${id}"><circle cx="100" cy="100" r="98"/></clipPath>${extraDefs}</defs><g clip-path="url(#${id})">`;
  const svgChiudi = '</g></svg>';

  // ---------------- Alessandro ----------------
  function alessandro(mood) {
    const id = uid();
    const pelle = '#ECC29C', pelleOmbra = '#D7A57C', pelleScura = '#C08A62';
    const nero = '#191414', barbaCol = '#1d1716';
    const defs = `<radialGradient id="${id}-p" cx=".48" cy=".42" r=".62"><stop offset="0" stop-color="#F3CFAB"/><stop offset=".75" stop-color="${pelle}"/><stop offset="1" stop-color="${pelleOmbra}"/></radialGradient>`;
    const testa = 'M63,90 C62,62 79,47 100,47 C121,47 138,62 137,90 C137,106 135,118 130,128 C123,142 112,151 100,152 C88,151 77,142 70,128 C65,118 63,106 63,90 Z';

    let sopracciglia;
    if (mood === 'stupito') sopracciglia = `<path d="M74,80 C80,75 88,75 94,78 L94,81.5 C88,79.5 81,80 75,83.5 Z M126,80 C120,75 112,75 106,78 L106,81.5 C112,79.5 119,80 125,83.5 Z" fill="${nero}"/>`;
    else if (mood === 'triste') sopracciglia = `<path d="M74,89 C80,87 88,84 94,80 L95,83.5 C89,87 82,90 75,92 Z M126,89 C120,87 112,84 106,80 L105,83.5 C111,87 118,90 125,92 Z" fill="${nero}"/>`;
    else sopracciglia = `<path d="M73,86 C79,82.5 88,82 95,84.5 L94.5,88 C88,86.5 81,87 74,89.5 Z M127,86 C121,82.5 112,82 105,84.5 L105.5,88 C112,86.5 119,87 126,89.5 Z" fill="${nero}"/>`;

    let bocca;
    if (mood === 'felice') bocca = `<path d="M84,123 C90,138 110,138 116,123 C108,126 92,126 84,123 Z" fill="#6e2027"/><path d="M86,124 C94,126.5 106,126.5 114,124 L112.5,128 C105,130 95,130 87.5,128 Z" fill="#fff"/>`;
    else if (mood === 'triste') bocca = `<path d="M90,132 C95,127 105,127 110,132" stroke="#6e2027" stroke-width="3.2" fill="none" stroke-linecap="round"/>`;
    else if (mood === 'stupito') bocca = `<ellipse cx="100" cy="126.5" rx="4.2" ry="4.8" fill="#6e2027"/>`;
    else bocca = `<path d="M87,124 C93,131 107,131 113,124 C106,126.5 94,126.5 87,124 Z" fill="#6e2027"/><path d="M89,124.6 C95,126.4 105,126.4 111,124.6 L110,126.5 C104,128 96,128 90,126.5 Z" fill="#fff"/>`;

    return svgApri(id, defs) + `
      <!-- maglia nera girocollo -->
      <path d="M20,206 C24,170 58,156 100,156 C142,156 176,170 180,206 Z" fill="#222229"/>
      <path d="M30,186 C38,170 54,162 72,159" stroke="#3b3b47" stroke-width="2.5" fill="none" opacity=".8"/>
      <path d="M170,186 C162,170 146,162 128,159" stroke="#3b3b47" stroke-width="2.5" fill="none" opacity=".8"/>
      <path d="M87,136 L113,136 L115,160 C108,165 92,165 85,160 Z" fill="${pelleOmbra}"/>
      <path d="M87,140 C94,150 106,150 113,140 L113,146 C106,154 94,154 87,146 Z" fill="${pelleScura}" opacity=".45"/>
      <path d="M82,158 C88,167 112,167 118,158" stroke="#34343e" stroke-width="5" fill="none"/>
      <!-- orecchie e orecchino a cerchio con croce -->
      <ellipse cx="62" cy="101" rx="7" ry="11" fill="${pelleOmbra}"/><ellipse cx="138" cy="101" rx="7" ry="11" fill="${pelleOmbra}"/>
      <path d="M62,95 C59,98 59,104 62,107" stroke="${pelleScura}" stroke-width="1.6" fill="none"/>
      <path d="M138,95 C141,98 141,104 138,107" stroke="${pelleScura}" stroke-width="1.6" fill="none"/>
      <g stroke="#111" stroke-width="2.4" fill="none" stroke-linecap="round"><circle cx="140" cy="113.5" r="4.2"/><path d="M140,117.8 V130 M136.6,121.8 H143.4"/></g>
      <!-- viso -->
      <path d="${testa}" fill="url(#${id}-p)"/>
      <path d="M67,112 C70,124 76,134 84,140 C78,130 72,122 70,110 Z M133,112 C130,124 124,134 116,140 C122,130 128,122 130,110 Z" fill="${pelleScura}" opacity=".22"/>
      <!-- barba corta su guance e mascella -->
      <path d="M64,104 C64,124 74,142 88,149 C93,151.5 107,151.5 112,149 C126,142 136,124 136,104 C134,118 128,128 120,132 C114,128 108,126 100,126 C92,126 86,128 80,132 C72,128 66,118 64,104 Z" fill="${barbaCol}" opacity=".3"/>
      ${sopracciglia}
      ${occhio(85, 98, '#3b2416', mood, { lato: -1, pelle })}
      ${occhio(115, 98, '#3b2416', mood, { lato: 1, pelle })}
      <!-- naso lungo e dritto -->
      <path d="M99,92 C98.5,101 96.5,107 94.5,111.5 C96.5,114.5 103.5,114.5 105.5,111.5" stroke="${pelleScura}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
      <path d="M95,112 C97,110.5 98.5,111.5 99,113 M105,112 C103,110.5 101.5,111.5 101,113" stroke="${pelleScura}" stroke-width="1.6" fill="none"/>
      ${bocca}
      <!-- baffi folti e pizzetto stretto -->
      <path d="M81,122.5 C84,113 95,111.5 100,115.5 C105,111.5 116,113 119,122.5 C119.5,125.5 117,126.5 115.5,124.5 C111.5,119.5 106,119 100,120 C94,119 88.5,119.5 84.5,124.5 C83,126.5 80.5,125.5 81,122.5 Z" fill="${barbaCol}"/>
      <!-- pizzetto pieno sul mento -->
      <path d="M86.5,137 C90,133.5 96,133.5 100,135 C104,133.5 110,133.5 113.5,137 C114.5,145 110,153.5 100,157 C90,153.5 85.5,145 86.5,137 Z" fill="${barbaCol}"/>
      <path d="M94,142 C96,147 98,151 100,153 M106,142 C104,147 102,151 100,153" stroke="#3a302c" stroke-width="1.3" fill="none" stroke-linecap="round" opacity=".7"/>
      <path d="M96.5,133 C98.5,132 101.5,132 103.5,133 L102.5,135.5 C101,135 99,135 97.5,135.5 Z" fill="${barbaCol}" opacity=".85"/>
      <!-- capelli neri spettinati, tempie un po' alte -->
      <path d="M60,96 C56,78 58,62 66,54 C63,45 70,39 77,41 C77,33 86,29 93,33 C97,25 109,25 113,31 C120,27 130,32 129,40 C137,40 143,48 139,56 C145,64 144,80 140,96 C138,86 134,78 129,73 C124,72 118,70 114,66 C110,72 102,72 98,70 C92,74 84,74 78,70 C74,74 70,76 67,76 C64,82 61,88 60,96 Z" fill="${nero}"/>
      <path d="M75,45 L68,31 L82,39 Z M89,36 L89,19 L99,32 Z M105,32 L115,17 L116,32 Z M122,37 L136,27 L131,43 Z M136,52 L149,47 L141,59 Z M67,57 L54,52 L64,64 Z M96,34 L103,22 L106,33 Z" fill="${nero}"/>
      <path d="M84,70 L87,83 L94,71 Z M98,70 L104,82 L108,69 Z M112,67 L119,78 L120,68 Z" fill="${nero}"/>
      <g stroke="#4d4545" stroke-width="1.8" fill="none" stroke-linecap="round" opacity=".8"><path d="M78,46 C82,52 86,58 88,66"/><path d="M95,36 C96,46 97,54 99,64"/><path d="M110,34 C108,44 106,52 104,62"/><path d="M126,42 C122,50 118,56 114,62"/><path d="M68,60 C72,64 76,68 78,70"/><path d="M135,58 C132,62 130,66 128,70"/></g>
      <path d="M61,96 C60,88 61,82 63,78 L65,94 Z M139,96 C140,88 139,82 137,78 L135,94 Z" fill="${nero}" opacity=".55"/>
    ` + svgChiudi;
  }

  // ---------------- Claudia ----------------
  function claudia(mood) {
    const id = uid();
    // quando sbaglia Claudia non si rattrista: si arrabbia e diventa rossa
    const rabbia = mood === 'triste';
    if (rabbia) mood = 'arrabbiata';
    const pelle = rabbia ? '#F4A893' : '#F6D5BC', pelleOmbra = rabbia ? '#E07E6C' : '#E8B99A', pelleScura = rabbia ? '#C9604F' : '#D49A7A';
    const defs = `<radialGradient id="${id}-p" cx=".5" cy=".42" r=".62"><stop offset="0" stop-color="${rabbia ? '#F8BBA8' : '#FBE2CE'}"/><stop offset=".75" stop-color="${pelle}"/><stop offset="1" stop-color="${pelleOmbra}"/></radialGradient>
      <linearGradient id="${id}-c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4E362A"/><stop offset=".3" stop-color="#76553D"/><stop offset=".6" stop-color="#A9825A"/><stop offset="1" stop-color="#D2AF82"/></linearGradient>`;
    const capelli = `url(#${id}-c)`;
    const testa = 'M58,96 C58,64 76,47 100,47 C124,47 142,64 142,96 C142,124 126,149 100,151 C74,149 58,124 58,96 Z';

    let sopracciglia;
    if (mood === 'stupito') sopracciglia = `<path d="M73,79 C78,73 87,72 94,76" stroke="#5b3d2b" stroke-width="3.6" fill="none" stroke-linecap="round"/><path d="M127,79 C122,73 113,72 106,76" stroke="#5b3d2b" stroke-width="3.6" fill="none" stroke-linecap="round"/>`;
    else if (mood === 'arrabbiata') sopracciglia = `<path d="M72,79 C79,80 88,84 95,89" stroke="#4a2f20" stroke-width="4.6" fill="none" stroke-linecap="round"/><path d="M128,79 C121,80 112,84 105,89" stroke="#4a2f20" stroke-width="4.6" fill="none" stroke-linecap="round"/>`;
    else sopracciglia = `<path d="M73,86 C78,80 87,79 94,82" stroke="#5b3d2b" stroke-width="3.6" fill="none" stroke-linecap="round"/><path d="M127,86 C122,80 113,79 106,82" stroke="#5b3d2b" stroke-width="3.6" fill="none" stroke-linecap="round"/>`;

    let bocca, guance = '';
    if (mood === 'felice') bocca = `<path d="M82,122 C89,139 111,139 118,122 C109,125 91,125 82,122 Z" fill="#8a2c3a"/><path d="M84.5,123 C93,125.8 107,125.8 115.5,123 L113.8,127.5 C105,129.5 95,129.5 86.2,127.5 Z" fill="#fff"/><path d="M90,133 C96,136 104,136 110,133" stroke="#d26a7a" stroke-width="2" fill="none" opacity=".6"/>`;
    else if (mood === 'arrabbiata') {
      // denti stretti, rossore che pulsa
      bocca = `<rect x="86.5" y="122.5" width="27" height="10" rx="4.5" fill="#fff" stroke="#8a2c3a" stroke-width="2.4"/><path d="M87.5,127.5 H112.5 M93.5,123 V132 M100,123 V132 M106.5,123 V132" stroke="#8a2c3a" stroke-width="1.4"/>`;
      guance = `<path class="rossore" d="M58,96 C58,64 76,47 100,47 C124,47 142,64 142,96 C142,124 126,149 100,151 C74,149 58,124 58,96 Z" fill="#E8303A" opacity=".18"/><ellipse cx="76" cy="118" rx="12" ry="9" fill="#D9303A" opacity=".35"/><ellipse cx="124" cy="118" rx="12" ry="9" fill="#D9303A" opacity=".35"/>`;
    } else if (mood === 'stupito') bocca = `<ellipse cx="100" cy="129" rx="6" ry="7.5" fill="#8a2c3a"/><ellipse cx="100" cy="131.5" rx="3.6" ry="3" fill="#c25a68"/>`;
    else bocca = `<path d="M85,123 C92,132 108,132 115,123 C107,126 93,126 85,123 Z" fill="#8a2c3a"/><path d="M87,123.8 C94,126 106,126 113,123.8 L111.8,126.4 C105,128 95,128 88.2,126.4 Z" fill="#fff"/>`;

    const lentiggini = [[80, 108], [84, 111], [77, 113], [88, 108], [82, 105], [120, 108], [116, 111], [123, 113], [112, 108], [118, 105], [95, 104], [105, 104], [100, 107]]
      .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.15"/>`).join('');

    return svgApri(id, defs) + `
      <!-- capelli dietro -->
      <path d="M48,96 C40,36 160,36 152,96 C164,112 152,128 166,146 C178,164 160,180 172,206 L28,206 C40,180 22,164 34,146 C48,128 36,112 48,96 Z" fill="${capelli}"/>
      <!-- maglietta verde semplice, scollo tondo senza colletto -->
      <path d="M88,136 L112,136 L114,160 C107,164 93,164 86,160 Z" fill="${pelleOmbra}"/>
      <path d="M18,206 C22,172 56,158 84,157 C88,166 112,166 116,157 C144,158 178,172 182,206 Z" fill="#3E9E62"/>
      <path d="M30,188 C38,172 54,164 72,160" stroke="#62BC83" stroke-width="2.6" fill="none" stroke-linecap="round" opacity=".8"/>
      <path d="M170,188 C162,172 146,164 128,160" stroke="#62BC83" stroke-width="2.6" fill="none" stroke-linecap="round" opacity=".8"/>
      <!-- viso tondo -->
      <path d="${testa}" fill="url(#${id}-p)"/>
      <circle cx="76" cy="115" r="9" fill="#ee7f86" opacity=".22"/><circle cx="124" cy="115" r="9" fill="#ee7f86" opacity=".22"/>
      ${guance}
      <g fill="#a8643f" opacity=".42">${lentiggini}</g>
      <circle cx="106.5" cy="141" r="1.7" fill="#7a4a35"/>
      ${sopracciglia}
      ${occhio(85, 99, '#7C8B4A', mood, { lato: -1, ciglia: true, pelle })}
      ${occhio(115, 99, '#7C8B4A', mood, { lato: 1, ciglia: true, pelle })}
      <!-- naso tondo -->
      <path d="M100,101 C98.5,108 96.5,112 98.5,114.5 C100.5,116 104,115.5 105.5,113.5" stroke="${pelleScura}" stroke-width="2.3" fill="none" stroke-linecap="round"/>
      ${bocca}
      <!-- capelli davanti: riga quasi centrale, onde che scendono ai lati, schiariture -->
      <path d="M55,114 C44,58 74,36 101,36 C130,36 158,58 146,114 C143,94 137,80 127,71 C119,63 110,58 103,55 C97,59 86,64 77,73 C66,84 59,98 55,114 Z" fill="${capelli}"/>
      <!-- ciocche mosse che incorniciano il viso e scendono sulle spalle -->
      <path d="M60,92 C48,104 60,118 50,132 C40,146 54,160 44,174 C38,184 46,196 40,206 L24,206 C32,192 22,180 30,166 C38,152 26,138 36,124 C44,110 38,98 50,88 Z" fill="${capelli}"/>
      <path d="M140,92 C152,104 140,118 150,132 C160,146 146,160 156,174 C162,184 154,196 160,206 L176,206 C168,192 178,180 170,166 C162,152 174,138 164,124 C156,110 162,98 150,88 Z" fill="${capelli}"/>
      <path d="M62,100 C55,112 64,124 57,138 C51,150 60,162 54,176 L46,174 C52,160 43,150 49,136 C56,122 48,110 56,98 Z" fill="${capelli}"/>
      <path d="M138,100 C145,112 136,124 143,138 C149,150 140,162 146,176 L154,174 C148,160 157,150 151,136 C144,122 152,110 144,98 Z" fill="${capelli}"/>
      <g stroke="#E2C08F" stroke-width="2.6" fill="none" stroke-linecap="round" opacity=".75">
        <path d="M121,61 C133,70 141,84 143,102"/><path d="M111,57 C121,62 129,70 135,80"/>
        <path d="M84,64 C72,72 63,86 59,102"/>
        <path d="M46,112 C40,124 50,134 42,146 C36,156 46,166 38,178"/><path d="M154,112 C160,124 150,134 158,146 C164,156 154,166 162,178"/>
        <path d="M54,140 C50,150 56,160 50,172"/><path d="M146,140 C150,150 144,160 150,172"/>
        <path d="M34,184 C32,192 36,198 32,206"/><path d="M166,184 C168,192 164,198 168,206"/>
      </g>
      <g stroke="#5a3f2e" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".55"><path d="M70,70 C64,78 60,88 58,98"/><path d="M130,70 C136,78 140,88 142,98"/></g>
      <path d="M102,38 C101,45 101,51 103,55" stroke="#3a271d" stroke-width="1.6" fill="none"/>
      <!-- occhiali a gatto -->
      <g fill="rgba(255,255,255,.1)" stroke="#141414" stroke-width="2.5" stroke-linejoin="round"><path d="M64,88 C72,88.5 89,88 97.5,92.5 C98.5,104 94,112 84.5,112 C74,112 68.5,104 67.5,95 Z"/><path d="M136,88 C128,88.5 111,88 102.5,92.5 C101.5,104 106,112 115.5,112 C126,112 131.5,104 132.5,95 Z"/></g>
      <path d="M97.5,94.5 C99.3,92.6 100.7,92.6 102.5,94.5" stroke="#141414" stroke-width="2.4" fill="none"/>
      <circle cx="65.5" cy="88" r="1.2" fill="#e6e6e6"/><circle cx="134.5" cy="88" r="1.2" fill="#e6e6e6"/>
      ${rabbia ? `<g class="vena"><path d="M120,50 C124,50 125,51 125,55 M135,50 C131,50 130,51 130,55 M120,65 C124,65 125,64 125,60 M135,65 C131,65 130,64 130,60" stroke="#fff" stroke-width="6.5" fill="none" stroke-linecap="round"/><path d="M120,50 C124,50 125,51 125,55 M135,50 C131,50 130,51 130,55 M120,65 C124,65 125,64 125,60 M135,65 C131,65 130,64 130,60" stroke="#E0242E" stroke-width="3.4" fill="none" stroke-linecap="round"/></g>
      <g fill="#fff" stroke="#1E1B3A" stroke-width="1.6"><g class="vapore"><circle cx="38" cy="96" r="6"/><circle cx="31" cy="88" r="4.5"/></g><g class="vapore" style="animation-delay:-.7s"><circle cx="162" cy="96" r="6"/><circle cx="169" cy="88" r="4.5"/></g></g>` : ''}
    ` + svgChiudi;
  }

  // ---------------- Comandante Turbolenza (il narratore): versione "Pioniere anni Trenta" ----------------
  // Casco di pelle con paraorecchie, occhialoni sulla fronte, sciarpa al vento, baffetti a matita.
  // umori: 'neutro' (sorriso) e 'parla' (bocca aperta)
  function comandante(mood) {
    const id = uid();
    const pelle = '#F1C9A5', ombra = '#DDA982', INK = '#1E1B3A';
    const parla = mood === 'parla';
    // occhi con palpebra, per sbattere le ciglia come gli altri avatar
    const occhi = [84, 116].map(x => `
      <g class="occhio-aperto"><ellipse cx="${x}" cy="104" rx="8" ry="6.5" fill="#fff"/><circle cx="${x}" cy="104.5" r="4.4" fill="#3b2416"/><circle cx="${x}" cy="104.5" r="2" fill="#120b07"/><circle cx="${x + 1.6}" cy="102.6" r="1.4" fill="#fff"/>
        <path d="M${x - 8.5},103.5 C${x - 5},96 ${x + 5},96 ${x + 8.5},103.5" stroke="#22170f" stroke-width="2.4" fill="none" stroke-linecap="round"/></g>
      <path class="occhio-chiuso" d="M${x - 8.5},105 C${x - 4},108 ${x + 4},108 ${x + 8.5},105" stroke="#22170f" stroke-width="2.8" fill="none" stroke-linecap="round"/>`).join('');
    const bocca = parla
      ? `<ellipse cx="100" cy="135" rx="7" ry="6" fill="#6e2027"/><ellipse cx="100" cy="138" rx="4" ry="2.4" fill="#d9707e"/>`
      : `<path d="M89,133 C95,139 105,139 111,133" stroke="#6e2027" stroke-width="3.2" fill="none" stroke-linecap="round"/>`;
    // la figura è ingrandita dentro il cerchio (il cerchio resta della stessa misura)
    return svgApri(id) + `<g transform="translate(100 90) scale(1.34) translate(-100 -104)">
      <!-- sciarpa bianca al vento -->
      <path class="sciarpa" d="M150,150 C175,150 190,170 200,165 L200,185 C185,190 170,172 150,172 Z" fill="#fff" stroke="${INK}" stroke-width="2.5"/>
      <!-- giubbotto di pelle con collo di pelliccia -->
      <path d="M14,206 C18,168 56,154 100,154 C144,154 182,168 186,206 Z" fill="#7A4A2A"/>
      <path d="M60,160 C66,150 76,152 80,158 C86,148 96,150 100,157 C104,150 114,148 120,158 C124,152 134,150 140,160 C134,172 66,172 60,160 Z" fill="#EFE3C8" stroke="#CDBE9E" stroke-width="2"/>
      <path d="M86,134 L114,134 L116,158 L84,158 Z" fill="${ombra}"/>
      <path d="M80,152 C90,160 110,160 120,152 L124,160 C112,170 88,170 76,160 Z" fill="#fff" stroke="${INK}" stroke-width="2"/>
      <!-- viso -->
      <ellipse cx="100" cy="104" rx="40" ry="47" fill="${pelle}"/>
      <circle cx="74" cy="122" r="8" fill="#E8766F" opacity=".35"/><circle cx="126" cy="122" r="8" fill="#E8766F" opacity=".35"/>
      ${occhi}
      <path d="M73,92 C79,88 88,88 94,91 M106,91 C112,88 121,88 127,92" stroke="#5a3a22" stroke-width="3.6" fill="none" stroke-linecap="round"/>
      <path d="M100,106 C98,113 97,117 100,118 C102,118.5 104,117.5 105,116" stroke="${ombra}" stroke-width="2.3" fill="none" stroke-linecap="round"/>
      ${bocca}
      <!-- baffetti a matita -->
      <path class="baffi" d="M84,125 C90,121 96,122 100,124 C104,122 110,121 116,125 C112,124 106,125 100,126.5 C94,125 88,124 84,125 Z M84,125 L80,121 M116,125 L120,121" stroke="#2a1d17" stroke-width="2.4" fill="#2a1d17" stroke-linecap="round"/>
      <!-- casco di pelle con paraorecchie -->
      <path d="M56,106 C50,52 150,52 144,106 L145,132 C145,141 135,143 131,136 L129,104 C121,84 79,84 71,104 L69,136 C65,143 55,141 55,132 Z" fill="#8B5A34" stroke="${INK}" stroke-width="2.5"/>
      <path d="M100,56 V84 M66,80 C80,70 120,70 134,80" stroke="#6B4225" stroke-width="2" fill="none"/>
      <!-- occhialoni sulla fronte -->
      <path d="M58,76 C80,66 120,66 142,76" stroke="#4A2E1A" stroke-width="7" fill="none"/>
      <g stroke="#B8902F" stroke-width="4"><circle cx="83" cy="73" r="12" fill="#9ED8F5"/><circle cx="117" cy="73" r="12" fill="#9ED8F5"/></g>
      <path d="M77,68 L84,76 M111,68 L118,76" stroke="#fff" stroke-width="2.5" stroke-linecap="round" opacity=".8"/>
      <path d="M95,73 H105" stroke="#B8902F" stroke-width="4"/>
    </g>` + svgChiudi;
  }

  window.Ritratti = { alessandro, claudia, comandante };
})();
