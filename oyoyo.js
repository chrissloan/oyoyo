/*-----------------------------------------------------
OYOYO LIBRARY v. 1
Utilizes the Prototype Library: http://www.prototype.org

Author: Chris Sloan
Website: http://www.chrissloan.info
License: Open Source MIT Licence
-----------------------------------------------------*/


//-------------------
// SLIDER CLASS
//-------------------
var yoSlider = Class.create({
	
	options: {
		sliderHolderClass: "slider_holder",
		sliderElementsContainerClass: "slider_innards",
		sliderElementClass: "slider_item",
		sliderNextButton: "slider_next",
		sliderPreviousButton: "slider_previous"
	},
	
	initialize: function(element, options){
		
		Object.extend(this.options, options);
		
		this.el = $('element');
		this.elid = element;
		
		this.sliderHolders = $$('#' + this.elid + ' .' + this.options.sliderHolderClass);
		this.sliderElementsContainer = $$('#' + this.elid + ' .' + this.options.sliderElementsContainerClass);
		this.sliderElements = $$('#' + this.elid + ' .' + this.options.sliderHolderClass);
		this.nextButtons = $$('#' + this.elid + ' .' + this.options.sliderNextButton);
		this.previousButtons = $$('#' + this.elid + ' .' + this.options.sliderPreviousButton);
		
		this.nextButtons.each(function(item, index){
			item.observe('click', function(item, index){
				this.slideNext(index);
      }.bindAsEventListener(this,index));
		}.bind(this));
	},
	
	slideNext: function(index){
		alert(index);
	}
	

});
