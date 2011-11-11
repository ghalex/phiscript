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
phi.core.ProxyObject = new Class({
	Implements: [Events],
	
	attributes : {
	},
	
	initialize: function( attributes ) 
	{
		this.set( attributes );
	},
	
	set: function( attributes )
	{
		// Merge attributes
		Object.append( this.attributes, attributes );
		
		// Dispatch propertyChange for binding
		this.dispatchEvent("propertyChange");	
	},
	
	get: function( property )
	{
		return this.attributes[ property ];
	},
	
	unset: function( property )
	{
		delete this.attributes[ property ];
		
		// Dispatch propertyChange for binding
		this.dispatchEvent("propertyChange");
	}
});