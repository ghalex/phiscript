var files = [
    
    'core/Core.js',
		
	// Constants 
	'constants/VerticalAlign.js',
	'constants/HorizontalAlign.js',
	'constants/CollectionEventKind.js',
	'constants/PopUpSnap.js',
	
	// Core
	'core/Events.js',
	'core/Element.js',
	'core/Iterator.js',
	'core/ArrayCollection.js',
	'core/Function.js',
	'core/ChildList.js',
	'core/BindWatcher.js',
	'core/BindViewWatcher.js',
	'mvc/Model.js',
	'mvc/Dispatcher.js',
	
	// Managers 
	'managers/PopUpManager.js',
	'managers/ThemeManager.js',
	'managers/BindManager.js',
	
	// HTML
	'html/Table.js',
	
	// UI
	'ui/Object.js',
	'ui/Component.js',
	'ui/controls/Modal.js',
	'ui/controls/Button.js',
	'ui/controls/CheckBox.js',
	'ui/controls/TextInput.js',
	'ui/controls/Image.js',
	'ui/controls/Label.js',
	
	// Containers
	'ui/containers/Container.js',
	'mvc/View.js',
	'ui/containers/TitleWindow.js',
	'ui/containers/ViewStack.js',
	'ui/containers/HTMLBox.js',
	'ui/containers/ScrollBox.js',
	'ui/containers/CellBox.js',
	'ui/containers/RootBox.js',
	'ui/containers/PopUp.js',
	'ui/containers/HBox.js',
	'ui/containers/VBox.js',
	'ui/renderers/ItemRenderer.js',
	'ui/renderers/ListItemRenderer.js',
	'ui/renderers/DefaultListItemRenderer.js',
	'ui/renderers/MenuItemRenderer.js',
	'ui/renderers/MenuSeparatorRenderer.js',
	'ui/containers/ListBase.js',
	'ui/containers/List.js',
	'ui/controls/Menu.js'
];

var FileManager = new Class({
	Implements: [Options],
	
	scriptsToLoad: [],
	
	options: {
		baseUrl: ""
	},
	
	initialize: function( options )
	{
		this.setOptions( options );
	},
	
	loadScript: function( url, callback )
	{
		var head = $$("head")[0];
		var el = new Element('script', {type: "text/javascript"});
		
		el.addEvent('load', callback );
		el.src = this.options.baseUrl + url;
		
		el.inject( head );
	},
	
	loadScripts: function( scripts, callback )
	{
		this.scriptsToLoad = Array.clone( scripts );
		this.recursiveLoad( callback );
	},
	
	recursiveLoad: function( callback )
	{
		if( this.scriptsToLoad.length == 0 )
		{
			callback();
			return;
		}
			
		this.loadScript( this.scriptsToLoad.shift(), function() {
			this.recursiveLoad( callback );
		}.bind(this) );
	}
});

var require = function( scripts, options, callback )
{
	var manager = new FileManager(options);
	manager.loadScripts( scripts, callback );
}
