var app;

app = [];

app.bg = {
  init: function() {
    return $(".bg").each(function() {
      var bg, img, src;
      bg = $(this);
      src = bg.find("img").attr("src");
      bg.css({
        'background-image': 'url(' + src + ')'
      });
      img = new Image();
      img.src = src;
      return img.onload = function() {
        return bg.addClass("bg-loaded");
      };
    });
  }
};

app.carousel = {
  current: 0,
  duration: 10000,
  time: 0,
  timeout: false,
  init: function() {
    var el;
    el = $(".carousel");
    app.carousel.go(el, 0, true);
    app.carousel.setBar(el);
    app.carousel.eventSwipe(el);
    return $(".carousel-thumbnail").click(function() {
      var parent;
      parent = $(this).closest(".carousel");
      return app.carousel.go(parent, $(this).index());
    });
  },
  next: function(el) {
    var next;
    next = el.find(".section__thumbs .carousel-thumbnail.current").index() + 1;
    if (!el.find(".carousel-content").eq(next).length) {
      next = 0;
    }
    return this.go(el, next);
  },
  prev: function(el) {
    var prev;
    prev = el.find(".section__thumbs .carousel-thumbnail.current").index() - 1;
    if (!el.find(".carousel-content").eq(prev).length) {
      prev = 0;
    }
    return this.go(el, prev);
  },
  go: function(el, to, firstime) {
    var current, delay;
    if (firstime == null) {
      firstime = false;
    }
    this.time = 0;
    this.current = to;
    delay = 50;
    if (firstime) {
      delay = 0;
    }
    el.find(".current").addClass("out").removeClass("current");
    el.find(".carousel-thumbnail").find(".section__thumb__bar").css({
      width: 0 + "%"
    });
    el.find(".carousel-thumbnail").eq(to).addClass("current");
    setTimeout(function() {
      el.find(".out").removeClass("out");
      return el.find(".carousel-content").eq(to).addClass("current");
    }, delay);
    current = el.find(".carousel-thumbnail.current").index();
    if (el.find(".carousel-content video").length) {
      el.find("video")[current].pause();
      el.find("video")[current].currentTime = 0;
      el.find("video")[current].play();
    }
    return this.autoplay(el);
  },
  autoplay: function(el) {
    clearTimeout(app.carousel.timeout);
    return app.carousel.timeout = setTimeout(function() {
      return app.carousel.next(el);
    }, this.duration);
  },
  setBar: function(el) {
    return setInterval(function() {
      var bar, width;
      app.carousel.time += 50;
      bar = el.find(".carousel-thumbnail.current").find(".section__thumb__bar");
      width = app.carousel.time * 100 / app.carousel.duration;
      if (width > 100) {
        width = 100;
      }
      return bar.css({
        width: width + "%"
      });
    }, 50);
  },
  eventSwipe: function(carousel) {
    carousel.hammer().bind("swipeleft", function(e) {
      return app.carousel.next($(this));
    });
    return carousel.hammer().bind("swiperight", function(e) {
      return app.carousel.prev($(this));
    });
  }
};

app.faq = {
  init: function() {
    return $(".faq").each(function() {
      var faq;
      faq = $(this);
      faq.find(".faq__item:not(.faq__open) .faq__answer").hide();
      return faq.find(".faq__question").click(function() {
        var index;
        index = $(this).parent().index();
        return app.faq.open(faq, index);
      });
    });
  },
  open: function(faq, index) {
    return faq.find(".faq__item").each(function() {
      if ($(this).index() === index) {
        $(this).find(".faq__answer").slideToggle();
        return $(this).toggleClass("faq__open");
      } else {
        $(this).find(".faq__answer").slideUp();
        return $(this).removeClass("faq__open");
      }
    });
  }
};

