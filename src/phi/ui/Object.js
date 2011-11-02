/**
 *
 * script: Object
 * name: Phi.UI.Object
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
Phi.UI.Object = new Class({
	Extends: Options,
	Implements: [Events],
	
	options: {
		bind: {
		}
	},
	
	binds: null,
	
	initialize: function( options )
	{
		this.addEvent("optionsChange", this.onOptionsChange);
		this.setOptions( options );
	},
	
	setOptions: function( options )
	{
		this.parent( options );
		
		if( options )
			if( options.bind != undefined )
				this.binds = options.bind;
		
		this.dispatchEvent("optionsChange");
	},
	
	set: function( options )
	{
		for( var key in options)
		{
			var setName = "set" + String.capitalize( key );
			var setFunction = this[ setName ].bind( this );
			setFunction( options[key] );
		}
	},
	
	get: function( property )
	{
		var getName = "get" + String.capitalize( property );
		var getFunction = this[ getName ].bind(this); 
		return getFunction();
	}
	
});