export default (function childAcc() {
  const panelContainer = document.querySelector('.panels__container--child.panels__container--is-active');
  if (panelContainer === null) return;
  const save = panelContainer.querySelector('#save');
  const add = panelContainer.querySelector('#add').parentElement;
  panelContainer.removeChild(add);

  let children = [
    {
      childF: 1,
      childI: 2,
      childO: 3,
      childDOB: 4,
      childAddressReal: 3,
      childAddressEp: true,
      childCommandName: 1,
      childCommandYear: 3,
      childCommandCoach: 1,
    },
  ];


  function updateData(children) {
    let panelContainerNotActive = document.querySelectorAll('.panels__container--child');

    panelContainerNotActive = Array.from(panelContainerNotActive).filter(el => !el.classList.contains('panels__container--is-active'));

    if (panelContainerNotActive.length !== 0) {
      panelContainerNotActive.forEach((el) => {
        el.parentElement.removeChild(el)
      });
    }

    // save.parentElement.parentElement.removeChild(save.parentElement);
    children.forEach((child, i) => {
      const panelContainerClone = panelContainer.cloneNode(true);
      // parentElementClone.removeChild(add.parentElement);
      // parentElementClone.removeChild(save.parentElement);

      if (i === children.length - 1) {
        panelContainerClone.appendChild(add);
        // panelContainerClone.querySelector('.add').parentElement.classList.remove('hidden');
      }
      // } else {
      //   panelContainerClone.querySelector('.add').parentElement.classList.add('hidden');
      // }
      panelContainerClone.classList.remove('panels__container--is-active');
      panelContainerClone.querySelector('.save').parentElement.classList.add('hidden');

      const inputs = panelContainerClone.querySelectorAll('input');
      inputs.forEach(input => {
        if (input.type === 'text') input.value = child[input.name];
        if (input.type === 'checkbox') input.checked = child[input.name];
        input.style.borderColor = '#CFCFD7';
        input.setAttribute('disabled', 'true');
      });
      panelContainer.parentElement.insertBefore(panelContainerClone, panelContainer);
    });

    panelContainer.classList.add('hidden');
  }

  function validateData() {
    const inputs = panelContainer.querySelectorAll('input');
    let valid = true;
    inputs.forEach(input => {
      if (input.type === 'text') {
        if (input.value === '' || input.value.length < 1) {
          valid = false;
          return;
        }
      }
    });
    return valid;
  }

  function addData(e) {
    e.preventDefault();
    // if (!validateData()) return;
    const inputs = panelContainer.querySelectorAll('input');
    const child = {};
    inputs.forEach(input => {
      if (input.type === 'text') {
        child[input.name] = input.value;
        // input.value = '';
      }
      if (input.type === 'checkbox') {
        child[input.name] = input.checked;
        // input.checked = false;
      }
    });
    children.push(child);
    updateData(children);
  }

  function openTab() {
    panelContainer.classList.remove('hidden');
    add.parentElement.removeChild(add);
  }

  updateData(children);

  save.addEventListener('click', addData);
  add.addEventListener('click', openTab);

})();