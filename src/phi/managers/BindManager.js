/**
 *
 * script: BindManager.js
 * name: phi.mn.BindManager
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

phi.mn.BindManager = {};
phi.mn.BindManager.watchers = [];

/**
 * Bind a source.property to target.property
 */
phi.mn.BindManager.bind = function(target, targetProperty, source,  sourceProperty)
{
	var watcher = new phi.core.BindWatcher(target, targetProperty, source,  sourceProperty);
	phi.mn.BindManager.watchers.push( watcher );
	
	return watcher;
};

/**
 * Bind a view.source.property to target.property
 */
phi.mn.BindManager.bindUsingView = function(view, target, targetProperty, source,  sourceProperty)
{
	var watcher = new phi.core.BindViewWatcher(view, target, targetProperty, source,  sourceProperty);
	phi.mn.BindManager.watchers.push( watcher );
	
	return watcher;
};

phi.mn.BindManager.removeWatchers = function( target )
{
	phi.mn.BindManager.watchers.each(
		function( watcher ) {
			if( watcher.target == target )
			{
				watcher.destory();
				phi.mn.BindManager.watchers.erase( watcher );
			}
						
		}
	);
}
