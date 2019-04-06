export default function reg() {

  const regBtn = document.getElementById('reg-btn');
  if (regBtn === null) return;

  const telInput = document.querySelector('.tel-mask');
  const codeInput = document.querySelector('.code-mask');
  const regTmp = document.querySelector('.panel__reg-tmp');
  const popupInput = document.querySelector('.popup-input');

  regBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (telInput.getAttribute('data-complete') === 'true') {
      regTmp.style.display = "block";
      if (codeInput.getAttribute('data-complete') === 'true') {
        location.href = "agreement.html";
      }
    } else {
      popupInput.classList.add('popup-input--is-active');
    }
  });
  
}