<?php

ob_start();

$isIndex = false;

function redirect($url)
{
	header("Location: $url");
	exit;
}

function CgiStr($name, $default = '')
{
if(array_key_exists($name, $_REQUEST))
	return $_REQUEST[$name];
else
	return $default;
}

function nextPage($page, $newQueryValues)
{
	$queryString = '';
	foreach($_GET as $name=>$value)
		$queryString .= "$name=$value&";
	foreach($newQueryValues as $name=>$value)
		$queryString .= "$name=$value&";
	$url = "$page?$queryString";
	return $url;
}

/**
 * Send the data so that the user gets a 'save to' popup... or maybe
 * not.  The 'save to' is dependant on the specified mime-type.
 * @param mixed data Data to send (usually just CSV data)
 * @param string saveAs filename the browser will use to save the file
 * @param string mimetype MIME type for the download (text/csv for CSV data)
 * @author Dave Ross <dave@xenomedia.com>
 * @see http://www.iana.org/assignments/media-types/
 */
function XCSendRawData($data, $saveAs, $mimetype='application/octet-stream')
{
//	header("Pragma: public");
	header("Expires: 0");
	header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
	header("Content-Type: application/force-download");
	header("Content-Type: application/octet-stream");
	header("Content-Type: application/download");
	header("Content-Disposition: attachment; filename=".$saveAs.";");
	header("Content-Transfer-Encoding: binary");
	header("Content-Length: ".(strlen($data)+1));
	print $data;
}
?>