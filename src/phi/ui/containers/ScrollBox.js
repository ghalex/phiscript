/**
 *
 * script: ScrollBox.js
 * name: phi.ui.ScrollBox
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
phi.ui.ScrollBox = new Class({
	Extends: phi.ui.Container,
	
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
	}.protect()
});