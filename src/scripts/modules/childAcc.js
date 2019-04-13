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

    children.forEach((child, i) => {
      const panelContainerClone = panelContainer.cloneNode(true);

      if (i === children.length - 1) {
        panelContainerClone.appendChild(add);
      }

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

  const setParentAddress = (check) => {
    const parentAddress = document.getElementById('address_reg').value;
    const childAddrInput = document.getElementById('child-adress_real');
    childAddrInput.value = (check) ? (parentAddress) : '';
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

  const childAddrCheckbox = document.getElementById('child-adress_ep');
  childAddrCheckbox.addEventListener('change', (e) => {
    console.log('hello')
    setParentAddress(childAddrCheckbox.checked);
  });

  save.addEventListener('click', addData);
  add.addEventListener('click', openTab);

})();