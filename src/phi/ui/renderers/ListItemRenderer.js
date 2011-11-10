/**
 *
 * script: ListItemRenderer.js
 * name: Phi.UI.ListItemRenderer
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
Phi.UI.ListItemRenderer = new Class({
	Extends: Phi.UI.ItemRenderer,

	list: null,	
	className: "Phi.UI.ListItemRenderer",

	/**
	 * Returns list item DOM element
	 * @override
	 */
	createElement: function()
	{
		return new Element('li', {'class':'phi-ListItem'});
	}.protect()

});