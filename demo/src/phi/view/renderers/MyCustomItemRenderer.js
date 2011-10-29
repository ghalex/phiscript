

var MyCustomItemRenderer = new Class({
	Extends: Phi.UI.ListItemRenderer,
	
	btn: null,
	checkBox: null,
	
	initialize: function()
	{
		this.parent();
		this.build();
	},
	
	build: function()
	{
		// Button
		this.btn = new Phi.UI.Label("");
		this.btn.addEvent(
			'click', 
			function( event ) 
			{
				event.stopPropagation();
				this.checkBox.setChecked( !this.checkBox.getChecked() ) 
			}.bind(this));
			
		// Checkbox
		this.checkBox = new Phi.UI.CheckBox();
		
		// Add childs
		this.addChild( 
			new Phi.UI.HBox().addChild(this.checkBox)
							 .addChild(new Phi.UI.Image("assets/images/re_star.gif"))
							 .addChild(this.btn)
		);
		
		
		
		// Set HBox properties
		this.lastChild().setWidth("100%")
		this.lastChild().setCellWidth(0, 30);
		this.lastChild().setCellWidth(1, 30);
		this.lastChild().setChildHorizontalAlign(1, HorizontalAlign.CENTER);
		this.lastChild().setChildHorizontalAlign(0, HorizontalAlign.CENTER);
		this.lastChild().setChildVerticalAlign(0, VerticalAlign.MIDDLE);
		this.lastChild().setCellHeight(0, 30);
	},

	onDataChange: function( event )
	{
		this.btn.setText( event.data.label );
	}
});