/*
  TODO: Refactor some view rendering code for less repetition.
  TODO: Eventually create smaller, fixed header/nav menu when scroll exeeds the main header. (not a priority for this version).
  TODO: Configure webpack for cache-busting 
  TODO: Finish/clean up about page bio
  TODO: Remove phone number and address from displayed resume
  TODO: Add Firefox compatibility to click events on projects page
  TODO: Add number of projects to search/sort area (including, when searching, number of projects returned from search out of total number of projects)
  TODO: Add one more column to about page highlighting OS experience (Linux, Mac, Windows/WSL)?
  TODO: Deploy to gh-pages!
*/
import Router from './modules/Router';
import CodingTimeWidget from './modules/CodingTimeWidget';
import ReadingList from './modules/ReadingList';
import ListProjects from './modules/ListProjects';
import Fetch from './modules/Fetch';
import key from '../../dist/api.key';

Router.config({mode:'history'});

Router.add(/about/,()=>{
  $('#main-view').load('dev/routes/about.html', ()=>{
    CodingTimeWidget($);
    ReadingList(Fetch, key);
  })
})

.add(/projects/, ()=>{
  $('#main-view').load('dev/routes/projects.html', ()=>{
    ListProjects();
  });
})

.add(/blog/, ()=>{
  console.log("Blog");
})

.check(Router.getFragment()).listen();