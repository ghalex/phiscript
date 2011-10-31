/**
 *
 * script: Dispatcher.js
 * name: Phi.Mvc.Dispatcher
 * 
 * description: 
 * This class is used to create views.
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 * 
 */
Phi.Mvc.Dispatcher = new Class({
	Implements: [Events],
	
	initialize: function()
	{
		// Throw error if an instance of this class
		// allredy exist.
		if( Phi.Mvc.Dispatcher.instance )
			throw new Error("Please use Phi.Mvc.Dispatcher.getInstance() to access Dispatcher!");
		
		// Save this instance
		// Because this is a singleton class
		Phi.Mvc.Dispatcher.instance = this;
	},
	
});

Phi.Mvc.Dispatcher.getInstance = function()
{
	return Phi.Mvc.Dispatcher.instance || new Phi.Mvc.Dispatcher();
};