$(".best").slick({
  dots: false,
  infinite: true,
  speed: 300,
  slidesToShow: 4,
  lazyLoad: "ondemand",
  autoplay: true,
  autoplaySpeed: 2000,
  slidesToScroll: 4,
  arrows: true,
  prevArrow: "<button type='button' class='slick-prev'>&#8592</button>",
  nextArrow: "<button type='button' class='slick-next'>&#8594</button>",
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ],
});

// inner product slider//
$(".slider-for").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  lazyLoad: "ondemand",
  asNavFor: ".slider-nav",
  pauseOnHover: false,
});
$(".slider-nav").slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  asNavFor: ".slider-for",
  dots: false,
  centerMode: true,
  focusOnSelect: true,
  arrows: true,
  prevArrow: "<button type='button' class='slick-prev'>&#8592</button>",
  nextArrow: "<button type='button' class='slick-next'>&#8594</button>",
  lazyLoad: "ondemand",
  autoplay: true,
  autoplaySpeed: 2000,
});

//copy to clipboard//
function copyToClipboard(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).text()).select();
  document.execCommand("copy");
  $temp.remove();
  myFunction();
}
