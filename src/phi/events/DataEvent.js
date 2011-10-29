/**
 * script: DataEvent.js
 * name: DataEvent
 */
Phi.Events.DataEvent = new Class({
	Extends: Phi.Events.Event,
	
	/**
	 * Possible name:
	 * - dataChange
	 */
	initialize: function( name, data, oldData ) 
	{
		this.parent( name );
		
		this.data = data;
		this.oldData = oldData;
	},
});