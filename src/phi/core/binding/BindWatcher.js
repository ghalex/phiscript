/**
 *
 * script: BindWatcher.js
 * name: phi.core.BindWatcher
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
phi.core.BindWatcher = new Class({
	Implements: [Events],
	Binds: ['applyBind'],
	
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
		var source = this.getSource();
		
		if( source  === null || source === undefined )
			return;
		
		if ( source.addEvent ) 
		{
			if( !this.isSourceBind() )
				source.addEvent('propertyChange', this.applyBind);
		}
		else
			console.warn("Source ("+ source +") cannot be bind, please use 'ProxObject' to wrap your object for binding to work!")
	},
	
	isSourceBind: function()
	{
		return this.getSource().hasEvent('propertyChange', this.applyBind);
	},
	
	applyBind: function()
	{
		var source = this.getSource();
		var value  = null;
		
		if( this.getSource() === null || this.getSource() === undefined )
			return;
		
		if( source.get )
			value = source.get( this.sourceProperty );
		else
			value = source[ this.sourceProperty ];
			
		if( this.target.set )
			this.target.set( this.targetProperty, value );
		else
			this.target[ this.targetProperty ] = value;
	}
});

	