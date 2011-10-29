/**
 *
 * script: Menu.js
 * name: Phi.UI.Menu
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
Phi.UI.Menu = new Class({
	Extends: Phi.UI.PopUp,
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
		this.parent(options);
		
		this.list = new Phi.UI.List();
		this.list.setWidth(200);
		this.list.setSelectable(false);
		this.list.setItemRenderer( Phi.UI.MenuItemRenderer );
		this.list.addEvent("itemRollOver", this.onItemRollOver);
		this.list.addEvent("itemClick", this.onItemClick);
		this.parentChild = null;
		this.childMenu = null;
		
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
		// Set opacity 0 for fade effect
		//$(this).set('opacity', 0);
		
		// Move menu at specific position
		this.setPosition(x, y);
		
		// Show menu
		this.parent();
		
		//var myFx = new Fx.Tween($(this));
		//myFx.start('opacity', 0, 1);
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
		var menuEvent = new Phi.Events.MenuEvent('itemClick', index, item, this);
		
		this.bubbleItemClick( menuEvent );
	},
	
	bubbleItemClick: function( event )
	{
		if( this.parentMenu === null )
		{
			this.dispatchEvent( event );
			return;			
		}
			
		this.parentMenu.bubbleItemClick( event );
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
				this.childMenu = new Phi.UI.Menu();
			
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
Phi.UI.Menu.create = function( options )
{
	var result = new Phi.UI.Menu();
	return result;
};

