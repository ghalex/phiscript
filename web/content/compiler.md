Compiler {#compiler}
=====================

### Why a compiler and how to used ###

You can use PhiScript library without the compiler, because PhiScript library is just a collections of JavaScript classes. For example
let's say we want to display two inputs to get the username and password and if there are correct we will display a message.

	var myView = new View();
	var hBox = phi.ui.HBox.create();
	
	var txtInput1 = phi.ui.TextInput.create();
	var txtInput2 = phi.ui.TextInput.create({displayAsPassword: true});
	var btn = phi.ui.Button.create({text: "Login"});
	
	hBox.addChild( txtInput1 );
	hBox.addChild( txtInput2 );
	hBox.addChild( btn );
	
	myView.addChild( hBox );
	
	btn.addEvent('click', function() {
		var username = txtInput1.getText();
		var password = txtInput2.getText();
		
		if( username == 'admin' && password == 'admin' )
			alert('You have login with success!');
	})
	
	// To render this we will add view to BODY element
	phi.ui.RootBox.get().addChild( myView );

As you can is very hard to create a layout in this way plus if we need more layout constraints the code will be even bigger 
and hard to see how ui components are arrange in the tree. So for that we will use XML language to write our code and in combination
with JavaScript we will have a much nicer code. Let's see the code above using XML:
	
	// MyView.xml
	<View>
	<HBox>
		<TextInput id="txtInput1" />
		<TextInput id="txtInput2" displayAsPassword="true" />
		<Button text="Login" onClick="login()" />
		
		<JavaScript>
			<![CDATA[
			
			login: function()
			{
				var username = this.txtInput1.getText();
				var password = this.txtInput2.getText();
				
				if( username == 'admin' && password == 'admin' )
					alert('You have login with success!');
			}
			
			]]>
		</JavaScript>
	</HBox>
	</View>
	
As you can see the code now is much more easy to understand and easy to edit. But for that to work **we need a compiler** to transform that in JavaScript. So that is 
why we need PhiScript compiler if we want to define our views using XML. If you open `MyView.xml` with PhiScript compiler it will generate a
`MyView.js` file that will contain something like this:

	var MyView = new Class({
	
		Extends: phi.ui.View,
		
		createChildren: function()
		{
			this.addChild( this.hbox01() )
		},
		
		hbox01: function()
		{
			var result = phi.ui.HBox.create();
			result.addChild( phi.ui.TextInput.create() );
			result.addChild( phi.ui.TextInput.create({displayAsPassword: true}) );
			.............................
			.............................
			
			return result
		},
	}

all you have to do in your code to used is:

	<script src="MyView.js" type="text/javascript"></script>
	<script>
		function onDOMReady()
		{
			var myView = new MyView();
			
			// and to add your view to BODY use RootBox
			phi.ui.RootBox.get().addChild( myView );
		}
	</script>

and that is all. If you want to make changes, you only need to edit `MyView.xml` recompile and refresh the page and you should see the changes. Please read more 
about [Views](#) and how you can create custom views in [Views & Binding](#) section.
