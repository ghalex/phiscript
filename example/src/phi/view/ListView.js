var ListView = new Class({

	Extends: phi.ui.View,

	hbox22: function()
	{
		var result = phi.ui.HBox.create({'gap':'2'})
		result.addChild( phi.ui.TextInput.create({'id':'itemNameTi','width':'160','binds':{'text':{'source':'tasksList.selectedItem','value':'label','view':this}}}) )
		result.addChild( phi.ui.Button.create({'text':'Add','onClick':this.addTask.bind(this)}) )
		result.addChild( phi.ui.Button.create({'text':'Delete','style':'danger','onClick':this.deleteTask.bind(this)}) )
		return result
	},

	vbox21: function()
	{
		var result = phi.ui.VBox.create({'gap':'4','horizontalAlign':'center'})
		result.addChild( this.hbox22() )
		result.addChild( phi.ui.List.create({'id':'tasksList','height':'400','width':'400','binds':{'dataProvider':{'source':'data','value':'tasks','view':this}}}) )
		return result
	},

	vbox20: function()
	{
		var result = phi.ui.VBox.create({'height':'100%','verticalAlign':'middle','width':'100%','border':'0','horizontalAlign':'center'})
		result.addChild( this.vbox21() )
		return result
	},

	messages: {
		},
		
		creationComplete: function()
		{
			this.setData( new phi.core.ProxyObject({tasks: this.buildTasks() }));
		},
		
		buildTasks: function()
		{
			var tasks = new phi.collections.ArrayCollection();
			
			tasks.useProxyObjects( true ); // This will encapsulate the {} object in new ProxyObject( {} )
			
			tasks.addItem( {label: "Task1", isDone: false} );
			tasks.addItem( {label: "Task2", isDone: false} );
			
			return tasks;
		},
		
		addTask: function()
		{
			var tasks = this.tasksList.getDataProvider();
			tasks.addItem( {label: this.itemNameTi.getText()} );
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
		this.parent({'id':'listView','height':'100%','onCreationComplete':this.creationComplete.bind(this),'width':'100%'})
	},
});

