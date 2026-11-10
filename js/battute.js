// Le battute del Comandante Turbolenza.
// Per ogni momento del gioco ci sono battute su Alessandro (ale), su Claudia (cla) e valide per tutti e due (tutti).
// Il gioco ne pesca una a caso senza ripetersi finché non le ha usate tutte.
// Segnaposto: {nome} chi è di turno, {altro} l'altro giocatore, {meta} una meta, {n} un numero, {metaA} e {metaB} le mete della finale.
window.BATTUTE = {
  inizio: {
    tutti: [
      'Signore e signori, benvenuti a bordo. Sono il Comandante Turbolenza. Stasera voliamo a quota trivia, con forti probabilità di figuracce. Allacciate le cinture.',
      'Qui è il vostro comandante. Il volo di stasera non ha ancora una destinazione. Ce l\'avrà quando avrete smesso di litigare.',
      'Buonasera passeggeri. Le uscite di emergenza sono due: la porta e il divano. Alessandro conosce benissimo la seconda.',
    ],
  },

  giusta: {
    ale: [
      'Risposta esatta per Alessandro! Se l\'è ricordata. Segnatevi la data, non ricapiterà presto.',
      'Bravo Alessandro. Ora però non sforzarti troppo, il divano potrebbe sentirsi trascurato.',
      'Alessandro risponde giusto. Ed è la cosa più faticosa che ha fatto questa settimana.',
      'Esatto! Dalla cabina confermiamo che non è stato un caso. Quasi sicuramente.',
      'Risposta giusta di Alessandro. La torre di controllo è commossa. Qualcuno porti un fazzoletto.',
    ],
    cla: [
      'Claudia risponde giusto. La temperatura in cabina sale di mezzo grado. Lo sappiamo perché ha già controllato tre termostati.',
      'Esatto! Claudia è precisa come il suo spazzolino da 250 euro. E altrettanto esagerata.',
      'Risposta perfetta di Claudia. Applaudite, o almeno fingete. Non volete vederla arrabbiata.',
      'Claudia indovina. Umidità in cabina al 48 per cento. Ce l\'ha detto la sua bilancia.',
      'Giusto! Claudia è più calda delle sue risposte. No, scusate, è il contrario: lei ha sempre freddo.',
    ],
  },

  sbagliata: {
    ale: [
      'Alessandro sbaglia. Niente paura, tra cinque minuti non se lo ricorderà nemmeno lui.',
      'Risposta sbagliata. Alessandro, ricordati dove sei seduto. Ah no, quello non te lo ricordi.',
      'Dalla torre di controllo segnalano che Alessandro ha perso la rotta. Di nuovo. Come sempre.',
      'Alessandro ha sbagliato con grande sicurezza. È lo stesso stile con cui sbaglia strada.',
      'Sbagliato. Alessandro dice che la sapeva ma l\'ha dimenticata. In effetti è plausibile.',
    ],
    cla: [
      'Claudia sbaglia. Vi prego, nessuno rida. Ripeto: NESSUNO rida. Ci tengo alla vita.',
      'Risposta errata. Claudia dà la colpa alla temperatura della stanza: 19 gradi e mezzo, inaccettabili.',
      'Claudia ha sbagliato. A casa, il suo spazzolino da 250 euro ha avuto un brivido.',
      'Peccato, Claudia. Passeggeri, evitate il contatto visivo e nessuno si farà male.',
      'Sbagliato. Claudia sostiene che la domanda era scritta male. Io sono d\'accordo con lei. Ho paura.',
    ],
  },

  // Alessandro sbaglia una domanda di geografia
  geografiaAle: {
    ale: [
      'Domanda di geografia sbagliata. Alessandro riesce a perdersi anche su una cartina.',
      'Alessandro, la geografia non è il tuo forte. Del resto tu ti perdi anche andando dal divano al bagno.',
      'Geografia sbagliata. Speriamo che in vacanza guidi Claudia. O il navigatore. O un passante qualunque.',
    ],
  },

  tempoScaduto: {
    ale: [
      'Tempo scaduto. Alessandro si è perso dentro la domanda. Come dentro un parcheggio.',
      'Trenta secondi e nessuna risposta. Alessandro è entrato in modalità risparmio energetico.',
      'Tempo finito. Alessandro stava ancora cercando di ricordare la domanda.',
    ],
    cla: [
      'Tempo scaduto! Claudia stava controllando l\'umidità prima di rispondere. Priorità.',
      'Trenta secondi di silenzio. Claudia ha le dita congelate, non riesce a premere il tasto.',
      'Tempo finito. Claudia era impegnata a leggere la temperatura sulla bilancia.',
    ],
  },

  serieGiuste: {
    ale: [
      '{n} risposte giuste di fila per Alessandro! Qualcuno controlli che sia davvero lui e non un sosia sveglio.',
      'Alessandro è a {n} di fila. A casa, il divano si sente tradito.',
      '{n} di fila! Alessandro non si è mai mosso così tanto senza alzarsi.',
    ],
    cla: [
      '{n} di fila per Claudia! Precisione da termostato digitale. Ne ha sei in casa, si allena.',
      'Claudia inanella {n} risposte giuste. Mai stata così calda. E ci vuole impegno.',
      '{n} di fila. Claudia è inarrestabile. Ma attenzione: se poi sbaglia, ci arrabbiamo tutti. Soprattutto lei.',
    ],
  },

  serieSbagliate: {
    ale: [
      'Alessandro: {n} errori di fila. Il suo navigatore interno sta ricalcolando il percorso. Da trent\'anni.',
      '{n} sbagliate di fila. Alessandro, se ti perdi usa il divano come punto di riferimento.',
      '{n} errori consecutivi. Alessandro chiede un caffè. Non per svegliarsi, per scusarsi.',
    ],
    cla: [
      '{n} errori di fila per Claudia. Il clima si sta surriscaldando. Ed è l\'unica cosa calda in casa.',
      'Claudia è a {n} errori. Il personale di bordo si è nascosto nella stiva.',
      '{n} errori di fila. Qualcuno porti una coperta a Claudia. E un elmetto a tutti gli altri.',
    ],
  },

  timbro: {
    ale: [
      'Timbro per Alessandro! È la prima volta che arriva a una dogana senza sbagliare strada.',
      'Alessandro conquista un timbro. Applauso dalla cabina. Piano però, non vogliamo stancarlo.',
      'Timbro! Alessandro dice che se lo ricorderà per sempre. Diciamo fino a stasera.',
    ],
    cla: [
      'Timbro per Claudia! Messo sul passaporto con la cura con cui regola il termostato.',
      'Claudia timbra. La dogana ringrazia e alza il riscaldamento, per sicurezza.',
      'Timbro conquistato. Claudia l\'ha misurato: 21 gradi, 45 per cento di umidità. Perfetto.',
    ],
  },

  // {nome} ha appena spento {meta} dell'altro
  spenta: {
    ale: [
      'Alessandro ha spento {meta}. Coraggioso. Claudia, conta fino a dieci. Anzi, fino a cento.',
      'Addio {meta}, spenta da Alessandro. Signore e signori, è stato un uomo coraggioso. È stato.',
      'Alessandro spegne {meta}. Probabilmente non sapeva neanche dov\'era sulla cartina.',
      'Alessandro ha eliminato {meta}. Passeggeri, se sentite urlare è solo Claudia. Mantenete la calma.',
    ],
    cla: [
      'Claudia ha spento {meta}. Tanto Alessandro se ne sarebbe dimenticato entro domani.',
      'Addio {meta}! Spenta senza pietà da Claudia. Lì faceva troppo freddo, evidentemente.',
      'Claudia spegne {meta}. Alessandro, non prenderla male. Tanto non avresti trovato l\'aeroporto.',
      'Claudia elimina {meta}. Ha controllato le previsioni: umidità troppo alta. Non si discute.',
    ],
  },

  scudo: {
    ale: [
      'Alessandro usa lo Scudo! Il gesto più atletico della sua carriera.',
      'Scudo alzato da Alessandro. È riuscito a ricordarsi di averlo. Applausi.',
    ],
    cla: [
      'Scudo di Claudia! Respinto, come chiunque provi ad abbassare il riscaldamento.',
      'Claudia para con lo Scudo. Alessandro, te l\'avevamo detto di non farla arrabbiare.',
    ],
  },

  imprevisto: {
    tutti: [
      'Imprevisto per {nome}. Niente panico, è solo un piccolo vuoto d\'aria.',
      'Qui è il comandante: {nome} ha pescato un imprevisto. Gli assistenti di volo trattengono le risate.',
    ],
    ale: ['Imprevisto per Alessandro. Per lui lo è anche trovare le chiavi di casa.'],
    cla: ['Imprevisto per Claudia. Il più grave della sua vita resta il termostato scarico.'],
  },

  dadoAlto: {
    ale: ['Sei! Alessandro fa sei caselle. Tre in più dei passi che fa in una domenica.'],
    cla: ['Sei per Claudia. Corre veloce, si vede che ha freddo.'],
  },
  dadoBasso: {
    ale: ['Uno. Alessandro avanza di una casella. In linea con il suo stile di vita.'],
    cla: ['Uno. Claudia avanza di una casella, poi si ferma a controllare la temperatura.'],
  },

  saltaTurno: {
    ale: ['Alessandro salta il turno. Per lui è un\'ottima notizia: può riposare.'],
    cla: ['Claudia salta il turno. Consiglio a tutti di restare immobili e non fare battute. Io sono in cabina blindata, quindi la faccio lo stesso.'],
  },

  resurrezione: {
    ale: ['Alessandro riaccende {meta}. Se l\'era dimenticata, poi gli è tornata in mente. Un miracolo.'],
    cla: ['Claudia riaccende {meta}. Come un termosifone a novembre: con decisione.'],
  },

  // nessuno tira il dado da un po'
  attesa: {
    ale: [
      'Alessandro, tocca a te. Lo so che tirare il dado è faticoso, ma crediamo in te.',
      'Torre di controllo ad Alessandro: il dado non si tira da solo. Ripeto: non si tira da solo.',
    ],
    cla: [
      'Claudia, tocca a te. Se hai le mani fredde c\'è una coperta sul divano. Alessandro sa dov\'è, ci vive.',
      'Claudia, il dado ti aspetta. Ha 20 gradi esatti, l\'abbiamo misurato apposta per te.',
    ],
  },

  finale: {
    tutti: [
      'Signore e signori, inizia l\'Ultimo volo: {metaA} contro {metaB}. Tenete le mani dentro l\'aereo e lontano da oggetti contundenti.',
      'Ultimo volo: {metaA} contro {metaB}. Chi perde paga la cena. Non è nelle regole, l\'ho deciso io.',
    ],
  },

  vittoria: {
    ale: [
      'Atterraggio completato: si va a {meta}! Vince Alessandro. Claudia, respira. Respira. Lontano da noi.',
      'Si parte per {meta}! Alessandro, un consiglio: in vacanza lascia guidare il navigatore. E Claudia.',
    ],
    cla: [
      'Si vola a {meta}! Vince Claudia. Alessandro, metti in valigia tre maglioni: lei ne vorrà almeno due dei tuoi.',
      'Atterrati a {meta}. Claudia ha già controllato meteo, umidità e pressione. Buon viaggio a tutti!',
    ],
  },

  // ---- Duello ----
  duelloVinto: {
    ale: [
      'Duello vinto da Alessandro! Ha premuto il tasto prima di lei. È la cosa più veloce che abbia mai fatto.',
      'Alessandro vince il duello. Riflessi fulminei. Peccato che li usi solo una volta all\'anno.',
    ],
    cla: [
      'Duello a Claudia! Mano rapidissima. Si vede che è allenata a regolare i termostati al volo.',
      'Claudia vince il duello. Alessandro stava ancora cercando il tasto. Era la Q, Alessandro. La Q.',
    ],
  },
  duelloNessuno: {
    tutti: [
      'Nessuno vince il duello. Due passeggeri, zero risposte. La compagnia aerea è commossa.',
      'Duello nullo. Vi ricordo che il tasto si preme, non si guarda.',
    ],
  },

  // ---- Domande sulla mappa ----
  mappaAle: {
    ale: [
      'Alessandro ha cliccato a {n} chilometri dalla città. Fortuna che oggi guida la torre di controllo.',
      '{n} chilometri di errore. Alessandro, era una cartina, non un labirinto.',
      'Alessandro ha mancato di {n} chilometri. Ora capiamo come fa a perdersi tra il divano e il bagno.',
    ],
  },
  mappaLontano: {
    cla: [
      'Claudia è a {n} chilometri dalla città. Forse lì il clima era più caldo e si è distratta.',
      '{n} chilometri di errore per Claudia. Nessuno lo dica ad alta voce, per il bene di tutti.',
    ],
  },
  mappaPrecisa: {
    ale: ['Solo {n} chilometri! Alessandro ha trovato la città. Qualcuno controlli se ha usato il navigatore.'],
    cla: ['Appena {n} chilometri! Claudia centra la città con la precisione di un termometro digitale.'],
  },

  // ---- Carte aiuto ----
  cinquanta: {
    ale: ['Alessandro usa il 50/50. Due risposte in meno da dimenticare.'],
    cla: ['Claudia usa il 50/50. Taglia le risposte come taglia corto quando ha freddo.'],
  },
  cambio: {
    ale: ['Alessandro cambia volo. Questa domanda era troppo faticosa, ne serve una più comoda.'],
    cla: ['Claudia cambia volo. La domanda di prima non era alla temperatura giusta.'],
  },

  // ---- Eventi ----
  evento_turbolenza: { tutti: ['Turbolenza! I comandi sono invertiti. Alessandro, per te non cambia niente: sbagli direzione comunque.'] },
  evento_happyhour: { tutti: ['Happy hour a bordo! Ogni risposta giusta vale una carta. Claudia, il cocktail è servito tiepido, come piace a te.'] },
  evento_sciopero: { tutti: ['Sciopero dei voli. Il dado lavora a mezzo servizio. Alessandro si sente finalmente capito.'] },
  evento_ritardo: { tutti: ['Volo in ritardo! Avete metà del tempo. Alessandro, niente pisolino durante le domande.'] },
  evento_vento: { tutti: ['Vento in coda! Due dadi per tutti. Claudia, chiudi il finestrino che entra l\'aria.'] },
  eventoFinito: { tutti: ['Fine dell\'evento speciale. Si torna a volare normali. Più o meno.', 'Evento concluso. Riportate i sedili in posizione verticale.'] },
};

