/**
 *
 * script: ChildList.js
 * name: phi.core.ChildList
 * 
 * description: 
 * This class is used by phi.ui.Container to manage children.
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - core/Events
 * 
 */
phi.core.ChildList = new Class({
	Implements: [Events],
	children: [],
	
	addChild: function( child )
	{
		return this.addChildAt(child, this.children.length);
	},
	
	addChildAt: function( child, index )
	{
		if( !instanceOf(child, phi.ui.Component) )
			throw new Error( "Child must be an instance of phi.ui.Component!");
		
		// Remove child from old parent
		// if child was not removed before
		if( child.getParent() !== null )
			child.getParent().removeChild( child );
		
		if( !this.hasChild(child) )
		{
			this.children.pushAt( child, index );

			// Dispatch "childAdded" event
			this.dispatchEvent("childAdded", {child: child, index: index})
			
			// Set child parent & dispatch
			// "added" event
			child.setParent( this );
			child.dispatchEvent("added", {index: index})
			
		}
		
		return this;
	},
	
	moveChild: function( child, newIndex )
	{
		var oldIndex = this.getChildIndex( child );

		if( childIndex > -1 )
		{
			// Remove child	
			this.children.erase(child);
			
			// Add child at new location
			this.children.pushAt( child, newIndex );
			
			// Dispatch events			
			this.dispatchEvent("childMoved", {child: child, oldIndex: oldIndex, newIndex: newIndex})
			child.dispatchEvent("moved", {oldIndex: oldIndex, newIndex: newIndex})
			
		}		
	},
	
	getChildAt: function(index)
	{
		return this.children[index];
	},
	
	getChildIndex: function( child )
	{
		return this.children.indexOf( child );
	},
	
	lastChild: function()
	{
		return this.getChildAt( this.children.length -1 );	
	},
	
	firstChild: function()
	{
		return this.getChildAt(0);
	},
	
	removeChild: function( child )
	{
		if( !instanceOf(child, phi.ui.Component) )
			throw new Error( "Child must be a phi.ui.Component!");
		
		var index = this.getChildIndex( child );
		
		// Remove child	
		this.children.erase(child);
		
		// Remove child parent & dispatch
		// "remove" event.		
		child.setParent( null );
		child.dispatchEvent("removed", {index: index});
		
		// Dispatch "childRemoved" event.
		this.dispatchEvent("childRemoved", {child: child, index: index});
		
		return child;
	},
	
	hasChild: function( child )
	{
		for (var i=0; i < this.children.length; i++) 
		{
            if( child == this.children[i] )
                return true;
		}
		
		return false;
	},
	
	removeChildAt: function( index )
	{
		return this.removeChild( this.getChildAt(index));
	},
	
	getChildren: function()
	{
		return this.children;
	},
	
	removeAllChildren: function()
	{
		this.children = [];
	}
});
