const ListProjects = (query) => {
  const searchQuery = query || "https://api.github.com/search/repositories?q=topic:portfolio+user:imccausl";
  let searchData = [];
  let state = [];

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

  getData().then(response => {
    state = response;
    searchData = parseData(state);
    console.log(searchData);
  }) 
  .catch(err => {
    console.log(err);
  });


};

export default ListProjects;
