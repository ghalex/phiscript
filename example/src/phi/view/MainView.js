var LoginScreen = new Class({

	Extends: Phi.Mvc.View,

	hbox144: function()
	{
		var result = Phi.UI.HBox.create({'border':'0'})
		result.addChild( Phi.UI.Label.create({'text':'Username:','width':'100'}) )
		result.addChild( Phi.UI.TextInput.create({'id':'user','width':'180','bind':{'text':{'object':'model','value':'username'}}}) )
		return result
	},

	hbox147: function()
	{
		var result = Phi.UI.HBox.create({'border':'0'})
		result.addChild( Phi.UI.Label.create({'text':'Password:','width':'100'}) )
		result.addChild( Phi.UI.TextInput.create({'id':'pass','bind':{'text':{'object':'model','value':'password'}},'displayAsPassword':'true','width':'180'}) )
		return result
	},

	hbox150: function()
	{
		var result = Phi.UI.HBox.create({'border':'0','gap':'4','paddingLeft':'100'})
		result.addChild( Phi.UI.Button.create({'text':'Login','style':'primary','onClick':this.login.bind(this)}) )
		result.addChild( Phi.UI.CheckBox.create({}) )
		result.addChild( Phi.UI.Label.create({'text':'Stay signed in'}) )
		return result
	},

	vbox143: function()
	{
		var result = Phi.UI.VBox.create({'gap':'5','verticalAlign':'middle','border':'0','horizontalAlign':'left'})
		result.addChild( this.hbox144() )
		result.addChild( this.hbox147() )
		result.addChild( this.hbox150() )
		return result
	},

	login: function( event )
		{
			var username = this.user.getText();
			var pass = this.pass.getText();
			
			this.sendMessage("loginSuccess", {username: username, pass: pass}); 
		},
		
		childrenCreated: function()
		{
			this.setModel( new Phi.Mvc.Model({username: "ghalex"}));
		},

	createChildren: function()
	{
		this.addChild( this.vbox143() )
	},

	initialize: function()
	{
		this.parent({'onChildrenCreated':this.childrenCreated.bind(this),'id':'loginScreen'})
	},
});

var MainScreen = new Class({

	Extends: Phi.Mvc.View,

	vbox156: function()
	{
		var result = Phi.UI.VBox.create({'horizontalAlign':'center'})
		result.addChild( Phi.UI.Button.create({'text':'Main Screen!'}) )
		result.addChild( Phi.UI.Label.create({'text':'You are on main screen!!!!'}) )
		return result
	},

	createChildren: function()
	{
		this.addChild( this.vbox156() )
	},

	initialize: function()
	{
		this.parent({'width':'100%','height':'100%','horizontalAlign':'center'})
	},
});

var MainView = new Class({

	Extends: Phi.Mvc.View,

	viewstack141: function()
	{
		var result = Phi.UI.ViewStack.create({'id':'vs','selectedIndex':'0'})
		result.addChild( new LoginScreen({}) )
		result.addChild( new MainScreen({}) )
		return result
	},

	hbox159: function()
	{
		var result = Phi.UI.HBox.create({'id':'bottomHBox','height':'40'})
		result.addChild( Phi.UI.Label.create({'text':'Copyright (c) 2011, Phimento Inc.'}) )
		return result
	},

	vbox140: function()
	{
		var result = Phi.UI.VBox.create({'height':'100%','verticalAlign':'middle','width':'100%','border':'0','horizontalAlign':'center'})
		result.addChild( this.viewstack141() )
		result.addChild( this.hbox159() )
		return result
	},

	messages: {
			loginSuccess: 'onLoginSuccess',
			loginFailed: 'onLoginFailed'
		},
		
		onLoginSuccess: function( msg )
		{
			if( msg.username == "ghalex" && msg.pass == "parola")
				this.vs.setSelectedIndex(1);
		},
		
		onLoginFailed: function( msg )
		{
		},

	createChildren: function()
	{
		this.addChild( this.vbox140() )
	},

	initialize: function()
	{
		this.parent({'width':'100%','height':'100%'})
	},
});

