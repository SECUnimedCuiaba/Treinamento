// ======================================================
// 1. DADOS (JSONs)
// ======================================================

const monthlyTrainings = {
  1: [],
  2: [], 
  3: [], 
  4: [], 
  5: [], 
  6: [], 
  7: ["monitorPhilips"], 
  8: ["cardioversorPhilips"], 
  9: ["ecgAlfamed"], 
  10: ["aspiradorFanem"], 
  11: ["bisturiWem"], 
  12: []
};

// Templates de equipamentos completos
const equipmentTemplates = {
  monitorPhilips: {
    img: "imagens/monitor-philips.png",
    alt: "Monitor Philips Efficia",
    title: "Monitor Multiparâmetros | Philips Efficia CM1xx | duração: 13min",
    equipamento: "Monitor Multiparâmetros",
    fabricanteModelo: "Philips Efficia CM1xx",
    duracao: "13min",
   // pdfLink: "instrucoes/indisponível.pdf",
    link: "https://forms.gle/xgdswhyromyNBCbQ7",
    driveId: "cid=fb3c0779cead57da&id=FB3C0779CEAD57DA!sefade4ad6ac3491a970bdd3bdcf062db&resid=FB3C0779CEAD57DA!sefade4ad6ac3491a970bdd3bdcf062db&ithint=video,mp4&embed=1&width=1276&height=720&migratedtospo=true&redeem=aHR0cHM6Ly8xZHJ2Lm1zL3YvYy9mYjNjMDc3OWNlYWQ1N2RhL0lRU3Q1SzN2dzJvYVNaY0wzVHZjOEdMYkFXcmtOVWxJbldRS20weHBFVnI0Y0JjP3dpZHRoPTEyNzYmaGVpZ2h0PTcyMA",
  },
  aspiradorFanem: {
    img: "imagens/aspirador-fanem.png",
    alt: "Aspirador Fanem Colibri",
    title: "Aspirador Elétrico | Fanem DPM-60 | duração: 10min",
    equipamento: "Aspirador Elétrico",
    fabricanteModelo: "Fanem DPM-60",
    duracao: "10min",
   // pdfLink: "instrucoes/indisponível.pdf",
    link: "https://forms.gle/9dGdURLF8Hh2d3jf7",
    driveId: "cid=fb3c0779cead57da&id=FB3C0779CEAD57DA!sedba08dfe2e24bc5b8629b28b46ba207&resid=FB3C0779CEAD57DA!sedba08dfe2e24bc5b8629b28b46ba207&ithint=video,mp4&embed=1&width=1080&height=1920&migratedtospo=true&redeem=aHR0cHM6Ly8xZHJ2Lm1zL3YvYy9mYjNjMDc3OWNlYWQ1N2RhL0lRVGZDTHJ0NHVMRlM3aGlteWkwYTZJSEFTTHdLcG1yWWlQWk1wdnprN2JrV0FVP3dpZHRoPTEwODAmaGVpZ2h0PTE5MjA",
  },
  cardioversorPhilips: {
    img: "imagens/dfm_100.jpg",
    alt: "Cardioversor Philips DFM-100",
    title: "Cardioversor | Philips - DFM100 | duração: 25min",
    equipamento: "Cardioversor",
    fabricanteModelo: "Philips DFM100",
    duracao: "25min",
    pdfLink: "instrucoes/PHILIPS_DFM100.pdf",
    link: "https://forms.gle/GTAjx5d86nDwAkkc8",
    driveId: "cid=fb3c0779cead57da&id=FB3C0779CEAD57DA!s3664c787c4634c02979a597c62ffc5a6&resid=FB3C0779CEAD57DA!s3664c787c4634c02979a597c62ffc5a6&ithint=video,mp4&embed=1&width=1280&height=720&migratedtospo=true&redeem=aHR0cHM6Ly8xZHJ2Lm1zL3YvYy9mYjNjMDc3OWNlYWQ1N2RhL0lRU0h4MlEyWThRQ1RKZWFXWHhpXzhXbUFTcWMySFUtbmZHT1FxY3FPTVhTbHVjP3dpZHRoPTEyODAmaGVpZ2h0PTcyMA",
  },
  mesaBarrfab: {
    img: "imagens/mesa_cirurgica_barrfab.png",
    alt: "Mesa Cirúrgica Barrfab",
    title: "Mesa Cirúrgica | Barrfab BF683 TDP",
    equipamento: "Mesa Cirúrgica",
    fabricanteModelo: "Barrfab BF683 TDP",
    duracao: "--",
    //pdfLink: "instrucoes/indisponível.pdf",
    link: null,
  },
  termohigrometro: {
    img: "imagens/termohigrometro.png",
    alt: "Termohigrômetro",
    title: "Termômetro Digital - Higrômetro",
    equipamento: "Termômetro Digital",
    fabricanteModelo: "Termohigrômetro",
    duracao: "--",
  //  pdfLink: "instrucoes/indisponível.pdf",
    link: null,
  },
  anestesiaDrager: {
    img: "imagens/aparelho_anestesia_drager.jpg",
    alt: "Aparelho de anestesia Drager Atlan A3xx",
    title: "Aparelho de Anestesia | Drager Atlan A300/350",
    equipamento: "Aparelho de Anestesia",
    fabricanteModelo: "Drager Atlan A300/350",
    duracao: "--",
  //  pdfLink: "instrucoes/indisponível.pdf",
    link: null,
  },
  ventiladorMagnamed: {
    img: "imagens/ventilador_magnamed.png",
    alt: "Ventilador de transporte Magnamed Oxymag",
    title: "Ventilador Pulmonar | Magnamed Oxymag",
    equipamento: "Ventilador Pulmonar",
    fabricanteModelo: "Magnamed Oxymag",
    duracao: "--",
    pdfLink: "instrucoes/OXYMAG.pdf",
    link: null,
  },
  torniqueteStryker: {
    img: "imagens/torniquete_stryker.png",
    alt: "Sistema de Torniquete Stryker Smartpump",
    title: "Sistema de Torniquete | Stryker SmartPump",
    equipamento: "Sistema de Torniquete",
    fabricanteModelo: "Stryker SmartPump",
    duracao: "--",
    //pdfLink: "instrucoes/indisponível.pdf",
    link: null,
  },
  bisturiWem: {
    img: "imagens/WEM SS501sx.png",
    alt: "Bisturi Elétrico WEM SS 501SX",
    title: "Bisturi Elétrico | WEM SS-501sx",
    equipamento: "Bisturi Elétrico",
    fabricanteModelo: "WEM SS-501sx",
    duracao: "--",
   // pdfLink: "instrucoes/indisponível.pdf",
    link: null,
  },
  ventiladorTecme: {
    img: "imagens/ventilador_tecme.png",
    alt: "Ventilador Pulmonar Tecme Graphnet TS+",
    title: "Ventilador Pulmonar | Tecme GraphNet TS+",
    equipamento: "Ventilador Pulmonar",
    fabricanteModelo: "Tecme GraphNet TS+",
    duracao: "--",
    pdfLink: "instrucoes/TECME_GRAPHNET.pdf",
    link: null,
  },
  ecgAlfamed: {
    img: "imagens/EcgAlfamed.png",
    alt: "Eletrocardiógrafo Alfamed Ritmus1200",
    title: "Eletrocardiógrafo | Alfamed Ritmus1200 | duração: 13min",
    equipamento: "Eletrocardiógrafo",
    fabricanteModelo: "Alfamed Ritmus1200",
    duracao: "13min",
   // pdfLink: "instrucoes/indisponível.pdf",
    link: "https://forms.gle/7U8PX667SK7qFyzD9",
    driveId: "cid=fb3c0779cead57da&id=FB3C0779CEAD57DA!s6e69a5530cf34b1382c2561450649337&resid=FB3C0779CEAD57DA!s6e69a5530cf34b1382c2561450649337&ithint=video,mp4&embed=1&width=1280&height=720&migratedtospo=true&redeem=aHR0cHM6Ly8xZHJ2Lm1zL3YvYy9mYjNjMDc3OWNlYWQ1N2RhL0lQSlRwV2x1OHd3VFM0TENWaFJRWkpNM0FmUDlCLWFYd3dpX2dfNWhLaDFpTEhZP3dpZHRoPTEyODAmaGVpZ2h0PTcyMA",
  },
  cardioversorInstramed8: {
    img: "imagens/cardioversor_instramed_cardiomax8.png",
    alt: "Cardioversor Instramed Cardiomax 8",
    title: "Cardioversor | Instramed Cardiomax 8 Series",
    equipamento: "Cardioversor",
    fabricanteModelo: "Instramed Cardiomax 8 Series",
    duracao: "--",
    pdfLink: "instrucoes/CARDIOMAX8.pdf",
    link: null,
  },
  camaArjo: {
    img: "imagens/Cama_Arjo.jpg",
    alt: "Cama Hospitalar ARJO Prioma",
    title: "Cama Hospitalar | Arjo Prioma 600",
    equipamento: "Cama Hospitalar",
    fabricanteModelo: "Arjo Prioma 600",
    duracao: "--",
   // pdfLink: "instrucoes/indisponível.pdf",
    link: null,
  },
  estufaFanem: {
    img: "imagens/estufa-fanem.jpg",
    alt: "Estufa para aquecimento de soro Fanem",
    title: "Estufa para Aquecimento de Soro | Fanem 2503/1 | duração: 5min",
    equipamento: "Estufa para Aquecimento de Soro",
    fabricanteModelo: "Fanem 2503/1",
    duracao: "5min",
 //   pdfLink: "instrucoes/indisponível.pdf",
    link: "https://forms.gle/LxK7htH8SEVkxVv16",
    driveId: "cid=fb3c0779cead57da&id=FB3C0779CEAD57DA!sedba08dfe2e24bc5b8629b28b46ba207&resid=FB3C0779CEAD57DA!s81651ed83af24477a835ed98ee5e0625&ithint=video,mp4&embed=1&redeem=aHR0cHM6Ly8xZHJ2Lm1zL3YvYy9mYjNjMDc3OWNlYWQ1N2RhL0lRVFlIbVdCOGpwM1JLZzE3Wmp1WGdZbEFYcnk1MGhnVlhSRjRxcmd6dGl4NEtvP3dpZHRoPTEyODAmaGVpZ2h0PTcyMA",
  },
  cardioversorApolus: {
    img: "imagens/Desfibrilador_Instramed_Apolus.png",
    alt: "Desfibrilador Instramed Apolus",
    title: "Cardioversor | Instramed Apolus",
    equipamento: "Cardioversor",
    fabricanteModelo: "Instramed Apolus",
    duracao: "--",
   // pdfLink: "instrucoes/indisponível.pdf",
    link: null,
  },
  ventiladorResmed: {
    img: "imagens/ventilador_resmed.png",
    alt: "Ventilador Resmed Astral 150",
    title: "Ventilador Pulmonar | Resmed - Astral 150",
    equipamento: "Ventilador Pulmonar",
    fabricanteModelo: "Resmed - Astral 150",
    duracao: "--",
   // pdfLink: "instrucoes/indisponível.pdf",
    link: null,
  },
  autoclaveBaumer: {
    img: "imagens/autoclave_baumer.jpeg",
    alt: "Autoclave Baumer",
    title: "Autoclave | Baumer - HI VAC  II 542L",
    equipamento: "Autoclave",
    fabricanteModelo: "Baumer - HI VAC  II 542L",
    duracao: "--",
   // pdfLink: "instrucoes/indisponível.pdf",
    link: null,
  },
  termodesinfectoraBaumer: {
    img: "imagens/termodesinfectora_baumer.jpeg",
    alt: "Lavadora Termodesinfectora Baumer",
    title: "Lavadora Termodesinfectora | Baumer - TW-E2000-400P",
    equipamento: "Lavadora Termodesinfectora",
    fabricanteModelo: "Baumer - TW-E2000-400P",
    duracao: "--",
    //pdfLink: "instrucoes/indisponível.pdf",
    link: null,
  },
  lavadoraUltrassonicaBaumer: {
    img: "imagens/lavadora_ultrassonica_baumer.jpeg",
    alt: "Lavadora Ultrassônica Baumer",
    title: "Lavadora Ultrassonica | Baumer E0201-042",
    equipamento: "Lavadora Ultrassonica",
    fabricanteModelo: "Baumer E0201-042",
    duracao: "--",
  //  pdfLink: "instrucoes/indisponível.pdf",
    link: null,
  },
  esterilizadorPeroxidoBaumer: {
    img: "imagens/esterilizador_peroxido_baumer.png",
    alt: "Esterilizador por Peróxido de Hidrogênio Baumer",
    title: "Esterilizador por Peróxido de Hidrogênio | Baumer B0201-105-V02",
    equipamento: "Esterilizador por Peróxido de Hidrogênio",
    fabricanteModelo: "Baumer B0201-105-V02",
    duracao: "--",
   // pdfLink: "instrucoes/indisponível.pdf",
    link: null,
  },
  secadoraBaumer: {
    img: "imagens/secadora_baumer.jpeg",
    alt: "Gabinete de Secagem Baumer",
    title: "Secadora | Baumer EA-34-03",
    equipamento: "Secadora",
    fabricanteModelo: "Baumer EA-34-03",
    duracao: "--",
   // pdfLink: "instrucoes/indisponível.pdf",
    link: null,
  },
  camaraFanem: {
    img: "imagens/camara_fanem_3347.jpeg",
    alt: "Câmara de Conservação Fanem 3347/1",
    title: "Câmara de Conservação | Fanem 3347/1",
    equipamento: "Câmara de Conservação",
    fabricanteModelo: "Fanem 3347/1",
    duracao: "--",
  //  pdfLink: "instrucoes/indisponível.pdf",
    link: null,
  },
  camaraIndrel: {
    img: "imagens/camara_indrel_220.jpeg",
    alt: "Câmara de Conservação Indrel RC220",
    title: "Câmara de Conservação | Indrel - RC220",
    equipamento: "Câmara de Conservação",
    fabricanteModelo: "Indrel - RC220",
    duracao: "--",
   // pdfLink: "instrucoes/indisponível.pdf",
    link: null,
  },
  camaraBiotecno: {
    img: "imagens/camara_biotecno_1100.jpeg",
    alt: "Câmara de Conservação Biotecno BT1100",
    title: "Câmara de Conservação | Biotecno - BT1100",
    equipamento: "Câmara de Conservação",
    fabricanteModelo: "Biotecno - BT1100",
    duracao: "--",
   // pdfLink: "instrucoes/indisponível.pdf",
    link: null,
  },
  monitorDragerVista120S: {
    img: "imagens/monitor_drager_vista120S_.jpg",
    alt: "Monitor Multiparâmetros Drager Vista 120S",
    title: "Monitor Multiparâmetros | Drager Vista 120S",
    equipamento: "Monitor Multiparâmetros",
    fabricanteModelo: "Drager Vista 120S",
    duracao: "--",
   // pdfLink: "instrucoes/indisponível.pdf",
    link: null,
  },
  bombaDeInfusaoLifemed: {
    img: "imagens/bombaDeInfusao_Lifemed.png",
    alt: "Bomba de Infusão Lifemed LF2001",
    title: "Bomba de Infusão | Lifemed LF2001",
    equipamento: "Bomba de Infusão",
    fabricanteModelo: "Lifemed LF2001",
    duracao: "--",
   // pdfLink: "instrucoes/indisponível.pdf",
    link: null,
  },
  monitorInstramedInmax12: {
    img: "imagens/monitor_instramed_inMax12.jpg",
    alt: "Monitor Multiparâmetros Instramed InMax12",
    title: "Monitor Multiparâmetros | Instramed InMax12",
    equipamento: "Monitor Multiparâmetros",
    fabricanteModelo: "Instramed InMax12",
    duracao: "--",
   // pdfLink: "instrucoes/indisponível.pdf",
    link: null,
  },
};

