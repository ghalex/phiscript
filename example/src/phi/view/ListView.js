var ListView = new Class({

	Extends: Phi.Mvc.View,

	hbox50: function()
	{
		var result = Phi.UI.HBox.create({})
		result.addChild( Phi.UI.TextInput.create({'binds':{'text':{'value':'label','view':this,'source':'tasksList.selectedItem'}},'id':'itemNameTi','width':'160'}) )
		result.addChild( Phi.UI.Button.create({'onClick':this.addTask.bind(this),'text':'Add'}) )
		return result
	},

	vbox49: function()
	{
		var result = Phi.UI.VBox.create({'horizontalAlign':'center','gap':'4'})
		result.addChild( this.hbox50() )
		result.addChild( Phi.UI.List.create({'width':'400','id':'tasksList','height':'400','binds':{'dataProvider':{'value':'tasks','view':this,'source':'data'}}}) )
		return result
	},

	vbox48: function()
	{
		var result = Phi.UI.VBox.create({'width':'100%','horizontalAlign':'center','border':'0','height':'100%','verticalAlign':'middle'})
		result.addChild( this.vbox49() )
		return result
	},

	messages: {
		},
		
		creationComplete: function()
		{
			this.setData( new Phi.Mvc.Model({tasks: this.buildTasks() }));
		},
		
		buildTasks: function()
		{
			var tasks = new Phi.Core.ArrayCollection();
			
			tasks.addItem( new Phi.Mvc.Model({label: "Task1", isDone: false}));
			tasks.addItem( new Phi.Mvc.Model({label: "Task2", isDone: false}));
			
			return tasks;
		},
		
		addTask: function()
		{
			var tasks = this.tasksList.getDataProvider();
			tasks.addItem( new Phi.Mvc.Model({label: this.itemNameTi.getText()}));
		},

	createChildren: function()
	{
		this.addChild( this.vbox48() )
	},

	initialize: function()
	{
		this.parent({'onCreationComplete':this.creationComplete.bind(this),'height':'100%','width':'100%'})
	},
});

