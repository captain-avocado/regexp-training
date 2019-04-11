const infoTypes = document.querySelector('.info-types--login');
const panelTmp = document.querySelector('.panel__tmp');
const panelBtns = document.querySelector('.web-create__step-panels');
const panelInputs = document.querySelector('.inputs');
const btn = document.querySelector('.continue');

let status = 'begin';

const backBtn = document.querySelector('.panel__back');
const acceptLis = document.querySelectorAll('.accept-li');
const codeLi = document.querySelector('.code-li');
const phoneLi = document.querySelector('.phone-li');
const panelText = document.querySelector('.panel__title-auth-text');
const recoveryText = document.querySelector('.recovery__text');

const lis = [phoneLi, codeLi, ...acceptLis];

//выравнивание марджинов
function fixMargins() {
  lis.forEach((el, i) => {
    el.classList.remove('margin-fix');
    if (i > 0) {
      if (el.classList.contains('disabled')) {
        lis[i - 1].classList.add('margin-fix');
      } else {
        lis[i - 1].classList.remove('margin-fix');
      }
    }
  });
}

export const setLogin = (e) => {
  if (e) e.preventDefault();
  status = 'login';
  infoTypes.classList.add('disabled');
  backBtn.classList.remove('disabled');
  acceptLis.forEach(el => el.classList.add('disabled'));
  codeLi.classList.remove('disabled');
  phoneLi.classList.add('disabled');
  panelText.innerText = 'Авторизация';
  recoveryText.innerText = 'Получить новый код подтверждения';
  fixMargins();
}

export const setRegister = (e) => {
  if (e) e.preventDefault();
  status = 'register';
  infoTypes.classList.add('disabled');
  backBtn.classList.remove('disabled');
  acceptLis.forEach(el => el.classList.remove('disabled'));
  codeLi.classList.remove('disabled');
  phoneLi.classList.add('disabled');
  panelText.innerText = 'Регистрация';
  recoveryText.innerText = 'Вам был отправлен код подтверждения';
  fixMargins();
}

export const setBegin = (e) => {
  if (e) e.preventDefault();
  status = 'begin';
  infoTypes.classList.remove('disabled');
  backBtn.classList.add('disabled');
  acceptLis.forEach(el => el.classList.add('disabled'));
  codeLi.classList.add('disabled');
  phoneLi.classList.remove('disabled');
  panelText.innerText = 'Вход';
  fixMargins();
}

export const setup = (() => {
  if (infoTypes === null) return;
  infoTypes.querySelectorAll('input').forEach(el => el.addEventListener('change', (e) => {
    if (e.target.value === 'member') {
      panelTmp.classList.add('disabled');
      panelBtns.classList.remove('disabled');
      panelInputs.classList.remove('disabled');
    }

    if (e.target.value === 'not-member') {
      panelTmp.classList.remove('disabled');
      panelBtns.classList.add('disabled');
      panelInputs.classList.add('disabled');
    }
  }));

  setBegin();
  backBtn.addEventListener('click', setBegin);

  if (status === 'begin') {
    console.log(1, status)

    btn.addEventListener('click', setRegister);
    btn.removeEventListener('click', setBegin);
    // btn.removeEventListener('click', setLogin);
  }

  if (status === 'login') {
    console.log(2, status)

    btn.addEventListener('click', setBegin);
    btn.removeEventListener('click', setLogin);
    btn.removeEventListener('click', setRegister);
  }

  if (status === 'register') {
    console.log(3, status)

    btn.addEventListener('click', setBegin);
    btn.removeEventListener('click', setLogin);
    btn.removeEventListener('click', setRegister);
  }

})();