function getMonthlyTraining() {
  const month = new Date().getMonth() + 1;
  return monthlyTrainings[month] || [];
}

const equipmentData = {
  "treinamento-mes": getMonthlyTraining(),
  "centro-cirurgico": ["monitorPhilips", "cardioversorPhilips", "aspiradorFanem", "mesaBarrfab", "hipoHipertermia", "termohigrometro", "anestesiaDrager", "ventiladorMagnamed", "torniqueteStryker", "bisturiWem", "bombaDeInfusaoLifemed"],
  uti: ["cardioversorPhilips", "monitorPhilips", "ecgAlfamed", "ventiladorTecme", "ventiladorMagnamed", "cardioversorInstramed8", "camaArjo", "termohigrometro", "bombaDeInfusaoLifemed"],
  internacao: ["cardioversorPhilips", "monitorPhilips", "ecgAlfamed", "ventiladorResmed", "camaArjo", "termohigrometro", "camaraFanem", "bombaDeInfusaoLifemed"],
  pa: ["ecgAlfamed", "monitorPhilips", "cardioversorPhilips", "cardioversorInstramed8", "monitorDragerVista120S", "cardioversorApolus", "ventiladorTecme", "ventiladorResmed", "bombaDeInfusaoLifemed", "monitorInstramedInmax12"],
  farmacia: ["estufaFanem", "termohigrometro", "camaraFanem", "camaraIndrel", "camaraBiotecno"],
  imagem: ["termohigrometro", "cardioversorApolus"],
  infusao: ["cardioversorPhilips", "monitorPhilips", "cardioversorApolus", "bombaDeInfusaoLifemed", "monitorInstramedInmax12"],
  ambulatorio: ["ecgAlfamed"],
  cme: ["autoclaveBaumer", "termodesinfectoraBaumer", "lavadoraUltrassonicaBaumer", "esterilizadorPeroxidoBaumer", "secadoraBaumer"],
};

