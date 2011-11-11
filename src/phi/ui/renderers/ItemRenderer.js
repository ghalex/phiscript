/**
 *
 * script: ItemRenderer.js
 * name: phi.ui.ItemRenderer
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
phi.ui.ItemRenderer = new Class({
	Extends: phi.ui.View,
	
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