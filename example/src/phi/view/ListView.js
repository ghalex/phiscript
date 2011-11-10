var ListView = new Class({

	Extends: Phi.Mvc.View,

	hbox22: function()
	{
		var result = Phi.UI.HBox.create({'gap':'2'})
		result.addChild( Phi.UI.TextInput.create({'binds':{'text':{'value':'label','view':this,'source':'tasksList.selectedItem'}},'id':'itemNameTi','width':'160'}) )
		result.addChild( Phi.UI.Button.create({'text':'Add','onClick':this.addTask.bind(this)}) )
		result.addChild( Phi.UI.Button.create({'style':'danger','text':'Delete','onClick':this.deleteTask.bind(this)}) )
		return result
	},

	vbox21: function()
	{
		var result = Phi.UI.VBox.create({'horizontalAlign':'center','gap':'4'})
		result.addChild( this.hbox22() )
		result.addChild( Phi.UI.List.create({'binds':{'dataProvider':{'value':'tasks','view':this,'source':'data'}},'width':'400','id':'tasksList','height':'400'}) )
		return result
	},

	vbox20: function()
	{
		var result = Phi.UI.VBox.create({'horizontalAlign':'center','width':'100%','verticalAlign':'middle','border':'0','height':'100%'})
		result.addChild( this.vbox21() )
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
		
		deleteTask: function()
		{
			var selectedTask = this.tasksList.getSelectedItem();
			this.tasksList.getDataProvider().removeItem( selectedTask );
		},

	createChildren: function()
	{
		this.addChild( this.vbox20() )
	},

	initialize: function()
	{
		this.parent({'onCreationComplete':this.creationComplete.bind(this),'width':'100%','id':'listView','height':'100%'})
	},
});

