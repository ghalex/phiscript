/**
 *
 * script: Core.js
 * name: Core
 */
var phi = phi || {};

// Define namespaces
phi.core = phi.core || {};
phi.ui = phi.ui || {};
phi.html = phi.html || {};
phi.mn = phi.mn || {};
phi.collections = phi.collections || {};

Object.forEachChild = function( target, callback, test )
{
	if( instanceOf(target, phi.ui.Container))
	{
		var iterator = target.createIterator();

		while( iterator.moveNext() )
			if( test( iterator.current() ) )
				Object.forEachChild( iterator.current(), callback, test );
	}
	
	callback( target );
}

Array.implement({
	pushAt: function(item, index)
	{
		this.splice(index, 0, item);
	}
});

Boolean.fromString = function( value )
{
	if( value == "true" )
		return true;
		
	return false;
};

Number.isPercentage = function( value )
{
	if( instanceOf(value, String) )
		if( value.indexOf("%") > -1 )
			return true;
		
	return false;
};

Number.withPx = function( value )
{
	return Number.from( value ) + "px";
};
