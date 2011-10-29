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
	
	options: {
		width: null,
		height: null,
		style: null,
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
		this.addEvent('addedToStage', this.onAddedToStage);
				
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
		
		this.dispatchEvent(new Phi.Events.Event("widthChange"));
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
			
		this.dispatchEvent(new Phi.Events.Event("heightChange"));
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
		this._parent = value;
	},
	
	getParent: function()
	{
		return this._parent;	
	},
	
	getParentView: function()
	{
		if( instanceOf(this, Phi.UI.View))
			return this;
			
		if( this.getParent() )
			return this.getParent().getParentView();
			
		return null;	
	},
	
	setVisible: function(value)
	{
		if( value == null )
			return;
			
		if(value)
			$(this).setStyle("display", this.oldDisplay);
		else
		{
			this.oldDisplay = $(this).getStyle("display");
			$(this).setStyle("display","none");
		}
	},
	
	getVisible: function()
	{
		var dispaly = $(this).getStyle("display");
		return display != "none";
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
		
	}.protect(),
	
	updateBinds: function( view )
	{
		var newOptions = Object.clone( this.options );
		var bind  = this.options.bind;

		for ( var prop in this.options.bind ) 
		{
            if( bind[ prop ].object )
            {
                var model  = view[ bind[ prop ].object ];

                if( model !== null )
                    newOptions[ prop ] = model.get([ bind[ prop ].value ]); 
            }
        }
        
        this.setOptions( newOptions );
	},
	
	//-------------------------------------------------------------------
	// Handlers
	//-------------------------------------------------------------------
	
	onAdded: function( event )
	{
		// dispatch ADDED_TO_STAGE
		if( this.isAddedToStage() )		
			this.propagateEvent( new Phi.Events.ChildEvent( "addedToStage" ));
	},
	
	onRemoved: function( event )
	{
	},
	
	onAddedToStage: function( event )
	{
	},
	
	onResize: function( event )
	{
	}
});