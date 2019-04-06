import OverlayScrollbars from 'overlayscrollbars';
import infoTypes from './infoTypes';

export default function dropdownSearch() {
  //скролл дропдауна
  OverlayScrollbars(document.querySelectorAll('.dropdown-search__list'),{
    className       : 'os-theme-dark',
    sizeAutoCapable : true,
    paddingAbsolute : true,
  });





  //выбрать все инпуты и иконки-триггеры
  // const inputSearch = document.querySelectorAll('.inputs__input--search');
  const inputSearch = document.querySelectorAll('.select-input__input');
  const inputSearchIcon = document.querySelectorAll('.select-input__dropdown-open');

  // const inputSearchIcon = document.querySelectorAll('.inputs__dropdown-open');
  if (inputSearch === null) return;

  //скрите/появление дропдауна
  function toggleDropdown(e) {
    e.preventDefault();
    const dropdownSearch = e.currentTarget.parentElement.querySelector('.dropdown-search');
    const input = dropdownSearch.nextElementSibling;
    const openLink = input.nextElementSibling;

    // console.log(input)
    if (dropdownSearch.classList.contains('dropdown-search--is-active')) {
      closeActiveDropdowns();
    } else {
      closeActiveDropdowns();
      dropdownSearch.classList.add('dropdown-search--is-active');
      input.classList.add('select-input__input--is-active');
      openLink.classList.add('select-input__dropdown-open--is-active');
    }
  }

  function closeActiveDropdowns() {
    const prevActiveDropdowns = document.querySelectorAll('.dropdown-search--is-active');
    const prevActiveInputs = document.querySelectorAll('.select-input__input--is-active');
    const prevActiveLinks = document.querySelectorAll('.select-input__dropdown-open--is-active');
    
    if (prevActiveDropdowns !== null) {
      prevActiveDropdowns.forEach(el => el.classList.remove('dropdown-search--is-active'));
      prevActiveInputs.forEach(el => el.classList.remove('select-input__input--is-active'));
      prevActiveLinks.forEach(el => el.classList.remove('select-input__dropdown-open--is-active'));
    }
  }

  function openDropdown(e) {
    e.preventDefault();
    closeActiveDropdowns();
    const dropdownSearch = e.currentTarget.parentElement.querySelector('.dropdown-search');
    const input = dropdownSearch.nextElementSibling;
    const openLink = input.nextElementSibling;
    dropdownSearch.classList.add('dropdown-search--is-active');
    input.classList.add('select-input__input--is-active');
    openLink.classList.add('select-input__dropdown-open--is-active');
  }

  function closeDropdown(e) {
    if (e.target.closest('.dropdown-search') === null && !e.target.classList.contains('select-input__input') && !e.target.classList.contains('select-input__dropdown-open') && !e.target.classList.contains('select-input__dropdown-icon')) {
      closeActiveDropdowns();
    }
  }

  document.addEventListener('click', closeDropdown);
  inputSearch.forEach(el => el.addEventListener('focus', openDropdown));
  inputSearchIcon.forEach(el => el.addEventListener('click', toggleDropdown));


  

  //снять выделение с элемента
  function deselectActiveItem(item) {
    const dataItem = item.getAttribute('data-item');
    const dropdownSearch = item.closest('.select-input').querySelector('.dropdown-search');

    const dropdownSearchItem = dropdownSearch.querySelector(`[data-item="${dataItem}"`);
    dropdownSearchItem.querySelector('img').classList.remove('dropdown-search__icon-active--is-active');

    const itemsList = item.closest('.select-input').querySelector('.active-items');

    const activeItem = itemsList.querySelector(`[data-item="${dataItem}"`);
    if (activeItem !== null) {
      activeItem.parentElement.removeChild(activeItem);
    }
  }

  //создать активный элемент
  function createActiveItem(itemText, dataItem, dataType) {
    const item = document.createElement('li');
    item.classList.add('active-items__item');
    item.setAttribute('data-item', dataItem);

    const wrapper = document.createElement('div');
    wrapper.classList.add('active-items__wrapper');

    if (dataType === 'theme') {
      wrapper.classList.add('active-items__wrapper--theme');
      const text = document.createElement('span');
      text.classList.add('active-items__text');
      text.innerText = itemText;
      wrapper.appendChild(text);
  
      const icon = document.createElement('img');
      icon.classList.add('active-items__icon-remove');
      icon.src = 'images/content/icon-remove.svg';
      wrapper.appendChild(icon);
    }

    if (dataType === 'lead') {
      item.classList.add('active-items__item--lead');

      wrapper.innerHTML = `
        <div class="active-items__row">
          <div class="active-items__avatar"></div>
          <div class="active-items__name"></div>
          <img src="images/content/icon-remove.svg" alt="icon-remove" class="active-items__icon-remove">
        </div>
        <div class="active-items__row">
          <div class="active-items__text">Обязанности</div>
          <div class="active-items__info-types info-types">
            <div class="info-types__type info-types__type--is-active">ведущий</div>
            <div class="info-types__type">ассистент</div>
          </div>
        </div>
        <div class="active-items__row">
          <div class="active-items__input">
          <div class="select-input">
          <div class="dropdown-search">
              <div class="dropdown-search__wrapper">
                <ul class="dropdown-search__list">
                  <li class="dropdown-search__item dropdown-search__item--lead">
                    <div class="dropdown-search__word" data-item="author11" data-type="lead">Ответы на вопросы по теории
                      <img src="images/content/icon-active.svg" alt="icon-active" class="dropdown-search__icon-active">
                    </div>
                  </li>
                  <li class="dropdown-search__item dropdown-search__item--lead">
                    <div class="dropdown-search__word" data-item="author21" data-type="lead">Ответы на вопросы по теории
                      <img src="images/content/icon-active.svg" alt="icon-active" class="dropdown-search__icon-active">
                    </div>
                  </li>
                  <li class="dropdown-search__item dropdown-search__item--lead">
                    <div class="dropdown-search__word" data-item="author31" data-type="lead">Ответы на вопросы по теории
                      <img src="images/content/icon-active.svg" alt="icon-active" class="dropdown-search__icon-active">
                    </div>
                  </li>
                  <li class="dropdown-search__item dropdown-search__item--lead">
                      <div class="dropdown-search__word" data-item="author41" data-type="lead">Ответы на вопросы по теории
                        <img src="images/content/icon-active.svg" alt="icon-active" class="dropdown-search__icon-active">
                      </div>
                    </li> 
                    <li class="dropdown-search__item dropdown-search__item--lead">
                        <div class="dropdown-search__word" data-item="author51" data-type="lead">Ответы на вопросы по теории
                          <img src="images/content/icon-active.svg" alt="icon-active" class="dropdown-search__icon-active">
                        </div>
                      </li> 
                      <li class="dropdown-search__item dropdown-search__item--lead">
                          <div class="dropdown-search__word" data-item="author61" data-type="lead">Ответы на вопросы по теории
                            <img src="images/content/icon-active.svg" alt="icon-active" class="dropdown-search__icon-active">
                          </div>
                        </li>                                      
                </ul>
              </div>
          </div>
        <input type="text" class="select-input__input select-input__input--lead-one">
        <a href="#" class="select-input__dropdown-open">
          <img src="images/content/angle-search.svg" alt="open-dropdown" class="select-input__dropdown-icon">
        </a>
      </div>
          </div>
        </div>
      `;

    }

    item.appendChild(wrapper);
    const icon = item.querySelector('.active-items__icon-remove');
    icon.addEventListener('click', () => { deselectActiveItem(item); });
    const name = item.querySelector('.active-items__name');
    if (name !== null)
      name.innerText = itemText;
    
    return item;
  }

  //присоединить элемент к списку активных элементов
  function appendActiveItem(item, itemList) {   
    if (itemList.querySelector(`[data-item="${item.getAttribute('data-item')}"`) !== null) return;
    itemList.appendChild(item);
  }

  //выбрать элемент
  function selectDropdownItem(el) {
    const icon = el.querySelector('.dropdown-search__icon-active');
    icon.classList.toggle('dropdown-search__icon-active--is-active');
    if (icon.classList.contains('dropdown-search__icon-active--is-active')) {
      const text = el.innerText;
      const item = createActiveItem(text, el.getAttribute('data-item'), el.getAttribute('data-type'));
      const itemList = el.closest('.select-input').querySelector('.active-items');
      appendActiveItem(item, itemList);

      infoTypes();
    } else {
      deselectActiveItem(el);
    }
  }

  const items = document.querySelectorAll('.dropdown-search__word');
  items.forEach(el => el.addEventListener('click', () => { selectDropdownItem(el); }));



}