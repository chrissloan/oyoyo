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
		sliderTabsClass: "slider_tabs",
		selectedTabClass: "highlighted"
	},
	
	initialize: function(element, options){
		
		Object.extend(this.options, options);
		
		this.el = $('element');
		this.elid = element;
		
		this.sliderHolder = $$('#' + this.elid + ' .' + this.options.sliderHolderClass);
		this.sliderTrack = $$('#' + this.elid + ' .' + this.options.sliderTrackClass);
		this.sliderElements = $$('#' + this.elid + ' .' + this.options.sliderElementClass);
		
		if(this.options.useTabs){
			this.options.slideBy = 1;
			this.tabsObject = $$('.' + this.options.sliderTabsClass);
			
			this.tabsObject.each(function(item,index){
				this.tabs = item.childElements();
				this.tabs.each(function(element, index){
					if (index == 0){
						element.addClassName(this.options.selectedTabClass);
					}
					var link = element.childElements();
					link[0].observe('click', function(item, index){
						this.manageClassNames(index);
						
						
						index = index + 1;
						this.moveByTab(index, this.tabs.size());
		      }.bindAsEventListener(this,index));
				}.bind(this));
			}.bind(this));
			
			
		}
		
		this.nextButtons = $$('#' + this.elid + ' .' + this.options.sliderNextButton);
		this.previousButtons = $$('#' + this.elid + ' .' + this.options.sliderPreviousButton);
		
		this.elWidth = this.sliderElements[0].getWidth() * this.options.slideBy;
		
		this.trackWidth = this.sliderElements[0].getWidth() * this.sliderElements.length;
		//this.totalLength = ((this.sliderElements.length - 1) * (this.elWidth))  - (this.elWidth * this.options.slideBy);
		this.totalLength = (this.elWidth * ((this.trackWidth / this.elWidth).ceil())) - this.elWidth;
		console.log(this.trackWidth);
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
				this.slideNext();
				if(this.options.useTabs){
					var currentIndex = (this.currentPosition.left / this.elWidth).abs() + 1;
					if(currentIndex == this.tabs.length){
						currentIndex = 0;
					}
					console.log(currentIndex);
					this.manageClassNames(currentIndex);
				}
      }.bindAsEventListener(this,index));
		}.bind(this));
		
		this.previousButtons.each(function(item, index){
			item.observe('click', function(item, index){
				this.slidePrevious();
				if(this.options.useTabs){
					var currentIndex = (this.currentPosition.left / this.elWidth).abs() - 1;
					if(currentIndex < 0){
						currentIndex = this.tabs.length - 1;
					}
					console.log(currentIndex);
					this.manageClassNames(currentIndex);
				}
      }.bindAsEventListener(this,index));
		}.bind(this));
	},
	
	slideNext: function(){
		this.currentPosition = this.sliderTrack[0].positionedOffset();
		
		if(this.currentPosition.left == -this.totalLength){
			new Effect.Move(this.sliderTrack[0], {x:this.totalLength});
		}else{
			new Effect.Move(this.sliderTrack[0], {x:-this.elWidth});
		}
		console.log(this.currentPosition.left)
	},
	
	slidePrevious: function(){
		this.currentPosition = this.sliderTrack[0].positionedOffset();
		if(this.currentPosition.left == 0){
			new Effect.Move(this.sliderTrack[0], {x:-this.totalLength});
		}else{
			new Effect.Move(this.sliderTrack[0], {x:this.elWidth});
		}
	},
	
	moveByTab: function(index, totalCount){
		this.currentPosition = this.sliderTrack[0].positionedOffset();
		var currentIndex = (this.currentPosition.left / this.elWidth).abs() + 1;
		var theIndex = index - currentIndex;
		var moveBy = (theIndex * this.elWidth);

		new Effect.Move(this.sliderTrack[0], {x:-moveBy});
		
	},
	
	manageClassNames: function(index){
		this.tabs.each(function(element){
			element.removeClassName(this.options.selectedTabClass);
		}.bind(this));
		this.tabs[index].addClassName(this.options.selectedTabClass);
	}
	

});

