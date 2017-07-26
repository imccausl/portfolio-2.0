import Router from './modules/Router';
import ListProjects from './modules/ListProjects';

Router.config({mode:'history'});

Router.add(/about/,()=>{
  console.log("About");
  $.get('./dev/routes/about.html').done(data => $('#main-view').html(data));
})

.add(/projects/, ()=>{
  console.log("Projects");
  $.get('./dev/routes/projects.html').done(data => $('#main-view').html(data));
})

.add(/blog/, ()=>{
  console.log("Blog");
})

.check('/about').listen();