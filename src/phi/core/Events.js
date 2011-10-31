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
	}
});