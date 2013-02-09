<?php include_once("init.php"); ?>
<?php include_once("header.html"); ?>

<p>Now, how would you like the data formatted?</p>

<ul>
<li><a href="<?php print nextPage('download.php', array('format'=>'csv')); ?>">A CSV file I can open in my office suite</a></li>
<li><a href="<?php print nextPage('download.php', array('format'=>'sql')); ?>">A file of SQL statements I can use to create a "state" table in my database</a></li>
<li><a href="<?php print nextPage('download.php', array('format'=>'select')); ?>">An HTML snippet with a &lt;select&gt; tag and option tags for each state</a></li>
<li><a href="<?php print nextPage('download.php', array('format'=>'php_array')); ?>">A PHP snippet for an array keyed on state abbreviation, with state names as the values</a></li>
<li><a href="<?php print nextPage('download.php', array('format'=>'drupal')); ?>">A pipe-separated list of Allowed Values for Drupal</a></li>
</ul>

<?php include_once("footer.html"); ?>