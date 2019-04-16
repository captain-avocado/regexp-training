export const initMenu = (id: string): void => {
  const navBar = document.getElementById(id);
  const anchors = document.anchors;
  const navBtns = navBar.querySelectorAll('.nav-bar__item');
  const navBtnsArray = Array.from(navBtns);

  navBtnsArray.forEach((item, num) => {
    item.addEventListener('click', () => {
      console.log('num', ': ', num);
      window.scrollTo({
        top: anchors[num].offsetTop,
        behavior: 'smooth',
      });
    });
  });
};