const sectorNames = {
  "treinamento-mes": "Treinamento do mês",
  "centro-cirurgico": "Centro Cirúrgico",
  uti: "UTI",
  internacao: "Internação",
  pa: "Pronto Atendimento",
  farmacia: "Farmácia",
  imagem: "Diagnóstico por Imagem",
  infusao: "Centro de Infusão",
  ambulatorio: "Ambulatório",
  cme: "CME",
};

// ======================================================
// 2. FUNÇÕES UTILITÁRIAS E GERAÇÃO DE CARDS
// ======================================================

// Funçãopara criar o card.
function createCardElement(itemKey) {
  const equip = equipmentTemplates[itemKey];
  
  // Se o item não existir no template, retorna null
  if (!equip) return null;

  // Lógica Botão Instruções (Azul se tiver link, Cinza se não)
  const instructionButton = equip.pdfLink
    ? `<a href="${equip.pdfLink}" target="_blank" class="instructions-link">Instruções Rápidas</a>`
    : `<a href="#" class="instructions-link disabled" onclick="return false;">Instruções Rápidas</a>`;

  // Lógica Botão Treinamento (Verde se tiver link, Cinza se não)
  const trainingButton = equip.link
    ? `<a href="#" class="training-link" data-equipamento="${equip.equipamento}" data-fabricante="${equip.fabricanteModelo}" data-form-link="${equip.link}" data-drive-id="${equip.driveId || ""}">Acessar Treinamento</a>`
    : `<a class="disabled training-link" href="#" onclick="return false;">Disponível em breve</a>`;

  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <img src="${equip.img}" alt="${equip.alt}">
    <h3>${equip.equipamento}</h3>
    <p class="fabricante">${equip.fabricanteModelo}</p>
    <p class="duration">duração: ${equip.duracao}</p>
    <div class="card-buttons">
      ${instructionButton}
      ${trainingButton}
    </div>
  `;
  return card;
}

// Modal de seleção de setor
function initSectorModal() {
  const modal = document.getElementById("sectorModal");
  const changeSectorBtn = document.getElementById("changeSectorBtn");
  const params = new URLSearchParams(window.location.search);
  const setorParam = params.get("setor");

  if (!setorParam) {
    modal.style.display = "block";
    if (changeSectorBtn) changeSectorBtn.style.display = "none";
  } else {
    modal.style.display = "none";
    if (changeSectorBtn) changeSectorBtn.style.display = "block";
  }

  if (changeSectorBtn) {
    changeSectorBtn.addEventListener("click", () => {
      modal.style.display = "block";
    });
  }
}

function toggleSector(header) {
  const section = header.parentElement;
  const cards = section.querySelector(".equipment-cards");
  cards.classList.toggle("collapsed");
  header.classList.toggle("open");
}

// Função para criar seções de setores
const createSection = (sectorKey, items) => {
  const section = document.createElement("section");
  section.className = "sector-category";
  section.dataset.setor = sectorKey;

  if (sectorKey === "treinamento-mes") section.classList.add("featured-month");

  const h2 = document.createElement("h2");
  h2.className = "sector-header";
  h2.onclick = () => toggleSector(h2);

  h2.innerHTML = sectorKey === "treinamento-mes"
      ? `<span class="featured-title"><span class="star">⭐</span>${sectorNames[sectorKey]}</span><span class="arrow">&#9654;</span>`
      : `Setor: ${sectorNames[sectorKey]} <span class="arrow">&#9654;</span>`;

  section.appendChild(h2);

  const cardsContainer = document.createElement("div");
  cardsContainer.className = "equipment-cards";

  items.forEach((item) => {
    const card = createCardElement(item);
    if (card) cardsContainer.appendChild(card);
  });
  
  section.appendChild(cardsContainer);
  return section;
};

