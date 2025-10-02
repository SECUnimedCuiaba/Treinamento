function toggleSector(header) {
  const section = header.parentElement;
  const cards = section.querySelector(".equipment-cards");
  const arrow = header.querySelector(".arrow");

  cards.classList.toggle("collapsed");
  header.classList.toggle("open");
}

// Função para abrir o modal com vídeo e form
function openTrainingModal(equipamento, formLink, driveId) {
  const modal = document.getElementById('trainingModal');
  const modalTitle = document.getElementById('modalTitle');
  const videoIframe = document.getElementById('videoIframe');
  const formIframe = document.getElementById('formIframe');

  modalTitle.textContent = equipamento;
  // Embed do vídeo no Drive
  videoIframe.src = `https://drive.google.com/file/d/${driveId}/preview?autoplay=0`;
  // Embed do Google Form
  formIframe.src = `${formLink}?embedded=true`;

  modal.style.display = 'block';
}

// Fechar modal (adicione isso dentro do DOMContentLoaded, após os outros event listeners)
const modal = document.getElementById('trainingModal');
const closeBtn = document.querySelector('.close');
closeBtn.onclick = function() {
  modal.style.display = 'none';
  // Reset iframes para evitar cache
  document.getElementById('videoIframe').src = '';
  document.getElementById('formIframe').src = '';
};

window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = 'none';
    document.getElementById('videoIframe').src = '';
    document.getElementById('formIframe').src = '';
  }
};

// Iniciar todos abertos
document.querySelectorAll(".equipment-cards").forEach((el) => {
  el.classList.add("open");
});

