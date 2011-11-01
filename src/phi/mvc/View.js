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
	Binds: ['onModelChange'],
	
	model: null,
	message: null,
	
	initialize: function(options)
	{
		this.parent( options );
		this.initMessages();
		this.dispatchEvent( "creationComplete" );
	},
	
	setModel: function( value )
	{
		this.model = value;
		this.model.addEvent('change', this.onModelChange);
		
		this.onModelChange();
	},
	
	getModel: function()
	{
		return this.model;
	},
	
	sendMessage: function( name, args )
	{
		var dispatcher = Phi.Mvc.Dispatcher.getInstance();
		dispatcher.dispatchEvent( name, args );
	},
	
	/**
	 * This function is called by Phi.UI.Container after createChildren() was called
	 * and before dispatching "childrenCreated" event.
	 * 
	 * @param - target is the root view
	 */
	prepareChildren: function( target )
	{
		if( instanceOf(target, Phi.UI.Container))
		{
			var iterator = target.createIterator();
		
			while( iterator.moveNext() )
			{
				var child = iterator.current();
				this.prepareChildren( child );
			}
		}
		
		if( target.options.id )
			this[ target.options.id ] = target;
	},
	
	updateBinds: function( view )
	{
	},
	
	updateBindsForChild: function( target, view )
	{
		if( instanceOf(target, Phi.UI.Container))
		{
			var iterator = target.createIterator();
		
			while( iterator.moveNext() )
			{
				var child = iterator.current();
				
				if( child.getParentView() == view )
					this.updateBindsForChild( child, view );
			}
		}
		
		target.updateBinds( view );
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
	},
	
	onModelChange: function()
	{
		this.updateBindsForChild( this, this );
	}
});
