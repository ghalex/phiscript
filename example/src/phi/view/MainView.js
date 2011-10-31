var LoginScreen = new Class({

	Extends: Phi.Mvc.View,

	hbox238: function()
	{
		var result = Phi.UI.HBox.create({'border':'0'})
		result.addChild( Phi.UI.Label.create({'text':'Username:','width':'100'}) )
		result.addChild( Phi.UI.TextInput.create({'id':'user','width':'180','bind':{'text':{'object':'model','value':'username'}}}) )
		return result
	},

	hbox241: function()
	{
		var result = Phi.UI.HBox.create({'border':'0'})
		result.addChild( Phi.UI.Label.create({'text':'Password:','width':'100'}) )
		result.addChild( Phi.UI.TextInput.create({'id':'pass','bind':{'text':{'object':'model','value':'password'}},'displayAsPassword':'true','width':'180'}) )
		return result
	},

	hbox244: function()
	{
		var result = Phi.UI.HBox.create({'border':'0','gap':'4','paddingLeft':'100'})
		result.addChild( Phi.UI.Button.create({'text':'Login','style':'primary','onClick':this.login.bind(this)}) )
		result.addChild( Phi.UI.CheckBox.create({}) )
		result.addChild( Phi.UI.Label.create({'text':'Stay signed in'}) )
		return result
	},

	vbox237: function()
	{
		var result = Phi.UI.VBox.create({'gap':'5','verticalAlign':'middle','border':'0','horizontalAlign':'left'})
		result.addChild( this.hbox238() )
		result.addChild( this.hbox241() )
		result.addChild( this.hbox244() )
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
		this.addChild( this.vbox237() )
	},

	initialize: function()
	{
		this.parent({'onChildrenCreated':this.childrenCreated.bind(this),'id':'loginScreen'})
	},
});

var MainScreen = new Class({

	Extends: Phi.Mvc.View,

	vbox250: function()
	{
		var result = Phi.UI.VBox.create({'horizontalAlign':'center'})
		result.addChild( Phi.UI.Label.create({'text':'You are on main screen!','fontSize':'23'}) )
		result.addChild( Phi.UI.Button.create({'text':'Click to logout!','onClick':this.logout.bind(this)}) )
		return result
	},

	logout: function()
		{
			this.sendMessage("logout");
		},

	createChildren: function()
	{
		this.addChild( this.vbox250() )
	},

	initialize: function()
	{
		this.parent({'width':'100%','height':'100%','horizontalAlign':'center'})
	},
});

var MainView = new Class({

	Extends: Phi.Mvc.View,

	viewstack235: function()
	{
		var result = Phi.UI.ViewStack.create({'id':'vs','selectedIndex':'0'})
		result.addChild( new LoginScreen({}) )
		result.addChild( new MainScreen({}) )
		return result
	},

	hbox254: function()
	{
		var result = Phi.UI.HBox.create({'id':'bottomHBox','height':'40'})
		result.addChild( Phi.UI.Label.create({'text':'Copyright (c) 2011, Phimento Inc.'}) )
		return result
	},

	vbox234: function()
	{
		var result = Phi.UI.VBox.create({'height':'100%','verticalAlign':'middle','width':'100%','border':'0','horizontalAlign':'center'})
		result.addChild( this.viewstack235() )
		result.addChild( this.hbox254() )
		return result
	},

	messages: {
			loginSuccess: 'onLoginSuccess',
			loginFailed: 'onLoginFailed',
			logout: 'onLogout'
		},
		
		onLoginSuccess: function( msg )
		{
			if( msg.username == "ghalex" && msg.pass == "parola")
				this.vs.setSelectedIndex(1);
		},
		
		onLoginFailed: function( msg )
		{
		},
		
		onLogout: function( msg )
		{
			this.vs.setSelectedIndex(0);
		},

	createChildren: function()
	{
		this.addChild( this.vbox234() )
	},

	initialize: function()
	{
		this.parent({'width':'100%','height':'100%'})
	},
});

