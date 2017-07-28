const Fetch = (uri, type, noCORS) => {
  if(noCORS) {
    // Get around CORS by using yahoo's YQL api
    return $.get("http://query.yahooapis.com/v1/public/yql",
    {
        q: `select * from ${type} where url='${uri}'`,
        format: `'${type}'`
    },
    function(response){
      return response;
    });
  } else {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.status === 200) {
          resolve(xhr.responseText)
        } else {
          reject(xhr.statusText);
        }
      };
      xhr.open("GET", uri, true);
      xhr.send();
    });
  }
}

export default Fetch;
