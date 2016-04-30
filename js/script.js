var temp = '';

function toCelsius(fahrenheit) {
  return Math.floor(0.55 * (fahrenheit - 32));
}

function toFahrenheit(celsius) {
  return Math.floor((celsius * 1.8) + 32);
}

function fetchWeather() {
  $.getJSON('http://ipinfo.io', function(data) {
    var userZip = data.postal;
    $('#myZip').html(userZip);
    $.getJSON('http://api.openweathermap.org/data/2.5/weather?zip=' + userZip + '&units=imperial&APPID=1d85bfdf5c6a1fbb8f41feeec23eee84&&callback=?', function(info) {
      $('#userLoc').html(info.name + ", " + info.sys.country);
      var weatherDesc = info.weather[0].main;
      if (weatherDesc === 'Clouds') {
        $("body").css('background-image', 'url("https://pixabay.com/static/uploads/photo/2013/10/13/00/08/clouds-194840_960_720.jpg")');
      }
      if (weatherDesc === 'Fog') {
        $("body").css('background-image', 'url("https://pixabay.com/static/uploads/photo/2013/01/30/20/44/sunbeam-76825_960_720.jpg")');
      }
      if (weatherDesc === 'Rain') {
        $("body").css('background-image', 'url("https://pixabay.com/static/uploads/photo/2013/06/07/15/34/rain-122691_960_720.jpg")');
      }
      if (weatherDesc === 'Snow') {
        $("body").css('background-image', 'url("https://pixabay.com/static/uploads/photo/2014/02/07/10/19/winter-260817_960_720.jpg")');
      }
      if (weatherDesc === 'Thunderstorm') {
        $("body").css('background-image', 'url("https://pixabay.com/static/uploads/photo/2014/06/26/22/02/lightning-378069_960_720.jpg")');
      }
      else if (weatherDesc === 'Clear sky') {
        $("body").css('background-image', 'url("https://pixabay.com/static/uploads/photo/2014/10/03/16/53/refreshing-471950_960_720.jpg")');
      }

      temp = Math.floor(info.main.temp);
      if (info.sys.country !== 'US') {
        temp = toCelsius(temp);
        $('#changeTemp').append('Fahrenheit');
        $('#tempLetter').append('C°');
      } else {
        $('#changeTemp').append('Celsius');
        $('#tempLetter').append('F°');
        $('#temperature').html(temp);
      }
      temp = $('#temperature').html(temp).text();
    });
  })
}

$(document).ready(function() {
  fetchWeather();
  $("#changeTemp").on('click', function() {
    if ($(this).text() == 'Fahrenheit') {
      $('#temperature').html(temp);
      $(this).text('Celsius');
      $('#tempLetter').text('F°');
    } else if ($(this).text() == 'Celsius') {
      $('#temperature').html(toCelsius(temp));
      $(this).text('Fahrenheit');
      $('#tempLetter').text('C°');
    }
  })
});