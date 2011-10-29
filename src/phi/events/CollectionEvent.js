/**
 * script: CollectionEvent.js
 * name: CollectionEvent
 */
Phi.Events.CollectionEvent = new Class({
	Extends: Phi.Events.Event,
	
	/**
	 * Possible name:
	 * - collectionChange
	 * - kind:
	 * - add
	 * - move
	 * - replace
	 * - remove
	 */
	initialize: function( kind ) {
		this.parent( "collectionChange" );
		this.kind = kind;
		this.location = -1;
		this.oldLocation = -1;
		this.item = null;
		this.oldItem = null;
	}
});