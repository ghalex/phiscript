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
Phi.Core.BindViewWatcher = new Class({
	Implements: [Events],
	
	view: null,
	target: null,
	targetProperty: null,
	source: null,
	sourceProperty: null,
	chain: [],
	
	initialize: function( view, target, targetProperty, source,  sourceProperty )
	{
		this.view = view;
		this.target = target;
		this.targetProperty = targetProperty;
		this.source = source;
		this.sourceProperty = sourceProperty;
		
		this.chain = [];
		this.updateChain();
	},
	
	updateChain: function()
	{
		if( this.getSource() != null )
		{
			this.doBinding();
			return;
		}

		this.removeAllListners();

		var result = this.view;
		var tmp = this.source.split('.');
		
		this.view.addEvent("propertyChange", this.updateChain.bind(this), true);
		
		tmp.each( function( item, index ){
			if( result != null )
			{
				result = result[item];
				
				if( result != null )
				{
					result.addEvent("propertyChange", this.updateChain.bind(this));						
					this.chain.push( result );
				}
			}
		})
	},
	
	doBinding: function()
	{
		var obj = {};
		
		obj[ this.targetProperty ] = this.getSource().get( this.sourceProperty );
		this.target.set( obj );
	},
	
	getSource: function()
	{
		if( this.source == '' )
			return this.view;
			
		var result = this.view
		var tmp = this.source.split('.');
		
		tmp.each( function( item, index ){
			if( result != null )
				result = result[item];
		})
		
		return result;
	},
	
	removeAllListners: function()
	{
		this.chain.each( function( item, index ){
			item.removeEvent("propertyChange", this.updateChain.bind(this));
		})
		
		this.chain = [];
	}
});

	