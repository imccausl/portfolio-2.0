function collapseNav() {
  const navButton = document.querySelector('.nav-button');
  const headerContent = document.querySelector('.header--content');
  const hero = document.querySelector('.hero');

  hero.classList.add('force-transition');
  navButton.classList.remove('open');
  headerContent.children[3].classList.remove('nav-menu--show');
  hero.classList.remove('hero--full-screen');

  setTimeout(() => {
    hero.classList.remove('force-transition');
  }, 100);
}

export default collapseNav;
