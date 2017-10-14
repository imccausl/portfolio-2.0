function shrinkHeader() {
  const header = document.querySelector(".site-main");
  const hero = document.querySelector(".hero");
  const headerImage = document.querySelector(".image--bio");
  const headerText = document.querySelector(".header--text");
  const shrinkOn = 120;

  function handleScroll(event) {
    const distanceY = window.pageYOffset || document.documentElement.scrollTop;
    console.dir(hero);
    console.log(headerText.children[0]);
    if (distanceY > shrinkOn) {
      header.classList.add("fixed");
      header.children[0].classList.remove("container");
      headerText.children[0].classList.remove("text--huge");
      headerText.children[0].classList.add("text--big");
      hero.classList.remove("text-center");
      hero.classList.remove("center-content");
      hero.classList.remove("header--padding");
      hero.children[0].classList.add("float-left");
      headerImage.classList.remove("image--bio-normal");
      headerImage.classList.add("image--bio-small");
    } else {
      if (header.classList.contains("fixed")) {
        header.classList.remove("fixed");
        header.children[0].classList.add("container");
        headerText.children[0].classList.add("text--huge");
        headerText.children[0].classList.remove("text--big");
        hero.classList.add("text-center");
        hero.classList.add("center-content");
        hero.classList.add("header--padding");
        hero.children[0].classList.remove("float-left");
        headerImage.classList.add("image--bio-normal");
        headerImage.classList.remove("image--bio-small");
      }
    }
  }

  window.addEventListener("scroll", handleScroll, false);
}

export default shrinkHeader;
