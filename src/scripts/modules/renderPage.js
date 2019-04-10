// (function renderPage() {

//   const widgets = document.querySelectorAll('.ajax-widget');
//   if (widgets.length === 0) return;
//   const render = new Event('render');
//   let page = 'personal';

//   document.addEventListener('render', () => {
//     widgets.forEach(el => {
//       if (el.classList.contains(`widget-${page}`)) {
//         el.style.display = '';
//         el.classList.add('widget-visible');
//       } else {
//         el.style.display = 'none';
//         if (el.classList.contains('widget-visible')) {
//           el.classList.remove('widget-visible');
//         }
//       }
//     });

//     const cols = document.querySelectorAll('.panels__col');
//     cols.forEach(col => {
//       const widgetVisible = col.querySelectorAll('.widget-visible');
//       if (widgetVisible.length !== 0) {
//         widgetVisible.forEach((widget, i) => {
//           if (i === widgetVisible.length - 1) {
//             widget.style.marginBottom = 0;
//           } else {
//             widget.style.marginBottom = '';
//           }
//         })
//       }
//     });
//   });

//   const menuLinks = document.querySelectorAll('.menu-panel__link');
//   menuLinks.forEach(el => el.addEventListener('click', (e) => {
//     e.preventDefault();
//     document.querySelector('.menu-panel__link--is-active').classList.remove('menu-panel__link--is-active');
//     el.classList.add('menu-panel__link--is-active');
//     page = el.getAttribute('data-page');
//     document.dispatchEvent(render);
//   }));

//   document.dispatchEvent(render);
// })();

// export default renderPage;
