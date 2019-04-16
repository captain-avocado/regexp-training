import { initMenu } from './modules/menu';
import { initToTop } from './modules/toTop';
import { initMoreBtn } from './modules/more';
import { triggerPopup } from './modules/popup';

initMenu('nav-bar');
initToTop('to-top');
initToTop('logo-fixed');
initMoreBtn('more');
triggerPopup('popup-form', 'contact-popup');
