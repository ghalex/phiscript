/**
 *
 * script: HBox.js
 * name: Phi.UI.HBox
 * 
 * description: This layout component arrange all children horizontal.
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - phi/ui/containers/CellBox.js
 * 
 */
Phi.UI.HBox = new Class({
	Extends: Phi.UI.CellBox,
	Binds: ['onChildWidthChange'],
	
	options: {
		gap: 0
	},
	
	setCellWidth: function( index, value )
	{
		this.parent(0, index, value);
	},
	
	setCellHeight: function( index, value )
	{
		this.parent(0, index, value);
	},
	
	setGap: function( value )
	{
		this.options.gap = value;
		
		for (var i=1; i < this.children.length; i++) {
		  this.getTable().td(0, i).setStyle('padding-left', Number.withPx(value));
		};
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
		var td = this.getTable().pushElement( $(event.child), 0, event.index).td;
		
		// Update child aligment
		this.setChildVerticalAlign( event.child, this.getVerticalAlign() );
		this.setChildHorizontalAlign( event.child, this.getHorizontalAlign() );
		
		// Update child gap
		if( event.index > 0 )
			td.setStyle('padding-left', Number.withPx(this.getGap()));
			
		// Update cell width
		event.child.addEvent('widthChange', this.onChildWidthChange);
		this.updateCellWidth( event.child );
		
	}.protect(),
	
	onChildRemoved: function( event )
	{
		// Remove DOM element
		$(event.child).getParent().dispose();
	},
	
	onChildWidthChange: function( event )
	{
		this.updateCellWidth( event.target );
	},
	
	updateCellWidth: function( child )
	{
		var width = child.getWidth();
		var index = this.getChildIndex(child);
		
		if( width )
			this.setCellWidth(index, width);
	},
	
	initElement: function()
	{
		this.parent();
		
		$(this).removeClass("phi-CellBox");
		$(this).addClass("phi-HBox");
		
	}.protect()
});

/**
 * Factory method.
 * @param options.
 */
Phi.UI.HBox.create = function( options )
{
	var result = new Phi.UI.HBox( options );
	return result;
}