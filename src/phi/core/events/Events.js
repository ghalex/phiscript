/**
 *
 * script: Events.js
 * name: Events
 */
Events.implement({
	
	dispatchEvent: function( name, args )
	{
		args = args || {};
		args.target = this;
		
		this.fireEvent( name, args );
	},
	
	hasEvent: function( name, fn )
	{
		if( !this.$events[name] )
			return false;
			
		var result = false;
		
		this.$events[name].each( function( f ){
			if( fn == f )
			{
				result = true;				
				return;
			}
		});
		
		return result;
	}
});