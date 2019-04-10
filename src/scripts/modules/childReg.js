export default (function childReg() {
  const save = document.getElementById('save');
  const add = document.getElementById('add');
  const panelContainer = document.querySelector('.panel-container--is-active');
  if (panelContainer === null) return;

  if (document.querySelectorAll('.panel-container:not(.panel-container--is-active)').length < 1) {
    document.querySelector('.panel--next').style.opacity = .5;
  }

  save.addEventListener('click', (e) => {
    e.preventDefault();

    let inputsValidate = true;
    if (!inputsValidate) return;


    const containerCopy = panelContainer.cloneNode(true);
    containerCopy.classList.remove('panel-container--is-active');

    containerCopy.querySelectorAll('input').forEach((el) => {
      el.style.borderColor = '#CFCFD7';
      el.setAttribute('disabled', 'true');
    });

    const panelCols = document.querySelector('.panels__col--child-reg');
    console.log(panelCols)
    console.log(panelContainer)

    panelCols.insertBefore(containerCopy, panelContainer);


    panelContainer.classList.add('hidden');
    save.parentElement.classList.add('hidden');
    add.parentElement.classList.remove('hidden');

    document.querySelector('.panel--next').style.opacity = '';

  });

  add.addEventListener('click', (e) => {
    e.preventDefault();
    if (document.querySelectorAll('.panel-container').length > 5) return;
    panelContainer.classList.remove('hidden');
    save.parentElement.classList.remove('hidden');
    add.parentElement.classList.add('hidden');

  });

})();