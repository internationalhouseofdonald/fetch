import './styles.css';
import './styles.scss';


$(document).ready(function() {
  $(document).on("scroll", function() {

    var bricks, columns, column_of_brick, element_offsets, scroll_y, resize_offset, navbar_is_collapsed, height_of_hero, timing_adjustment;
    bricks = document.getElementsByClassName('brick');
    columns = document.getElementsByClassName('brick-columns');
    element_offsets = new Array;
    column_of_brick = new Array;
    // This is set in styles.css
    height_of_hero = window.innerHeight - 500;
    console.log(height_of_hero);
    timing_adjustment = 130;
    if ($('.navbar-collapse').hasClass('show') && window.innerWidth <= 767) {
      navbar_is_collapsed = true;
      scroll_y = window.scrollY + height_of_hero - timing_adjustment;
    } else if ((!$('.navbar-collapse').hasClass('show') && window.innerWidth <= 767) || window.innerWidth > 767) {
      navbar_is_collapsed = false;
      scroll_y = window.scrollY + height_of_hero;
    }

    Object.keys(bricks).forEach(function(element, index) {
      element_offsets.push(bricks[element].offsetTop + bricks[element].scrollTop + bricks[element].clientTop);
      column_of_brick.push(($('.brick:eq(' + index + ')').parent().index()) + 1);
    });


    element_offsets.forEach(function(element, index) {
      if (window.innerWidth <= 767) {
        switch(column_of_brick[index]) {
          case 1:
          resize_offset = element + 1600;
          break;
          case 2:
          resize_offset = element + $('.brick-columns:nth-child(2)')[0].clientHeight + 1200;
          break;
          case 3:
          resize_offset = element + $('.brick-columns:nth-child(2)')[0].clientHeight + $('.brick-columns:nth-child(3)')[0].clientHeight + 1600;
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
