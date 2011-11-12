/**
 *
 * script: Core.js
 * name: Core
 */
var phi = phi || {};

// Define namespaces
phi.core = phi.core || {};
phi.ui = phi.ui || {};
phi.html = phi.html || {};
phi.mn = phi.mn || {};
phi.collections = phi.collections || {};

Object.forEachChild = function( target, callback, test )
{
	if( instanceOf(target, phi.ui.Container))
	{
		var iterator = target.createIterator();

		while( iterator.moveNext() )
			if( test( iterator.current() ) )
				Object.forEachChild( iterator.current(), callback, test );
	}
	
	callback( target );
}

Array.implement({
	pushAt: function(item, index)
	{
		this.splice(index, 0, item);
	}
});

Boolean.fromString = function( value )
{
	if( value == "true" )
		return true;
		
	return false;
};

Number.isPercentage = function( value )
{
	if( instanceOf(value, String) )
		if( value.indexOf("%") > -1 )
			return true;
		
	return false;
};

Number.withPx = function( value )
{
	return Number.from( value ) + "px";
};


/**
 *
 * script: VerticalAlign.js
 * name: VerticalAlign
 */
var VerticalAlign = {};

VerticalAlign.TOP = "top";
VerticalAlign.MIDDLE = "middle";
VerticalAlign.BOTTOM = "bottom";


/**
 *
 * script: HorizontalAlign.js
 * name: HorizontalAlign
 */
var HorizontalAlign = {};

HorizontalAlign.LEFT = "left";
HorizontalAlign.CENTER = "center";
HorizontalAlign.RIGHT = "right";


/**
 *
 * script: CollectionEventKind.js
 * name: CollectionEventKind
 */
var CollectionEventKind = {};

CollectionEventKind.ADD     = "add";
CollectionEventKind.REMOVE  = "remove";
CollectionEventKind.REPLACE = "replace";
CollectionEventKind.MOVE    = "move";


/**
 *
 * script: PopUpSnap.js
 * name: PopUpSnap
 */
var PopUpSnap = {};

PopUpSnap.LEFT = "left";
PopUpSnap.TOP = "top";
PopUpSnap.RIGHT = "right";
PopUpSnap.BOTTOM = "bottom";

PopUpSnap.mapSide = {
	left: "topLeft",
	top: "topLeft",
	right: "topRight",
	bottom: "bottomLeft"
};

PopUpSnap.mapEdge = {
	left: "topRight",
	top: "bottomLeft",
	right: "topLeft",
	bottom: "topLeft"
}


/**
 *
 * script: Events.js
 * name: Events
 */
Events.implement({
	
	dispatchEvent: function( name, args )
	{
		args = args || {};
		args.target = this;
		
		this.fireEvent( name, args );
	},
	
	hasEvent: function( name, fn )
	{
		if( !this.$events[name] )
			return false;
			
		var result = false;
		
		this.$events[name].each( function( f ){
			if( fn == f )
			{
				result = true;				
				return;
			}
		});
		
		return result;
	}
});

/**
 * script: Model.js
 * name: Phi.Mvc.Model
 * 
 * description: 
 * This class is used to create models.
 * 
 * authors:
 *   - Alexandru Ghiura
 */	
phi.core.ProxyObject = new Class({
	Implements: [Events],
	
	attributes : {
	},
	
	initialize: function( attributes ) 
	{
		this.set( attributes );
	},
	
	set: function( attributes )
	{
		// Merge attributes
		Object.append( this.attributes, attributes );
		
		// Dispatch propertyChange for binding
		this.dispatchEvent("propertyChange");	
	},
	
	get: function( property )
	{
		return this.attributes[ property ];
	},
	
	unset: function( property )
	{
		delete this.attributes[ property ];
		
		// Dispatch propertyChange for binding
		this.dispatchEvent("propertyChange");
	}
});

/**
 *
 * script: Function.js
 * name: Function
 *
 * description: This are global function. Each function with 
 * an $ in front is a globla function.
 */

/**
 * This function is used to bubble DOM events.
 *
 * @param event
 * @ex this.addEvent("click", $bubbleEvent.bind(this));
 */
function $bubbleEvent( event )
{
	// Save check
	if( event.target == this )
		return;
		
	this.fireEvent(event.type, event); 
}

function $redrawElement( element )
{
	var el = new Element('div');
	el.inject( element );
			
	setTimeout(
		function() 
		{ 
			el.destroy();
		},
		1
	);
}


/**
 *
 * script: ChildList.js
 * name: phi.core.ChildList
 * 
 * description: 
 * This class is used by phi.ui.Container to manage children.
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - core/Events
 * 
 */
phi.core.ChildList = new Class({
	Implements: [Events],
	children: [],
	
	addChild: function( child )
	{
		return this.addChildAt(child, this.children.length);
	},
	
	addChildAt: function( child, index )
	{
		if( !instanceOf(child, phi.ui.Component) )
			throw new Error( "Child must be an instance of phi.ui.Component!");
		
		// Remove child from old parent
		// if child was not removed before
		if( child.getParent() !== null )
			child.getParent().removeChild( child );
		
		if( !this.hasChild(child) )
		{
			this.children.pushAt( child, index );

			// Dispatch "childAdded" event
			this.dispatchEvent("childAdded", {child: child, index: index})
			
			// Set child parent & dispatch
			// "added" event
			child.setParent( this );
			child.dispatchEvent("added", {index: index})
			
		}
		
		return this;
	},
	
	moveChild: function( child, newIndex )
	{
		var oldIndex = this.getChildIndex( child );

		if( childIndex > -1 )
		{
			// Remove child	
			this.children.erase(child);
			
			// Add child at new location
			this.children.pushAt( child, newIndex );
			
			// Dispatch events			
			this.dispatchEvent("childMoved", {child: child, oldIndex: oldIndex, newIndex: newIndex})
			child.dispatchEvent("moved", {oldIndex: oldIndex, newIndex: newIndex})
			
		}		
	},
	
	getChildAt: function(index)
	{
		return this.children[index];
	},
	
	getChildIndex: function( child )
	{
		return this.children.indexOf( child );
	},
	
	lastChild: function()
	{
		return this.getChildAt( this.children.length -1 );	
	},
	
	firstChild: function()
	{
		return this.getChildAt(0);
	},
	
	removeChild: function( child )
	{
		if( !instanceOf(child, phi.ui.Component) )
			throw new Error( "Child must be a phi.ui.Component!");
		
		var index = this.getChildIndex( child );
		
		// Remove child	
		this.children.erase(child);
		
		// Remove child parent & dispatch
		// "remove" event.		
		child.setParent( null );
		child.dispatchEvent("removed", {index: index});
		
		// Dispatch "childRemoved" event.
		this.dispatchEvent("childRemoved", {child: child, index: index});
		
		return child;
	},
	
	hasChild: function( child )
	{
		for (var i=0; i < this.children.length; i++) 
		{
            if( child == this.children[i] )
                return true;
		}
		
		return false;
	},
	
	removeChildAt: function( index )
	{
		return this.removeChild( this.getChildAt(index));
	},
	
	getChildren: function()
	{
		return this.children;
	},
	
	removeAllChildren: function()
	{
		this.children = [];
	}
});


/**
 *
 * script: Iterator.js
 * name: phi.core.Iterator
 * 
 * description: Provides a way to access elements of an ArrayCollection
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - phi/core/ArrayCollection
 * 
 */
phi.core.Iterator = new Class({
	initialize: function( collection )
	{
		if( !collection )
			throw new Error( "Collection cannot be null!");
			
		if( !instanceOf(collection, phi.collections.ArrayCollection) )
			throw new Error( "Collection must be a ArrayCollection!");
			
		this.collection = collection;
		this.currentIndex = -1;
	},
	
	moveNext: function()
	{
		if( this.currentIndex < this.collection.length()-1 )
		{
			this.currentIndex++;
			return true;
		}
		
		return false;
	},
	
	movePrevious: function()
	{
		if( this.currentIndex > 0 )
		{
			this.currentIndex--;
			return true;
		}
		
		return false;
	},
	
	moveFirst: function()
	{
		this.currentIndex = 0;
		return this;
	},
	
	moveLast: function()
	{
		this.currentIndex = this.collection.length() - 1;
		return this;
	},
	
	current: function()
	{
		return this.collection.getItemAt( this.currentIndex );
	}
	
	
});
	

/**
 *
 * script: Element.js
 * name: Element
 */
Element.implement({
	instance: function()
	{
		return this.retrieve( "instance" );	
	},
	
	copyAttributes: function( element )
	{
		for (var i=0; i < element.attributes.length; i++) {
		  this.set(element.attributes[i].name, element.attributes[i].value);
		}
	},
	
	getAttributes: function()
	{
		var result = {};
		
		for (var i=0; i < this.attributes.length; i++) {
		  result[this.attributes[i].name] = this.attributes[i].value;
		}	
		
		return result;
	},
	
	getChildByTag: function( tagName )
	{
		var children = this.getChildren();
		
		for (var i=0; i < children.length; i++) 
		{
            if( children[i].get("tag").toLowerCase() == tagName.toLowerCase() )
                return children[i];
		}
		
		return null;
	},
	
	getChildrenByTag: function( tagName )
	{
		var children = this.getChildren();
		var result = [];
		
		for (var i=0; i < children.length; i++) 
		{
            if( children[i].get("tag").toLowerCase() == tagName.toLowerCase() )
                result.push(children[i]);
		}
		
		return result;
	},

	getParentByTag: function( tagName )
	{
		var parent = this.getParent();
		
		if( !parent )
			return null;
			
		if( parent.get("tag") == tagName )
			return parent;
		
		return parent.getParentByTag( tagName );
	},
	
	getParentByClass: function( className )
	{
		var parent = this.getParent();
		
		if( !parent )
			return null;
			
		if( parent.hasClass(className) )
			return parent;
			
		return parent.getParentByClass( className );
	},
	
	setWidth: function( value )
	{
		if( this.get('tag') == 'table' )
		{
			this.set('width', value);
			return;
		}
		
		this.setStyle("width", value);
	},
	
	setHeight: function( value )
	{
		if( this.get('tag') == 'table' )
		{
			this.set('height', value);
			return;
		}
		
		this.setStyle("height", value);
	},
	
	getWidth: function()
	{
		if( this.get('tag') == 'table' )
			return this.get('width');
			
		return this.getStyle('width');
	},
	
	getHeight: function()
	{
		if( this.get('tag') == 'table' )
			return this.get('height');
			
		return this.getStyle('height');
	}
});


