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
	
	options: {
		hideOnClick: false,
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
	
	snapTo: function( uiobject, side )
	{
		if( !side )
			side = PopUpSnap.BOTTOM;
			
		var mapSide = [];
		
		mapSide['left']		= "topLeft"
		mapSide['top']		= "topLeft"
		mapSide['right']	= "topRight"
		mapSide['bottom']	= "bottomLeft"
		
		var mapEdge = [];
		
		mapEdge['left']		= "topRight"
		mapEdge['top']		= "bottomLeft"
		mapEdge['right']	= "topLeft"
		mapEdge['bottom']	= "topLeft"
		
		// Show popup first
		this.show();
		
		// Snap to Phi.UI.Component
		$(this).position({
			relativeTo: $(uiobject),
			position: mapSide[side],
			edge: mapEdge[side],
			allowNegative: true
		});
	},
	
	snapToElement: function( element, options )
	{
		// Show popup first
		this.show();
		
		options.relativeTo = element;
		options.allowNegative = true;
		
		// Snap to Phi.UI.Component
		$(this).position(options);
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
		var rootBox = Phi.UI.RootBox.get();
		
		if( rootBox.hasChild( this ))
		{
			if( this.modal )
				rootBox.removeChild( this.modal );
						
			rootBox.removeChild( this );
		}
	},
	
	show: function( modal )
	{
		var rootBox = Phi.UI.RootBox.get();
		
		// If popUp is allready displayed
		// we return.
		if( rootBox.hasChild(this) )
			return;
			
		// If we need to show popUp as modal.			
		if( modal )
		{
			// Create modal & add to stage
			this.modal = new Phi.UI.Modal();
			rootBox.addChild( this.modal );
		}

		rootBox.addChild( this );
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