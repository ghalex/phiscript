/**
 *
 * script: BindManager.js
 * name: Phi.Mn.BindManager
 * 
 * description: Used to create a popup
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 * 
 */

Phi.Mn.BindManager = {};
Phi.Mn.BindManager.watchers = [];

/**
 * Bind a source.property to target.property
 */
Phi.Mn.BindManager.bind = function(target, targetProperty, source,  sourceProperty)
{
	var watcher = new Phi.Core.BindWatcher(target, targetProperty, source,  sourceProperty);
	Phi.Mn.BindManager.watchers.push( watcher );
	
	return watcher;
};

/**
 * Bind a view.source.property to target.property
 */
Phi.Mn.BindManager.bindUsingView = function(view, target, targetProperty, source,  sourceProperty)
{
	var watcher = new Phi.Core.BindViewWatcher(view, target, targetProperty, source,  sourceProperty);
	Phi.Mn.BindManager.watchers.push( watcher );
	
	return watcher;
};
