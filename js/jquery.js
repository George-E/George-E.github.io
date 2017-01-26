$(document).ready(function(){

			$('.materialboxed').materialbox();
			 $(".button-collapse").sideNav();

			$('.carousel').carousel({
				dist: -50,
				padding: 10,
				indicators: true
				
			})

  			$('html,body').animate({
        		scrollTop: $(window).scrollTop() -40
    		});
    		//to trigger scroll fire if jumping to a certain project
    		//wont appear until scrolled
    		//also served the purpose of centering project in screen


    		/*$('#rblxExtra').slideToggle(500);*/




			/*Materialize.showStaggeredList($('#animate1'));
			

			var options = [
				{selector: '#animate2', offset: 75, callback: function(el) {
					$('#scroll').hide();
      				Materialize.showStaggeredList($(el));
    				} },
				{selector: '#animate3', offset: 75, callback: function(el) {
      				Materialize.showStaggeredList($(el));
    				} },

    			{selector: '#animate4', offset: 75, callback: function(el) {
      				Materialize.showStaggeredList($(el));
   					 } },

   				{selector: '#animate5', offset: 75, callback: function(el) {
      				Materialize.showStaggeredList($(el));
   					 } },

   				{selector: '#animate6', offset: 75, callback: function(el) {
      				Materialize.showStaggeredList($(el));
   					 } }
   			];
  			Materialize.scrollFire(options);*/


  			$(".expand").click(function(){

  				$('.carousel').carousel({
				dist: -50,
				padding: 10,
				indicators: true
				});

				$expand = $(this);
	    		//getting the next element
	   			$content = $expand.next();
				$collapse = $content.next();
	    		//open up the content needed - toggle the slide- if visible, slide up, if not slidedown.
	    		$expand.hide();

	    		$content.find('ul').each(function() {
					Materialize.showStaggeredList($(this));
				});

	    		$content.find('img').each(function() {
					Materialize.fadeInImage($(this));
				});

	    		$collapse.show();
	    		$('html,body').animate({
          			scrollTop: $collapse.offset().top -100
        		});

				$content.slideToggle(500);
			});

			$(".collapse").click(function(){
				$collapse = $(this);
    			//getting the next element
    			$content = $collapse.prev();
				$expand = $content.prev();
    			//open up the content needed - toggle the slide- if visible, slide up, if not slidedown.
   				$collapse.hide();
   				$content.css('opacity', '0');
   				/*otherwise weird squishing is visible*/
   				$expand.show();
   				$('html,body').animate({
          			scrollTop: $expand.offset().top -400
        		});

				$content.slideToggle(500, function() { 
					$content.css('opacity', '1'); 
				} );
			});


			//$.ajax({ url: 'https://apisuperproxyconsole.appspot.com/query?id=ahZzfmFwaXN1cGVycHJveHljb25zb2xlchULEghBcGlRdWVyeRiAgICA-MKECgw', success: function(data) { alert(data); } });
/*
$(".project").hover(
	//The hover() method takes two functions and is a combination of the mouseenter() and mouseleave() methods.
function(){
   // alert("You entered p1!");
   $(this).css("background-color", "#ccc");
},
function(){
   // alert("Bye! You now leave p1!");
   $(this).css("background-color", "#fff");
});
*/

});
