/**
 *
 * script: Component.js
 * name: Phi.UI.Component
 * 
 * description: Simple UI component.
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - phi/ui/Component
 * 
 */
Phi.UI.Component = new Class({
	Extends: Phi.UI.Object,
	Binds: ['onResize'],
	
    element: null,
    parentComponent: null,
    className: null,
    displayAs: "block",
    
	options: {
		width: null,
		height: null,
		style: null,
		visible: undefined,
		enabled: undefined,
		buttonMode: undefined,
		paddingLeft: null,
		paddingTop: null,
		paddingRight: null,
		paddingBottom: null
	},
	
	model: {
	},
	
	initialize: function( options )
	{
		this.parent( options );
		
		// Add listners
		this.addEvent('added', this.onAdded);
		this.addEvent('removed', this.onRemoved);
				
		// Add resize event
		window.addEvent('resize', this.onResize);
	},
	
	addClass: function( className )
	{
		if( className === null )
			return;
			
		$(this).addClass( className );
	},
	
	removeClass: function( className )
	{
		$(this).removeClass( className );	
	},
	
	getPosition: function()
	{
		return $(this).getPosition();	
	},
	
	setWidth: function( value )
	{
		if( value === null )
			return;
			
		if( Number.isPercentage(value))
			$(this).setWidth( value);
		else
			$(this).setWidth( Number.withPx(value));
		
		this.dispatchEvent("widthChange", {value: value});
		return this;
	},
	
	setHeight: function( value )
	{
		if( value === null )
			return;
			
		if( Number.isPercentage(value))
			$(this).setHeight(value);
		else
			$(this).setHeight( Number.withPx(value));
			
		this.dispatchEvent("heightChange", {value: value});
		return this;
	},
	
	getWidth: function()
	{
		return $(this).getWidth();
	},
	
	getHeight: function()
	{
		return $(this).getHeight();
	},
	
	setSize: function( w, h )
	{
		this.setWidth(w);
		this.setHeight(h);	
	},
	
	setParent: function( value )
	{
		this.parentComponent = value;
	},
	
	getParent: function()
	{
		return this.parentComponent;	
	},
	
	getParentView: function()
	{
		if( instanceOf(this, Phi.Mvc.View))
			return this;
			
		if( this.getParent() )
			return this.getParent().getParentView();
			
		return null;	
	},
	
	setVisible: function( value )
	{
		if( value === undefined )
			return;
		
		if( (typeof value) == "string" )
			value = Boolean.fromString( value );
			
		if( value )
			$(this).setStyle("display", this.displayAs);
		else
			$(this).setStyle("display","none");
	},
	
	getVisible: function()
	{
		var dispaly = $(this).getStyle("display");
		return display != "none";
	},
	
	setEnabled: function( value )
	{
		if( value === undefined )
			return;
				
		if( (typeof value) == "string" )
			value = Boolean.fromString( value );
				
		if( value )
		{
			$(this).removeClass('disabled');
			$(this).erase('disabled');
		}
		else
		{
			$(this).addClass('disabled');
			$(this).set('disabled', 'disabled');
		}
	},
	
	getEnabled: function()
	{
		return !$(this).hasClass('disabled');
	},
	
	toElement: function()
	{
		if( this.element === null )
		{
			this.element = this.createElement();
			this.initElement();
		}
		
		return this.element;
	},
	
	isAddedToStage: function()
	{
		if( this.getParent() !== null )
			return this.getParent().isAddedToStage();
			
		if( $(this).getParent() !== null )
			return true;
			
		return false;
	},
	
	setPadding: function( side, size )
	{
		if( size === null )
			return;
			
		$(this).setStyle("padding-" + side, Number.withPx(size));
	},
	
	setButtonMode: function( value )
	{
		if( value === undefined )
			return;
		
		if( (typeof value) == "string" )
			value = Boolean.fromString( value );
			
		$(this).removeClass('buttonMode');
		
		if( value )
			$(this).addClass('buttonMode');
	},
	
	getButtonMode: function()
	{
		return $(this).hasClass('buttonMode');
	},
	
	//-------------------------------------------------------------------
	// Protected functions
	//-------------------------------------------------------------------
	
	/**
	 * Create element for each
	 * Phi.UI.Component.
	 */
	createElement: function()
	{
		throw new Error("CreateElement function not implemented.");
	}.protect(),
	
	/**
	 * Adds events and other options to 
	 * DOM element after the element was 
	 * created.
	 */
	initElement: function()
	{
		// Store instance
		$(this).store("instance", this);

		// Bubbles DOM element events 
		$(this).addEvent("click", $bubbleEvent.bind(this));
		$(this).addEvent("dblclick", $bubbleEvent.bind(this));
		$(this).addEvent("keydown",	$bubbleEvent.bind(this));
		$(this).addEvent("keypress", $bubbleEvent.bind(this));
		$(this).addEvent("keyup", $bubbleEvent.bind(this));
		$(this).addEvent("mousedown", $bubbleEvent.bind(this));
		$(this).addEvent("mousemove", $bubbleEvent.bind(this));
		$(this).addEvent("mouseout", $bubbleEvent.bind(this));
		$(this).addEvent("mouseover", $bubbleEvent.bind(this));
		$(this).addEvent("mouseup", $bubbleEvent.bind(this));
		$(this).addEvent("mouseenter", function(event) { event.type = "mouseenter";$bubbleEvent.bind(this)(event); }.bind(this));
		$(this).addEvent("mouseleave", function(event) { event.type = "mouseleave";$bubbleEvent.bind(this)(event); }.bind(this));
	}.protect(),
	
	onOptionsChange: function()
	{
		var op = this.options;
		
		// Set size
		this.setWidth( op.width );
		this.setHeight( op.height );
		
		// Add custom class
		this.addClass( op.style );
		
		// Set padding
		this.setPadding("left", op.paddingLeft);
		this.setPadding("top", op.paddingTop);
		this.setPadding("right", op.paddingRight);
		this.setPadding("bottom", op.paddingBottom);
		
		this.setButtonMode( op.buttonMode );
		this.setVisible( op.visible );
		this.setEnabled( op.enabled );
		
		// Create binds
		this.createWatchers();
		
	}.protect(),
	
	createWatchers: function()
	{
		var binds = this.binds;
		
		for( var key in binds )
		{
			Phi.Mn.BindManager.bindUsingView(
				binds[key].view, 	// View 
				this, 				// Target
				key, 				// TargetProperty
				binds[key].source, 	// Source relative to View
				binds[key].value	// SourceProperty
			);
		}
	},
	
	//-------------------------------------------------------------------
	// Handlers
	//-------------------------------------------------------------------
	
	onAdded: function( event )
	{
	},
	
	onRemoved: function( event )
	{
	},
	
	onResize: function( event )
	{
	}
});