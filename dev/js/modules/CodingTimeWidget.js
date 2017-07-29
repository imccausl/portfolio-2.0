function CodingData($) { 
  function parseLangDisplay(data) {
    let output = "";

    data.forEach((language, index) => {
      if (index === data.length - 1) {
        output = output.concat(" and ", `<span class="text--salient">${language}</span>`)
      } else {
        output = output.concat(`<span class="text--salient">${language}</span>`, ", ");
      }
    });

    return output;
  }

  function parseTimeDisplay(data) {
    let time = `<span class="text--salient">${data.hours} hours</span> and <span class="text--salient">${data.minutes} minutes</span>.`;

    if (data.hours === 1) {
      time.replace("hours", "hour");
    }

    if (data.minutes === 1) {
      time.replace("minutes", "minute");
    }

    return time;
  }

  function displayLangs(data, view) {
    $(view).html(`In the last 7 days I have been working with ${data}`);
  }

  function displayTime(data, view) {
    $(view).html(`for a total of ${data}`);  
  }

  const getLanguages = $.ajax({
      type: 'GET',
      url: 'https://wakatime.com/share/@imccausl/aeba19b1-422b-4f7b-917d-af952fd01315.json',
      dataType: 'jsonp',
    });

  const getCodingTime = $.ajax({
     type: 'GET',
     url: 'https://wakatime.com/share/@imccausl/e72d3d26-36fb-47e9-89ef-6f831dc89d8c.json',
     dataType: 'jsonp',
  });
  
  getLanguages.then(response => displayLangs(parseLangDisplay(response.data.map(language => language.name).filter(item => item !== 'Other')), "#coding-widget--langs"));
  
  getCodingTime.then(response => {
    function parseTime(data) {
      return data.map(time => time.grand_total.total_seconds).reduce((acc, prev, curr) => acc + prev);
    }

    let totalSeconds = parseTime(response.data);
    let hours = Math.floor((totalSeconds / 60) / 60);
    let minutes = Math.floor((totalSeconds / 60) - (hours * 60));

    return parseTimeDisplay({hours, minutes});
  }).then(response=>displayTime(response, "#coding-widget--time"));
}

export default CodingData;
