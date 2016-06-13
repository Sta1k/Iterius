
APP
  .filter('timing', function () {
    return function (num) {
      var h = Math.floor(num / 3600);
      var m = Math.floor(num / 60) % 60;
      var s = num % 60;
      if (m < 10)
        m = '0' + m;
      if (s < 10)
        s = '0' + s;
      out = h + ' : ' + m + ' : ' + s;
      return out;
    }
  });
