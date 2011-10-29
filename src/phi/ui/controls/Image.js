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
	
	initialize: function( source )
	{
		this.parent();
		
		if(source)
			this.setSource(source);
	},
	
	setSource: function  (value)
	{
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
	var result = new Phi.UI.Image();
	return result;
};