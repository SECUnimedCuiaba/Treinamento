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

        // Remove todas as classes que possam estar interferindo
       // header.classList.remove('collapsed', 'open');
        //cards.classList.remove('collapsed', 'open');

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

      /* Código do botão "Ver Todos os Setores"
      const showAllBtn = document.getElementById("showAllSectorsBtn");
      if (showAllBtn) {
        showAllBtn.addEventListener("click", () => {
          window.location.href = window.location.pathname;
        });
      }*/

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
