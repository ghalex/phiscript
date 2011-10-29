/**
 *
 * script: HTMLBox.js
 * name: Phi.UI.HTMLBox
 * 
 * description: This container is used to inject a Phi.UI.Component into a specific HTML element
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - phi/ui/containers/Container.js
 * 
 */
Phi.UI.HTMLBox = new Class({
	Extends: Phi.UI.Container,
	
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
		throw new Error("You can't add HTMLBox as a child please use other container!")
	}
});