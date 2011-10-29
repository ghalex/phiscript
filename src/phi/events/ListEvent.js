/**
 * script: ListEvent.js
 * name: ListEvent
 */	
Phi.Events.ListEvent = new Class({
	Extends: Phi.Events.Event,
	
	/**
	 * Possible name:
	 * - change
	 * - itemClick
	 * - itemRollOver
	 * - itemRollOut
	 */
	initialize: function( name, index ) 
	{
		this.parent( name );
		this.index = index;
	},
});