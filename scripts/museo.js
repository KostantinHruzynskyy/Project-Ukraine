const museumRooms = {
  kyivan: {
    era: "IX-XIII secolo",
    title: "Kyivan Rus'",
    description: "Kyiv fu uno dei grandi centri medievali dell'Europa orientale. Questa sala apre la storia ucraina prima degli imperi moderni.",
    object: "Oggetto simbolico: Kyiv, citta-madre della memoria storica.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Flag%20of%20Ukraine.svg",
    facts: [
      "Kyiv fu fondata nel V secolo",
      "Il X secolo vide l'ascesa del Rus' di Kyiv",
      "La cattedrale di Santa Sofia è patrimonio UNESCO",
      "Kyiv è diventata centro religioso e commerciale"
    ]
  },
  cosacchi: {
    era: "XVI-XVIII secolo",
    title: "Cosacchi",
    description: "La tradizione cosacca lega difesa, autonomia militare e immaginario della liberta ucraina. I cosacchi furono guerrieri liberi che difesero i confini.",
    object: "Oggetto simbolico: La libertà delle steppe e la tradizione militare.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Cossack%20with%20a%20musket.jpg",
    facts: [
      "I cosacchi nacquero nel XV secolo",
      "La Zaporizhzhia fu la loro fortezza",
      "Erano organizzati in republiche militari",
      "Simbolo di autonomia e resistenza"
    ]
  },
  holodomor: {
    era: "1932-1933",
    title: "Holodomor",
    description: "La carestia forzata che colpì milioni di ucraini e diventa una ferita centrale della memoria nazionale.",
    object: "Oggetto simbolico: Il chicco di grano, simbolo di vita e morte.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/HolodomorKharkiv.jpg",
    facts: [
      "Milioni di vittime in tutta l'Ucraina",
      "Il grano fu requisito dal regime sovietico",
      "La memoria fu censurata per decenni",
      "Oggi è riconosciuto come genocidio"
    ]
  },
  ww2: {
    era: "1941-1945",
    title: "Seconda guerra mondiale",
    description: "L'Ucraina fu uno dei principali campi di battaglia del fronte orientale. Milioni di ucraini combatterono nelle forze sovietiche.",
    object: "Oggetto simbolico: La memoria dei caduti e la ricostruzione.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Kiev%20BabiYar%20Monument%20070613.jpg",
    facts: [
      "6+ milioni di ucraini nelle forze sovietiche",
      "5-7 milioni di morti ucraini",
      "700+ città distrutte",
      "Babyn Yar: simbolo della Shoah ucraina"
    ]
  },
  maidan: {
    era: "2013-2014",
    title: "Maidan",
    description: "La Rivoluzione della Dignita: proteste per dignita, giustizia e integrazione europea.",
    object: "Oggetto simbolico: La piazza come spazio di liberta.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/We%27ll%20not%20retreat%21%20Euromaidan%202014%20in%20Kyiv.jpg",
    facts: [
      "Iniziò nel novembre 2013",
      "Heavenly Hundred: i manifestanti uccisi",
      "Caduta di Yanukovych nel febbraio 2014",
      "Simbolo della scelta europea"
    ]
  },
  invasione: {
    era: "2022-oggi",
    title: "Invasione 2022",
    description: "La guerra totale porta assedi, bombardamenti e resistenza nazionale.",
    object: "Oggetto simbolico: La bandiera ucraina, simbolo di resistenza.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/%D0%A3%D0%BA%D1%80%D0%B0%D0%B9%D0%BD%D1%81%D1%8C%D0%BA%D0%B8%D0%B9_%D0%BF%D1%80%D0%B0%D0%BF%D0%BE%D1%80_2022.jpg",
    facts: [
      "24 febbraio 2022: inizio invasione",
      "Kyiv resiste all'iniziale assedio",
      "Bucha, Mariupol: simboli della sofferenza",
      "Kherson liberata l'11 novembre 2022"
    ]
  },
  cultura: {
    era: "Tradizione e modernita",
    title: "Cultura viva",
    description: "La resistenza non e solo militare: vive nella lingua, nel cibo, nelle famiglie, nella scuola e nella letteratura.",
    object: "Oggetto simbolico: Vyshyvanka, simbolo di identita.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Vyshyvanka.jpg",
    facts: [
      "Borshch riconosciuto dall'UNESCO",
      "Vyshyvanka: ricamo tradizionale",
      "Pysanky: uova decorate",
      "Musica: da bandura a DakhaBrakha"
    ]
  },
  lingua: {
    era: "Identita nazionale",
    title: "Lingua ucraina",
    description: "L'ucraino e lingua nazionale, scuola, letteratura e memoria quotidiana: usarla significa difendere identita dopo secoli di russificazione.",
    object: "Oggetto simbolico: Il libro di Shevchenko, padre della lingua letteraria.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Taras%20Shevchenko.jpg",
    facts: [
      "Lingua ufficiale dal 1991",
      "Secolari di russificazione",
      "Rinascita culturale contemporanea",
      "24 agosto: Giorno della Lingua Ucraina"
    ]
  },
  autori: {
    era: "Letteratura",
    title: "Autori ucraini",
    description: "Poeti e scrittori sono parte della coscienza nazionale: raccontano liberta, repressione, citta orientali, guerra, ironia e dignita.",
    object: "Oggetto simbolico: Le opere di Shevchenko, Stus, Zhadan.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Serhiy_Zhadan.jpg",
    facts: [
      "Taras Shevchenko: poeta nazionale",
      "Vasyl Stus: poeta dissidente",
      "Serhiy Zhadan: voce contemporanea",
      "Oksana Zabuzhko: saggistica e narrativa"
    ]
  },
  musica: {
    era: "Tradizione e innovazione",
    title: "Musica ucraina",
    description: "La musica va dai kobzari alla scena elettronica e pop: folklore, jazz, rap, Eurovision e concerti al fronte diventano diplomazia culturale.",
    object: "Oggetto simbolico: Bandura, strumento tradizionale.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Bandura.jpg",
    facts: [
      "Bandura: strumento a corde tradizionale",
      "Jamala: vittoria Eurovision 2016",
      "DakhaBrakha: world music contemporanea",
      "Kalush Orchestra: Eurovision 2022"
    ]
  },
  cibo: {
    era: "Tradizioni culinarie",
    title: "Cibo e tradizioni",
    description: "Il cibo racconta famiglia, villaggio, festa, lutto e solidarieta. Anche cucinare diventa identita.",
    object: "Oggetto simbolico: Borshch, zuppa nazionale.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Borshch.jpg",
    facts: [
      "Borshch: patrimonio UNESCO",
      "Varenyky: ravioli tradizionali",
      "Holubtsi: ripieni di cavolo",
      "Pampushky: pane all'aglio"
    ]
  },
  citta: {
    era: "Territori",
    title: "Città ucraine",
    description: "Ogni citta racconta un volto diverso: capitale antica, frontiera europea, porto cosmopolita, industria, universita e resistenza.",
    object: "Oggetto simbolico: Le citta come crocevia di culture.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Kyiv_panorama.jpg",
    facts: [
      "Kyiv: capitale millenaria",
      "Lviv: porta dell'Europa",
      "Odesa: porto cosmopolita",
      "Kharkiv: citta industriale"
    ]
  },
  societa: {
    era: "Comunita",
    title: "Societa e religioni",
    description: "Ortodossi, greco-cattolici, ebrei, musulmani crimeani e altre comunita mostrano una storia religiosa plurale.",
    object: "Oggetto simbolico: Le chiese, simbolo di pluralismo.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Saint_Michael%27s_Golden-Domed_Monastery.jpg",
    facts: [
      "Chiesa ortodossa: maggioritaria",
      "Chiesa greco-cattolica: occidentale",
      "Comunità ebraica: storia millenaria",
      "Tatari di Crimea: islam"
    ]
  },
  diaspora: {
    era: "Mondi connessi",
    title: "Diaspora",
    description: "La diaspora conserva lingua, chiese, scuole, festival e reti di aiuto: durante la guerra e diventata anche diplomazia civile.",
    object: "Oggetto simbolico: I ponti tra le comunita globali.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Ukrainian_diaspora.jpg",
    facts: [
      "Forte presenza in Canada e USA",
      "Comun e Europa",
      "Reti di aiuto durante la guerra",
      "Diplomazia civile globale"
    ]
  },
  tecnologia: {
    era: "Innovazione",
    title: "Tecnologia",
    description: "L'Ucraina ha una forte tradizione tecnica: aerospazio, matematica, informatica, industria e innovazione militare/civile.",
    object: "Oggetto simbolico: L'innovazione come difesa.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Ukrainian_drone.jpg",
    facts: [
      "Industria aerospaziale storica",
      "Settore IT globale",
      "Droni: innovazione militare",
      "Startup tecnologiche"
    ]
  }
};

