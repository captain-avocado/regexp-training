import $ from 'jquery';
import mask from 'jquery-mask-plugin';
import validation from 'jquery-validation';

export default function auth() {
  const infoTypesAuth = document.querySelector('.info-types--admin');
  if (infoTypesAuth === null) return;  

  function showPopup(text) {
    $('.popup-input__inner-text').text(text);
    $('.popup-input').addClass('popup-input--is-active');
  }

  $('#admin-auth').validate({
    submitHandler: function() { 

      $.ajax({
        type: "GET",
        url: 'https://webiraylab.com/projects/redstar-admin/backend/endpoint.php',
        cache: false,
        xhrFields: { withCredentials:true },
        data: ({
            "method":"authorize",
            "email": document.getElementById("email").value,
            "password": document.getElementById("password").value,
            "level": $("input[name='level']:checked").val(),
        }),
        success: function(data) {
          var response = JSON.parse(data);
          console.log(response)
          if (!response.ok) {
            if (response.error.code === 'E_AUTH_EMAIL_NOT_REGISTERED') {
              showPopup('Ошибка! Указанный email в системе не зарегистрирован!')
            } else if (response.error.code === 'E_AUTH_INVALID_PASSWORD') {
              showPopup('Ошибка! Неверный пароль');
            } else if (response.error.code === 'E_AUTH_INVALID_LEVEL') {
              showPopup('Ошибка! Тип аккаунта не совпадает');
            } else if (response.error.code === 'E_AUTH_ACCOUNT_INACTIVE') {
              showPopup('Ошибка! Ваш аккаунт заблокирован, либо ещё не активирован, Свяжитесь с технической поддержкой');
            } else {
              showPopup('Системная ошибка');
            }
            return;
          } 

          location.href = "cabinet.html";    
        }, 
        
        fail: function() {
          showPopup('Cетевая ошибка');
        }

        
      });
    },
    invalidHandler: function(event, validator) {
      const popupInput = document.querySelector('.popup-input');
      popupInput.classList.add('popup-input--is-active');
    },
    errorPlacement: function(error, element) {
      // Don't show error
    },
  });

  $('#admin-reg').validate({
    submitHandler: function() { 

      $.ajax({
        type: "GET",
        url: 'https://webiraylab.com/projects/redstar-admin/backend/endpoint.php',
        cache: false,
        xhrFields: { withCredentials:true },
        data: ({
            "method":"register",
            "email": document.getElementById("email").value,
            "password": document.getElementById("password").value,
            "level": $("input[name='level']:checked").val(),
        }),
        success: function(data) {
          var response = JSON.parse(data);
          console.log(response)
          if (!response.ok) {
            if (response.error.code === 'E_REG_EMAIL_ALREADY_REGISTERED') {
              showPopup('Ошибка! Данный email уже зарегистрирован!')
            } else {
              showPopup('Системная ошибка');
            }
            return;
          } 

          showPopup('Регистрация прошла успешно! Проверьте свой почтовый ящик');
          setTimeout(() => {
            location.href = "auth-admin.html";
          }, 5000);
        }, 
        
        fail: function() {
          showPopup('Ошибка!', 'Неизвестная ошибка!');
        }

        
      });

      //     const password = document.getElementById('password');
      //     password.setAttribute('required', 'true');
      //     const regTmp = document.querySelector('.panel__reg-tmp');
      //     regTmp.style.display = 'block';
      // return false;
    },
    invalidHandler: function(event, validator) {
      const popupInput = document.querySelector('.popup-input');
      popupInput.classList.add('popup-input--is-active');
    },
    errorPlacement: function(error, element) {
      // Don't show error
    },
  });

  $('.inputs__show-pass').on('click', e => {
    e.preventDefault();
    const input =  $(e.currentTarget.parentElement.querySelector('input'));
    $(e.currentTarget).toggleClass('inputs__show-pass--is-active');
    if ($(e.currentTarget).hasClass('inputs__show-pass--is-active')) {
      input.attr('type', 'text');
    } else {
      input.attr('type', 'password');
    }
  });
}