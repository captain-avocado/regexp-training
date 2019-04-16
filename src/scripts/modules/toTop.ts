export const initToTop = (id: string) => {
  const toTopBtn = document.getElementById(id);
  toTopBtn.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
};
