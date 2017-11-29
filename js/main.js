//listen for form submit

document.getElementById('myform').addEventListener('submit', saveBookmark);

// Saves bookmark
function saveBookmark(e){
	//form values
	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteUrl').value;

	
	if (!validateForm(siteName, siteUrl)) {
		return false;
	}

	var bookmark ={
		name: siteName,
		url: siteUrl
	}

	/*
	//local storage test
	localStorage.setItem('test', 'Hello World');
	console.log(localStorage.getItem('test'));
	localStorage.removeItem('test');
	console.log(localStorage.getItem('test'));
	*/

	//tests if bookmark has a value
	if(localStorage.getItem('bookmarks') === null){

		//init array
		var bookmarks = [];
		//add to array
		bookmarks.push(bookmark);

		//set to local Storage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	} else {
		//get bookmarks from local storage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		//add bookmark to array
		bookmarks.push(bookmark);
		//reset back to local storage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	}

	// Clear form
 	document.getElementById('myForm').reset();
 	
	// re-fetch bookmarks

		fetchBookmarks();
	// prevents the form from submiting
	e.preventDefault();
}

//Delete bookmark
function deleteBookmark(url){
	//get bookmarks form local storage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	// loop through bookmarks
	for (var i = 0; i < bookmarks.length ; i++) {
		if (bookmarks[i].url == url) {
			//remove form array
			bookmarks.splice(i, 1);
		}
	}
	//reset back to local storage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

		// re-fetch bookmarks
		fetchBookmarks();
}

//Edit bookmark
function deleteBookmark(url){
	//get bookmarks form local storage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	// loop through bookmarks
	for (var i = 0; i < bookmarks.length ; i++) {
		if (bookmarks[i].url == url) {
			//update url
			bookmarks.splice(i, 1);
		}
	}
	//reset back to local storage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

		// re-fetch bookmarks
		fetchBookmarks();
}

//toggle edit function
function editUrl() {
    var x = document.getElementById("edit");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

 //fetch bookmarks
 function fetchBookmarks(){
 	//get bookmarks from local storage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	//get output ID
	var bookmarksResults = document.getElementById('bookmarksResults');

	//build output

	bookmarksResults.innerHTML = '';

	for(var i = 0; i < bookmarks.length; i++){
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;

		bookmarksResults.innerHTML += '<div class="card">'+
										'<div class="card-body">'+

										'<h3>'+name+
										'</h3>'+
										'<a class="btn btn-secondary" target="_blank" href="'+url+'">visit</a> ' +
										'<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger"  href="#">Delete</a> ' +
										'<button onclick="editUrl()" class="btn btn-primary">Edit</button> ' +
										'<br>'+
										'<div id="edit" style="display:none;"> '+
										'<label>Site Url</label> '+
            							'<input type="text" class="form-control" id="siteUrl" placeholder="Website Url"> '+
            							'<br>'+
            							'<button onclick="saveUrl()" class="btn btn-success">Save</button> ' +
										'</div>' +
										'</div>'+
										'</div> '+
										'<br>';
	}

 }
//validate form
 function validateForm(siteName, siteUrl){
 	if (!siteName || !siteUrl) {
		alert('Please fill in the form properly');

		return false;
	}	

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if (!siteUrl.match(regex)) {
		alert('Please Use a valid Url');

		return false;
	}

	return true;

 }