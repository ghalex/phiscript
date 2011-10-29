/**
 *
 * script: Element.js
 * name: Element
 */
Element.implement({
	instance: function()
	{
		return this.retrieve( "instance" );	
	},
	
	copyAttributes: function( element )
	{
		for (var i=0; i < element.attributes.length; i++) {
		  this.set(element.attributes[i].name, element.attributes[i].value);
		}
	},
	
	getAttributes: function()
	{
		var result = {};
		
		for (var i=0; i < this.attributes.length; i++) {
		  result[this.attributes[i].name] = this.attributes[i].value;
		}	
		
		return result;
	},
	
	getChildByTag: function( tagName )
	{
		var children = this.getChildren();
		
		for (var i=0; i < children.length; i++) 
		{
            if( children[i].get("tag").toLowerCase() == tagName.toLowerCase() )
                return children[i];
		}
		
		return null;
	},
	
	getChildrenByTag: function( tagName )
	{
		var children = this.getChildren();
		var result = [];
		
		for (var i=0; i < children.length; i++) 
		{
            if( children[i].get("tag").toLowerCase() == tagName.toLowerCase() )
                result.push(children[i]);
		}
		
		return result;
	},

	getParentByTag: function( tagName )
	{
		var parent = this.getParent();
		
		if( !parent )
			return null;
			
		if( parent.get("tag") == tagName )
			return parent;
		
		return parent.getParentByTag( tagName );
	},
	
	getParentByClass: function( className )
	{
		var parent = this.getParent();
		
		if( !parent )
			return null;
			
		if( parent.hasClass(className) )
			return parent;
			
		return parent.getParentByClass( className );
	},
	
	setWidth: function( value )
	{
		if( this.get('tag') == 'table' )
		{
			this.set('width', value);
			return;
		}
		
		this.setStyle("width", value);
	},
	
	setHeight: function( value )
	{
		if( this.get('tag') == 'table' )
		{
			this.set('height', value);
			return;
		}
		
		this.setStyle("height", value);
	},
	
	getWidth: function()
	{
		if( this.get('tag') == 'table' )
			return this.get('width');
			
		return this.getStyle('width');
	},
	
	getHeight: function()
	{
		if( this.get('tag') == 'table' )
			return this.get('height');
			
		return this.getStyle('height');
	}
});