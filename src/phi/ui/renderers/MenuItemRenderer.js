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
	
	initialize: function()
	{
		this.parent();
		
		var label = new Phi.UI.Label();
		var hbox = new Phi.UI.HBox({width: '100%', paddingLeft: 10, paddingRight: 5});
		hbox.addChild( label );
		
		Phi.Mn.BindManager.bindUsingView( this, label, 'text', 'data', 'label');
		this.addChild( hbox );
	}

});