//--------------------------------------------------------
// Phi.HTML: HtmlTable
//--------------------------------------------------------

phi.html.Table = new Class({
	Extends: HtmlTable,
		
	pushElement: function( element, trIndex, tdIndex)
	{
		var tr = new Element('tr', {});
		var td = new Element('td', {align:"left"});
		
		// If this is first TR just insert this using HtmlTable
		// push function.
		if( trIndex === null || this.body.rows.length === 0 || trIndex == this.body.rows.length )
		{
			tr.inject( this.body );
			td.inject( tr );
			element.inject(	td );
			
			return {tr: tr, td: td}; 
		}
	
		tr = this.tr( trIndex );
	
		// This creates a new TR and TD and insert the new
		// created TR at specific index.
		if( tdIndex === null )
		{
			var nextTr = tr;
			
			tr = new Element('tr', {});
			tr.inject( nextTr, 'before');
			
			td.inject( tr );
			element.inject(	td );
			
			return {tr: tr, td: td};
		}
		
		// This use an existing TR and create
		// only a new TD.
		if( tdIndex !== null && tdIndex < (tr.children.length) )
		{
			var nextTd = this.td( trIndex, tdIndex );
			
			if( nextTd )
				td.inject(nextTd, 'before' );
		}
		else
		{
			td.inject( tr );
		}
		
		element.inject(	td );
		return {tr: tr, td: td};
	},
	
	tr: function( trIndex )
	{
		return this.body.rows[trIndex];
	},
	
	td: function( trIndex, tdIndex )
	{
		return this.tr( trIndex ).getChildrenByTag('td')[tdIndex];
	}
});

/**
 *
 * script: BindWatcher.js
 * name: phi.core.BindWatcher
 * 
 * description: Provides a way to access elements of an ArrayCollection
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 * 
 */
phi.core.BindWatcher = new Class({
	Implements: [Events],
	Binds: ['applyBind'],
	
	target: null,
	targetProperty: null,
	source: null,
	sourceProperty: null,
	
	initialize: function( target, targetProperty, source,  sourceProperty )
	{
		this.target = target;
		this.targetProperty = targetProperty;
		this.source = source;
		this.sourceProperty = sourceProperty;
		
		this.bindSource();
		this.applyBind();
	},
	
	getSource: function()
	{
		return this.source;	
	},
	
	bindSource: function()
	{
		var source = this.getSource();
		
		if( source  === null || source === undefined )
			return;
		
		if ( source.addEvent ) 
		{
			if( !this.isSourceBind() )
				source.addEvent('propertyChange', this.applyBind);
		}
		else
			console.warn("Source ("+ source +") cannot be bind, please use 'ProxObject' to wrap your object for binding to work!")
	},
	
	isSourceBind: function()
	{
		return this.getSource().hasEvent('propertyChange', this.applyBind);
	},
	
	applyBind: function()
	{
		var source = this.getSource();
		var value  = null;
		
		if( this.getSource() === null || this.getSource() === undefined )
			return;
		
		if( source.get )
			value = source.get( this.sourceProperty );
		else
			value = source[ this.sourceProperty ];
			
		if( this.target.set )
			this.target.set( this.targetProperty, value );
		else
			this.target[ this.targetProperty ] = value;
	}
});

	

/**
 *
 * script: BindWatcher.js
 * name: phi.core.BindWatcher
 * 
 * description: Provides a way to access elements of an ArrayCollection
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 * 
 */
phi.core.BindViewWatcher = new Class({
	Extends: phi.core.BindWatcher,
	Implements: [Events],
	Binds: ['updateChain'],
	
	view: null,
	chain: [],
	
	initialize: function( view, target, targetProperty, source,  sourceProperty )
	{
		this.parent( target, targetProperty, source, sourceProperty);
		
		this.view = view;
		this.chain = [];
		this.updateChain();
	},
	
	updateChain: function( event )
	{
		// If we have a source to bind
		// we create a watcher for it.
		if( this.getSource() != null )
		{
			this.bindSource();
			this.applyBind();
			
			return;
		}

		// Remove all listners to parent
		// objects.
		this.removeAllListners();

		// Create listners to object that are not null.
		var result = this.view;
		var tmp = this.source.split('.');
		
		result.addEvent("propertyChange", this.updateChain);
		this.chain.push( result );	
		
		tmp.each( function( item, index ){
			if( result != null )
			{
				result = result[item];
				
				if( result )
				{
					result.addEvent("propertyChange", this.updateChain);						
					this.chain.push( result );
				}
			}
		}, this)
	},
	
	getSource: function()
	{
		if( this.source == '' )
			return this.view;
			
		var result = this.view
		var tmp = this.source.split('.');
		
		tmp.each( 
			function( item, index )
			{
				if( result != null )
				{
					result = result[item] || result.get(item);
				}
			}
		);
		
		return result;
	},
	
	removeAllListners: function()
	{
		this.chain.each( function( item, index ){
			item.removeEvent("propertyChange", this.updateChain);
		},this);
		
		this.chain = [];
	}
});

	

/**
 *
 * script: MessageDispatcher.js
 * name: phi.core.messaging.MessageDispatcher
 * 
 * description: 
 * This class is used to create views.
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 * 
 */
phi.core.MessageDispatcher = new Class({
	Implements: [Events],
	
	initialize: function()
	{
		// Throw error if an instance of this class
		// allredy exist.
		if( phi.core.MessageDispatcher.instance )
			throw new Error("Please use Phi.Mvc.Dispatcher.getInstance() to access Dispatcher!");
		
		// Save this instance
		// Because this is a singleton class
		phi.core.MessageDispatcher.instance = this;
	},
	
});

phi.core.MessageDispatcher.getInstance = function()
{
	return phi.core.MessageDispatcher.instance || new phi.core.MessageDispatcher();
};

/**
 *
 * script: ArrayCollection.js
 * name: phi.core.ArrayCollection
 * 
 * description: 
 * Provides basic operation on Array's
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - core/Events
 * 
 */
phi.collections.ArrayCollection = new Class({
	Implements: [Events],
	
	useProxy: false,
	source: [],
	
	initialize: function( options ) 
	{
		if( options )
		{
			this.useProxy = options.useProxyObjects;
			this.parseSource( options.source );
		}
	},
	
	addItem: function( item )
	{		
		this.addItemAt( item, this.source.length );
	},
	
	addItemAt: function( item, index )
	{
		var eventArgs = {};
		var pItem = this.wrapItem( item );
		
		eventArgs.item = pItem;
		eventArgs.index = index;
		eventArgs.location = index;
		eventArgs.kind = CollectionEventKind.ADD;
		
		// Add item
		this.source.splice(index, 0, pItem );

		// Dispatch event
		this.dispatchEvent( "collectionChange", eventArgs);		
	},
	
	setItemAt: function( item, index )
	{
		var eventArgs = {};
		var pItem = this.wrapItem( item );
		
		eventArgs.item = pItem;
		eventArgs.oldItem = this.getItemAt( index );
		eventArgs.location = index;
		eventArgs.kind = CollectionEventKind.REPLACE;
		
		// Add item
		this.source.splice(index, 1, pItem );
		
		// Dispatch event
		this.dispatchEvent("collectionChange", eventArgs)
	},
	
	moveItem: function( item, newIndex )
	{
		var eventArgs = {};
		var pItem = this.wrapItem( item );
		
		eventArgs.item = pItem;
		eventArgs.oldLocation = this.getItemIndex(item);
		eventArgs.location = newIndex;
		eventArgs.kind = CollectionEventKind.MOVE;
		
		// Remove item
		this.source.splice(eventArgs.oldLocation, 1);
		
		// Add item at new location
		this.source.splice(eventArgs.location, 0, pItem );
		
		// Dispatch event
		this.dispatchEvent("collectionChange", eventArgs);
	},
	
	removeItem: function( item )
	{
		this.removeItemAt( this.getItemIndex( item ) );
	},
	
	removeItemAt: function( index )
	{
		var eventArgs = {};
		
		eventArgs.item = this.getItemAt( index );
		eventArgs.location = index;
		eventArgs.kind = CollectionEventKind.REMOVE;
		
		// Remove item
		this.source.splice(index, 1);
		
		// Dispatch event
		this.dispatchEvent("collectionChange", eventArgs);
	},
	
	getItemAt: function( index )
	{
		return this.source[index];
	},
	
	getItemIndex: function( item )
	{
		return this.source.indexOf( item );
	},
	
	createIterator: function()
	{
		return new phi.core.Iterator( this );	
	},
	
	useProxyObjects: function( value )
	{
		this.useProxy = value;	
	},
		
	length: function()
	{
		return this.source.length;
	},
	
	wrapItem: function( item )
	{
		var result = item;
		
		if( this.useProxy && !instanceOf(item, phi.core.ProxyObject))
			result = new phi.core.ProxyObject( item );
		
		return result;	
	},
	
	toString: function()
	{
		return this.source.toString();
	},
	
	parseSource: function( source )
	{
		source.each( function( item ){
			this.addItem( item );
		}, this);
	}
});

/**
 *
 * script: PopUpManager.js
 * name: phi.mn.PopUpManager
 * 
 * description: Used to create a popup
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 * 
 */

phi.mn.PopUpManager = {};
phi.mn.PopUpManager.popups = [];

/**
 * Create a PopUp.
 * 
 * @param component - the UI component that will be in popup. In this way you 
 * can show in popup any UI component.
 */
phi.mn.PopUpManager.createPopUp = function( className, options )
{
	// Create a new popUp
	var popUp = new phi.ui.PopUp( options );
	
	popUp.uid = String.uniqueID();	
	popUp.addChild( new className());
	
	// Save popUp
	phi.mn.PopUpManager.popups[ popUp.uid ] = popUp;

	return popUp;
};

