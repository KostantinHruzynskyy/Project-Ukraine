const rooms = {
  kyivan: {
    period: "IX-XIII secolo",
    title: "Kyivan Rus'",
    text: "Kyiv fu uno dei grandi centri medievali dell'Europa orientale. Questa sala apre la storia ucraina prima degli imperi moderni.",
    object: "Oggetto simbolico: Kyiv, citta-madre della memoria storica.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Flag%20of%20Ukraine.svg",
    alt: "Bandiera dell'Ucraina"
  },
  cosacchi: {
    period: "XVI-XVIII secolo",
    title: "Cosacchi e liberta",
    text: "La tradizione cosacca unisce autonomia, difesa armata, assemblee e immaginario della frontiera.",
    object: "Oggetto simbolico: la mazza da hetman, segno di autorita.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Cossack%20with%20musket.svg",
    alt: "Cosacco con moschetto"
  },
  holodomor: {
    period: "1932-1933",
    title: "Holodomor",
    text: "La carestia forzata colpi milioni di ucraini. Ricordarla significa opporsi alla cancellazione storica.",
    object: "Oggetto simbolico: una spiga di grano spezzata.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/HolodomorKharkiv.jpg",
    alt: "Civili durante l'Holodomor a Kharkiv"
  },
  ww2: {
    period: "1939-1945",
    title: "Seconda guerra mondiale",
    text: "L'Ucraina subi occupazione nazista, massacri e distruzioni, ma milioni di ucraini contribuirono alla sconfitta del nazismo.",
    object: "Oggetto simbolico: papavero della memoria, lutto e vittoria.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Kiev%20BabiYar%20Monument%20070613.jpg",
    alt: "Monumento di Babyn Yar a Kyiv"
  },
  maidan: {
    period: "2013-2014",
    title: "Rivoluzione della Dignita",
    text: "Maidan e la richiesta di dignita, giustizia e futuro europeo. Una piazza diventa luogo politico e morale.",
    object: "Oggetto simbolico: casco, bandiera e barricate.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/We%27ll%20not%20retreat%21%20Euromaidan%202014%20in%20Kyiv.jpg",
    alt: "Euromaidan a Kyiv"
  },
  invasione: {
    period: "Dal 2022",
    title: "Invasione e resistenza",
    text: "L'invasione russa su vasta scala trasforma l'intera societa ucraina in una rete di difesa, cura e memoria.",
    object: "Oggetto simbolico: la bandiera ucraina tra le rovine.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/%D0%A3%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D1%81%D1%8C%D0%BA%D0%B8%D0%B9_%D0%BF%D1%80%D0%B0%D0%BF%D0%BE%D1%80_2022.jpg",
    alt: "Bandiera ucraina nel 2022"
  },
  cultura: {
    period: "Sempre",
    title: "Cultura viva",
    text: "Lingua, cibo, ricami, canti, letteratura e terra tengono insieme identita e futuro.",
    object: "Oggetto simbolico: vyshyvanka, pane e parola ucraina.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Ukrainian%20embroidery.jpg",
    alt: "Ricamo tradizionale ucraino"
  }
};

const roomButtons = document.querySelectorAll(".museum-room");
const display = document.querySelector("#museumDisplay");

roomButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const room = rooms[button.dataset.room];

    roomButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    display.innerHTML = `
      <img src="${room.image}" alt="${room.alt}">
      <div>
        <span>${room.period}</span>
        <h2>${room.title}</h2>
        <p>${room.text}</p>
        <strong>${room.object}</strong>
      </div>
    `;
  });
});

const museumQuiz = document.querySelector("[data-museum-quiz]");
const museumQuizResult = document.querySelector("#museumQuizResult");

if (museumQuiz && museumQuizResult) {
  museumQuiz.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      museumQuiz.querySelectorAll("button").forEach((item) => item.classList.remove("correct", "wrong"));
      const isCorrect = button.dataset.correct === "true";
      button.classList.add(isCorrect ? "correct" : "wrong");
      museumQuizResult.textContent = isCorrect
        ? "Esatto: la resistenza ucraina e militare, ma anche culturale e civile."
        : "Non proprio: la cultura e una parte essenziale della resistenza.";
    });
  });
}
