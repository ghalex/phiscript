/**
 *
 * script: ViewStack.js
 * name: Phi.UI.ViewStack
 * 
 * description: This is a navigator container.
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - phi/ui/containers/Container.js
 * 
 */
Phi.UI.ViewStack = new Class({
	Extends: Phi.UI.Container,
	
	selectedIndex: -1,

	setSelectedIndex: function( value )
	{
		// Save check
		if( value < 0 || value > this.children.length  )
			return;
			
		// Hide current visible child
		if( this.selectedIndex > -1 )
			this.getChildAt( this.selectedIndex ).setVisible( false );
			
		// Store selected index
		this.selectedIndex = Number.from( value );
		
		// Show new child
		if( this.selectedIndex < this.children.length )
			this.getChildAt( this.selectedIndex ).setVisible( true );
	},
	
	getSelectedIndex: function()
	{
		return this.selectedIndex;
	},
	
	next: function()
	{
		var newIndex = this.getSelectedIndex() + 1;
		
		if( newIndex >= this.children.length )
			return;
			
		this.setSelectedIndex( newIndex );
	},
	
	prev: function()
	{
		var newIndex = this.getSelectedIndex() - 1;
		
		if( newIndex < 0)
			return;
			
		this.setSelectedIndex( newIndex );
	},
	
	
	//-------------------------------------------------------------------
	// Protected functions
	//-------------------------------------------------------------------
	
	onOptionsChange: function()
	{
		this.parent();
		
		if( this.options.selectedIndex )
			this.setSelectedIndex( this.options.selectedIndex )
	}.protect(),
	
	onChildAdded: function( event )
	{
		this.parent( event );
		
		if( this.children.length > 1 )
			event.child.setVisible( false );
			
	}.protect(),
	
	onChildRemoved: function( event )
	{
		this.parent( event );
	},
	
	initElement: function()
	{
		this.parent();
		$(this).addClass("phi-ViewStack");
		
	}.protect(),
});

/**
 * Factory method.
 * @param options.
 */
Phi.UI.ViewStack.create = function( options )
{
	var result = new Phi.UI.ViewStack( options );
	return result;
}