/**
 *
 * script: DefaultListItemRenderer.js
 * name: phi.ui.DefaultListItemRenderer
 * 
 * description: 
 * The defualt item renderer used to render list items if no renderer is set.
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - phi/ui/renderers/ListItemRenderer
 * 
 */
phi.ui.DefaultListItemRenderer = new Class({
	Extends: phi.ui.ListItemRenderer,

	initialize: function()
	{
		this.parent();
		
		var label = new phi.ui.Label();
		var hbox = new phi.ui.HBox({width: '100%', height: 35, paddingLeft: 10});
		hbox.addChild( label );
		
		phi.mn.BindManager.bindUsingView( this, label, 'text', 'data', 'label');
		this.addChild( hbox );
	},
});