import $ from "jquery";
import debounce from "debounce";

// Little hack for bootstrap javascript. Load jquery before bootstrap.
window.$ = require("jquery/dist/jquery.min");
require("bootstrap/dist/js/bootstrap.bundle.js");

let transparent = true;

// const searchVisible = 0;
// const transparentDemo = true;
// const fixedTop = false;
// const navbar_initialized = false;

let bigImage = $('.page-header[data-parallax="true"]');

const pk = {
  misc: {
    navbar_menu_visible: 0,
  },

  checkScrollForPresentationPage: debounce(() => {
    const oVal = $(window).scrollTop() / 3;
    bigImage.css({
      transform: `translate3d(0,${oVal}px,0)`,
      "-webkit-transform": `translate3d(0,${oVal}px,0)`,
      "-ms-transform": `translate3d(0,${oVal}px,0)`,
      "-o-transform": `translate3d(0,${oVal}px,0)`,
    });
  }, 4),

  checkScrollForTransparentNavbar: debounce(() => {
    if ($(document).scrollTop() > $(".navbar").attr("color-on-scroll")) {
      if (transparent) {
        transparent = false;
        $(".navbar[color-on-scroll]").removeClass("navbar-transparent");
      }
    } else if (!transparent) {
      transparent = true;
      $(".navbar[color-on-scroll]").addClass("navbar-transparent");
    }
  }, 17),

  initPopovers() {
    if ($('[data-toggle="popover"]').length !== 0) {
      $("body").append('<div class="popover-filter"></div>');

      //    Activate Popovers
      $('[data-toggle="popover"]')
        .popover()
        .on("show.bs.popover", () => {
          $(".popover-filter").click(() => {
            $(this).removeClass("in");
            $('[data-toggle="popover"]').popover("hide");
          });
          $(".popover-filter").addClass("in");
        })
        .on("hide.bs.popover", () => {
          $(".popover-filter").removeClass("in");
        });
    }
  },
  initCollapseArea() {
    $('[data-toggle="pk-collapse"]').each(() => {
      const thisdiv = $(this).attr("data-target");
      $(thisdiv).addClass("pk-collapse");
    });

    $('[data-toggle="pk-collapse"]')
      .hover(
        () => {
          const thisdiv = $(this).attr("data-target");
          if (!$(this).hasClass("state-open")) {
            $(this).addClass("state-hover");
            $(thisdiv).css({
              height: "30px",
            });
          }
        },
        () => {
          const thisdiv = $(this).attr("data-target");
          $(this).removeClass("state-hover");

          if (!$(this).hasClass("state-open")) {
            $(thisdiv).css({
              height: "0px",
            });
          }
        },
      )
      .click(event => {
        event.preventDefault();

        const thisdiv = $(this).attr("data-target");
        const height = $(thisdiv)
          .children(".panel-body")
          .height();

        if ($(this).hasClass("state-open")) {
          $(thisdiv).css({
            height: "0px",
          });
          $(this).removeClass("state-open");
        } else {
          $(thisdiv).css({
            height: height + 30,
          });
          $(this).addClass("state-open");
        }
      });
  },
};

$(document).ready(() => {
  const windowWidth = $(window).width();

  if ($(".tagsinput").length !== 0) {
    $(".tagsinput").tagsInput();
  }

  if (windowWidth >= 768) {
    bigImage = $('.page-header[data-parallax="true"]');

    if (bigImage.length !== 0) {
      $(window).on("scroll", pk.checkScrollForPresentationPage);
    }
  }

  if ($("#datetimepicker").length !== 0) {
    $("#datetimepicker").datetimepicker({
      icons: {
        time: "fa fa-clock-o",
        date: "fa fa-calendar",
        up: "fa fa-chevron-up",
        down: "fa fa-chevron-down",
        previous: "fa fa-chevron-left",
        next: "fa fa-chevron-right",
        today: "fa fa-screenshot",
        clear: "fa fa-trash",
        close: "fa fa-remove",
      },
      debug: true,
    });
  }

  // Navbar color change on scroll
  if ($(".navbar[color-on-scroll]").length !== 0) {
    $(window).on("scroll", pk.checkScrollForTransparentNavbar);
  }

  $(".form-control")
    .on("focus", () => {
      $(this)
        .parent(".input-group")
        .addClass("input-group-focus");
    })
    .on("blur", () => {
      $(this)
        .parent(".input-group")
        .removeClass("input-group-focus");
    });
});

// Mobile Navigation Bar
$(document).on("click", ".navbar-toggler", () => {
  const $toggle = $(this);
  if (pk.misc.navbar_menu_visible === 1) {
    $("html").removeClass("nav-open");
    pk.misc.navbar_menu_visible = 0;
    setTimeout(() => {
      $toggle.removeClass("toggled");
      $("#bodyClick").remove();
    }, 550);
  } else {
    setTimeout(() => {
      $toggle.addClass("toggled");
    }, 580);

    const div = '<div id="bodyClick"></div>';
    $(div)
      .appendTo("body")
      .click(() => {
        $("html").removeClass("nav-open");
        pk.misc.navbar_menu_visible = 0;
        $("#bodyClick").remove();
        setTimeout(() => {
          $toggle.removeClass("toggled");
        }, 550);
      });

    $("html").addClass("nav-open");
    pk.misc.navbar_menu_visible = 1;
  }
});
