function shrinkHeader() {
  const header = document.querySelector('.site-main');
  const hero = document.querySelector('.hero');
  const headerImage = document.querySelector('.image--bio');
  const headerContent = document.querySelector('.header--content');
  const navButton = document.querySelector('.nav-button');
  const mainView = document.querySelector('#main-view');
  const shrinkOn = 450;

  function handleScroll(event) {
    const distanceY = window.pageYOffset || document.documentElement.scrollTop;

    console.log(distanceY);

    if (distanceY > shrinkOn && !mainView.classList.contains('push-down-view')) {
      header.classList.add('fixed');
      header.children[0].classList.remove('container');

      headerContent.children[0].classList.remove('text--huge');
      headerContent.children[0].classList.add('text--big');
      headerContent.children[1].classList.add('hidden-xxs');
      headerContent.children[2].classList.remove('text-center');

      headerContent.children[2].classList.add('nav-button--show');

      headerContent.children[3].classList.remove('nav-main-padding--expanded');
      headerContent.children[3].classList.add('nav-main--reposition');

      headerContent.children[3].children[0].children[0].classList.remove('display-block');
      headerContent.children[3].children[0].children[1].classList.remove('display-block');
      headerContent.children[3].children[0].children[2].classList.remove('display-block');
      headerContent.children[3].children[0].children[3].classList.remove('display-block');
      headerContent.children[3].children[0].children[0].classList.add('display-inline-block');
      headerContent.children[3].children[0].children[1].classList.add('display-inline-block');
      headerContent.children[3].children[0].children[2].classList.add('display-inline-block');
      headerContent.children[3].children[0].children[3].classList.add('display-inline-block');

      hero.classList.remove('text-center');
      hero.classList.remove('center-content');
      hero.classList.remove('header--padding');
      hero.children[0].classList.add('float-left');

      headerImage.classList.remove('image--bio-normal');
      headerImage.classList.add('image--bio-small');

      mainView.classList.add('push-down-view');

      window.scrollTo(0, 460);
    } else if (distanceY < shrinkOn && mainView.classList.contains('push-down-view')) {
      mainView.classList.remove('push-down-view');
      header.classList.remove('fixed');
      header.children[0].classList.add('container');
      headerContent.children[0].classList.add('text--huge');
      headerContent.children[0].classList.remove('text--big');
      headerContent.children[1].classList.remove('hidden-xxs');
      headerContent.children[2].classList.remove('nav-button--show');

      headerContent.children[3].classList.add('text-center');
      headerContent.children[3].classList.remove('nav-main--reposition');
      headerContent.children[3].classList.add('nav-main-padding--expanded');

      headerContent.children[3].children[0].children[0].classList.add('display-block');
      headerContent.children[3].children[0].children[1].classList.add('display-block');
      headerContent.children[3].children[0].children[2].classList.add('display-block');
      headerContent.children[3].children[0].children[3].classList.add('display-block');
      headerContent.children[3].children[0].children[0].classList.remove('display-inline-block');
      headerContent.children[3].children[0].children[1].classList.remove('display-inline-block');
      headerContent.children[3].children[0].children[2].classList.remove('display-inline-block');
      headerContent.children[3].children[0].children[3].classList.remove('display-inline-block');

      hero.classList.add('text-center');
      hero.classList.add('center-content');
      hero.classList.add('header--padding');
      hero.children[0].classList.remove('float-left');
      headerImage.classList.add('image--bio-normal');
      headerImage.classList.remove('image--bio-small');
      window.scrollTo(0, 0);
    }
  }

  function handleNavButtonClick(event) {
    event.preventDefault();

    navButton.classList.toggle('open');
    headerContent.children[3].classList.toggle('nav-button--show');
  }

  window.addEventListener('scroll', handleScroll, false);
  navButton.addEventListener('click', handleNavButtonClick, false);
}

export default shrinkHeader;
