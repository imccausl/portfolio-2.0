function toggleLoader(loaderElement = 'loader', activateClass = 'is-active') {
  const DOMel = document.querySelector(`.${loaderElement}`);

  if (!DOMel) {
    console.warn("Loader element doesn't exist");
    return false;
  }

  DOMel.classList.toggle(activateClass);
}

export default toggleLoader;
