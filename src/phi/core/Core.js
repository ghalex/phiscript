/**
 *
 * script: Core.js
 * name: Core
 */
var Phi = Phi || {};

// Define namespaces
Phi.Core = Phi.Core || {};
Phi.UI = Phi.UI || {};
Phi.Events = {};
Phi.HTML = {};
Phi.Mn = {};

Array.implement({
	pushAt: function(item, index)
	{
		this.splice(index, 0, item);
	}
});

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
