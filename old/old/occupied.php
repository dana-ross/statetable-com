<?php include_once("init.php"); ?>
<?php include_once("header.html"); ?>

<?php

$country = CgiStr('country');
$time = CgiStr('time');

// As of 08/13/2008, Canada doesn't have any historical territories
if($country == 'canada')
	redirect(nextPage('format.php', array('occupied'=>'occupied')));



?>

<p>Do you want to include the US Minor Outlying Islands?  These are mostly unoccupied reefs and atolls considered US territory.</p>

<ul>
<li><a href="<?php print nextPage('format.php', array('occupied'=>'occupied')); ?>">Do not include the US Minor Outlying Islands</a></li>
<li><a href="<?php print nextPage('format.php', array('occupied'=>'all')); ?>">Include US Minor Outlying Islands</a></li>
</ul>

<?php include_once("footer.html"); ?>