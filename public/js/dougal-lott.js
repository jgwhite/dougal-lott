if (Modernizr.touch) {

  $('body').bind('touchstart', function(e) {
    var moved = false;

    var doTap = function() {
      if (moved) return;

      var target  = $(e.target),
          article = target.closest('article');

      if (!article) return;

      if (target.attr('href') && !article.hasClass('flipped')) {
        target.one('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
        });
      }

      $('article').removeClass('flipped');
      article.addClass('flipped');
    }

    $(this).
    one('touchmove', function() { moved = true }).
    one('touchend', doTap);

    setTimeout(100, doTap);
  });

} else if (Modernizr.csstransforms3d) {

  $('article').
  mouseenter(function() { $(this).addClass('flipped') }).
  mouseleave(function() { $(this).removeClass('flipped') });

} else {

  $('article').
  mouseenter(function() { $(this).find('.details').animate({ opacity: 1 }, 'fast') }).
  mouseleave(function() { $(this).find('.details').animate({ opacity: 0 }) });

}

