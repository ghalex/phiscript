/**
 *
 * script: ScrollBox.js
 * name: Phi.UI.ScrollBox
 * 
 * description: This layout component adds scroll
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - phi/ui/containers/Container.js
 * 
 */
Phi.UI.ScrollBox = new Class({
	Extends: Phi.UI.Container,
	
	initialize: function()
	{
		this.parent();
	},
	
	//-------------------------------------------------------------------
	// Protected functions
	//-------------------------------------------------------------------
	
	initElement: function()
	{
		this.parent();
		
		$(this).addClass("phi-ScrollBox");
		$(this).setStyle("overflow", "auto");
		
	}.protect(),
	
	createElement: function()
	{
		return new Element("div");
	}.protect(),
});