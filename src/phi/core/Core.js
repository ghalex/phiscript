/**
 *
 * script: Core.js
 * name: Core
 */
var Phi = Phi || {};

// Define namespaces
Phi.Core = Phi.Core || {};
Phi.UI = Phi.UI || {};
Phi.Mvc = Phi.Mvc || {};
Phi.HTML = {};
Phi.Mn = {};

Object.forEachChild = function( target, callback )
{
	if( instanceOf(target, Phi.UI.Container))
	{
		var iterator = target.createIterator();

		while( iterator.moveNext() )
			Object.forEachChild( iterator.current(), callback );
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
