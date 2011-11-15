(function() {

if (Modernizr.touch) {

  var ignore = function(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  $('body').bind('touchstart', function(e) {
    var target     = $(e.target),
        article    = target.closest('article'),
        moved      = false,
        isArticle  = article.length > 0,
        isFlipped  = article.hasClass('flipped'),
        shouldFlip = isArticle && !isFlipped;

    $(this).one('touchmove', function() { moved = true });

    if (shouldFlip) article.one('touchend', ignore);

    setTimeout(function() {
      if (moved) return;
      if (!isArticle || shouldFlip) $('article').removeClass('flipped');
      if (shouldFlip) article.addClass('flipped');
    }, 100);

  });

} else if (Modernizr.csstransforms3d) {

  $('article').
  mouseenter(function() { $(this).addClass('flipped') }).
  mouseleave(function() { $(this).removeClass('flipped') });

} else {

  $('article').
  mouseenter(function() { $(this).find('a').animate({ opacity: 1 }, 'fast') }).
  mouseleave(function() { $(this).find('a').animate({ opacity: 0 }) });

}

})();

