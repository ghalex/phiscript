/**
 *
 * script: List.js
 * name: phi.ui.List
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
phi.ui.List = new Class({
	Extends: phi.ui.ListBase,
	
	className: "phi.ui.List",
	
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
phi.ui.List.create = function( options )
{
	var result = new phi.ui.List( options );
	return result;
};