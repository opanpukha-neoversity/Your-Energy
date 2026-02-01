import APIService from '../../api/api-service.js';
import icons from '../../../img/sprite.svg';

const apiService = new APIService();

const listItem = document.querySelector('.js-list');
const paginationButtons = document.getElementById('pagination-numbers');
const searchForm = document.querySelector('.search__form');
const span = document.querySelector('.exersices__span');
const text = document.querySelector('.exersices__text');

let currentPage = 1;

if (listItem) {
  listItem.addEventListener('click', onCardClick);
}

async function onCardClick(event) {
  const item = event.target.closest('.filters__item');
  if (!item) return;

  if (searchForm) {
    searchForm.classList.remove('hidden');
  }

  let filter = item.lastElementChild.children[0].innerText
    .toLowerCase()
    .replace(/\s/g, '');

  const name = item.lastElementChild.children[1].innerText
    .toLowerCase()
    .replace(/\s/g, '%20');

  if (filter === 'bodyparts') {
    filter = 'bodypart';
  }

  const searchParams = { filter, name };

  localStorage.setItem('paramSearch', JSON.stringify(searchParams));

  try {
    const { results, totalPages } = await apiService.getExercises(
      filter,
      name,
      currentPage
    );

    setupPagination({ filter, name, totalPages });
    renderExercises(results);
    textExercises(results);
  } catch (error) {
    console.error(error);
  }
}

function textExercises(results) {
  if (!results || results.length === 0) {
    if (text) text.classList.add('hidden');
    if (span) span.classList.add('hidden');
    return;
  }

  if (text) {
    text.innerText = results[0].bodyPart;
    text.classList.remove('hidden');
  }

  if (span) {
    span.classList.remove('hidden');
  }
}

function createExerciseCard({ _id, rating, name, burnedCalories, bodyPart, target }) {
  const displayRating = rating % 1 === 0 ? `${rating}.0` : rating;

  return `
    <li class="filters__item-card">
      <div class="card__wrap">
        <div class="card__block-btn">
          <p class="card__badge">Workout</p>
          <span class="card__rating">
            <span>${displayRating}</span>
            <svg class="card__rating-star" width="18" height="18">
              <use href="${icons}#icon-star"></use>
            </svg>
          </span>
          <button class="card__btn" data-id="${_id}" type="button">Start
            <svg class="card__btn-arrow" width="16" height="16">
              <use href="${icons}#icon-arrow-menu-mobile"></use>
            </svg>
          </button>
        </div>

        <div class="card__wrap-title">
          <div class="card__title-svg-btn">
            <svg class="card__title-svg" width="24" height="24">
              <use href="${icons}#icon-running-stick-figure"></use>
            </svg>
          </div>
          <h2 class="card__title">${name}</h2>
        </div>

        <div class="card__block-info">
          <p class="card__text-info"><span class="card__text-gray">Burned calories:</span> ${burnedCalories}</p>
          <p class="card__text-info"><span class="card__text-gray">Body part:</span> ${bodyPart}</p>
          <p class="card__text-info"><span class="card__text-gray">Target:</span> ${target}</p>
        </div>
      </div>
    </li>`;
}

export function renderExercises(results = []) {
  if (!listItem) return;

  listItem.innerHTML = '';
  if (!results.length) return;

  const markup = results.map(createExerciseCard).join('');
  listItem.insertAdjacentHTML('beforeend', markup);
}

function initExercisesFilters() {
  const buttons = document.querySelectorAll('.exercises__btn');
  if (!buttons.length) return;

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      if (searchForm) searchForm.classList.add('hidden');
      if (text) text.classList.add('hidden');
      if (span) span.classList.add('hidden');
    });
  });
}

document.addEventListener('DOMContentLoaded', initExercisesFilters);

async function setCurrentPage(filter, name, page) {
  currentPage = page;

  try {
    const { results, totalPages } = await apiService.getExercises(
      filter,
      name,
      currentPage
    );

    setupPagination({ filter, name, totalPages });
    renderExercises(results);
    textExercises(results);
  } catch (error) {
    console.error(error);
  }

  handleActivePageNumber();
  scrollToTop();
}

function setupPagination({ filter, name, totalPages }) {
  if (!paginationButtons) return;

  paginationButtons.innerHTML = '';

  if (!totalPages || totalPages <= 1) return;

  for (let i = 1; i <= totalPages; i++) {
    const pageNumber = document.createElement('button');
    pageNumber.className = 'pagination-button';
    pageNumber.textContent = i;

    pageNumber.addEventListener('click', () => {
      setCurrentPage(filter, name, i);
    });

    paginationButtons.appendChild(pageNumber);
  }

  handleActivePageNumber();
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