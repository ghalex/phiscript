/**
 *
 * script: Function.js
 * name: Function
 *
 * description: This are global function. Each function with 
 * an $ in front is a globla function.
 */

/**
 * This function is used to bubble DOM events.
 *
 * @param event
 * @ex this.addEvent("click", $bubbleEvent.bind(this));
 */
function $bubbleEvent( event )
{
	// Save check
	if( event.target == this )
		return;
		
	this.fireEvent(event.type, event); 
}

function $redrawElement( element )
{
	var el = new Element('div');
	el.inject( element );
			
	setTimeout(
		function() 
		{ 
			el.destroy();
		},
		1
	);
}