// ---- Seconda infornata di battute ----
// Alessandro: dormiglione, sviluppatore web in smart working, sa tutto di tecnologia, pieno di chitarre che non sa suonare, non sopporta la raffica di bacini.
// Claudia: serie TV coreane, maestra di sostegno alle elementari (ne incassa di tutti i colori), coccole e bacini a raffica, copertine all'uncinetto per i neonati degli amici.
(function () {
  const extra = {
    inizio: { tutti: [
      'Benvenuti a bordo. Stasera in cabina abbiamo uno sviluppatore web in smart working e una maestra che ne ha viste di tutti i colori. Vinca il meno ammaccato.',
      'Passeggeri, il volo è partito con un leggero ritardo. Abbiamo dovuto svegliare Alessandro.',
    ] },
    giusta: {
      ale: [
        'Esatto! Alessandro ha cercato la risposta su Google con il pensiero. Da vero sviluppatore.',
        'Risposta giusta! Se suonasse la chitarra come risponde alle domande, sarebbe già in tour.',
        'Bravo Alessandro. Claudia, trattieniti: niente raffica di bacini, lo sai che non la sopporta.',
        'Giusto! Alessandro sa tutto di tecnologia e, a sorpresa, anche di qualcos\'altro.',
      ],
      cla: [
        'Esatto! Claudia l\'ha imparato da una serie coreana di sedici puntate. Sottotitolata.',
        'Giusto! Claudia corregge le risposte come i compiti dei suoi alunni: con pazienza e penna rossa.',
        'Risposta perfetta. Claudia festeggia riempiendo Alessandro di bacini. Lui chiede asilo politico alla cabina.',
        'Brava Claudia! Un punto in più, come i punti della copertina numero quarantasette.',
      ],
    },
    sbagliata: {
      ale: [
        'Sbagliato. Alessandro dà la colpa a un bug. Ha già aperto un ticket.',
        'Risposta errata. Alessandro giura che sul suo computer funzionava.',
        'Alessandro sbaglia. Dormiva? Domanda inutile: dormiva.',
        'Sbagliato. Alessandro aveva la risposta sulla punta della lingua, vicino all\'accordo di chitarra che non sa fare.',
      ],
      cla: [
        'Claudia sbaglia. Era distratta: pensava al finale della sua serie coreana.',
        'Sbagliato. Claudia incassa senza battere ciglio: in classe ne incassa di peggio ogni mattina.',
        'Risposta errata. Per consolarsi Claudia sta già sbaciucchiando Alessandro. Lui si consola molto meno.',
        'Claudia sbaglia. Niente di grave: c\'è sempre un neonato nuovo a cui fare una copertina.',
      ],
    },
    tempoScaduto: {
      ale: [
        'Tempo scaduto. Alessandro si è addormentato a metà domanda. Non è una battuta, è un dato.',
        'Trenta secondi e niente. Alessandro stava scrivendo la risposta in JavaScript.',
      ],
      cla: [
        'Tempo scaduto! Claudia era all\'episodio dieci di un drama coreano e non poteva interrompere.',
        'Tempo finito. Claudia stava chiudendo un giro di uncinetto. Le priorità sono priorità.',
      ],
    },
    serieGiuste: {
      ale: [
        '{n} di fila! Alessandro è più veloce della sua connessione in fibra.',
        '{n} risposte giuste. Alessandro dice che è tutto merito dell\'intelligenza artificiale. Non indaghiamo.',
      ],
      cla: [
        '{n} di fila per Claudia! Una produttività degna della sua fabbrica di copertine a ritmo industriale.',
        '{n} giuste di fila. Alessandro, preparati: sta per arrivare la grandinata di bacini.',
      ],
    },
    serieSbagliate: {
      ale: [
        '{n} errori di fila. Alessandro propone di riavviare il gioco. Per abitudine.',
        'Alessandro è a {n} errori. Ha provato a spegnere e riaccendere il cervello, ma è rimasto in standby.',
      ],
      cla: [
        '{n} errori di fila per Claudia. Più drammatico di un finale di stagione coreano.',
        'Claudia è a {n} errori. Ha già abbastanza lividi, qualcuno le passi una risposta giusta.',
      ],
    },
    timbro: {
      ale: [
        'Timbro per Alessandro! Il primo che ottiene senza alzarsi dalla scrivania di casa.',
        'Alessandro timbra. Finalmente una cosa che non chiede aggiornamenti.',
      ],
      cla: [
        'Timbro per Claudia! Preciso e ordinato, come una copertina all\'uncinetto.',
        'Claudia timbra. Alessandro lo sa già: per festeggiare arriverà un bacino. Forse dieci.',
      ],
    },
    spenta: {
      ale: [
        'Alessandro ha spento {meta}. Claudia non dice niente, ma l\'uncinetto le trema in mano.',
        'Addio {meta}. Alessandro l\'ha cancellata come una riga di codice inutile.',
      ],
      cla: [
        'Claudia spegne {meta} e per farsi perdonare riempie Alessandro di bacini. Lui avrebbe preferito tenersi la meta.',
        'Claudia ha spento {meta}. Senza pietà, come la cattiva di un drama coreano.',
      ],
    },
    scudo: {
      ale: ['Alessandro alza lo Scudo. Lo usa anche a casa, per difendersi dai bacini.'],
      cla: ['Scudo di Claudia! È resistente come lei: in classe ne ha parate di tutti i colori.'],
    },
    imprevisto: {
      ale: ['Imprevisto per Alessandro. Il più grave della sua vita resta la sveglia prima delle nove.'],
      cla: ['Imprevisto per Claudia: un\'altra amica aspetta un bambino. Altra copertina da fare.'],
    },
    dadoAlto: {
      ale: ['Sei! Alessandro fa più strada adesso che in tutta la giornata in smart working.'],
      cla: ['Sei per Claudia. Va di corsa, deve finire la partita prima del prossimo episodio.'],
    },
    dadoBasso: {
      ale: ['Uno. Alessandro avanza di una casella e chiede una pausa caffè.'],
      cla: ['Uno. Claudia avanza piano, come all\'uncinetto: un punto alla volta.'],
    },
    attesa: {
      ale: [
        'Alessandro, il dado. Lo so che in smart working nessuno ti mette fretta, ma qui sì.',
        'Torre di controllo ad Alessandro: ti sei riaddormentato? Rispondi, passo.',
      ],
      cla: ['Claudia, tocca a te. Metti in pausa la serie coreana, poi la riprendi.'],
    },
    saltaTurno: {
      ale: ['Alessandro salta il turno. Ne approfitta per un pisolino. Era ora, dice lui.'],
      cla: ['Claudia salta il turno e ne approfitta per due giri di uncinetto. Copertina quasi pronta.'],
    },
    duelloVinto: {
      ale: ['Duello ad Alessandro! Dita allenate da anni di tastiera. Di computer, non di chitarra.'],
      cla: ['Duello a Claudia! Riflessi da maestra: vede arrivare le domande come vede arrivare un astuccio volante.'],
    },
    mappaAle: { ale: ['Alessandro sbaglia di {n} chilometri. Dice che la mappa ha un\'interfaccia progettata male.'] },
    mappaLontano: { cla: ['Claudia è a {n} chilometri. Per un attimo era convinta che fosse in Corea.'] },
    cambio: {
      ale: ['Alessandro cambia volo. Come quando cambia framework a metà progetto.'],
      cla: ['Claudia cambia domanda. Come quando salta la sigla della serie.'],
    },
    finale: { tutti: ['Ultimo volo: {metaA} contro {metaB}. Lo sviluppatore contro la maestra. Il codice contro la penna rossa.'] },
    vittoria: {
      ale: ['Si parte per {meta}! Alessandro porterà il portatile, ovviamente. E nessuna chitarra, per fortuna di tutti.'],
      cla: ['Vince Claudia, si va a {meta}! In valigia: una copertina all\'uncinetto, la serie coreana scaricata e una scorta di bacini per Alessandro.'],
    },
  };
  for (const ev in extra) {
    window.BATTUTE[ev] = window.BATTUTE[ev] || {};
    for (const chi in extra[ev]) window.BATTUTE[ev][chi] = (window.BATTUTE[ev][chi] || []).concat(extra[ev][chi]);
  }
})();

