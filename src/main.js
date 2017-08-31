import './styles.css';
import './styles.scss';


$(document).ready(function() {
  animate_bricks();
  $(document).on("scroll", function() {
    animate_bricks();
  });
  $(window).resize(function() {
    animate_bricks();
  })
});

function animate_bricks() {
  var width_of_page, scroll_position, bricks;
  width_of_page = window.innerWidth;
  scroll_position = window.scrollY;
  bricks = document.getElementsByClassName('brick');
  Object.keys(bricks).forEach(function(element, index, array) {
    var rect = bricks[index].getBoundingClientRect();
    // console.log(index, rect.top, rect.right, rect.bottom, rect.left);
    if (rect.top < window.innerHeight + 100) {
      $('.brick:eq(' + index + ')').animate({
        opacity: 1,
        top: 0,
        display: 'block'
      }, 500);
    }
  }, this);
}