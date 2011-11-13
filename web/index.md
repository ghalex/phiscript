Overview
==============

### Introduction ###

**PhiScript** main goal is to provide every essential functionalities you need in the process of building web applications 
using **JavaScript**. When I start building PhiScript I just wanted a framework like [Adobe Flex SDK](http://opensource.adobe.com/wiki/display/flexsdk/About) 
for **JavaScript**, becase [Adobe Flex SDK](http://opensource.adobe.com/wiki/display/flexsdk/About) has some realy cool features that makes the development 
process very easy and fast. So if you are a Flex developer that wants to build applications using **JavaScript** this framework should be "gold mine" for you. 
If you don't know about Adobe Flex there is no problem PhiScript is very easy to use.

The project is hosted on [GitHub](https://github.com/ghalex/PhiScript).You can report bugs and discuss features on the [issues page.](https://github.com/ghalex/PhiScript/issues)

### Downloads & Dependencies *(Right-click, and use "Save As")* ###

[Development Version (0.8.5)](http://phiscript.com/download/phiscript-0.8.5.js) *76.0kb, Full Source with Comments*

[Production Version (0.8.5)](http://phiscript.com/download/phiscript.min-0.8.5.j) *41.10kb, Packed*

[Compiler (.air)(1.1.0)](http://phiscript.com/download/phiscript.air) *524.0kb, Adobe AIR*

PhiScript only hard dependency is [Mootools](http://mootools.net/download)

### Example ###
To make an idea on how **PhiScript** is used for building **JavaScript** web applications checkout   
the [ToDo List Application Demo](http://phiscript.com/demo/).

To learn more [download the source code](http://phiscript.com/download/todo.zip) and read through the annotated source.
			
API {#api}
==============

### Components list: ###

[Component](#uiComponent), [Container](#), [Button](#uiButton), [CheckBox](#uiCheckBox), [Image](#uiImage), [Label](#uiLabel), [TextInput](#uiTextInput), [Menu](#), [CellBox](#), 
[HBox](#), [VBox](#), [ListBase](#), [List](#), [TitleWindow](#), [View](#), [ViewStack](#)

<!-- 
============================
	phi.ui.Component
============================
-->
### phi.ui.Component *extends:* [phi.ui.Object](#) {#uiComponent}

**Methods**:
[addClass](#), [removeClass](#), [getPosition](#), [setWidth](#), [setHeight](#), [getWidth](#), 
[getHeight](#), [setSize](#), [getParent](#), [getParentView](#), [setVisible](#), [getVisible](#),
[setEnabled](#), [getEnabled](#), [setBackgroundColor](#)

**Events**:
[added](#), [removed](#), [click](#), [dblclick](#), [keydown](#), [keypress](#), 
[keyup](#), [mousedown](#), [mousemove](#), [mouseout](#), [mouseover](#), [mouseup](#)

#### addClass: `ui.addClass( className )` 
\- Add class to HTML element.

#### removeClass: `ui.removeClass( className )`
\- Remove class from HTML element.

#### setWidth: `ui.setWidth( width )`
\- Sets component width.

#### setHeight: `ui.setHeight( height )`
\- Sets component height.

#### getWidth: `ui.getWidth()`
\- Returns component width.

#### getHeight: `ui.getHeight()`
\- Returns component height.

#### getParent: `ui.getParent()`
\- Returns component parent.

#### getParentView: `ui.getParentView()`
\- Returns component parent view.
				
**Example**:

	<View id="myCustomView">
		<HBox>
		  <TextInput />
			  <VBox>
			    <Button id="btn1" />
			    <Button id="btn2" />
			  </VBox>
		</HBox>
	</View>

If we use the XML above and we write `this.btn1.getParentView()` we will get [myCustomView](#)

#### setVisible: `ui.setVisible( true|false )`
\- Sets the component visibility.

#### getVisible: `ui.getVisible()`
\- Returns the component visibility.

<!-- 
============================
	phi.ui.Button
============================
-->
### phi.ui.Button *extends:* [phi.ui.Component](#uiComponent) {#uiButton}
		
**XML**:

	<Button text=""
			// Properties from phi.ui.Component
			width="",
			height=""
			style="" // This will use btn.addClass, ex. style="primary btn",
			visible="true|false",
			enabled="true|false",
			buttonMode="true|false",
			paddingLeft="",
			paddingTop="",
			paddingRight="",
			paddingBottom="",
			backgroundColor=""
			
			// Events from phi.ui.Component
			onMousedown=""
			onMouseup=""
			onClick=""
			onKeyup="" 
			onKeydown="" />
		 
**Methods**:
[setText](#), [getText](#) 


#### setText: `button.setText( text )`
\- Sets button text.

#### getText: `button.getText()`
\- Return button current text.

<!-- 
============================
	phi.ui.CheckBox
============================
-->
### phi.ui.CheckBox *extends:* [phi.ui.Component](#uiComponent) {#uiCheckBox}

**XML**:

	<CheckBox checked="true|false"
			  // + properties from phi.ui.Component ( see phi.ui.Button )
			  // + events from phi.ui.Component
			  />
 
**Methods**:
[setChecked](#), [getChecked](#) 

#### setChecked: `chk.setChecked( true|false )`
\- Sets checkbox checked state

#### getChecked: `chk.getText()`
\- Returns if checkbox is checked

<!-- 
============================
	phi.ui.Image
============================
-->
### phi.ui.Image *extends:* [phi.ui.Component](#uiComponent) {#uiImage}
			
**XML**:

	<Image source="path/to/image"
		   // + properties from phi.ui.Component ( see phi.ui.Button )
		   // + events from phi.ui.Component
		   />
 
**Methods**:
[setChecked](#), [getChecked](#)

#### setSource: `img.setSource( path )`
\- Sets the URL of the image to load. 

#### getSource: `img.getSource()`
\- Return the image URL.

<!-- 
============================
	phi.ui.Label
============================
-->
### phi.ui.Label *extends:* [phi.ui.Component](#uiComponent) {#uiLabel}
			
**XML**:

	<Label text="true|false" 
		   color="#FF0000"
		   fontSize="12"
		   // + properties from phi.ui.Component ( see phi.ui.Button )
		   // + events from phi.ui.Component />
 
**Methods**:
[setFontSize](#), [setColor](#), [setText](#), [getText](#)

#### setFontSize: `lb.setFontSize( fontSize )`
\- (description)

#### setColor: `lb.setColor( color )`
\- (description)

#### setText: `lb.setText( text )`
\- (description)

#### getText: `lb.getText()`
\- (description)

<!-- 
============================
	phi.ui.TextInput
============================
-->
### phi.ui.TextInput *extends:* [phi.ui.Component](#uiComponent) {#uiTextInput}
			
**XML**:

	<TextInput text="true|false"
			   color="#FF0000"
			   displayAsPassword="true|false"
			   // + properties from phi.ui.Component ( see phi.ui.Button )
			   onTextChange=""
			   onEnter="" 
			   // + events from phi.ui.Component plus />

**Methods**:
[setText](#), [setColor](#), [displayAsPassword](#)

**Events**:
[textChange](#), [enter](#)  

#### setText: `txtInput.setText( text )`
\- (description)

#### setColor: `txtInput.setColor( color )`
\- (description)

#### displayAsPassword: `txtInput.displayAsPassword( true|false )`
\- (description)


<!-- 
============================
	phi.ui.Container
============================
-->
### phi.ui.Container *extends:* [phi.ui.Component](#uiComponent) {#uiContainer}

**Methods**:
[addChild](#), [addChildAt](#), [moveChild](#), [getChildAt](#), [getChildIndex](#), [lastChild](#), 
[firstChild](#), [removeChild](#), [removeChildAt](#), [hasChild](#), [getChildren](#), [removeAllChildren](#),
[createIterator](#)

**Events**:
[childAdded](#), 
[childRemoved](#), 
[childrenCreated](#)

#### addChild: `c.addChild( uiComponent )`
\- (description)

#### addChildAt: `c.addChildAt( uiComponent, index )`
\- (description)

#### moveChild: `c.moveChild( uiComponent, newIndex )`
\- (description)

#### getChildAt: `c.getChildAt( index )`
\- (description)

#### getChildIndex: `c.getChildIndex( uiComponent )`
\- (description)

#### lastChild: `c.lastChild()`
\- Helper function, return container last child, it is the same as `c.getChildren()[c.getChildren().length-1]`

#### firstChild: `c.firstChild()`
\- Helper function, return container first child, it is the same as `c.getChildren()[0]`

#### removeChild: `c.removeChild( uiComponent )`
\- (description)

#### removeChildAt: `c.removeChildAt( inde )`
\- (description)

#### removeAllChildren: `c.removeAllChildren()`
\- Removes all children.

#### getChildren: `c.getChildren()`
\- Returns all the container children.

#### createIterator: `c.createIterator()`
\- This function is very useful to parse container children <br />

**Example**:

	// In this example we will hide all children
	var iterator = c.createIterator();
	
	while( iterator.next() )
		iterator.current().setVisible( false );

.