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
	
	options: {
		selectable: true,
		dataProvider: null,
		itemRenderer: null,
		selectedIndex: null
	},
	
	initialize: function( options )
	{
		this.parent( options );
		
		if( this.options.itemRenderer === null )
			this.options.itemRenderer = Phi.UI.DefaultListItemRenderer;
		
		this.addEvent("newDataProvider", this.onNewDataProvider);
	},
	
	setDataProvider: function( value )
	{
		if( value === null )
			return;
			
		if( !instanceOf(value, Phi.Core.ArrayCollection) )
			throw new Error( "DataProvider must be a ArrayCollection!");
			
		this.options.dataProvider = value;
		this.options.dataProvider.addEvent("collectionChange", this.onCollectionChange);
		
		this.dispatchEvent("newDataProvider");
	},
	
	getDataProvider: function()
	{
		return this.options.dataProvider;
	},
	
	setItemRenderer: function( value )
	{
		if( value === null )
			return;
			
		this.options.itemRenderer = value;
		this.rebuildItems();
	},
	
	getItemRenderer: function()
	{
		return this.options.itemRenderer;	
	},
	
	setSelectable: function( value )
	{
		if( value === null )
			return;
			
		this.options.selectable = value;
	},
	
	getSelectable: function()
	{
		return this.options.selectable;	
	},
	
	setSelectedIndex: function( value )
	{
		if( value === null )
			return;
			
		if( !this.getSelectable() )
			return;
			
		this.options.selectedIndex = value;
				
		// Update DOM
		this.removeItemsClass('selected');
		
		if( value > -1)
			this.getChildAt(value).element.addClass('selected');
	},
	
	getSelectedIndex: function()
	{
		return this.options.selectedIndex;
	},
	
	setSelectedItem: function( value )
	{
		var itemIndex = this.getDataProvider().getItemIndex(value);
		this.setSelectedIndex( itemIndex );
		this.dispatchEvent("propertyChange", {property: 'selectedItem', value: value});	
	},
	
	getSelectedItem: function()
	{
		if( this.getDataProvider() === null )
			return null;
			
		return this.getDataProvider().getItemAt( this.getSelectedIndex() );
	},
	
	elementToIndex: function( element )
	{
		var itemElement = element;
		
		if( itemElement.get("tag") != "li" )
			itemElement = element.getParentByTag("li");
		
		if( !itemElement )
			return -1;
		
		return this.getDataProvider().getItemIndex( itemElement.instance().getModel() );
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
		var renderer = this.getItemRenderer();
		var item = new renderer();
		
		if( !instanceOf(item, Phi.UI.ListItemRenderer) )
			throw new Error( "ItemRenderer must be an instance of Phi.UI.ListItemRenderer!");
		
		item.setModel( data );
		item.list = this;
		item.addEvent("mouseenter", this.onItemRollOver);
		item.addEvent("mouseleave", this.onItemRollOut);
		item.addEvent("mouseup", this.onItemClick);
		
		var index = this.getDataProvider().getItemIndex( data );
		
		if( index % 2 != 0)
			$(item).addClass('odd');
			
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
	
	onOptionsChange: function()
	{
		this.parent();
		
		this.setSelectable( this.options.selectable );
		this.setDataProvider( this.options.dataProvider );
		this.setItemRenderer( this.options.itemRenderer );
		
		this.setSelectedIndex( this.options.setSelectedIndex );
	},
	
	//-------------------------------------------------------------------
	// Handlers
	//-------------------------------------------------------------------
	
	onItemRollOver: function( event )
	{
		var index = this.elementToIndex( event.target );
		$(this.getChildAt(index)).addClass("over");
		
		this.dispatchEvent("itemRollOver", {index: index});
	},
	
	onItemRollOut: function( event )
	{
		var index = this.elementToIndex( event.target );
		$(this.getChildAt(index)).removeClass("over");
		
		this.dispatchEvent("itemRollOut", {index: index})
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
	 * @param event
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
		
		this.dispatchEvent("propertyChange");
		this.dispatchEvent("itemClick", {index:index});
	}
});