window.lemonpi.subscribe(function(content) {
 // Animation part
 TweenMax.set('#ctaText', {alpha:0.7});
 var animation = new TimelineMax()
     .from('#product_title', 0.6, {y:-200, ease:Back.easeOut})
     .from('#product_image', 1.5, {rotation: 90, x:-500,ease:Back.easeOut}, 0.3)
     .from('#cta', 0.6, {y:200 ,ease:Back.easeOut}, 1)
     .from('#price', 0.8, {scale:0, ease:Elastic.easeOut}, 1.8)

// Set CTA color
 $('#cta_background').css({
     background: 'transparent',
     backgroundColor: content.cta_backgroundcolor.value
 });
});