// ======================================================
// 3. LÓGICA DO MODAL DE TREINAMENTO
// ======================================================

function openTrainingModal(equipamento, fabricante, formLink, driveId) {
  const modal = document.getElementById("trainingModal");
  const modalTitle = document.getElementById("modalTitle");
  const validationSection = document.getElementById("validationSection");
  const contentSection = document.getElementById("contentSection");

  modalTitle.textContent = `Verificação para: ${equipamento}`;
  validationSection.style.display = "block";
  contentSection.style.display = "none";

  // Reset inputs
  document.getElementById("emailInputTraining").value = "";
  document.getElementById("matriculaInputTraining").value = "";
  document.getElementById("codeInputTraining").value = "";
  document.getElementById("codeSectionTraining").style.display = "none";
  document.getElementById("trainingMsg").textContent = "";

  sessionStorage.setItem("pendingTraining", JSON.stringify({
    equipamento, fabricante, formLink, driveId
  }));

  modal.style.display = "block";
}

const modal = document.getElementById("trainingModal");
const closeBtn = document.querySelector(".close");

function closeTrainingModal() {
  modal.style.display = "none";
  document.getElementById("videoIframe").src = "";
  document.getElementById("formIframe").src = "";
}

closeBtn.onclick = closeTrainingModal;
window.onclick = function (event) {
  if (event.target === modal) closeTrainingModal();
};

