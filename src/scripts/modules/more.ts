export const initMoreBtn = (id: string) => {
  const toTopBtn = document.getElementById(id);
  const anchor = document.anchors[0];
  toTopBtn.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({
      top: anchor.offsetTop,
      behavior: 'smooth',
    });
  });
};
