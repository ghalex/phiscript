/**
 *
 * script: TextInput.js
 * name: Phi.UI.TextInput
 * 
 * description: 
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - phi/ui/Component
 * 
 */
Phi.UI.TextInput = new Class({
	Extends: Phi.UI.Component,
	
	initialize: function( options )
	{
		this.parent( options )
		
		// Add listners
		this.addEvent('keyup', this.onKeyDown);
	},
	
	setText: function( value )
	{
		if( value == null )
			return;
			
		$(this).set("value", value);
	},
	
	getText: function()
	{
		return $(this).get("value");		
	},
	
	displayAsPassword: function( value )
	{
		if( value == null )
			return;
			
		if( value )
			$(this).set("type", "password");
		else
			$(this).set("type", "text");
	},
	
	createElement: function()
	{
		return new Element("input", {type: "text", 'class': 'phi-TextInput'});
	},
	
	onOptionsChange: function()
	{
		this.parent();
		
		this.setText( this.options.text );
		this.displayAsPassword( this.options.displayAsPassword )
	},
		
	onKeyDown: function( event )
	{
		this.dispatchEvent(new Phi.Events.Event('change'));
	}
	
});


/**
 * Factory method.
 * @param options.
 */
Phi.UI.TextInput.create = function( options )
{
	var result = new Phi.UI.TextInput( options );
	return result;
}