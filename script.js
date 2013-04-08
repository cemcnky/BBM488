var run ;

function tweet_search(){
	
	if (run){
			clearTimeout(run);	
	}
    run = setTimeout('tweet_search()', 10000);  //run the search process every 10 seconds
	
    var search_value = encodeURIComponent($('input[name=search_terms]').val());
	
    if(!search_value){	//if there is no input in the search box
		alert("Please enter a word");
    }
    else if(search_value){
	
		// Display a progress indicator
		$('#search_results').html('<img src="ajax_loader.gif"> Searching Twitter...');
		//Get respons from twitter api	
        $.ajax({
            type : "GET",
            dataType : "json",
            url : "http://search.twitter.com/search.json?q=" +search_value + "&rpp=5&callback=?",
            success: function(data){
				
                // Display the results
				$('#search_results').html('');
				
				for(var i =0;i<5 ;i++){
					
					var object = document.getElementById("tweet"+i);
					if(object != null){
						object.parentNode.removeChild(object);	
					}
						
				}
				
				
				
				for(var i =0;i<5;i++){	//for showing 5 tweet results
					// create templates for showing tweets
					var div_tweet = document.createElement("div");
					div_tweet.id = "tweet"+i; 
					div_tweet.className = "tweet";
					var objTo = document.getElementById('contentt');
					objTo.appendChild(div_tweet);
                
					var div_tweet_left = document.createElement("div");
					div_tweet_left.className = "tweet_left"; 
					div_tweet_left.id = "tweet_left"+i; 
					div_tweet.appendChild(div_tweet_left);
				
					var div_tweet_image = document.createElement("img");
					div_tweet_image.className = "tweet_image"; 
					div_tweet_image.id = "tweet_image"+i;
					div_tweet_left.appendChild(div_tweet_image);
					div_tweet_image.src =  data.results[i].profile_image_url;
			
					var div_tweet_right = document.createElement("div");
					div_tweet_right.className = "tweet_right"; 
					div_tweet_right.id = "tweet_right"+i; 
					div_tweet.appendChild(div_tweet_right);
				
					var div_tweet_triangle = document.createElement("div");
					div_tweet_triangle.className = "tweet_triangle"; 
					div_tweet_triangle.id = "tweet_triangle"+i; 
					div_tweet_right.appendChild(div_tweet_triangle);
				
					var div_tweet_row = document.createElement("div");
					div_tweet_row.className = "tweet_row"; 
					div_tweet_row.id = "tweet_row"+i; 
					div_tweet_right.appendChild(div_tweet_row);
				
					var div_tweet_username = document.createElement("div");
					div_tweet_username.className = "tweet_username"; 
					div_tweet_username.id = "tweet_username"+i; 
					div_tweet_row.appendChild(div_tweet_username);
				
					var a = document.createElement("a");
					a.href = "https://twitter.com/"+data.results[i].from_user; 
					a.target = "search";
					a.innerHTML = "@"+data.results[i].from_user;
					a.id = "a"+i; 
					div_tweet_username.appendChild(a);
				
					var div_tweet_name = document.createElement("span");
					div_tweet_name.className = "tweet_name"; 
					div_tweet_name.id = "tweet_name"+i;
					div_tweet_name.innerHTML = data.results[i].from_user_name;
					div_tweet_username.appendChild(div_tweet_name);
				
					var div_tweet_date = document.createElement("div");
					div_tweet_date.className = "tweet_date"; 
					div_tweet_date.id = "tweet_date"+i;
					div_tweet_date.innerHTML = data.results[i].created_at;
					div_tweet_username.appendChild(div_tweet_date);
				
					var div_tweet_row2 = document.createElement("div");
					div_tweet_row2.className = "tweet_row"; 
					div_tweet_row2.id = "tweet_row2"+i; 
					div_tweet_right.appendChild(div_tweet_row2);
				
					var div_tweet_text = document.createElement("div");
					div_tweet_text.className = "tweet_text"; 
					div_tweet_text.id = "tweet_text"+i; 
					div_tweet_text.innerHTML = data.results[i].text;
					div_tweet_row2.appendChild(div_tweet_text);

				}        
			}
		});  
	} 
};
  