/**
 * Remove a PopUp.
 */
phi.mn.PopUpManager.removePopUp = function( popUp )
{
	if( popUp === null )
		return;
	
	if( !instanceOf(popUp, phi.ui.PopUp) )
		throw new Error( "PopUp must be an instance of phi.ui.PopUp!");	
			
	var rootBox = phi.ui.RootBox.get();
	
	// If popUp is on the stage
	// we remove it.
	if( rootBox.hasChild( popUp ))
	{
		if( popUp.modal )
			rootBox.removeChild( popUp.modal );
			
		rootBox.removeChild( popUp );
	}
		
	delete phi.mn.PopUpManager.popups[ popUp.uid ];
};

phi.mn.PopUpManager.addPopUp = function( popUp, modal )
{
	if( popUp === null )
		return;
		
	if( !instanceOf(popUp, phi.ui.PopUp) )
		throw new Error( "PopUp must be an instance of phi.ui.PopUp!");	
			
	var rootBox = phi.ui.RootBox.get();
	
	// If popUp is allready displayed
	// we return.
	if( rootBox.hasChild( popUp ) )
		return;
		
	// If we need to show popUp as modal.			
	if( modal )
	{
		// Create modal & add to stage
		popUp.modal = new phi.ui.Modal();
		rootBox.addChild( popUp.modal );
	}

	rootBox.addChild( popUp );
};

phi.mn.PopUpManager.getPopUpForView = function( view )
{
	for( var key in phi.mn.PopUpManager.popups )
	{
		var popUp = phi.mn.PopUpManager.popups[ key ];
		
		if( popUp.firstChild() == view )
			return popUp;
	}
	
	return null;
}

phi.mn.PopUpManager.bringToFront = function( popUp )
{
	if( popUp === null )
		return;
		
	if( !instanceOf(popUp, phi.ui.PopUp) )
			throw new Error( "PopUp must be an instance of phi.ui.PopUp!");
	
	var rootBox = phi.ui.RootBox.get();
		
	// If popUp is on the stage
	if( rootBox.hasChild( popUp ))
	{
		if( popUp.modal )
			rootBox.moveChild( popUp.modal, rootBox.getChildren().length -1 );
			
		rootBox.moveChild( popUp, rootBox.getChildren().length -1 );
	}
};


/**
 *
 * script: ThemeManager.js
 * name: phi.mn.ThemeManager
 * 
 * description: Used to load themes
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 * 
 */

phi.mn.ThemeManager = {};
phi.mn.ThemeManager.directory = "assets/themes/";
phi.mn.ThemeManager.theme = "default";

phi.mn.ThemeManager.setDirectory = function( value )
{
	phi.mn.ThemeManager.directory = value;
};

phi.mn.ThemeManager.load = function( theme )
{
	var themeDir = phi.mn.ThemeManager.directory;
	var linkElement =  new Element('link', {
		id: "theme_" + theme,
		rel: "stylesheet",
		href: themeDir + theme + "/css/"+ theme +".css",
		type: "text/css"
	});
	
	// Unload current loaded theme
	phi.mn.ThemeManager.unload( phi.mn.ThemeManager.theme );
	
	// Load new theme
	phi.mn.ThemeManager.theme = theme;
	linkElement.inject( $$('head')[0] );
};

phi.mn.ThemeManager.unload = function( theme )
{
	var el = $("theme_" + theme );
	
	if( el )
		el.dispose();
	
};


/**
 *
 * script: BindManager.js
 * name: phi.mn.BindManager
 * 
 * description: Used to create a popup
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 * 
 */

phi.mn.BindManager = {};
phi.mn.BindManager.watchers = [];

/**
 * Bind a source.property to target.property
 */
phi.mn.BindManager.bind = function(target, targetProperty, source,  sourceProperty)
{
	var watcher = new phi.core.BindWatcher(target, targetProperty, source,  sourceProperty);
	phi.mn.BindManager.watchers.push( watcher );
	
	return watcher;
};

/**
 * Bind a view.source.property to target.property
 */
phi.mn.BindManager.bindUsingView = function(view, target, targetProperty, source,  sourceProperty)
{
	var watcher = new phi.core.BindViewWatcher(view, target, targetProperty, source,  sourceProperty);
	phi.mn.BindManager.watchers.push( watcher );
	
	return watcher;
};

phi.mn.BindManager.removeWatchers = function( target )
{
	phi.mn.BindManager.watchers.each(
		function( watcher ) {
			if( watcher.target == target )
			{
				watcher.destory();
				phi.mn.BindManager.watchers.erase( watcher );
			}
						
		}
	);
}


/**
 *
 * script: Object
 * name: phi.ui.Object
 * 
 * description: Simple UI component.
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 * 
 */
phi.ui.Object = new Class({
	Extends: Options,
	Implements: [Events],
	
	options: {
		binds: {
		}
	},
	
	binds: null,
	
	initialize: function( options )
	{
		this.addEvent("optionsChange", this.onOptionsChange);
		this.setOptions( options );
	},
	
	setOptions: function( value )
	{
		this.parent( value );
		
		if( value )
			if( value.binds  )
				this.binds = value.binds;
		
		this.dispatchEvent("optionsChange");
	},
	
	set: function( property, value )
	{
		var setName = "set" + String.capitalize( property );
		var setFunction = this[ setName ].bind( this );
		
		setFunction( value );
	},
	
	get: function( property )
	{
		var getName = "get" + String.capitalize( property );
		
		if( this[ getName ] )
		{
			var getFunction = this[ getName ].bind(this); 
			return getFunction();
		}
		
		return null;
	}
	
});

/**
 *
 * script: Component.js
 * name: phi.ui.Component
 * 
 * description: Simple UI component.
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - phi/ui/Component
 * 
 */
phi.ui.Component = new Class({
	Extends: phi.ui.Object,
	Binds: ['onResize', 'onKeyDown'],
	
    element: null,
    parentComponent: null,
    className: null,
    displayAs: "block",
    
	options: {
		width: null,
		height: null,
		style: null,
		visible: undefined,
		enabled: undefined,
		buttonMode: undefined,
		paddingLeft: null,
		paddingTop: null,
		paddingRight: null,
		paddingBottom: null,
		backgroundColor: null
	},
	
	initialize: function( options )
	{
		this.parent( options );
		
		// Add listners
		this.addEvent('added', this.onAdded);
		this.addEvent('removed', this.onRemoved);
				
		// Add resize event
		window.addEvent('resize', this.onResize);
		window.addEvent('keydown', this.onKeyDown );
	},
	
	addClass: function( className )
	{
		if( className === null )
			return;
			
		$(this).addClass( className );
	},
	
	removeClass: function( className )
	{
		$(this).removeClass( className );	
	},
	
	getPosition: function()
	{
		return $(this).getPosition();	
	},
	
	setWidth: function( value )
	{
		if( value === null )
			return;
			
		if( Number.isPercentage(value))
			$(this).setWidth( value);
		else
			$(this).setWidth( Number.withPx(value));
		
		this.dispatchEvent("widthChange", {value: value});
		return this;
	},
	
	setHeight: function( value )
	{
		if( value === null )
			return;
			
		if( Number.isPercentage(value))
			$(this).setHeight(value);
		else
			$(this).setHeight( Number.withPx(value));
			
		this.dispatchEvent("heightChange", {value: value});
		return this;
	},
	
	getWidth: function()
	{
		return $(this).getWidth();
	},
	
	getHeight: function()
	{
		return $(this).getHeight();
	},
	
	setSize: function( w, h )
	{
		this.setWidth(w);
		this.setHeight(h);	
	},
	
	setParent: function( value )
	{
		this.parentComponent = value;
	},
	
	getParent: function()
	{
		return this.parentComponent;	
	},
	
	getParentView: function()
	{
		if( instanceOf(this, phi.ui.View))
			return this;
			
		if( this.getParent() )
			return this.getParent().getParentView();
			
		return null;	
	},
	
	setVisible: function( value )
	{
		if( value === undefined )
			return;
		
		if( (typeof value) == "string" )
			value = Boolean.fromString( value );
			
		if( value )
			$(this).setStyle("display", this.displayAs);
		else
			$(this).setStyle("display","none");
	},
	
	getVisible: function()
	{
		var dispaly = $(this).getStyle("display");
		return display != "none";
	},
	
	setEnabled: function( value )
	{
		if( value === undefined )
			return;
				
		if( (typeof value) == "string" )
			value = Boolean.fromString( value );
				
		if( value )
		{
			$(this).removeClass('disabled');
			$(this).erase('disabled');
		}
		else
		{
			$(this).addClass('disabled');
			$(this).set('disabled', 'disabled');
		}
	},
	
	getEnabled: function()
	{
		return !$(this).hasClass('disabled');
	},
	
	setBackgroundColor: function( value )
	{
		if( value === null || value === undefined )
			return;
			
		$(this).setStyle('background-color', value);
	},
	
	toElement: function()
	{
		if( this.element === null )
		{
			this.element = this.createElement();
			this.initElement();
		}
		
		return this.element;
	},
	
	isAddedToStage: function()
	{
		if( this.getParent() !== null )
			return this.getParent().isAddedToStage();
			
		if( $(this).getParent() !== null )
			return true;
			
		return false;
	},
	
	setPadding: function( side, size )
	{
		if( size === null )
			return;
			
		$(this).setStyle("padding-" + side, Number.withPx(size));
	},
	
	setButtonMode: function( value )
	{
		if( value === undefined )
			return;
		
		if( (typeof value) == "string" )
			value = Boolean.fromString( value );
			
		$(this).removeClass('buttonMode');
		
		if( value )
			$(this).addClass('buttonMode');
	},
	
	getButtonMode: function()
	{
		return $(this).hasClass('buttonMode');
	},
	
	//-------------------------------------------------------------------
	// Protected functions
	//-------------------------------------------------------------------
	
	/**
	 * Create element for each
	 * phi.ui.Component.
	 */
	createElement: function()
	{
		throw new Error("CreateElement function not implemented.");
	}.protect(),
	
	/**
	 * Adds events and other options to 
	 * DOM element after the element was 
	 * created.
	 */
	initElement: function()
	{
		// Store instance
		$(this).store("instance", this);

		// Bubbles DOM element events 
		$(this).addEvent("click", $bubbleEvent.bind(this));
		$(this).addEvent("dblclick", $bubbleEvent.bind(this));
		$(this).addEvent("keydown",	$bubbleEvent.bind(this));
		$(this).addEvent("keypress", $bubbleEvent.bind(this));
		$(this).addEvent("keyup", $bubbleEvent.bind(this));
		$(this).addEvent("mousedown", $bubbleEvent.bind(this));
		$(this).addEvent("mousemove", $bubbleEvent.bind(this));
		$(this).addEvent("mouseout", $bubbleEvent.bind(this));
		$(this).addEvent("mouseover", $bubbleEvent.bind(this));
		$(this).addEvent("mouseup", $bubbleEvent.bind(this));
		$(this).addEvent("mouseenter", function(event) { event.type = "mouseenter";$bubbleEvent.bind(this)(event); }.bind(this));
		$(this).addEvent("mouseleave", function(event) { event.type = "mouseleave";$bubbleEvent.bind(this)(event); }.bind(this));
	}.protect(),
	
	onOptionsChange: function()
	{
		var op = this.options;
		
		// Set size
		this.setWidth( op.width );
		this.setHeight( op.height );
		
		// Add custom class
		this.addClass( op.style );
		
		// Set padding
		this.setPadding("left", op.paddingLeft);
		this.setPadding("top", op.paddingTop);
		this.setPadding("right", op.paddingRight);
		this.setPadding("bottom", op.paddingBottom);
		this.setBackgroundColor( op.backgroundColor );
		
		this.setButtonMode( op.buttonMode );
		this.setVisible( op.visible );
		this.setEnabled( op.enabled );
		
		// Create binds
		this.createWatchers();
		
	}.protect(),
	
	createWatchers: function()
	{
		var binds = this.binds;
		
		for( var key in binds )
		{
			phi.mn.BindManager.bindUsingView(
				binds[key].view, 	// View 
				this, 				// Target
				key, 				// TargetProperty
				binds[key].source, 	// Source relative to View
				binds[key].value	// SourceProperty
			);
		}
	},
	
	//-------------------------------------------------------------------
	// Handlers
	//-------------------------------------------------------------------
	
	onAdded: function( event )
	{
	},
	
	onRemoved: function( event )
	{
	},
	
	onResize: function( event )
	{
	},
	
	onKeyDown: function( event )
	{
	}
});

