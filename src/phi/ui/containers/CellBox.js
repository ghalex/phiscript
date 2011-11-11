/**
 *
 * script: CellBox.js
 * name: phi.ui.CellBox
 * 
 * description: This is a layout component that allows you to arrange your components in a table.
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - phi/ui/containers/Container.js
 *	 - phi/html/Table.js
 * 
 */
phi.ui.CellBox = new Class({
	Extends: phi.ui.Container,
	
	options: {
		horizontalAlign: "left",
		verticalAlign: "middle",
		border: 0
	},
	
	table: null,

	getTable: function()
	{
		if( !this.table )
			this.table = new phi.html.Table();
			
		return this.table;
	},
	
	setChildVerticalAlign: function( child, align )
	{
		if( instanceOf(child, Number) )
			child = this.getChildAt( child );
			
		if( this.hasChild(child) )
			$(child).getParent().set('valign', align);
			
		// @FIX for Chrome.
		if( Browser.chrome || Browser.safari )
			this.redrawChild( child );
	},
	
	setChildHorizontalAlign: function( child, align )
	{
		if( instanceOf(child, Number) )
			child = this.getChildAt( child );
			
		if( this.hasChild(child) )
			$(child).getParent().set('align', align);
			
		// @FIX for Chrome.
		if( Browser.chrome || Browser.safari )
			this.redrawChild( child );
	},
	
	setVerticalAlign: function( align )
	{
		this.options.verticalAlign = align;
		
		var iterator = this.createIterator();
		
		while( iterator.moveNext() )
			this.setChildVerticalAlign( iterator.current(), align );
			
		return this;
	},
	
	getVerticalAlign: function()
	{
		return this.options.verticalAlign;
	},
	
	setHorizontalAlign: function( align )
	{
		this.options.horizontalAlign = align;
		
		var iterator = this.createIterator();
		
		while( iterator.moveNext() )
			this.setChildHorizontalAlign( iterator.current(), align );
			
		return this;
	},
	
	getHorizontalAlign: function()
	{
		return this.options.horizontalAlign;
	},
	
	setCellWidth: function( trIndex, tdIndex, value )
	{
		var td = this.getTable().td(trIndex, tdIndex);
		
		if( td )
			td.set("width", value);
	},
	
	setCellHeight: function( trIndex, tdIndex, value )
	{
		var td = this.getTable().td(trIndex, tdIndex);
		
		if( td )
			td.set("height", value);
	},

	setBorder: function( value )
	{
		$(this).set('border', value);
	},
	
	getBorder: function()
	{
		return Number.from( $(this).get('border') );
	},
	
	//-------------------------------------------------------------------
	// Protected functions
	//-------------------------------------------------------------------
	
	/**
	 * Returns table DOM element
	 * @override
	 */
	createElement: function()
	{
		return $(this.getTable());
	}.protect(),
	
	initElement: function()
	{
		this.parent();
		$(this).addClass("phi-CellBox");
		
	}.protect(),
	
	onOptionsChange: function()
	{
		var op = this.options;
		
		// Call super
		this.parent();
		
		// Set border
		this.setBorder( op.border );
		
		// Align
		this.setVerticalAlign( op.verticalAlign );
		this.setHorizontalAlign( op.horizontalAlign );
	}.protect()
});

/**
 * Factory method.
 * @param options.
 */
phi.ui.CellBox.create = function( options )
{
	var result = new phi.ui.CellBox( options );
	return result;
};