function initMuseum() {
  const navButtons = document.querySelectorAll('.museum-room');
  const display = document.getElementById('museumDisplay');
  const quizContainer = document.querySelector('[data-museum-quiz]');
  const quizResult = document.getElementById('museumQuizResult');

  if (!navButtons.length || !display) return;

  function showRoom(roomId) {
    const room = museumRooms[roomId];
    if (!room) return;

    display.innerHTML = `
      <img src="${room.image}" alt="${room.title}" loading="lazy">
      <div>
        <span>${room.era}</span>
        <h2>${room.title}</h2>
        <p>${room.description}</p>
        <strong>${room.object}</strong>
        <ul class="museum-facts">
          ${room.facts.map(fact => `<li>${fact}</li>`).join('')}
        </ul>
      </div>
    `;

    navButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.room === roomId);
    });
  }

  navButtons.forEach(button => {
    button.addEventListener('click', () => {
      showRoom(button.dataset.room);
    });
  });

  if (quizContainer) {
    quizContainer.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
        const isCorrect = e.target.dataset.correct === 'true';
        if (quizResult) {
          quizResult.textContent = isCorrect 
            ? 'Corretto! La cultura ucraina e fatta di lingua, memoria, terra e comunita.' 
            : 'Riprova. Pensa a cosa rende un popolo resiliente oltre le armi.';
          quizResult.className = 'quiz-result ' + (isCorrect ? 'correct' : 'incorrect');
        }
      }
    });
  }

  showRoom('kyivan');
}

document.addEventListener('DOMContentLoaded', initMuseum);