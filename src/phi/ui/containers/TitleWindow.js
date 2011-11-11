/**
 *
 * script: TitleWindow.js
 * name: phi.ui.TitleWindow
 * 
 * description: This component is used to display a window with title.
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - phi/ui/containers/CellBox.js
 * 
 */
phi.ui.TitleWindow = new Class({
	Extends: phi.ui.Container,
	
	headerElement: null,
	titleElement: null,
	closeElement: null,
	bodyElement: null,
	drag: null,
	
	options: {
		title: null,
	},

	//-------------------------------------------------------------------
	// Protected functions
	//-------------------------------------------------------------------
	
	setTitle: function( value )
	{
		if( value === null || value === undefined )
			return;
			
		this.titleElement.set("html", value);
	},
	
	getTitle: function()
	{
		return this.titleElement.get("html");
	},
	
	onOptionsChange: function()
	{
		this.parent();
		this.setTitle( this.options.title );
		
	}.protect(),

	createElement: function()
	{
		var el = new Element("div");
		
		// Create Title & Body elements
		this.headerElement = new Element("div");
		this.headerElement.addEvent("mousedown", this.onHeaderClick.bind(this));
		
		this.titleElement = new Element("div", {html: ""});
		this.bodyElement = new Element("div");
		
		this.closeElement = new Element("div");
		this.closeElement.addEvent('click', function(){
			this.dispatchEvent("close");
		}.bind(this))
		
		// Indext Title & Body		
		this.closeElement.inject( this.headerElement );
		this.titleElement.inject( this.headerElement );
		
		this.headerElement.inject( el );
		this.bodyElement.inject( el );
		
		return el;
	}.protect(),
	
	initElement: function()
	{
		this.parent();
		
		this.headerElement.addClass("header");
		this.titleElement.addClass("title");
		this.bodyElement.addClass("body");
		this.closeElement.addClass("close");
		
		$(this).addClass("phi-TitleWindow");
		
	}.protect(),
	
	onChildAdded: function( event )
	{
		// If this is last child
		// inject at last element.
		if( event.index == this.children.length - 1 )
			$(event.child).inject( this.bodyElement );
		else		
			// If is not last inserted at specified index
			$(event.child).inject( $(this.getChildAt(event.index+1)), 'before' );
	},
	
	onChildRemoved: function( event )
	{
		$(event.child).dispose();
	},
	
	onAdded: function( event )
	{
	},
	
	onHeaderClick: function( event )
	{
		if( !this.drag )
		{
			var popUp = phi.mn.PopUpManager.getPopUpForView( this.getParent() );
			
			if( popUp )
			{
				console.log( popUp );
				
				// Drag ability
				this.drag = new Drag( $(popUp), {handle: this.headerElement} );
				this.drag.bound.start( event );
			}
		}
	}
});

/**
 * Factory method.
 * @param options.
 */
phi.ui.TitleWindow.create = function( options )
{
	var result = new phi.ui.TitleWindow( options );
	return result;
};
