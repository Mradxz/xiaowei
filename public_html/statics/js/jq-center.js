(function($){
	$.fn.center=function(settings){
		var style=$.extend({
					  position:'absolute',//absolute or fixed
					  top:'38%',			//50%即居中，将应用负边距计算，溢出不予考虑了。
					  left:'50%',
					  zIndex:888,
					  relative:true		//相对于包含它的容器居中还是整个页面
					  }, settings || {});
		return this.each(function(){
				  var $this=$(this);
				  style.marginTop=-$this.outerHeight()/2;
				  style.marginLeft=-$this.outerWidth()/2;
				  if(style.relative && !$this.parent().is('body') && $this.parent().css('position') == 'static')
					  $this.parent().css('position','relative');
				  delete style.relative;
				  //ie6
				  if(style.position == 'fixed' && 'undefined' == typeof(document.body.style.maxHeight)){
					  style.marginTop += $(window).scrollTop();
					  style.position = 'absolute';
					  $(window).scroll(function(){
							$this.stop().animate({
								  marginTop:$(window).scrollTop()-$this.outerHeight()/2
								  });
							});
				  }
				  $this.css(style);
			});
	};
})(jQuery);