/**
 *
 * script: ListItemRenderer.js
 * name: phi.ui.ListItemRenderer
 * 
 * description: 
 * Item renderer used to render list items. Extend this 
 * class to render your list item in different ways.
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - phi/ui/renderers/ItemRenderer
 * 
 */
phi.ui.ListItemRenderer = new Class({
	Extends: phi.ui.ItemRenderer,

	list: null,	
	className: "phi.ui.ListItemRenderer",

	/**
	 * Returns list item DOM element
	 * @override
	 */
	createElement: function()
	{
		return new Element('li', {'class':'phi-ListItem'});
	}.protect()

});