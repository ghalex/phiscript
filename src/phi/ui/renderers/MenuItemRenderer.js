/**
 *
 * script: MenuItemRenderer.js
 * name: phi.ui.MenuItemRenderer
 * 
 * description: 
 * Default ItemRenderer used by Menu.
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - phi/ui/renderers/ListItemRenderer
 * 
 */
phi.ui.MenuItemRenderer = new Class({
	Extends: phi.ui.ListItemRenderer,
	
	label: null,
	hbox: null,
	image: null,
	
	initialize: function()
	{
		this.parent();
		this.build();
	},
	
	build: function()
	{
		// Create childs
		this.label = new phi.ui.Label("");
		this.hbox = new phi.ui.HBox();
		this.image = new phi.ui.Image('assets/themes/default/images/right.png');
		
		// Add childs
		this.addChild( this.hbox.addChild( this.label ));
		
		// Set HBox properties
		this.hbox.setWidth("100%");
		this.hbox.setHeight(30);
		
		this.hbox.setVerticalAlign(VerticalAlign.MIDDLE);
	},

	onDataChange: function( event )
	{
		this.label.setText( event.data.label );
		
		if( event.data.children )
		{
			this.hbox.addChild( this.image );
			this.hbox.setCellWidth(this.hbox.children.length-1, 16);
		}
		else
		{
			if( this.hbox.hasChild( this.image ))
				this.hbox.removeChild( this.image );
		}
	}
});