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
 */
Phi.Mn.PopUpManager.createPopUp = function( dialog )
{
	// If popUp allready exist
	if( Phi.Mn.PopUpManager.popups[ dialog ] )
		return Phi.Mn.PopUpManager.popups[ dialog ];
		
	// Create a new popUp
	var popUp = new Phi.UI.PopUp();	
	popUp.addChild( dialog );
	
	// Save popUp
	Phi.Mn.PopUpManager.popups[ dialog ] = popUp;
	
	return popUp;
}

/**
 * Remove a PopUp.
 */
Phi.Mn.PopUpManager.removePopUp = function( dialog )
{
	var popUp = Phi.Mn.PopUpManager.popups[ dialog ];	
	var rootBox = Phi.UI.RootBox.get();
	
	if( !popUp )
		return;
	
	// If popUp is on the stage
	// we remove it.
	if( rootBox.hasChild(popUp))
		rootBox.removeChild( popUp );
		
	delete 	Phi.Mn.PopUpManager.popups[ dialog ];
}
