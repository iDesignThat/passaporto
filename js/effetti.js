// Effetti sonori registrati (cartella audio/effetti). Suoni Kenney.nl con licenza CC0,
// suoni del pubblico da Pixabay (vedi LICENZE-pubblico.txt).
// Ogni voce può avere più varianti: il gioco ne sceglie una a caso, così non suona sempre uguale.
// Se una voce è vuota o un file manca, il gioco usa il suono sintetico di riserva.
(function () {
  const f = n => 'audio/effetti/' + n + '.ogg';
  const m = n => 'audio/effetti/' + n + '.mp3';
  window.EFFETTI = {
    tick: [f('click_001')],                                         // sorteggio e selezione sulla mappa
    dadoAgita: [f('dice-shake-1'), f('dice-shake-2'), f('dice-shake-3')],
    dadoLancia: [f('die-throw-1'), f('die-throw-2'), f('die-throw-3'), f('die-throw-4')],
    passo: [f('chip-lay-1'), f('chip-lay-2'), f('chip-lay-3')],     // la pedina che salta di casella
    luce: [f('switch_001'), f('switch_002'), f('switch_003')],      // interruttori durante l'accensione casuale
    accendi: [f('glass_004'), f('glass_001')],                      // una meta che si accende (riserva)
    accendiAle: [f('glass_001')],                                    // meta di Alessandro che si accende
    accendiCla: [f('glass_004')],                                    // meta di Claudia che si accende
    ok: [m('esultanza-1'), m('esultanza-2'), m('esultanza-3')],                         // il pubblico esulta, crescendo piano
    ko: [m('pubblico-deluso-1'), m('pubblico-deluso-2')],                                 // il pubblico fa "ooh"
    timbro: [f('impactWood_heavy_000'), f('impactWood_heavy_001'), f('impactWood_heavy_002')],
    scintilla: [f('glitch_001'), f('glitch_002'), f('glitch_003'), f('glitch_004')],
    interruttore: [f('switch_004')],
    carta: [f('card-slide-1'), f('card-slide-2'), f('card-slide-3')],
    fanfara: [f('vittoria-steel')],
    urgente: [f('tick_001'), f('tick_004')],
  };
})();
