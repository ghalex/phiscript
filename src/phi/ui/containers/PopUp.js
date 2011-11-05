/**
 *
 * script: PopUp.js
 * name: Phi.UI.PopUp
 * 
 * description: This container is used by PopUpManager to display a Phi.UI.Component in a popup.
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - phi/ui/containers/Container.js
 * 
 */
Phi.UI.PopUp = new Class({
	Extends: Phi.UI.Container,
	Binds: ['onWindowMouseUp'],
	
	uid: "",
	options: {
		hideOnClick: false,
		relativeTo: null,
		allowNegative: false
	},
	
	initialize: function( options )
	{
		this.parent( options );
		window.addEvent('mouseup', this.onWindowMouseUp);
	},
	
	center: function()
	{
		$(this).position();
	},
	
	snapTo: function( component, side )
	{
		if( !side )
			side = PopUpSnap.BOTTOM;
			
		// Show popup first
		this.show();
		
		// Snap to Phi.UI.Component
		$(this).position({
			relativeTo: $(component),
			position: PopUpSnap.mapSide[side],
			edge: PopUpSnap.mapEdge[side],
			allowNegative: true
		});
	},
	
	snapToElement: function( element, att )
	{
		// Show popup first
		this.show();
		
		// Snap to HTML element
		att.relativeTo = element;
		att.allowNegative = true;
		
		$(this).position( att );
	},
	
	setX: function( x )
	{
		$(this).setStyle('left', x);
	},
	
	setY: function( y )
	{
		$(this).setStyle('top', y);
	},
	
	setPosition: function( x, y )
	{
		this.setX( x );
		this.setY( y );
	},
	
	hide: function()
	{
		Phi.Mn.PopUpManager.removePopUp( this );
		return this;
	},
	
	show: function( modal )
	{
		Phi.Mn.PopUpManager.addPopUp( this, modal );
		return this;
	},
	
	isVisible: function()
	{
		var rootBox = Phi.UI.RootBox.get();
		return rootBox.hasChild( this );
	},
	
	//-------------------------------------------------------------------
	// Protected functions
	//-------------------------------------------------------------------
	
	onChildAdded: function( event )
	{
		$(event.child).inject( $(this) );
	},
	
	onChildRemoved: function( event )
	{
		$(event.child).dispose();
	},
	
	onWindowMouseUp: function( event )
	{
		if( this.isVisible() )
		{
			if( this.options.hideOnClick )
			{
				if( !$(this).contains(event.target) )
					this.hide();
			}
		}
	},
	
	//-------------------------------------------------------------------
	// DOM functions
	//-------------------------------------------------------------------
	
	createElement: function()
	{
		return new Element('div');
	}.protect(),
	
	initElement: function()
	{
		this.parent();
		
		$(this).setStyle('position', 'absolute');
		$(this).setStyle('top', '0px');
		$(this).setStyle('left', '0px');
		$(this).addClass('phi-PopUp');
		
	}.protect(),
	
	onResize: function( event )
	{
		this.hide();
	}
});