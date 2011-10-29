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
		var event = new Phi.Events.CollectionEvent( "add" );
		event.item = item;
		event.location = index;
		
		// Add item
		this.source.splice(index, 0, item );

		// Dispatch event		
		this.dispatchEvent( event );
	},
	
	length: function()
	{
		return this.source.length;
	},
	
	setItemAt: function( item, index )
	{
		var event = new Phi.Events.CollectionEvent( "replace" );
		
		event.item = item;
		event.oldItem = this.getItemAt( index );
		event.location = index;
		
		// Add item
		this.source.splice(index, 1, item );
		
		// Dispatch event
		this.dispatchEvent( event );
	},
	
	moveItem: function( item, newIndex )
	{
		var event = new Phi.Events.CollectionEvent( "move" );
		event.item = item;
		event.oldLocation = this.getItemIndex(item);
		event.location = newIndex;
				
		// Remove item
		this.source.splice(event.oldLocation, 1);
		
		// Add item at new location
		this.source.splice(event.location, 0, item );
		
		// Dispatch event
		this.dispatchEvent( event );
	},
	
	removeItem: function( item )
	{
		this.removeItemAt( this.getItemIndex( item ) );
	},
	
	removeItemAt: function( index )
	{
		var event = new Phi.Events.CollectionEvent( "remove" );
		
		event.item = this.getItemAt( index );;
		event.location = index;
		
		// Remove item
		this.source.splice(index, 1);
		
		// Dispatch event
		this.dispatchEvent( event );
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