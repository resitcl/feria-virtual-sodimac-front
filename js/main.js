var app;app=[],app.bg={init:function(){return $(".bg").each(function(){var e,n,t;return e=$(this),t=e.find("img").attr("src"),e.css({"background-image":"url("+t+")"}),n=new Image,n.src=t,n.onload=function(){return e.addClass("bg-loaded")}})}},app.carousel={current:0,duration:1e4,time:0,timeout:!1,init:function(){var e;return e=$(".carousel"),app.carousel.go(e,0,!0),app.carousel.setBar(e),app.carousel.eventSwipe(e),$(".carousel-thumbnail").click(function(){var e;return e=$(this).closest(".carousel"),app.carousel.go(e,$(this).index())})},next:function(e){var n;return n=e.find(".section__thumbs .carousel-thumbnail.current").index()+1,e.find(".carousel-content").eq(n).length||(n=0),this.go(e,n)},prev:function(e){var n;return n=e.find(".section__thumbs .carousel-thumbnail.current").index()-1,e.find(".carousel-content").eq(n).length||(n=0),this.go(e,n)},go:function(e,n,t){var r,a;return null==t&&(t=!1),this.time=0,this.current=n,a=50,t&&(a=0),e.find(".current").addClass("out").removeClass("current"),e.find(".carousel-thumbnail").find(".section__thumb__bar").css({width:"0%"}),e.find(".carousel-thumbnail").eq(n).addClass("current"),setTimeout(function(){return e.find(".out").removeClass("out"),e.find(".carousel-content").eq(n).addClass("current")},a),r=e.find(".carousel-thumbnail.current").index(),e.find(".carousel-content video").length&&(e.find("video")[r].pause(),e.find("video")[r].currentTime=0,e.find("video")[r].play()),this.autoplay(e)},autoplay:function(e){return clearTimeout(app.carousel.timeout),app.carousel.timeout=setTimeout(function(){return app.carousel.next(e)},this.duration)},setBar:function(e){return setInterval(function(){var n,t;return app.carousel.time+=50,n=e.find(".carousel-thumbnail.current").find(".section__thumb__bar"),t=100*app.carousel.time/app.carousel.duration,t>100&&(t=100),n.css({width:t+"%"})},50)},eventSwipe:function(e){return e.hammer().bind("swipeleft",function(e){return app.carousel.next($(this))}),e.hammer().bind("swiperight",function(e){return app.carousel.prev($(this))})}},app.faq={init:function(){return $(".faq").each(function(){var e;return e=$(this),e.find(".faq__item:not(.faq__open) .faq__answer").hide(),e.find(".faq__question").click(function(){var n;return n=$(this).parent().index(),app.faq.open(e,n)})})},open:function(e,n){return e.find(".faq__item").each(function(){return $(this).index()===n?($(this).find(".faq__answer").slideToggle(),$(this).toggleClass("faq__open")):($(this).find(".faq__answer").slideUp(),$(this).removeClass("faq__open"))})}},app.form={init:function(){var e;return e=/[^+\d]/g,$("#phone").keyup(function(){return""===$("#phone").val()&&$("#phone").val("+569"),$("#phone").val($("#phone").val().replace(e,""))}),$(app.form.classes.container).each(function(){return app.form.assign($(this))})},classes:{container:".form--validation",item:".form__element",inputs:"input,select,textarea"},assign:function(e,n){return e.find(app.form.classes.inputs).on("blur",function(){return app.form.validate($(this).closest(app.form.classes.item))})},validateGroup:function(e){var n;return n=!0,e.find(app.form.classes.item).each(function(){return app.form.validate($(this))||(n=!1),!0}),n},validate:function(e){var n,t,r,a,i,s;return t=e.find(app.form.classes.inputs),r=!0,t.val()||(r=!1),"rut"===t.attr("type")&&(i=t.val(),app.form.validaRut(i)===!0?(s=app.form.formateaRut(i),$(".input-rut").val(s)):($(".input-rut").val(""),r=!1)),"phone"===t.attr("number")&&(a=t.val(),a.length>=9?console.log(""):($(".input-phone").val(""),r=!1)),"account"===t.attr("number")&&(n=t.val(),n.length>=4?console.log(""):($(".input-account").val(""),r=!1)),"serie"===t.attr("number")&&(n=t.val(),n.length>=9&&n.length<=12?console.log(""):($(".input-serie").val(""),r=!1)),r?e.removeClass(app.form.classes.item.replace(".","")+"--error"):e.addClass(app.form.classes.item.replace(".","")+"--error"),r},validaRut:function(e){var n,t,r,a,i;for(a=e.replace(/[^0-9kK]+/g,"").slice(0,-1),t=parseInt(a),n=0,r=1;a;)r=(r+a%10*(9-n++%6))%11,a=Math.floor(a/10);return i=r?r-1:"K","K"===i&&e.slice(-1).toUpperCase()===i||"K"!==i&&parseInt(e.slice(-1))===i},formateaRut:function(e){var n,t,r,a,i,s,o,l,d;if(n=e.replace(/^0+/,""),""!==n&&n.length>1){for(d=n.replace(/\./g,""),t=d.replace(/-/g,""),i=t.substring(0,t.length-1),l="",a=0,s=1,a=i.length-1;a>=0;)o=i.charAt(a),l=o+l,s%3===0&&s<=i.length-1&&(l="."+l),s++,a--;r=t.substring(t.length-1),"K"===r&&(r="k"),l=l+"-"+r}return l}},app.header={init:function(){return app.header.nav.events(),$(".header__icon--hamburger").click(function(){return $("header").hasClass("header--nav-in")?($("header").removeClass("header--nav-in"),$("header").addClass("header-nav-out"),setTimeout(function(){return $("header").removeClass("header--nav-in header-nav-out")},200)):($("header").addClass("header--nav-in"),$("header").addClass("header--color"))})},onScroll:function(e){return e>10?$("header").addClass("header--color"):$("header").hasClass("header--nav-in")?void 0:$("header").removeClass("header--color")},nav:{events:function(){return $(".header__ham").on("click",function(e){return app.header.nav.toggle()}),$(".header__nav__close, .header__nav__bg").on("click",function(){return app.header.nav.out()}),$(".header__nav__nav li").each(function(){if($(this).find("ul").length||$(this).is("[supernav]"))return $(this).children("a").append("<span class='fa fa-angle-right'></span>")}),$(".header__nav__nav a").on("click",function(e){return app.header.nav.enterLvl($(this),e)}),$(".header__nav__back").on("click",function(){return app.header.nav.backLvl()})},toggle:function(){return $("header").is(".header--nav-in")?this.out():this["in"]()},"in":function(){if(!$("header").hasClass("header--nav-out"))return $("header").addClass("header--nav-in")},out:function(){if(!$("header").hasClass("header--nav-out"))return $("header").addClass("header--nav-out"),setTimeout(function(){return $("header").removeClass("header--nav-out"),$("header").removeClass("header--nav-in"),app.header.nav.backLvl()},500)},enterLvl:function(e,n){if(e.siblings("ul").length&&$(window).width()<1090)return n.preventDefault(),e.siblings("ul").addClass("ul--in"),$(".header__nav").addClass("header__nav--ul-in")},backLvl:function(){if($(".header__nav--ul-in").length)return $(".header__nav").removeClass("header__nav--ul-in"),$(".header__nav__nav ul.ul--in").addClass("ul--out"),setTimeout(function(){return $(".header__nav__nav ul.ul--in").removeClass("ul--in ul--out")},500)}}},app.modal={init:function(){return $("[data-modal-register]").click(function(e){return e.preventDefault(),app.modal.open(".modal--register")}),$("[data-modal-inscripcion]").click(function(e){return e.preventDefault(),app.modal.close($(".modal--login")),app.modal.open(".modal--register")}),$("[data-modal-login]").click(function(e){return e.preventDefault(),app.modal.open(".modal--login")}),$("[data-modal-contact]").click(function(e){return e.preventDefault(),app.modal.open(".modal--contact")}),$("[data-modal-pictures]").click(function(e){return e.preventDefault(),app.modal.open(".modal--pictures")}),$("[data-modal-profile]").click(function(e){return e.preventDefault(),app.modal.open(".modal--profile")}),$("[data-modal-videos]").click(function(e){return e.preventDefault(),app.modal.open(".modal--videos")}),$(".modal__close").click(function(){return app.modal.close($(this).closest(".modal"))}),$(".modal").click(function(e){if($(e.target).hasClass("modal__front"))return app.modal.close($(this).closest(".modal"))}),$("#videohome").bind("ended",function(){return app.modal.close($(".modal--video"))}),$("[data-sound-on]").click(function(e){return $(this).removeClass("modal__sound__icon--show"),$("[data-sound-off]").addClass("modal__sound__icon--show"),jQuery("#videohome").prop("muted",!1)}),$("[data-sound-off]").click(function(e){return $(this).removeClass("modal__sound__icon--show"),$("[data-sound-on]").addClass("modal__sound__icon--show"),jQuery("#videohome").prop("muted",!0)})},open:function(e){return $(e).addClass("modal--in")},close:function(e){return null==e&&(e=!1),e||(e=$(".modal")),e.removeClass("modal--in").addClass("modal--out"),setTimeout(function(){return e.removeClass("modal--out")},200)}},app.scroll={init:function(){var e;if(app.scroll.trigger(),app.scroll.checkGoto(),setInterval(function(){return app.scroll.trigger()},500),$(window).scroll(function(){return app.scroll.trigger(),app.scroll.checkGoto()}),window.addEventListener("scroll",function(){return window.scrollY>50?($("header").addClass("header--min"),$("header").addClass("header--color")):($("header").removeClass("header--min"),$("header").removeClass("header--color"))}),$("[data-goto]").click(function(e){return e.preventDefault(),app.scroll["goto"]($(this).attr("data-goto")),console.log("data")}),e=window.location.hash.replace("#",""),""!==e)return app.scroll["goto"]($(".section--"+e))},trigger:function(){return app.scroll.dscroll(),app.scroll.parallax(),app.scroll.sticky()},dscroll:function(){var e,n,t;if(t=$(window).scrollTop(),$(".dscroll").length)return n=0,e=0,$(".dscroll:visible").each(function(){var r,a,i;if(a=$(this),i=a.offset().top,t+$(window).height()>i&&(a.addClass("dscroll--in"),i>=n-25&&i<=n+25?(e++,r=.2*e,a.css({"-webkit-animation-delay":r+"s","animation-delay":r+"s"})):e=0,n=i),t+$(window).height()<=i)return a.removeClass("dscroll--in")})},parallax:function(){var e;if(e=$(window).scrollTop(),$("[parallax]").length)return $("[parallax]").each(function(){var n,t,r,a,i;return r=$(this).attr("parallax").split(","),a=parseFloat(r[0]),i=parseFloat(r[1]),n=e*a,t=e*i,$(this).css({"-webkit-transform":"translate("+n+"px,"+t+"px)","-ms-transform":"translate("+n+"px,"+t+"px)",transform:"translate("+n+"px,"+t+"px)"})})},sticky:function(){var e;if(e=$(window).scrollTop(),$("[sticky]").length)return $("[sticky]").each(function(){var n,t,r;return r=e+$("header").height()+60,n=$(this),t=n.offset().top,r>t?n.addClass("sticked"):n.removeClass("sticked")})},"goto":function(e,n,t){var r,a;if(null==n&&(n=0),null==t&&(t=1e3),r=$("[data-goto='"+e+"']"),n||(n=$("header").height()+80,r.closest("[sticky]").length&&(n+=r.closest("[sticky]").height())),$(e).length)return a=$(e).offset().top-n,$("body,html").animate({scrollTop:a},t)},checkGoto:function(){var e,n;return n=$(window).scrollTop(),e=-1,$("[data-goto]").each(function(){var t,r,a;if(r=$(this),a=$($(this).attr("data-goto")),t=$("header").height()+120,r.closest("[sticky]").length&&(t+=r.closest("[sticky]").height()),a.length&&n+t+2>=a.offset().top)return $("[data-goto].contener__tag--current").removeClass("contener__tag--current"),r.addClass("contener__tag--current"),e=a.index()}),e>2?$(".contener__nav__sticky").scrollLeft(500):$(".contener__nav__sticky").scrollLeft(0)}},function(e){"function"==typeof define&&define.amd?define(["jquery","hammerjs"],e):"object"==typeof exports?e(require("jquery"),require("hammerjs")):e(jQuery,Hammer)}(function(e,n){var t;t=function(t,r){var a;a=e(t),a.data("hammer")||a.data("hammer",new n(a[0],r))},e.fn.hammer=function(e){return this.each(function(){t(this,e)})},n.Manager.prototype.emit=function(n){return function(t,r){n.call(this,t,r),e(this.element).trigger({type:t,gesture:r})}}(n.Manager.prototype.emit)}),app.slider={init:function(){return $(".slider").each(function(){return app.slider.createElements($(this)),app.slider.go($(this),0),app.slider.autoplay($(this)),app.slider.eventSwipe($(this))}),$(document).on("click",".slider .slider-nav-left",function(){return app.slider.prev($(this).closest(".slider"))}),$(document).on("click",".slider .slider-nav-right",function(){return app.slider.next($(this).closest(".slider"))}),$(document).on("click",".slider .slider-bullet",function(){return app.slider.go($(this).closest(".slider"),$(this).index())}),$(document).on("click",".section__thumbs .col-md-12",function(){var e;return e=$(this).closest(".slides"),app.thumb.go(e,$(this).index()),app.slider.go($(this).closest(".slider"),$(this).index())})},eventSwipe:function(e){return e.hammer().bind("swipeleft",function(e){return app.slider.next($(this))}),e.hammer().bind("swiperight",function(e){return app.slider.prev($(this))})},create:function(e){var n,t,r,a,i;for(i="",t=0,r=e.length;t<r;t++)n=e[t],i+="<div class='slide'>"+n+"</div>";return a="<div class='slider slider-cover'>"+i+"</div>"},createElements:function(e){var n;if(e.find("slider-slides").length||e.find(".slide").wrapAll("<div class='slider-slides' />"),e.find(".slide").length>1)return n="",n+="<div class='slider-navigation'>",n+="<div class='slider-nav slider-nav-left'><span class='fa fa-angle-left'></span></div>",n+="<div class='slider-nav slider-nav-right'><span class='fa fa-angle-right'></span></div>",n+="</div>",n+="<div class='slider-bullets'><div class='slider-bullets-limit'></div></div>",e.append(n),e.find(".slide").each(function(){return e.find(".slider-bullets .slider-bullets-limit").append("<div class='slider-bullet'></div>")})},next:function(e){var n,t;return n=e.find(".slide.slide-current").index(),t=n+1,t>=e.find(".slide").length&&(t=0),app.slider.go(e,t,"right"),e.find("video")[0].stop()},prev:function(e){var n,t;return n=e.find(".slide.slide-current").index(),t=n-1,t<0&&(t=e.find(".slide").length-1),app.slider.go(e,t,"left")},go:function(e,n,t){var r;if(null==t&&(t=!1),r=e.find(".slide.slide-current").index(),!e.hasClass("slider-animate")&&r!==n&&(!t&&r>=0&&(t=r<n?"right":"left"),e.removeClass("slider-dir-left slider-dir-right"),e.addClass("slider-animate"),t&&e.addClass("slider-dir-"+t),e.find(".slide.slide-current").addClass("slide-out").removeClass("slide-current"),e.find(".slide").eq(n).addClass("slide-current"),e.find(".slider-bullet").removeClass("slider-bullet-current").eq(n).addClass("slider-bullet-current"),setTimeout(function(){return e.find(".slide-out").removeClass("slide-out"),e.removeClass("slider-animate")},500),e.find("video").length))return e.find("video")[0].play()},autoplay:function(e){var n,t;return t=!1,(n=function(){var r;return clearTimeout(t),r=$(".slides"),t=$(e).hasClass("slider--news")===!0?setTimeout(function(){return e.each(function(){return app.slider.next($(this)),app.thumb.next($(this))}),n()},15e3):setTimeout(function(){return e.each(function(){return app.slider.next($(this)),app.thumb.next($(this))}),n()},1e4)})()}},app.swiper={init:function(){var e,n,t,r;return e=new Swiper(".swiper-social",{loop:!0,speed:1e3,autoplay:{enabled:!0,delay:2e3},nextButton:".swiper-button-next",prevButton:".swiper-button-prev",pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-next",prevEl:".swiper-prev"},breakpoints:{0:{slidesPerView:1,spaceBetween:0,slidesPerGroup:1},800:{slidesPerView:2,spaceBetween:10,slidesPerGroup:1},1200:{slidesPerView:3,spaceBetween:10,slidesPerGroup:1},1500:{slidesPerView:4,spaceBetween:10,slidesPerGroup:1}}}),r=new Swiper(".swiper-news",{loop:!0,speed:1e3,autoplay:{enabled:!0,delay:2e3},nextButton:".swiper-button-next",prevButton:".swiper-button-prev",pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-next",prevEl:".swiper-prev"},breakpoints:{0:{slidesPerView:1,spaceBetween:0,slidesPerGroup:1},800:{slidesPerView:2,spaceBetween:10,slidesPerGroup:1},1400:{slidesPerView:2,spaceBetween:10,slidesPerGroup:1}}}),t=new Swiper(".swiper-marcas",{loop:!0,speed:1e3,autoplay:{enabled:!0},navigation:{nextEl:".swiper-next",prevEl:".swiper-prev"},breakpoints:{0:{slidesPerView:2,spaceBetween:10,slidesPerGroup:1},800:{slidesPerView:2,spaceBetween:10,slidesPerGroup:1},1024:{slidesPerView:6,spaceBetween:10,slidesPerGroup:1},1400:{slidesPerView:6,spaceBetween:10,slidesPerGroup:1}}}),n=new Swiper(".swiper-brands",{loop:!0,speed:1e3,noSwiping:!0,noSwipingClass:"swiper-slide",autoplay:{enabled:!0},breakpoints:{0:{slidesPerView:1,spaceBetween:0,slidesPerGroup:1}}}),n=new Swiper(".swiper-products",{loop:!0,speed:1e3,autoplay:{enabled:!0},breakpoints:{0:{slidesPerView:1,spaceBetween:10,slidesPerGroup:1},800:{slidesPerView:3,spaceBetween:10,slidesPerGroup:1}}}),n=new Swiper(".swiper-capacitacion",{loop:!0,speed:1e3,autoplay:{enabled:!0},breakpoints:{0:{slidesPerView:3,spaceBetween:0,slidesPerGroup:1}}}),$(".swiper-container").mouseenter(function(){return t.autoplay.stop()}),$(".swiper-container").mouseleave(function(){return t.autoplay.start()}),$(".swiper-container").mouseenter(function(){return e.autoplay.stop()}),$(".swiper-container").mouseleave(function(){return e.autoplay.start()})}},app.tabs={init:function(){return $(".tabs").each(function(){var e;return e=$(this),e.find(".tab--current").length||app.tabs.open(e,0),e.find(".tabs__header .tab").click(function(n){var t;return n.preventDefault(),t=$(this).index(),app.tabs.open(e,t)})})},open:function(e,n){if(e.find(".tabs__header .tab").removeClass("tab--current"),e.find(".tabs__header .tab").eq(n).addClass("tab--current"),e.find(".tabs__body .tab").removeClass("tab--current"),e.find(".tabs__body .tab").eq(n).addClass("tab--current"),app.scroll)return app.scroll.dscroll()}},$(document).ready(function(){var e,n,t;t=[];for(e in app)n=app[e],n.init?t.push(n.init()):t.push(void 0);return t});