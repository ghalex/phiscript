var LoginScreen = new Class({

	Extends: Phi.Mvc.View,

	hbox64: function()
	{
		var result = Phi.UI.HBox.create({'border':'0'})
		result.addChild( Phi.UI.Label.create({'text':'Username:','width':'100'}) )
		result.addChild( Phi.UI.TextInput.create({'id':'user','width':'180','bind':{'text':{'value':'username','object':'model'}}}) )
		return result
	},

	hbox67: function()
	{
		var result = Phi.UI.HBox.create({'border':'0'})
		result.addChild( Phi.UI.Label.create({'text':'Password:','width':'100'}) )
		result.addChild( Phi.UI.TextInput.create({'displayAsPassword':'true','id':'pass','width':'180','bind':{'text':{'value':'password','object':'model'}}}) )
		return result
	},

	hbox70: function()
	{
		var result = Phi.UI.HBox.create({'gap':'4','paddingLeft':'100','border':'0'})
		result.addChild( Phi.UI.Button.create({'text':'Login','onClick':this.login.bind(this),'style':'primary'}) )
		result.addChild( Phi.UI.CheckBox.create({}) )
		result.addChild( Phi.UI.Label.create({'text':'Stay signed in'}) )
		return result
	},

	vbox63: function()
	{
		var result = Phi.UI.VBox.create({'gap':'5','horizontalAlign':'left','verticalAlign':'middle','border':'0'})
		result.addChild( this.hbox64() )
		result.addChild( this.hbox67() )
		result.addChild( this.hbox70() )
		return result
	},

	login: function( event )
		{
			console.log( this.user.getText() );
			console.log( this.pass.getText() );
		},
		
		childrenCreated: function()
		{
			this.setModel( new Phi.Mvc.Model({username: "ghalex"}));
		},

	createChildren: function()
	{
		this.addChild( this.vbox63() )
	},

	initialize: function(options)
	{
		this.parent({'id':'loginScreen','onChildrenCreated':this.childrenCreated.bind(this)})
	},
});

var MainScreen = new Class({

	Extends: Phi.Mvc.View,

	vbox76: function()
	{
		var result = Phi.UI.VBox.create({'horizontalAlign':'center'})
		result.addChild( Phi.UI.Button.create({'text':'Main Screen!'}) )
		result.addChild( Phi.UI.Label.create({'text':'You are on main screen!!!!'}) )
		return result
	},

	createChildren: function()
	{
		this.addChild( this.vbox76() )
	},

	initialize: function(options)
	{
		this.parent({'height':'100%','width':'100%','horizontalAlign':'center'})
	},
});

var MainView = new Class({

	Extends: Phi.Mvc.View,

	hbox57: function()
	{
		var result = Phi.UI.HBox.create({'id':'prevNextHBox','height':'40','gap':'4'})
		result.addChild( Phi.UI.Button.create({'bind':{'text':{'value':'name','object':'model'},'width':{'value':'width','object':'model'}},'onClick':this.prev.bind(this),'style':'primary'}) )
		result.addChild( Phi.UI.Button.create({'bind':{'text':{'value':'name','object':'model'}},'onClick':this.next.bind(this)}) )
		result.addChild( Phi.UI.TextInput.create({'id':'txt1','onTextChange':this.change.bind(this)}) )
		return result
	},

	viewstack61: function()
	{
		var result = Phi.UI.ViewStack.create({'id':'vs','selectedIndex':'0'})
		result.addChild( new LoginScreen({}) )
		result.addChild( new MainScreen({}) )
		return result
	},

	hbox79: function()
	{
		var result = Phi.UI.HBox.create({'id':'bottomHBox','height':'40'})
		result.addChild( Phi.UI.Label.create({'text':'Copyright (c) 2011, Phimento Inc.'}) )
		return result
	},

	vbox56: function()
	{
		var result = Phi.UI.VBox.create({'height':'100%','horizontalAlign':'center','verticalAlign':'middle','width':'100%','border':'0'})
		result.addChild( this.hbox57() )
		result.addChild( this.viewstack61() )
		result.addChild( this.hbox79() )
		return result
	},

	next: function()
		{
			this.vs.next();
		},
		
		prev: function()
		{
			this.vs.prev();
		},
		
		change: function( event )
		{
			this.model.set({width: event.target.getText()});
		},

	createChildren: function()
	{
		this.addChild( this.vbox56() )
	},

	initialize: function(options)
	{
		this.parent({'height':'100%','width':'100%'})
	},
});

