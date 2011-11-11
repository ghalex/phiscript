/**
 *
 * script: CheckBox.js
 * name: phi.ui.CheckBox
 * 
 * description: Checkbox control
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - phi/ui/Component
 * 
 */
phi.ui.CheckBox = new Class({
	Extends: phi.ui.Component,
	
	options: {
		checked: null
	},
	
	initialize: function( options )
	{
		this.parent( options );
	},
	
	setChecked: function( value )
	{
		if( value === null || value === undefined )
			return;
			
		$(this).checked = value;
	},
	
	getChecked: function()
	{
		return $(this).checked;	
	},
	
	createElement: function()
	{
		return new Element(
			"input", 
			{
				type:"checkbox", 
				checked: false
			}
		);
	}.protect(),
	
	initElement: function()
	{
		this.parent();
		$(this).addClass('phi-CheckBox');
		
	}.protect(),
	
	onOptionsChange: function()
	{
		this.parent();
		this.setChecked( this.options.checked );
	}
});


/**
 * Factory method.
 * @param options.
 */
phi.ui.CheckBox.create = function( options )
{
	var result = new phi.ui.CheckBox( options );
	return result;
}