app.form = {
  init: function() {
    var regex;
    regex = /[^+\d]/g;
    $('#phone').keyup(function() {
      if ($('#phone').val() === '') {
        $('#phone').val('+569');
      }
      return $('#phone').val($('#phone').val().replace(regex, ''));
    });
    return $(app.form.classes.container).each(function() {
      return app.form.assign($(this));
    });
  },
  classes: {
    container: ".form--validation",
    item: ".form__element",
    inputs: "input,select,textarea"
  },
  assign: function(form, callback) {
    return form.find(app.form.classes.inputs).on("blur", function() {
      return app.form.validate($(this).closest(app.form.classes.item));
    });
  },
  validateGroup: function(container) {
    var pass;
    pass = true;
    container.find(app.form.classes.item).each(function() {
      if (!app.form.validate($(this))) {
        pass = false;
      }
      return true;
    });
    return pass;
  },
  validate: function(el) {
    var account, input, pass, phone, rut, rut_nuevo;
    input = el.find(app.form.classes.inputs);
    pass = true;
    if (!input.val()) {
      pass = false;
    }
    if (input.attr("type") === 'rut') {
      rut = input.val();
      if (app.form.validaRut(rut) === true) {
        rut_nuevo = app.form.formateaRut(rut);
        $(".input-rut").val(rut_nuevo);
      } else {
        $(".input-rut").val("");
        pass = false;
      }
    }
    if (input.attr("number") === 'phone') {
      phone = input.val();
      if (phone.length >= 9) {
        console.log("");
      } else {
        $(".input-phone").val("");
        pass = false;
      }
    }
    if (input.attr("number") === 'account') {
      account = input.val();
      if (account.length >= 4) {
        console.log("");
      } else {
        $(".input-account").val("");
        pass = false;
      }
    }
    if (input.attr("number") === 'serie') {
      account = input.val();
      if (account.length >= 9 && account.length <= 12) {
        console.log("");
      } else {
        $(".input-serie").val("");
        pass = false;
      }
    }
    if (!pass) {
      el.addClass(app.form.classes.item.replace(".", "") + "--error");
    } else {
      el.removeClass(app.form.classes.item.replace(".", "") + "--error");
    }
    return pass;
  },
  validaRut: function(rut) {
    var M, P, S, T, V;
    T = rut.replace(/[^0-9kK]+/g, "").slice(0, -1);
    P = parseInt(T);
    M = 0;
    S = 1;
    while (T) {
      S = (S + T % 10 * (9 - (M++ % 6))) % 11;
      T = Math.floor(T / 10);
    }
    if (S) {
      V = S - 1;
    } else {
      V = 'K';
    }
    if ((V === "K" && rut.slice(-1).toUpperCase() === V) || (V !== "K" && parseInt(rut.slice(-1)) === V)) {
      return true;
    } else {
      return false;
    }
  },
  formateaRut: function(rut) {
    var actual, actualLimpio, dv, i, inicio, j, letra, rutPuntos, sinPuntos;
    actual = rut.replace(/^0+/, '');
    if (actual !== '' && actual.length > 1) {
      sinPuntos = actual.replace(/\./g, '');
      actualLimpio = sinPuntos.replace(/-/g, '');
      inicio = actualLimpio.substring(0, actualLimpio.length - 1);
      rutPuntos = '';
      i = 0;
      j = 1;
      i = inicio.length - 1;
      while (i >= 0) {
        letra = inicio.charAt(i);
        rutPuntos = letra + rutPuntos;
        if (j % 3 === 0 && j <= inicio.length - 1) {
          rutPuntos = '.' + rutPuntos;
        }
        j++;
        i--;
      }
      dv = actualLimpio.substring(actualLimpio.length - 1);
      if (dv === "K") {
        dv = "k";
      }
      rutPuntos = rutPuntos + '-' + dv;
    }
    return rutPuntos;
  }
};

