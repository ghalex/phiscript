/**
 * script: ModelEvent.js
 * name: ModelEvent
 */
Phi.Events.DataEvent = new Class({
	Extends: Phi.Events.Event,
	
	/**
	 * Possible name:
	 * - modelChange
	 */
	initialize: function( view ) 
	{
		this.parent( name );
		
		this.view = view;
		this.model = model;
	},
});