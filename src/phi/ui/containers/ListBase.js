/**
 *
 * script: ListBase.js
 * name: Phi.UI.ListBase
 * 
 * description: This is base class for all list components.
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - phi/ui/containers/Container.js
 * 
 */
Phi.UI.ListBase = new Class({
	Extends: Phi.UI.Container,
	Binds: ['onCollectionChange', 'onItemClick', 'onItemRollOver', 'onItemRollOut'],
	
	initialize: function()
	{
		this.parent();
		this._itemRenderer = Phi.UI.ListItemRenderer;
		this._selectable = true;
		
		this.addEvent("newDataProvider", this.onNewDataProvider);
	},
	
	setDataProvider: function( value )
	{
		if( !instanceOf(value, Phi.Core.ArrayCollection) )
			throw new Error( "DataProvider must be a ArrayCollection!");
			
		this._dataProvider = value;
		this._dataProvider.addEvent("collectionChange", this.onCollectionChange);
		
		this.dispatchEvent(new Phi.Events.Event("newDataProvider"));
	},
	
	getDataProvider: function()
	{
		return this._dataProvider;
	},
	
	setItemRenderer: function( value )
	{
		this._itemRenderer = value;
		this.rebuildItems();
	},
	
	setSelectable: function( value )
	{
		this._selectable = value;
	},
	
	getSelectable: function()
	{
		return this._selectable;	
	},
	
	setSelectedIndex: function( value )
	{
		if( !this.getSelectable() )
			return;
			
		this._selectedIndex = value;
				
		// Update DOM
		this.removeItemsClass('selected');
		
		if( value > -1)
			this.getChildAt(value).element.addClass('selected');
	},
	
	getSelectedIndex: function()
	{
		return this._selectedIndex;
	},
	
	setSelectedItem: function( value )
	{
		var itemIndex = this.getDataProvider().getItemIndex(value);
		this.setSelectedIndex( itemIndex );	
	},
	
	getSelectedItem: function()
	{
		return this.getDataProvider().getItemAt( this.getSelectedIndex() );
	},
	
	elementToIndex: function( element )
	{
		var itemElement = element;
		
		if( itemElement.get("tag") != "li" )
			itemElement = element.getParentByTag("li");
		
		if( !itemElement )
			return -1;
		
		return this.getDataProvider().getItemIndex( itemElement.instance().getData() );
	},
	
	//-------------------------------------------------------------------
	// Create functions
	//-------------------------------------------------------------------
	
	createElement: function()
	{
		return new Element('ul', {'class': 'phi-ListBase'});
	}.protect(),
	
	createItem: function( data )
	{
		var item = new this._itemRenderer();
		
		if( !instanceOf(item, Phi.UI.ListItemRenderer) )
			throw new Error( "ItemRenderer must be an instance of Phi.UI.ListItemRenderer!");
		
		item.setData( data );
		item.list = this;
		item.addEvent("mouseenter", this.onItemRollOver);
		item.addEvent("mouseleave", this.onItemRollOut);
		item.addEvent("mouseup", this.onItemClick);
		
		return item;
	}.protect(),
	
	rebuildItems: function()
	{
		if( !this.getDataProvider() )
			return;
			
		var iterator = this.getDataProvider().createIterator();
		
		// Remove all children
		this.removeAllChildren();
		
		// Empty DOM node
		$(this).empty();
		
		// Create items
		while( iterator.moveNext() )
		{
			var itemList = this.createItem( iterator.current() );
			this.addChild( itemList );
		}
	},
	
	//-------------------------------------------------------------------
	// Protected functions
	//-------------------------------------------------------------------
	
	removeItemsClass: function( className )
	{
		var iterator = this.createIterator();
		
		while( iterator.moveNext() )
			$(iterator.current()).removeClass(className);
	},
	
	//-------------------------------------------------------------------
	// Handlers
	//-------------------------------------------------------------------
	
	onItemRollOver: function( event )
	{
		var index = this.elementToIndex( event.target );
		$(this.getChildAt(index)).addClass("over");
		
		this.dispatchEvent(new Phi.Events.ListEvent("itemRollOver", index));
	},
	
	onItemRollOut: function( event )
	{
		var index = this.elementToIndex( event.target );
		$(this.getChildAt(index)).removeClass("over");
		
		this.dispatchEvent(new Phi.Events.ListEvent("itemRollOut", index));
	},
	
	/**
	 * This is called when a new dataProvider is set.
	 */
	onNewDataProvider: function()
	{
		this.rebuildItems();	
	},
	
	/**
	 * Collection change handler has the job
	 * to keep tha dataProvider and DOM elements sync.
	 *
	 * @param event - Phi.Events.CollectionEvent
	 */
	onCollectionChange: function( event )
	{
		switch( event.kind )
		{
			case CollectionEventKind.ADD: 
            {
				var itemList = this.createItem( event.item );
				this.addChildAt( itemList, event.location );
				this.setSelectedIndex(-1);
				
				break;
			}
			
			case CollectionEventKind.REMOVE:
			{
				this.removeChildAt( event.location );
				this.setSelectedIndex(-1);
				break;
			}
			
			case CollectionEventKind.REPLACE:
			{
				this.getChildAt(event.location).setData(event.item);
				break;
			}
			
			case CollectionEventKind.MOVE:
			{
				var child = this.removeChildAt( event.oldLocation );
				this.addChildAt( child, event.location );
				this.setSelectedIndex(-1);
				break;
			}
		}
		
		
	},

	/**
	 * This is called when an item was clicked.
	 */
	onItemClick: function( event )
	{
		var index = this.elementToIndex( event.target );
		
		this.setSelectedIndex( index );
		
		this.dispatchEvent( new Phi.Events.ListEvent('change', index))
		this.dispatchEvent( new Phi.Events.ListEvent('itemClick', index))
	}
});