/**
 *
 * script: Modal.js
 * name: phi.ui.Modal
 * 
 * description: This component is used by PopUp component to display itself as
 *              modal PopUp.
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - phi/ui/Component
 * 
 */
phi.ui.Modal = new Class({
	Extends: phi.ui.Component,
	Binds: ['onAdded','onWindowResize'],
	
	initialize: function( options )
	{
		this.parent( options );
		this.addEvent('added', this.onAdded);
	},
	
	
	createElement: function()
	{
		return new Element("div", {'class':'phi-Modal'});
	}.protect(),
	
	initElement: function()
	{
		this.parent();
		
		$(this).setStyle('position', 'absolute');
		$(this).setStyle('top', '0px');
		$(this).setStyle('left', '0px');
		
	}.protect(),
	
	updateSize: function()
	{
		var size = window.getSize();
		this.setSize(size.x, size.y);
	},
	
	onAdded: function()
	{
		this.updateSize();
	}
	
});

/**
 *
 * script: Button.js
 * name: phi.ui.Button
 * 
 * description: Simple button.
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - phi/ui/Component
 * 
 */
phi.ui.Button = new Class({
	Extends: phi.ui.Component,
	
	text: "",

	setText: function( value )
	{
		if( value === null )
			return;
			
		$(this).set("html", value);
	},
	
	getText: function()
	{
		return $(this).get("html");		
	},
	
	createElement: function()
	{
		return new Element("button");
	}.protect(),
	
	initElement: function()
	{
		this.parent();
		$(this).addClass('phi-Button');
		
	}.protect(),
	
	onOptionsChange: function()
	{
		this.parent();
		this.setText( this.options.text );
	}
});

/**
 * Factory method.
 * @param options.
 */
phi.ui.Button.create = function( options )
{
	var result = new phi.ui.Button( options );
	return result;
};


/**
 *
 * script: CheckBox.js
 * name: phi.ui.CheckBox
 * 
 * description: Checkbox control
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - phi/ui/Component
 * 
 */
phi.ui.CheckBox = new Class({
	Extends: phi.ui.Component,
	
	options: {
		checked: null
	},
	
	initialize: function( options )
	{
		this.parent( options );
	},
	
	setChecked: function( value )
	{
		if( value === null || value === undefined )
			return;
			
		$(this).checked = value;
	},
	
	getChecked: function()
	{
		return $(this).checked;	
	},
	
	createElement: function()
	{
		return new Element(
			"input", 
			{
				type:"checkbox", 
				checked: false
			}
		);
	}.protect(),
	
	initElement: function()
	{
		this.parent();
		$(this).addClass('phi-CheckBox');
		
	}.protect(),
	
	onOptionsChange: function()
	{
		this.parent();
		this.setChecked( this.options.checked );
	}
});


/**
 * Factory method.
 * @param options.
 */
phi.ui.CheckBox.create = function( options )
{
	var result = new phi.ui.CheckBox( options );
	return result;
}

/**
 *
 * script: TextInput.js
 * name: phi.ui.TextInput
 * 
 * description: 
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - phi/ui/Component
 * 
 */
phi.ui.TextInput = new Class({
	Extends: phi.ui.Component,
	
	text: null,
	className: "phi.ui.TextInput",
	
	options: {
		text: null,
		color: null
	},

	initialize: function( options )
	{
		this.parent( options );
		
		// Add listners
		this.addEvent('keydown', this.onInputKeyDown)
		this.addEvent('keyup', this.onInputKeyUp);
	},
	
	setText: function( value )
	{
		if( value === null )
			return;
			
		$(this).set("value", value);
		this.dispatchEvent("propertyChange", {property: 'text', value: value});
	},
	
	getText: function()
	{
		return $(this).get("value");		
	},
	
	setColor: function( value )
	{
		if( value === null || value === undefined )
			return;
			
		$(this).setStyle('color', value);
	},
	
	displayAsPassword: function( value )
	{
		if( value === null )
			return;
			
		if( value )
			$(this).set("type", "password");
		else
			$(this).set("type", "text");
	},
	
	createElement: function()
	{
		return new Element("input", {type: "text", 'class': 'phi-TextInput'});
	},
	
	onOptionsChange: function()
	{
		this.parent();
		
		this.setText( this.options.text );
		this.setColor( this.options.color );
		this.displayAsPassword( this.options.displayAsPassword );
	},
		
	onInputKeyUp: function( event )
	{
		this.dispatchEvent("textChange");
		this.dispatchEvent("propertyChange", {property: 'text', value: this.getText()});
	},
	
	onInputKeyDown: function( event )
	{
		if( event.key == 'enter' )
			this.dispatchEvent('enter');
	}
	
});


/**
 * Factory method.
 * @param options.
 */
phi.ui.TextInput.create = function( options )
{
	var result = new phi.ui.TextInput( options );
	return result;
};



/**
 *
 * script: Image.js
 * name: phi.ui.Image
 * 
 * description: Plain image.
 * 
 * 
 * authors:
 *   - Neuromaster
 * 
 * requires:
 *   - phi/ui/Component
 * 
 */
phi.ui.Image = new Class({
	Extends: phi.ui.Component,
	
	options: {
		source: null	
	},
	
	initialize: function( options )
	{
		this.parent( options );
	},
	
	setSource: function( value )
	{
		if( value === null || value === undefined )
			return;
			
		$(this).set("src", value);
	},
	
	getSource: function ()
	{
		return $(this).get("src");
	},
	
	createElement: function()
	{
		return new Element("img");
	}.protect(),
	
	onOptionsChange: function()
	{
		this.parent();
		
		this.setSource( this.options.source );
	},
	
	initElement: function()
	{
		this.parent();
		
		$(this).setStyle('display', 'block');
		$(this).addClass('phi-Image');
		
	}.protect()
});

/**
 * Factory method.
 * @param options.
 */
phi.ui.Image.create = function( options )
{
	var result = new phi.ui.Image( options );
	return result;
};

/**
 *
 * script: Lable.js
 * name: phi.ui.Label
 * 
 * description: Simple text.
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - phi/ui/Component
 * 
 */
phi.ui.Label = new Class({
	Extends: phi.ui.Component,
	
	text: "",
	
	options: {
		text: null,
		fontSize: null,
		color: null
	},
	
	setFontSize: function( value )
	{
		if( value === null || value === undefined )
			return;
			
		$(this).setStyle('font-size', Number.withPx(value));
	},
	
	setColor: function( value )
	{
		if( value === null || value === undefined )
			return;
			
		$(this).setStyle('color', value);
	},
	
	setText: function( value )
	{
		if( value === null )
			return;
			
		$(this).set("html", value);
	},
	
	getText: function()
	{
		return $(this).get("html");		
	},
	
	createElement: function()
	{
		return new Element("div");
	}.protect(),
	
	initElement: function()
	{
		this.parent();
		$(this).addClass('phi-Label');
		$(this).setStyle('cursor', 'default');
		
	}.protect(),
	
	onOptionsChange: function()
	{
		this.parent();
		
		this.setText( this.options.text );
		this.setColor( this.options.color );
		this.setFontSize( this.options.fontSize );
	}
	
});

/**
 * Factory method.
 * @param options.
 */
phi.ui.Label.create = function( options )
{
	var result = new phi.ui.Label( options );
	return result;
};


/**
 *
 * script: Container.js
 * name: phi.ui.Container
 * 
 * description: This is base class for all UI components that can have children.
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - phi/ui/Component.js
 *	 - phi/core/ChildList.js
 *	 - phi/core/Iterator.js
 *   - phi/collections/ArrayCollection.js
 * 
 */
