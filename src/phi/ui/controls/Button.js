/**
 *
 * script: Button.js
 * name: Phi.UI.Button
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
Phi.UI.Button = new Class({
	Extends: Phi.UI.Component,
	
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
Phi.UI.Button.create = function( options )
{
	var result = new Phi.UI.Button( options );
	return result;
};
