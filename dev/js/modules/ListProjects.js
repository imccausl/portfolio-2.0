const ProjectsList = (query) => {
  const searchQuery = query || "https://api.github.com/search/repositories?q=topic:portfolio+user:imccausl";
  let hasData = false;
  let cache = [];
  let state = [];
  let view = [];

  function getData() {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();
      req.open("GET", searchQuery, true);
      req.onload = () => resolve(JSON.parse(req.responseText));
      req.onerror = () => reject(req.statusText);
      req.send();
    });
  }

  function parseData(data) {
    let parsedData = data.items.map(project => {
      let {name, html_url, description, created_at, updated_at, homepage} = project;
      let newObj = {};

      newObj = {
        name,
        html_url,
        description,
        created_at,
        updated_at,
        homepage
      }

      return newObj;
    });

    return parsedData;
  }

  function makeView(currState) {
    let view = [];
    let iterator = 0;

    function parseTitle(title) {
      let temp = title.split("-");
      let newTitle = [];

      temp.forEach(word => {
        word = word.substr(0,1).toUpperCase() + word.substr(1,word.length);
        newTitle.push(word);
      });

      return newTitle.join(" ");
    }

    currState.forEach(item => {
      let itemView = "";

      itemView = `<div class="portfolio--display text-center col-md-12">
                    <h4>${parseTitle(item.name)}</h4>
                    <img src="http://raw.githubusercontent.com/imccausl/${item.name}/master/screenshot.png" width="95%" height="95%">
                    <p class="portfolio--description text-center">${item.description}</p>
                    <a class="btn btn-default btn-sm" href="${item.html_url}" role="button">View Source</a> 
                    <a class="btn btn-default btn-sm ${(item.homepage) ? "" : "disabled"}" href="${item.homepage}" role="button">View Project</a>
                  </div>`

      view.push(itemView);
    });

    return view;
  }

  function searchData(searchQuery, model) {
    let searchModel = [],
        searchView = [];

    model = model || cache;

    if (hasData) {
      searchModel = model.filter((item, index) => {
        console.log(searchQuery.toLowerCase(), (item.name.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1));
        return item.name.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1;
      });
     
      if (searchModel.length === 0) {
        searchView[0] = `<h4 class="text-center">Search query "${searchQuery}" returned no results...</h4>`;
      } else {
        searchView = makeView(searchModel);
      }

      render(searchView, "#project-view");
    }
  }

  function sortData(model) {

  }

  function render(vw, anchor) {
    let anchorElem = document.querySelector(anchor);

    anchorElem.innerHTML = vw.join("");
  }

  getData().then(response => {
    cache = parseData(response);
    hasData = true;
    
    view = makeView(cache);
    render(view, '#project-view');

    console.log("Data loaded:", hasData);
    setListener();    
  }) 
  .catch(err => {
    console.log(err);
  });

  function setListener() {
    const inputField = document.querySelector("#projects--search");
    console.log(inputField);

    inputField.addEventListener("input", (event)=>{
      let input = inputField.value;

      console.log(inputField.value);

      if (input.length > 0 && hasData) {
        searchData(input);
      } else {
        let view = makeView(cache);
        render(view, "#project-view");
      }
    }, true);
  }

  return {
    searchData,
  }

};