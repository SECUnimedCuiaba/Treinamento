 function toggleSector(header) {
      const section = header.parentElement;
      const cards = section.querySelector('.equipment-cards');
      const arrow = header.querySelector('.arrow');

      cards.classList.toggle('collapsed');
      header.classList.toggle('open');
    }

    // Iniciar todos abertos
    document.querySelectorAll('.equipment-cards').forEach(el => {
      el.classList.add('open');
    });

    document.addEventListener("DOMContentLoaded", function () {
     
      // 1. Primeiro inicializa todos os setores como abertos
      document.querySelectorAll('.sector-category').forEach(section => {
        const header = section.querySelector('.sector-header');
        const cards = section.querySelector('.equipment-cards');

        // Adiciona as classes corretas
        header.classList.add('open');
        cards.style.display = 'grid'; // Força o display grid
      });

      // 2. Depois verifica os parâmetros da URL
      const params = new URLSearchParams(window.location.search);
      const setorParam = params.get("setor");

      if (setorParam) {
        document.querySelectorAll(".sector-category").forEach(section => {
          const setor = section.getAttribute("data-setor");
          if (setor !== setorParam) {
            section.style.display = "none";
          } else {
            // Garante que o setor correto está visível e expandido
            section.style.display = "block";
            const cards = section.querySelector('.equipment-cards');
            const header = section.querySelector('.sector-header');
            cards.style.display = 'grid';
            header.classList.add('open');
          }
        });
      }

      // Código do buscador de equipamentos
      const searchInput = document.getElementById('equipmentSearchInput');
      const equipmentList = document.getElementById('equipmentList');
      const filteredResultsSection = document.getElementById('filtered-results');
      const filteredCardsContainer = document.querySelector('.filtered-cards');
      const allSections = document.querySelectorAll('.sector-category');
      let currentSelectedIndex = -1;

      // Botão para limpar busca
      const clearSearchBtn = document.createElement('button');
      clearSearchBtn.innerHTML = '×';
      clearSearchBtn.className = 'clear-search-btn';
      clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        resetSearch();
        searchInput.focus();
      });
      searchInput.parentNode.insertBefore(clearSearchBtn, searchInput.nextSibling);

      // Extrai todos os nomes de equipamentos únicos
      function extractUniqueEquipmentNames() {
        const equipmentNames = new Set();
        document.querySelectorAll('.card h3').forEach(card => {
          const fullText = card.textContent;
          const equipmentName = fullText.split('|')[0].trim();
          equipmentNames.add(equipmentName);
        });
        return Array.from(equipmentNames).sort();
      }

      // Extrai cards únicos por equipamento+fabricante+modelo
      function getUniqueEquipmentCards() {
        const cardsMap = new Map();
        document.querySelectorAll('.card').forEach(card => {
          const key = card.querySelector('h3').textContent.trim();
          if (!cardsMap.has(key)) {
            cardsMap.set(key, card.cloneNode(true));
          }
        });
        return Array.from(cardsMap.values());
      }

      const uniqueEquipmentNames = extractUniqueEquipmentNames();

      // Mostra a lista de equipamentos (completa ou filtrada)
      function showEquipmentList(filter = '', showAll = false) {
        equipmentList.innerHTML = '';
        let filtered = uniqueEquipmentNames;

        if (!showAll && filter.length > 0) {
          filtered = uniqueEquipmentNames.filter(name =>
            name.toLowerCase().includes(filter.toLowerCase())
          );
        }

        if (filtered.length === 0) {
          equipmentList.style.display = 'none';
          return;
        }

        filtered.forEach((name, index) => {
          const div = document.createElement('div');
          div.textContent = name;
          div.addEventListener('click', () => {
            searchInput.value = name;
            equipmentList.style.display = 'none';
            showFilteredResults(name);
          });
          div.addEventListener('mouseover', () => {
            currentSelectedIndex = index;
            updateSelectedItem();
          });
          equipmentList.appendChild(div);
        });

        equipmentList.style.display = 'block';
        currentSelectedIndex = -1;
        updateSelectedItem();
      }

      // Atualiza o item selecionado na lista
      function updateSelectedItem() {
        const items = equipmentList.querySelectorAll('div');
        items.forEach((item, index) => {
          item.classList.toggle('selected', index === currentSelectedIndex);
        });
      }

      // Mostra os resultados filtrados
      function showFilteredResults(equipmentName) {
        // Oculta todas as seções de setores
        allSections.forEach(section => {
          section.style.display = 'none';
        });

        // Limpa resultados anteriores
        filteredCardsContainer.innerHTML = '';

        // Obtém cards únicos que correspondem à busca
        const uniqueCards = getUniqueEquipmentCards();
        const matchingCards = uniqueCards.filter(card => {
          const cardText = card.querySelector('h3').textContent;
          return cardText.includes(equipmentName);
        });

        if (matchingCards.length > 0) {
          matchingCards.forEach(card => {
            filteredCardsContainer.appendChild(card);
          });
          filteredResultsSection.style.display = 'block';
        } else {
          filteredResultsSection.style.display = 'none';
        }
      }

      // Reseta para mostrar todos os setores
      function resetSearch() {
        searchInput.value = '';
        equipmentList.style.display = 'none';

        // Verifica se há parâmetro de setor na URL
        const params = new URLSearchParams(window.location.search);
        const setorParam = params.get("setor");

        if (setorParam) {
          // Mostra apenas o setor correspondente ao parâmetro
          document.querySelectorAll(".sector-category").forEach(section => {
            const setor = section.getAttribute("data-setor");
            section.style.display = setor === setorParam ? "block" : "none";

            if (setor === setorParam) {
              const cards = section.querySelector('.equipment-cards');
              const header = section.querySelector('.sector-header');
              cards.style.display = 'grid';
              header.classList.add('open');
            }
          });
        } else {
          // Se não houver parâmetro, mostra todos os setores
          document.querySelectorAll(".sector-category").forEach(section => {
            section.style.display = "block";
          });
        }

        filteredResultsSection.style.display = 'none';
      }


      // Event listeners
      searchInput.addEventListener('click', () => {
        if (searchInput.value.length === 0) {
          showEquipmentList('', true);
        } else {
          showEquipmentList(searchInput.value);
        }
      });

      searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value;
        if (searchTerm.length > 0) {
          showEquipmentList(searchTerm);
        } else {
          resetSearch(); 
        }
      });

     searchInput.addEventListener('focus', () => {
  searchInput.value = ''; 
  showEquipmentList('', true); 
});


      // Navegação com teclado
      searchInput.addEventListener('keydown', (e) => {
        const items = equipmentList.querySelectorAll('div');
        if (items.length === 0) return;

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          currentSelectedIndex = Math.min(currentSelectedIndex + 1, items.length - 1);
          updateSelectedItem();
          items[currentSelectedIndex].scrollIntoView({ block: 'nearest' });
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          currentSelectedIndex = Math.max(currentSelectedIndex - 1, -1);
          updateSelectedItem();
          if (currentSelectedIndex >= 0) {
            items[currentSelectedIndex].scrollIntoView({ block: 'nearest' });
          }
        } else if (e.key === 'Enter' && currentSelectedIndex >= 0) {
          e.preventDefault();
          const selectedItem = items[currentSelectedIndex];
          searchInput.value = selectedItem.textContent;
          equipmentList.style.display = 'none';
          showFilteredResults(selectedItem.textContent);
        }
      });

      document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !equipmentList.contains(e.target)) {
          equipmentList.style.display = 'none';
        }
      });
    });