// ---- Terza infornata di battute ----
// Più varietà di forma: annunci, torre di controllo, avvisi ai passeggeri, notizie dell'ultima ora.
(function () {
  const extra = {
    inizio: { tutti: [
      'Buonasera, qui il Comandante Turbolenza. A bordo una maestra freddolosa e uno sviluppatore assonnato. Tutto ciò che può andare storto andrà storto.',
      'Benvenuti sul volo Divano-Europa. Temperatura affidata a Claudia, orientamento affidato ad Alessandro. Che il cielo ci assista.',
      'Gentili passeggeri, tre regole di bordo. Non far arrabbiare Claudia. Non svegliare Alessandro. Non toccare il termostato.',
      'Torre di controllo, qui volo Passaporto. Due passeggeri, una meta da scegliere, zero possibilità di andare d\'accordo. Pronti al decollo.',
      'Dimostrazione di sicurezza. In caso di freddo, Claudia indossi la coperta. In caso di bacini, Alessandro indossi il casco.',
    ] },

    giusta: {
      ale: [
        'Risposta giusta! Alessandro chiede di scriverla da qualche parte. Domattina giurerà di non averla mai saputa.',
        'Esatto! Alessandro ha appena fatto la cosa più intonata della sua vita. Le sue chitarre, appese al muro, applaudono commosse.',
        'Torre, qui cabina. Alessandro ha trovato la risposta al primo colpo. Chiediamo conferma: è lo stesso uomo che si perde all\'IKEA?',
        'Giusto! E pensare che a quest\'ora, di solito, Alessandro è già al terzo sogno.',
        'Risposta esatta. Compilata senza errori e senza avvisi. Alessandro si commuove: al lavoro non gli succede mai.',
        'Bravo Alessandro! Claudia sta caricando un bacio di congratulazioni. Alessandro, hai tre secondi per metterti al riparo.',
        'Esatto! Risposta data senza alzarsi, senza sudare e senza togliersi la coperta. Lo sport preferito di Alessandro.',
        'Esatto! Alessandro risponde deciso, senza esitare. Lo stesso uomo che in centro città resta fermo a una precedenza per sei minuti.',
        'Giusto! Alessandro risponde anche alle call di lavoro, in smart working. Quando si ricorda di accendere il microfono.',
        'Avviso ai passeggeri: Alessandro ha appena ricordato una cosa. Una cosa intera. Restate seduti, potrebbero esserci scosse di assestamento.',
        'Esatto! Per una volta Alessandro è arrivato dove doveva arrivare. Senza fare tre giri della rotonda.',
        'Risposta giusta! Alessandro festeggia imbracciando una chitarra. Niente paura, la tiene solo in mano. Suonarla è un altro discorso.',
        'Notizia dell\'ultima ora: Alessandro è sveglio. Ripeto, Alessandro è sveglio. Evitate rumori bruschi.',
        'Esatto. Alessandro ne sa una più del diavolo. Il diavolo ha chiesto di fare uno stage da lui.',
        'Risposta giusta. Claudia si avvicina con le labbra a cuore. Alessandro finge di dover rispondere a una mail urgente.',
        'Risposta giusta! Alessandro è così fiero che non ha notato il ragnetto sul soffitto. Ops. Ora l\'ha notato.',
        'Risposta esatta. Alessandro la mette subito in produzione. Di venerdì sera. Da vero professionista.',
        'Giusto! La torre vorrebbe sapere come ha fatto. Anche Alessandro vorrebbe saperlo. Non se lo ricorda già più.',
      ],
      cla: [
        'Risposta giusta! Claudia ha tre termostati, due igrometri e ora anche un punto. La collezione cresce.',
        'Giusto! Claudia guarda in camera come la protagonista di un drama coreano. Parte la musica struggente anche se ha vinto.',
        'Esatto! Una risposta così pulita poteva darla solo il suo spazzolino da 250 euro. Che, tra l\'altro, ha il wifi.',
        'Brava Claudia. Risposta data con la calma di chi spiega la stessa cosa per la decima volta di fila. Sorridendo.',
        'Risposta esatta! Claudia esulta alzando le braccia. Ma solo un pochino, sennò le entra il freddo nelle maniche.',
        'Giusto! Claudia l\'ha agganciata come un punto catenella. Ora può tornare alla copertina per il neonato di marzo. E di aprile. E di maggio.',
        'Esatto! Claudia arriva alla risposta come arriva ai parcheggi. Veloce, sicura e con i pedoni che si buttano di lato.',
        'Risposta giusta! Claudia vuole festeggiare con un abbraccio. Alessandro, sei pregato di non opporre resistenza. È inutile.',
        'Brava! La bilancia di Claudia ha registrato tutto. Temperatura 20,5 gradi, autostima alle stelle.',
        'Esatto! Claudia dice che la risposta c\'era nella puntata 34 di una serie coreana. Alessandro ha visto solo la prima. Dormendo.',
        'Risposta giusta! Di solito è Claudia ad attaccare le stelline sui quaderni. Stasera la stellina se la prende lei.',
        'Esatto! Claudia era così concentrata che ha dimenticato di avere freddo per ben quattro secondi. Record personale.',
        'Giusto! Risposta presa in curva, a tutta velocità, senza freccia. Lo stile di guida di Claudia applicato al quiz.',
        'Risposta perfetta. Claudia l\'ha ragionata mentre chiudeva un\'altra copertina. Multitasking da catena di montaggio.',
        'Annuncio dalla cabina: Claudia ha risposto giusto, parte il protocollo bacetti. Alessandro, le maschere d\'ossigeno scendono dall\'alto.',
        'Giusto! Claudia sorride. Godetevi il momento, passeggeri. Abbiamo visto cosa succede quando non sorride.',
        'Esatto! L\'igrometro in salotto segna un picco di umidità. Sono le lacrime di gioia di Claudia. O il bollitore.',
        'Risposta giusta! Chi regge una mattina intera in classe risponde a queste domande a occhi chiusi.',
      ],
    },

    sbagliata: {
      ale: [
        'Sbagliato. Alessandro ha preso l\'uscita sbagliata della domanda. Ricalcolo del percorso in corso.',
        'Risposta errata. Alessandro giura che la sapeva. Lo giura sulla password del wifi, che però non ricorda.',
        'Errore 404, risposta non trovata. Alessandro sostiene che sia un problema di cache.',
        'Alessandro sbaglia. In cabina pensiamo che abbia risposto nel sonno. Lui conferma, sbadigliando.',
        'Sbagliato. Stonata come Alessandro quando prova a suonare una delle sue chitarre. Per fortuna succede di rado.',
        'Sbagliato. Alessandro ha visto un ragno nella domanda. Era una virgola, ma ormai il danno è fatto.',
        'Sbagliato! Claudia lo consola con una raffica di bacini. Alessandro valuta di sbagliare meno. Per autodifesa.',
        'Alessandro sbaglia e chiede di tornare alla versione precedente della domanda. Richiesta respinta.',
        'Sbagliato. Alessandro chiede se può rispondere da casa, in pigiama, con la telecamera spenta. Come al lavoro.',
        'Risposta errata. Alessandro era sicurissimo. La stessa sicurezza di quando dice "so la strada", poco prima di chiamare Claudia.',
        'Sbagliato. Alessandro la sapeva ieri. Ieri però è tanto tempo fa.',
        'Avviso ai passeggeri: Alessandro ha risposto a occhi chiusi. Non per concentrazione. Aveva sonno.',
        'Risposta errata. Per Alessandro è una funzionalità non documentata. Per tutti gli altri è uno sbaglio.',
        'Sbagliato. Alessandro possiede più chitarre che risposte giuste stasera. E le sa usare uguale.',
        'Risposta errata. Alessandro si è bloccato come quando deve svoltare a sinistra in centro, con un tram davanti e tre clacson dietro.',
        'Sbagliato. Alessandro ripara un computer a occhi chiusi. Purtroppo stasera ha risposto proprio così.',
        'Risposta sbagliata. Claudia si avvicina per consolarlo. Alessandro, a sorpresa, preferisce la penalità.',
        'Torre, abbiamo perso Alessandro. Ultima posizione nota, dentro la sua testa. Inviate i soccorsi.',
      ],
      cla: [
        'Sbagliato. Equipaggio, abbassate le luci e parlate a bassa voce. Claudia sta decidendo chi incolpare.',
        'Risposta errata. Claudia controlla subito l\'igrometro. Verdetto: c\'era troppa umidità nella domanda.',
        'Claudia sbaglia. Primo piano lento, ballata coreana struggente, titoli di coda. Ci vediamo alla prossima puntata.',
        'Sbagliato. Claudia dice che col freddo il cervello rallenta. In casa ci sono 23 gradi.',
        'Risposta errata. Claudia ha un sorriso da 250 euro. Le risposte, stasera, valgono un po\' meno.',
        'Sbagliato. Claudia non si scompone. Ha la pazienza di chi sente "maestra, posso andare in bagno?" venti volte a mattina.',
        'Claudia sbaglia. Ha perso un punto, come all\'uncinetto. Lo riprende alla prossima copertina. Cioè martedì.',
        'Risposta errata. Claudia cerca conforto stritolando Alessandro in un abbraccio. Ora è Alessandro a cercare ossigeno.',
        'Claudia sbaglia. In cabina abbiamo deciso di non commentare. Ce l\'ha consigliato il nostro avvocato.',
        'Claudia sbaglia. È entrata nella domanda in quarta, ha tagliato la curva e ha preso il marciapiede.',
        'Sbagliato. Claudia ha risposto prima di leggere la domanda. Come quando parte al semaforo prima che scatti il verde.',
        'Risposta sbagliata. Le è scivolata dalle dita. Sono le dita più fredde d\'Europa, capita.',
        'Sbagliato. Claudia incassa da campionessa. Dopo una settimana di scuola, un errore al quiz le fa il solletico.',
        'Claudia sbaglia. Ora va a sfogarsi con lo spazzolino da 250 euro. Lui almeno vibra di comprensione.',
        'Risposta errata. Claudia si consola: ha venti copertine in magazzino per i prossimi venti neonati. Basteranno fino a dicembre.',
        'Sbagliato. Claudia chiede un bacino di consolazione. Alessandro si mette in modalità aereo.',
        'Errore di Claudia. Passeggeri, sedetevi, sorridete e annuite. È la procedura di sicurezza più importante della serata.',
        'Risposta sbagliata. Per solidarietà tutti i termostati di casa scendono di un grado. Claudia se ne accorge subito.',
      ],
    },

    tempoScaduto: {
      ale: [
        'Tempo scaduto. Alessandro aspettava che la risposta finisse di caricarsi. Connessione lenta, dice.',
        'Trenta secondi volati via. Alessandro stava accordando a mente una chitarra. Una delle tante che non sa suonare.',
        'Tempo finito. Alessandro si è perso tra le quattro risposte. Erano solo quattro, ma lui ha sbagliato strada lo stesso.',
        'Tempo scaduto. Dalla fila di Alessandro arriva un leggero russare. Sarà una coincidenza.',
        'Il tempo è finito. Alessandro ha risposto "eh?". Purtroppo non era tra le opzioni.',
        'Tempo scaduto. Claudia, puoi svegliarlo tu con un bacino. Funziona sempre: si sveglia di colpo per scappare.',
        'Tempo scaduto. Alessandro era fermo all\'incrocio della domanda, in attesa che si liberassero tutte e quattro le corsie.',
      ],
      cla: [
        'Tempo scaduto. Claudia aveva le mani sotto la coperta. Tirarle fuori era fuori discussione.',
        'Tempo finito. Claudia aspettava i sottotitoli della domanda. Abitudine coreana.',
        'Tempo scaduto. Claudia stava contando i punti di una copertina. Erano quattrocento. Ne mancava uno.',
        'Trenta secondi di silenzio. In cabina non capiamo se è concentrazione o se sta per arrabbiarsi. Restiamo immobili.',
        'Tempo scaduto! Claudia stava baciando Alessandro su una guancia. Poi sull\'altra. Poi il tempo è finito.',
        'Tempo scaduto! Strano per Claudia, che al giallo di solito accelera.',
        'Tempo scaduto. Con la sua pazienza da maestra, Claudia aspettava che la risposta alzasse la mano da sola.',
      ],
    },

    serieGiuste: {
      ale: [
        '{n} di fila! Alessandro non era così in forma da quando ha recuperato il telecomando senza alzarsi.',
        'Alessandro a quota {n}. È così lucido che sospettiamo abbia dormito dodici ore. Ah, l\'ha fatto davvero.',
        '{n} risposte giuste. Alessandro vuole salvarle subito su un disco esterno, prima che il suo cervello le cancelli.',
        'Notizia dell\'ultima ora: Alessandro è a {n} di fila e sa ancora in che stanza si trova.',
        '{n} di fila! Alessandro è lanciato come Claudia in tangenziale. Lui però almeno mette la freccia.',
        '{n} giuste di fila. Claudia ha già le labbra pronte. Alessandro, rallenta finché sei in tempo.',
        'Alessandro a {n} risposte di fila. In smart working non ha mai prodotto così tanto in così poco tempo.',
      ],
      cla: [
        'Claudia a {n} di fila. Va come in macchina, cioè troppo veloce. L\'autovelox della torre è già scattato due volte.',
        'Claudia a quota {n}. Il suo spazzolino da 250 euro le ha mandato una notifica di complimenti.',
        '{n} giuste di fila. Claudia è come una serie coreana: più va avanti, più è impossibile fermarla.',
        'Claudia a {n} di fila. Chi regge una giornata intera in classe regge anche un quiz. Senza fare una piega.',
        'Claudia è a {n} risposte giuste. Con l\'altra mano finisce una copertina. Il neonato del mese ringrazia.',
        '{n} di fila. Claudia vuole festeggiare con un bacio per ogni risposta. Alessandro, fai due conti e preoccupati.',
        'Claudia a {n} di fila. Equipaggio, nessuno osi interromperla. Sapete com\'è quando si arrabbia.',
      ],
    },

    serieSbagliate: {
      ale: [
        '{n} errori di fila. Alessandro aveva impostato la rotta per Lisbona e sta atterrando a Oslo. Un classico.',
        '{n} errori di fila. Alessandro dice che c\'era un ragno sullo schermo. Il ragno, interrogato, nega tutto.',
        '{n} sbagliate di fila. Alessandro apre la console del browser per capire il problema. Il problema è lui, ma la console non lo dice.',
        '{n} errori di fila. Alessandro le risposte giuste se le era segnate. Non ricorda dove.',
        '{n} sbagliate. Alessandro, qui la torre: ti stiamo perdendo. In realtà ti avevamo già perso, ora è ufficiale.',
        'Alessandro a {n} errori. Claudia propone un bacino di consolazione per ogni errore. Alessandro giura che da ora risponde giusto.',
        'Alessandro è a {n} errori. Se li mettesse in musica, sarebbe la prima volta che una delle sue chitarre suona qualcosa.',
      ],
      cla: [
        '{n} errori di fila. Claudia ha interrogato tutti i termostati di casa. Concordano: è colpa della stanza.',
        'Claudia a {n} errori. Il personale di bordo ha indossato il casco. Per precauzione, niente di personale.',
        '{n} sbagliate di fila. È la puntata in cui la protagonista coreana piange sotto la pioggia. Claudia, almeno la pioggia risparmiacela.',
        'Claudia è a {n} errori. Come i punti tolti dalla patente. Per fortuna qui la patente non serve.',
        '{n} errori di fila, ma Claudia resta calma. Ha visto mattine in classe ben peggiori e ne è uscita in piedi.',
        'Claudia a {n} errori. Per tirarsi su vuole un abbraccio lungo. Alessandro stima la durata: tra i venti e i quaranta minuti.',
        '{n} sbagliate. Claudia pensa di regalare una copertina all\'uncinetto alle domande. Per ammorbidirle.',
      ],
    },

    timbro: {
      ale: [
        'Timbro per Alessandro! Il doganiere gli ha chiesto il passaporto due volte. Non ci credeva neanche lui.',
        'Alessandro timbra e mette il passaporto in un posto sicuro. Così sicuro che domani non lo troverà.',
        'Timbro conquistato! Alessandro voleva festeggiare con un salto, poi ci ha ripensato. Troppa fatica.',
        'Timbro! Alessandro ha già scritto uno script che timbra il passaporto in automatico. È ancora in beta.',
        'Timbro per Alessandro. Claudia si prepara alla festa dei bacini. Alessandro si prepara alla fuga.',
        'Alessandro prende il timbro. Il doganiere gli indica l\'uscita. Lui va dalla parte opposta.',
        'Timbro per Alessandro! Il doganiere ha controllato la valigia. Niente ragni. Alessandro l\'aveva già controllata nove volte.',
      ],
      cla: [
        'Timbro per Claudia! Il doganiere le ha offerto una coperta. Lei ne aveva già addosso due.',
        'Timbro per Claudia! Arrivata alla dogana in tempo record. Il doganiere si è dovuto spostare per non essere investito.',
        'Timbro per Claudia! Lo festeggia stringendo Alessandro come un peluche. Il peluche chiede aiuto alla torre.',
        'Claudia conquista il timbro. Il passaporto ora è pieno quasi quanto il suo calendario di copertine da consegnare.',
        'Timbro! Claudia ha verificato che l\'inchiostro fosse a temperatura ambiente. Diciannove gradi. Ha protestato lo stesso.',
        'Timbro per Claudia. Brillante come i suoi denti dopo una passata di spazzolino da 250 euro.',
        'Claudia prende il timbro con la calma di chi ogni giorno ne vede di tutti i colori. Questo almeno è solo blu.',
      ],
    },

    spenta: {
      ale: [
        'Alessandro spegne {meta}. Claudia, prima di reagire, misura la temperatura. Della sua rabbia, intendo.',
        '{meta} spenta, firmato Alessandro. Domani dirà di non ricordarsi di averlo fatto. Stavolta abbiamo le prove.',
        'Alessandro ha spento {meta}. Motivazione ufficiale: troppo lontana dal divano.',
        'Torre di controllo, Alessandro ha appena spento {meta}. Chiediamo una scorta armata per lui fino a fine partita.',
        'Alessandro spegne {meta} con un clic. Da vero sviluppatore: elimina e non chiedere conferma.',
        'Addio {meta}. Alessandro chiede scusa. Claudia accetta le scuse e poi lo sommerge di bacini. Per punizione.',
        'Alessandro spegne {meta}. Dice che il centro storico è tutto sensi unici. Solo a pensarci gli sudano le mani.',
      ],
      cla: [
        'Claudia ha spento {meta}. Con dolcezza. Poi ha guardato Alessandro, e la dolcezza è finita lì.',
        'Claudia spegne {meta}. Motivazione ufficiale: nel 2009 lì hanno registrato una notte a 14 gradi. Inaccettabile.',
        'Addio {meta}! Claudia l\'ha spenta come spegne una serie coreana quando il protagonista la delude.',
        'Claudia ha spento {meta}. Alessandro, guarda il lato positivo: una città in meno in cui perderti.',
        '{meta} spenta da Claudia. Per farsi perdonare ti farà una copertina. Appena finisce la fila dei neonati, verso il 2031.',
        'Claudia spegne {meta}. Strade troppo strette, dice. Per una che le prende a novanta all\'ora, in effetti.',
        'Claudia elimina {meta} senza battere ciglio. Chi tiene testa a una classe intera non si fa impietosire da una città.',
      ],
    },

    scudo: {
      ale: [
        'Scudo di Alessandro! Firewall attivato. Tentativo di attacco bloccato e salvato nei log.',
        'Scudo di Alessandro! Lo tiene sempre a portata di mano. Non per il gioco, per i ragni.',
        'Scudo alzato! Alessandro si è ricordato dove l\'aveva messo. Ha cercato in sole dodici tasche.',
        'Alessandro usa lo Scudo. Lo stesso che usa ogni mattina contro la sveglia. Funziona benissimo.',
      ],
      cla: [
        'Scudo di Claudia! Antiurto, antigelo e soprattutto anti Alessandro.',
        'Claudia para con lo Scudo. Anni di gomme e palline di carta che volano in classe. Non le sfugge niente.',
        'Scudo di Claudia! Robusto come il paraurti della sua macchina. Che ne ha viste parecchie.',
        'Claudia si protegge con lo Scudo. Alessandro, non insistere. Ricordati l\'ultima volta che l\'hai fatta arrabbiare.',
      ],
    },

    resurrezione: {
      ale: [
        'Alessandro riaccende {meta}! Riavvio riuscito al primo colpo. Lui stesso non ci crede.',
        '{meta} torna in gioco grazie ad Alessandro. Si è svegliata prima di lui, il che non è difficile.',
        'Alessandro resuscita {meta}. Di solito l\'unica cosa che rimette in piedi è sé stesso. A mezzogiorno.',
        'Alessandro riaccende {meta}. L\'ha trovata sulla mappa al primo tentativo? No, al quinto. Vale lo stesso.',
      ],
      cla: [
        'Claudia riaccende {meta}! Come la protagonista coreana che torna dopo sei puntate di amnesia.',
        '{meta} risorge grazie a Claudia. Prima però ha verificato che ci fossero almeno 22 gradi.',
        'Claudia riaccende {meta}. Rianimata a forza di coccole. Alessandro conosce bene la tecnica.',
        'Claudia ridà vita a {meta} con l\'energia di chi tiene a bada una classe intera il venerdì pomeriggio.',
      ],
    },

    imprevisto: {
      tutti: [
        'Attenzione, {nome}: imprevisto in arrivo. Restate seduti e tenete le mani lontane dal passaporto.',
        'Imprevisto per {nome}. La torre consiglia di affrontarlo con prudenza. Cioè come guida Alessandro, non come guida Claudia.',
        'Qui cabina. {nome} ha pescato un imprevisto. Preghiamo i passeggeri di non applaudire. Almeno non subito.',
        '{nome}, abbiamo una piccola avaria. Niente di grave. Basta un po\' di nastro adesivo e tanta fiducia.',
      ],
      ale: [
        'Imprevisto per Alessandro. Per lui è un imprevisto anche un aggiornamento del computer alle nove di mattina.',
        'Alessandro pesca un imprevisto. Reazione immediata: uno sbadiglio. Il panico arriverà dopo, con calma.',
        'Imprevisto per Alessandro. Grave quasi come un ragno nella doccia o un parcheggio in centro. Quasi.',
        'Imprevisto per Alessandro. Claudia lo consola con una pioggia di bacini. Ora gli imprevisti sono due.',
      ],
      cla: [
        'Imprevisto per Claudia. La cabina trattiene il fiato. Se si arrabbia, l\'imprevisto diventa nostro.',
        'Claudia pesca un imprevisto. Lo affronta come il lunedì in classe: un sospiro, un sorriso, e avanti.',
        'Imprevisto per Claudia! Grave quasi quanto lo spazzolino scarico a mezzanotte.',
        'Imprevisto per Claudia. Lo affronta come affronta le rotonde. Senza frenare.',
      ],
    },

    dadoAlto: {
      ale: [
        'Sei! Alessandro scatta come quando sente aprire un pacchetto di patatine dall\'altra stanza.',
        'Sei! Alessandro scappa di sei caselle. Qualcuno gli ha detto che c\'era un ragno sul tabellone.',
        'Sei! Velocità da fibra ottica. Dopo, però, servirà un riavvio.',
        'Sei per Alessandro! Sei caselle, sei chitarre, zero canzoni. Tutto torna.',
        'Sei! Alessandro è così sorpreso che si è quasi svegliato del tutto. Ora è carico al 40 per cento.',
      ],
      cla: [
        'Sei per Claudia! Corre come quando qualcuno abbassa il termostato di nascosto.',
        'Sei! Claudia avanza veloce come la sua produzione di copertine. Ne ha appena sfornata un\'altra.',
        'Sei caselle per Claudia. Va così veloce che Alessandro non fa in tempo a schivare il bacino.',
        'Sei per Claudia! Sei caselle in un lampo, senza freccia e senza guardare negli specchietti.',
        'Sei per Claudia. Velocità massima, come il suo spazzolino da 250 euro in modalità turbo.',
      ],
    },

    dadoBasso: {
      ale: [
        'Uno. Alessandro dice che è una scelta strategica. Si chiama risparmio energetico.',
        'Uno. Alessandro avanza di una casella, come in centro all\'ora di punta. Con le mani strette sul volante.',
        'Uno. Quando tocca ad Alessandro, anche il dado si mette in pigiama.',
        'Uno. Lento come un sito caricato su una connessione del 2003. Alessandro sa di cosa parlo.',
        'Uno. Una casella sola, come gli accordi che Alessandro sa fare sulla chitarra. Anzi, uno è già generoso.',
      ],
      cla: [
        'Uno. Claudia avanza di una casella e ci ripensa. Là c\'era corrente d\'aria.',
        'Uno per Claudia. Avvisiamo il dado di nascondersi. Lei sta per arrabbiarsi.',
        'Uno. Claudia avanza piano, come i drama coreani. Dieci puntate per arrivare a un bacio.',
        'Uno. Una casella sola. Per Claudia è un trauma: in macchina si ferma solo quando finisce la benzina.',
        'Una casella sola. Claudia ne approfitta per una sosta coccole. Alessandro chiede di cambiare dado.',
      ],
    },

    attesa: {
      ale: [
        'Alessandro, il dado è lì davanti. Davanti, Alessandro. Non dietro. Davanti.',
        'Comunicazione per Alessandro: il turno è tuo da un po\'. Se dormi, batti un colpo. Se sei sveglio, tira.',
        'Alessandro, tira. Il dado non è un ragno, non morde. L\'abbiamo controllato.',
        'Torre ad Alessandro. Abbiamo l\'impressione che tu stia aspettando che il dado venga da te. Non verrà.',
        'Alessandro, è il tuo turno. Claudia dice che se non tiri entro dieci secondi parte la raffica di bacini.',
      ],
      cla: [
        'Claudia, tocca a te. Lo sappiamo che fuori dalla coperta fa freddo. È un attimo, giuriamo.',
        'Claudia, tocca a te. Strano vederti ferma. Di solito sei tu quella che suona il clacson.',
        'Claudia? Il dado. Non vogliamo metterti fretta. E nemmeno farti arrabbiare. Quindi con calma. Però tira.',
        'Claudia, il turno è tuo. Puoi finire il giro di uncinetto. Uno solo, la copertina non scappa.',
        'Claudia, tocca a te. Se stai baciando Alessandro, liberalo un attimo. Lui ringrazia.',
      ],
    },

    saltaTurno: {
      ale: [
        'Alessandro salta il turno. La cabina gli porta un cuscino. Sapevamo che avrebbe gradito.',
        'Turno saltato per Alessandro. Non se ne accorgerà: aveva già scordato che toccava a lui.',
        'Alessandro salta il turno. Sollievo totale, come quando Claudia si offre di guidare in centro. Poi però deve salire in macchina con lei.',
        'Alessandro salta un giro. Claudia ne approfitta per un abbraccio. Questo sì che è un imprevisto.',
      ],
      cla: [
        'Claudia salta il turno. Approfitta della pausa per misurare l\'umidità del salotto. Ovviamente è sbagliata.',
        'Turno saltato per Claudia. Va a vedere un episodio coreano. Torna fra dodici puntate.',
        'Claudia salta il turno. Per lei è come un semaforo rosso. Lo rispetta, ma tamburellando sul volante.',
        'Claudia salta un giro. Finalmente una pausa. La prima da quando è iniziato l\'anno scolastico.',
      ],
    },

    geografiaAle: {
      ale: [
        'Geografia sbagliata. Alessandro propone di aggiungere alle cartine un tasto "Torna alla home".',
        'Alessandro sbaglia geografia. In sua difesa, l\'ha imparata da Google Maps. E si perdeva anche lì.',
        'Torre ai passeggeri: Alessandro ha appena spostato una capitale. I governi interessati sono stati avvisati.',
        'Sbagliato. Per Alessandro l\'Europa ha due soli punti cardinali: il divano e il frigo.',
        'Geografia sbagliata. Ricapitolando, in vacanza Alessandro non legge la mappa e Claudia guida come al rally. Auguri ai pedoni.',
        'Alessandro sbaglia geografia. Claudia, in vacanza tieni tu i biglietti, la mappa e possibilmente anche lui.',
      ],
    },

    duelloVinto: {
      ale: [
        'Duello ad Alessandro! Il dito più veloce del West. Il resto del corpo, invece, dorme ancora.',
        'Duello ad Alessandro! Mai visto così rapido. Tranne quando scappa da un ragno. Lì è imbattibile.',
        'Duello vinto da Alessandro. Claudia lo guarda male. Alessandro, consiglio da amico: non esultare troppo.',
        'Alessandro vince! Riflessi da chi chiude il portatile in un secondo quando parte una call a sorpresa.',
        'Duello ad Alessandro. Stavolta la risposta se l\'è ricordata in tempo. Di solito gli torna in mente il giorno dopo.',
        'Duello vinto da Alessandro! Claudia vuole congratularsi con un bacio. Alessandro preme di nuovo il tasto, per scappare.',
      ],
      cla: [
        'Duello a Claudia! Dita gelide ma velocissime. Il segreto è il ghiaccio, dice.',
        'Claudia vince il duello. Chi fa l\'appello di una classe in trenta secondi non teme nessun tasto.',
        'Duello vinto da Claudia! Esultanza composta. Poi esultanza vera, addosso ad Alessandro, a colpi di bacini.',
        'Claudia vince il duello! Alessandro, un consiglio: complimentati. Con calma, ma subito.',
        'Duello a Claudia! Velocità da finale di stagione coreano, quando premi "episodio successivo" prima dei titoli di coda.',
        'Duello a Claudia! Partenza bruciante, come al semaforo. Alessandro è ancora lì che cerca la marcia.',
      ],
    },

    duelloNessuno: {
      tutti: [
        'Duello senza vincitori. Alessandro dormiva, Claudia aveva freddo. Torre di controllo, nessun ferito.',
        'Nessuno ha risposto. Silenzio in cabina. Si sente solo un igrometro che misura la tensione.',
        'Nessuno vince il duello. Lei ha frenato tardi, lui non è proprio partito. Esattamente come in macchina.',
        'Nessuno vince. Alessandro aspettava che rispondesse Claudia, Claudia aspettava di potersi arrabbiare. Pareggio.',
        'Duello a vuoto. Il tasto è rimasto lì, solo e mai toccato. Come le chitarre di Alessandro.',
        'Nessuna risposta. Pare che i due concorrenti fossero impegnati in una sessione di coccole. Claudia le faceva, Alessandro le subiva.',
      ],
    },

    mappaAle: {
      ale: [
        '{n} chilometri di errore. Alessandro, la mappa si legge con il nord in alto. In alto. Sì, quello.',
        'Alessandro ha mancato la città di {n} chilometri. Come ogni volta che dice "fidati, è di qua".',
        '{n} chilometri di errore. Alessandro ha evitato il centro città apposta. Troppo traffico, anche sulla mappa.',
        'Torre di controllo: Alessandro è atterrato a {n} chilometri dalla pista. I passeggeri proseguono a piedi.',
        'Errore di {n} chilometri. Alessandro dice che gli mancava il GPS. Gli manca da trent\'anni.',
        'Alessandro sbaglia di {n} chilometri. Domani non se lo ricorderà. Noi sì. Per sempre.',
      ],
    },

    mappaLontano: {
      cla: [
        'Claudia ha cliccato a {n} chilometri. Ha puntato dove faceva più caldo, mica dove c\'era la città.',
        '{n} chilometri di errore. Claudia dice che le dita fredde sono scivolate. Ci crediamo. Per paura.',
        'Claudia è finita a {n} chilometri dalla città. Speriamo almeno che lì girino un drama coreano.',
        '{n} chilometri oltre la città. Claudia ha cliccato come guida: ha visto la meta e ha tirato dritto.',
        '{n} chilometri di distanza. Claudia ci arriverà a uncinetto, un punto alla volta. Per Pasqua.',
        'Claudia ha mancato la città di {n} chilometri. Con la sua pazienza ci arriva a piedi. E pure sorridendo.',
      ],
    },

    mappaPrecisa: {
      ale: [
        'Appena {n} chilometri! Alessandro ha centrato la città. Fermate il tempo, potrebbe non succedere più.',
        '{n} chilometri di scarto. Precisione da sviluppatore: al pixel, almeno stavolta.',
        'Solo {n} chilometri! Alessandro chiede di salvare la posizione. Sa che domani non se la ricorderà.',
        'Alessandro a {n} chilometri dalla città. Il suo senso dell\'orientamento si è svegliato. Lui un po\' meno.',
      ],
      cla: [
        'Solo {n} chilometri! Claudia centra la città. Ne conosceva già la temperatura media di gennaio.',
        '{n} chilometri e basta. Claudia punta la città con la precisione di un uncinetto da tre millimetri.',
        'Appena {n} chilometri! Claudia è così contenta che sta per partire il bacio di festeggiamento. Alessandro, riparati.',
        'Claudia a {n} chilometri dal bersaglio. Chi ritrova al volo la gomma persa da una classe intera trova anche una città.',
      ],
    },

    cinquanta: {
      ale: [
        'Alessandro usa il 50/50. Meno risposte, meno fatica. La filosofia di una vita.',
        'Metà delle risposte sparisce. Alessandro avrebbe preferito che sparisse anche la domanda.',
        'Alessandro taglia due risposte. Come quando cancella metà del codice e spera che funzioni lo stesso.',
        '50/50 per Alessandro. Due strade invece di quattro. Riuscirà a sbagliare strada lo stesso? Scommesse aperte.',
      ],
      cla: [
        'Claudia usa il 50/50. Due risposte eliminate con un solo sguardo. Le altre due tremano.',
        'Claudia usa il 50/50. Due risposte travolte in un colpo solo. Avevano attraversato fuori dalle strisce.',
        'Claudia dimezza le risposte con la stessa calma con cui divide la classe in gruppi. Senza discussioni.',
        'Claudia usa il 50/50. Due risposte in meno, quindi più tempo per i bacini. Alessandro protesta.',
      ],
    },

    cambio: {
      ale: [
        'Alessandro cambia volo. Si era seduto al gate sbagliato. Come sempre.',
        'Alessandro cambia volo. Nella cappelliera del primo aveva visto qualcosa con otto zampe.',
        'Alessandro chiede un altro volo. Quello di prima partiva troppo presto. Prima delle undici, per lui, è notte fonda.',
        'Alessandro cambia domanda. Dice che gliel\'avevano già fatta. Non ricorda quando, e nemmeno la risposta.',
      ],
      cla: [
        'Claudia cambia volo. Chiede se può pilotarlo lei. Risposta della torre di controllo: assolutamente no.',
        'Cambio volo per Claudia. La domanda di prima l\'aveva guardata storto. Brutta mossa, domanda.',
        'Claudia cambia domanda. Come quando a metà copertina decide che il colore non va e ricomincia, con calma olimpica.',
        'Claudia cambia volo. Vuole il finestrino lato sole. Possibilmente in Spagna.',
      ],
    },

    evento_turbolenza: { tutti: [
      'Turbolenza! I comandi sono al contrario. Claudia controlla subito se si è invertito anche il termostato.',
      'Turbolenza in corso, comandi invertiti. Alessandro dice che è un bug e vuole aprire un ticket con la compagnia aerea.',
      'Turbolenza! Il Comandante vi chiede di restare seduti. Alessandro, tu lo stavi già facendo. Bravo.',
      'Turbolenza e comandi al contrario. Claudia non si scompone: ha visto di peggio in una ricreazione con la pioggia.',
    ] },
    evento_happyhour: { tutti: [
      'Happy hour! Ogni risposta giusta vale una carta. Claudia brinda con una camomilla bollente. È il suo spritz.',
      'Happy hour a bordo! Alessandro, questo è l\'unico momento in cui ti conviene stare sveglio. Approfittane.',
      'Happy hour in cabina! Claudia ha già la sua strategia: risposta, bacino, risposta, bacino.',
      'Happy hour! Alessandro chiede se il bar accetta criptovalute. No, Alessandro. Accetta risposte giuste.',
    ] },
    evento_sciopero: { tutti: [
      'Sciopero! Il dado lavora a mezzo servizio. Alessandro chiede il modulo per iscriversi al sindacato.',
      'Annuncio: il dado aderisce allo sciopero. Claudia lo fissa. Il dado ci ripensa, ma ormai è tardi.',
      'Sciopero dei voli, si va piano. Claudia ne approfitta per fare mezza copertina all\'uncinetto.',
      'Sciopero! Tutto rallentato. Alessandro dice che lui lavora così da anni e nessuno gliel\'ha mai riconosciuto.',
    ] },
    evento_ritardo: { tutti: [
      'Volo in ritardo, tempo dimezzato! Alessandro, niente pausa caffè tra una sillaba e l\'altra.',
      'Ritardo a bordo. Metà del tempo per rispondere. Claudia, l\'episodio coreano dovrà aspettare.',
      'Ritardo! Si risponde in fretta. Alessandro va in crisi: in fretta non ha mai fatto niente in vita sua.',
      'Volo in ritardo e tempo dimezzato. Claudia è abituata: in classe ha sempre metà del tempo che le servirebbe.',
    ] },
    evento_vento: { tutti: [
      'Vento in coda! Due dadi a testa. Alessandro, due dadi sono il doppio della fatica. Coraggio.',
      'Vento in coda, due dadi! Claudia ha controllato l\'igrometro. Vento secco, umidità al 32 per cento. Approvato.',
      'Raffiche di vento! Due dadi per giocatore. Claudia vorrebbe sorpassare il vento. Alessandro vorrebbe scendere.',
      'Vento in poppa! Due dadi. Claudia li tira con la grinta di una maestra, Alessandro con la grinta della domenica mattina.',
    ] },

    eventoFinito: { tutti: [
      'Evento finito. Il vento si calma, i passeggeri si rilassano, Alessandro si riaddormenta.',
      'Fine dell\'evento. Claudia, puoi rimettere a posto il termostato. Sì, lo sappiamo che l\'hai toccato.',
      'Evento concluso. La cabina torna alla normalità. Per quanto possa essere normale questa cabina.',
      'Evento terminato. Si riprende il volo normale. Claudia riprende a coccolare Alessandro, Alessandro riprende a resistere.',
      'Fine dell\'evento speciale. Gli assistenti di volo tornano ai loro posti. Il dado tira un sospiro di sollievo.',
    ] },

    finale: { tutti: [
      'Ultimo volo! {metaA} contro {metaB}. Alessandro ha già dimenticato quale delle due voleva. Claudia se lo ricorda benissimo.',
      'Finale: {metaA} o {metaB}. Claudia ha controllato le temperature medie di entrambe. Alessandro ha controllato i divani.',
      'Ultimo volo, signori: {metaA} contro {metaB}. Cinture allacciate, tavolini chiusi e niente bacini durante la finale.',
      'Ultimo volo: {metaA} contro {metaB}. Avviso ai pedoni di entrambe le città. Guiderà Claudia. Restate sui marciapiedi. Anzi, in casa.',
      'Finale! {metaA} contro {metaB}. Chi vince sceglie la meta. Chi perde porta le valigie. Tutte. Comprese le sei coperte di Claudia.',
    ] },

    vittoria: {
      ale: [
        'Si va a {meta}! Vince Alessandro. Claudia, prenota tu, per favore. Lui l\'aereo lo perderebbe di sicuro.',
        'Alessandro vince e sceglie {meta}! Un uomo che si perde in corridoio ha scelto una città straniera. Coraggio a tutti.',
        'Vittoria di Alessandro! Destinazione {meta}. Il viaggio più audace della sua vita dopo quello storico dal divano al bagno.',
        'Atterraggio a {meta}! Alessandro ha già un foglio Excel per il viaggio. Non ricorda dove l\'ha salvato.',
        'Si va a {meta}! Vince Alessandro. Organizzazione: guida Claudia, Alessandro ispeziona l\'albergo in cerca di ragni, i pedoni pregano.',
      ],
      cla: [
        'Vince Claudia, si vola a {meta}! In valigia sette maglioni, due termometri portatili e, se avanza posto, Alessandro.',
        'Claudia vince! Destinazione {meta}. Alessandro, è il momento di festeggiare. Cioè di farti sbaciucchiare senza fiatare.',
        'Si va a {meta}! Vittoria di Claudia. Lo spazzolino da 250 euro viaggia con lei. Ha il suo posto a sedere.',
        'Vince Claudia e si parte per {meta}. Sull\'aereo, una serie coreana per festeggiare. Tutte e sedici le puntate.',
        'Atterraggio a {meta}! Vince Claudia, con la pazienza di una maestra e la grinta di chi non molla mai. Alessandro, applaudi. Forte.',
      ],
    },
  };
  for (const ev in extra) {
    window.BATTUTE[ev] = window.BATTUTE[ev] || {};
    for (const chi in extra[ev]) window.BATTUTE[ev][chi] = (window.BATTUTE[ev][chi] || []).concat(extra[ev][chi]);
  }
})();

