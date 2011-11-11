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
Phi.UI.MenuSeparatorRenderer = new Class({
	Extends: Phi.UI.ListItemRenderer,
	
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
		//var hr = new Element('div');
		
		//hr.addClass('phi-Separator');
		//hr.inject( el );
		  
		return el; 
	}.protect()
});