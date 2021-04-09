
// Init AOS
// AOS.init({
//   // Global settings:
//   disable: 'mobile', // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
//   startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
//   initClassName: 'aos-init', // class applied after initialization
//   animatedClassName: 'aos-animate', // class applied on animation
//   useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
//   disableMutationObserver: false, // disables automatic mutations' detections (advanced)
//   debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
//   throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

//   // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
//   offset: 120, // was 120 - offset (in px) from the original trigger point
//   delay: 0, // values from 0 to 3000, with step 50ms
//   duration: 400, // values from 0 to 3000, with step 50ms
//   easing: 'ease', // default easing for AOS animations
//   once: true, // whether animation should happen only once - while scrolling down
//   mirror: false, // whether elements should animate out while scrolling past them
//   anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
// });

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

  // Open/close modalForm
  (function() {
    const modalForm = document.querySelector('.modalForm');
    const openForms = document.querySelectorAll('.openForm');
    const closeForm = document.querySelector('.closeForm');

    if (modalForm) {
      for (let i = 0; i < openForms.length; i++) {
        openForms[i].addEventListener('click', () => {
          modalForm.classList.add('active');
          overlay.classList.add('active');
          overlay.addEventListener('click', () => {
            modalForm.classList.remove('active');
            overlay.classList.remove('active');
          })
        });
      }
      closeForm.addEventListener('click', () => {
        modalForm.classList.remove('active');
        overlay.classList.remove('active');
      });
    }
  })();

  // Open/close modalVideo
  (function() {
    const modalForm = document.querySelector('.modalVideo');
    const openForms = document.querySelectorAll('.openVideo');
    const closeForm = document.querySelector('.closeVideo');

    if (modalForm) {
      for (let i = 0; i < openForms.length; i++) {
        openForms[i].addEventListener('click', () => {
          modalForm.classList.add('active');
          overlay.classList.add('active');
          overlay.addEventListener('click', () => {
            modalForm.classList.remove('active');
            overlay.classList.remove('active');
          })
        });
      }
      closeForm.addEventListener('click', () => {
        modalForm.classList.remove('active');
        overlay.classList.remove('active');
      });
    }
  })();

  // Masked Input for #programForm
  (function() {
    const inputTels = document.querySelectorAll('input[type=tel]');

    if (inputTels.length) {

      $(inputTels).click(function() {
        $(this).setCursorPosition(5);
      }).mask(
        "+38 (999) 999-9999",
        {autoclear: false}
      );

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

    }
  })();

  // Labels animation
  (function() {
    const inputWrappers = document.querySelectorAll('form > div');
    const inputs = document.querySelectorAll('form > div > input, form > div > textarea');

    if (inputWrappers.length && inputs.length) {
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('focus', () => {
          inputWrappers[i].classList.add('focused');
        });
        inputs[i].addEventListener('blur', () => {
          if (inputs[i].value == '') {
            inputWrappers[i].classList.remove('focused');
          }
        });
      }
    }
  })();

  // Custom selects
  (function() {

    for (const dropdown of document.querySelectorAll(".custom-select-wrapper")) {
      dropdown.addEventListener('click', function() {
          this.querySelector('.custom-select').classList.toggle('open');
      })
    }

    for (const option of document.querySelectorAll(".custom-option")) {
      option.addEventListener('click', function() {
          if (!this.classList.contains('selected')) {
              this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
              this.classList.add('selected');
              this.closest('.custom-select').querySelector('.custom-select__trigger span').textContent = this.textContent;
          }
      })
    }

    window.addEventListener('click', function(e) {
      for (const select of document.querySelectorAll('.custom-select')) {
          if (!select.contains(e.target)) {
              select.classList.remove('open');
          }
      }
    });
  })();
});