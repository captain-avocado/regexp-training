import { initMenu } from './modules/menu';
import { initBurgerMenu } from './modules/burgerMenu';
import { initToTop } from './modules/toTop';
import { initMoreBtn } from './modules/more';
import { triggerPopup } from './modules/popup';

import { validateInput } from './modules/validate';

import Inputmask from 'inputmask';

initMenu('nav-bar');
initToTop('to-top');
initToTop('logo-fixed');
initToTop('logo-mobile');
initMoreBtn('more');
triggerPopup('popup-form', 'contact-popup');
initBurgerMenu('burger');

new Inputmask('+9 (999) 999-99-99').mask(document.getElementById('phone'));

document.forms[0].querySelectorAll<HTMLInputElement>('input').forEach(el => {
  el.addEventListener('change', e => {
    validateInput(el);
  });
});

document.forms[0].addEventListener('submit', e => {
  e.preventDefault();
  let validate = true;
  document.forms[0].querySelectorAll<HTMLInputElement>('input').forEach(el => {
    if (!validateInput(el)) {
      validate = false;
    }
  });

  if (validate) console.log('EYE');
});