app.header = {
  init: function() {
    app.header.nav.events();
    return $(".header__icon--hamburger").click(function() {
      if (!$("header").hasClass("header--nav-in")) {
        $("header").addClass("header--nav-in");
        return $("header").addClass("header--color");
      } else {
        $("header").removeClass("header--nav-in");
        $("header").addClass("header-nav-out");
        return setTimeout(function() {
          return $("header").removeClass("header--nav-in header-nav-out");
        }, 200);
      }
    });
  },
  onScroll: function(scroll) {
    if (scroll > 10) {
      return $("header").addClass("header--color");
    } else {
      if (!$("header").hasClass("header--nav-in")) {
        return $("header").removeClass("header--color");
      }
    }
  },
  nav: {
    events: function() {
      $('.header__ham').on('click', function(e) {
        return app.header.nav.toggle();
      });
      $(".header__nav__close, .header__nav__bg").on('click', function() {
        return app.header.nav.out();
      });
      $(".header__nav__nav li").each(function() {
        if ($(this).find("ul").length || $(this).is("[supernav]")) {
          return $(this).children("a").append("<span class='fa fa-angle-right'></span>");
        }
      });
      $(".header__nav__nav a").on('click', function(e) {
        return app.header.nav.enterLvl($(this), e);
      });
      return $(".header__nav__back").on("click", function() {
        return app.header.nav.backLvl();
      });
    },
    toggle: function() {
      if (!$("header").is(".header--nav-in")) {
        return this["in"]();
      } else {
        return this.out();
      }
    },
    "in": function() {
      if (!$("header").hasClass("header--nav-out")) {
        return $("header").addClass("header--nav-in");
      }
    },
    out: function() {
      if (!$("header").hasClass("header--nav-out")) {
        $("header").addClass("header--nav-out");
        return setTimeout(function() {
          $("header").removeClass("header--nav-out");
          $("header").removeClass("header--nav-in");
          return app.header.nav.backLvl();
        }, 500);
      }
    },
    enterLvl: function(el, e) {
      if (el.siblings("ul").length && $(window).width() < 1090) {
        e.preventDefault();
        el.siblings("ul").addClass("ul--in");
        return $(".header__nav").addClass("header__nav--ul-in");
      }
    },
    backLvl: function() {
      if ($(".header__nav--ul-in").length) {
        $(".header__nav").removeClass("header__nav--ul-in");
        $(".header__nav__nav ul.ul--in").addClass("ul--out");
        return setTimeout(function() {
          return $(".header__nav__nav ul.ul--in").removeClass("ul--in ul--out");
        }, 500);
      }
    }
  }
};

app.modal = {
  init: function() {
    $("[data-modal-register]").click(function(e) {
      e.preventDefault();
      return app.modal.open(".modal--register");
    });
    $("[data-modal-inscripcion]").click(function(e) {
      e.preventDefault();
      app.modal.close($(".modal--login"));
      return app.modal.open(".modal--register");
    });
    $("[data-modal-login]").click(function(e) {
      e.preventDefault();
      return app.modal.open(".modal--login");
    });
    $("[data-modal-contact]").click(function(e) {
      e.preventDefault();
      return app.modal.open(".modal--contact");
    });
    $("[data-modal-pictures]").click(function(e) {
      e.preventDefault();
      return app.modal.open(".modal--pictures");
    });
    $("[data-modal-competition]").click(function(e) {
      e.preventDefault();
      return app.modal.open(".modal--competition");
    });
    $("[data-modal-profile]").click(function(e) {
      e.preventDefault();
      return app.modal.open(".modal--profile");
    });
    $("[data-modal-videos]").click(function(e) {
      e.preventDefault();
      return app.modal.open(".modal--videos");
    });
    $(".modal__close").click(function() {
      return app.modal.close($(this).closest(".modal"));
    });
    $('.modal').click(function(e) {
      if ($(e.target).hasClass('modal__front')) {
        return app.modal.close($(this).closest(".modal"));
      }
    });
    $('#videohome').bind('ended', function() {
      return app.modal.close($(".modal--video"));
    });
    $("[data-sound-on]").click(function(e) {
      $(this).removeClass("modal__sound__icon--show");
      $("[data-sound-off]").addClass("modal__sound__icon--show");
      return jQuery("#videohome").prop('muted', false);
    });
    return $("[data-sound-off]").click(function(e) {
      $(this).removeClass("modal__sound__icon--show");
      $("[data-sound-on]").addClass("modal__sound__icon--show");
      return jQuery("#videohome").prop('muted', true);
    });
  },
  open: function(elementclass) {
    return $(elementclass).addClass("modal--in");
  },
  close: function(modal) {
    if (modal == null) {
      modal = false;
    }
    if (!modal) {
      modal = $(".modal");
    }
    modal.removeClass("modal--in").addClass("modal--out");
    return setTimeout(function() {
      return modal.removeClass("modal--out");
    }, 200);
  }
};

