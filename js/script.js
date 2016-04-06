// Document ready function
$(function(){
	search();
});

// Searchbar handler
function search(){
	var searchField = $("#query"),
		icon = $("#search-btn"),
		speed = 400;

	// Focus event handler
	$(searchField).on("focus", function(){
		$(this).animate({
			width: '100%'
		}, speed);
		$(icon).animate({
			right: '10px'
		}, speed);
	});

	// Blur event handler
	$(searchField).on("blur", function(){
		if(searchField.val() === ''){
			$(this).animate({
				width: '45%'
			}, speed, function(){});
			$(icon).animate({
				right: '360px'
			}, speed, function(){});
		}
	});
}