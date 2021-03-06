/**
 *
 * script: Menu.js
 * name: phi.ui.Menu
 * 
 * description: Menu component
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - phi/ui/containers/PopUp.js
 *	 - phi/ui/containers/List.js
 * 
 */
phi.ui.Menu = new Class({
	Extends: phi.ui.PopUp,
	Binds: ['onItemRollOver','onItemClick'],
	
	options: {
		hideOnClick: true
	},
	
	list: null,
	parentChild: null,
	parentMenu: null,
	childMenu: null,
	
	initialize: function(options)
	{
		this.parent( options );
		
		// Menu init vars
		this.childMenu = null;
		this.parentChild = null;
		
		// Menu list
		this.list = phi.ui.List.create({
			width: "100%",
			height: "100%",
			selectable: false,
			itemRendererFunction: this.listItemRendererFunction
		});

		this.list.addEvent('itemRollOver', this.onItemRollOver);
		this.list.addEvent('itemClick', this.onItemClick);
				
		this.addChild( this.list );
	},
	
	setDataProvider: function( value )
	{
		this.list.setDataProvider( value );
	},
	
	getDataProvider: function()
	{
		return this.list.getDataProvider();
	},
	
	show: function( x, y )
	{
		// Move menu at specific position
		this.setPosition(x, y);
		
		// Show menu
		this.parent();
	},
	
	hide: function()
	{
		this.parent();
		this.parentChild = null;
		
		//List custom setup
		this.list.setSelectedIndex(-1);
		this.list.removeItemsClass('over');
		
		if( this.childMenu )
			this.childMenu.hide();
	},
	
	//-------------------------------------------------------------------
	// Protected functions
	//-------------------------------------------------------------------
	
	listItemRendererFunction: function( data )
	{
		if( data.get('type') == 'separator')
			return phi.ui.MenuSeparatorRenderer;
			
		return phi.ui.MenuItemRenderer;
	},
	
	elementToMenu: function( element )
	{
		var menuElement = element.getParentByClass('phi-Menu');
		
		if( menuElement )
			return menuElement.instance();
					
		return null;
	},

	//-------------------------------------------------------------------
	// DOM functions
	//-------------------------------------------------------------------
	
	initElement: function()
	{
		this.parent();
		$(this).addClass('phi-Menu');
		
	}.protect(),
	
	//-------------------------------------------------------------------
	// Handlers
	//-------------------------------------------------------------------
	
	onItemClick: function( event )
	{
		var index = event.index;
		var item = this.getDataProvider().getItemAt( index );
		var eventArgs = {index: index, item: item, menu: this};
		
		this.bubbleItemClick( eventArgs );
	},
	
	bubbleItemClick: function( args )
	{
		if( this.parentMenu === null )
		{
			this.dispatchEvent('itemClick', args)
			return;			
		}
			
		this.parentMenu.bubbleItemClick( args );
	},
	
	onItemRollOver: function( event )
	{
		var child = this.list.getChildAt( event.index );
		var children = child.getData().children;
		 
		if( this.childMenu && (child != this.childMenu.parentChild))
			this.childMenu.hide();
			
		if( children )
		{
			if( !this.childMenu )
				this.childMenu = new phi.ui.Menu();
			
			if(child != this.childMenu.parentChild)
			{
				this.childMenu.parentChild = child; // This is a list element
				this.childMenu.parentMenu = this;
			
				this.childMenu.setDataProvider( children );
				this.childMenu.snapToElement( 
					$(child), 
					{
						position: "topRight", 
						offset: {x:5, y:0}
					});
				
				if( window.getWidth() < ( this.childMenu.getPosition().x + this.childMenu.getWidth() ) )
				{
					this.childMenu.snapToElement( 
						$(child), 
						{
							position: "topLeft",
							edge: "topRight",
							offset: {x:-5, y:0}
						});
				}
				
				if( window.getHeight() < ( this.childMenu.getPosition().y + this.childMenu.getHeight() ) )
				{
					$(this.childMenu).setStyle('top', window.getHeight()-this.childMenu.getHeight());
				}
			}
		}
	},
	
	onWindowMouseUp: function( event )
	{
		var itemListElement = event.target.getParentByClass('phi-ListItem');
		
		if( this.isVisible() )
		{
			if( itemListElement )
				if( itemListElement.instance().getData().children )
					return;
								
			this.hide();
		}
	},
	
	onResize: function( event )
	{
		this.hide();
	}
});


/**
 * Factory method.
 * @param options.
 */
phi.ui.Menu.create = function( options )
{
	var result = new Phi.UI.Menu( options );
	return result;
};

