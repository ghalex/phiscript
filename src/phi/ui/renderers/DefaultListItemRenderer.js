/**
 *
 * script: DefaultListItemRenderer.js
 * name: Phi.UI.DefaultListItemRenderer
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
Phi.UI.DefaultListItemRenderer = new Class({
	Extends: Phi.UI.ListItemRenderer,

	initialize: function()
	{
		this.parent();
		
		var hbox = new Phi.UI.HBox({width: '100%', height: 35, paddingLeft: 10});
		hbox.addChild( new Phi.UI.Label(
			{
				bind: {
					text: {
						value: 'name', 
						object: 'model'
					}
				}
			}));
		
		this.addChild( hbox );
	},
});