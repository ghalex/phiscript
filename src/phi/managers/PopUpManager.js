/**
 *
 * script: PopUpManager.js
 * name: phi.mn.PopUpManager
 * 
 * description: Used to create a popup
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 * 
 */

phi.mn.PopUpManager = {};
phi.mn.PopUpManager.popups = [];

/**
 * Create a PopUp.
 * 
 * @param component - the UI component that will be in popup. In this way you 
 * can show in popup any UI component.
 */
phi.mn.PopUpManager.createPopUp = function( className, options )
{
	// Create a new popUp
	var popUp = new phi.ui.PopUp( options );
	
	popUp.uid = String.uniqueID();	
	popUp.addChild( new className());
	
	// Save popUp
	phi.mn.PopUpManager.popups[ popUp.uid ] = popUp;

	return popUp;
};

/**
 * Remove a PopUp.
 */
phi.mn.PopUpManager.removePopUp = function( popUp )
{
	if( popUp === null )
		return;
	
	if( !instanceOf(popUp, phi.ui.PopUp) )
		throw new Error( "PopUp must be an instance of phi.ui.PopUp!");	
			
	var rootBox = phi.ui.RootBox.get();
	
	// If popUp is on the stage
	// we remove it.
	if( rootBox.hasChild( popUp ))
	{
		if( popUp.modal )
			rootBox.removeChild( popUp.modal );
			
		rootBox.removeChild( popUp );
	}
		
	delete phi.mn.PopUpManager.popups[ popUp.uid ];
};

phi.mn.PopUpManager.addPopUp = function( popUp, modal )
{
	if( popUp === null )
		return;
		
	if( !instanceOf(popUp, phi.ui.PopUp) )
		throw new Error( "PopUp must be an instance of phi.ui.PopUp!");	
			
	var rootBox = phi.ui.RootBox.get();
	
	// If popUp is allready displayed
	// we return.
	if( rootBox.hasChild( popUp ) )
		return;
		
	// If we need to show popUp as modal.			
	if( modal )
	{
		// Create modal & add to stage
		popUp.modal = new phi.ui.Modal();
		rootBox.addChild( popUp.modal );
	}

	rootBox.addChild( popUp );
};

phi.mn.PopUpManager.getPopUpForView = function( view )
{
	for( var key in phi.mn.PopUpManager.popups )
	{
		var popUp = phi.mn.PopUpManager.popups[ key ];
		
		if( popUp.firstChild() == view )
			return popUp;
	}
	
	return null;
}

phi.mn.PopUpManager.bringToFront = function( popUp )
{
	if( popUp === null )
		return;
		
	if( !instanceOf(popUp, phi.ui.PopUp) )
			throw new Error( "PopUp must be an instance of phi.ui.PopUp!");
	
	var rootBox = phi.ui.RootBox.get();
		
	// If popUp is on the stage
	if( rootBox.hasChild( popUp ))
	{
		if( popUp.modal )
			rootBox.moveChild( popUp.modal, rootBox.getChildren().length -1 );
			
		rootBox.moveChild( popUp, rootBox.getChildren().length -1 );
	}
};
