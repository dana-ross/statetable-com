<?php include_once("init.php"); ?>
<?php include_once("header.html"); ?>

<?php

$fileURL = nextPage('file.php', array('uniq'=>rand()));

?>

<p>Your download should start automatically.  If it doesn't, click <a href="<?php print $fileURL; ?>">here</a>.</p>

<p>Thank you for visiting.</p>

<iframe src="<?php print $fileURL; ?>" style="width:0px;height:0px;"></iframe>

<?php include_once("footer.html"); ?>