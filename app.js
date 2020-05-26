window.onload = function() {

  let keyboard = "abcdefghijklmnopqrstuvwxyz".split('')
  let movies = ['drive', 'prisoners', 'seven', 'avatar', 'parasite', 'snowpiercer', 'avengers', 'django-unchained', 'pulp-fiction', 'reservoir-dogs', 'joker', 'extraction']

  let correct = [];
  let lives = 10;

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');


  let keys = function() {
    let buttons = $('#buttons')
    let button = $('<ul></ul>')

    keyboard.forEach(function(key) {
      button.id = 'letters'
      singleletter = $('<li></li>')
      $(singleletter).addClass('btn btn-primary')
      $(singleletter).attr('id', 'letter')
      $(singleletter).html(key)
      buttons.append(button)
      button.append(singleletter)
    })
  }

  let question = function() {
    test = movies[Math.floor((Math.random() * movies.length))].split('');
    space = $('#question')
    the_word = $('<ul></ul>')
    $(the_word).attr('class', 'parent')
    test.forEach(function(letter) {
      each_letter = $('<li></li>')
      $(each_letter).attr('class', letter)
      $(each_letter).addClass('solution')
      if (letter == '-') {
        $(each_letter).html('-')
      } else {
        $(each_letter).html('_')
      }
      space.append(the_word)
      the_word.append(each_letter)
    })
  }

  let check = function() {
    $("li").on("click", function() {
      $(this).attr("disabled", "disabled");
      let guess = $(this).text();
      if (test.includes(guess)) {
        $('.' + guess).html(guess)
      } else {
        lives -= 1;
        $('h2').html('Lives: ' + lives)
        stickman()
        if (lives <= 0) {
          $('body').addClass("lose")
          setTimeout(function() {
            $('body').removeClass('lose');
          }, 500);
          $('h2').html('You lose!')
          test.forEach(function(l) {
            $(each_letter).html(l)
          })
        }
      }
    })
  }

  let stickman = function() {
    switch (lives) {
      case 9:
        ctx.beginPath();
        ctx.moveTo(60, 280);
        ctx.lineTo(350, 280);
        ctx.stroke();
        break;
      case 8:
        ctx.beginPath();
        ctx.moveTo(100, 280);
        ctx.lineTo(100, 45);
        ctx.stroke();
        break;
      case 7:
        ctx.beginPath();
        ctx.moveTo(80, 70);
        ctx.lineTo(250, 70);
        ctx.stroke();
        break;
      case 6:
        ctx.beginPath();
        ctx.moveTo(210, 70);
        ctx.lineTo(210, 100);
        ctx.stroke();
        break;
      case 5:
        ctx.beginPath();
        ctx.arc(210, 120, 20, 0, 2 * Math.PI);
        ctx.stroke();
        break;
      case 4:
        ctx.beginPath();
        ctx.moveTo(210, 210);
        ctx.lineTo(210, 140);
        ctx.stroke();
        break;
      case 3:
        ctx.beginPath();
        ctx.moveTo(210, 160);
        ctx.lineTo(230, 190);
        ctx.stroke();
        break;
      case 2:
        ctx.beginPath();
        ctx.moveTo(210, 160);
        ctx.lineTo(190, 190);
        ctx.stroke();
        break;
      case 1:
        ctx.beginPath();
        ctx.moveTo(210, 210);
        ctx.lineTo(230, 250);
        ctx.stroke();
        break;
      case 0:
        ctx.beginPath();
        ctx.moveTo(210, 210);
        ctx.lineTo(190, 250);
        ctx.stroke();
        break;
    }
  }

  $('#restart').on("click", function(){
    lives = 10
    $('h2').html('Lives: ' + lives)
    ctx.clearRect(0, 0, 400, 400);
    $('.parent').remove()
    $('.btn').removeAttr('disabled')
    question()

  })


  keys()
  question()
  check()

}

// if (test.includes(guess)) {
//   correct.push('c');
//   if(correct.length == test.length){
//     $('h2').html('Wow! You are good at this!')
//   }
//   console.log(correct.length);
//   console.log(test.length);
