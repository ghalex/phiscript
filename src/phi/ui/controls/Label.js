/**
 *
 * script: Lable.js
 * name: Phi.UI.Label
 * 
 * description: Simple text.
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - phi/ui/Component
 * 
 */
Phi.UI.Label = new Class({
	Extends: Phi.UI.Component,
	
	text: "",
	
	options: {
		text: null,
		fontSize: null,
		color: null
	},
	
	setFontSize: function( value )
	{
		if( value === null || value === undefined )
			return;
			
		$(this).setStyle('font-size', Number.withPx(value));
	},
	
	setColor: function( value )
	{
		if( value === null || value === undefined )
			return;
			
		$(this).setStyle('color', value);
	},
	
	setText: function( value )
	{
		if( value === null )
			return;
			
		$(this).set("html", value);
	},
	
	getText: function()
	{
		return $(this).get("html");		
	},
	
	createElement: function()
	{
		return new Element("div");
	}.protect(),
	
	initElement: function()
	{
		this.parent();
		$(this).addClass('phi-Label');
		$(this).setStyle('cursor', 'default');
		
	}.protect(),
	
	onOptionsChange: function()
	{
		this.parent();
		
		this.setText( this.options.text );
		this.setColor( this.options.color );
		this.setFontSize( this.options.fontSize );
	}
	
});

/**
 * Factory method.
 * @param options.
 */
Phi.UI.Label.create = function( options )
{
	var result = new Phi.UI.Label( options );
	return result;
};
