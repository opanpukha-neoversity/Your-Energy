import APIService from '../../api/api-service.js';

const apiService = new APIService();

const listItem = document.querySelector('.js-list');
const paginationButtons = document.getElementById('pagination-numbers');
const filterButtons = document.querySelectorAll('.btnFilters');

let currentPage = 1;
let currentFilter = 'Muscles';

initFiltersModule();

function initFiltersModule() {
  if (!listItem) return;

  getFiltersExercises(currentFilter, currentPage);

  if (filterButtons.length) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const params = button.dataset.filter || button.innerText.trim();

        currentFilter = params;
        currentPage = 1;
        listItem.innerHTML = '';

        getFiltersExercises(currentFilter, currentPage);
      });
    });
  }
}

async function getFiltersExercises(params, page) {
  try {
    const { results, totalPages } = await apiService.getFilter(params, page);

    displayExercises(results || []);
    setupPagination({ filter: params, totalPages });
  } catch (error) {
    console.error('Failed to load filters:', error);
  }
}

function displayExercises(results = []) {
  if (!listItem) return;

  listItem.innerHTML = '';

  if (!results.length) return;

  const markup = results
    .map(({ filter, name, imgURL }) => {
      return `
        <li class="filters__item" data-filter="${filter}" data-name="${name}">
          <img class="filters__img-first" src="${imgURL}" alt="${name}" />
          <div class="filters__wrapper-first">
            <h2 class="filters__title-first">${filter}</h2>
            <p class="filters__text-first">${name}</p>
          </div>
        </li>
      `;
    })
    .join('');

  listItem.insertAdjacentHTML('beforeend', markup);
}

function setupPagination({ filter, totalPages }) {
  if (!paginationButtons) return;

  paginationButtons.innerHTML = '';

  if (!totalPages || totalPages <= 1) return;

  for (let i = 1; i <= totalPages; i++) {
    const pageNumber = document.createElement('button');
    pageNumber.className = 'pagination-button';
    pageNumber.textContent = i;

    pageNumber.addEventListener('click', () => {
      setCurrentPage(filter, i);
    });

    paginationButtons.appendChild(pageNumber);
  }

  handleActivePageNumber();
}

async function setCurrentPage(filter, page) {
  currentPage = page;

  await getFiltersExercises(filter, currentPage);

  handleActivePageNumber();
  scrollToTop();
}

const handleActivePageNumber = () => {
  const buttons = document.querySelectorAll('.pagination-button');

  buttons.forEach((button, index) => {
    button.classList.toggle('active-btn', index + 1 === currentPage);
  });
};

function scrollToTop() {
  window.scrollTo({
    top: 830,
    behavior: 'auto',
  });
}
