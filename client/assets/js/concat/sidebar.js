(function () {
    var activeHash = window.location.hash;
    activeHash ? $('.sidebar a[href="' + activeHash + '"]').addClass('active') : $($('.sidebar a')[0]).addClass('active');
})();

$('.sidebar a').click(function () {
    $('.sidebar a.active').removeClass('active');
    $(this).addClass('active');
});