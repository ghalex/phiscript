/**
 *
 * script: ChildList.js
 * name: Phi.Core.ChildList
 * 
 * description: 
 * This class is used by Phi.UI.Container to manage children.
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - core/Events
 * 
 */
Phi.Core.ChildList = new Class({
	Implements: [Events],
	children: [],
	
	addChild: function( child )
	{
		return this.addChildAt(child, this.children.length);
	},
	
	addChildAt: function( child, index )
	{
		if( !instanceOf(child, Phi.UI.Component) )
			throw new Error( "Child must be a Phi.UI.Component!");
		
		// Remove child from old parent
		// if child was not removed before
		if( child.getParent() !== null )
			child.getParent().removeChild( child );
		
		if( !this.hasChild(child) )
		{
			this.children.pushAt( child, index );

			// Dispatch "childAdded" event
			this.dispatchEvent( new Phi.Events.ChildEvent( "childAdded", child, index));
			
			// Set child parent & dispatch
			// "added" event
			child.setParent( this );
			child.dispatchEvent( new Phi.Events.ChildEvent( "added", child, index));
			
		}
		
		return this;
	},
	
	getChildAt: function(index)
	{
		return this.children[index];
	},
	
	child: function( id )
	{
		var result = null;
		
		for (var i=0; i < this.children.length; i++) 
		{
			var child = this.children[i];
			
			if( instanceOf(child, Phi.UI.Container) )
			{
				result = child.child( id );

				if( result )
					return result;
			}
			
			if( child.options.id == id )
                return child;	
		}
		
		return null;
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
		if( !instanceOf(child, Phi.UI.Component) )
			throw new Error( "Child must be a Phi.UI.Component!");
		
		var index = this.getChildIndex( child );
		
		// Remove child	
		this.children.erase(child);
		
		// Remove child parent & dispatch
		// "remove" event.		
		child.setParent( null );
		child.dispatchEvent( new Phi.Events.ChildEvent( "removed", child, index ));
		
		// Dispatch "childRemoved" event.
		this.dispatchEvent( new Phi.Events.ChildEvent("childRemoved", child, index));
		
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