// ======================================================
// 4. INICIALIZAÇÃO (DOMContentLoaded)
// ======================================================

document.addEventListener("DOMContentLoaded", function () {
  initSectorModal();

  const sectorsContainer = document.getElementById("sectors-container");

  // A. Renderização Inicial dos Setores
  const monthlyItems = equipmentData["treinamento-mes"];
  if (monthlyItems.length > 0) {
    sectorsContainer.appendChild(createSection("treinamento-mes", monthlyItems));
  }
  for (const [sectorKey, items] of Object.entries(equipmentData)) {
    if (sectorKey !== "treinamento-mes") {
      sectorsContainer.appendChild(createSection(sectorKey, items));
    }
  }

  // Garante que os setores iniciem abertos
  document.querySelectorAll(".sector-category").forEach((section) => {
    section.querySelector(".sector-header").classList.add("open");
    section.querySelector(".equipment-cards").style.display = "grid";
  });

  const params = new URLSearchParams(window.location.search);
  const setorParam = params.get("setor");

  // B. Lógica de Filtragem por Setor (URL)
  if (setorParam && setorParam !== "todos") {
    const allSections = Array.from(document.querySelectorAll(".sector-category"));
    const selectedSection = allSections.find(s => s.getAttribute("data-setor") === setorParam);
    const trainingSection = allSections.find(s => s.getAttribute("data-setor") === "treinamento-mes");

    // Limpa a tela
    allSections.forEach(s => s.remove());

    // 1. Reinsere Treinamento do Mês (filtrado pelo setor atual)
    if (trainingSection && setorParam !== "treinamento-mes") {
      sectorsContainer.appendChild(trainingSection);
      
      const setorEquipments = equipmentData[setorParam] || [];
      const monthlyEquipments = equipmentData["treinamento-mes"];
      const filteredEquipments = monthlyEquipments.filter(equip => setorEquipments.includes(equip));

      if (filteredEquipments.length > 0) {
        const cardsContainer = trainingSection.querySelector(".equipment-cards");
        cardsContainer.innerHTML = ""; 
        filteredEquipments.forEach(item => {
          const card = createCardElement(item);
          if (card) cardsContainer.appendChild(card);
        });
      } else {
        trainingSection.remove();
      }
    }

    // 2. Reinsere o Setor Selecionado
    if (selectedSection) {
      sectorsContainer.appendChild(selectedSection);
      selectedSection.querySelector(".equipment-cards").style.display = "grid";
      selectedSection.querySelector(".sector-header").classList.add("open");
    }
  }

  // C. Lógica de Busca e Autocomplete
  const searchInput = document.getElementById("equipmentSearchInput");
  const equipmentList = document.getElementById("equipmentList");
  const filteredResultsSection = document.getElementById("filtered-results");
  const filteredCardsContainer = document.querySelector(".filtered-cards");
  const allSectionsDOM = document.querySelectorAll(".sector-category");
  let currentSelectedIndex = -1;

  const uniqueEquipmentNames = [...new Set(Object.values(equipmentTemplates).map(e => e.equipamento))].sort();

  function showEquipmentList(filter = "", showAll = false) {
    equipmentList.innerHTML = "";
    let filtered = uniqueEquipmentNames;

    if (!showAll && filter.length > 0) {
      filtered = uniqueEquipmentNames.filter(name => name.toLowerCase().includes(filter.toLowerCase()));
    }

    if (filtered.length === 0) {
      equipmentList.style.display = "none";
      return;
    }

    filtered.forEach((name, index) => {
      const div = document.createElement("div");
      div.textContent = name;
      div.addEventListener("click", () => {
        searchInput.value = name;
        equipmentList.style.display = "none";
        showFilteredResults(name);
      });
      div.addEventListener("mouseover", () => {
        currentSelectedIndex = index;
        updateSelectedItem();
      });
      equipmentList.appendChild(div);
    });

    equipmentList.style.display = "block";
    currentSelectedIndex = -1;
    updateSelectedItem();
  }

  function updateSelectedItem() {
    const items = equipmentList.querySelectorAll("div");
    items.forEach((item, index) => item.classList.toggle("selected", index === currentSelectedIndex));
  }

  function showFilteredResults(equipmentName) {
    // Esconde setores
    document.querySelectorAll(".sector-category").forEach(s => s.style.display = "none");
    
    // Limpa resultados
    filteredCardsContainer.innerHTML = "";
    const uniqueCardsMap = new Set(); 

    // Busca exata usando o template
    Object.entries(equipmentTemplates).forEach(([key, equip]) => {
      if (equip.equipamento === equipmentName) {
        const uniqueKey = `${equip.equipamento}|${equip.fabricanteModelo}`;
        
        if (!uniqueCardsMap.has(uniqueKey)) {
          const card = createCardElement(key);
          if (card) {
            filteredCardsContainer.appendChild(card);
            uniqueCardsMap.add(uniqueKey);
          }
        }
      }
    });

    filteredResultsSection.style.display = uniqueCardsMap.size > 0 ? "block" : "none";
  }

  function resetSearch() {
    searchInput.value = "";
    equipmentList.style.display = "none";
    filteredResultsSection.style.display = "none";

    // Recarrega se necessário ou apenas mostra os setores novamente
    const hasSectorParam = params.get("setor");
    if (!hasSectorParam) {
       document.querySelectorAll(".sector-category").forEach(s => s.style.display = "block");
    } else {
       filteredResultsSection.style.display = "none";
       const visibleSections = document.getElementById("sectors-container").children;
       Array.from(visibleSections).forEach(s => s.style.display = "block");
    }
  }

  // Event Listeners Busca
  searchInput.addEventListener("click", () => searchInput.value.length === 0 ? showEquipmentList("", true) : showEquipmentList(searchInput.value));
  searchInput.addEventListener("input", (e) => e.target.value.length > 0 ? showEquipmentList(e.target.value) : resetSearch());
  searchInput.addEventListener("focus", () => searchInput.value.length === 0 ? showEquipmentList("", true) : showEquipmentList(searchInput.value));

  searchInput.addEventListener("keydown", (e) => {
    const items = equipmentList.querySelectorAll("div");
    if (items.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      currentSelectedIndex = Math.min(currentSelectedIndex + 1, items.length - 1);
      updateSelectedItem();
      items[currentSelectedIndex].scrollIntoView({ block: "nearest" });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      currentSelectedIndex = Math.max(currentSelectedIndex - 1, -1);
      updateSelectedItem();
      if (currentSelectedIndex >= 0) items[currentSelectedIndex].scrollIntoView({ block: "nearest" });
    } else if (e.key === "Enter" && currentSelectedIndex >= 0) {
      e.preventDefault();
      const selectedItem = items[currentSelectedIndex];
      searchInput.value = selectedItem.textContent;
      equipmentList.style.display = "none";
      showFilteredResults(selectedItem.textContent);
    }
  });

  document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !equipmentList.contains(e.target)) {
      equipmentList.style.display = "none";
    }
  });

  // Event Delegation para cliques nos botões de treinamento
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("training-link")) {
      e.preventDefault();
      const link = e.target;
      openTrainingModal(
        link.dataset.equipamento,
        link.dataset.fabricante,
        link.dataset.formLink,
        link.dataset.driveId
      );
    }
  });

  // Event Listeners para botões de setor (Modal Inicial)
  document.querySelectorAll(".sector-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const setor = this.getAttribute("data-setor");
      const newUrl = `${window.location.pathname}?setor=${encodeURIComponent(setor)}`;
      window.location.href = newUrl;
    });
  });
});

