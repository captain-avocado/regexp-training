export default function auth() {
  const infoTypesAuth = document.querySelector('.info-types--auth');
  if (infoTypesAuth === null) return;
  
  const panelTmp = document.querySelector('.panel__tmp');
  const panelInputs = document.querySelector('.inputs');
  const steps = document.querySelector('.web-create__step-panels');
  const activeInfoType = document.querySelector('.info-types__type--is-active');

  function updateBlocks(el) {
    if (el.classList.contains('info-types__type--not-member')) {
      panelTmp.style.display = 'block';
      panelInputs.style.display = 'none';
      steps.style.display = 'none';
    } else {
      panelInputs.style.display = 'block';
      panelTmp.style.display = 'none';
      steps.style.display = 'flex';
    }
  }

  updateBlocks(activeInfoType);

  const infoTypesChildNodes = infoTypesAuth.childNodes;
  infoTypesChildNodes.forEach(el => el.addEventListener('click', () => {
    const prevActiveItem = el.parentElement.querySelector('.info-types__type--is-active');
      if (prevActiveItem !== el) {
        prevActiveItem.classList.remove('info-types__type--is-active');
        el.classList.add('info-types__type--is-active');
      }
      updateBlocks(el);
  }));


  const authBtn = document.getElementById('auth-btn');
  const telInput = document.querySelector('.tel-mask');
  const codeInput = document.querySelector('.code-mask');
  const popupInput = document.querySelector('.popup-input');

  authBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (telInput.getAttribute('data-complete') === 'false' || codeInput.getAttribute('data-complete') === 'false') {
      popupInput.classList.add('popup-input--is-active');
    }
  });
}