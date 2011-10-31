/**
 * script: ChildEvent.js
 * name: ChildEvent
 */	
Phi.BackboneModel = new Class({
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