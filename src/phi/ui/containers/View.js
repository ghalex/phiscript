/**
 *
 * script: View.js
 * name: phi.ui.View
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
phi.ui.View = new Class({
	Extends: phi.ui.Container,
	
	data: null,
	message: null,
	useProxy: true,
	
	initialize: function(options)
	{
		this.parent( options );
		this.initMessages();
		
		this.dispatchEvent( "creationComplete" );
	},
	
	useProxyObjects: function( value )
	{
		this.useProxy = value;	
	},
	
	setData: function( value )
	{
		if( value === null )
			return;
			
		this.data = this.wrapData( value );
		this.dispatchEvent("propertyChange", {property: 'data', value: this.data});
	},
	
	getData: function()
	{
		return this.data;
	},
	
	sendMessage: function( name, args )
	{
		var dispatcher = phi.core.MessageDispatcher.getInstance();
		dispatcher.dispatchEvent( name, args );
	},
	
	//-------------------------------------------------------------------
	// Protected functions
	//-------------------------------------------------------------------
	
	initElement: function()
	{
		this.parent();
		$(this).addClass("phi-View");
		
	}.protect(),
	
		
	wrapData: function( data )
	{
		var result = data;
		
		if( this.useProxy && !instanceOf(data, phi.core.ProxyObject))
			result = new phi.core.ProxyObject( data );
		
		return result;	
	}.protect(),
	
	/**
	 * This function is called by phi.ui.Container after createChildren() was called
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
				{
					if( this[target.options.id] )
						throw new Error("The id: " + target.options.id + " is allready used.");
						
					this[ target.options.id ] = target;
				}
					
			}.bind(this),
			function( target )
			{
				return !instanceOf( target, phi.ui.View);
			}
		);
	},
	
	initMessages: function()
	{
		if( this.messages === null )
			return;
		
		var dispatcher = phi.core.MessageDispatcher.getInstance();
		
		for( var key in this.messages )
		{
			var name = key;
			var func = this[this.messages[key]];
			
			dispatcher.addEvent( name, func.bind(this));
		}
	}.protect()
});
