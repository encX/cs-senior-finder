$(function () {
  const nums = shuffle(codeList)
  var randInterval, blinkInterval, down = false, lock = true

  $('body')
    .keydown(function (e) {
      if (e.keyCode === 32 && !down && !lock && nums.length > 0) {
        $('#codenumber').removeClass('message ready error').html('')
        randInterval = setInterval(randNumber(), 20)
        down = true
      }
      else if (e.keyCode === 13) {
        clearInterval(blinkInterval)
        if (nums.length === 0) {
          $('#codenumber').html('Code is empty.<br>Reload to continue.').addClass('message error')
          return false
        }
        else {
          lock = false
          $('#codenumber').html('Ready<br>Press Spacebar').addClass('message ready')
          $('body').removeClass('invert')
        }
      }
      else {
        return false
      }
    })
    .keyup(function (e) {
      if (!down || nums.length === 0) return false
      if (e.keyCode === 32) {
        down = false
        lock = true
        clearInterval(randInterval)
        blinkInterval = setInterval(function () { $('body').toggleClass('invert') }, 500)
        var picked = nums.shift()
        $('#codenumber').html(picked)
      }
    })

  $('#codenumber').html('Press Enter. <br>To Begin.').addClass('message')
})

function randNumber() {
  return function () {
    var randN = Math.floor(Math.random() * 999);
    $('#codenumber').html(randN);
  }
}

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
  }
  return a;
}