function clearSearch() {
  const url = new URL(window.location);
  const setor = url.searchParams.get("setor");
  window.location.href = setor ? `${url.pathname}?setor=${encodeURIComponent(setor)}` : url.pathname;
}

// ======================================================
// 5. SCRIPT DE VALIDAÇÃO (GOOGLE APPS SCRIPT)
// ======================================================

const sendCodeBtnTraining = document.getElementById("sendCodeBtnTraining");
const validateBtnTraining = document.getElementById("validateCodeBtnTraining");
const emailInputTraining = document.getElementById("emailInputTraining");
const matriculaInputTraining = document.getElementById("matriculaInputTraining");
const codeInputTraining = document.getElementById("codeInputTraining");
const codeSectionTraining = document.getElementById("codeSectionTraining");
const trainingMsg = document.getElementById("trainingMsg");

const SCRIPT_URL_TRAINING = "https://script.google.com/macros/s/AKfycbwrQ73tK9fMBrAC0APGINTKt-MyDZR4JIf-U3n8oEXzJFxWqnfl59JWjM7bQh3u-zzr/exec";
const allowedDomains = ["unimedcuiaba.coop.br", "equipacare.com.br"];

if (sendCodeBtnTraining) {
  sendCodeBtnTraining.addEventListener("click", () => {
    const email = emailInputTraining.value.trim();
    const matricula = matriculaInputTraining.value.trim();
    const domain = email.split("@")[1];
    const pending = JSON.parse(sessionStorage.getItem("pendingTraining") || "{}");
    const equipamentoCompleto = `${pending.equipamento} ${pending.fabricante || ""}`.trim();

    if (!email || !matricula || !equipamentoCompleto) {
      trainingMsg.textContent = "Preencha todos os campos e selecione um treinamento.";
      return;
    }
    if (!allowedDomains.includes(domain)) {
      trainingMsg.textContent = "Somente e-mails corporativos são aceitos.";
      return;
    }

    trainingMsg.textContent = "Enviando código...";
    sendCodeBtnTraining.disabled = true;

    sessionStorage.setItem("trainingBackup", JSON.stringify({ matricula, equipamento: equipamentoCompleto }));

    fetch(SCRIPT_URL_TRAINING, {
      method: "POST",
      body: JSON.stringify({ email, matricula, equipamento: equipamentoCompleto, action: "send" }),
    })
    .then((r) => r.text())
    .then((result) => {
      if (result === "ok") {
        trainingMsg.textContent = "Código enviado! Verifique seu e-mail.";
        codeSectionTraining.style.display = "block";
      } else {
        trainingMsg.textContent = `Erro: ${result}`;
      }
      sendCodeBtnTraining.disabled = false;
    })
    .catch(() => {
      trainingMsg.textContent = "Falha de conexão.";
      sendCodeBtnTraining.disabled = false;
    });
  });
}

