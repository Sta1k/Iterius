
APP
  .filter('timing', function () {
    return function (num) {
      var h = Math.floor(num / 3600);
      var m = Math.floor(num / 60) % 60;
      var s = num % 60;
      if (h < 10)
        h = '0' + h;
      if (m < 10)
        m = '0' + m;
      if (s < 10)
        s = '0' + s;
      out = '<div class="hour" >'+h+'<p>час.</p>'+
        '</div> : <div class="hour">' + m +'<p>мин.</p>'+
        '</div> : <div class="hour">' + s+'<p>сек.</p></div>';
      return out;
    }
  });

APP
  .filter('upperTiming', function () {
    return function (num) {
      var h = Math.floor(num / 3600);
      var m = Math.floor(num / 60) % 60;
      var s = num % 60;
      if (h < 10)
        h = '0' + h;
      if (m < 10)
        m = '0' + m;
      if (s < 10)
        s = '0' + s;
      out = '<div class="upperhour" >'+h+
        '</div> : <div class="upperhour">' + m +
        '</div> : <div class="upperhour">' + s+'</div>';
      return out;
    }
  });
