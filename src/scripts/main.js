import inputFile from './modules/inputFile';
import dropdownSearch from './modules/dropdownSearch';
import infoTypes from './modules/infoTypes';
import selectList from './modules/selectInput';
import inputTime from './modules/inputTime';
import match from './modules/match';
import debtorOpen from './modules/debtorOpen';
import auth from './modules/auth';
import admin from './modules/admin';
import reg from './modules/reg';
import popup from './modules/popup';
import popupInput from './modules/popupInput';
import info from './modules/info';
import childReg from './modules/childReg';
import childAcc from './modules/childAcc';


import $ from 'jquery';
import mask from 'jquery-mask-plugin';
import validation from 'jquery-validation';

$('.team,.year').attr('readonly', 'true');
$('.tel-mask').mask('+7 (000) 000-00-00', {
  placeholder: "+7 (___) ___-___-__",
  onComplete: function (cep, event, input) {
    input.attr('data-complete', 'true');
  },

  onChange: function (cep, event, input) {
    if (input.cleanVal().length < 10) {
      input.attr('data-complete', 'false');
    } else {
      input.attr('data-complete', 'true');
    }
  },

  showMaskOnFocus: false,
  showMaskOnHover: false,
});

$('.code-mask').mask('000000', {
  placeholder: "00000",
  onComplete: function (cep, event, input) {
    input.attr('data-complete', 'true');
  },

  onChange: function (cep, event, input) {
    if (input.cleanVal().length < 5 || input.cleanVal().length > 6) {
      input.attr('data-complete', 'false');
    } else {
      input.attr('data-complete', 'true');
    }
  },

  showMaskOnFocus: false,
  showMaskOnHover: false,
});

$('.date-mask').mask('00.00.0000', {
  placeholder: "10.10.2000",
  onComplete: function (cep, event, input) {
    input.attr('data-complete', 'true');
  },

  onChange: function (cep, event, input) {
    if (input.cleanVal().length < 10) {
      input.attr('data-complete', 'false');
    } else {
      input.attr('data-complete', 'true');
    }
  },

  showMaskOnFocus: false,
  showMaskOnHover: false,
});

$('.passport-mask').mask('0000 000000', {
  placeholder: "---- ------",
  onComplete: function (cep, event, input) {
    input.attr('data-complete', 'true');
  },

  onChange: function (cep, event, input) {
    if (input.cleanVal().length < 10) {
      input.attr('data-complete', 'false');
    } else {
      input.attr('data-complete', 'true');
    }
  },

  showMaskOnFocus: false,
  showMaskOnHover: false,
});

$('.calendar__cell').on('click', (e) => {
  e.preventDefault();
  const el = e.currentTarget;
  const calendar = e.currentTarget.closest('.calendar');
  const prevActive = calendar.querySelector('.calendar__cell--today');
  if (!el.classList.contains('calendar__cell--out')) {
    if (prevActive !== null && !prevActive.isEqualNode(el)) {
      prevActive.classList.remove('calendar__cell--today');
    }
    el.classList.toggle('calendar__cell--today');
  }
});

$('.webinar-list__link').on('click', e => {
  e.preventDefault();
  console.log('efefef')
  $('.popup-input').addClass('popup-input--is-active');
});


$('#calendar-auth').submit((e) => {
  e.preventDefault();
  localStorage.setItem('date', document.querySelector('.calendar__cell--today .calendar__cell-content').innerText);
  location.href = "table.html";
});


popup();
info();
admin();
popupInput();
reg();
auth();
debtorOpen();
match();
inputTime();
selectList();
infoTypes();
dropdownSearch();
inputFile();






