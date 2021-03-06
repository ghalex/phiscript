/**
 *
 * script: TextInput.js
 * name: phi.ui.TextInput
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
phi.ui.TextInput = new Class({
	Extends: phi.ui.Component,
	
	text: null,
	className: "phi.ui.TextInput",
	
	options: {
		text: null,
		color: null
	},

	initialize: function( options )
	{
		this.parent( options );
		
		// Add listners
		this.addEvent('keydown', this.onInputKeyDown)
		this.addEvent('keyup', this.onInputKeyUp);
	},
	
	setText: function( value )
	{
		if( value === null )
			return;
			
		$(this).set("value", value);
		this.dispatchEvent("propertyChange", {property: 'text', value: value});
	},
	
	getText: function()
	{
		return $(this).get("value");		
	},
	
	setColor: function( value )
	{
		if( value === null || value === undefined )
			return;
			
		$(this).setStyle('color', value);
	},
	
	displayAsPassword: function( value )
	{
		if( value === null )
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
		this.setColor( this.options.color );
		this.displayAsPassword( this.options.displayAsPassword );
	},
		
	onInputKeyUp: function( event )
	{
		this.dispatchEvent("textChange");
		this.dispatchEvent("propertyChange", {property: 'text', value: this.getText()});
	},
	
	onInputKeyDown: function( event )
	{
		if( event.key == 'enter' )
			this.dispatchEvent('enter');
	}
	
});


/**
 * Factory method.
 * @param options.
 */
phi.ui.TextInput.create = function( options )
{
	var result = new phi.ui.TextInput( options );
	return result;
};

