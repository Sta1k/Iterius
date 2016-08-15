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
            out = '<div  class="hour">' + h + '<p>hrs.</p>' +
                '</div> : <div class="hour">' + m + '<p>min.</p>' +
                '</div> : <div class="hour">' + s + '<p>sec.</p></div>';
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
            out = h + ':' + m + ':' + s;
            return out;
        }
    });

APP
    .filter('bigTiming', function () {
        return function (num) {
            if (!num) {
                return 'not working'
            }
            var b = num * 1000;
            var a = new Date(b);
            var h = a.getHours();
            var m = a.getMinutes();
            if (h < 10)
                h = '0' + h;
            if (m < 10)
                m = '0' + m;
            out = h + ':' + m;
            return 'began to work: ' + out;
        }
    });
APP
    .filter('statTime', function () {
        return function (num) {
            if (num == 0) {
                return '0:00'
            }
            var b = num * 1000;

            var a = new Date(b);
            var h = a.getHours();
            var m = a.getMinutes();
            if (h < 10)
                h = '0' + h;
            if (m < 10)
                m = '0' + m;
            out = h + ':' + m;
            return out;

        }
    });
APP
    .filter('statSumTime', function () {
        return function (num) {
            if(num<0){
                num=num*-1
            }
            if (!num) {
                return '0:00'
            }
            //var b = num * 1000;

            var h = Math.floor(num / 3600);
            var m = Math.floor(num / 60) % 60;
            if (m < 10 && m > 0)
                m = '0' + m;
            out = h + ':' + m;
            return out;

        }
    });
APP
    .filter('sliceString', function () {
        return function (num) {
            var out;
            if (num.length < 17) {
                out = num
            } else {
                out = num.substring(0, 16) + '...';
            }

            return out;
        }
    });
