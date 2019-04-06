import $ from 'jquery';
import mask from 'jquery-mask-plugin';
import validation from 'jquery-validation';

export default function auth() {
  const infoTypesAuth = document.querySelector('.info-types--admin');
  if (infoTypesAuth === null) return;  

  // $('#admin-reg').validate({
  //   invalidHandler: function(event, validator) {
  //     const popupInput = document.querySelector('.popup-input');
  //     popupInput.classList.add('popup-input--is-active');
  //   },
  //   errorPlacement: function(error, element) {
  //     // Don't show error
  //   },
  // });
}