
document.addEventListener("DOMContentLoaded", () => {

  // Use .img-svg on image to remove it with svg version
  (function () {
    $("img.img-svg").each(function () {
      var $img = $(this);
      var imgClass = $img.attr("class");
      var imgURL = $img.attr("src");
      $.get(
        imgURL,
        function (data) {
          var $svg = $(data).find("svg");
          if (typeof imgClass !== "undefined") {
            $svg = $svg.attr("class", imgClass + " replaced-svg");
          }
          $svg = $svg.removeAttr("xmlns:a");
          if (
            !$svg.attr("viewBox") &&
            $svg.attr("height") &&
            $svg.attr("width")
          ) {
            $svg.attr(
              "viewBox",
              "0 0 " + $svg.attr("height") + " " + $svg.attr("width"),
            );
          }
          $img.replaceWith($svg);
        },
        "xml",
      );
    });
  })();

  // Initialize wow.js
  // (function () {
  //   wow = new WOW({
  //     boxClass: "wow",
  //     animateClass: "animated",
  //     offset: 0,
  //     mobile: true,
  //     live: true,
  //   });
  //   wow.init();

  //   // Change duration to all the elements
  //   const wows = document.querySelectorAll(".wow");

  //   if (wows.length) {
  //     for (let i = 0; i < wows.length; i++) {
  //       wows[i].setAttribute("data-wow-duration", "0.5s");
  //     }
  //   }
  // })();

  // Fix masked input cursor
  $.fn.setCursorPosition = function(pos) {
    if ($(this).get(0).setSelectionRange) {
      $(this).get(0).setSelectionRange(pos, pos);
    } else if ($(this).get(0).createTextRange) {
      var range = $(this).get(0).createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  };

});

window.addEventListener("load", () => {

  // Globals
  const overlay = document.querySelector('#overlay');

  // Open/close submenus from aside
  (function() {
    const navMenus = document.querySelectorAll('aside nav li');
    const submenuWrapper = document.querySelector('.submenus');

    if (navMenus.length && submenuWrapper) {
      const subMenus = submenuWrapper.querySelectorAll('.submenu');
      const closeSubmenuWrapper = submenuWrapper.querySelector('.closeSubmenus');

      for (let i = 0; i < navMenus.length; i++) {
        navMenus[i].addEventListener('click', () => {
          for (let i = 0; i < subMenus.length; i++) {
            subMenus[i].classList.remove('active');
          }
          subMenus[i].classList.add('active');
          submenuWrapper.classList.add('active');
          overlay.classList.add('active');
          overlay.addEventListener('click', () => {
            submenuWrapper.classList.remove('active');
            for (let i = 0; i < subMenus.length; i++) {
              subMenus[i].classList.remove('active');
            }
            overlay.classList.remove('active');
          });
        });
      }
      closeSubmenuWrapper.addEventListener('click', () => {
        submenuWrapper.classList.remove('active');
        overlay.classList.remove('active');
      });
    }
  })();

  // Open/close hambMenu from header
  (function() {
    const openHambMenu = document.querySelector('.openHambMenu');
    const closeHambMenu = document.querySelector('.closeHambMenu');
    const hambMenu = document.querySelector('.hambMenu');

    if (openHambMenu && closeHambMenu && hambMenu) {
      openHambMenu.addEventListener('click', () => {
        openHambMenu.classList.toggle('active');
        closeHambMenu.classList.toggle('active');
        hambMenu.classList.add('active');
        overlay.classList.add('active');

        overlay.addEventListener('click', () => {
          openHambMenu.classList.add('active');
          closeHambMenu.classList.remove('active');
          hambMenu.classList.remove('active');
          overlay.classList.remove('active');
        })
      });
      closeHambMenu.addEventListener('click', () => {
        openHambMenu.classList.toggle('active');
        closeHambMenu.classList.toggle('active');
        hambMenu.classList.remove('active');
        overlay.classList.remove('active');
      });
    }

  })();

  // Expand hambMenu submenus
  (function() {
    const mainItems = document.querySelectorAll('.hambMenu .mainItem');
    const mainItemsHeadings = document.querySelectorAll('.hambMenu .mainItem h4');

    if (mainItems.length && mainItemsHeadings.length) {
      for (let i = 0; i < mainItemsHeadings.length; i++) {
        mainItemsHeadings[i].addEventListener('click', () => {
          if (mainItems[i].classList.contains('active')) {
            mainItems[i].classList.remove('active');
          } else {
            for (let j = 0; j < mainItems.length; j++) {
              mainItems[j].classList.remove('active');
            }
            mainItems[i].classList.add('active');
          }
        });
      }
    }
  })();

  // Expand footer submenus
  (function() {
    const mainItems = document.querySelectorAll('footer .footer_block');
    const mainItemsHeadings = document.querySelectorAll('footer .footer_block h4');

    if (mainItems.length && mainItemsHeadings.length) {
      for (let i = 0; i < mainItemsHeadings.length; i++) {
        mainItemsHeadings[i].addEventListener('click', () => {
          if (mainItems[i].classList.contains('active')) {
            mainItems[i].classList.remove('active');
          } else {
            for (let j = 0; j < mainItems.length; j++) {
              mainItems[j].classList.remove('active');
            }
            mainItems[i].classList.add('active');
          }
        });
      }
    }
  })();

});

console.log('scroll');

// Hide header on scroll
window.addEventListener('scroll', () => {
  console.log('scroll');
  console.log(window.scrollY);
});