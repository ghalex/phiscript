/**
 *
 * script: ItemRenderer.js
 * name: Phi.UI.ItemRenderer
 * 
 * description: Base class for all renderers. For ex. ListItemRenderer used to render list items.
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - phi/ui/containers/Container
 * 
 */
Phi.UI.ItemRenderer = new Class({
	Extends: Phi.Mvc.View,
	
	//-------------------------------------------------------------------
	// Protected functions
	//-------------------------------------------------------------------
	
	/**
	 * Returns DOM element
	 * @override
	 */
	createElement: function()
	{
		return new Element('div');
	}.protect(),
	
	initElement: function()
	{
		this.parent();
		$(this).removeClass("phi-View");
		
	}.protect(),

});