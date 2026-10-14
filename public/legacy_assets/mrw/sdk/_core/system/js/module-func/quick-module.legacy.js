$(document).ready(function() {
  $(".qimg_li").hover(function() {
    $(this).children(".qimg_setup").show();
  },
  function() {
    $(this).children(".qimg_setup").hide();
  });
});