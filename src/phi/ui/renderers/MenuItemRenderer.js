/**
 *
 * script: MenuItemRenderer.js
 * name: Phi.UI.MenuItemRenderer
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
Phi.UI.MenuItemRenderer = new Class({
	Extends: Phi.UI.ListItemRenderer,
	
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
		this.label = new Phi.UI.Label("");
		this.hbox = new Phi.UI.HBox();
		this.image = new Phi.UI.Image('assets/themes/default/images/right.png');
		
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