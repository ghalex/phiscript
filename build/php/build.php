<?php
include_once("buildFunctions.php");
header("content-type: application/x-javascript");

$version = "0.6.1";
$buildFile = false;
$filesDir = "src/phi/";

if( isset($_GET['buildFile']))
	$buildFile = $_GET['buildFile']; 

$data = mergeFiles( getFiles(), $filesDir );

if( $buildFile == TRUE )
{
	$fileName = "phiscript-" . $version . ".js";
	buildFile($fileName, $data, false, "bin/");
}

echo $data;

?>