/**
 *
 * script: View.js
 * name: Phi.UI.View
 * 
 * description: 
 * This class is used to create views.
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 * 
 */
Phi.Mvc.View = new Class({
	Extends: Phi.UI.Container,
	
	data: null,
	message: null,
	
	initialize: function(options)
	{
		this.parent( options );
		this.initMessages();
		
		this.dispatchEvent( "creationComplete" );
	},
	
	setData: function( value )
	{
		if( value === null )
			return;
			
		this.data = value;
		this.dispatchEvent("propertyChange", {property: 'data', value: value});
	},
	
	getData: function()
	{
		return this.data;
	},
	
	sendMessage: function( name, args )
	{
		var dispatcher = Phi.Mvc.Dispatcher.getInstance();
		dispatcher.dispatchEvent( name, args );
	},
	
	initElement: function()
	{
		this.parent();
		$(this).addClass("phi-View");
		
	}.protect(),
	
	/**
	 * This function is called by Phi.UI.Container after createChildren() was called
	 * and before dispatching "childrenCreated" event.
	 * 
	 * @param - target is the root view
	 */
	prepareChildren: function( target )
	{
		Object.forEachChild( 
			this, 
			function( target )
			{
				if( target.options.id )
					this[ target.options.id ] = target;
					
			}.bind(this)
		);
	},
	
	initMessages: function()
	{
		if( this.messages === null )
			return;
		
		var dispatcher = Phi.Mvc.Dispatcher.getInstance();
		
		for( var key in this.messages )
		{
			var name = key;
			var func = this[this.messages[key]];
			
			dispatcher.addEvent( name, func.bind(this));
		}
	}
});
