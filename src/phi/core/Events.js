/**
 *
 * script: Events.js
 * name: Events
 */
Events.implement({
	dispatchEvent: function( event )
	{
		if( this.validEvent( event ) )
		{
			event.target = this;			
			this.fireEvent( event.name, event );
		}		
	},
	
	propagateEvent: function( event )
	{
		if( this.validEvent( event ) )
		{
			this.dispatchEvent( event );
			
			if( instanceOf( this, Phi.UI.Container) )
			{
				var iterator = this.createIterator();
		
				while( iterator.moveNext() )
					iterator.current().propagateEvent( event );
			}
			
		}
	},
	
	validEvent: function( event )
	{
		if( !instanceOf( event, Phi.Events.Event) )
			throw new Error( "Instace of event must extend from Phi.Events.Event!");
			
		if( !event.name )
			throw new Error( "Event must have a name!");
			
		return true;
	}
});