// ---- Mete in comune: battute per quando una meta condivisa si spegne solo da una parte, e per il finale con la stessa città ----
(function () {
  const extra = {
    // {nome} ha spento la meta, ma nella sua lista {meta} resta accesa
    spentaComune: {
      tutti: [
        '{nome} spegne {meta} a {altro}. Peccato che ce l\'abbia anche nella sua lista. Furbizia o distrazione? La torre non si pronuncia.',
        '{meta} si spegne per {altro} e resta accesa per {nome}. Si chiama strategia. O egoismo. Dipende da chi racconta.',
        'Colpo di scena: {nome} toglie {meta} a {altro} ma se la tiene. Come rubare il dolce dal piatto dell\'altro.',
        '{meta} cambia proprietario. Adesso è solo di {nome}. {altro}, la torre ti manda un abbraccio.',
        'Meta in comune, spenta solo da una parte. {nome} ha deciso che a {meta} ci va da solo. Con {altro}, ma alle sue condizioni.',
      ],
      ale: [
        'Alessandro spegne {meta} a Claudia e se la tiene. Mossa da sviluppatore: copia il codice degli altri e se lo intesta.',
        'Alessandro toglie {meta} a Claudia. Ce l\'ha anche lui, quindi niente drammi. Per lui. Per lei vedremo stasera.',
      ],
      cla: [
        'Claudia spegne {meta} ad Alessandro e la tiene accesa per sé. Con la stessa grazia con cui gli ruba la coperta.',
        'Claudia toglie {meta} ad Alessandro ma se la tiene stretta. Come il termostato: si condivide, ma decide lei.',
      ],
    },
    finaleComune: {
      tutti: [
        'Ultimo volo verso {meta}. E verso {meta}. Avete lo stesso biglietto. Si gioca solo per decidere chi porta le valigie.',
        'Stessa meta in finale: {meta}! La torre di controllo è commossa. Ora sfidatevi per l\'onore, che il viaggio è già deciso.',
        'Finale con {meta} da tutte e due le parti. Una serata di trivia per scoprire che eravate d\'accordo. Bellissimo. Ed estenuante.',
        '{meta} contro {meta}. Il dubbio non è più dove andare. È chi avrà il diritto di dire "te l\'avevo detto" per tutto il viaggio.',
      ],
    },
  };
  for (const ev in extra) {
    window.BATTUTE[ev] = window.BATTUTE[ev] || {};
    for (const chi in extra[ev]) window.BATTUTE[ev][chi] = (window.BATTUTE[ev][chi] || []).concat(extra[ev][chi]);
  }
})();

