/* Bandiere europee disegnate in SVG, per le domande "Bandiere" di Geografia.
   Ogni bandiera è descritta da un tipo e dai suoi colori, così il gioco può creare
   versioni "truccate" (colori scambiati, croce spostata, stemma girato) da mescolare
   alle risposte. n: nome, di: "della Francia" ecc., f: famiglia di bandiere simili. */
(function () {
  let uid = 0;
  const INK = '#1E1B3A';
  const apri = (w = 30, h = 20) => `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">`;
  const chiudi = (w = 30, h = 20) => `<rect width="${w}" height="${h}" fill="none" stroke="${INK}" stroke-width="${w > 40 ? 1.4 : .8}"/></svg>`;
  const stella = (cx, cy, r, col, rot = -90) => {
    const p = [];
    for (let k = 0; k < 10; k++) { const a = (rot + k * 36) * Math.PI / 180, rr = k % 2 ? r * .4 : r; p.push((cx + rr * Math.cos(a)).toFixed(2) + ',' + (cy + rr * Math.sin(a)).toFixed(2)); }
    return `<polygon points="${p.join(' ')}" fill="${col}"/>`;
  };

  // ---- disegni per tipo ----
  const DISEGNA = {
    // tre bande verticali
    v: ([a, b, c]) => apri() + `<rect width="10" height="20" fill="${a}"/><rect x="10" width="10" height="20" fill="${b}"/><rect x="20" width="10" height="20" fill="${c}"/>` + chiudi(),
    // tre bande orizzontali, con pesi (es. Spagna 1:2:1)
    o: ([a, b, c, pesi = [1, 1, 1]]) => {
      const tot = pesi[0] + pesi[1] + pesi[2], h0 = 20 * pesi[0] / tot, h1 = 20 * pesi[1] / tot;
      return apri() + `<rect width="30" height="${h0}" fill="${a}"/><rect y="${h0}" width="30" height="${h1}" fill="${b}"/><rect y="${h0 + h1}" width="30" height="${20 - h0 - h1}" fill="${c}"/>` + chiudi();
    },
    // due bande orizzontali
    b: ([a, b]) => apri() + `<rect width="30" height="10" fill="${a}"/><rect y="10" width="30" height="10" fill="${b}"/>` + chiudi(),
    // croce nordica: braccio verticale spostato verso l'asta (x=9), o al centro (x=15) nelle versioni truccate
    n: ([fondo, croce, bordo, x = 9]) => {
      const y = 10, s = bordo ? 4 : 3.2;
      let r = apri() + `<rect width="30" height="20" fill="${fondo}"/>`;
      if (bordo) r += `<rect x="${x - s / 2 - 1.2}" width="${s + 2.4}" height="20" fill="${bordo}"/><rect y="${y - s / 2 - 1.2}" width="30" height="${s + 2.4}" fill="${bordo}"/>`;
      return r + `<rect x="${x - s / 2}" width="${s}" height="20" fill="${croce}"/><rect y="${y - s / 2}" width="30" height="${s}" fill="${croce}"/>` + chiudi();
    },
    // croce svizzera (quadrata)
    ch: ([fondo, croce]) => apri(20, 20) + `<rect width="20" height="20" fill="${fondo}"/><rect x="8.1" y="4" width="3.8" height="12" fill="${croce}"/><rect x="4" y="8.1" width="12" height="3.8" fill="${croce}"/>` + chiudi(20, 20),
    // Grecia: righe e cantone con croce; strisce = numero di righe
    gr: ([a, b, strisce = 9]) => {
      const h = 18 / strisce;
      let r = apri(27, 18);
      for (let k = 0; k < strisce; k++) r += `<rect y="${k * h}" width="27" height="${h + .02}" fill="${k % 2 ? b : a}"/>`;
      return r + `<rect width="10" height="10" fill="${a}"/><rect x="4" width="2" height="10" fill="${b}"/><rect y="4" width="10" height="2" fill="${b}"/>` + chiudi(27, 18);
    },
    // Repubblica Ceca: due bande e triangolo all'asta (o dal lato sbagliato)
    cz: ([alto, basso, tri, destra = false]) => apri() + `<rect width="30" height="10" fill="${alto}"/><rect y="10" width="30" height="10" fill="${basso}"/><path d="${destra ? 'M30,0 L15,10 L30,20 Z' : 'M0,0 L15,10 L0,20 Z'}" fill="${tri}"/>` + chiudi(),
    uk: ([fondo, croce]) => {
      const id = 'uk' + (++uid);
      return apri(60, 30) + `<clipPath id="${id}"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/></clipPath>
        <rect width="60" height="30" fill="${fondo}"/>
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/>
        <path d="M0,0 L60,30 M60,0 L0,30" clip-path="url(#${id})" stroke="${croce}" stroke-width="4"/>
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"/>
        <path d="M30,0 v30 M0,15 h60" stroke="${croce}" stroke-width="6"/>` + chiudi(60, 30);
    },
    // Turchia: mezzaluna e stella; specchio = rivolta dall'altra parte
    tr: ([fondo, segno, specchio = false]) => {
      const m = x => specchio ? 30 - x : x;
      return apri() + `<rect width="30" height="20" fill="${fondo}"/><circle cx="${m(11)}" cy="10" r="5" fill="${segno}"/><circle cx="${m(12.3)}" cy="10" r="4" fill="${fondo}"/>${stella(m(17.3), 10, 2.5, segno, specchio ? 0 : 180)}` + chiudi();
    },
    // Bosnia: triangolo giallo e stelle lungo il lato lungo; specchio = triangolo girato
    ba: ([fondo, tri, specchio = false]) => {
      const m = x => specchio ? 30 - x : x;
      let r = apri() + `<rect width="30" height="20" fill="${fondo}"/><path d="M${m(8)},0 L${m(22)},0 L${m(22)},20 Z" fill="${tri}"/>`;
      for (let k = 0; k < 9; k++) { const y = -1 + k * 2.75; r += stella(m(8 + y * .7 - 2.5), y, 1.25, '#fff'); }
      return r + chiudi();
    },
    // Macedonia del Nord: sole con 8 raggi che si allargano
    mk: ([fondo, sole, raggi = 8]) => {
      const id = 'mk' + (++uid);
      let r = apri() + `<clipPath id="${id}"><rect width="30" height="20"/></clipPath><rect width="30" height="20" fill="${fondo}"/><g clip-path="url(#${id})">`;
      for (let k = 0; k < raggi; k++) {
        const a = (k * 360 / raggi) * Math.PI / 180, d = 1.7, l = 22, w = .28;
        const p1 = [15 + d * Math.cos(a - .5), 10 + d * Math.sin(a - .5)], p2 = [15 + d * Math.cos(a + .5), 10 + d * Math.sin(a + .5)];
        const q = [15 + l * Math.cos(a), 10 + l * Math.sin(a)];
        const q1 = [q[0] + l * w * Math.cos(a + Math.PI / 2), q[1] + l * w * Math.sin(a + Math.PI / 2)], q2 = [q[0] - l * w * Math.cos(a + Math.PI / 2), q[1] - l * w * Math.sin(a + Math.PI / 2)];
        r += `<polygon points="${[p1, q2, q1, p2].map(x => x.map(v => v.toFixed(2)).join(',')).join(' ')}" fill="${sole}"/>`;
      }
      return r + `</g><circle cx="15" cy="10" r="3.4" fill="${fondo}"/><circle cx="15" cy="10" r="2.7" fill="${sole}"/>` + chiudi();
    },
  };

  // ---- versioni truccate: piccole modifiche credibili alla bandiera vera ----
  const VARIANTI = {
    v: ([a, b, c]) => [['v', [c, b, a]], ['v', [b, a, c]], ['v', [a, c, b]], ['o', [a, b, c]]],
    o: ([a, b, c, p]) => [['o', [c, b, a, p]], ['o', [b, a, c, p]], ['o', [a, c, b, p]], ['v', [a, b, c]]],
    b: ([a, b]) => [['b', [b, a]], ['o', [a, b, a]], ['v', [a, b, a]]],
    n: ([f, c, b]) => [['n', [c, f, b]], ['n', [f, c, b, 15]], ...(b ? [['n', [f, b, c]], ['n', [b, c, f]]] : [['n', [f, '#FECC00']]])],
    ch: ([f, c]) => [['ch', [c, f]], ['ch', ['#002B7F', c]]],
    gr: ([a, b]) => [['gr', [b, a]], ['gr', [a, b, 7]], ['gr', ['#00A3DD', b]]],
    cz: ([a, b, t]) => [['cz', [b, a, t]], ['cz', [a, b, t, true]], ['cz', [a, t, b]]],
    uk: ([f, c]) => [['uk', [c, f]], ['uk', [f, '#FFCE00']]],
    tr: ([f, s]) => [['tr', [f, s, true]], ['tr', [s, f]], ['tr', ['#1E7B3C', s]]],
    ba: ([f, t]) => [['ba', [f, t, true]], ['ba', [t, f]], ['ba', ['#D52B1E', t]]],
    mk: ([f, s]) => [['mk', [s, f]], ['mk', [f, s, 6]], ['mk', ['#002B7F', s]]],
  };

  // [nome, "di …", famiglie, tipo, parametri]
  const N = '#1E1B1B';
  const ELENCO = [
    ['Italia', "dell'Italia", 'v verde', 'v', ['#009246', '#fff', '#CE2B37']],
    ['Francia', 'della Francia', 'v blu rosso', 'v', ['#0055A4', '#fff', '#EF4135']],
    ['Irlanda', "dell'Irlanda", 'v verde', 'v', ['#169B62', '#fff', '#FF883E']],
    ['Belgio', 'del Belgio', 'v nero giallo', 'v', [N, '#FDDA24', '#EF3340']],
    ['Romania', 'della Romania', 'v blu giallo', 'v', ['#002B7F', '#FCD116', '#CE1126']],
    ['Germania', 'della Germania', 'o nero giallo', 'o', [N, '#DD0000', '#FFCE00']],
    ['Paesi Bassi', 'dei Paesi Bassi', 'o blu rosso', 'o', ['#AE1C28', '#fff', '#21468B']],
    ['Lussemburgo', 'del Lussemburgo', 'o blu rosso', 'o', ['#EA141D', '#fff', '#51ADDA']],
    ['Austria', "dell'Austria", 'o rosso bianco', 'o', ['#C8102E', '#fff', '#C8102E']],
    ['Ungheria', "dell'Ungheria", 'o verde rosso', 'o', ['#CE2939', '#fff', '#477050']],
    ['Bulgaria', 'della Bulgaria', 'o verde rosso', 'o', ['#fff', '#00966E', '#D62612']],
    ['Lituania', 'della Lituania', 'o verde giallo', 'o', ['#FDB913', '#006A44', '#C1272D']],
    ['Estonia', "dell'Estonia", 'o blu nero', 'o', ['#0072CE', N, '#fff']],
    ['Russia', 'della Russia', 'o blu rosso', 'o', ['#fff', '#0039A6', '#D52B1E']],
    ['Lettonia', 'della Lettonia', 'o rosso bianco', 'o', ['#9E3039', '#fff', '#9E3039', [2, 1, 2]]],
    ['Spagna', 'della Spagna', 'o giallo rosso', 'o', ['#AA151B', '#F1BF00', '#AA151B', [1, 2, 1]]],
    ['Ucraina', "dell'Ucraina", 'b blu giallo', 'b', ['#0057B7', '#FFD700']],
    ['Polonia', 'della Polonia', 'b rosso bianco', 'b', ['#fff', '#DC143C']],
    ['Monaco', 'del Principato di Monaco', 'b rosso bianco', 'b', ['#CE1126', '#fff']],
    ['Danimarca', 'della Danimarca', 'n rosso bianco', 'n', ['#C8102E', '#fff']],
    ['Svezia', 'della Svezia', 'n blu giallo', 'n', ['#006AA7', '#FECC00']],
    ['Norvegia', 'della Norvegia', 'n rosso blu', 'n', ['#BA0C2F', '#00205B', '#fff']],
    ['Finlandia', 'della Finlandia', 'n blu bianco', 'n', ['#fff', '#002F6C']],
    ['Islanda', "dell'Islanda", 'n rosso blu', 'n', ['#02529C', '#DC1E35', '#fff']],
    ['Svizzera', 'della Svizzera', 'c rosso bianco', 'ch', ['#DA291C', '#fff']],
    ['Grecia', 'della Grecia', 'c blu bianco', 'gr', ['#0D5EAF', '#fff']],
    ['Repubblica Ceca', 'della Repubblica Ceca', 't blu rosso bianco', 'cz', ['#fff', '#D7141A', '#11457E']],
    ['Regno Unito', 'del Regno Unito', 'c blu rosso bianco', 'uk', ['#012169', '#C8102E']],
    ['Turchia', 'della Turchia', 'x rosso bianco', 'tr', ['#E30A17', '#fff']],
    ['Bosnia ed Erzegovina', 'della Bosnia ed Erzegovina', 't blu giallo', 'ba', ['#002395', '#FECB00']],
    ['Macedonia del Nord', 'della Macedonia del Nord', 'x rosso giallo', 'mk', ['#D20000', '#FFE600']],
  ];
  // firma di una bandiera come la vede l'occhio: tipo + colori ridotti a nomi semplici (rosso, blu, bianco…).
  // Serve a scartare le versioni truccate uguali a quella vera, tra loro, o a un'altra bandiera vera tra le risposte.
  function nomeColore(c) {
    if (typeof c !== 'string' || c[0] !== '#') return c;
    const hex = c.length === 4 ? c.slice(1).split('').map(x => x + x).join('') : c.slice(1);
    const n = parseInt(hex, 16), r = (n >> 16) / 255, g = (n >> 8 & 255) / 255, b = (n & 255) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2, s = max - min;
    if (s < .15) return l > .7 ? 'bianco' : 'nero';
    let h = max === r ? ((g - b) / s) % 6 : max === g ? (b - r) / s + 2 : (r - g) / s + 4;
    h = (h * 60 + 360) % 360;
    if (h < 18 || h >= 330) return 'rosso';
    if (h < 40) return 'arancio';
    if (h < 70) return 'giallo';
    if (h < 170) return 'verde';
    if (h < 200) return 'azzurro';
    return 'blu';
  }
  const firma = (t, p) => t + JSON.stringify(p.filter(x => x !== undefined).map(x => Array.isArray(x) ? x : nomeColore(x)));
  window.BANDIERE = ELENCO.map(([n, di, f, t, p]) => ({
    n, di, f: f.split(' '),
    svg: () => DISEGNA[t](p),
    firma: firma(t, p),
    // versioni truccate, senza doppioni e senza quella vera
    finte: () => {
      const viste = new Set([firma(t, p)]);
      return (VARIANTI[t] ? VARIANTI[t](p) : []).filter(([t2, p2]) => {
        const k = firma(t2, p2); if (viste.has(k)) return false; viste.add(k); return true;
      }).map(([t2, p2]) => ({ firma: firma(t2, p2), svg: () => DISEGNA[t2](p2) }));
    },
  }));
})();
