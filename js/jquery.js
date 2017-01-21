$(document).ready(function(){

			$('.materialboxed').materialbox();

			Materialize.showStaggeredList($('#animate1'));

			var options = [
				{selector: '#animate2', offset: 150, callback: function(el) {
      				Materialize.showStaggeredList($(el));
    				} },
				{selector: '#animate3', offset: 150, callback: function(el) {
      				Materialize.showStaggeredList($(el));
    				} },

    			{selector: '#animate4', offset: 150, callback: function(el) {
      				Materialize.showStaggeredList($(el));
   					 } }
   			];
  			Materialize.scrollFire(options);


  			$(".expand").click(function(){
				$expand = $(this);
	    		//getting the next element
	   			$content = $expand.next();
				$collapse = $content.next();
	    		//open up the content needed - toggle the slide- if visible, slide up, if not slidedown.
	    		$expand.hide();
	    		$content.css('opacity', '1');
	    		$('.extra li').css('opacity', '0');
				Materialize.fadeInImage('.extra');
				$content.slideToggle(500, function () {
	        		//execute this after slideToggle is done
	    			Materialize.showStaggeredList('.extra');
	        		$collapse.show();
			    });
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
				$content.slideToggle(500);
			});

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
