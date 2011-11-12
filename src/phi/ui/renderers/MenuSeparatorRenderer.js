/**
 *
 * script: MenuSeparatorRenderer.js
 * name: Phi.UI.MenuSeparatorRenderer
 * 
 * description: 
 * Default ItemRenderer used by Menu to draw separator.
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - phi/ui/renderers/ListItemRenderer
 * 
 */
phi.ui.MenuSeparatorRenderer = new Class({
	Extends: phi.ui.ListItemRenderer,
	
	initialize: function()
	{
		this.parent();
	},

	/**
	 * Returns list item DOM element
	 * @override
	 */
	createElement: function()
	{
		var el = new Element('li', {'class':'phi-Separator'});
		return el; 
	}.protect()
});