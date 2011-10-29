/**
 * script: ChildEvent.js
 * name: ChildEvent
 */	
Phi.Events.ChildEvent = new Class({
	Extends: Phi.Events.Event,
	
	/**
	 * Possible name:
	 * - added
	 * - removed
	 * - childAdded
	 * - childRemoved
	 * - addedToStage
	 */
	initialize: function( name, child, index ) 
	{
		this.parent( name );
		
		this.child = child;
		this.index = index;
	},
});