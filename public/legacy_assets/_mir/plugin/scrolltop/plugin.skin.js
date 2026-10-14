var offsetval = 350;   // 수직으로 약간 움직여야 함
var duration = 100;   // 최상단으로 이동할때까지의 animate 시간 (밀리세컨드, default는 400. 예제의 기본은 500)
function scrolltotop(durationval,offsetval,f1,f2,f3,f4,f5) {
	if ($(this).scrollTop() > offsetval) {
		$('.back-to-top,.editingsetup').fadeIn(duration);
	} else {
		$('.back-to-top,.editingsetup').fadeOut(duration);
	}
}

$(document).ready(function() {
	$('.back-to-top').click(function(event) {
		event.preventDefault();
		$('html, body').animate({scrollTop: 0}, duration);
		return false;
	})
});
$(window).scroll(function() {
	scrolltotop(duration,offsetval,'','','','','');
});
$(window).load(function() {
	scrolltotop(duration,offsetval,'','','','','');
});