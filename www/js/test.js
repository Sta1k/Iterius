/**
 * Created by smissltd on 26.05.16.
 */
function updateTaskTime(element, startTime) {
  return function () {
    var now = Math.floor(Date.now() / 1000);
    var diff = now - startTime;
    var h = Math.floor(diff / 3600);
    var m = Math.floor(diff / 60) % 60;
    var s = diff % 60;
    if (m < 10)
      m = '0' + m;
    if (s < 10)
      s = '0' + s;
    element.html(h + ' : ' + m + ' : ' + s);
  };
}
function first() {


 var taskTime = $('#taskTime');
if (taskTime.length == 0)
  return;
var workedTime = taskTime.data('worked');
if (!workedTime && workedTime !== 0)
  return;
var clientTime = Math.floor(Date.now() / 1000);
var startTime = clientTime - workedTime;
updateTaskTime(taskTime, startTime)();
if (taskTime.data('active'))
  setInterval(updateTaskTime(taskTime, startTime), 500);
}
