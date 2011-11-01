/**
 *
 * script: List.js
 * name: Phi.UI.List
 * 
 * description:
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - phi/ui/containers/ListBase.js
 * 
 */
Phi.UI.List = new Class({
	Extends: Phi.UI.ListBase,
	
	initialize: function( options )
	{
		this.parent( options );
	},

	//-------------------------------------------------------------------
	// Protected functions
	//-------------------------------------------------------------------
	
	initElement: function()
	{
		this.parent();
		
		$(this).removeClass("phi-ListBase");
		$(this).addClass("phi-List");
		
	}.protect()
});


/**
 * Factory method.
 * @param options.
 */
Phi.UI.List.create = function( options )
{
	var result = new Phi.UI.List( options );
	return result;
};