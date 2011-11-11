/**
 *
 * script: Container.js
 * name: phi.ui.Container
 * 
 * description: This is base class for all UI components that can have children.
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - phi/ui/Component.js
 *	 - phi/core/ChildList.js
 *	 - phi/core/Iterator.js
 *   - phi/collections/ArrayCollection.js
 * 
 */
phi.ui.Container = new Class({
	Extends: phi.ui.Component,
	Implements: [phi.core.ChildList],
	
	initialize: function(options)
	{
		this.parent(options);
		
		this.addEvent("childAdded", this.onChildAdded);
		this.addEvent("childRemoved", this.onChildRemoved);
		
		this.createChildren();
		this.prepareChildren();
		
		this.dispatchEvent( "childrenCreated" );
	},
	
	createChildren: function()
	{
	},
	
	prepareChildren: function()
	{
	},
	
	redrawChild: function( child )
	{
		var el = new Element('div');
		el.inject($(child));
			
		setTimeout(
			function() 
			{ 
				el.destroy();
			}.bind(this),
			1
		);
	},
	
	createIterator: function()
	{
		return new phi.core.Iterator( new phi.collections.ArrayCollection( this.children ));	
	},
	
	createElement: function()
	{
		return new Element("div");
	}.protect(),
	
	//-------------------------------------------------------------------
	// Protected functions
	//-------------------------------------------------------------------
	
	onChildAdded: function( event )
	{
		// If this is last child
		// inject at last element.
		if( event.index == this.children.length - 1 )
			$(event.child).inject( $(this) );
		else		
			// If is not last inserted at specified index
			$(event.child).inject( $(this.getChildAt(event.index+1)), 'before' );
	},
	
	onChildRemoved: function( event )
	{
		$(event.child).dispose();
	}
});