$(function() {

	var options = {};
		
	$('.choice_country').click(function() {
		options.country = this.id;
		if(this.id === "Canada") {
			options.time = 'current';
		}
		$('#division').ScrollTo();
		return false;
	});
	
	$('.choice_division').click(function() {
		options.division = this.id;
		if('Canada' === options.country) {
			$('#format').ScrollTo();
		}
		else {
			// usa or both
			$('#dc').ScrollTo();
		}
		return false;
	});
	
	$('.choice_dc').click(function() {
		options.dc = this.id;
		$('#time').ScrollTo();
		return false;
	});
	
	$('.choice_time').click(function() {
		options.time = this.id;
		$('#occupied').ScrollTo();
		return false;
	});
	
	$('.choice_occupied').click(function() {
		options.occupied = this.id;
		$('#format').ScrollTo();
		return false;
	});
	
	$('.quick_50').click(function() {
		options.country = 'USA';
		options.division = 'major';
		options.dc = 'false';
		options.time = 'current';
		options.occupied = 'occupied';
		$('#format').ScrollTo();
	});
	
	$('.choice_format').click(function() {
		options.format = this.id;
		var downloadURL = "http://statetable.com/file?1";
		if(options.country !== undefined) {
			downloadURL += "&country=" + options.country;
		}
		if(options.division !== undefined) {
			downloadURL += "&division=" + options.division;
		}
		if(options.dc !== undefined) {
			downloadURL += "&dc=" + options.dc;
		}
		if(options.time !== undefined) {
			downloadURL += "&time=" + options.time;
		}
		if(options.occupied !== undefined) {
			downloadURL += "&occupied=" + options.occupied;
		}
		if(options.format !== undefined) {
			downloadURL += "&format=" + options.format;
		}
		downloadURL += "&uniq=" + Math.floor(Math.random()*9999999);
		window.location.href = downloadURL;
		$('#thanks').ScrollTo();
		return false;
	});
	
	$('.choice_restart').click(function() {
		window.location.reload();
	});

});