app.scroll = {
  init: function() {
    var hash;
    app.scroll.trigger();
    app.scroll.checkGoto();
    setInterval(function() {
      return app.scroll.trigger();
    }, 500);
    $(window).scroll(function() {
      app.scroll.trigger();
      return app.scroll.checkGoto();
    });
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        $('header').addClass("header--min");
        return $('header').addClass("header--color");
      } else {
        $('header').removeClass("header--min");
        return $('header').removeClass("header--color");
      }
    });
    $("[data-goto]").click(function(e) {
      e.preventDefault();
      app.scroll.goto($(this).attr("data-goto"));
      return console.log("data");
    });
    hash = window.location.hash.replace("#", "");
    if (hash !== "") {
      return app.scroll.goto($(".section--" + hash));
    }
  },
  trigger: function() {
    app.scroll.dscroll();
    app.scroll.parallax();
    return app.scroll.sticky();
  },
  dscroll: function() {
    var element_top_delay, element_top_prev, scroll;
    scroll = $(window).scrollTop();
    if ($(".dscroll").length) {
      element_top_prev = 0;
      element_top_delay = 0;
      return $(".dscroll:visible").each(function() {
        var delay, element, element_top;
        element = $(this);
        element_top = element.offset().top;
        if (scroll + $(window).height() > element_top) {
          element.addClass("dscroll--in");
          if (element_top >= element_top_prev - 25 && element_top <= element_top_prev + 25) {
            element_top_delay++;
            delay = element_top_delay * 0.2;
            element.css({
              '-webkit-animation-delay': delay + "s",
              'animation-delay': delay + "s"
            });
          } else {
            element_top_delay = 0;
          }
          element_top_prev = element_top;
        }
        if (scroll + $(window).height() <= element_top) {
          return element.removeClass("dscroll--in");
        }
      });
    }
  },
  parallax: function() {
    var scroll;
    scroll = $(window).scrollTop();
    if ($("[parallax]").length) {
      return $("[parallax]").each(function() {
        var valX, valY, vals, x, y;
        vals = $(this).attr("parallax").split(",");
        x = parseFloat(vals[0]);
        y = parseFloat(vals[1]);
        valX = scroll * x;
        valY = scroll * y;
        return $(this).css({
          "-webkit-transform": "translate(" + valX + "px," + valY + "px)",
          "-ms-transform": "translate(" + valX + "px," + valY + "px)",
          "transform": "translate(" + valX + "px," + valY + "px)"
        });
      });
    }
  },
  sticky: function() {
    var scroll;
    scroll = $(window).scrollTop();
    if ($("[sticky]").length) {
      return $("[sticky]").each(function() {
        var element, element_top, sticky_top;
        sticky_top = scroll + $("header").height() + 60;
        element = $(this);
        element_top = element.offset().top;
        if (sticky_top > element_top) {
          return element.addClass("sticked");
        } else {
          return element.removeClass("sticked");
        }
      });
    }
  },
  goto: function(to, add, seconds) {
    var from, top;
    if (add == null) {
      add = 0;
    }
    if (seconds == null) {
      seconds = 1000;
    }
    from = $("[data-goto='" + to + "']");
    if (!add) {
      add = $("header").height() + 80;
      if (from.closest("[sticky]").length) {
        add += from.closest("[sticky]").height();
      }
    }
    if ($(to).length) {
      top = $(to).offset().top - add;
      return $("body,html").animate({
        scrollTop: top
      }, seconds);
    }
  },
  checkGoto: function() {
    var $index, scroll;
    scroll = $(window).scrollTop();
    $index = -1;
    $("[data-goto]").each(function() {
      var add, from, to;
      from = $(this);
      to = $($(this).attr("data-goto"));
      add = $("header").height() + 120;
      if (from.closest("[sticky]").length) {
        add += from.closest("[sticky]").height();
      }
      if (to.length) {
        if (scroll + add + 2 >= to.offset().top) {
          $("[data-goto].contener__tag--current").removeClass("contener__tag--current");
          from.addClass("contener__tag--current");
          return $index = to.index();
        }
      }
    });
    if ($index > 2) {
      return $(".contener__nav__sticky").scrollLeft(500);
    } else {
      return $(".contener__nav__sticky").scrollLeft(0);
    }
  }
};

(function(factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery', 'hammerjs'], factory);
  } else if (typeof exports === 'object') {
    factory(require('jquery'), require('hammerjs'));
  } else {
    factory(jQuery, Hammer);
  }
})(function($, Hammer) {
  var hammerify;
  hammerify = function(el, options) {
    var $el;
    $el = $(el);
    if (!$el.data('hammer')) {
      $el.data('hammer', new Hammer($el[0], options));
    }
  };
  $.fn.hammer = function(options) {
    return this.each(function() {
      hammerify(this, options);
    });
  };
  Hammer.Manager.prototype.emit = (function(originalEmit) {
    return function(type, data) {
      originalEmit.call(this, type, data);
      $(this.element).trigger({
        type: type,
        gesture: data
      });
    };
  })(Hammer.Manager.prototype.emit);
});

