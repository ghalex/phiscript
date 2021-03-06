/**
 *
 * script: Object
 * name: phi.ui.Object
 * 
 * description: Simple UI component.
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 * 
 */
phi.ui.Object = new Class({
	Extends: Options,
	Implements: [Events],
	
	options: {
		binds: {
		}
	},
	
	binds: null,
	
	initialize: function( options )
	{
		this.addEvent("optionsChange", this.onOptionsChange);
		this.setOptions( options );
	},
	
	setOptions: function( value )
	{
		this.parent( value );
		
		if( value )
			if( value.binds  )
				this.binds = value.binds;
		
		this.dispatchEvent("optionsChange");
	},
	
	set: function( property, value )
	{
		var setName = "set" + String.capitalize( property );
		var setFunction = this[ setName ].bind( this );
		
		setFunction( value );
	},
	
	get: function( property )
	{
		var getName = "get" + String.capitalize( property );
		
		if( this[ getName ] )
		{
			var getFunction = this[ getName ].bind(this); 
			return getFunction();
		}
		
		return null;
	}
	
});