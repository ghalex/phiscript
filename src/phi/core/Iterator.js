/**
 *
 * script: Iterator.js
 * name: Phi.Core.Iterator
 * 
 * description: Provides a way to access elements of an ArrayCollection
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - phi/core/ArrayCollection
 * 
 */
Phi.Core.Iterator = new Class({
	initialize: function( collection )
	{
		if( !collection )
			throw new Error( "Collection cannot be null!");
			
		if( !instanceOf(collection, Phi.Core.ArrayCollection) )
			throw new Error( "Collection must be a ArrayCollection!");
			
		this.collection = collection;
		this.currentIndex = -1;
	},
	
	moveNext: function()
	{
		if( this.currentIndex < this.collection.length()-1 )
		{
			this.currentIndex++;
			return true;
		}
		
		return false;
	},
	
	movePrevious: function()
	{
		if( this.currentIndex > 0 )
		{
			this.currentIndex--;
			return true;
		}
		
		return false;
	},
	
	moveFirst: function()
	{
		this.currentIndex = 0;
		return this;
	},
	
	moveLast: function()
	{
		this.currentIndex = this.collection.length() - 1;
		return this;
	},
	
	current: function()
	{
		return this.collection.getItemAt( this.currentIndex );
	}
	
	
});
	