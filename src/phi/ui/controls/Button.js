/**
 *
 * script: Button.js
 * name: phi.ui.Button
 * 
 * description: Simple button.
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - phi/ui/Component
 * 
 */
phi.ui.Button = new Class({
	Extends: phi.ui.Component,
	
	text: "",

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
		return new Element("button");
	}.protect(),
	
	initElement: function()
	{
		this.parent();
		$(this).addClass('phi-Button');
		
	}.protect(),
	
	onOptionsChange: function()
	{
		this.parent();
		this.setText( this.options.text );
	}
});

/**
 * Factory method.
 * @param options.
 */
phi.ui.Button.create = function( options )
{
	var result = new phi.ui.Button( options );
	return result;
};
