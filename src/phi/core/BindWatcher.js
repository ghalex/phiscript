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
		
		this.bindSource();
		this.applyBind();
	},
	
	getSource: function()
	{
		return this.source;	
	},
	
	bindSource: function()
	{
		if( this.getSource() === null || this.getSource() === undefined )
			return;
			
		this.getSource().addEvent('propertyChange', this.applyBind.bind(this));
	},
	
	applyBind: function()
	{
		if( this.getSource() === null || this.getSource() === undefined )
			return;
			
		this.target.set( this.targetProperty, this.getSource().get( this.sourceProperty ) );
	}
});

	