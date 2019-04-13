import $ from 'jquery';
// import mask from 'jquery-mask-plugin';
// import validation from 'jquery-validation';
import server_api from './server_api.sdk';
import { children } from './childReg';

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
  using_method: 'addParentCard',
  with_params: {
    json: data
  },
  and_then_with: (response_data) => {
    Anketa.setActivePage(chosen_id);
  },
  or_with: (error) => {
    //вывести ошибки в инпутах
  }
});

const constructJSON = (block) => {
  let data = {};
  const inputs = block.querySelectorAll('input');
  let flag = true;
  inputs.forEach((el) => {
    if (el.type === 'text') {
      if (el.value === '') flag = false;
      data[el.id] = el.value;
    }

    if (el.type === 'checkbox') {
      data[el.id] = el.checked;
    }
  });

  if (!flag) return null;

  return data;
}

class Anketa {

  static getActivePage() {
    return document.querySelector('.page:not(.disabled)');
  }

  static setActivePage(id) {
    document.querySelectorAll('.page').forEach((el) => {
      if (el.id == id)
        el.classList.remove('disabled');    //hard display: none !important
      else
        el.classList.add('disabled');
    });
    return Anketa;
  }

  static setup() {
    document.querySelector('.login-wrapper').classList.add('disabled');
    document.querySelector('.anketa-wrapper').classList.remove('disabled');
    Anketa.setActivePage('page-begin');
    document.querySelectorAll('.btn-pagenav').forEach((btn) => {
      btn.addEventListener('click', (ev) => {
        ev.preventDefault();
        let btn = ev.target;
        let direction = btn.getAttribute('data-direction');
        let chosen_id = btn.getAttribute('data-pageid');


        if (direction === 'forward') {
          const currentPageId = Anketa.getActivePage().id;
          if (currentPageId === 'page-parent-card') {
            data = constructJSON(Anketa.getActivePage());
            if (data === null) {
              showPopup('Ошибка заполнения полей');
              return;
            }

            data['country'] = 'Россия';
            console.log(data)

            server_api.prepare_ajax_request({
              using_method: 'addParentCard',
              with_params: {
                json: JSON.stringify(data)
              },
              and_then_with: (response_data) => {
                Anketa.setActivePage(chosen_id);
              },
              or_with: (error) => {
                showPopup('Сетевая ошибка');
              }
            }).submit();
            Anketa.setActivePage(chosen_id);
          } else if (currentPageId === 'page-child-cards') {
            if (children.length === 0) {
              showPopup('Добавьте ребенка');
              return;
            }
            console.log(children)
            Anketa.setActivePage(chosen_id);

          } else {
            Anketa.setActivePage(chosen_id);
          }
        } else {
          Anketa.setActivePage(chosen_id);
        }

      });
    });
    return Anketa;
  }

}

export default Anketa;