phi.ui.Container = new Class({
	Extends: phi.ui.Component,
	Implements: [phi.core.ChildList],
	
	initialize: function(options)
	{
		this.parent(options);
		
		this.addEvent("childAdded", this.onChildAdded);
		this.addEvent("childRemoved", this.onChildRemoved);
		
		this.createChildren();
		this.prepareChildren();
		
		this.dispatchEvent( "childrenCreated" );
	},
	
	createChildren: function()
	{
	},
	
	prepareChildren: function()
	{
	},
	
	redrawChild: function( child )
	{
		var el = new Element('div');
		el.inject($(child));
			
		setTimeout(
			function() 
			{ 
				el.destroy();
			}.bind(this),
			1
		);
	},
	
	createIterator: function()
	{
		return new phi.core.Iterator( new phi.collections.ArrayCollection({ source: this.children }));	
	},
	
	createElement: function()
	{
		return new Element("div");
	}.protect(),
	
	//-------------------------------------------------------------------
	// Protected functions
	//-------------------------------------------------------------------
	
	onChildAdded: function( event )
	{
		// If this is last child
		// inject at last element.
		if( event.index == this.children.length - 1 )
			$(event.child).inject( $(this) );
		else		
			// If is not last inserted at specified index
			$(event.child).inject( $(this.getChildAt(event.index+1)), 'before' );
	},
	
	onChildRemoved: function( event )
	{
		$(event.child).dispose();
	}
});

/**
 *
 * script: View.js
 * name: phi.ui.View
 * 
 * description: 
 * This class is used to create views.
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 * 
 */
phi.ui.View = new Class({
	Extends: phi.ui.Container,
	
	data: null,
	message: null,
	useProxy: true,
	
	initialize: function(options)
	{
		this.parent( options );
		this.initMessages();
		
		this.dispatchEvent( "creationComplete" );
	},
	
	useProxyObjects: function( value )
	{
		if( value === null || value === undefined )
			return;
			
		this.useProxy = value;	
	},
	
	setData: function( value )
	{
		if( value === null )
			return;
			
		this.data = this.wrapData( value );
		this.dispatchEvent("propertyChange", {property: 'data', value: this.data});
	},
	
	getData: function()
	{
		return this.data;
	},
	
	sendMessage: function( name, args )
	{
		var dispatcher = phi.core.MessageDispatcher.getInstance();
		dispatcher.dispatchEvent( name, args );
	},
	
	//-------------------------------------------------------------------
	// Protected functions
	//-------------------------------------------------------------------
	
	onOptionsChange: function()
	{
		this.parent();
		this.useProxyObjects( this.options.useProxyObjects );
		
	}.protect(),
	
	initElement: function()
	{
		this.parent();
		$(this).addClass("phi-View");
		
	}.protect(),
	
		
	wrapData: function( data )
	{
		var result = data;
		
		if( this.useProxy && !instanceOf(data, phi.core.ProxyObject))
			result = new phi.core.ProxyObject( data );
		
		return result;	
	}.protect(),
	
	/**
	 * This function is called by phi.ui.Container after createChildren() was called
	 * and before dispatching "childrenCreated" event.
	 * 
	 * @param - target is the root view
	 */
	prepareChildren: function( target )
	{
		Object.forEachChild( 
			this, 
			function( target )
			{
				if( target.options.id )
				{
					if( this[target.options.id] )
						throw new Error("The id: " + target.options.id + " is allready used.");
						
					this[ target.options.id ] = target;
				}
					
			}.bind(this),
			function( target )
			{
				return !instanceOf( target, phi.ui.View);
			}
		);
	},
	
	initMessages: function()
	{
		if( this.messages === null )
			return;
		
		var dispatcher = phi.core.MessageDispatcher.getInstance();
		
		for( var key in this.messages )
		{
			var name = key;
			var func = this[this.messages[key]];
			
			dispatcher.addEvent( name, func.bind(this));
		}
	}.protect()
});


/**
 *
 * script: TitleWindow.js
 * name: phi.ui.TitleWindow
 * 
 * description: This component is used to display a window with title.
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - phi/ui/containers/CellBox.js
 * 
 */
phi.ui.TitleWindow = new Class({
	Extends: phi.ui.Container,
	
	headerElement: null,
	titleElement: null,
	closeElement: null,
	bodyElement: null,
	drag: null,
	
	options: {
		title: null,
	},

	//-------------------------------------------------------------------
	// Protected functions
	//-------------------------------------------------------------------
	
	setTitle: function( value )
	{
		if( value === null || value === undefined )
			return;
			
		this.titleElement.set("html", value);
	},
	
	getTitle: function()
	{
		return this.titleElement.get("html");
	},
	
	onOptionsChange: function()
	{
		this.parent();
		this.setTitle( this.options.title );
		
	}.protect(),

	createElement: function()
	{
		var el = new Element("div");
		
		// Create Title & Body elements
		this.headerElement = new Element("div");
		this.headerElement.addEvent("mousedown", this.onHeaderClick.bind(this));
		
		this.titleElement = new Element("div", {html: ""});
		this.bodyElement = new Element("div");
		
		this.closeElement = new Element("div");
		this.closeElement.addEvent('click', function(){
			this.dispatchEvent("close");
		}.bind(this))
		
		// Indext Title & Body		
		this.closeElement.inject( this.headerElement );
		this.titleElement.inject( this.headerElement );
		
		this.headerElement.inject( el );
		this.bodyElement.inject( el );
		
		return el;
	}.protect(),
	
	initElement: function()
	{
		this.parent();
		
		this.headerElement.addClass("header");
		this.titleElement.addClass("title");
		this.bodyElement.addClass("body");
		this.closeElement.addClass("close");
		
		$(this).addClass("phi-TitleWindow");
		
	}.protect(),
	
	onChildAdded: function( event )
	{
		// If this is last child
		// inject at last element.
		if( event.index == this.children.length - 1 )
			$(event.child).inject( this.bodyElement );
		else		
			// If is not last inserted at specified index
			$(event.child).inject( $(this.getChildAt(event.index+1)), 'before' );
	},
	
	onChildRemoved: function( event )
	{
		$(event.child).dispose();
	},
	
	onAdded: function( event )
	{
	},
	
	onHeaderClick: function( event )
	{
		if( !this.drag )
		{
			var popUp = phi.mn.PopUpManager.getPopUpForView( this.getParent() );
			
			if( popUp )
			{
				console.log( popUp );
				
				// Drag ability
				this.drag = new Drag( $(popUp), {handle: this.headerElement} );
				this.drag.bound.start( event );
			}
		}
	}
});

/**
 * Factory method.
 * @param options.
 */
phi.ui.TitleWindow.create = function( options )
{
	var result = new phi.ui.TitleWindow( options );
	return result;
};


/**
 *
 * script: ViewStack.js
 * name: phi.ui.ViewStack
 * 
 * description: This is a navigator container.
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - phi/ui/containers/Container.js
 * 
 */
phi.ui.ViewStack = new Class({
	Extends: phi.ui.Container,
	
	selectedIndex: -1,

	setSelectedIndex: function( value )
	{
		// Save check
		if( value < 0 || value > this.children.length  )
			return;
			
		// Hide current visible child
		if( this.selectedIndex > -1 )
			this.getChildAt( this.selectedIndex ).setVisible( false );
			
		// Store selected index
		this.selectedIndex = Number.from( value );
		
		// Show new child
		if( this.selectedIndex < this.children.length )
			this.getChildAt( this.selectedIndex ).setVisible( true );
	},
	
	getSelectedIndex: function()
	{
		return this.selectedIndex;
	},
	
	next: function()
	{
		var newIndex = this.getSelectedIndex() + 1;
		
		if( newIndex >= this.children.length )
			return;
			
		this.setSelectedIndex( newIndex );
	},
	
	prev: function()
	{
		var newIndex = this.getSelectedIndex() - 1;
		
		if( newIndex < 0)
			return;
			
		this.setSelectedIndex( newIndex );
	},
	
	
	//-------------------------------------------------------------------
	// Protected functions
	//-------------------------------------------------------------------
	
	onOptionsChange: function()
	{
		this.parent();
		
		if( this.options.selectedIndex )
			this.setSelectedIndex( this.options.selectedIndex );
            
	}.protect(),
	
	onChildAdded: function( event )
	{
		this.parent( event );
		
		if( this.children.length > 1 )
			event.child.setVisible( false );
			
	}.protect(),
	
	onChildRemoved: function( event )
	{
		this.parent( event );
	},
	
	initElement: function()
	{
		this.parent();
		$(this).addClass("phi-ViewStack");
		
	}.protect()
});

/**
 * Factory method.
 * @param options.
 */
phi.ui.ViewStack.create = function( options )
{
	var result = new phi.ui.ViewStack( options );
	return result;
};


/**
 *
 * script: HTMLBox.js
 * name: phi.ui.HTMLBox
 * 
 * description: This container is used to inject a phi.ui.Component into a specific HTML element
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - phi/ui/containers/Container.js
 * 
 */
phi.ui.HTMLBox = new Class({
	Extends: phi.ui.Container,
	
	initialize: function(element, options)
	{
		this.parent(options);
		
		if( !element )
			throw new Error("HTMLBox element parameter is require!");

		// Add Box to DOM			
		$(this).inject( $(element) );
	},
	
	//-------------------------------------------------------------------
	// Protected functions
	//-------------------------------------------------------------------
	
	initElement: function()
	{
		this.parent();
		$(this).addClass("phi-HTMLBox");
		
	}.protect(),
	
	onAdded: function( event )
	{
		throw new Error("You can't add HTMLBox as a child please use other container!");
	}
});

/**
 *
 * script: ScrollBox.js
 * name: phi.ui.ScrollBox
 * 
 * description: This layout component adds scroll
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - phi/ui/containers/Container.js
 * 
 */
phi.ui.ScrollBox = new Class({
	Extends: phi.ui.Container,
	
	initialize: function()
	{
		this.parent();
	},
	
	//-------------------------------------------------------------------
	// Protected functions
	//-------------------------------------------------------------------
	
	initElement: function()
	{
		this.parent();
		
		$(this).addClass("phi-ScrollBox");
		$(this).setStyle("overflow", "auto");
		
	}.protect(),
	
	createElement: function()
	{
		return new Element("div");
	}.protect()
});

