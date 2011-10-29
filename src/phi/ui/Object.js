/**
 *
 * script: Object
 * name: Phi.UI.Object
 * 
 * description: Simple UI component.
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 * 
 */
Phi.UI.Object = new Class({
	Extends: Options,
	Implements: [Events],
	
	options: {
		bind: {
		}
	},
	
	initialize: function( options )
	{
		this.setOptions( options );
	},
	
	setOptions: function( options )
	{
		this.parent( options );
		this.onOptionsChange();
	}
});