app.slider = {
  init: function() {
    $(".slider").each(function() {
      app.slider.createElements($(this));
      app.slider.go($(this), 0);
      app.slider.autoplay($(this));
      return app.slider.eventSwipe($(this));
    });
    $(document).on("click", ".slider .slider-nav-left", function() {
      return app.slider.prev($(this).closest(".slider"));
    });
    $(document).on("click", ".slider .slider-nav-right", function() {
      return app.slider.next($(this).closest(".slider"));
    });
    $(document).on("click", ".slider .slider-bullet", function() {
      return app.slider.go($(this).closest(".slider"), $(this).index());
    });
    return $(document).on("click", ".section__thumbs .col-md-12", function() {
      var parent;
      parent = $(this).closest(".slides");
      app.thumb.go(parent, $(this).index());
      return app.slider.go($(this).closest(".slider"), $(this).index());
    });
  },
  eventSwipe: function(slider) {
    slider.hammer().bind("swipeleft", function(e) {
      return app.slider.next($(this));
    });
    return slider.hammer().bind("swiperight", function(e) {
      return app.slider.prev($(this));
    });
  },
  create: function(data) {
    var d, k, len, slider, slides;
    slides = "";
    for (k = 0, len = data.length; k < len; k++) {
      d = data[k];
      slides += "<div class='slide'>" + d + "</div>";
    }
    slider = "<div class='slider slider-cover'>" + slides + "</div>";
    return slider;
  },
  createElements: function(slider) {
    var html;
    if (!slider.find("slider-slides").length) {
      slider.find(".slide").wrapAll("<div class='slider-slides' />");
    }
    if (slider.find(".slide").length > 1) {
      html = "";
      html += "<div class='slider-navigation'>";
      html += "<div class='slider-nav slider-nav-left'><span class='fa fa-angle-left'></span></div>";
      html += "<div class='slider-nav slider-nav-right'><span class='fa fa-angle-right'></span></div>";
      html += "</div>";
      html += "<div class='slider-bullets'><div class='slider-bullets-limit'></div></div>";
      slider.append(html);
      return slider.find(".slide").each(function() {
        return slider.find(".slider-bullets .slider-bullets-limit").append("<div class='slider-bullet'></div>");
      });
    }
  },
  next: function(slider) {
    var current, goto;
    current = slider.find(".slide.slide-current").index();
    goto = current + 1;
    if (goto >= slider.find(".slide").length) {
      goto = 0;
    }
    app.slider.go(slider, goto, "right");
    return slider.find("video")[0].stop();
  },
  prev: function(slider) {
    var current, goto;
    current = slider.find(".slide.slide-current").index();
    goto = current - 1;
    if (goto < 0) {
      goto = slider.find(".slide").length - 1;
    }
    return app.slider.go(slider, goto, "left");
  },
  go: function(slider, goto, dir) {
    var current;
    if (dir == null) {
      dir = false;
    }
    current = slider.find(".slide.slide-current").index();
    if (!slider.hasClass("slider-animate") && current !== goto) {
      if (!dir && current >= 0) {
        dir = current < goto ? "right" : "left";
      }
      slider.removeClass("slider-dir-left slider-dir-right");
      slider.addClass("slider-animate");
      if (dir) {
        slider.addClass("slider-dir-" + dir);
      }
      slider.find(".slide.slide-current").addClass("slide-out").removeClass("slide-current");
      slider.find(".slide").eq(goto).addClass("slide-current");
      slider.find(".slider-bullet").removeClass("slider-bullet-current").eq(goto).addClass("slider-bullet-current");
      return setTimeout(function() {
        slider.find(".slide-out").removeClass("slide-out");
        return slider.removeClass("slider-animate");
      }, 500);
    }
  },
  autoplay: function(slider) {
    var play, play_timeout;
    play_timeout = false;
    play = function() {
      var el;
      clearTimeout(play_timeout);
      el = $(".slides");
      if ($(slider).hasClass("slider--news") === true) {
        return play_timeout = setTimeout(function() {
          slider.each(function() {
            app.slider.next($(this));
            return app.thumb.next($(this));
          });
          return play();
        }, 15000);
      } else {
        return play_timeout = setTimeout(function() {
          slider.each(function() {
            app.slider.next($(this));
            return app.thumb.next($(this));
          });
          return play();
        }, 10000);
      }
    };
    return play();
  }
};

