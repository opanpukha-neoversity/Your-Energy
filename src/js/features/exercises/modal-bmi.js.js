document.addEventListener('DOMContentLoaded', () => {
  const teamLink = document.querySelector('.bmi__link');
  const teamBackdrop = document.querySelector('.bmi__backdrop');
  const teamCloseBtn = document.querySelector('.bmi__modal-close-btn');
  const asideImg = document.querySelector('.aside__img');

  const bmiInputEl = document.getElementById('bmi-result');
  const heightInput = document.getElementById('height');
  const weightInput = document.getElementById('weight');
  const btnEl = document.getElementById('btn');
  const weightConditionEl = document.getElementById('weight-condition');

  let isModalOpen = false;

  if (!teamBackdrop || !bmiInputEl || !heightInput || !weightInput || !btnEl) {
    return;
  }

  function openModal() {
    if (isModalOpen) return;
    isModalOpen = true;

    resetInputs();

    teamBackdrop.classList.remove('is-hidden');
    document.body.classList.add('modal-open');

    document.addEventListener('keydown', onEscKeyDown);
    teamBackdrop.addEventListener('click', onBackdropClick);
    teamCloseBtn?.addEventListener('click', onCloseBtnClick);
    asideImg?.addEventListener('click', onAsideImgClick);
  }

  function closeModal() {
    if (!isModalOpen) return;
    isModalOpen = false;

    document.removeEventListener('keydown', onEscKeyDown);
    teamBackdrop.removeEventListener('click', onBackdropClick);
    teamCloseBtn?.removeEventListener('click', onCloseBtnClick);
    asideImg?.removeEventListener('click', onAsideImgClick);

    teamBackdrop.classList.add('is-hidden');
    document.body.classList.remove('modal-open');
  }

  function onEscKeyDown(event) {
    if (event.code === 'Escape') {
      closeModal();
    }
  }

  function onBackdropClick(event) {
    if (!event.target.closest('.bmi__wrapper')) {
      closeModal();
    }
  }

  function onCloseBtnClick(event) {
    event.preventDefault();
    closeModal();
  }

  function onLinkClick(event) {
    event.preventDefault();
    openModal();
  }

  function onAsideImgClick() {
    openModal();
  }

  function resetInputs() {
    heightInput.value = '180';
    weightInput.value = '80';
    bmiInputEl.value = '';

    if (weightConditionEl) {
      weightConditionEl.innerText = '';
    }
  }

  function calculateBMI() {
    const heightValue = Number(heightInput.value) / 100;
    const weightValue = Number(weightInput.value);

    if (!heightValue || !weightValue || heightValue <= 0 || weightValue <= 0) {
      bmiInputEl.value = '';
      if (weightConditionEl) {
        weightConditionEl.innerText = 'Please enter valid values';
      }
      return;
    }

    const bmiValue = Number((weightValue / (heightValue * heightValue)).toFixed(1));

    bmiInputEl.value = bmiValue;

    if (!weightConditionEl) return;

    if (bmiValue < 18.5) {
      weightConditionEl.innerText = 'Under weight!';
    } else if (bmiValue < 25) {
      weightConditionEl.innerText = 'Normal weight!';
    } else if (bmiValue < 30) {
      weightConditionEl.innerText = 'Overweight!';
    } else {
      weightConditionEl.innerText = 'Obesity!';
    }
  }

  btnEl.addEventListener('click', calculateBMI);

  if (teamLink) {
    teamLink.addEventListener('click', onLinkClick);
  }

  if (asideImg) {
    asideImg.addEventListener('click', onAsideImgClick);
  }
});