/**
 *
 * script: CellBox.js
 * name: phi.ui.CellBox
 * 
 * description: This is a layout component that allows you to arrange your components in a table.
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - phi/ui/containers/Container.js
 *	 - phi/html/Table.js
 * 
 */
phi.ui.CellBox = new Class({
	Extends: phi.ui.Container,
	
	options: {
		horizontalAlign: "left",
		verticalAlign: "middle",
		border: 0
	},
	
	table: null,

	getTable: function()
	{
		if( !this.table )
			this.table = new phi.html.Table();
			
		return this.table;
	},
	
	setChildVerticalAlign: function( child, align )
	{
		if( instanceOf(child, Number) )
			child = this.getChildAt( child );
			
		if( this.hasChild(child) )
			$(child).getParent().set('valign', align);
			
		// @FIX for Chrome.
		if( Browser.chrome || Browser.safari )
			this.redrawChild( child );
	},
	
	setChildHorizontalAlign: function( child, align )
	{
		if( instanceOf(child, Number) )
			child = this.getChildAt( child );
			
		if( this.hasChild(child) )
			$(child).getParent().set('align', align);
			
		// @FIX for Chrome.
		if( Browser.chrome || Browser.safari )
			this.redrawChild( child );
	},
	
	setVerticalAlign: function( align )
	{
		this.options.verticalAlign = align;
		
		var iterator = this.createIterator();
		
		while( iterator.moveNext() )
			this.setChildVerticalAlign( iterator.current(), align );
			
		return this;
	},
	
	getVerticalAlign: function()
	{
		return this.options.verticalAlign;
	},
	
	setHorizontalAlign: function( align )
	{
		this.options.horizontalAlign = align;
		
		var iterator = this.createIterator();
		
		while( iterator.moveNext() )
			this.setChildHorizontalAlign( iterator.current(), align );
			
		return this;
	},
	
	getHorizontalAlign: function()
	{
		return this.options.horizontalAlign;
	},
	
	setCellWidth: function( trIndex, tdIndex, value )
	{
		var td = this.getTable().td(trIndex, tdIndex);
		
		if( td )
			td.set("width", value);
	},
	
	setCellHeight: function( trIndex, tdIndex, value )
	{
		var td = this.getTable().td(trIndex, tdIndex);
		
		if( td )
			td.set("height", value);
	},

	setBorder: function( value )
	{
		$(this).set('border', value);
	},
	
	getBorder: function()
	{
		return Number.from( $(this).get('border') );
	},
	
	//-------------------------------------------------------------------
	// Protected functions
	//-------------------------------------------------------------------
	
	/**
	 * Returns table DOM element
	 * @override
	 */
	createElement: function()
	{
		return $(this.getTable());
	}.protect(),
	
	initElement: function()
	{
		this.parent();
		$(this).addClass("phi-CellBox");
		
	}.protect(),
	
	onOptionsChange: function()
	{
		var op = this.options;
		
		// Call super
		this.parent();
		
		// Set border
		this.setBorder( op.border );
		
		// Align
		this.setVerticalAlign( op.verticalAlign );
		this.setHorizontalAlign( op.horizontalAlign );
	}.protect()
});

/**
 * Factory method.
 * @param options.
 */
phi.ui.CellBox.create = function( options )
{
	var result = new phi.ui.CellBox( options );
	return result;
};



/**
 *
 * script: RootBox.js
 * name: phi.ui.RootBox
 * 
 * description: 
 * This is the main container. You must use this like 
 * this: phi.ui.RootBox.get().addChild( child )
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - phi/ui/containers/Container.js
 * 
 */
phi.ui.RootBox = new Class({
	Extends: phi.ui.Container,
	
	percentageWidth: 0,
	percentageHeight: 0,
	
	initialize: function()
	{
		this.parent();
		
		// Throw error if an instance of this class
		// allredy exist.
		if( phi.ui.RootBox.instance )
			throw new Error("Please use phi.ui.RootBox.get() to access RootBox!");
		
		// Save this instance
		// Because this is a singleton class
		phi.ui.RootBox.instance = this;
	},
	
	updateSize: function()
	{
		if( this.percentageWidth > 0 )
			this.setWidth( $(this).getParent().getSize().x * this.percentageWidth/100 );
			
		if( this.percentageHeight > 0 )
			this.setHeight( $(this).getParent().getSize().y * this.percentageHeight/100 );
	},
	
	setPercentageWidth: function( value )
	{
		this.percentageWidth = value;
		this.updateSize();
	},
	
	setPercentageHeight: function( value )
	{
		this.percentageHeight = value;
		this.updateSize();
	},
	
	//-------------------------------------------------------------------
	// Protected functions
	//-------------------------------------------------------------------
	
	/**
	 * Create RootBox DOM element.
	 */
	createElement: function()
	{
		return new Element("div");
	}.protect(),
	
	initElement: function()
	{
		this.parent();
		$(this).addClass("phi-RootBox");
		
	}.protect(),
	
	onAddedToStage: function( event )
	{
	}.protect(),
	
	onResize: function( event )
	{
		this.updateSize();
	}

});

phi.ui.RootBox.getInstance = function()
{
	return phi.ui.RootBox.instance || new phi.ui.RootBox();
};

phi.ui.RootBox.get = function()
{
	var element = $$("body")[0];
	var instance = element.retrieve( "rootBox" );
	
	if( instance )
		return instance;

	// If this is the first instance we create it
	// and store it to element.		
	instance = phi.ui.RootBox.getInstance();
	element.store( "rootBox", instance );
	
    // Inject element to DOM
	$(instance).inject( element );
	
	// Dispatch added to stage
	instance.dispatchEvent("added", {index: 0});
	
	return instance;
	
};


/**
 *
 * script: PopUp.js
 * name: phi.ui.PopUp
 * 
 * description: This container is used by PopUpManager to display a phi.ui.Component in a popup.
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - phi/ui/containers/Container.js
 * 
 */
phi.ui.PopUp = new Class({
	Extends: phi.ui.Container,
	Binds: ['onWindowMouseUp'],
	
	uid: "",
	options: {
		hideOnClick: false,
		relativeTo: null,
		allowNegative: false
	},
	
	initialize: function( options )
	{
		this.parent( options );
		window.addEvent('mouseup', this.onWindowMouseUp);
	},
	
	center: function()
	{
		$(this).position();
	},
	
	snapTo: function( component, side )
	{
		if( !side )
			side = PopUpSnap.BOTTOM;
			
		// Show popup first
		this.show();
		
		// Snap to phi.ui.Component
		$(this).position({
			relativeTo: $(component),
			position: PopUpSnap.mapSide[side],
			edge: PopUpSnap.mapEdge[side],
			allowNegative: true
		});
	},
	
	snapToElement: function( element, att )
	{
		// Show popup first
		this.show();
		
		// Snap to HTML element
		att.relativeTo = element;
		att.allowNegative = true;
		
		$(this).position( att );
	},
	
	setX: function( x )
	{
		$(this).setStyle('left', x);
	},
	
	setY: function( y )
	{
		$(this).setStyle('top', y);
	},
	
	setPosition: function( x, y )
	{
		this.setX( x );
		this.setY( y );
	},
	
	hide: function()
	{
		phi.mn.PopUpManager.removePopUp( this );
		return this;
	},
	
	show: function( modal )
	{
		phi.mn.PopUpManager.addPopUp( this, modal );
		return this;
	},
	
	isVisible: function()
	{
		var rootBox = phi.ui.RootBox.get();
		return rootBox.hasChild( this );
	},
	
	//-------------------------------------------------------------------
	// Protected functions
	//-------------------------------------------------------------------
	
	onChildAdded: function( event )
	{
		$(event.child).inject( $(this) );
	},
	
	onChildRemoved: function( event )
	{
		$(event.child).dispose();
	},
	
	onWindowMouseUp: function( event )
	{
		if( this.isVisible() )
		{
			if( this.options.hideOnClick )
			{
				if( !$(this).contains(event.target) )
					this.hide();
			}
		}
	},
	
	//-------------------------------------------------------------------
	// DOM functions
	//-------------------------------------------------------------------
	
	createElement: function()
	{
		return new Element('div');
	}.protect(),
	
	initElement: function()
	{
		this.parent();
		
		$(this).setStyle('position', 'absolute');
		$(this).setStyle('top', '0px');
		$(this).setStyle('left', '0px');
		$(this).addClass('phi-PopUp');
		
	}.protect(),
	
	onResize: function( event )
	{
		this.hide();
	}
});

/**
 *
 * script: HBox.js
 * name: phi.ui.HBox
 * 
 * description: This layout component arrange all children horizontal.
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - phi/ui/containers/CellBox.js
 * 
 */
phi.ui.HBox = new Class({
	Extends: phi.ui.CellBox,
	Binds: ['onChildWidthChange'],
	
	options: {
		gap: 0
	},
	
	setCellWidth: function( index, value )
	{
		this.parent(0, index, value);
	},
	
	setCellHeight: function( index, value )
	{
		this.parent(0, index, value);
	},
	
	setGap: function( value )
	{
		this.options.gap = value;
		
		for (var i=1; i < this.children.length; i++) {
		  this.getTable().td(0, i).setStyle('padding-left', Number.withPx(value));
		}
	},
	
	getGap: function()
	{
		return this.options.gap;
	},
	
	//-------------------------------------------------------------------
	// Protected functions
	//-------------------------------------------------------------------
		
	onOptionsChange: function()
	{
		this.parent();
		this.setGap( this.options.gap );
	}.protect(),
	
	onChildAdded: function( event )
	{
		// Add DOM element
		var td = this.getTable().pushElement( $(event.child), 0, event.index).td;
		
		// Update child aligment
		this.setChildVerticalAlign( event.child, this.getVerticalAlign() );
		this.setChildHorizontalAlign( event.child, this.getHorizontalAlign() );
		
		// Update child gap
		if( event.index > 0 )
			td.setStyle('padding-left', Number.withPx(this.getGap()));
			
		// Update cell width
		event.child.addEvent('widthChange', this.onChildWidthChange);
		this.updateCellWidth( event.child );
		
	}.protect(),
	
	onChildRemoved: function( event )
	{
		// Remove DOM element
		$(event.child).getParent().dispose();
	},
	
	onChildWidthChange: function( event )
	{
		this.updateCellWidth( event.target );
	},
	
	updateCellWidth: function( child )
	{
		var width = child.getWidth();
		var index = this.getChildIndex(child);
		
		if( width )
			this.setCellWidth(index, width);
	},
	
	initElement: function()
	{
		this.parent();
		
		$(this).removeClass("phi-CellBox");
		$(this).addClass("phi-HBox");
		
	}.protect()
});