// ---- Ruota del Comandante, Dogana volante, pagella finale ----
(function () {
  const extra = {
    ruota: {
      tutti: [
        'Signori, giro la ruota. L\'ho comprata in un autogrill, non garantisco niente.',
        'È il momento della ruota. La torre di controllo ha chiesto di non farla. Io la faccio lo stesso.',
        'Ruota in movimento. Qualunque cosa esca, la colpa è vostra. Io guido e basta.',
        'Giro la ruota del destino. Il destino, per la cronaca, ha la batteria scarica.',
        'Attenzione, gira la ruota. Claudia, non provare a fermarla col piede. Ti vedo.',
        'La ruota gira. Alessandro, non serve che ti alzi dal divano, guardala da lì.',
        'Ruota! Come le serie coreane: non sai mai come va a finire, ma piangerà qualcuno.',
      ],
    },
    timbroRubato: {
      tutti: [
        '{nome} ruba un timbro a {altro}. Alla dogana volante non si fanno prigionieri.',
        'Timbro rubato! {altro}, controlla le tasche. Manca anche il portafoglio?',
        'Furto con destrezza alla dogana volante. {nome} ora ha un passaporto più pesante e una coscienza più leggera.',
        'Il timbro cambia proprietario. {altro} potrà riprenderselo alla sua dogana. Se se lo ricorda.',
      ],
      ale: [
        'Alessandro ruba un timbro a Claudia. Primo gesto rapido della sua vita. Lo segniamo sul calendario.',
        'Timbro rubato da Alessandro! Lo sviluppatore ha trovato una falla nel sistema doganale.',
        'Alessandro ruba il timbro e scappa. Per due passi. Poi si siede.',
      ],
      cla: [
        'Claudia ruba un timbro ad Alessandro. Lo ha preso con la stessa naturalezza con cui gli ruba la coperta.',
        'Timbro rubato da Claudia. Alessandro, non discutere. Ricordati com\'è quando si arrabbia.',
        'Claudia si prende il timbro di Alessandro. Lo appenderà vicino alle copertine all\'uncinetto.',
      ],
    },
    pagella: {
      tutti: [
        'Ecco la pagella. Comportamento: sette. Ho visto cose, in questa serata.',
        'Pagella della serata. Firmata dal Comandante e controfirmata dalla maestra di sostegno, che ha più esperienza.',
        'Distribuisco le pagelle. Niente reclami: l\'ufficio è chiuso fino a febbraio.',
        'La pagella è pronta. Non fate quelle facce, è peggio a scuola.',
      ],
    },
  };
  for (const ev in extra) {
    window.BATTUTE[ev] = window.BATTUTE[ev] || {};
    for (const chi in extra[ev]) window.BATTUTE[ev][chi] = (window.BATTUTE[ev][chi] || []).concat(extra[ev][chi]);
  }
})();
