export default function inputFile() {
  const inputFile = document.querySelector('.inputs__file');
  if (inputFile === null) return;

  inputFile.addEventListener('input', (e) =>{
    e.preventDefault();
    const fileName = document.querySelector('.inputs__file').value.split(/(\\|\/)/g).pop();
    e.currentTarget.parentElement.querySelector('.inputs__input').innerText = fileName;
  });
}