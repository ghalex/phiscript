<?php

function getFiles()
{
	$files = array(
    
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
	);
	
	return $files;
}

function mergeFiles( $files, $filesDir = "" )
{
	$result = "";
	foreach( $files as $fileName )
	{
		$script = file_get_contents( $filesDir.$fileName, "r" );
		$result .= $script.'

';
	}
	
	return $result;
}

function compressData( $data )
{
	$result = str_replace("\r\n", "", $data);
	$result = str_replace("\t", "", $result);
	$result = str_replace("\n", "", $result);
	$result = str_replace("\r", "", $result);
	
	return $result;
}

function buildFile( $fileName, $data, $compress = false, $dir = "" )
{
	$result = $data;
	if( $compress )
		$result = compressData($data);
	
	file_put_contents ( $dir.$fileName, $result ); 
	
	return $result;
}

?>