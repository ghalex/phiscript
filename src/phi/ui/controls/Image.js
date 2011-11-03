/**
 *
 * script: Image.js
 * name: Phi.UI.Image
 * 
 * description: Plain image.
 * 
 * 
 * authors:
 *   - Neuromaster
 * 
 * requires:
 *   - phi/ui/Component
 * 
 */
Phi.UI.Image = new Class({
	Extends: Phi.UI.Component,
	
	options: {
		source: null	
	},
	
	initialize: function( options )
	{
		this.parent( options );
	},
	
	setSource: function( value )
	{
		if( value === null || value === undefined )
			return;
			
		$(this).set("src", value);
	},
	
	getSource: function ()
	{
		return $(this).get("src");
	},
	
	createElement: function()
	{
		return new Element("img");
	}.protect(),
	
	onOptionsChange: function()
	{
		this.parent();
		
		this.setSource( this.options.source );
	},
	
	initElement: function()
	{
		this.parent();
		
		$(this).setStyle('display', 'block');
		$(this).addClass('phi-Image');
		
	}.protect()
});

/**
 * Factory method.
 * @param options.
 */
Phi.UI.Image.create = function( options )
{
	var result = new Phi.UI.Image( options );
	return result;
};