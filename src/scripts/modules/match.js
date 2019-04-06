export default function match() {
  const matchCheckbox = document.querySelector('.inputs__match--addr-reg');
  if (matchCheckbox === null) return;

  const inputReg = document.querySelector('.inputs__input--addr-reg');
  const inputFact = document.querySelector('.inputs__input--addr-fact');

  function copyInput() {
    inputFact.value = inputReg.value;  
  }

  matchCheckbox.addEventListener('input', () => {
    if (matchCheckbox.checked) {
      copyInput();
      inputReg.addEventListener('input', copyInput);
      inputFact.setAttribute('readonly', 'true');
    } else {
      inputReg.removeEventListener('input', copyInput);
      inputFact.removeAttribute('readonly', 'false');
    }
  });
  
  
}