<?php include_once("init.php"); ?>
<?php include_once("header.html"); ?>

<?php

$country = CgiStr('country');
$division = CgiStr('division');

// As of 08/13/2008, Canada doesn't have any historical territories
if($country == 'canada') {
	redirect(nextPage('time_period.php', array('dc'=>'false')));
}	

if($division == 'major') {
	$next_page = 'format.php';
	$extra_params = array('time' => 'current', 'occupied' => 'occupied');
}
else {
	$next_page = 'time_period.php';
	$extra_params = array();
}
?>

<p>Do you want Washington, DC in the list?</p>

<ul>
<li><a href="<?php print nextPage($next_page, array_merge(array('dc'=>'true'), $extra_params)); ?>">Yes, include DC in the list of states, but mark it as the "capitol"</a></li>
<li><a href="<?php print nextPage($next_page, array_merge(array('dc'=>'false'), $extra_params)); ?>">No, do not include DC in the list</a></li>
</ul>

<?php include_once("footer.html"); ?>