export default function reg() {
  const popupInput = document.querySelector('.popup-input');
  if (popupInput === null) return;

  const trigger = popupInput.querySelector('.popup-input__trigger');
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    popupInput.classList.remove('popup-input--is-active');
  });
}