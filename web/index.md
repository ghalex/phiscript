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

[Component](#), [Container](#), [Button](#), [CheckBox](#), [Image](#), [Label](#), [TextInput](#), [Menu](#), [CellBox](#), 
[HBox](#), [VBox](#), [ListBase](#), [List](#), [TitleWindow](#), [View](#), [ViewStack](#)

<!-- 
	phi.ui.Component
	============================
-->
### phi.ui.Component *extends:* [phi.ui.Object](#) *[![API](images/jumpback.png)](#api)* {#uiComponent}

**Methods**:
[addClass](#), [removeClass](#), [getPosition](#), [setWidth](#), [setHeight](#), [getWidth](#), 
[getHeight](#), [setSize](#), [getParent](#), [getParentView](#), [setVisible](#), [getVisible](#),
[setEnabled](#), [getEnabled](#), [setBackgroundColor](#)

**Events**:
[added](#), [removed](#), [click](#), [dblclick](#), [keydown](#), [keypress](#), 
[keyup](#), [mousedown](#), [mousemove](#), [mouseout](#), [mouseover](#), [mouseup](#)

<!--- phi.ui.Components: Methods  -->
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
