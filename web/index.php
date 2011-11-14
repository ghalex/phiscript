<?php
include_once("markdown.php");

function section( $name )
{
	$data = file_get_contents( 'content/' . $name . ".md"); 
	return Markdown( $data );
}
?>

<!DOCTYPE html>
<html>
<head>
<title>PhiScript - JavaScript framework for building cross-browser web applications.</title>

<link rel="stylesheet/less" href="css/all.less" type="text/css">

<script src="scripts/less-1.1.3.min.js" type="text/javascript"></script>
<script src="scripts/mootools-core-1.3.2.js" type="text/javascript"></script>
<script src="scripts/mootools-more-1.3.2.1.js" type="text/javascript"></script>
<script src="scripts/prettify.js" type="text/javascript"></script>
<script src="http://phiscript.com/download/phiscript.min-0.8.5.js" type="text/javascript"></script>

<script>
	window.addEvent('domready', function() 
	{
		$$('pre').each( function( item ) {
			item.addClass('prettyprint');
			item.addClass('linenums');
		})
		
		prettyPrint();
		
		$('maintoolbar').pin();
		$('maintoolbar').addEvent('click', function() { $redrawElement( $('maintoolbar') ); });
	});	

</script>

</head>

<body>
	
<!-- TOOLBAR -->
<div id="maintoolbar">
	<div>
		<a id="logo" href="#">PhiScript</a>
		<ul id="mainmenu" class="nav">
			<li><a href="#overview">Overview</a></li>
			<li><a href="#compiler">Compiler</a></li>
			<li><a href="#views">Views & Binding</a></li>
			<li><a href="#api">API</a></li>
			<li><a href="#">About</a></li>
		</ul>
	</div>
</div>

<!-- HEADER -->
<div id="header">
	<div>
		<h1>PhiScript for Javascript</h1>
		<p>PhiScript provides a highly productive, open source framework for building and maintaining <br/>expressive web applications that deploy consistently on all major browsers.</p>	
	</div>
</div>

<div id="content">
	<div class="section">
		<?php echo section('overview'); ?>
	</div>
	
	<div class="section">
		<?php echo section('compiler'); ?>
	</div>
	
	<div class="section">
		<?php echo section('api'); ?>
	</div>
</div>
<div id="footer"></div>
</body>
</html>