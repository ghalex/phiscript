var files = [
    
    'core/Core.js',
		
	// Constants 
	'constants/VerticalAlign.js',
	'constants/HorizontalAlign.js',
	'constants/CollectionEventKind.js',
	'constants/PopUpSnap.js',
	
	// Core
	'core/events/Events.js',
	'core/ProxyObject.js',
	'core/Function.js',
	'core/ChildList.js',
	'core/Iterator.js',
	'core/html/Element.js',
	'core/html/Table.js',
	'core/binding/BindWatcher.js',
	'core/binding/BindViewWatcher.js',
	'core/messaging/MessageDispatcher.js',
	
	// Collections
	'collections/ArrayCollection.js',
	
	// Managers 
	'managers/PopUpManager.js',
	'managers/ThemeManager.js',
	'managers/BindManager.js',
	
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
	'ui/containers/View.js',
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

var PhiFileManager = new Class({
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
	var manager = new PhiFileManager(options);
	manager.loadScripts( scripts, callback );
}
