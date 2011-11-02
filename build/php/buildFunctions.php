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
		
		// Events
		//'events/Event.js',
		//'events/CollectionEvent.js',
		//'events/ChildEvent.js',
		//'events/DataEvent.js',
		//'events/ListEvent.js',
		//'events/MenuEvent.js',
		
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