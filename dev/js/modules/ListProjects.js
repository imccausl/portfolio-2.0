import fetch from './Fetch';
import toggleLoader from '../util/toggleLoader';

const ProjectsList = query => {
  const searchQuery =
    query ||
    'https://api.github.com/search/repositories?q=topic:portfolio+user:imccausl&sort=created';
  let hasData = false;
  let cache = [];

  function parseData(data) {
    const parsedData = data.items.map(project => {
      const {
        name, html_url, description, created_at, updated_at, homepage,
      } = project;
      const newObj = {
        name,
        html_url,
        description,
        created_at,
        updated_at,
        homepage,
      };

      return newObj;
    });

    return parsedData;
  }

  function makeProjectsView(currState) {
    const view = [];
    const iterator = 0;

    function parseTitle(title) {
      const temp = title.split('-');
      const newTitle = [];

      temp.forEach(word => {
        word = word.substr(0, 1).toUpperCase() + word.substr(1, word.length);
        newTitle.push(word);
      });

      return newTitle.join(' ');
    }

    currState.forEach(item => {
      const itemView = `<div class="portfolio--display text-center col-md-12">
                    <h4>${parseTitle(item.name)}</h4>
                    <img src="http://raw.githubusercontent.com/imccausl/${item.name}/master/screenshot.png" width="95%" height="95%">
                    <p class="portfolio--description text-center">${item.description}</p>
                    <a class="btn btn-default btn-sm" href="${item.html_url}" role="button">View Source</a> 
                    <a class="btn btn-default btn-sm ${item.homepage
    ? ''
    : 'disabled'}" href="${item.homepage}" role="button">View Project</a>
                    </div>`;

      view.push(itemView);
    });

    return view;
  }

  function numProjView(howMany) {
    let projects = 'Projects';

    if (cache.length === 1) {
      projects = 'Project';
    }

    return `Displaying <strong>${howMany}</strong> of ${cache.length} ${projects}`;
  }

  function searchData(searchQuery, model) {
    let searchModel = [],
      searchView = [];

    model = model || cache;

    if (hasData) {
      searchModel = model.filter((item, index) => item.name.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1);
      const howMany = searchModel.length;

      if (howMany === 0) {
        searchView[0] = `<br><br><h4 class="text-center" style="padding-bottom: 245px">Search query "${searchQuery}" returned no results...</h4>`;
      } else {
        searchView = makeProjectsView(searchModel);
      }

      render(searchView, '#project-view');
      render(numProjView(howMany), '#project-num-view');
    }
  }

  function sortData(model, property) {
    model = model || cache;
    property = property || 'created_at';

    if (hasData && model && property) {
      return model.sort((a, b) => {
        let date1 = new Date(a[property]),
          date2 = new Date(b[property]);

        if (date1 < date2) {
          return property === 'created_at' ? 1 : -1;
        } else if (date1 > date2) {
          return property === 'created_at' ? -1 : 1;
        }
        return 0;
      });
    }
  }

  function render(vw, anchor) {
    const anchorElem = document.querySelector(anchor);
    const view = vw.constructor === Array ? vw.join('') : vw;

    if (!anchorElem) {
      throw new Error('Anchor element passed to render() does not exist!');
    }

    anchorElem.innerHTML = view;
  }

  function setListeners() {
    const inputField = document.querySelector('#projects--search');
    const sortByCreated = document.querySelector('#projects--sort-created');
    const sortByUpdated = document.querySelector('#projects--sort-updated');

    inputField.addEventListener(
      'input',
      event => {
        const input = inputField.value;

        if (input.length > 0 && hasData) {
          searchData(input);
        } else {
          const view = makeProjectsView(cache);
          render(view, '#project-view');
          render(numProjView(view.length), '#project-num-view');
        }
      },
      true,
    );

    sortByCreated.addEventListener('click', sortHandler, true);
    sortByUpdated.addEventListener('click', sortHandler, true);

    function sortHandler(event) {
      console.log(event);
      const sortBy = event.target.dataset.property;
      const whichClicked = event.srcElement.id;
      let sortedModel = [],
        sortedView = [];

      if (whichClicked === 'projects--sort-created') {
        sortByCreated.classList.add('active');
        sortByUpdated.classList.remove('active');
      } else {
        sortByUpdated.classList.add('active');
        sortByCreated.classList.remove('active');
      }

      if (hasData) {
        sortedModel = sortData(cache, sortBy);
        sortedView = makeProjectsView(sortedModel);

        render(sortedView, '#project-view');
        render(numProjView(sortedModel.length), '#project-num-view');
      }
    }
  }

  // where the magic happens

  fetch(searchQuery)
    .then(response => {
      cache = parseData(JSON.parse(response));
      hasData = true;

      render(makeProjectsView(sortData(cache)), '#project-view');
      render(numProjView(cache.length), '#project-num-view');

      setListeners();
      window.scrollTo(0, 0);
      toggleLoader();
    })
    .catch(err => {
      console.log(err);
    });

  return {
    searchData,
    sortData,
  };
};

export default ProjectsList;
