export default function info() {
  const infoLinks = document.querySelectorAll('.panel-info__info');
  if (infoLinks.length === 0) return;

  infoLinks.forEach(el => el.addEventListener('click', (e) => {
    e.preventDefault();
    el.parentElement.classList.toggle('panel-info--is-active');
  }));
  
}