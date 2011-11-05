/**
 *
 * script: PopUpManager.js
 * name: Phi.Mn.PopUpManager
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

Phi.Mn.PopUpManager = {};
Phi.Mn.PopUpManager.popups = [];

/**
 * Create a PopUp.
 * 
 * @param component - the UI component that will be in popup. In this way you 
 * can show in popup any UI component.
 */
Phi.Mn.PopUpManager.createPopUp = function( className, options )
{
	// Create a new popUp
	var popUp = new Phi.UI.PopUp( options );
	
	popUp.uid = String.uniqueID();	
	popUp.addChild( new className());
	
	// Save popUp
	Phi.Mn.PopUpManager.popups[ popUp.uid ] = popUp;

	return popUp;
};

/**
 * Remove a PopUp.
 */
Phi.Mn.PopUpManager.removePopUp = function( popUp )
{
	if( popUp === null )
		return;
	
	if( !instanceOf(popUp, Phi.UI.PopUp) )
		throw new Error( "PopUp must be an instance of Phi.UI.PopUp!");	
			
	var rootBox = Phi.UI.RootBox.get();
	
	// If popUp is on the stage
	// we remove it.
	if( rootBox.hasChild( popUp ))
	{
		if( popUp.modal )
			rootBox.removeChild( popUp.modal );
			
		rootBox.removeChild( popUp );
	}
		
	delete Phi.Mn.PopUpManager.popups[ popUp.uid ];
};

Phi.Mn.PopUpManager.addPopUp = function( popUp, modal )
{
	if( popUp === null )
		return;
		
	if( !instanceOf(popUp, Phi.UI.PopUp) )
		throw new Error( "PopUp must be an instance of Phi.UI.PopUp!");	
			
	var rootBox = Phi.UI.RootBox.get();
	
	// If popUp is allready displayed
	// we return.
	if( rootBox.hasChild( popUp ) )
		return;
		
	// If we need to show popUp as modal.			
	if( modal )
	{
		// Create modal & add to stage
		popUp.modal = new Phi.UI.Modal();
		rootBox.addChild( popUp.modal );
	}

	rootBox.addChild( popUp );
};

Phi.Mn.PopUpManager.getPopUpForView = function( view )
{
	for( var key in Phi.Mn.PopUpManager.popups )
	{
		var popUp = Phi.Mn.PopUpManager.popups[ key ];
		
		if( popUp.firstChild() == view )
			return popUp;
	}
	
	return null;
}

Phi.Mn.PopUpManager.bringToFront = function( popUp )
{
	if( popUp === null )
		return;
		
	if( !instanceOf(popUp, Phi.UI.PopUp) )
			throw new Error( "PopUp must be an instance of Phi.UI.PopUp!");
	
	var rootBox = Phi.UI.RootBox.get();
		
	// If popUp is on the stage
	if( rootBox.hasChild( popUp ))
	{
		if( popUp.modal )
			rootBox.moveChild( popUp.modal, rootBox.getChildren().length -1 );
			
		rootBox.moveChild( popUp, rootBox.getChildren().length -1 );
	}
};
