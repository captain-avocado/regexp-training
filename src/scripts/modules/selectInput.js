export default function selectInput() {
  const selectInputs = document.querySelectorAll('.input-select');
  if (selectInputs.length === 0) return;

  //скролл дропдауна
  OverlayScrollbars(document.querySelectorAll('.dropdown-input__list'), {
    className: 'os-theme-dark',
    sizeAutoCapable: true,
    paddingAbsolute: true,
  });

  selectInputs.forEach(el => {
    if (el.classList.contains('not-active')) return;
    const dropdown = el.querySelector('.dropdown-input');
    const openLink = el.querySelector('.input-select__dropdown-open');
    const input = el.querySelector('.input-select__input');

    //появление/скрытие по стрелке
    function toggleDropdown() {
      dropdown.classList.toggle('dropdown-input--is-active');
      input.classList.toggle('input-select__input--is-active');
      openLink.classList.toggle('input-select__dropdown-open--is-active');
    }

    openLink.addEventListener('click', (e) => {
      e.preventDefault();
      toggleDropdown();
    });



    //выбор активного элемента
    function selectItem(item) {
      const prevActiveIcon = dropdown.querySelector('.dropdown-input__icon-active--is-active');
      if (prevActiveIcon !== null) {
        prevActiveIcon.classList.remove('dropdown-input__icon-active--is-active');
      }
      const icon = item.querySelector('.dropdown-input__icon-active');
      icon.classList.toggle('dropdown-input__icon-active--is-active');
      const text = item.innerText;
      input.value = text;
      toggleDropdown();
    }

    const dropdownItems = dropdown.querySelectorAll('.dropdown-input__word');
    dropdownItems.forEach(element => {
      element.addEventListener('click', () => { selectItem(element); });
    });

  });

}