document.addEventListener("DOMContentLoaded", function () {
  // 1. Primeiro inicializa todos os setores como abertos
  document.querySelectorAll(".sector-category").forEach((section) => {
    const header = section.querySelector(".sector-header");
    const cards = section.querySelector(".equipment-cards");

    // Adiciona as classes corretas
    header.classList.add("open");
    cards.style.display = "grid"; // Força o display grid
  });

  // 2. Depois verifica os parâmetros da URL
  const params = new URLSearchParams(window.location.search);
  const setorParam = params.get("setor");

  if (setorParam) {
    // Reordena os setores
    const sectorsContainer = document.getElementById("sectors-container");
    const allSections = Array.from(
      document.querySelectorAll(".sector-category")
    );

    // Encontra o setor selecionado e o treinamento do mês
    const selectedSection = allSections.find(
      (s) => s.getAttribute("data-setor") === setorParam
    );
    const trainingSection = allSections.find(
      (s) => s.getAttribute("data-setor") === "treinamento-mes"
    );

    // Remove todas as seções do container
    allSections.forEach((section) => section.remove());

    // Adiciona primeiro o treinamento do mês (se existir e não for o setor selecionado)
    if (trainingSection && setorParam !== "treinamento-mes") {
      sectorsContainer.appendChild(trainingSection);

      // Filtra os equipamentos do treinamento do mês conforme necessário
      const setorEquipments = equipmentData[setorParam] || [];
      const monthlyEquipments = equipmentData["treinamento-mes"];
      const filteredEquipments = monthlyEquipments.filter((equip) =>
        setorEquipments.includes(equip)
      );

      if (filteredEquipments.length > 0) {
        const cardsContainer =
          trainingSection.querySelector(".equipment-cards");
        cardsContainer.innerHTML = "";

        filteredEquipments.forEach((item) => {
          const equip = equipmentTemplates[item];
          if (equip) {
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
  <img src="${equip.img}" alt="${equip.alt}">
  <h3>${equip.equipamento}</h3>
  <p class="fabricante">${equip.fabricanteModelo}</p>
  <p class="duration">duração: ${equip.duracao}</p>
 ${
   equip.link
     ? `<a href="#" class="training-link" data-equipamento="${
         equip.equipamento
       }" data-form-link="${equip.link}" data-drive-id="${
         equip.driveId || ""
       }">Acessar Treinamento</a>`
     : `<a class="disabled" href="#" onclick="return false;">Disponível em breve</a>`
  }
  `;



            cardsContainer.appendChild(card);
          }
        });
      } else {
        trainingSection.remove();
      }
    }

    // Adiciona o setor selecionado
    if (selectedSection) {
      sectorsContainer.appendChild(selectedSection);
      const cards = selectedSection.querySelector(".equipment-cards");
      const header = selectedSection.querySelector(".sector-header");
      cards.style.display = "grid";
      header.classList.add("open");
    }

    // Adiciona os demais setores (excluindo o selecionado e o treinamento do mês)
    allSections.forEach((section) => {
      const setor = section.getAttribute("data-setor");
      if (setor !== setorParam && setor !== "treinamento-mes") {
        sectorsContainer.appendChild(section);
      }
    });
  }
  // Código do buscador de equipamentos
  const searchInput = document.getElementById("equipmentSearchInput");
  const equipmentList = document.getElementById("equipmentList");
  const filteredResultsSection = document.getElementById("filtered-results");
  const filteredCardsContainer = document.querySelector(".filtered-cards");
  const allSections = document.querySelectorAll(".sector-category");
  let currentSelectedIndex = -1;

  // Botão para limpar busca
  const clearSearchBtn = document.createElement("button");
  clearSearchBtn.innerHTML = "×";
  clearSearchBtn.className = "clear-search-btn";
  clearSearchBtn.addEventListener("click", () => {
    searchInput.value = "";
    resetSearch();
    searchInput.focus();
  });
  searchInput.parentNode.insertBefore(clearSearchBtn, searchInput.nextSibling);

  // Extrai todos os nomes de equipamentos únicos
  function extractUniqueEquipmentNames() {
    const equipmentNames = new Set();
    document.querySelectorAll(".card h3").forEach((card) => {
      equipmentNames.add(card.textContent.trim());
    });
    return Array.from(equipmentNames).sort();
  }

  // Extrai cards únicos por equipamento+fabricante+modelo
  function getUniqueEquipmentCards() {
    const cardsMap = new Map();
    document.querySelectorAll(".card").forEach((card) => {
      const key = card.querySelector("h3").textContent.trim();
      if (!cardsMap.has(key)) {
        cardsMap.set(key, card.cloneNode(true));
      }
    });
    return Array.from(cardsMap.values());
  }

  const uniqueEquipmentNames = extractUniqueEquipmentNames();

  // Mostra a lista de equipamentos (completa ou filtrada)
  function showEquipmentList(filter = "", showAll = false) {
    equipmentList.innerHTML = "";
    let filtered = uniqueEquipmentNames;

    if (!showAll && filter.length > 0) {
      filtered = uniqueEquipmentNames.filter((name) =>
        name.toLowerCase().includes(filter.toLowerCase())
      );
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

  // Atualiza o item selecionado na lista
  function updateSelectedItem() {
    const items = equipmentList.querySelectorAll("div");
    items.forEach((item, index) => {
      item.classList.toggle("selected", index === currentSelectedIndex);
    });
  }

  // Mostra os resultados filtrados
  function showFilteredResults(equipmentName) {
    // Oculta todas as seções de setores
    allSections.forEach((section) => {
      section.style.display = "none";
    });

    // Limpa resultados anteriores
    filteredCardsContainer.innerHTML = "";

    // Usa um Map para evitar duplicatas (chave: equipamento + fabricanteModelo)
    const uniqueCardsMap = new Map();

    // Percorre todos os cards
    document.querySelectorAll(".card").forEach((card) => {
      const cardName = card.querySelector("h3").textContent.trim();

      // Verifica se é o equipamento buscado
      if (cardName === equipmentName) {
        const fabricante = card.querySelector(".fabricante").textContent.trim();
        const key = `${cardName}|${fabricante}`; // Chave única

        // Se não existir no mapa, adiciona
        if (!uniqueCardsMap.has(key)) {
          uniqueCardsMap.set(key, card.cloneNode(true));
        }
      }
    });

    // Adiciona os cards únicos ao container
    uniqueCardsMap.forEach((card) => {
      filteredCardsContainer.appendChild(card);
    });

    // Mostra ou esconde a seção de resultados
    filteredResultsSection.style.display =
      uniqueCardsMap.size > 0 ? "block" : "none";
  }

  // Reseta para mostrar todos os setores
  function resetSearch() {
    searchInput.value = "";
    equipmentList.style.display = "none";

    const params = new URLSearchParams(window.location.search);
    const setorParam = params.get("setor");

    if (setorParam) {
      // Reaplica a mesma lógica de reordenação
      const sectorsContainer = document.getElementById("sectors-container");
      const allSections = Array.from(
        document.querySelectorAll(".sector-category")
      );
      const selectedSection = allSections.find(
        (s) => s.getAttribute("data-setor") === setorParam
      );
      const trainingSection = allSections.find(
        (s) => s.getAttribute("data-setor") === "treinamento-mes"
      );

      allSections.forEach((section) => section.remove());

      if (trainingSection && setorParam !== "treinamento-mes") {
        sectorsContainer.appendChild(trainingSection);
        // ... (filtro dos equipamentos, se necessário)
      }

      if (selectedSection) {
        sectorsContainer.appendChild(selectedSection);
      }

      allSections.forEach((section) => {
        const setor = section.getAttribute("data-setor");
        if (setor !== setorParam && setor !== "treinamento-mes") {
          sectorsContainer.appendChild(section);
        }
      });
    } else {
      // Se não houver parâmetro, mostra todos os setores na ordem padrão
      document.querySelectorAll(".sector-category").forEach((section) => {
        section.style.display = "block";
      });
    }

    filteredResultsSection.style.display = "none";
  }

  // Event listeners
  searchInput.addEventListener("click", () => {
    if (searchInput.value.length === 0) {
      showEquipmentList("", true);
    } else {
      showEquipmentList(searchInput.value);
    }
  });

  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value;
    if (searchTerm.length > 0) {
      showEquipmentList(searchTerm);
    } else {
      resetSearch();
    }
  });

  searchInput.addEventListener("focus", () => {
    searchInput.value = "";
    showEquipmentList("", true);
  });

  // Navegação com teclado
  searchInput.addEventListener("keydown", (e) => {
    const items = equipmentList.querySelectorAll("div");
    if (items.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      currentSelectedIndex = Math.min(
        currentSelectedIndex + 1,
        items.length - 1
      );
      updateSelectedItem();
      items[currentSelectedIndex].scrollIntoView({ block: "nearest" });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      currentSelectedIndex = Math.max(currentSelectedIndex - 1, -1);
      updateSelectedItem();
      if (currentSelectedIndex >= 0) {
        items[currentSelectedIndex].scrollIntoView({ block: "nearest" });
      }
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

// Event listener para links de treinamento (abrir modal)
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('training-link')) {
    e.preventDefault();
    const equipamento = e.target.getAttribute('data-equipamento');
    const formLink = e.target.getAttribute('data-form-link');
    const driveId = e.target.getAttribute('data-drive-id');
    if (driveId && driveId !== '') { // Só abre modal se tiver vídeo
      openTrainingModal(equipamento, formLink, driveId);
    } else {
      // Fallback: abre em nova aba se sem vídeo
      window.open(formLink, '_blank');
    }
  }
});

  
});

function clearSearch() {
  // Limpa o campo de busca
  document.getElementById("equipmentSearchInput").value = "";

  // Pega a URL atual e seus parâmetros
  const url = new URL(window.location.href);
  const setor = url.searchParams.get("setor");

  // Monta a nova URL base com ?setor=... se existir
  let newUrl = window.location.origin + window.location.pathname;
  if (setor) {
    newUrl += "?setor=" + encodeURIComponent(setor);
  }

  // Redireciona para a nova URL
  window.location.href = newUrl;
}

const monthlyTrainings = {
  1: [], // Janeiro
  2: [], // Fevereiro
  3: [], // Março
  4: [], // Abril
  5: [], // Maio
  6: [], // Junho
  7: ["monitorPhilips"], // Julho
  8: ["cardioversorPhilips"], // Agosto
  9: ["ecgAlfamed"], // Setembro
  10: ["aspiradorFanem"], // Outubro
  11: [], // Novembro
  12: [], // Dezembro
};

const equipmentData = {
  "treinamento-mes": getMonthlyTraining(),

  "centro-cirurgico": [
    "monitorPhilips",
    "cardioversorPhilips",
    "aspiradorFanem",
    "mesaBarrfab",
    "hipoHipertermia",
    "termohigrometro",
    "anestesiaDrager",
    "ventiladorMagnamed",
    "torniqueteStryker",
    "bisturiWem",
    "bombaDeInfusaoLifemed",
  ],
  uti: [
    "cardioversorPhilips",
    "monitorPhilips",
    "ecgAlfamed",
    "ventiladorTecme",
    "ventiladorMagnamed",
    "cardioversorInstramed8",
    "camaArjo",
    "termohigrometro",
    "bombaDeInfusaoLifemed",
  ],
  internacao: [
    "cardioversorPhilips",
    "monitorPhilips",
    "ecgAlfamed",
    "ventiladorResmed",
    "camaArjo",
    "termohigrometro",
    "camaraFanem",
    "bombaDeInfusaoLifemed",
  ],
  pa: [
    "ecgAlfamed",
    "monitorPhilips",
    "cardioversorPhilips",
    "cardioversorInstramed8",
    "monitorDragerVista120S",
    "cardioversorApolus",
    "ventiladorTecme",
    "ventiladorResmed",
    "bombaDeInfusaoLifemed",
    "monitorInstramedInmax12",
  ],
  farmacia: [
    "estufaFanem",
    "termohigrometro",
    "camaraFanem",
    "camaraIndrel",
    "camaraBiotecno",
  ],
  imagem: ["termohigrometro", "cardioversorApolus"],
  infusao: [
    "cardioversorPhilips",
    "cardioversorApolus",
    "bombaDeInfusaoLifemed",
    "monitorInstramedInmax12",
  ],
  ambulatorio: ["ecgAlfamed"],
  cme: [
    "autoclaveBaumer",
    "termodesinfectoraBaumer",
    "lavadoraUltrassonicaBaumer",
    "esterilizadorPeroxidoBaumer",
    "secadoraBaumer",
  ],
};

const equipmentTemplates = {
  monitorPhilips: {
    img: "imagens/monitor-philips.png",
    alt: "Monitor Philips Efficia",
    title: "Monitor Multiparâmetros | Philips Efficia CM1xx | duração: 13min",
    equipamento: "Monitor Multiparâmetros",
    fabricanteModelo: "Philips Efficia CM1xx",
    duracao: "13min",
    link: "https://forms.gle/xgdswhyromyNBCbQ7",
     driveId: "1tc_DpEWAoxVyri6DqsbNCjvuMXyRshHD",
  },
  aspiradorFanem: {
    img: "imagens/aspirador-fanem.png",
    alt: "Aspirador Fanem Colibri",
    title: "Aspirador Elétrico | Fanem DPM-60 | duração: 10min",
    equipamento: "Aspirador Elétrico",
    fabricanteModelo: "Fanem DPM-60",
    duracao: "10min",
    link: "https://forms.gle/9dGdURLF8Hh2d3jf7",
    driveId: "1Vbzvw4VrRYkEhGldHWtSoU1xRxVTn28C",
  },
  cardioversorPhilips: {
    img: "imagens/dfm_100.jpg",
    alt: "Cardioversor Philips DFM-100",
    title: "Cardioversor | Philips - DFM100 | duração: 25min",
    equipamento: "Cardioversor",
    fabricanteModelo: "Philips DFM100",
    duracao: "25min",
    link: "https://forms.gle/GTAjx5d86nDwAkkc8",
     driveId: "1kPUZ_zfMXWgXMiJRPbov8p7TSondQkpd",
  },
  mesaBarrfab: {
    img: "imagens/mesa_cirurgica_barrfab.png",
    alt: "Mesa Cirúrgica Barrfab",
    title: "Mesa Cirúrgica | Barrfab BF683 TDP",
    equipamento: "Mesa Cirúrgica",
    fabricanteModelo: "Barrfab BF683 TDP",
    duracao: "--",
    link: null,
  },

  termohigrometro: {
    img: "imagens/termohigrometro.png",
    alt: "Termohigrômetro",
    title: "Termômetro Digital - Higrômetro",
    equipamento: "Termômetro Digital",
    fabricanteModelo: "Termohigrômetro",
    duracao: "--",
    link: null,
  },

  anestesiaDrager: {
    img: "imagens/aparelho_anestesia_drager.jpg",
    alt: "Aparelho de anestesia Drager Atlan A3xx",
    title: "Aparelho de Anestesia | Drager Atlan A300/350",
    equipamento: "Aparelho de Anestesia",
    fabricanteModelo: "Drager Atlan A300/350",
    duracao: "--",
    link: null,
  },
  ventiladorMagnamed: {
    img: "imagens/ventilador_magnamed.png",
    alt: "Ventilador de transporte Magnamed Oxymag",
    title: "Ventilador Pulmonar | Magnamed Oxymag",
    equipamento: "Ventilador Pulmonar",
    fabricanteModelo: "Magnamed Oxymag",
    duracao: "--",
    link: null,
  },
  torniqueteStryker: {
    img: "imagens/torniquete_stryker.png",
    alt: "Sistema de Torniquete Stryker Smartpump",
    title: "Sistema de Torniquete | Stryker SmartPump",
    equipamento: "Sistema de Torniquete",
    fabricanteModelo: "Stryker SmartPump",
    duracao: "--",
    link: null,
  },
  bisturiWem: {
    img: "imagens/WEM SS501sx.png",
    alt: "Bisturi Elétrico WEM SS 501SX",
    title: "Bisturi Elétrico | WEM SS-501sx",
    equipamento: "Bisturi Elétrico",
    fabricanteModelo: "WEM SS-501sx",
    duracao: "--",
    link: null,
  },
  ventiladorTecme: {
    img: "imagens/ventilador_tecme.png",
    alt: "Ventilador Pulmonar Tecme Graphnet TS+",
    title: "Ventilador Pulmonar | Tecme GraphNet TS+",
    equipamento: "Ventilador Pulmonar",
    fabricanteModelo: "Tecme GraphNet TS+",
    duracao: "--",
    link: null,
  },
  ecgAlfamed: {
    img: "imagens/EcgAlfamed.png",
    alt: "Eletrocardiógrafo Alfamed Ritmus1200",
    title: "Eletrocardiógrafo | Alfamed Ritmus1200 | duração: 13min",
    equipamento: "Eletrocardiógrafo",
    fabricanteModelo: "Alfamed Ritmus1200",
    duracao: "13min",
    link: "https://forms.gle/7U8PX667SK7qFyzD9",
     driveId: "1wi2o-00KDwtkt7_NQ6TbvyT8_NBDJJGb",
  },
  cardioversorInstramed8: {
    img: "imagens/cardioversor_instramed_cardiomax8.png",
    alt: "Cardioversor Instramed Cardiomax 8",
    title: "Cardioversor | Instramed Cardiomax 8 Series",
    equipamento: "Cardioversor",
    fabricanteModelo: "Instramed Cardiomax 8 Series",
    duracao: "--",
    link: null,
  },
  camaArjo: {
    img: "imagens/Cama_Arjo.jpg",
    alt: "Cama Hospitalar ARJO Prioma",
    title: "Cama Hospitalar | Arjo Prioma 600",
    equipamento: "Cama Hospitalar",
    fabricanteModelo: "Arjo Prioma 600",
    duracao: "--",
    link: null,
  },
  estufaFanem: {
    img: "imagens/estufa-fanem.jpg",
    alt: "Estufa para aquecimento de soro Fanem",
    title: "Estufa para Aquecimento de Soro | Fanem 2503/1 | duração: 5min",
    equipamento: "Estufa para Aquecimento de Soro",
    fabricanteModelo: "Fanem 2503/1",
    duracao: "5min",
    link: "https://forms.gle/LxK7htH8SEVkxVv16",
     driveId: "1NiGoZNp_cxEr9W7vEX-FRkkcgmarFbHi",
  },
  cardioversorApolus: {
    img: "imagens/Desfibrilador_Instramed_Apolus.png",
    alt: "Desfibrilador Instramed Apolus",
    title: "Cardioversor | Instramed Apolus",
    equipamento: "Cardioversor",
    fabricanteModelo: "Instramed Apolus",
    duracao: "--",
    link: null,
  },
  ventiladorResmed: {
    img: "imagens/ventilador_resmed.png",
    alt: "Ventilador Resmed Astral 150",
    title: "Ventilador Pulmonar | Resmed - Astral 150",
    equipamento: "Ventilador Pulmonar",
    fabricanteModelo: "Resmed - Astral 150",
    duracao: "--",
    link: null,
  },
  autoclaveBaumer: {
    img: "imagens/autoclave_baumer.jpeg",
    alt: "Autoclave Baumer",
    title: "Autoclave | Baumer - HI VAC  II 542L",
    equipamento: "Autoclave",
    fabricanteModelo: "Baumer - HI VAC  II 542L",
    duracao: "--",
    link: null,
  },

  termodesinfectoraBaumer: {
    img: "imagens/termodesinfectora_baumer.jpeg",
    alt: "Lavadora Termodesinfectora Baumer",
    title: "Lavadora Termodesinfectora | Baumer - TW-E2000-400P",
    equipamento: "Lavadora Termodesinfectora",
    fabricanteModelo: "Baumer - TW-E2000-400P",
    duracao: "--",
    link: null,
  },

  lavadoraUltrassonicaBaumer: {
    img: "imagens/lavadora_ultrassonica_baumer.jpeg",
    alt: "Lavadora Ultrassônica Baumer",
    title: "Lavadora Ultrassonica | Baumer E0201-042",
    equipamento: "Lavadora Ultrassonica",
    fabricanteModelo: "Baumer E0201-042",
    duracao: "--",
    link: null,
  },

  esterilizadorPeroxidoBaumer: {
    img: "imagens/esterilizador_peroxido_baumer.png",
    alt: "Esterilizador por Peróxido de Hidrogênio Baumer",
    title: "Esterilizador por Peróxido de Hidrogênio | Baumer B0201-105-V02",
    equipamento: "Esterilizador por Peróxido de Hidrogênio",
    fabricanteModelo: "Baumer B0201-105-V02",
    duracao: "--",
    link: null,
  },
  secadoraBaumer: {
    img: "imagens/secadora_baumer.jpeg",
    alt: "Gabinete de Secagem Baumer",
    title: "Secadora | Baumer EA-34-03",
    equipamento: "Secadora",
    fabricanteModelo: "Baumer EA-34-03",
    duracao: "--",
    link: null,
  },

  camaraFanem: {
    img: "imagens/camara_fanem_3347.jpeg",
    alt: "Câmara de Conservação Fanem 3347/1",
    title: "Câmara de Conservação | Fanem 3347/1",
    equipamento: "Câmara de Conservação",
    fabricanteModelo: "Fanem 3347/1",
    duracao: "--",
    link: null,
  },

  camaraIndrel: {
    img: "imagens/camara_indrel_220.jpeg",
    alt: "Câmara de Conservação Indrel RC220",
    title: "Câmara de Conservação | Indrel - RC220",
    equipamento: "Câmara de Conservação",
    fabricanteModelo: "Indrel - RC220",
    duracao: "--",
    link: null,
  },

  camaraBiotecno: {
    img: "imagens/camara_biotecno_1100.jpeg",
    alt: "Câmara de Conservação Biotecno BT1100",
    title: "Câmara de Conservação | Biotecno - BT1100",
    equipamento: "Câmara de Conservação",
    fabricanteModelo: "Biotecno - BT1100",
    duracao: "--",
    link: null,
  },
  monitorDragerVista120S: {
    img: "imagens/monitor_drager_vista120S_.jpg",
    alt: "Monitor Multiparâmetros Drager Vista 120S",
    title: "Monitor Multiparâmetros | Drager Vista 120S",
    equipamento: "Monitor Multiparâmetros",
    fabricanteModelo: "Drager Vista 120S",
    duracao: "--",
    link: null,
  },
  bombaDeInfusaoLifemed: {
    img: "imagens/bombaDeInfusao_Lifemed.png",
    alt: "Bomba de Infusão Lifemed LF2001",
    title: "Bomba de Infusão | Lifemed LF2001",
    equipamento: "Bomba de Infusão",
    fabricanteModelo: "Lifemed LF2001",
    duracao: "--",
    link: null,
  },
  monitorInstramedInmax12: {
    img: "imagens/monitor_instramed_inMax12.jpg",
    alt: "Monitor Multiparâmetros Instramed InMax12",
    title: "Monitor Multiparâmetros | Instramed InMax12",
    equipamento: "Monitor Multiparâmetros",
    fabricanteModelo: "Instramed InMax12",
    duracao: "--",
    link: null,
  },
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
const sectorsContainer = document.getElementById("sectors-container");

// Função para criar seções
const createSection = (sectorKey, items) => {
  const section = document.createElement("section");
  section.className = "sector-category";
  section.dataset.setor = sectorKey;

  // Adiciona classe especial apenas para o treinamento do mês
  if (sectorKey === "treinamento-mes") {
    section.classList.add("featured-month");
  }

  const h2 = document.createElement("h2");
  h2.className = "sector-header";
  h2.onclick = () => toggleSector(h2);

  // Texto diferente para o treinamento do mês
  const sectionTitle =
    sectorKey === "treinamento-mes"
      ? `⭐ ${sectorNames[sectorKey]} `
      : `Setor: ${sectorNames[sectorKey]}`;

  h2.innerHTML =
    sectorKey === "treinamento-mes"
      ? `<span class="featured-title"><span class="star">⭐</span>${sectorNames[sectorKey]}</span><span class="arrow">&#9654;</span>`
      : `Setor: ${sectorNames[sectorKey]} <span class="arrow">&#9654;</span>`;

  section.appendChild(h2);

  const cardsContainer = document.createElement("div");
  cardsContainer.className = "equipment-cards";

  items.forEach((item) => {
    const equip = equipmentTemplates[item];
    if (equip) {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
  <img src="${equip.img}" alt="${equip.alt}">
  <h3>${equip.equipamento}</h3>
  <p class="fabricante">${equip.fabricanteModelo}</p>
  <p class="duration">duração: ${equip.duracao}</p>
  ${
    equip.link
      ? `<a href="#" class="training-link" data-equipamento="${
          equip.equipamento
        }" data-form-link="${equip.link}" data-drive-id="${
          equip.driveId || ""
        }">Acessar Treinamento</a>`
      : `<a class="disabled" href="#" onclick="return false;">Disponível em breve</a>`
  }
`;

      cardsContainer.appendChild(card);
    }
  });

  section.appendChild(cardsContainer);
  return section;
};

// 1. Adiciona primeiro o treinamento do mês
const monthlyTrainingItems = equipmentData["treinamento-mes"];
if (monthlyTrainingItems.length > 0) {
  sectorsContainer.appendChild(
    createSection("treinamento-mes", monthlyTrainingItems)
  );
}

// 2. Depois adiciona os outros setores (excluindo o treinamento do mês)
for (const [sectorKey, items] of Object.entries(equipmentData)) {
  if (sectorKey !== "treinamento-mes") {
    sectorsContainer.appendChild(createSection(sectorKey, items));
  }
}

// Função para obter treinamentos mensais
function getMonthlyTraining() {
  const month = new Date().getMonth() + 1;

  return monthlyTrainings[month] || [];
}

// Atualiza os equipamentos do mês
equipmentData["treinamento-mes"] = getMonthlyTraining();
