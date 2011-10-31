var LoginScreen = new Class({

	Extends: Phi.Mvc.View,

	hbox6: function()
	{
		var result = Phi.UI.HBox.create({'id':'errorBox','paddingLeft':'100','visible':'false'})
		result.addChild( Phi.UI.Label.create({'text':'The username or password is incorrect.','color':'#ff0000'}) )
		return result
	},

	hbox8: function()
	{
		var result = Phi.UI.HBox.create({'border':'0'})
		result.addChild( Phi.UI.Label.create({'text':'Username:','width':'100'}) )
		result.addChild( Phi.UI.TextInput.create({'id':'user','width':'220','bind':{'text':{'object':'model','value':'username'}},'onEnter':this.login.bind(this)}) )
		return result
	},

	hbox11: function()
	{
		var result = Phi.UI.HBox.create({'border':'0'})
		result.addChild( Phi.UI.Label.create({'text':'Password:','width':'100'}) )
		result.addChild( Phi.UI.TextInput.create({'id':'pass','onEnter':this.login.bind(this),'displayAsPassword':'true','width':'220','bind':{'text':{'object':'model','value':'password'}}}) )
		return result
	},

	hbox14: function()
	{
		var result = Phi.UI.HBox.create({'border':'0','gap':'4','paddingLeft':'100'})
		result.addChild( Phi.UI.Button.create({'text':'Login','style':'primary','onClick':this.login.bind(this)}) )
		result.addChild( Phi.UI.CheckBox.create({}) )
		result.addChild( Phi.UI.Label.create({'text':'Stay signed in'}) )
		return result
	},

	vbox5: function()
	{
		var result = Phi.UI.VBox.create({'horizontalAlign':'left','gap':'5','border':'0','verticalAlign':'middle'})
		result.addChild( this.hbox6() )
		result.addChild( this.hbox8() )
		result.addChild( this.hbox11() )
		result.addChild( this.hbox14() )
		return result
	},

	login: function()
		{
			var username = this.user.getText();
			var pass = this.pass.getText();
			
			if( username == "ghalex" && pass == "parola")
			{
				this.errorBox.setVisible( false );
				this.sendMessage("loginSuccess", {username: username, pass: pass});
				return; 
			}
			
			this.errorBox.setVisible( true );
		},
		
		childrenCreated: function()
		{
			this.setModel( new Phi.Mvc.Model({username: "ghalex"}));
		},

	createChildren: function()
	{
		this.addChild( this.vbox5() )
	},

	initialize: function()
	{
		this.parent({'onChildrenCreated':this.childrenCreated.bind(this),'id':'loginScreen'})
	},
});

var MainScreen = new Class({

	Extends: Phi.Mvc.View,

	vbox20: function()
	{
		var result = Phi.UI.VBox.create({'horizontalAlign':'center','gap':'10'})
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
		this.addChild( this.vbox20() )
	},

	initialize: function()
	{
		this.parent({'width':'100%','height':'100%','horizontalAlign':'center'})
	},
});

var MainView = new Class({

	Extends: Phi.Mvc.View,

	viewstack3: function()
	{
		var result = Phi.UI.ViewStack.create({'id':'vs','selectedIndex':'0'})
		result.addChild( new LoginScreen({}) )
		result.addChild( new MainScreen({}) )
		return result
	},

	hbox24: function()
	{
		var result = Phi.UI.HBox.create({'id':'bottomHBox','height':'40'})
		result.addChild( Phi.UI.Label.create({'text':'Copyright (c) 2011, Phimento Inc.'}) )
		return result
	},

	vbox2: function()
	{
		var result = Phi.UI.VBox.create({'height':'100%','horizontalAlign':'center','width':'100%','border':'0','verticalAlign':'middle'})
		result.addChild( this.viewstack3() )
		result.addChild( this.hbox24() )
		return result
	},

	messages: {
			loginSuccess: 'onLoginSuccess',
			loginFailed: 'onLoginFailed',
			logout: 'onLogout'
		},
		
		onLoginSuccess: function( msg )
		{
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
		this.addChild( this.vbox2() )
	},

	initialize: function()
	{
		this.parent({'width':'100%','height':'100%'})
	},
});

