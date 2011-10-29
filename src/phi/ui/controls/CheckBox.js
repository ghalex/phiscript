/**
 *
 * script: CheckBox.js
 * name: Phi.UI.CheckBox
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
Phi.UI.CheckBox = new Class({
	Extends: Phi.UI.Component,
	
	initialize: function( checked )
	{
		this.parent();
		
		if(checked)
			this.setChecked(checked);
	},
	
	setChecked: function( value )
	{
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
	
});


/**
 * Factory method.
 * @param options.
 */
Phi.UI.CheckBox.create = function( options )
{
	var result = new Phi.UI.CheckBox( options );
	return result;
}