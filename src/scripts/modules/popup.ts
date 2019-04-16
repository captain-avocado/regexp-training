export const triggerPopup = (popupId: string, triggerId: string) => {
  const popup = document.getElementById(popupId);
  const triggers = [document.getElementById(triggerId), ...Array.from(popup.querySelectorAll('.popup__trigger'))];

  triggers.forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      popup.classList.toggle('popup--is-active');
    });
  });
};
