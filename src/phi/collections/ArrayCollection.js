/**
 *
 * script: ArrayCollection.js
 * name: phi.core.ArrayCollection
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
phi.collections.ArrayCollection = new Class({
	Implements: [Events],
	
	useProxy: false,
	source: [],
	
	initialize: function( options ) 
	{
		if( options )
		{
			this.useProxy = options.useProxyObjects;
			this.parseSource( options.source );
		}
	},
	
	addItem: function( item )
	{		
		this.addItemAt( item, this.source.length );
	},
	
	addItemAt: function( item, index )
	{
		var eventArgs = {};
		var pItem = this.wrapItem( item );
		
		eventArgs.item = pItem;
		eventArgs.index = index;
		eventArgs.location = index;
		eventArgs.kind = CollectionEventKind.ADD;
		
		// Add item
		this.source.splice(index, 0, pItem );

		// Dispatch event
		this.dispatchEvent( "collectionChange", eventArgs);		
	},
	
	setItemAt: function( item, index )
	{
		var eventArgs = {};
		var pItem = this.wrapItem( item );
		
		eventArgs.item = pItem;
		eventArgs.oldItem = this.getItemAt( index );
		eventArgs.location = index;
		eventArgs.kind = CollectionEventKind.REPLACE;
		
		// Add item
		this.source.splice(index, 1, pItem );
		
		// Dispatch event
		this.dispatchEvent("collectionChange", eventArgs)
	},
	
	moveItem: function( item, newIndex )
	{
		var eventArgs = {};
		var pItem = this.wrapItem( item );
		
		eventArgs.item = pItem;
		eventArgs.oldLocation = this.getItemIndex(item);
		eventArgs.location = newIndex;
		eventArgs.kind = CollectionEventKind.MOVE;
		
		// Remove item
		this.source.splice(eventArgs.oldLocation, 1);
		
		// Add item at new location
		this.source.splice(eventArgs.location, 0, pItem );
		
		// Dispatch event
		this.dispatchEvent("collectionChange", eventArgs);
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
		this.dispatchEvent("collectionChange", eventArgs);
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
		return new phi.core.Iterator( this );	
	},
	
	useProxyObjects: function( value )
	{
		this.useProxy = value;	
	},
		
	length: function()
	{
		return this.source.length;
	},
	
	wrapItem: function( item )
	{
		var result = item;
		
		if( this.useProxy && !instanceOf(item, phi.core.ProxyObject))
			result = new phi.core.ProxyObject( item );
		
		return result;	
	},
	
	toString: function()
	{
		return this.source.toString();
	},
	
	parseSource: function( source )
	{
		source.each( function( item ){
			this.addItem( item );
		}, this);
	}
});