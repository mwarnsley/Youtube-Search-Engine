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


// Function for the search results
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

// Build Output
function getOutput(item){
	var videoId = item.id.videoId;
	var title = item.snippet.title;
	var description = item.snippet.description;
	var thumb = item.snippet.thumbnails.high.url;
	var channelTitle = item.snippet.channelTitle;
	var videoDate = item.snippet.publishedAt;
	
	// Build Output String
	var output = '<li>' +
	'<div class="list-left">' +
	'<img src="'+thumb+'">' +
	'</div>' +
	'<div class="list-right">' +
	'<h3><a class="fancybox fancybox.iframe" href="http://www.youtube.com/embed/'+videoId+'">'+title+'</a></h3>' +
	'<small>By <span class="cTitle">'+channelTitle+'</span> on '+videoDate+'</small>' +
	'<p>'+description+'</p>' +
	'</div>' +
	'</li>' +
	'<div class="clearfix"></div>' +
	'';
	
	return output;
}

// Build the buttons
function getButtons(prevPageToken, nextPageToken){
	if(!prevPageToken){
		var btnoutput = '<div class="button-container">'+'<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"' +
		'onclick="nextPage();">Next Page</button></div>';
	} else {
		var btnoutput = '<div class="button-container">'+
		'<button id="prev-button" class="paging-button" data-token="'+prevPageToken+'" data-query="'+q+'"' +
		'onclick="prevPage();">Prev Page</button>' +
		'<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"' +
		'onclick="nextPage();">Next Page</button></div>';
	}
	
	return btnoutput;
}