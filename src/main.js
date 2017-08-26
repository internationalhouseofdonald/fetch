import './styles.css';
import './styles.scss';


$(document).ready(function() {
  $(document).on("scroll", function() {
    var bricks, columns, column_of_brick, animation_distance ,element_offsets, scroll_y, resize_offset, navbar_is_collapsed, height_of_navbar, additional_height_from_navbar_when_expanded;
    bricks = document.getElementsByClassName('brick');
    columns = document.getElementsByClassName('brick-columns');
    element_offsets = new Array;
    column_of_brick = new Array;
    // This is set in styles.css
    animation_distance = 100;
    height_of_navbar = 140;
    additional_height_from_navbar_when_expanded = 130;
    if ($('.navbar-collapse').hasClass('show') && $(window).width() <= 558) {
      navbar_is_collapsed = false;
      scroll_y = window.scrollY + animation_distance + height_of_navbar - additional_height_from_navbar_when_expanded;
    } else if ((!$('.navbar-collapse').hasClass('show') && $(window).width() <= 558) || $(window).width() > 558) {
      navbar_is_collapsed = true;
      scroll_y = window.scrollY + animation_distance + height_of_navbar;
    }

    Object.keys(bricks).forEach(function(element) {
      element_offsets.push(bricks[element].offsetTop + bricks[element].scrollTop + bricks[element].clientTop);
    });
  
    Object.keys(bricks).forEach(function(index) {
      column_of_brick.push(($('.brick:eq(' + index + ')').parent().index()) + 1);
    });
    element_offsets.forEach(function(element, index) {

      // Why is this 558 when the browser says 575?
      if (window.innerWidth <= 575) {
        switch(column_of_brick[index]) {
          case 1:
          resize_offset = element;
          break;
          case 2:
          resize_offset = element + $('.brick-columns:nth-child(2)')[0].clientHeight;
          break;
          case 3:
          resize_offset = element + $('.brick-columns:nth-child(2)')[0].clientHeight + $('.brick-columns:nth-child(3)')[0].clientHeight;
          break;
          default:
          console.log("error inside offset switch statement");
        }
        if (scroll_y > resize_offset) {
          animate_brick(index);
        }
      } else {
        if (scroll_y > element) {
          animate_brick(index);
        }
      }
    })
  });
});

function animate_brick(index) {
  // It is IMPORTANT that you use :eq() and not :nth-child() BECAUSE :nth-child() does not traverse the scope of a parent
  $(".brick:eq(" + (index) + ")").animate({
    opacity: 1,
    top: 0,
    display: 'block'
  }, 800);
}
