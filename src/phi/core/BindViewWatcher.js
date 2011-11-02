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
	Extends: Phi.Core.BindWatcher,
	Implements: [Events],
	
	view: null,
	chain: [],
	
	initialize: function( view, target, targetProperty, source,  sourceProperty )
	{
		this.parent( target, targetProperty, source, sourceProperty);
		
		this.view = view;
		this.chain = [];
		this.updateChain();
	},
	
	updateChain: function()
	{
		// If we have a source to bind
		// we create a watcher for it.
		if( this.getSource() != null )
		{
			this.bindSource();
			this.applyBind();
			
			return;
		}

		// Remove all listners to parent
		// objects.
		this.removeAllListners();

		// Create listners to object that are not null.
		var result = this.view;
		var tmp = this.source.split('.');
		
		result.addEvent("propertyChange", this.updateChain.bind(this));
		
		tmp.each( function( item, index ){
			if( result != null )
			{
				result = result[item];
				
				if( result )
				{
					result.addEvent("propertyChange", this.updateChain.bind(this));						
					this.chain.push( result );
				}
			}
		}.bind(this))
	},
	
	getSource: function()
	{
		if( this.source == '' )
			return this.view;
			
		var result = this.view
		var tmp = this.source.split('.');
		
		tmp.each( 
			function( item, index )
			{
				if( result != null )
				{
					result = result[item] || result.get(item);
				}
			}
		);
		
		return result;
	},
	
	removeAllListners: function()
	{
		this.chain.each( function( item, index ){
			item.removeEvent("propertyChange", this.updateChain.bind(this));
		}.bind(this))
		
		this.chain = [];
	}
});

	