//-------------------
// DROPDOWN CLASS
//-------------------
var yoDropdown = Class.create({
	
	options: {
		togglerClass: "yoDropdown",
		togglerActivatedClass: "yoDropdown-active",
		dropdownBoxClass: "dropdown_box",
		activationType: "mouseover"
	},
	
	initialize: function(element, options){
		
		Object.extend(this.options, options);
		
		if(element){
			this.el = $(element);
			this.elid = element;
		}else{
			this.el = $$('.' + this.options.togglerClass);
			
		}
		
		this.el.each(function(item, index){
			var togglerContainer = item.down(0); // find the 'li' element for the toggler
			var togglerLink = item.down(1);
			var dropdown = item.down(1).next('.' + this.options.dropdownBoxClass); // container box for drop down
			dropdown.setStyle({'position':'absolute'});
			dropdown.hide();
				
			this.activate(togglerContainer, togglerLink, dropdown);

		}.bind(this));
		
	},
	
	activate: function(togglerContainer, togglerLink, dropdown){
			switch (this.options.activationType){

				case "click":
					togglerContainer.observe(this.options.activationType, function(item, index){
							if(dropdown.getStyle('display') == "none"){
								new Effect.BlindDown(dropdown, {duration:.5});
								togglerLink.addClassName('yoDropdown-activated');
							}else{
								new Effect.BlindUp(dropdown, {duration:.5});
								togglerLink.removeClassName('yoDropdown-activated');
							}
		      }.bindAsEventListener(this));
					break;

				default:

					togglerContainer.observe(this.options.activationType, function(item, index){
							dropdown.show();
							togglerLink.addClassName('yoDropdown-activated');
		      }.bindAsEventListener(this));

					togglerContainer.observe("mouseout", function(item, index){
						dropdown.hide();
						togglerLink.removeClassName('yoDropdown-activated');
		      }.bindAsEventListener(this));
					break;

			}
	}
	

});

//-------------------
// EXPANDER CLASS
//-------------------
var yoExpand = Class.create({
	
	options: {
		togglerClass: "yoExpander",
		expandedClass: "expanded",
		hiddenElementClass: "hidden_element",
		hideText: "show less",
		method: null,
		duration: 1,
		initiallyHide: true
	},
	
	initialize: function(options){
		
		Object.extend(this.options, options);
		
		this.el = $$('.' + this.options.togglerClass);
		this.hidden_elements = $$('.' + this.options.hiddenElementClass);		
		
		if(this.options.initiallyHide){
			this.hidden_elements.each(function(item){
				item.hide();
			}.bind(this));
		}
		
		this.el.each(function(item, index){
			
			var togglerInitialText = item.innerHTML;
			var hidden_element = this.hidden_elements[index];
			
			item.observe('click', function(event, index){
				var toggler = event.target;
				this.activate(toggler, hidden_element, togglerInitialText);
      }.bindAsEventListener(this,index));	
			
		}.bind(this));
		
	},
	
	activate: function(toggler, hidden_element, togglerInitialText){
		
		if(hidden_element.getStyle("display") == "none"){
			switch (this.options.method){
				case "blind":
					Effect.BlindDown(hidden_element, {duration: this.options.duration});
					break;
					
				case "slide":
					Effect.SlideDown(hidden_element, {duration: this.options.duration});
					break;
					
				case "fade":
					Effect.Appear(hidden_element, {duration: this.options.duration});
					break;
						
				default:
					hidden_element.show();
					
			}
			toggler.addClassName(this.options.expandedClass);
			toggler.update(this.options.hideText);
		}else{
			switch (this.options.method){
				case "blind":
					Effect.BlindUp(hidden_element, {duration: this.options.duration});
					break;
					
				case "slide":
					Effect.SlideUp(hidden_element, {duration: this.options.duration});
					break;
					
				case "fade":
					Effect.Fade(hidden_element, {duration: this.options.duration});
					break;
					
				default:
					hidden_element.hide();
			}
			toggler.update(togglerInitialText);
			toggler.removeClassName(this.options.expandedClass);
		}
		
	}
	

});

//-------------------
// TABS CLASS
//-------------------
var yoTabIt = Class.create({
	
	options: {
		tabSelectedClass: "selected"
	},
	
	initialize: function(options){
		
		Object.extend(this.options, options);
		
		this.el = $(element);
		this.elid = element;		
		this.links = [];
		
		this.tabs = this.el.childElements();
		
		
	},
	
	activate: function(){
		
		
		
	}
	

});