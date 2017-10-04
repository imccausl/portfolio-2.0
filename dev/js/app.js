/*
  TODO: Eventually create smaller, fixed header/nav menu when scroll exeeds the main header. (not a priority for this version).
  TODO: Configure webpack for cache-busting 
  TODO: Finish/clean up about page bio
  TODO: Add Firefox compatibility to click events on projects page
  TODO: Add one more column to about page highlighting OS experience (Linux, Mac, Windows/WSL)?
  TODO: Deploy to gh-pages!
*/
import Router from "./modules/Router";
import CodingTimeWidget from "./modules/CodingTimeWidget";
import ReadingList from "./modules/ReadingList";
import ListProjects from "./modules/ListProjects";
import attachTooltip from "./modules/attachTooltip";
import Fetch from "./modules/Fetch";
import key from "../api.key";

function isTouchDevice() {
  return /(iphone|ipod|ipad|android|iemobile|blackberry)/.test(
    window.navigator.userAgent.toLowerCase()
  );
}

// don't actually use this right now because I'm using hash mode for routing.
function setListeners() {
  const navLinks = document.getElementById("portfolio--nav");

  navLinks.addEventListener(
    "click",
    event => {
      const route = event.target.getAttribute("data-route");

      if (
        (history.pushState && route !== "/blog") ||
        Router.mode === "history"
      ) {
        // only use javascript click handler for links if 'history' mode is enabled for the router
        event.preventDefault();
        Router.navigate(route);
      }
    },
    true
  );
}

function initalizeRoutes() {
  let currentRoute = `/${Router.getFragment()}`;
  if (currentRoute === "/") {
    currentRoute = "/stats";
  }

  if (!Router.routes[0]) {
    // check if any routes exist
    Router.config({ mode: "hash" });

    Router.add(/stats/, () => {
      $("#main-view").load("routes/stats.html", () => {
        CodingTimeWidget($);
        ReadingList(Fetch, key);
      });
    })
      .add(/projects/, () => {
        $("#main-view").load("routes/projects.html", () => {
          ListProjects();
        });
      })
      .add(/resume/, () => {
        $("#main-view").load("routes/resume.html");
      })
      .add(/\*/, () => {
        Router.navigate("/stats");
      });
  }

  Router.navigate(currentRoute);
}

initalizeRoutes();
setListeners(); // use javascript  to handle site navigation unless browser doesn't support history API

if (!isTouchDevice()) {
  attachTooltip(".contact-bar");
}

Router.check().listen();
