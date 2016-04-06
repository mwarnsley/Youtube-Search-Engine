// Document ready function
$(function(){
	searchBox();
	search();
});

// Searchbar handler
function searchBox(){
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

	$("#search-form").submit(function(e){
		e.preventDefault();
	})
}

function search(){
	// Clear the search results
	$("#results").html("");
	$("#buttons").html("");

	// Get for inputs
	var q = $("#query").val();

	// Run the GET request on the API
	$.get(
	  "https://www.googleapis.com/youtube/v3/search",
	  {
	  	part: "snippet, id",
	  	q: q,
	  	type: 'video',
	  	key: 'AIzaSyD7kMn9ppOz357PfAHvcAQ3rgNnvH8M2zQ'
	  },
	  	function(data){
	  		var nextPageToken = data.nextPageToken;
	  		var prevPageToken = data.prevPageToken;

	  		console.log(data);

	  		$.each(data.items, function(i, item){
	  			// Get Output
	  			var output = getOutput(item);

	  			//Display Results
	  			$("#results").append(output);
	  		});
	  }
	);
}