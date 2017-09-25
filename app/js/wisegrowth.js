$(document).ready(function(){

   // slider para la seccion de partners
      $('.owl-partners').owlCarousel({
         // animateOut: 'slideOutDown',
         // animateIn: 'flipInX',
   		loop: true,
   		autoplay: true,
   		margin: 10,
   		nav: true,
   		dots: true,
   		navText: ["<div class='prev'></div>", "<div class='next'></div>"],
   		responsive: {
   			0: {
   				items: 1
   			},
   			600: {
   				items: 1
   			},
   			1000: {
   				items: 1
   			}
   		}
   	});


      $('.banner--ancla').click(function(){
     	  if(location.pathname.replace(/^\//,'')==this.pathname.replace(/^\//,'')||location.hostname==this.hostname){
     	    var
     	    target=$(this.hash);
     	    target=target.length?target:$('[name='+this.hash.slice(1)+']');
     	    if(target.length){
     	      $('html,body').animate({
     	          scrollTop:target.offset().top-110
     	      },1000);
     	      return false;
     	    }
     	  }
     	});

      $(window).on('scroll', function(){
        var $window = $(this);

        $window.scrollTop() > 300
          ? $('.banner--ancla').css('opacity', '0')
          : $('.banner--ancla').css('opacity', '1');
      });


});