function clearSearch() {
  // Limpa o campo de busca
  document.getElementById('equipmentSearchInput').value = '';

  // Pega a URL atual e seus parâmetros
  const url = new URL(window.location.href);
  const setor = url.searchParams.get('setor');

  // Monta a nova URL base com ?setor=... se existir
  let newUrl = window.location.origin + window.location.pathname;
  if (setor) {
    newUrl += '?setor=' + encodeURIComponent(setor);
  }

  // Redireciona para a nova URL
  window.location.href = newUrl;
}

const equipmentData = {
      "centro-cirurgico": [
        "monitorPhilips", "aspiradorFanem", "cardioversorPhilips", "mesaBarrfab", "hipoHipertermia",
        "termohigrometro", "anestesiaDrager", "ventiladorMagnamed", "torniqueteStryker", "bisturiWem"
      ],
      "uti": [
        "monitorPhilips", "ventiladorTecme", "ventiladorMagnamed", "ecgAlfamed", 
        "cardioversorPhilips", "cardioversorInstramed8", "camaArjo", "termohigrometro"
      ],
      "internacao": [
        "monitorPhilips", "cardioversorPhilips", "ventiladorResmed", "ecgAlfamed", "camaArjo", "termohigrometro"
      ],
      "pa": [
        "ecgAlfamed", "cardioversorInstramed8", "cardioversorApolus", "ventiladorTecme", "ventiladorResmed"
      ],
      "farmacia": [
        "estufaFanem", "termohigrometro", "camaraFanem","camaraIndrel","camaraBiotecno"
      ],
      "imagem": [
        "termohigrometro", "cardioversorApolus"
      ],
      "infusao": [
        "cardioversorApolus", "cardioversorPhilips"
      ],
      "ambulatorio": [
        "ecgAlfamed"
      ],
      "cme": [
        "autoclaveBaumer","termodesinfectoraBaumer","lavadoraUltrassonicaBaumer","esterilizadorPeroxidoBaumer",
        "secadoraBaumer"
      ]
    };

    const equipmentTemplates = {
      monitorPhilips: {
        img: "imagens/monitor-philips.png",
        alt: "Monitor Philips Efficia",
        title: "Monitor Multiparâmetros | Philips Efficia",
        link: "https://forms.gle/xgdswhyromyNBCbQ7"
      },
      aspiradorFanem: {
        img: "imagens/aspirador-fanem.png",
        alt: "Aspirador Fanem Colibri",
        title: "Aspirador Elétrico | Fanem DPM-60",
        link: "https://forms.gle/K1vzW2ruwrX4ygSw6"
      },
      cardioversorPhilips: {
        img: "imagens/dfm_100.jpg",
        alt: "Cardioversor Philips DFM-100",
        title: "Cardioversor | Philips - DFM-100",
        link: null
      },
      mesaBarrfab: {
        img: "imagens/mesa_cirurgica_barrfab.png",
        alt: "Mesa Cirúrgica Barrfab",
        title: "Mesa Cirúrgica | Barrfab BF683 TDP",
        link: null
      },
      hipoHipertermia: {
        img: "imagens/hipohipertermia.jpg",
        alt: "Sistema de Hipo-hipertermia",
        title: "Sistema de Hipo-hipertermia | Hico Variotherm 550",
        link: null
      },
      termohigrometro: {
        img: "imagens/termohigrometro.png",
        alt: "Termohigrômetro",
        title: "Termômetro Digital - Higrômetro",
        link: null
      },
      anestesiaDrager: {
        img: "imagens/aparelho_anestesia_drager.jpg",
        alt: "Aparelho de anestesia Drager Atlan A3xx",
        title: "Aparelho de Anestesia | Drager Atlan A300/350",
        link: null
      },
      ventiladorMagnamed: {
        img: "imagens/ventilador_magnamed.png",
        alt: "Ventilador de transporte Magnamed Oxymag",
        title: "Ventilador Pulmonar | Magnamed Oxymag",
        link: null
      },
      torniqueteStryker: {
        img: "imagens/torniquete_stryker.png",
        alt: "Sistema de Torniquete Stryker Smartpump",
        title: "Sistema de Torniquete | Stryker SmartPump",
        link: null
      },
      bisturiWem: {
        img: "imagens/WEM SS501sx.png",
        alt: "Bisturi Elétrico WEM SS 501SX",
        title: "Bisturi Elétrico | WEM SS-501sx",
        link: null
      },
      ventiladorTecme: {
        img: "imagens/ventilador_tecme.png",
        alt: "Ventilador Pulmonar Tecme Graphnet TS+",
        title: "Ventilador Pulmonar | Tecme GraphNet TS+",
        link: null
      },
      ecgAlfamed: {
        img: "imagens/EcgAlfamed.png",
        alt: "Eletrocardiógrafo Alfamed Ritmus1200",
        title: "Eletrocardiógrafo | Alfamed Ritmus1200",
        link: null
      },
      cardioversorInstramed8: {
        img: "imagens/cardioversor_instramed_cardiomax8.png",
        alt: "Cardioversor Instramed Cardiomax 8",
        title: "Cardioversor | Instramed Cardiomax 8 Series",
        link: null
      },
      camaArjo: {
        img: "imagens/Cama_Arjo.jpg",
        alt: "Cama Hospitalar ARJO Prioma",
        title: "Cama Hospitalar | Arjo Prioma 600",
        link: null
      },
      estufaFanem: {
        img: "imagens/estufa-fanem.jpg",
        alt: "Estufa para aquecimento de soro Fanem",
        title: "Estufa para Aquecimento de Soro | Fanem 2503/1",
        link: "https://forms.gle/e3GST5oeCh3WVLZP9"
      },
      cardioversorApolus: {
        img: "imagens/Desfibrilador_Instramed_Apolus.png",
        alt: "Desfibrilador Instramed Apolus",
        title: "Cardioversor | Instramed Apolus",
        link: null
      },
      ventiladorResmed: {
        img: "imagens/ventilador_resmed.png",
        alt: "Ventilador Resmed Astral 150",
        title: "Ventilador Pulmonar | Resmed - Astral 150",
        link: null
      },
      autoclaveBaumer: {
        img: "imagens/autoclave_baumer.jpeg",
        alt: "Autoclave Baumer",
        title: "Autoclave | Baumer - HI VAC  II 542L",
        link: null
      },

     termodesinfectoraBaumer: {
        img: "imagens/termodesinfectora_baumer.jpeg",
        alt: "Lavadora Termodesinfectora Baumer",
        title: "Lavadora Termodesinfectora | Baumer - TW-E2000-400P",
        link: null
      },

     lavadoraUltrassonicaBaumer: {
        img: "imagens/lavadora_ultrassonica_baumer.jpeg",
        alt: "Lavadora Ultrassônica Baumer",
        title: "Lavadora Ultrassonica | Baumer E0201-042",
        link: null
      },

     esterilizadorPeroxidoBaumer: {
        img: "imagens/esterilizador_peroxido_baumer.png",
        alt: "Esterilizador por Peróxido de Hidrogênio Baumer",
        title: "Esterilizador por Peróxido de Hidrogênio | Baumer B0201-105-V02",
        link: null
      },
      secadoraBaumer: {
        img: "imagens/secadora_baumer.jpeg",
        alt: "Gabinete de Secagem Baumer",
        title: "Secadora | Baumer EA-34-03",
        link: null
      },

      camaraFanem: {
        img: "imagens/camara_fanem_3347.jpeg",
        alt: "Câmara de Conservação Fanem 3347/1",
        title: "Câmara de Conservação | Fanem 3347/1",
        link: null
      },

      camaraIndrel: {
        img: "imagens/camara_indrel_220.jpeg",
        alt: "Câmara de Conservação Indrel RC220",
        title: "Câmara de Conservação | Indrel - RC220",
        link: null
      },

      camaraBiotecno: {
        img: "imagens/camara_biotecno_1100.jpeg",
        alt: "Câmara de Conservação Biotecno BT1100",
        title: "Câmara de Conservação | Biotecno - BT1100",
        link: null
      },
     };

    const sectorNames = {
      "centro-cirurgico": "Centro Cirúrgico",
      "uti": "UTI",
      "internacao": "Internação",
      "pa": "Pronto Atendimento",
      "farmacia": "Farmácia",
      "imagem": "Diagnóstico por Imagem",
      "infusao": "Centro de Infusão",
      "ambulatorio": "Ambulatório",
      "cme": "CME"
    };

    const sectorsContainer = document.getElementById("sectors-container");

    for (const [sectorKey, items] of Object.entries(equipmentData)) {
      const section = document.createElement("section");
      section.className = "sector-category";
      section.dataset.setor = sectorKey;

      const h2 = document.createElement("h2");
      h2.className = "sector-header";
      h2.onclick = () => toggleSector(h2);
      h2.innerHTML = `Setor: ${sectorNames[sectorKey]} <span class="arrow">&#9654;</span>`;
      section.appendChild(h2);

      const cardsContainer = document.createElement("div");
      cardsContainer.className = "equipment-cards";

      items.forEach(item => {
        const equip = equipmentTemplates[item];
        if (equip) {
          const card = document.createElement("div");
          card.className = "card";
          card.innerHTML = `
            <img src="${equip.img}" alt="${equip.alt}">
            <h3>${equip.title}</h3>
            ${equip.link 
              ? `<a href="${equip.link}" target="_blank">Acessar Treinamento</a>`
              : `<a class="disabled" href="#" onclick="return false;">Disponível em breve</a>`}
          `;
          cardsContainer.appendChild(card);
        }
      });

      section.appendChild(cardsContainer);
      sectorsContainer.appendChild(section);
    }
