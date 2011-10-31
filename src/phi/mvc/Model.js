/**
 * script: Model.js
 * name: Phi.Mvc.Model
 * 
 * description: 
 * This class is used to create models.
 * 
 * authors:
 *   - Alexandru Ghiura
 */	
Phi.Mvc.Model = new Class({
	Implements: [Backbone.Model, Events],
	
	initialize: function( attributes ) 
	{
		this.bind( "change", this.onChange.bind(this));
		this.set(attributes);
	},
	
	onChange: function()
	{
		this.dispatchEvent("change");
	}
});