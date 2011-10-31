/**
 *
 * script: Core.js
 * name: Core
 */
var Phi = Phi || {};

// Define namespaces
Phi.Core = Phi.Core || {};
Phi.UI = Phi.UI || {};
Phi.HTML = {};
Phi.Mn = {};

Array.implement({
	pushAt: function(item, index)
	{
		this.splice(index, 0, item);
	}
});

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


/**
 *
 * script: Events.js
 * name: Events
 */
//Events.implement({
//});

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

/**
 *
 * script: Iterator.js
 * name: Phi.Core.Iterator
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
Phi.Core.Iterator = new Class({
	initialize: function( collection )
	{
		if( !collection )
			throw new Error( "Collection cannot be null!");
			
		if( !instanceOf(collection, Phi.Core.ArrayCollection) )
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
 * script: ArrayCollection.js
 * name: Phi.Core.ArrayCollection
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
Phi.Core.ArrayCollection = new Class({
	Implements: [Events],
	
	initialize: function( source ) 
	{
		if( source )
			this.source = source;
		else
			this.source = [];
	},
	
	addItem: function( item )
	{		
		this.addItemAt( item, this.source.length );
	},
	
	addItemAt: function( item, index )
	{
		var eventArgs = {};
		
		eventArgs.target = this;
		eventArgs.item = item;
		eventArgs.index = index;
		eventArgs.kind = CollectionEventKind.ADD;
		
		// Add item
		this.source.splice(index, 0, item );

		// Dispatch event
		this.fireEvent( "add", eventArgs);		
	},
	
	length: function()
	{
		return this.source.length;
	},
	
	setItemAt: function( item, index )
	{
		var eventArgs = {};
		
		eventArgs.target = this;
		eventArgs.item = item;
		eventArgs.oldItem = this.getItemAt( index );
		eventArgs.location = index;
		eventArgs.kind = CollectionEventKind.REPLACE;
		
		// Add item
		this.source.splice(index, 1, item );
		
		// Dispatch event
		this.fireEvent("replace", eventArgs)
	},
	
	moveItem: function( item, newIndex )
	{
		var eventArgs = {};
		
		eventArgs.target = this;
		eventArgs.item = item;
		eventArgs.oldLocation = this.getItemIndex(item);
		eventArgs.location = newIndex;
		eventArgs.kind = CollectionEventKind.MOVE;
		
		// Remove item
		this.source.splice(event.oldLocation, 1);
		
		// Add item at new location
		this.source.splice(event.location, 0, item );
		
		// Dispatch event
		this.fireEvent("move", eventArgs);
	},
	
	removeItem: function( item )
	{
		this.removeItemAt( this.getItemIndex( item ) );
	},
	
	removeItemAt: function( index )
	{
		var eventArgs = {};
		
		eventArgs.target = this;
		eventArgs.item = this.getItemAt( index );
		eventArgs.location = index;
		eventArgs.kind = CollectionEventKind.REMOVE;
		
		// Remove item
		this.source.splice(index, 1);
		
		// Dispatch event
		this.dispatchEvent( event );
		this.fireEvent("remove", eventArgs);
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
		return new Phi.Core.Iterator( this );	
	},
	
	toString: function()
	{
		return this.source.toString();
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
 * name: Phi.Core.ChildList
 * 
 * description: 
 * This class is used by Phi.UI.Container to manage children.
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - core/Events
 * 
 */
