const modalExercises = document.querySelector('.modal-exercises');
const ratingModal = document.querySelector('.modal-rating');
const ratingCloseBtn = document.querySelector('.rating-close-btn');
const sendButton = document.querySelector('.form__btn');
const ratingValueElement = document.querySelector('.rating__value');
const emailInput = document.querySelector('.rating-email');
const commentTextarea = document.querySelector('.rating-comment');
const ratings = document.querySelectorAll('.rating');

if (
  modalExercises &&
  ratingModal &&
  ratingCloseBtn &&
  sendButton &&
  ratingValueElement &&
  emailInput &&
  commentTextarea
) {
  modalExercises.addEventListener('click', onExercisesCardClick);
  ratingCloseBtn.addEventListener('click', closeModal);
  ratingModal.addEventListener('click', closeOverlay);
  document.addEventListener('keydown', onEscClick);

  initRatings();

  emailInput.addEventListener('input', updateSendButtonState);
  commentTextarea.addEventListener('input', updateSendButtonState);

  const observer = new MutationObserver(updateSendButtonState);
  observer.observe(ratingValueElement, { childList: true, subtree: true });

  sendButton.addEventListener('click', onSendClick);
}

function onExercisesCardClick(event) {
  if (!event.target.closest('.modal-exercises__btn-rating')) return;

  ratingModal.classList.remove('is-hidden');
  modalExercises.classList.add('hidden');
}

function closeModal() {
  ratingModal.classList.add('is-hidden');
  modalExercises.classList.remove('hidden');
}

function closeOverlay(event) {
  if (event.target === ratingModal) {
    closeModal();
  }
}

function onEscClick(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

function setRatingActiveWidth(ratingActive, ratingValue, value) {
  const numeric = parseFloat(value) || 0;
  const ratingActiveWidth = numeric * 20;

  if (ratingActive) {
    ratingActive.style.width = `${ratingActiveWidth}%`;
  }

  if (ratingValue) {
    ratingValue.innerHTML = numeric.toFixed(1);
  }
}

function initRatings() {
  if (!ratings || ratings.length === 0) return;

  let ratingActive, ratingValue, currentRating;

  for (let i = 0; i < ratings.length; i++) {
    const rating = ratings[i];
    initRating(rating);
  }

  function initRating(rating) {
    initRatingVars(rating);
    setRatingActiveWidth(ratingActive, ratingValue, currentRating);

    if (rating.classList.contains('rating_set')) {
      setRating(rating);
    }
  }

  function initRatingVars(rating) {
    ratingActive = rating.querySelector('.rating__active');
    ratingValue = rating.querySelector('.rating__value');
    currentRating = parseFloat(ratingValue?.innerHTML || '0') || 0;
  }

  function setRating(rating) {
    const ratingItems = rating.querySelectorAll('.rating__item');

    for (let index = 0; index < ratingItems.length; index++) {
      const ratingItem = ratingItems[index];
      const starValue = (index + 1).toFixed(1);

      ratingItem.addEventListener('mouseenter', () => {
        initRatingVars(rating);
        setRatingActiveWidth(ratingActive, ratingValue, starValue);
      });

      ratingItem.addEventListener('mouseleave', () => {
        setRatingActiveWidth(ratingActive, ratingValue, currentRating);
      });

      ratingItem.addEventListener('click', () => {
        initRatingVars(rating);

        if (starValue !== '0.0') {
          currentRating = parseFloat(starValue);

          if (rating.dataset.ajax) {
            console.log('Send rating to server:', currentRating);
          } else {
            ratingValue.innerHTML = currentRating.toFixed(1);
            setRatingActiveWidth(ratingActive, ratingValue, currentRating);
          }

          updateSendButtonState();
        }
      });
    }
  }
}

function isFormValid() {
  const emailValue = emailInput.value.trim();
  const commentValue = commentTextarea.value.trim();
  const ratingValue = ratingValueElement.innerHTML.trim();

  return emailValue !== '' && commentValue !== '' && ratingValue !== '0.0';
}

function updateSendButtonState() {
  if (!sendButton) return;
  sendButton.disabled = !isFormValid();
}

function clearForm() {
  emailInput.value = '';
  commentTextarea.value = '';
  ratingValueElement.innerHTML = '0.0';

  setTimeout(() => {
    const ratingActive = document.querySelector('.rating__active');
    setRatingActiveWidth(ratingActive, ratingValueElement, '0.0');
    updateSendButtonState();
  }, 0);
}

function onSendClick(event) {
  event.preventDefault();

  if (!isFormValid()) {
    console.warn(
      'Form is not valid. Please fill in all fields and choose a rating.'
    );
    return;
  }

  const ratingValue = ratingValueElement.innerHTML.trim();
  const emailValue = emailInput.value.trim();
  const commentValue = commentTextarea.value.trim();

  console.log('Current rating value:', ratingValue);
  console.log('Entered email:', emailValue);
  console.log('Entered comment:', commentValue);

  closeModal();
  clearForm();
}
