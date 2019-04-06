export default function popup() {
  // const popupInput = document.querySelector('.popup');
  // if (popupInput === null) return;

  // const trigger = popupInput.querySelector('.popup__trigger');
  // trigger.addEventListener('click', (e) => {
  //   e.preventDefault();
  //   popupInput.classList.remove('popup--is-active');
  // });

  const popupCalendar = document.querySelector('.popup-calendar');
  if (popupCalendar === null) return;

  const btnCalendar = document.getElementById('view-visitors');
  btnCalendar.addEventListener('click', e => {
    e.preventDefault();
    popupCalendar.classList.add('popup--is-active');
  });

  const trigger = popupCalendar.querySelector('.popup__trigger');
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    popupCalendar.classList.remove('popup--is-active');
  });
}