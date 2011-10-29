/**
 *
 * script: VBox.js
 * name: Phi.UI.VBox
 * 
 * description: This layout component arrange all children vertical.
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - phi/ui/containers/CellBox.js
 * 
 */
Phi.UI.VBox = new Class({
	Extends: Phi.UI.CellBox,
	Binds: ['onChildHeightChange'],
	
	options: {
		gap: 0
	},
	
	setCellWidth: function( index, value )
	{
		this.parent(index, 0, value);
	},
	
	setCellHeight: function( index, value )
	{
		this.parent(index, 0, value);
	},
	
	setGap: function( value )
	{
		this.options.gap = value;
		
		for (var i=1; i < this.children.length; i++) {
		  this.getTable().td(i, 0).setStyle('padding-top', Number.withPx(value));
		}
	},
	
	getGap: function()
	{
		return this.options.gap;
	},

	//-------------------------------------------------------------------
	// Protected functions
	//-------------------------------------------------------------------
		
	onOptionsChange: function()
	{
		this.parent();
		this.setGap( this.options.gap );
	}.protect(),
	
	onChildAdded: function( event )
	{
		// Add DOM element
		var td = this.getTable().pushElement( $(event.child), event.index).td;
		
		// Update child aligment
		this.setChildVerticalAlign( event.child, this.getVerticalAlign() );
		this.setChildHorizontalAlign( event.child, this.getHorizontalAlign() );
		
		if( event.index > 0 )
			td.setStyle('padding-top', Number.withPx(this.getGap()) );
		
		// Update cell height
		event.child.addEvent('heightChange', this.onChildHeightChange);
		this.updateCellHeight( event.child );
		
	}.protect(),
	
	onChildRemoved: function( event )
	{
		// Remove DOM element
		$(event.child).getParentByTag('tr').dispose();
	},
	
	onChildHeightChange: function( event )
	{
		this.updateCellHeight( event.target );
	},
	
	updateCellHeight: function( child )
	{
		var height = child.getHeight();
		var index = this.getChildIndex(child);
		
		if( height )
			this.setCellHeight(index, height);
	},
	
	initElement: function()
	{
		this.parent();
		
		$(this).removeClass("phi-CellBox");
		$(this).addClass("phi-VBox");
		
	}.protect()
});

/**
 * Factory method.
 * @param options.
 */
Phi.UI.VBox.create = function( options )
{
	var result = new Phi.UI.VBox( options );
	return result;
};
