function loadWidget($) { 
  function getLanguages($) {
    $.ajax({
      type: 'GET',
      url: 'https://wakatime.com/share/@94ed6818-5129-4943-88f0-e9d705025e66/27145066-d578-4ee2-b668-8fb29885c9bd.json',
      dataType: 'jsonp',
      
      success: function(response) {;
        let languages = [];
        // when call is successful, create array of languages...
        languages = response.data.map((language, index)=>{
          return // ... then remove undefined/unknown from the array and return it.
        });
      },
    });
  }

  function getCodingTime($) {
    $.ajax({
      type: 'GET',
      url: 'https://wakatime.com/share/@94ed6818-5129-4943-88f0-e9d705025e66/27145066-d578-4ee2-b668-8fb29885c9bd.json',
      dataType: 'jsonp',
      success: function(response) {;
        console.log(response.data);
        // separate out the valid hours and minutes
        // then reduce it to a single value and return it.
      },
    })
  }

  getCodingTime();
  getLanguages();

  return {
    
  }
}

export default loadWidget;