import $ from 'jquery';
// import mask from 'jquery-mask-plugin';
// import validation from 'jquery-validation';
import server_api from './server_api.sdk';

import Anketa from './Anketa';

const loginWrapper = document.querySelector('.login-wrapper');

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
const recoveryBtn = document.querySelector('.recovery__link');

const acceptInputs = [];
acceptLis.forEach(el => acceptInputs.push(el.querySelector('input')));


const lis = [phoneLi, codeLi, ...acceptLis];


//попап
function showPopup(text) {
  $('.popup-input__inner-text').text(text);
  $('.popup-input').addClass('popup-input--is-active');
}
const setupPopup = (() => {
  $('.popup-input__trigger').on('click', (e) => {
    e.preventDefault();
    $('.popup-input').removeClass('popup-input--is-active');
  });
})();


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

server_api.endpoint_url = 'https://rs.webiraysport.com/api/user.php';			//Адрес бэкэнда
server_api.debug_mode = true;			//Ругаться ли в консоль

server_api.default_errors_handler = function (err) {
  //console.log(code);
  //Стандартный обработчик общих ошибок типа E_UNAUTHORIZED
  //Выполняется перед обработчиком, указанным при настройке запроса
  //	и при успешной обработке предотвращает его вызов
  return false;	//Если вернули true - обработали ошибку. false - передать управление дальше.
};



let toAnketaRequest = server_api.prepare_ajax_request({
  using_method: 'getUserProfile',
  with_params: {
    // phone_number: '+7 (931) 393-08-20',
    // sms_code: input_code					//в качестве параметра можно использовать функцию без аргументов
  },
  and_then_with: (response_data) => {
    //авторизован
    Anketa.setup();

    if (response_data.anketa_step === 'completed') {
      Anketa.setActivePage('completed');
    }
  },
  or_with: (error) => {
    //не авторизован
    loginSetup();
  }
});


const phoneIsValid = () => {
  const input = document.getElementById('phone');
  const inputValue = input.value;
  if (inputValue.length === 18) {
    input.parentElement.querySelector('.inputs__require').classList.remove('inputs__require--is-active');
    return true;
  }
  else {
    input.parentElement.querySelector('.inputs__require').classList.add('inputs__require--is-active');
    return false;
  }
}

const codeIsValid = () => {
  const input = document.getElementById('code');
  const inputValue = input.value;
  if (inputValue.length > 4) {
    input.parentElement.querySelector('.inputs__require').classList.remove('inputs__require--is-active');
    return true;
  }
  else {
    input.parentElement.querySelector('.inputs__require').classList.add('inputs__require--is-active');
    return false;
  }
}


const getPhoneValue = () => {
  const value = $(`#phone`).cleanVal();
  return '7 ' + value;
}

const getCodeValue = () => {
  return $(`#code`).cleanVal();
}

let authRequest = server_api.prepare_ajax_request({
  using_method: 'authorize',
  with_params: {
    phone_number: getPhoneValue,
    sms_code: getCodeValue
  },
  and_then_with: (response_data) => {
    Anketa.setup();
    if (response_data.anketa_step === 'completed') {
      Anketa.setActivePage('completed');
    }
  },
  or_with: (error) => {
    if (error.code === 'E_AUTH_ACCOUNT_INACTIVE') {
      showPopup('Ваш аккаунт заблокирован, либо ещё не активирован, Свяжитесь с технической поддержкой');
    } else if (error.code === 'E_AUTH_INVALID_PASSWORD') {
      showPopup('Ошибка! Неверный пароль');
    } else {
      showPopup('Системная ошибка');
    }
  }
});

let regRequest = server_api.prepare_ajax_request({
  using_method: 'register',
  with_params: {
    phone_number: getPhoneValue,
  },
  and_then_with: (response_data) => {
    // console.log('Регистрация успешна!');


    const firstLogin = response_data.first_login;
    if (firstLogin) {
      setRegister();
    } else {
      setLogin();
    }

  },
  or_with: (error) => {
    showPopup('Системная ошибка. Пожалуйста, попробуйте позже');
  }
});

let recoverRequest = server_api.prepare_ajax_request({
  using_method: 'recovery',
  with_params: {
    phone_number: getPhoneValue,
  },
  and_then_with: (response_data) => {
    recoveryText.innerText = 'Вам был отправлен код подтверждения';
  },
  or_with: (error) => {
    showPopup('Системная ошибка. Пожалуйста, попробуйте позже');
  }
});

const fromBegin = (e) => {
  e.preventDefault();
  if (!phoneIsValid()) return;
  regRequest.submit();
}


const fromLogin = (e) => {
  e.preventDefault();
  if (!codeIsValid()) return;
  authRequest.submit();
}

const fromRegister = (e) => {
  e.preventDefault();
  if (!codeIsValid()) return;
  authRequest.submit();
}

const checkAccepted = () => {
  let check = true;
  acceptInputs.forEach(el => {
    if (!el.checked) check = false;
  });
  return check;
}

const hideBtn = () => {
  if (checkAccepted()) {
    panelBtns.classList.remove('disabled');
  } else {
    panelBtns.classList.add('disabled');
  }
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

  btn.removeEventListener('click', fromBegin);
  btn.removeEventListener('click', fromRegister);
  btn.addEventListener('click', fromLogin);
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

  btn.removeEventListener('click', fromBegin);
  btn.addEventListener('click', fromRegister);
  btn.removeEventListener('click', fromLogin);

  hideBtn();
  acceptInputs.forEach(el => el.addEventListener('change', hideBtn));
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

  btn.addEventListener('click', fromBegin);
  btn.removeEventListener('click', fromRegister);
  btn.removeEventListener('click', fromLogin);
}

export const loginSetup = () => {
  if (infoTypes === null) return;
  loginWrapper.classList.remove('disabled');

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

  recoveryBtn.addEventListener('click', () => { recoverRequest.submit(); });
  backBtn.addEventListener('click', setBegin);
  setBegin();
};

export const setup = (() => {
  toAnketaRequest.submit();
})();


