/**
 *
 * script: MessageDispatcher.js
 * name: phi.core.messaging.MessageDispatcher
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
phi.core.MessageDispatcher = new Class({
	Implements: [Events],
	
	initialize: function()
	{
		// Throw error if an instance of this class
		// allredy exist.
		if( phi.core.MessageDispatcher.instance )
			throw new Error("Please use Phi.Mvc.Dispatcher.getInstance() to access Dispatcher!");
		
		// Save this instance
		// Because this is a singleton class
		phi.core.MessageDispatcher.instance = this;
	},
	
});

phi.core.MessageDispatcher.getInstance = function()
{
	return phi.core.MessageDispatcher.instance || new phi.core.MessageDispatcher();
};