/**
 * Factory method.
 * @param options.
 */
phi.ui.HBox.create = function( options )
{
	var result = new phi.ui.HBox( options );
	return result;
};


/**
 *
 * script: VBox.js
 * name: phi.ui.VBox
 * 
 * description: This layout component arrange all children vertical.
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - phi/ui/containers/CellBox.js
 * 
 */
phi.ui.VBox = new Class({
	Extends: phi.ui.CellBox,
	Binds: ['onChildHeightChange'],
	
	options: {
		gap: 0
	},
	
	setCellWidth: function( index, value )
	{
		this.parent(index, 0, value);
	},
	
	setCellHeight: function( index, value )
	{
		this.parent(index, 0, value);
	},
	
	setGap: function( value )
	{
		this.options.gap = value;
		
		for (var i=1; i < this.children.length; i++) {
		  this.getTable().td(i, 0).setStyle('padding-top', Number.withPx(value));
		}
	},
	
	getGap: function()
	{
		return this.options.gap;
	},

	//-------------------------------------------------------------------
	// Protected functions
	//-------------------------------------------------------------------
		
	onOptionsChange: function()
	{
		this.parent();
		this.setGap( this.options.gap );
	}.protect(),
	
	onChildAdded: function( event )
	{
		// Add DOM element
		var td = this.getTable().pushElement( $(event.child), event.index).td;
		
		// Update child aligment
		this.setChildVerticalAlign( event.child, this.getVerticalAlign() );
		this.setChildHorizontalAlign( event.child, this.getHorizontalAlign() );
		
		if( event.index > 0 )
			td.setStyle('padding-top', Number.withPx(this.getGap()) );
		
		// Update cell height
		event.child.addEvent('heightChange', this.onChildHeightChange);
		this.updateCellHeight( event.child );
		
	}.protect(),
	
	onChildRemoved: function( event )
	{
		// Remove DOM element
		$(event.child).getParentByTag('tr').dispose();
	},
	
	onChildHeightChange: function( event )
	{
		this.updateCellHeight( event.target );
	},
	
	updateCellHeight: function( child )
	{
		var height = child.getHeight();
		var index = this.getChildIndex(child);
		
		if( height )
			this.setCellHeight(index, height);
	},
	
	initElement: function()
	{
		this.parent();
		
		$(this).removeClass("phi-CellBox");
		$(this).addClass("phi-VBox");
		
	}.protect()
});

/**
 * Factory method.
 * @param options.
 */
phi.ui.VBox.create = function( options )
{
	var result = new phi.ui.VBox( options );
	return result;
};


/**
 *
 * script: ItemRenderer.js
 * name: phi.ui.ItemRenderer
 * 
 * description: Base class for all renderers. For ex. ListItemRenderer used to render list items.
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - phi/ui/containers/Container
 * 
 */
phi.ui.ItemRenderer = new Class({
	Extends: phi.ui.View,
	
	//-------------------------------------------------------------------
	// Protected functions
	//-------------------------------------------------------------------
	
	/**
	 * Returns DOM element
	 * @override
	 */
	createElement: function()
	{
		return new Element('div');
	}.protect(),
	
	initElement: function()
	{
		this.parent();
		$(this).removeClass("phi-View");
		
	}.protect(),

});

/**
 *
 * script: ListItemRenderer.js
 * name: phi.ui.ListItemRenderer
 * 
 * description: 
 * Item renderer used to render list items. Extend this 
 * class to render your list item in different ways.
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - phi/ui/renderers/ItemRenderer
 * 
 */
phi.ui.ListItemRenderer = new Class({
	Extends: phi.ui.ItemRenderer,

	list: null,	
	className: "phi.ui.ListItemRenderer",

	/**
	 * Returns list item DOM element
	 * @override
	 */
	createElement: function()
	{
		return new Element('li', {'class':'phi-ListItem'});
	}.protect()

});

/**
 *
 * script: DefaultListItemRenderer.js
 * name: phi.ui.DefaultListItemRenderer
 * 
 * description: 
 * The defualt item renderer used to render list items if no renderer is set.
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - phi/ui/renderers/ListItemRenderer
 * 
 */
phi.ui.DefaultListItemRenderer = new Class({
	Extends: phi.ui.ListItemRenderer,

	initialize: function()
	{
		this.parent();
		
		var label = new phi.ui.Label();
		var hbox = new phi.ui.HBox({width: '100%', height: 35, paddingLeft: 10});
		hbox.addChild( label );
		
		phi.mn.BindManager.bindUsingView( this, label, 'text', 'data', 'label');
		this.addChild( hbox );
	},
});

/**
 *
 * script: MenuItemRenderer.js
 * name: phi.ui.MenuItemRenderer
 * 
 * description: 
 * Default ItemRenderer used by Menu.
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - phi/ui/renderers/ListItemRenderer
 * 
 */
phi.ui.MenuItemRenderer = new Class({
	Extends: phi.ui.ListItemRenderer,
	
	initialize: function()
	{
		this.parent();
		
		var label = new phi.ui.Label();
		var hbox = new phi.ui.HBox({width: '100%', paddingLeft: 10, paddingRight: 5});
		hbox.addChild( label );
		
		phi.mn.BindManager.bindUsingView( this, label, 'text', 'data', 'label');
		this.addChild( hbox );
	}

});

/**
 *
 * script: MenuSeparatorRenderer.js
 * name: Phi.UI.MenuSeparatorRenderer
 * 
 * description: 
 * Default ItemRenderer used by Menu to draw separator.
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - phi/ui/renderers/ListItemRenderer
 * 
 */
phi.ui.MenuSeparatorRenderer = new Class({
	Extends: phi.ui.ListItemRenderer,
	
	initialize: function()
	{
		this.parent();
	},

	/**
	 * Returns list item DOM element
	 * @override
	 */
	createElement: function()
	{
		var el = new Element('li', {'class':'phi-Separator'});
		return el; 
	}.protect()
});

/**
 *
 * script: ListBase.js
 * name: phi.ui.ListBase
 * 
 * description: This is base class for all list components.
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - phi/ui/containers/Container.js
 * 
 */
