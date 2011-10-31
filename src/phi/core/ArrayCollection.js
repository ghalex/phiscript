/**
 *
 * script: ArrayCollection.js
 * name: Phi.Core.ArrayCollection
 * 
 * description: 
 * Provides basic operation on Array's
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - core/Events
 * 
 */
Phi.Core.ArrayCollection = new Class({
	Implements: [Events],
	
	initialize: function( source ) 
	{
		if( source )
			this.source = source;
		else
			this.source = [];
	},
	
	addItem: function( item )
	{		
		this.addItemAt( item, this.source.length );
	},
	
	addItemAt: function( item, index )
	{
		var eventArgs = {};
		
		eventArgs.item = item;
		eventArgs.index = index;
		eventArgs.kind = CollectionEventKind.ADD;
		
		// Add item
		this.source.splice(index, 0, item );

		// Dispatch event
		this.dispatchEvent( "add", eventArgs);		
	},
	
	length: function()
	{
		return this.source.length;
	},
	
	setItemAt: function( item, index )
	{
		var eventArgs = {};
		
		eventArgs.item = item;
		eventArgs.oldItem = this.getItemAt( index );
		eventArgs.location = index;
		eventArgs.kind = CollectionEventKind.REPLACE;
		
		// Add item
		this.source.splice(index, 1, item );
		
		// Dispatch event
		this.dispatchEvent("replace", eventArgs)
	},
	
	moveItem: function( item, newIndex )
	{
		var eventArgs = {};
		
		eventArgs.item = item;
		eventArgs.oldLocation = this.getItemIndex(item);
		eventArgs.location = newIndex;
		eventArgs.kind = CollectionEventKind.MOVE;
		
		// Remove item
		this.source.splice(event.oldLocation, 1);
		
		// Add item at new location
		this.source.splice(event.location, 0, item );
		
		// Dispatch event
		this.dispatchEvent("move", eventArgs);
	},
	
	removeItem: function( item )
	{
		this.removeItemAt( this.getItemIndex( item ) );
	},
	
	removeItemAt: function( index )
	{
		var eventArgs = {};
		
		eventArgs.item = this.getItemAt( index );
		eventArgs.location = index;
		eventArgs.kind = CollectionEventKind.REMOVE;
		
		// Remove item
		this.source.splice(index, 1);
		
		// Dispatch event
		this.dispatchEvent("remove", eventArgs);
	},
	
	getItemAt: function( index )
	{
		return this.source[index];
	},
	
	getItemIndex: function( item )
	{
		return this.source.indexOf( item );
	},
	
	createIterator: function()
	{
		return new Phi.Core.Iterator( this );	
	},
	
	toString: function()
	{
		return this.source.toString();
	}
});