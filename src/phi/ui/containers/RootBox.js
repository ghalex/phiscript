/**
 *
 * script: RootBox.js
 * name: Phi.UI.RootBox
 * 
 * description: 
 * This is the main container. You must use this like 
 * this: Phi.UI.RootBox.get().addChild( child )
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - phi/ui/containers/Container.js
 * 
 */
Phi.UI.RootBox = new Class({
	Extends: Phi.UI.Container,
	
	percentageWidth: 0,
	percentageHeight: 0,
	
	initialize: function()
	{
		this.parent();
		
		// Throw error if an instance of this class
		// allredy exist.
		if( Phi.UI.RootBox.instance )
			throw new Error("Please use Phi.UI.RootBox.get() to access RootBox!");
		
		// Save this instance
		// Because this is a singleton class
		Phi.UI.RootBox.instance = this;
	},
	
	updateSize: function()
	{
		if( this.percentageWidth > 0 )
			this.setWidth( $(this).getParent().getSize().x * this.percentageWidth/100 );
			
		if( this.percentageHeight > 0 )
			this.setHeight( $(this).getParent().getSize().y * this.percentageHeight/100 );
	},
	
	setPercentageWidth: function( value )
	{
		this.percentageWidth = value;
		this.updateSize();
	},
	
	setPercentageHeight: function( value )
	{
		this.percentageHeight = value;
		this.updateSize();
	},
	
	//-------------------------------------------------------------------
	// Protected functions
	//-------------------------------------------------------------------
	
	/**
	 * Create RootBox DOM element.
	 */
	createElement: function()
	{
		return new Element("div");
	}.protect(),
	
	initElement: function()
	{
		this.parent();
		$(this).addClass("phi-RootBox");
		
	}.protect(),
	
	onAddedToStage: function( event )
	{
	}.protect(),
	
	onResize: function( event )
	{
		this.updateSize();
	}

});

Phi.UI.RootBox.getInstance = function()
{
	return Phi.UI.RootBox.instance || new Phi.UI.RootBox();
};

Phi.UI.RootBox.get = function()
{
	var element = $$("body")[0];
	var instance = element.retrieve( "rootBox" );
	
	if( instance )
		return instance;

	// If this is the first instance we create it
	// and store it to element.		
	instance = Phi.UI.RootBox.getInstance();
	element.store( "rootBox", instance );
	
    // Inject element to DOM
	$(instance).inject( element );
	
	// Dispatch added to stage
	instance.dispatchEvent( new Phi.Events.ChildEvent( "added", instance, 0));
	
	return instance;
	
};