phi.ui.ListBase = new Class({
	Extends: phi.ui.Container,
	Binds: ['onCollectionChange', 'onItemClick', 'onItemRollOver', 'onItemRollOut'],
	
	options: {
		selectable: true,
		dataProvider: null,
		itemRenderer: null,
		itemRendererFunction: null,
		selectedItem: null,
		selectedIndex: null
	},
	
	itemRenderer: null,
	itemRendererFunction: null,
	dataProvider: null,
	
	initialize: function( options )
	{
		this.parent( options );
		
		if( this.itemRenderer === null )
			this.itemRenderer = phi.ui.DefaultListItemRenderer;
		
		this.addEvent("newDataProvider", this.onNewDataProvider);
	},
	
	setDataProvider: function( value )
	{
		if( value === null || value === undefined )
			return;
			
		if( !instanceOf(value, phi.collections.ArrayCollection) )
			throw new Error( "DataProvider must be a ArrayCollection!");
			
		this.dataProvider = value;
		this.dataProvider.addEvent("collectionChange", this.onCollectionChange);
		
		this.dispatchEvent("newDataProvider");
	},
	
	getDataProvider: function()
	{
		return this.dataProvider;
	},
	
	setItemRenderer: function( value )
	{
		if( value === null )
			return;
			
		this.itemRenderer = value;
		this.rebuildItems();
	},
	
	getItemRenderer: function()
	{
		return this.itemRenderer;	
	},
	
	setItemRendererFunction: function( value )
	{
		if( value === null )
			return;
			
		//if( typeOf(value) != "function" )
		//	throw new Error("ItemRendererFunction type must be function.")
			
		this.itemRendererFunction = value;
	},
	
	getItemRendererFunction: function()
	{
		return this.itemRendererFunction;
	},
	
	setSelectable: function( value )
	{
		if( value === null )
			return;
			
		this.options.selectable = value;
	},
	
	getSelectable: function()
	{
		return this.options.selectable;	
	},
	
	setSelectedIndex: function( value )
	{
		if( value === null )
			return;
			
		if( !this.getSelectable() )
			return;
			
		this.options.selectedIndex = value;
				
		// Update DOM
		this.removeItemsClass('selected');
		
		if( value > -1)
			this.getChildAt(value).element.addClass('selected');
			
		// Dispatch event for binding
		this.dispatchEvent("propertyChange", {property: 'selectedIndex', value: value});
	},
	
	getSelectedIndex: function()
	{
		return this.options.selectedIndex;
	},
	
	setSelectedItem: function( value )
	{
		var itemIndex = this.getDataProvider().getItemIndex(value);
		this.setSelectedIndex( itemIndex );	
	},
	
	getSelectedItem: function()
	{
		if( this.getDataProvider() === null )
			return null;
			
		if( this.getSelectedIndex() == -1 )
			return null;
			
		return this.getDataProvider().getItemAt( this.getSelectedIndex() );
	},
	
	elementToIndex: function( element )
	{
		var itemElement = element;
		
		if( itemElement.get("tag") != "li" )
			itemElement = element.getParentByTag("li");
		
		if( !itemElement )
			return -1;
		
		return this.getDataProvider().getItemIndex( itemElement.instance().getData() );
	},
	
	//-------------------------------------------------------------------
	// Create functions
	//-------------------------------------------------------------------
	
	createElement: function()
	{
		return new Element('ul', {'class': 'phi-ListBase'});
	}.protect(),
	
	createItem: function( data )
	{
		var renderer = this.getItemRenderer();
		
		if( this.getItemRendererFunction() )
		{
			var f = this.getItemRendererFunction();
			renderer = f( data );
		}
		
		var item = new renderer();
		
		if( !instanceOf(item, phi.ui.ListItemRenderer) )
			throw new Error( "ItemRenderer must be an instance of phi.ui.ListItemRenderer!");
		
		item.setData( data );
		item.list = this;
		item.addEvent("mouseenter", this.onItemRollOver);
		item.addEvent("mouseleave", this.onItemRollOut);
		item.addEvent("mousedown", this.onItemClick);
		
		var index = this.getDataProvider().getItemIndex( data );
		
		if( index % 2 != 0)
			$(item).addClass('odd');
			
		return item;
	}.protect(),
	
	rebuildItems: function()
	{
		if( !this.getDataProvider() )
			return;
			
		var iterator = this.getDataProvider().createIterator();
		
		// Remove all children
		this.removeAllChildren();
		
		// Empty DOM node
		$(this).empty();
		
		// Create items
		while( iterator.moveNext() )
		{
			var itemList = this.createItem( iterator.current() );
			this.addChild( itemList );
		}
	},
	
	moveItem: function( direction, item )
	{
		if( !item )
			item = this.getSelectedItem();
			
		if( !item )
			return;
			
		var dp = this.getDataProvider();
		var index = dp.getItemIndex( item );
			
		if( direction == 'up' )
		{
			if( index > 0 )
				index--;
		} 
		else if( direction == 'down' )
		{
			if( index < dp.length() )
				index++;
		}
					
		dp.moveItem( item, index );
	},
	
	//-------------------------------------------------------------------
	// Protected functions
	//-------------------------------------------------------------------
	
	removeItemsClass: function( className )
	{
		var iterator = this.createIterator();
		
		while( iterator.moveNext() )
			$(iterator.current()).removeClass(className);
	},
	
	onOptionsChange: function()
	{
		this.parent();
		
		this.setSelectable( this.options.selectable );
		this.setItemRendererFunction( this.options.itemRendererFunction );
		this.setItemRenderer( this.options.itemRenderer );
		this.setDataProvider( this.options.dataProvider );
		
		this.setSelectedIndex( this.options.setSelectedIndex );
	},
	
	//-------------------------------------------------------------------
	// Handlers
	//-------------------------------------------------------------------
	
	onItemRollOver: function( event )
	{
		var index = this.elementToIndex( event.target );
		$(this.getChildAt(index)).addClass("over");
		
		this.dispatchEvent("itemRollOver", {index: index});
	},
	
	onItemRollOut: function( event )
	{
		var index = this.elementToIndex( event.target );
		$(this.getChildAt(index)).removeClass("over");
		
		this.dispatchEvent("itemRollOut", {index: index})
	},
	
	/**
	 * This is called when a new dataProvider is set.
	 */
	onNewDataProvider: function()
	{
		this.rebuildItems();	
	},
	
	/**
	 * Collection change handler has the job
	 * to keep tha dataProvider and DOM elements sync.
	 *
	 * @param event
	 */
	onCollectionChange: function( event )
	{
		switch( event.kind )
		{
			case CollectionEventKind.ADD: 
            {
				var itemList = this.createItem( event.item );
				this.addChildAt( itemList, event.location );
				this.setSelectedIndex(-1);
				
				break;
			}
			
			case CollectionEventKind.REMOVE:
			{
				this.removeChildAt( event.location );
				this.setSelectedIndex(-1);
				break;
			}
			
			case CollectionEventKind.REPLACE:
			{
				this.getChildAt(event.location).setData(event.item);
				break;
			}
			
			case CollectionEventKind.MOVE:
			{
				var child = this.removeChildAt( event.oldLocation );
				this.addChildAt( child, event.location );
				this.setSelectedIndex(-1);
				break;
			}
		}
		
		this.updateOddClass();
	},

	updateOddClass: function()
	{
		var iterator = this.getDataProvider().createIterator();
		
		for( var i = 0; i< this.getChildren().length ; i++)
		{
			var item = this.getChildAt(i);
			
			if( $(item).hasClass('odd') )
				$(item).removeClass('odd');	
					
			if( i % 2 != 0)
				$(item).addClass('odd');
		}
	},
	
	/**
	 * This is called when an item was clicked.
	 */
	onItemClick: function( event )
	{
		var index = this.elementToIndex( event.target );
		
		this.setSelectedIndex( index );
		
		//this.dispatchEvent("propertyChange");
		this.dispatchEvent("itemClick", {index:index});
	},
	
	onKeyDown: function( event )
	{
		var index = -1;
		
		if( event.key == 'up' )
		{
			index = this.getSelectedIndex();
			
			if( event.alt )
				this.moveItem('up');
			
			if( index > 0 )	
				this.setSelectedIndex(  index - 1);
		}
		else if( event.key == 'down')
		{
			index = this.getSelectedIndex();
			
			if( event.alt )
				this.moveItem('down');
				
			if( index < this.getDataProvider().length() - 1 )	
				this.setSelectedIndex(  index + 1 );
		}
	}
});

/**
 *
 * script: List.js
 * name: phi.ui.List
 * 
 * description:
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - phi/ui/containers/ListBase.js
 * 
 */
phi.ui.List = new Class({
	Extends: phi.ui.ListBase,
	
	className: "phi.ui.List",
	
	initialize: function( options )
	{
		this.parent( options );
	},

	//-------------------------------------------------------------------
	// Protected functions
	//-------------------------------------------------------------------
	
	initElement: function()
	{
		this.parent();
		
		$(this).removeClass("phi-ListBase");
		$(this).addClass("phi-List");
		
	}.protect()
});


/**
 * Factory method.
 * @param options.
 */
phi.ui.List.create = function( options )
{
	var result = new phi.ui.List( options );
	return result;
};

/**
 *
 * script: Menu.js
 * name: phi.ui.Menu
 * 
 * description: Menu component
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - phi/ui/containers/PopUp.js
 *	 - phi/ui/containers/List.js
 * 
 */
phi.ui.Menu = new Class({
	Extends: phi.ui.PopUp,
	Binds: ['onItemRollOver','onItemClick'],
	
	options: {
		hideOnClick: true
	},
	
	list: null,
	parentChild: null,
	parentMenu: null,
	childMenu: null,
	
	initialize: function(options)
	{
		this.parent( options );
		
		// Menu init vars
		this.childMenu = null;
		this.parentChild = null;
		
		// Menu list
		this.list = phi.ui.List.create({
			width: "100%",
			height: "100%",
			selectable: false,
			itemRendererFunction: this.listItemRendererFunction
		});

		this.list.addEvent('itemRollOver', this.onItemRollOver);
		this.list.addEvent('itemClick', this.onItemClick);
				
		this.addChild( this.list );
	},
	
	setDataProvider: function( value )
	{
		this.list.setDataProvider( value );
	},
	
	getDataProvider: function()
	{
		return this.list.getDataProvider();
	},
	
	show: function( x, y )
	{
		// Move menu at specific position
		this.setPosition(x, y);
		
		// Show menu
		this.parent();
	},
	
	hide: function()
	{
		this.parent();
		this.parentChild = null;
		
		//List custom setup
		this.list.setSelectedIndex(-1);
		this.list.removeItemsClass('over');
		
		if( this.childMenu )
			this.childMenu.hide();
	},
	
	//-------------------------------------------------------------------
	// Protected functions
	//-------------------------------------------------------------------
	
	listItemRendererFunction: function( data )
	{
		if( data.get('type') == 'separator')
			return phi.ui.MenuSeparatorRenderer;
			
		return phi.ui.MenuItemRenderer;
	},
	
	elementToMenu: function( element )
	{
		var menuElement = element.getParentByClass('phi-Menu');
		
		if( menuElement )
			return menuElement.instance();
					
		return null;
	},

	//-------------------------------------------------------------------
	// DOM functions
	//-------------------------------------------------------------------
	
	initElement: function()
	{
		this.parent();
		$(this).addClass('phi-Menu');
		
	}.protect(),
	
	//-------------------------------------------------------------------
	// Handlers
	//-------------------------------------------------------------------
	
	onItemClick: function( event )
	{
		var index = event.index;
		var item = this.getDataProvider().getItemAt( index );
		var eventArgs = {index: index, item: item, menu: this};
		
		this.bubbleItemClick( eventArgs );
	},
	
	bubbleItemClick: function( args )
	{
		if( this.parentMenu === null )
		{
			this.dispatchEvent('itemClick', args)
			return;			
		}
			
		this.parentMenu.bubbleItemClick( args );
	},
	
	onItemRollOver: function( event )
	{
		var child = this.list.getChildAt( event.index );
		var children = child.getData().children;
		 
		if( this.childMenu && (child != this.childMenu.parentChild))
			this.childMenu.hide();
			
		if( children )
		{
			if( !this.childMenu )
				this.childMenu = new phi.ui.Menu();
			
			if(child != this.childMenu.parentChild)
			{
				this.childMenu.parentChild = child; // This is a list element
				this.childMenu.parentMenu = this;
			
				this.childMenu.setDataProvider( children );
				this.childMenu.snapToElement( 
					$(child), 
					{
						position: "topRight", 
						offset: {x:5, y:0}
					});
				
				if( window.getWidth() < ( this.childMenu.getPosition().x + this.childMenu.getWidth() ) )
				{
					this.childMenu.snapToElement( 
						$(child), 
						{
							position: "topLeft",
							edge: "topRight",
							offset: {x:-5, y:0}
						});
				}
				
				if( window.getHeight() < ( this.childMenu.getPosition().y + this.childMenu.getHeight() ) )
				{
					$(this.childMenu).setStyle('top', window.getHeight()-this.childMenu.getHeight());
				}
			}
		}
	},
	
	onWindowMouseUp: function( event )
	{
		var itemListElement = event.target.getParentByClass('phi-ListItem');
		
		if( this.isVisible() )
		{
			if( itemListElement )
				if( itemListElement.instance().getData().children )
					return;
								
			this.hide();
		}
	},
	
	onResize: function( event )
	{
		this.hide();
	}
});


/**
 * Factory method.
 * @param options.
 */
phi.ui.Menu.create = function( options )
{
	var result = new Phi.UI.Menu( options );
	return result;
};



