/**
 *
 * script: HTMLBox.js
 * name: phi.ui.HTMLBox
 * 
 * description: This container is used to inject a phi.ui.Component into a specific HTML element
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - phi/ui/containers/Container.js
 * 
 */
phi.ui.HTMLBox = new Class({
	Extends: phi.ui.Container,
	
	initialize: function(element, options)
	{
		this.parent(options);
		
		if( !element )
			throw new Error("HTMLBox element parameter is require!");

		// Add Box to DOM			
		$(this).inject( $(element) );
	},
	
	//-------------------------------------------------------------------
	// Protected functions
	//-------------------------------------------------------------------
	
	initElement: function()
	{
		this.parent();
		$(this).addClass("phi-HTMLBox");
		
	}.protect(),
	
	onAdded: function( event )
	{
		throw new Error("You can't add HTMLBox as a child please use other container!");
	}
});