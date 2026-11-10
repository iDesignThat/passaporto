// Domande extra del gioco Passaporto: vero o falso lampo e metti in ordine.
window.DOMANDE_VF = [
  // ===== GEOGRAFIA =====
  { c: "geo", d: 1, q: "Il Danubio attraversa Budapest.", v: true },
  { c: "geo", d: 1, q: "Il Monte Bianco è alto più di 4.000 metri.", v: true },
  { c: "geo", d: 1, q: "Capo Nord si trova in Norvegia.", v: true },
  { c: "geo", d: 1, q: "La Svizzera usa l'euro come moneta.", v: false },
  { c: "geo", d: 1, q: "Lisbona si affaccia sul Mar Mediterraneo.", v: false },
  { c: "geo", d: 2, q: "La Groenlandia fa parte del Regno di Danimarca.", v: true },
  { c: "geo", d: 2, q: "Il lago di Ginevra è diviso tra Svizzera e Francia.", v: true },
  { c: "geo", d: 2, q: "La Corsica è più grande della Sardegna.", v: false },
  { c: "geo", d: 2, q: "Il Canale della Manica separa l'Irlanda dalla Gran Bretagna.", v: false },
  { c: "geo", d: 3, q: "Il Reno nasce in Svizzera.", v: true },
  { c: "geo", d: 3, q: "Madrid si trova più a nord di Roma.", v: false },
  { c: "geo", d: 3, q: "Il Lussemburgo confina con i Paesi Bassi.", v: false },

  // ===== STORIA =====
  { c: "sto", d: 1, q: "Il Colosseo fu costruito dagli antichi Romani.", v: true },
  { c: "sto", d: 1, q: "Le Olimpiadi antiche nacquero in Grecia.", v: true },
  { c: "sto", d: 1, q: "Napoleone Bonaparte era nato in Sicilia.", v: false },
  { c: "sto", d: 1, q: "Cristoforo Colombo era portoghese.", v: false },
  { c: "sto", d: 1, q: "La Statua della Libertà fu un regalo dell'Italia agli Stati Uniti.", v: false },
  { c: "sto", d: 2, q: "La Torre Eiffel fu inaugurata nell'Ottocento.", v: true },
  { c: "sto", d: 2, q: "Roma è la capitale d'Italia dal 1871.", v: true },
  { c: "sto", d: 2, q: "Firenze non è mai stata capitale d'Italia.", v: false },
  { c: "sto", d: 2, q: "La Repubblica di Venezia era guidata da un re.", v: false },
  { c: "sto", d: 3, q: "Secondo la tradizione la Confederazione Svizzera nacque nel 1291.", v: true },
  { c: "sto", d: 3, q: "La Torre di Londra fu voluta da Guglielmo il Conquistatore.", v: true },
  { c: "sto", d: 3, q: "Il Canale di Suez fu inaugurato nel Novecento.", v: false },

  // ===== ARTE E CULTURA =====
  { c: "art", d: 1, q: "La Gioconda è stata dipinta da Leonardo da Vinci.", v: true },
  { c: "art", d: 1, q: "Pablo Picasso era spagnolo.", v: true },
  { c: "art", d: 1, q: "Il David di Michelangelo è esposto a Venezia.", v: false },
  { c: "art", d: 1, q: "L'Ultima Cena di Leonardo si trova a Roma.", v: false },
  { c: "art", d: 1, q: "Il Teatro alla Scala si trova a Torino.", v: false },
  { c: "art", d: 2, q: "La Torre di Pisa è il campanile del Duomo di Pisa.", v: true },
  { c: "art", d: 2, q: "La Venere di Milo è esposta al Louvre.", v: true },
  { c: "art", d: 2, q: "La Primavera di Botticelli è esposta al Louvre.", v: false },
  { c: "art", d: 2, q: "Il Pensatore di Rodin è un dipinto.", v: false },
  { c: "art", d: 3, q: "Il vero nome di Caravaggio era Michelangelo Merisi.", v: true },
  { c: "art", d: 3, q: "In Finlandia anche lo svedese è lingua ufficiale.", v: true },
  { c: "art", d: 3, q: "Il Museo Guggenheim di Bilbao è opera di Gaudí.", v: false },

  // ===== CIBO E TRADIZIONI =====
  { c: "cib", d: 1, q: "La mozzarella di bufala è tipica della Campania.", v: true },
  { c: "cib", d: 1, q: "Il Parmigiano Reggiano si fa con latte di mucca.", v: true },
  { c: "cib", d: 1, q: "La feta è un formaggio spagnolo.", v: false },
  { c: "cib", d: 1, q: "Lo champagne si produce in Italia.", v: false },
  { c: "cib", d: 1, q: "Lo strudel di mele è un dolce tipico della Sicilia.", v: false },
  { c: "cib", d: 2, q: "La pastiera napoletana è un dolce tipico di Pasqua.", v: true },
  { c: "cib", d: 2, q: "Il pastel de nata è un dolce portoghese.", v: true },
  { c: "cib", d: 2, q: "Il panettone è nato a Napoli.", v: false },
  { c: "cib", d: 2, q: "La fonduta di formaggio è un piatto tipico della Grecia.", v: false },
  { c: "cib", d: 3, q: "La ribollita è una zuppa tipica della Toscana.", v: true },
  { c: "cib", d: 3, q: "Lo Stollen è un dolce natalizio tedesco.", v: true },
  { c: "cib", d: 3, q: "La bouillabaisse è una zuppa tipica di Lione.", v: false },

  // ===== SCIENZA E NATURA =====
  { c: "sci", d: 1, q: "La balena è un mammifero.", v: true },
  { c: "sci", d: 1, q: "La Luna impiega circa un mese a girare intorno alla Terra.", v: true },
  { c: "sci", d: 1, q: "I pinguini vivono al Polo Nord.", v: false },
  { c: "sci", d: 1, q: "Il ragno è un insetto.", v: false },
  { c: "sci", d: 1, q: "Il primo uomo nello spazio fu Neil Armstrong.", v: false },
  { c: "sci", d: 2, q: "Il cuore umano è diviso in quattro cavità.", v: true },
  { c: "sci", d: 2, q: "La Luna dista dalla Terra più di 300.000 km.", v: true },
  { c: "sci", d: 2, q: "Il diamante è fatto di silicio.", v: false },
  { c: "sci", d: 2, q: "Su Marte un anno dura meno che sulla Terra.", v: false },
  { c: "sci", d: 3, q: "Il suono viaggia più veloce nell'acqua che nell'aria.", v: true },
  { c: "sci", d: 3, q: "Venere ruota su se stessa al contrario rispetto alla Terra.", v: true },
  { c: "sci", d: 3, q: "La Fossa delle Marianne è profonda meno di 8.000 metri.", v: false },

  // ===== SPORT E SPETTACOLO =====
  { c: "spo", d: 1, q: "Il tempo regolamentare di una partita di calcio è di 90 minuti.", v: true },
  { c: "spo", d: 1, q: "Il Festival di Cannes si svolge in Francia.", v: true },
  { c: "spo", d: 1, q: "La Mostra del cinema di Venezia assegna il Leone d'oro.", v: true },
  { c: "spo", d: 1, q: "Nella pallavolo ogni squadra ha 11 giocatori in campo.", v: false },
  { c: "spo", d: 1, q: "Topolino è un personaggio creato dalla Pixar.", v: false },
  { c: "spo", d: 2, q: "«Il Padrino» è stato diretto da Francis Ford Coppola.", v: true },
  { c: "spo", d: 2, q: "Il Gran Premio di Monaco si corre per le strade di Monte Carlo.", v: true },
  { c: "spo", d: 2, q: "Al Tour de France il primo in classifica indossa la maglia rosa.", v: false },
  { c: "spo", d: 2, q: "Il Giro d'Italia è nato dopo la Seconda guerra mondiale.", v: false },
  { c: "spo", d: 3, q: "Il primo Festival di Sanremo si tenne nel 1951.", v: true },
  { c: "spo", d: 3, q: "«Via col vento» fu il primo film sonoro della storia.", v: false },
  { c: "spo", d: 3, q: "Le prime Olimpiadi invernali si tennero in Italia.", v: false }
];