if (validateBtnTraining) {
  validateBtnTraining.addEventListener("click", () => {
    const entered = codeInputTraining.value.trim();
    const email = emailInputTraining.value.trim();
    const matricula = matriculaInputTraining.value.trim();
    const pending = JSON.parse(sessionStorage.getItem("pendingTraining") || "{}");
    let equipamentoCompleto = `${pending.equipamento || ""} ${pending.fabricante || ""}`.trim();

    if (!equipamentoCompleto) {
      const backup = JSON.parse(sessionStorage.getItem("trainingBackup") || "{}");
      equipamentoCompleto = backup.equipamento || "não informado";
    }

    if (!entered || !email || !matricula) {
      trainingMsg.textContent = "Preencha todos os campos.";
      return;
    }

    trainingMsg.textContent = "Validando...";
    validateBtnTraining.disabled = true;

    fetch(SCRIPT_URL_TRAINING, {
      method: "POST",
      body: JSON.stringify({ email, entered, matricula, equipamento: equipamentoCompleto, action: "validate" }),
    })
    .then((r) => r.text())
    .then((result) => {
      if (result === "ok") {
        document.getElementById("validationSection").style.display = "none";
        const contentSection = document.getElementById("contentSection");
        contentSection.style.display = "flex";

        document.getElementById("modalTitle").textContent = pending.equipamento || equipamentoCompleto;
        document.getElementById("videoIframe").src = `https://onedrive.live.com/embed?${pending.driveId}`;
        document.getElementById("formIframe").src = `${pending.formLink}?embedded=true`;

        sessionStorage.removeItem("pendingTraining");
        sessionStorage.removeItem("trainingBackup");
        trainingMsg.textContent = "";

        const watermark = document.getElementById("videoWatermark");
        if (watermark) {
          watermark.textContent = `Acesso: ${email}`;
          watermark.style.display = "block";
        }
      } else {
        trainingMsg.textContent = `Erro: ${result}`;
      }
      validateBtnTraining.disabled = false;
    })
    .catch((error) => {
      trainingMsg.textContent = "Falha de conexão.";
      validateBtnTraining.disabled = false;
    });
  });
}
