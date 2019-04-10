class Anketa {

  static getActivePage() {
    return document.querySelector('.page:not(.disabled)');
  }

  static setActivePage(id) {
    //console.log( getActivePage() );
    // if (id == 'page-submit')
    //   Anketa.trySubmit();
    // else
    document.querySelectorAll('.page').forEach((el) => {
      if (el.id == id)
        el.classList.remove('disabled');    //hard display: none !important
      else
        el.classList.add('disabled');
    });
    return Anketa;
  }

  static setup() {
    Anketa.setActivePage('default');
    document.querySelectorAll('.btn-pagenav').forEach((btn) => {
      btn.addEventListener('click', (ev) => {
        ev.preventDefault();
        let btn = ev.target;
        let direction = btn.getAttribute('data-direction');
        let chosen_id = btn.getAttribute('data-pageid');

        Anketa.setActivePage(chosen_id);
        // if (chosen_id == 'page-submit')
        //   Anketa.setActivePage('page-submit');

        // console.log(
        //   Input.on(btn.closest('.page')).allVisibleControls()
        //     .reduce((values, control) => values[control.id] = control.currentValue, {}));

        // let okay_boss
        //   = () => Anketa.setActivePage(chosen_id);
        // let rollup_sucks
        //   = () => Input.on(btn.closest('.page')).firstControlHavingNoHiddenParentsAnd('.alert')
        //     .scrollIntoCenter();

        // direction == 'forward' ?
        //   Input.on(btn.closest('.page')).allVisibleControls()
        //     .map(control => control.passedValidation())
        //     .every(field => field === true)
        //     ? okay_boss() : rollup_sucks() : okay_boss();

      });
    });
    return Anketa;
  }

}

export default Anketa;