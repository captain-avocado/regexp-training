import $ from 'jquery';
import server_api from './server_api.sdk';

//попап
function showPopup(text) {
  $('.popup-input__inner-text').text(text);
  $('.popup-input').addClass('popup-input--is-active');
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

let data = {};

let anketaStepRequest = server_api.prepare_ajax_request({
  using_method: 'addChildCard',
  with_params: {
    json: () => JSON.stringify(data)
  },
  and_then_with: (response_data) => {
    children.push(data);
  },
  or_with: (error) => {
    //вывести ошибки в инпутах
  }
});

export let children = [];

export default (function childReg() {
  const save = document.getElementById('save');
  const add = document.getElementById('add');
  const panelContainer = document.querySelector('.panel-container--is-active');
  if (panelContainer === null) return;

  if (document.querySelectorAll('.panel-container:not(.panel-container--is-active)').length < 1) {
    document.querySelector('.panel--next').style.opacity = .5;
  }

  const childAddrCheckbox = document.getElementById('child-address_ep');
  childAddrCheckbox.addEventListener('change', (e) => {
    setParentAddress(childAddrCheckbox.checked);
  });

  const inputsValidate = () => {
    const inputs = panelContainer.querySelectorAll('input');
    let flag = true;
    inputs.forEach((el) => {
      if (el.type === 'text') {
        if (el.value === '') flag = false;
      }
    });

    if (!flag) return false;
    else return true;

  }

  const setParentAddress = (check) => {
    const parentAddress = document.getElementById('address_reg').value;
    const childAddrInput = document.getElementById('child-address_real');
    childAddrInput.value = (check) ? (parentAddress) : '';
  }

  // document.query

  save.addEventListener('click', (e) => {
    e.preventDefault();

    if (!inputsValidate()) {
      showPopup('Ошибка заполнения полей');
      return;
    }

    data = {};
    const inputs = panelContainer.querySelectorAll('input');
    inputs.forEach((el) => {
      if (el.type === 'text') {
        data[el.id.split('-')[1]] = el.value;
      }

      if (el.type === 'checkbox') {
        data[el.id.split('-')[1]] = el.checked;
      }
    });

    console.log(data);
    anketaStepRequest.submit();


    const containerCopy = panelContainer.cloneNode(true);
    containerCopy.querySelectorAll('input').forEach(el => el.id = '');

    containerCopy.classList.remove('panel-container--is-active');

    containerCopy.querySelectorAll('input').forEach((el) => {
      el.style.borderColor = '#CFCFD7';
      el.setAttribute('disabled', 'true');
    });

    const panelCols = document.querySelector('.panels__col--child-reg');
    console.log(panelCols)
    console.log(panelContainer)

    panelCols.insertBefore(containerCopy, panelContainer);


    panelContainer.classList.add('hidden');
    save.parentElement.classList.add('hidden');
    add.parentElement.classList.remove('hidden');

    document.querySelector('.panel--next').style.opacity = '';

  });

  add.addEventListener('click', (e) => {
    e.preventDefault();
    if (document.querySelectorAll('.panel-container').length > 5) return;
    panelContainer.classList.remove('hidden');
    save.parentElement.classList.remove('hidden');
    add.parentElement.classList.add('hidden');

  });

})();