import { initMenu } from './modules/menu';
import { initBurgerMenu } from './modules/burgerMenu';
import { initToTop } from './modules/toTop';
import { initMoreBtn } from './modules/more';
import { triggerPopup } from './modules/popup';

import Inputmask from "inputmask";

initMenu('nav-bar');
initToTop('to-top');
initToTop('logo-fixed');
initToTop('logo-mobile');
initMoreBtn('more');
triggerPopup('popup-form', 'contact-popup');
initBurgerMenu('burger');

new Inputmask("+9 (999) 999-99-99").mask(document.getElementById('phone'));