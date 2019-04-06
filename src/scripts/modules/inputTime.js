export default function selectInput() {
  const timeInputStart = document.querySelector('.time-input--start');
  // const timeInputEnd = document.querySelector('.time-input--end');
  if (timeInputStart === null) return;
  
  function processInput(timeInput) {
    timeInput.querySelectorAll('input').forEach(el => el.addEventListener('keyup', () => {
      console.log(el);
      el.value = el.value.substr(0, 2);
    })
    );
  }

  processInput(timeInputStart);

  function createInputEnd() {
    const timeInputEnd = document.createElement('div');
    timeInputEnd.classList.add('time-input');
    timeInputEnd.classList.add('time-input--end');
  
    const inputEndHours = document.createElement('input');
    inputEndHours.setAttribute('type', 'text');
    inputEndHours.classList.add('time-input__input');
    inputEndHours.classList.add('time-input__input--hours');
    timeInputEnd.appendChild(inputEndHours);
  
    const colonSpan = document.createElement('span');
    colonSpan.classList.add('time-input__colon');
    colonSpan.innerText = ':';
    timeInputEnd.appendChild(colonSpan);
  
    const inputEndMin = document.createElement('input');
    inputEndMin.setAttribute('type', 'text');
    inputEndMin.classList.add('time-input__input');
    inputEndMin.classList.add('time-input__input--mins');
    timeInputEnd.appendChild(inputEndMin);
  
    return timeInputEnd;
  }
  
  const infoTypeBlock = document.querySelector('.info-types--time');
  const infoTypeList = document.querySelectorAll('.info-types__type--time');
  infoTypeList.forEach(el => {
    el.addEventListener('click', () => {
      const prevActiveItem = infoTypeBlock.querySelector('.info-types__type--is-active');
      if (el !== prevActiveItem) {
        prevActiveItem.classList.remove('info-types__type--is-active');
        el.classList.add('info-types__type--is-active');
        if (el.classList.contains('info-types__type--limited')) {
          const inputsArea = document.querySelector('.date-panel__time-inputs');
          const timeInputEnd = createInputEnd();
          inputsArea.appendChild(timeInputEnd);
          processInput(timeInputEnd);
        } else {
          const timeInputEnd = document.querySelector('.time-input--end');
          timeInputEnd.parentElement.removeChild(timeInputEnd);
        }
      }
    });
  });


  

}