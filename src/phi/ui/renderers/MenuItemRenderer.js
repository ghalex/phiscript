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
	
	initialize: function()
	{
		this.parent();
		
		var label = new phi.ui.Label();
		var hbox = new phi.ui.HBox({width: '100%', paddingLeft: 10, paddingRight: 5});
		hbox.addChild( label );
		
		phi.mn.BindManager.bindUsingView( this, label, 'text', 'data', 'label');
		this.addChild( hbox );
	}

});