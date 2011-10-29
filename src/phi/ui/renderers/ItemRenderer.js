/**
 *
 * script: ItemRenderer.js
 * name: Phi.UI.ItemRenderer
 * 
 * description: Base class for all renderers. For ex. ListItemRenderer used to render list items.
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - phi/ui/containers/Container
 * 
 */
Phi.UI.ItemRenderer = new Class({
	Extends: Phi.UI.Container,
	
	initialize: function()
	{
		this.parent();
		this.addEvent("dataChange", this.onDataChange)
	},
	
	setData: function( value )
	{
		// Save old data.
		var oldData = this._data;
		
		// Change data.
		this._data = value;
		
		// Dispatch dataChange
		var event = new Phi.Events.DataEvent( "dataChange", value, oldData );
		this.dispatchEvent( event );
	},
	
	getData: function()
	{
		return this._data;
	},
	
	//-------------------------------------------------------------------
	// Protected functions
	//-------------------------------------------------------------------
	
	/**
	 * Returns DOM element
	 * @override
	 */
	createElement: function()
	{
		return new Element('div');
	}.protect(),
	
	onDataChange: function()
	{
	}
});