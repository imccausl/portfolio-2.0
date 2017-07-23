function CodingData($) { 
  function parseLangDisplay(data) {
    let output = "";

    data.forEach((language, index) => {
      if (index === data.length - 1) {
        output = output.concat(" and ", language)
      } else {
        output = output.concat(language, ", ");
      }
    });

    return output;
  }

  function parseTimeDisplay(data) {
    let time = `${data.hours} hours and ${data.minutes} minutes.`;

    if (data.hours === 1) {
      time.replace("hours", "hour");
    }

    if (data.minutes === 1) {
      time.replace("minutes", "minute");
    }

    return time;
  }

  function displayLangs(data, view) {
    $(view).append(`This week I have been working with ${data}`);
  }

  function displayTime(data, view) {
    $(view).append(`for a total of ${data}`);  
  }

  const getLanguages = $.ajax({
      type: 'GET',
      url: 'https://wakatime.com/share/@94ed6818-5129-4943-88f0-e9d705025e66/27145066-d578-4ee2-b668-8fb29885c9bd.json',
      dataType: 'jsonp',
    });

  const getCodingTime = $.ajax({
     type: 'GET',
     url: 'https://wakatime.com/share/@94ed6818-5129-4943-88f0-e9d705025e66/a49c0fe1-0842-4725-ad66-19337998a77c.json',
     dataType: 'jsonp',
  });
  
  getLanguages.done(response => displayLangs(parseLangDisplay(response.data.map(language => language.name).filter(item => item !== 'Other')), "#coding-widget--langs"));
  
  getCodingTime.then(response => {
    function parseTime(data, unit) {
      return data.map(time => time.grand_total[unit]).reduce((acc, prev, curr) => acc + prev);
    }

    let codingHours = parseTime(response.data, 'hours');
    let codingMinutes = parseTime(response.data, 'minutes');
        
    return parseTimeDisplay({hours: codingHours + Math.floor(codingMinutes / 60), minutes: codingMinutes % 60});
  }).then(response=>displayTime(response, "#coding-widget--time"));
} 

export default CodingData;