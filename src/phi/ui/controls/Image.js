/**
 *
 * script: Image.js
 * name: phi.ui.Image
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
phi.ui.Image = new Class({
	Extends: phi.ui.Component,
	
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
phi.ui.Image.create = function( options )
{
	var result = new phi.ui.Image( options );
	return result;
};