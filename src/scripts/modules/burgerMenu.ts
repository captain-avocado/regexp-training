export const initBurgerMenu = (id: string): void => {
  const burgerLink = document.getElementById(id);
  const dropdown = burgerLink.parentElement.querySelector('.dropdown');
  const dropdownTrigger = dropdown.querySelector('.dropdown__trigger');

  const dropdownBtns = dropdown.querySelectorAll('.dropdown-menu__item');
  const anchors = document.anchors;

  const triggers = [burgerLink, dropdownTrigger];
  triggers.forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      dropdown.classList.toggle('hidden');
    });
  });
  
  dropdownBtns.forEach((item, num) => {
    item.addEventListener('click', () => {
      console.log('num', ': ', num);
      window.scrollTo({
        top: anchors[num].offsetTop - 95,
        behavior: 'smooth',
      });
    });
  })

};
