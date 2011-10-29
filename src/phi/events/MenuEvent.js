/**
 * script: MenuEvent.js
 * name: MenuEvent
 */	
Phi.Events.MenuEvent = new Class({
	Extends: Phi.Events.Event,
	
	/**
	 * Possible name:
	 * - itemClick
	 * - itemRollOver
	 * - itemRollOut
	 */
	initialize: function( name, index, item, menu ) 
	{
		this.parent( name );
		this.index = index;
		this.item = item;
		this.menu = menu;
	},
});