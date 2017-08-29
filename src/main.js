import './styles.css';
import './styles.scss';


$(document).ready(function() {
  animate_object();
  $(document).on("scroll", function() {
    animate_object();
  });
});

function animate_object() {
  var width_of_page, scroll_position, bricks;
  width_of_page = window.innerWidth;
  scroll_position = window.scrollY;
  bricks = document.getElementsByClassName('brick');
  Object.keys(bricks).forEach(function(element, index, array) {
    var rect = bricks[index].getBoundingClientRect();
    // console.log(index, rect.top, rect.right, rect.bottom, rect.left);
    if (rect.top < window.innerHeight) {
      $('.brick:eq(' + index + ')').animate({
        opacity: 1,
        top: 0,
        display: 'block'
      }, 800);
    }
  }, this);
}