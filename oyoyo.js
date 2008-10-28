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
		sliderTrackClass: "slider_track",
		sliderElementClass: "slider_item",
		sliderNextButton: "slider_next",
		sliderPreviousButton: "slider_previous",
		slideBy: 1,
		useTabs: false,
		sliderTabsClass: "slider_tabs"
	},
	
	initialize: function(element, options){
		
		Object.extend(this.options, options);
		
		this.el = $('element');
		this.elid = element;
		
		this.sliderHolder = $$('#' + this.elid + ' .' + this.options.sliderHolderClass);
		this.sliderTrack = $$('#' + this.elid + ' .' + this.options.sliderTrackClass);
		this.sliderElements = $$('#' + this.elid + ' .' + this.options.sliderElementClass);
		
		if(this.options.useTabs){
			this.tabsObject = $$('.' + this.options.sliderTabsClass);
			console.log(this.tabsObject);
			//this.tabs = this.tabsObject.childElements();
		}
		
		this.nextButtons = $$('#' + this.elid + ' .' + this.options.sliderNextButton);
		this.previousButtons = $$('#' + this.elid + ' .' + this.options.sliderPreviousButton);
		
		this.elWidth = this.sliderElements[0].getWidth() * this.options.slideBy;
		
		this.trackWidth = this.elWidth * this.sliderElements.length;
		this.totalLength = ((this.sliderElements.length - 1) * (this.elWidth))  - (this.elWidth * this.options.slideBy);
		console.log(this.totalLength);
		this.elHeight = 0;
		this.sliderElements.each(function(item){
			if(item.getHeight() > this.elHeight){
				this.elHeight = item.getHeight();
			}
		}.bind(this));
		
		this.sliderTrack[0].setStyle({'width': this.trackWidth + "px"});
		this.sliderHolder[0].setStyle({'height': this.elHeight + "px", 'width': this.elWidth + "px"});

		
		this.nextButtons.each(function(item, index){
			item.observe('click', function(item, index){
				
				this.slideNext(index);
				//this.checkPosition();
      }.bindAsEventListener(this,index));
		}.bind(this));
		
		this.previousButtons.each(function(item, index){
			item.observe('click', function(item, index){
				this.slidePrevious(index);
      }.bindAsEventListener(this,index));
		}.bind(this));
	},
	
	slideNext: function(index){
		this.currentPosition = this.sliderTrack[0].positionedOffset();
		
		if(this.currentPosition.left == -this.totalLength){
			new Effect.Move(this.sliderTrack[0], {x:this.totalLength});
		}else{
			new Effect.Move(this.sliderTrack[0], {x:-this.elWidth});
		}

	},
	
	slidePrevious: function(index){
		this.currentPosition = this.sliderTrack[0].positionedOffset();
		if(this.currentPosition.left == 0){
			new Effect.Move(this.sliderTrack[0], {x:-this.totalLength});
		}else{
			new Effect.Move(this.sliderTrack[0], {x:this.elWidth});
		}
	}
	

});