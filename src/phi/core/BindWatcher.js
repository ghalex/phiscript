/**
 *
 * script: BindWatcher.js
 * name: Phi.Core.BindWatcher
 * 
 * description: Provides a way to access elements of an ArrayCollection
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 * 
 */
Phi.Core.BindWatcher = new Class({
	Implements: [Events],
	
	target: null,
	targetProperty: null,
	source: null,
	sourceProperty: null,
	
	initialize: function( target, targetProperty, source,  sourceProperty )
	{
		this.target = target;
		this.targetProperty = targetProperty;
		this.source = source;
		this.sourceProperty = sourceProperty;
		
		this.source.addEvent('change', this.onPropertyChange.bind(this));
	},
	
	onPropertyChange: function()
	{
		var values = {};
		
		values[ this.targetProperty ] = this.source.get( this.sourceProperty );
		this.target.set( values );
	}
});

	