window.DOMANDE_ORDINE = [
  // ===== GEOGRAFIA =====
  { c: "geo", q: "Dalla città più a nord alla più a sud", el: ["Oslo", "Berlino", "Roma", "Atene"] },
  { c: "geo", q: "Dalla montagna più alta alla più bassa", el: ["Kilimangiaro", "Monte Bianco", "Etna", "Vesuvio"] },
  { c: "geo", q: "Dal paese più grande al più piccolo (superficie)", el: ["Francia", "Italia", "Grecia", "Belgio"] },
  { c: "geo", q: "Dal fiume più lungo al più corto", el: ["Nilo", "Danubio", "Po", "Tevere"] },
  { c: "geo", q: "Dalla città più a ovest alla più a est", el: ["Lisbona", "Parigi", "Vienna", "Mosca"] },

  // ===== STORIA =====
  { c: "sto", q: "Dal più antico al più recente", el: ["Piramidi di Giza", "Fondazione di Roma", "Morte di Giulio Cesare", "Fine dell'Impero d'Occidente"] },
  { c: "sto", q: "Dal più antico al più recente", el: ["Battaglia di Hastings", "Magna Carta", "Scoperta dell'America", "Presa della Bastiglia"] },
  { c: "sto", q: "Dal più antico al più recente", el: ["Congresso di Vienna", "Unità d'Italia", "Italia diventa Repubblica", "Caduta del Muro di Berlino"] },
  { c: "sto", q: "Dal più antico al più recente", el: ["Stampa di Gutenberg", "Primo giro del mondo", "Indipendenza degli USA", "Primo uomo sulla Luna"] },
  { c: "sto", q: "Dal nato prima al nato dopo", el: ["Alessandro Magno", "Giulio Cesare", "Carlo Magno", "Napoleone Bonaparte"] },

  // ===== ARTE E CULTURA =====
  { c: "art", q: "Dal pittore nato prima al nato dopo", el: ["Giotto", "Leonardo da Vinci", "Caravaggio", "Vincent van Gogh"] },
  { c: "art", q: "Dal compositore nato prima al nato dopo", el: ["Antonio Vivaldi", "Wolfgang A. Mozart", "Giuseppe Verdi", "Giacomo Puccini"] },
  { c: "art", q: "Dallo scrittore nato prima al nato dopo", el: ["Dante Alighieri", "William Shakespeare", "Alessandro Manzoni", "Umberto Eco"] },
  { c: "art", q: "Dal monumento più antico al più recente", el: ["Partenone", "Colosseo", "Torre di Pisa", "Torre Eiffel"] },
  { c: "art", q: "Dal più alto al più basso", el: ["Torre Eiffel", "Cupola di San Pietro", "Torre di Pisa", "David di Michelangelo"] },

  // ===== CIBO E TRADIZIONI =====
  { c: "cib", q: "In ordine di portata in un pranzo italiano", el: ["Antipasto", "Primo", "Secondo", "Dolce"] },
  { c: "cib", q: "Dal più a nord al più a sud (città d'origine)", el: ["Risotto alla milanese", "Bistecca alla fiorentina", "Pizza margherita", "Pasta alla Norma"] },
  { c: "cib", q: "Dal più a nord al più a sud (città d'origine)", el: ["Formaggio Edam", "Sachertorte", "Bouillabaisse", "Paella"] },
  { c: "cib", q: "Dal più antico al più recente (anno di nascita)", el: ["Sachertorte", "Coca-Cola", "Moka Bialetti", "Nutella"] },
  { c: "cib", q: "Dalla prima all'ultima nel calendario", el: ["Epifania", "Festa della Repubblica", "Ferragosto", "Ognissanti"] },

  // ===== SCIENZA E NATURA =====
  { c: "sci", q: "Dal pianeta più vicino al Sole al più lontano", el: ["Venere", "Terra", "Marte", "Saturno"] },
  { c: "sci", q: "Dal più grande al più piccolo (diametro)", el: ["Sole", "Giove", "Terra", "Luna"] },
  { c: "sci", q: "Dal più antico al più recente", el: ["Cannocchiale di Galileo", "Pila di Volta", "Volo dei fratelli Wright", "Gagarin nello spazio"] },
  { c: "sci", q: "Dall'animale più pesante al più leggero", el: ["Balenottera azzurra", "Elefante africano", "Cavallo", "Gatto"] },
  { c: "sci", q: "Dal più piccolo al più grande", el: ["Atomo", "Globulo rosso", "Formica", "Elefante"] },

  // ===== SPORT E SPETTACOLO =====
  { c: "spo", q: "Dal film più vecchio al più recente", el: ["Biancaneve e i sette nani", "La dolce vita", "E.T. l'extra-terrestre", "Avatar"] },
  { c: "spo", q: "Dalla canzone più vecchia alla più recente", el: ["'O sole mio", "Nel blu, dipinto di blu", "Thriller", "Despacito"] },
  { c: "spo", q: "Dal più antico al più recente", el: ["Primo Tour de France", "Primo Mondiale di calcio", "Primo Super Bowl", "Mondiale in Sudafrica"] },
  { c: "spo", q: "Dalla gara di corsa più lunga alla più corta", el: ["Maratona", "10.000 metri", "1.500 metri", "100 metri"] },
  { c: "spo", q: "Da più giocatori in campo a meno (per squadra)", el: ["Rugby a 15", "Calcio", "Pallavolo", "Tennis (singolare)"] }
];
