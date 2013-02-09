<?php include_once("init.php"); ?>
<?php include_once("header.html"); ?>

<?php

$country = CgiStr('country');

// As of 08/13/2008, Canada doesn't have any historical territories
if($country == 'canada')
	redirect(nextPage('occupied.php', array('time'=>'all')));
?>

<p>Do you want data on territories that are no longer under US control?</p>

<ul>
<li><a href="<?php print nextPage('occupied.php', array('time'=>'current')); ?>">Only include current states and territories</a></li>
<li><a href="<?php print nextPage('occupied.php', array('time'=>'all')); ?>">Include territories no longer under US control</a></li>
</ul>

<?php include_once("footer.html"); ?>