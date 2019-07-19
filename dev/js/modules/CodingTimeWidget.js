import isLocalStorageAvailable, { saveToLocalStorage } from '../util/localStorage';

function CodingData($) {
  const CODING_TIME = 'codingTime';
  const CODING_LANGS = 'codingLangs';
  const CODING_TIME_VIEW = '#coding-widget--time';
  const CODING_LANGS_VIEW = '#coding-widget--langs';

  let codingTime;
  let codingLangs;

  function parseLangDisplay(data) {
    let output = '';

    data.forEach((language, index) => {
      output = output.concat(`<span class="text--salient">${language}</span>`);

      if (data.length > 1) {
        if (index === (data.length - 2)) {
          output = output.concat(' and ');
        } else if (index < (data.length - 2)) {
          output = output.concat(', ');
        }
      }
    });

    return output;
  }

  function parseTimeDisplay(data) {
    const time = `<span class="text--salient">${data.hours} hours</span> and <span class="text--salient">${data.minutes} minutes</span>.`;

    if (data.hours === 1) {
      time.replace('hours', 'hour');
    }

    if (data.minutes === 1) {
      time.replace('minutes', 'minute');
    }

    return time;
  }

  function displayLangs(data, view) {
    $(view).html(`In the last 7 days I have been working with ${data}`);
    saveToLocalStorage(CODING_LANGS, data, codingLangs);
  }

  function displayTime(data, view) {
    $(view).html(`for a total of ${data}`);
    saveToLocalStorage(CODING_TIME, data, codingTime);
  }

  const getLanguages = $.ajax({
    type: 'GET',
    url: 'https://wakatime.com/share/@imccausland/26167dd8-62a8-41a1-b20e-99a25285cd8b.json',
    dataType: 'jsonp',
  });

  const getCodingTime = $.ajax({
    type: 'GET',
    url: 'https://wakatime.com/share/@imccausland/50e9c40d-2a2f-4942-a5a2-e13ef9628c0c.json',
    dataType: 'jsonp',
  });

  // module exection begins here.
  if (isLocalStorageAvailable()) {
    codingTime = localStorage.getItem(CODING_TIME);
    codingLangs = localStorage.getItem(CODING_LANGS);

    if (codingTime && codingLangs) {
      displayLangs(codingLangs, CODING_LANGS_VIEW);
      displayTime(codingTime, CODING_TIME_VIEW);
    }
  }

  getLanguages.then(response =>
    displayLangs(
      parseLangDisplay(response.data.map(language => language.name).filter(item => {
        if (!((item === 'Other') || (item === 'INI') || (item === 'Text'))) {
          return item;
        }
      })),
      CODING_LANGS_VIEW,
    ));

  getCodingTime
    .then(response => {
      function parseTime(data) {
        return data
          .map(time => time.grand_total.total_seconds)
          .reduce((acc, curr) => acc + curr);
      }

      const totalSeconds = parseTime(response.data);
      const hours = Math.floor(totalSeconds / 60 / 60);
      const minutes = Math.floor(totalSeconds / 60 - hours * 60);

      return parseTimeDisplay({ hours, minutes });
    })
    .then(response => displayTime(response, CODING_TIME_VIEW));
}

export default CodingData;
