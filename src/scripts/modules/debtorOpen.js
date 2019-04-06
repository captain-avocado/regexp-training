export default function debtorOpen() {
  const debtors = document.querySelectorAll('.debtor');
  if (debtors.length === 0) return;

  function toggleDebtor(el) {
    const content = el.querySelector('.debtor__content');
    if (el.classList.contains('debtor--child')) {
      // content.classList.toggle('debtor__content--child-is-active');

      if (content.classList.contains('debtor__content--child-is-active')) {
        content.classList.remove('debtor__content--child-is-active');
      } else {
        const prevActiveChild = el.parentElement.querySelector('.debtor--is-active');
        if (prevActiveChild !== null && prevActiveChild !== el) {
          console.log(prevActiveChild)
          prevActiveChild.classList.remove('debtor--is-active');
          prevActiveChild.querySelector('.debtor__content').classList.remove('debtor__content--child-is-active');
        }
        content.classList.add('debtor__content--child-is-active');
      }

      


    } else {
      content.classList.toggle('debtor__content--is-active');
    }
    el.classList.toggle('debtor--is-active');

  }

  debtors.forEach(el => {
    const trigger = el.querySelector('.debtor__trigger');
    trigger.addEventListener('click', (e) => { e.preventDefault(); toggleDebtor(el); });
  });
}