app.swiper = {
  init: function() {
    var swiper, swiper_brands, swiper_marcas, swiper_news;
    swiper = new Swiper('.swiper-social', {
      loop: true,
      speed: 1000,
      autoplay: {
        enabled: true,
        delay: 2000
      },
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-next',
        prevEl: '.swiper-prev'
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 0,
          slidesPerGroup: 1
        },
        800: {
          slidesPerView: 2,
          spaceBetween: 10,
          slidesPerGroup: 1
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 10,
          slidesPerGroup: 1
        },
        1500: {
          slidesPerView: 4,
          spaceBetween: 10,
          slidesPerGroup: 1
        }
      }
    });
    swiper_news = new Swiper('.swiper-news', {
      loop: true,
      speed: 1000,
      autoplay: {
        enabled: true,
        delay: 2000
      },
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-next',
        prevEl: '.swiper-prev'
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 0,
          slidesPerGroup: 1
        },
        800: {
          slidesPerView: 2,
          spaceBetween: 10,
          slidesPerGroup: 1
        },
        1400: {
          slidesPerView: 2,
          spaceBetween: 10,
          slidesPerGroup: 1
        }
      }
    });
    swiper_marcas = new Swiper('.swiper-marcas', {
      loop: true,
      speed: 1000,
      autoplay: {
        enabled: true
      },
      navigation: {
        nextEl: '.swiper-next',
        prevEl: '.swiper-prev'
      },
      breakpoints: {
        0: {
          slidesPerView: 2,
          spaceBetween: 10,
          slidesPerGroup: 1
        },
        800: {
          slidesPerView: 2,
          spaceBetween: 10,
          slidesPerGroup: 1
        },
        1024: {
          slidesPerView: 6,
          spaceBetween: 10,
          slidesPerGroup: 1
        },
        1400: {
          slidesPerView: 6,
          spaceBetween: 10,
          slidesPerGroup: 1
        }
      }
    });
    swiper_brands = new Swiper('.swiper-brands', {
      loop: true,
      speed: 1000,
      noSwiping: true,
      noSwipingClass: 'swiper-slide',
      autoplay: {
        enabled: true
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 0,
          slidesPerGroup: 1
        }
      }
    });
    swiper_brands = new Swiper('.swiper-products', {
      loop: true,
      speed: 1000,
      autoplay: {
        enabled: true
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 10,
          slidesPerGroup: 1
        },
        800: {
          slidesPerView: 3,
          spaceBetween: 10,
          slidesPerGroup: 1
        }
      }
    });
    swiper_brands = new Swiper('.swiper-capacitacion', {
      loop: true,
      speed: 1000,
      autoplay: {
        enabled: true
      },
      breakpoints: {
        0: {
          slidesPerView: 3,
          spaceBetween: 0,
          slidesPerGroup: 1
        }
      }
    });
    $('.swiper-container').mouseenter(function() {
      return swiper_marcas.autoplay.stop();
    });
    $('.swiper-container').mouseleave(function() {
      return swiper_marcas.autoplay.start();
    });
    $('.swiper-container').mouseenter(function() {
      return swiper.autoplay.stop();
    });
    return $('.swiper-container').mouseleave(function() {
      return swiper.autoplay.start();
    });
  }
};

app.tabs = {
  init: function() {
    return $(".tabs").each(function() {
      var tab;
      tab = $(this);
      if (!tab.find(".tab--current").length) {
        app.tabs.open(tab, 0);
      }
      return tab.find(".tabs__header .tab").click(function(e) {
        var index;
        e.preventDefault();
        index = $(this).index();
        return app.tabs.open(tab, index);
      });
    });
  },
  open: function(tab, index) {
    tab.find(".tabs__header .tab").removeClass("tab--current");
    tab.find(".tabs__header .tab").eq(index).addClass("tab--current");
    tab.find(".tabs__body .tab").removeClass("tab--current");
    tab.find(".tabs__body .tab").eq(index).addClass("tab--current");
    if (app.scroll) {
      return app.scroll.dscroll();
    }
  }
};

$(document).ready(function() {
  var component, properties, results;
  results = [];
  for (component in app) {
    properties = app[component];
    if (properties.init) {
      results.push(properties.init());
    } else {
      results.push(void 0);
    }
  }
  return results;
});