Phi.Core.ChildList = new Class({
	Implements: [Events],
	children: [],
	
	addChild: function( child )
	{
		return this.addChildAt(child, this.children.length);
	},
	
	addChildAt: function( child, index )
	{
		if( !instanceOf(child, Phi.UI.Component) )
			throw new Error( "Child must be a Phi.UI.Component!");
		
		// Remove child from old parent
		// if child was not removed before
		if( child.getParent() !== null )
			child.getParent().removeChild( child );
		
		if( !this.hasChild(child) )
		{
			this.children.pushAt( child, index );

			// Dispatch "childAdded" event
			this.fireEvent("childAdded", {target: this, child: child, index: index});
			
			// Set child parent & dispatch
			// "added" event
			child.setParent( this );
			child.fireEvent("added", {target: child, index: index})
			
		}
		
		return this;
	},
	
	getChildAt: function(index)
	{
		return this.children[index];
	},
	
	child: function( id )
	{
		var result = null;
		
		for (var i=0; i < this.children.length; i++) 
		{
			var child = this.children[i];
			
			if( instanceOf(child, Phi.UI.Container) )
			{
				result = child.child( id );

				if( result )
					return result;
			}
			
			if( child.options.id == id )
                return child;	
		}
		
		return null;
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
		if( !instanceOf(child, Phi.UI.Component) )
			throw new Error( "Child must be a Phi.UI.Component!");
		
		var index = this.getChildIndex( child );
		
		// Remove child	
		this.children.erase(child);
		
		// Remove child parent & dispatch
		// "remove" event.		
		child.setParent( null );
		child.fireEvent("removed", {target: child, index: index});
		
		// Dispatch "childRemoved" event.
		this.fireEvent("childRemoved", {target: this, child: child, index: index});
		
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
 * script: ChildEvent.js
 * name: ChildEvent
 */	
Phi.BackboneModel = new Class({
	Implements: [Backbone.Model, Events],
	
	initialize: function( attributes ) 
	{
		this.bind( "change", this.onChange.bind(this));
		this.set(attributes);
	},
	
	onChange: function()
	{
		this.fireEvent("change");
	}
});

/**
 *
 * script: PopUpManager.js
 * name: Phi.Mn.PopUpManager
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

Phi.Mn.PopUpManager = {};
Phi.Mn.PopUpManager.popups = [];

/**
 * Create a PopUp.
 */
Phi.Mn.PopUpManager.createPopUp = function( dialog )
{
	// If popUp allready exist
	if( Phi.Mn.PopUpManager.popups[ dialog ] )
		return Phi.Mn.PopUpManager.popups[ dialog ];
		
	// Create a new popUp
	var popUp = new Phi.UI.PopUp();	
	popUp.addChild( dialog );
	
	// Save popUp
	Phi.Mn.PopUpManager.popups[ dialog ] = popUp;
	
	return popUp;
};

/**
 * Remove a PopUp.
 */
Phi.Mn.PopUpManager.removePopUp = function( dialog )
{
	var popUp = Phi.Mn.PopUpManager.popups[ dialog ];	
	var rootBox = Phi.UI.RootBox.get();
	
	if( !popUp )
		return;
	
	// If popUp is on the stage
	// we remove it.
	if( rootBox.hasChild(popUp))
		rootBox.removeChild( popUp );
		
	delete 	Phi.Mn.PopUpManager.popups[ dialog ];
};


/**
 *
 * script: ThemeManager.js
 * name: Phi.Mn.ThemeManager
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

Phi.Mn.ThemeManager = {};
Phi.Mn.ThemeManager.directory = "assets/themes/";
Phi.Mn.ThemeManager.theme = "default";

Phi.Mn.ThemeManager.setDirectory = function( value )
{
	Phi.Mn.ThemeManager.directory = value;
};

Phi.Mn.ThemeManager.load = function( theme )
{
	var themeDir = Phi.Mn.ThemeManager.directory;
	var linkElement =  new Element('link', {
		id: "theme_" + theme,
		rel: "stylesheet",
		href: themeDir + theme + "/css/"+ theme +".css",
		type: "text/css"
	});
	
	// Unload current loaded theme
	Phi.Mn.ThemeManager.unload( Phi.Mn.ThemeManager.theme );
	
	// Load new theme
	Phi.Mn.ThemeManager.theme = theme;
	linkElement.inject( $$('head')[0] );
};

Phi.Mn.ThemeManager.unload = function( theme )
{
	var el = $("theme_" + theme );
	
	if( el )
		el.dispose();
	
};



//--------------------------------------------------------
// Phi.HTML: HtmlTable
//--------------------------------------------------------

Phi.HTML.Table = new Class({
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
 * script: Object
 * name: Phi.UI.Object
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
Phi.UI.Object = new Class({
	Extends: Options,
	Implements: [Events],
	
	options: {
		bind: {
		}
	},
	
	initialize: function( options )
	{
		this.setOptions( options );
	},
	
	setOptions: function( options )
	{
		this.parent( options );
		this.onOptionsChange();
	}
});

/**
 *
 * script: Component.js
 * name: Phi.UI.Component
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
Phi.UI.Component = new Class({
	Extends: Phi.UI.Object,
	Binds: ['onResize'],
	
    element: null,
    parentComponent: null,
    className: null,
    
	options: {
		width: null,
		height: null,
		style: null,
		paddingLeft: null,
		paddingTop: null,
		paddingRight: null,
		paddingBottom: null
	},
	
	model: {
	},
	
	initialize: function( options )
	{
		this.parent( options );
		
		// Add listners
		this.addEvent('added', this.onAdded);
		this.addEvent('removed', this.onRemoved);
				
		// Add resize event
		window.addEvent('resize', this.onResize);
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
		
		this.fireEvent("widthChange", {target: this, value: value});
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
			
		this.fireEvent("heightChange", {target: this, value: value});
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
		if( instanceOf(this, Phi.UI.View))
			return this;
			
		if( this.getParent() )
			return this.getParent().getParentView();
			
		return null;	
	},
	
	setVisible: function(value)
	{
		if( value === null )
			return;
			
		if(value)
			$(this).setStyle("display", this.oldDisplay);
		else
		{
			this.oldDisplay = $(this).getStyle("display");
			$(this).setStyle("display","none");
		}
	},
	
	getVisible: function()
	{
		var dispaly = $(this).getStyle("display");
		return display != "none";
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
	
	//-------------------------------------------------------------------
	// Protected functions
	//-------------------------------------------------------------------
	
	/**
	 * Create element for each
	 * Phi.UI.Component.
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
		
	}.protect(),
	
	updateBinds: function( view )
	{
		var newOptions = Object.clone( this.options );
		var bind  = this.options.bind;

		for ( var prop in this.options.bind ) 
		{
            if( bind[ prop ].object )
            {
                var model  = view[ bind[ prop ].object ];

                if( model !== null )
                    newOptions[ prop ] = model.get([ bind[ prop ].value ]); 
            }
        }
        
        this.setOptions( newOptions );
	},
	
	//-------------------------------------------------------------------
	// Handlers
	//-------------------------------------------------------------------
	
	onAdded: function( event )
	{
		console.log("addedddddddddd");
	},
	
	onRemoved: function( event )
	{
	},
	
	onResize: function( event )
	{
	}
});

/**
 *
 * script: Modal.js
 * name: Phi.UI.Modal
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
Phi.UI.Modal = new Class({
	Extends: Phi.UI.Component,
	Binds: ['onAdded','onWindowResize'],
	
	initialize: function()
	{
		this.parent();
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
 * name: Phi.UI.Button
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
Phi.UI.Button = new Class({
	Extends: Phi.UI.Component,
	
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
Phi.UI.Button.create = function( options )
{
	var result = new Phi.UI.Button( options );
	return result;
};


/**
 *
 * script: CheckBox.js
 * name: Phi.UI.CheckBox
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
Phi.UI.CheckBox = new Class({
	Extends: Phi.UI.Component,
	
	initialize: function( checked )
	{
		this.parent();
		
		if(checked)
			this.setChecked(checked);
	},
	
	setChecked: function( value )
	{
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
		
	}.protect()
	
});


/**
 * Factory method.
 * @param options.
 */
Phi.UI.CheckBox.create = function( options )
{
	var result = new Phi.UI.CheckBox( options );
	return result;
}

/**
 *
 * script: TextInput.js
 * name: Phi.UI.TextInput
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
Phi.UI.TextInput = new Class({
	Extends: Phi.UI.Component,
	
	initialize: function( options )
	{
		this.parent( options );
		
		// Add listners
		this.addEvent('keyup', this.onKeyUp);
	},
	
	setText: function( value )
	{
		if( value === null )
			return;
			
		$(this).set("value", value);
	},
	
	getText: function()
	{
		return $(this).get("value");		
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
		this.displayAsPassword( this.options.displayAsPassword );
	},
		
	onKeyUp: function( event )
	{
		this.fireEvent("textChange", { target: this });
	}
	
});


/**
 * Factory method.
 * @param options.
 */
Phi.UI.TextInput.create = function( options )
{
	var result = new Phi.UI.TextInput( options );
	return result;
};



/**
 *
 * script: Image.js
 * name: Phi.UI.Image
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
Phi.UI.Image = new Class({
	Extends: Phi.UI.Component,
	
	initialize: function( source )
	{
		this.parent();
		
		if(source)
			this.setSource(source);
	},
	
	setSource: function  (value)
	{
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
Phi.UI.Image.create = function( options )
{
	var result = new Phi.UI.Image();
	return result;
};

/**
 *
 * script: Lable.js
 * name: Phi.UI.Label
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
Phi.UI.Label = new Class({
	Extends: Phi.UI.Component,
	
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
	}
	
});

/**
 * Factory method.
 * @param options.
 */
Phi.UI.Label.create = function( options )
{
	var result = new Phi.UI.Label( options );
	return result;
};


/**
 *
 * script: Container.js
 * name: Phi.UI.Container
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
 *   - phi/core/ArrayCollection.js
 * 
 */
Phi.UI.Container = new Class({
	Extends: Phi.UI.Component,
	Implements: [Phi.Core.ChildList],
	
	model: null,
	
	initialize: function(options)
	{
		this.parent(options);
		
		this.addEvent("childAdded", this.onChildAdded);
		this.addEvent("childRemoved", this.onChildRemoved);
		
		this.createChildren();
		this.prepareChildren( this );
		
		this.fireEvent( "childrenCreated", {target: this})
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
		return new Phi.Core.Iterator( new Phi.Core.ArrayCollection( this.children ));	
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
 * name: Phi.UI.View
 * 
 * description: 
 * This class is used to create views.
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 * 
 */
Phi.UI.View = new Class({
	Extends: Phi.UI.Container,
	
	model: null,
	
	initialize: function(options)
	{
		this.parent(options);
	},
	
	setModel: function( value )
	{
		this.model = value;
		this.model.addEvent('change', this.onModelChange.bind(this));
		
		this.onModelChange();
	},
	
	getModel: function()
	{
		return this.model;
	},
	
	prepareChildren: function( target )
	{
		if( instanceOf(target, Phi.UI.Container))
		{
			var iterator = target.createIterator();
		
			while( iterator.moveNext() )
			{
				var child = iterator.current();
				this.prepareChildren( child );
			}
		}
		
		if( target.options.id )
			this[ target.options.id ] = target;
	},
	
	updateBinds: function( view )
	{
	},
	
	updateBindsForChild: function( target, view )
	{
		if( instanceOf(target, Phi.UI.Container))
		{
			var iterator = target.createIterator();
		
			while( iterator.moveNext() )
			{
				var child = iterator.current();
				
				//if( !instanceOf(child, Phi.UI.View) )
				if( child.getParentView() == view )
					this.updateBindsForChild( child, view );
			}
		}
		
		target.updateBinds( view );
	},
	
	onModelChange: function()
	{
		this.updateBindsForChild( this, this );
	}
});


/**
 *
 * script: ViewStack.js
 * name: Phi.UI.ViewStack
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
Phi.UI.ViewStack = new Class({
	Extends: Phi.UI.Container,
	
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
Phi.UI.ViewStack.create = function( options )
{
	var result = new Phi.UI.ViewStack( options );
	return result;
};


/**
 *
 * script: HTMLBox.js
 * name: Phi.UI.HTMLBox
 * 
 * description: This container is used to inject a Phi.UI.Component into a specific HTML element
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - phi/ui/containers/Container.js
 * 
 */
Phi.UI.HTMLBox = new Class({
	Extends: Phi.UI.Container,
	
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
 * name: Phi.UI.ScrollBox
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
Phi.UI.ScrollBox = new Class({
	Extends: Phi.UI.Container,
	
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
 * name: Phi.UI.CellBox
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
Phi.UI.CellBox = new Class({
	Extends: Phi.UI.Container,
	
	options: {
		horizontalAlign: "left",
		verticalAlign: "middle",
		border: 0
	},
	
	table: null,

	getTable: function()
	{
		if( !this.table )
			this.table = new Phi.HTML.Table();
			
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
Phi.UI.CellBox.create = function( options )
{
	var result = new Phi.UI.CellBox( options );
	return result;
};



/**
 *
 * script: RootBox.js
 * name: Phi.UI.RootBox
 * 
 * description: 
 * This is the main container. You must use this like 
 * this: Phi.UI.RootBox.get().addChild( child )
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - phi/ui/containers/Container.js
 * 
 */
Phi.UI.RootBox = new Class({
	Extends: Phi.UI.Container,
	
	percentageWidth: 0,
	percentageHeight: 0,
	
	initialize: function()
	{
		this.parent();
		
		// Throw error if an instance of this class
		// allredy exist.
		if( Phi.UI.RootBox.instance )
			throw new Error("Please use Phi.UI.RootBox.get() to access RootBox!");
		
		// Save this instance
		// Because this is a singleton class
		Phi.UI.RootBox.instance = this;
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

Phi.UI.RootBox.getInstance = function()
{
	return Phi.UI.RootBox.instance || new Phi.UI.RootBox();
};

Phi.UI.RootBox.get = function()
{
	var element = $$("body")[0];
	var instance = element.retrieve( "rootBox" );
	
	if( instance )
		return instance;

	// If this is the first instance we create it
	// and store it to element.		
	instance = Phi.UI.RootBox.getInstance();
	element.store( "rootBox", instance );
	
    // Inject element to DOM
	$(instance).inject( element );
	
	// Dispatch added to stage
	instance.fireEvent("added", {target: instance, index: 0});
	
	return instance;
	
};


/**
 *
 * script: PopUp.js
 * name: Phi.UI.PopUp
 * 
 * description: This container is used by PopUpManager to display a Phi.UI.Component in a popup.
 * 
 * 
 * authors:
 *   - Alexandru Ghiura
 * 
 * requires:
 *   - phi/ui/containers/Container.js
 * 
 */
Phi.UI.PopUp = new Class({
	Extends: Phi.UI.Container,
	Binds: ['onWindowMouseUp'],
	
	options: {
		hideOnClick: false
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
	
	snapTo: function( uiobject, side )
	{
		if( !side )
			side = PopUpSnap.BOTTOM;
			
		var mapSide = [];
		
		mapSide.left	= "topLeft";
		mapSide.top		= "topLeft";
		mapSide.right	= "topRight";
		mapSide.bottom	= "bottomLeft";
		
		var mapEdge = [];
		
		mapEdge.left	= "topRight";
		mapEdge.top		= "bottomLeft";
		mapEdge.right	= "topLeft";
		mapEdge.bottom	= "topLeft";
		
		// Show popup first
		this.show();
		
		// Snap to Phi.UI.Component
		$(this).position({
			relativeTo: $(uiobject),
			position: mapSide[side],
			edge: mapEdge[side],
			allowNegative: true
		});
	},
	
	snapToElement: function( element, options )
	{
		// Show popup first
		this.show();
		
		options.relativeTo = element;
		options.allowNegative = true;
		
		// Snap to Phi.UI.Component
		$(this).position(options);
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
		var rootBox = Phi.UI.RootBox.get();
		
		if( rootBox.hasChild( this ))
		{
			if( this.modal )
				rootBox.removeChild( this.modal );
						
			rootBox.removeChild( this );
		}
	},
	
	show: function( modal )
	{
		var rootBox = Phi.UI.RootBox.get();
		
		// If popUp is allready displayed
		// we return.
		if( rootBox.hasChild(this) )
			return;
			
		// If we need to show popUp as modal.			
		if( modal )
		{
			// Create modal & add to stage
			this.modal = new Phi.UI.Modal();
			rootBox.addChild( this.modal );
		}

		rootBox.addChild( this );
	},
	
	isVisible: function()
	{
		var rootBox = Phi.UI.RootBox.get();
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
 * name: Phi.UI.HBox
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
Phi.UI.HBox = new Class({
	Extends: Phi.UI.CellBox,
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
Phi.UI.HBox.create = function( options )
{
	var result = new Phi.UI.HBox( options );
	return result;
};


/**
 *
 * script: VBox.js
 * name: Phi.UI.VBox
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
Phi.UI.VBox = new Class({
	Extends: Phi.UI.CellBox,
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
Phi.UI.VBox.create = function( options )
{
	var result = new Phi.UI.VBox( options );
	return result;
};


/**
 *
 * script: ItemRenderer.js
 * name: Phi.UI.ItemRenderer
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
Phi.UI.ItemRenderer = new Class({
	Extends: Phi.UI.Container,
	
	initialize: function()
	{
		this.parent();
		this.addEvent("dataChange", this.onDataChange);
	},
	
	setData: function( value )
	{
		// Save old data.
		var oldData = this._data;
		
		// Change data.
		this._data = value;
		
		// Dispatch dataChange
		this.fireEvent('dataChange', {data: value, oldData: oldData});
	},
	
	getData: function()
	{
		return this._data;
	},
	
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
	
	onDataChange: function()
	{
	}
});

/**
 *
 * script: ListItemRenderer.js
 * name: Phi.UI.ListItemRenderer
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
Phi.UI.ListItemRenderer = new Class({
	Extends: Phi.UI.ItemRenderer,

	list: null,	
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
		return new Element('li', {'class':'phi-ListItem'});
	}.protect()

});

/**
 *
 * script: MenuItemRenderer.js
 * name: Phi.UI.MenuItemRenderer
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
Phi.UI.MenuItemRenderer = new Class({
	Extends: Phi.UI.ListItemRenderer,
	
	label: null,
	hbox: null,
	image: null,
	
	initialize: function()
	{
		this.parent();
		this.build();
	},
	
	build: function()
	{
		// Create childs
		this.label = new Phi.UI.Label("");
		this.hbox = new Phi.UI.HBox();
		this.image = new Phi.UI.Image('assets/themes/default/images/right.png');
		
		// Add childs
		this.addChild( this.hbox.addChild( this.label ));
		
		// Set HBox properties
		this.hbox.setWidth("100%");
		this.hbox.setHeight(30);
		
		this.hbox.setVerticalAlign(VerticalAlign.MIDDLE);
	},

	onDataChange: function( event )
	{
		this.label.setText( event.data.label );
		
		if( event.data.children )
		{
			this.hbox.addChild( this.image );
			this.hbox.setCellWidth(this.hbox.children.length-1, 16);
		}
		else
		{
			if( this.hbox.hasChild( this.image ))
				this.hbox.removeChild( this.image );
		}
	}
});

/**
 *
 * script: ListBase.js
 * name: Phi.UI.ListBase
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
Phi.UI.ListBase = new Class({
	Extends: Phi.UI.Container,
	Binds: ['onCollectionChange', 'onItemClick', 'onItemRollOver', 'onItemRollOut'],
	
	initialize: function()
	{
		this.parent();
		this._itemRenderer = Phi.UI.ListItemRenderer;
		this._selectable = true;
		
		this.addEvent("newDataProvider", this.onNewDataProvider);
	},
	
	setDataProvider: function( value )
	{
		if( !instanceOf(value, Phi.Core.ArrayCollection) )
			throw new Error( "DataProvider must be a ArrayCollection!");
			
		this._dataProvider = value;
		this._dataProvider.addEvent("collectionChange", this.onCollectionChange);
		
		this.fireEvent("newDataProvider", {target: this});
	},
	
	getDataProvider: function()
	{
		return this._dataProvider;
	},
	
	setItemRenderer: function( value )
	{
		this._itemRenderer = value;
		this.rebuildItems();
	},
	
	setSelectable: function( value )
	{
		this._selectable = value;
	},
	
	getSelectable: function()
	{
		return this._selectable;	
	},
	
	setSelectedIndex: function( value )
	{
		if( !this.getSelectable() )
			return;
			
		this._selectedIndex = value;
				
		// Update DOM
		this.removeItemsClass('selected');
		
		if( value > -1)
			this.getChildAt(value).element.addClass('selected');
	},
	
	getSelectedIndex: function()
	{
		return this._selectedIndex;
	},
	
	setSelectedItem: function( value )
	{
		var itemIndex = this.getDataProvider().getItemIndex(value);
		this.setSelectedIndex( itemIndex );	
	},
	
	getSelectedItem: function()
	{
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
		var item = new this._itemRenderer();
		
		if( !instanceOf(item, Phi.UI.ListItemRenderer) )
			throw new Error( "ItemRenderer must be an instance of Phi.UI.ListItemRenderer!");
		
		item.setData( data );
		item.list = this;
		item.addEvent("mouseenter", this.onItemRollOver);
		item.addEvent("mouseleave", this.onItemRollOut);
		item.addEvent("mouseup", this.onItemClick);
		
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
	
	//-------------------------------------------------------------------
	// Protected functions
	//-------------------------------------------------------------------
	
	removeItemsClass: function( className )
	{
		var iterator = this.createIterator();
		
		while( iterator.moveNext() )
			$(iterator.current()).removeClass(className);
	},
	
	//-------------------------------------------------------------------
	// Handlers
	//-------------------------------------------------------------------
	
	onItemRollOver: function( event )
	{
		var index = this.elementToIndex( event.target );
		$(this.getChildAt(index)).addClass("over");
		
		this.fireEvent("itemRollOver", {target: this, index: index});
	},
	
	onItemRollOut: function( event )
	{
		var index = this.elementToIndex( event.target );
		$(this.getChildAt(index)).removeClass("over");
		
		this.fireEvent("itemRollOut", {target: this, index: index})
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
		
		
	},

	/**
	 * This is called when an item was clicked.
	 */
	onItemClick: function( event )
	{
		var index = this.elementToIndex( event.target );
		
		this.setSelectedIndex( index );
		
		this.fireEvent("change", {target: this, index:index});
		this.fireEvent("itemClick", {target: this, index:index});
	}
});

/**
 *
 * script: List.js
 * name: Phi.UI.List
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
Phi.UI.List = new Class({
	Extends: Phi.UI.ListBase,
	
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
		
		$(this).removeClass("phi-ListBase");
		$(this).addClass("phi-List");
		
	}.protect()
});

/**
 *
 * script: Menu.js
 * name: Phi.UI.Menu
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
Phi.UI.Menu = new Class({
	Extends: Phi.UI.PopUp,
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
		this.parent(options);
		
		this.list = new Phi.UI.List();
		this.list.setWidth(200);
		this.list.setSelectable(false);
		this.list.setItemRenderer( Phi.UI.MenuItemRenderer );
		this.list.addEvent("itemRollOver", this.onItemRollOver);
		this.list.addEvent("itemClick", this.onItemClick);
		this.parentChild = null;
		this.childMenu = null;
		
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
		// Set opacity 0 for fade effect
		//$(this).set('opacity', 0);
		
		// Move menu at specific position
		this.setPosition(x, y);
		
		// Show menu
		this.parent();
		
		//var myFx = new Fx.Tween($(this));
		//myFx.start('opacity', 0, 1);
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
		args.target = this;
		
		if( this.parentMenu === null )
		{
			this.fireEvent('itemClick', args)
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
				this.childMenu = new Phi.UI.Menu();
			
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
Phi.UI.Menu.create = function( options )
{
	var result = new Phi.UI.Menu();
	return result;
};



