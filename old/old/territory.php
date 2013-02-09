<?php include_once("init.php"); ?>
<?php include_once("header.html"); ?>

<?php

$country = CgiStr('country');

switch($country) {
  case 'canada':
    $division = 'provinces';
    break;
  case 'usa':
  default:
    $division = 'states';
    break;
}

?>

<p>Do you want territories or just <?php echo $division; ?>?</p>

<ul>
<li><a href="<?php print nextPage('dc.php', array('division'=>'major')); ?>">Only include current <?php echo $division; ?></a></li>
<li><a href="<?php print nextPage('dc.php', array('division'=>'all')); ?>">Include current territories</a></li>
</ul>

<?php include_once("footer.html"); ?>