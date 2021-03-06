/**
 *
 * script: ListBase.js
 * name: phi.ui.ListBase
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
phi.ui.ListBase = new Class({
	Extends: phi.ui.Container,
	Binds: ['onCollectionChange', 'onItemClick', 'onItemRollOver', 'onItemRollOut'],
	
	options: {
		selectable: true,
		dataProvider: null,
		itemRenderer: null,
		itemRendererFunction: null,
		selectedItem: null,
		selectedIndex: null
	},
	
	itemRenderer: null,
	itemRendererFunction: null,
	dataProvider: null,
	
	initialize: function( options )
	{
		this.parent( options );
		
		if( this.itemRenderer === null )
			this.itemRenderer = phi.ui.DefaultListItemRenderer;
		
		this.addEvent("newDataProvider", this.onNewDataProvider);
	},
	
	setDataProvider: function( value )
	{
		if( value === null || value === undefined )
			return;
			
		if( !instanceOf(value, phi.collections.ArrayCollection) )
			throw new Error( "DataProvider must be a ArrayCollection!");
			
		this.dataProvider = value;
		this.dataProvider.addEvent("collectionChange", this.onCollectionChange);
		
		this.dispatchEvent("newDataProvider");
	},
	
	getDataProvider: function()
	{
		return this.dataProvider;
	},
	
	setItemRenderer: function( value )
	{
		if( value === null )
			return;
			
		this.itemRenderer = value;
		this.rebuildItems();
	},
	
	getItemRenderer: function()
	{
		return this.itemRenderer;	
	},
	
	setItemRendererFunction: function( value )
	{
		if( value === null )
			return;
			
		//if( typeOf(value) != "function" )
		//	throw new Error("ItemRendererFunction type must be function.")
			
		this.itemRendererFunction = value;
	},
	
	getItemRendererFunction: function()
	{
		return this.itemRendererFunction;
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
			
		// Dispatch event for binding
		this.dispatchEvent("propertyChange", {property: 'selectedIndex', value: value});
	},
	
	getSelectedIndex: function()
	{
		return this.options.selectedIndex;
	},
	
	setSelectedItem: function( value )
	{
		var itemIndex = this.getDataProvider().getItemIndex(value);
		this.setSelectedIndex( itemIndex );	
	},
	
	getSelectedItem: function()
	{
		if( this.getDataProvider() === null )
			return null;
			
		if( this.getSelectedIndex() == -1 )
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
		var renderer = this.getItemRenderer();
		
		if( this.getItemRendererFunction() )
		{
			var f = this.getItemRendererFunction();
			renderer = f( data );
		}
		
		var item = new renderer();
		
		if( !instanceOf(item, phi.ui.ListItemRenderer) )
			throw new Error( "ItemRenderer must be an instance of phi.ui.ListItemRenderer!");
		
		item.setData( data );
		item.list = this;
		item.addEvent("mouseenter", this.onItemRollOver);
		item.addEvent("mouseleave", this.onItemRollOut);
		item.addEvent("mousedown", this.onItemClick);
		
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
	
	moveItem: function( direction, item )
	{
		if( !item )
			item = this.getSelectedItem();
			
		if( !item )
			return;
			
		var dp = this.getDataProvider();
		var index = dp.getItemIndex( item );
			
		if( direction == 'up' )
		{
			if( index > 0 )
				index--;
		} 
		else if( direction == 'down' )
		{
			if( index < dp.length() )
				index++;
		}
					
		dp.moveItem( item, index );
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
		this.setItemRendererFunction( this.options.itemRendererFunction );
		this.setItemRenderer( this.options.itemRenderer );
		this.setDataProvider( this.options.dataProvider );
		
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
		
		this.updateOddClass();
	},

	updateOddClass: function()
	{
		var iterator = this.getDataProvider().createIterator();
		
		for( var i = 0; i< this.getChildren().length ; i++)
		{
			var item = this.getChildAt(i);
			
			if( $(item).hasClass('odd') )
				$(item).removeClass('odd');	
					
			if( i % 2 != 0)
				$(item).addClass('odd');
		}
	},
	
	/**
	 * This is called when an item was clicked.
	 */
	onItemClick: function( event )
	{
		var index = this.elementToIndex( event.target );
		
		this.setSelectedIndex( index );
		
		//this.dispatchEvent("propertyChange");
		this.dispatchEvent("itemClick", {index:index});
	},
	
	onKeyDown: function( event )
	{
		var index = -1;
		
		if( event.key == 'up' )
		{
			index = this.getSelectedIndex();
			
			if( event.alt )
				this.moveItem('up');
			
			if( index > 0 )	
				this.setSelectedIndex(  index - 1);
		}
		else if( event.key == 'down')
		{
			index = this.getSelectedIndex();
			
			if( event.alt )
				this.moveItem('down');
				
			if( index < this.getDataProvider().length() - 1 )	
				this.setSelectedIndex(  index + 1 );
		}
	}
});