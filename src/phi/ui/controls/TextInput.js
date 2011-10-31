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
	
	text: null,
	
	initialize: function( options )
	{
		this.parent( options );
		
		// Add listners
		this.addEvent('keydown', this.onKeyDown)
		this.addEvent('keyup', this.onKeyUp);
	},
	
	setText: function( value )
	{
		if( value === null || value === undefined )
			return;
			
		$(this).set("value", value);
	},
	
	getText: function()
	{
		return $(this).get("value");		
	},
	
	displayAsPassword: function( value )
	{
		if( value === null || value === undefined )
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
		this.displayAsPassword( this.options.displayAsPassword );
	},
		
	onKeyUp: function( event )
	{
		this.dispatchEvent("textChange");
	},
	
	onKeyDown: function( event )
	{
		if( event.key == 'enter' )
			this.dispatchEvent('enter');
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
};

