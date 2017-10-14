function highlightActiveRoute(route) {
  const links = document.querySelectorAll('.nav--main ul li a');
  const activeRoute = document.querySelector(`[data-route='${route}']`);
  const { length } = links;

  for (let i = 0; i < length; i += 1) {
    links[i].classList.remove('active-route');
  }

  activeRoute.classList.add('active-route');
}

export default highlightActiveRoute;
