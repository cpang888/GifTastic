
  var topics = ["dog", "cat", "rabbit"];
    
  function start() {

    // the current animal which was clicked
    var animal = "";
    var favoriteImg = "";

    showFavoriteImg();

    renderButtons();

    // get another 10 animal gif using ajax call
    $("#additionalGifsBtn").on("click", function(event){
      event.preventDefault();
     
      displayAnimals();

    });

    $("#submitBtn").on("click", function(event){
        event.preventDefault();
     
        var input = document.getElementById("addAnimal").value;
        console.log(input);

        // push the user's input animal to the topic's array
        topics.push(input);

        renderButtons();

    }); 
    
    // store favorite image to local storage
    function storeFavoriteImg() {
      localStorage.setItem("favoriteImg", favoriteImg);
    }

    // show favorite image to html's favorite section
    function showFavoriteImg() {

      $("#favorite").empty();
      
      var favoriteUrl = localStorage.getItem("favoriteImg");

      if(favoriteUrl != "") {
        var favImage = $("<img>");
        favImage.attr("src", favoriteUrl);
        $("#favorite").append(favImage);
      }
    }

    function displayAnimals() {
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      animal + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
          var results = response.data;
          console.log(response);
          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;
            var title = results[i].title;

            var pRating = $("<p>").text("Rating: " + rating);
            var pTitle = $("<p>").text("Title: " + title);

            var favoriteBtn = $("<button>");
            favoriteBtn.addClass("favoriteBtn");
            favoriteBtn.text("Add to favorites");
            favoriteBtn.data("data-image-still", results[i].images.fixed_height_still.url);
            favoriteBtn.data("data-image-animate", results[i].images.fixed_height.url);

            var animalDiv = $("<div>");
            animalDiv.addClass("animalDiv");
            var animalImage = $("<img>");
            animalImage.addClass("gif");
            
            animalImage.attr("src", results[i].images.fixed_height_still.url);
            animalImage.attr("data-still", results[i].images.fixed_height_still.url);
            animalImage.attr("data-animate", results[i].images.fixed_height.url);
            animalImage.attr("data-state", "still");
            
            animalDiv.prepend(favoriteBtn);
            animalDiv.prepend(animalImage);
            
            gifDiv.prepend(pRating);
            gifDiv.prepend(pTitle);

            gifDiv.prepend(animalDiv);

            $("#animals").prepend(gifDiv);
          }

          $(".favoriteBtn").on("click", function() {

            // store the favorite image to local storage
            console.log("animalDiv still" + $(this).data("data-image-still"));
            console.log("animalDiv animate" + $(this).data("data-image-animate"));

            var state = $(this).data("data-state");

            console.log("favoriteImg state: " + state);
            if($(this).data("data-state") != "animate") {
              favoriteImg = $(this).data("data-image-still");
            } else {
              favoriteImg = $(this).data("data-image-animate");
            }
            // if(state == "still") {
            //   favoriteImg = $(this).data("data-image-still");
            // } else {
            //   favoriteImg = $(this).data("data-image-animate");
            // }
            storeFavoriteImg();
            console.log("favoriteImg: " + favoriteImg);

            showFavoriteImg();
          })

          $(".gif").on("click", function() {
            // event.preventDefault();
            $(".favoriteBtn").data("data-state", "still");

            var state = $(this).attr("data-state");
            console.log("state: " + state);
            
            if(state == "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
              $(".favoriteBtn").data("data-state", "animate");
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
              $(".favoriteBtn").data("data-state", "still");
            }
            
          });
        });
    }

    // Function for displaying animal data
    function renderButtons() {

      var animalBtn = $("#animalBtn");
     
      animalBtn.empty();

      for( var i=0; i<topics.length; i++) {
        var a = $("<button>");
        // Adding a class of animal to our button
        a.addClass("animal");
        // Adding a data-attribute
        a.attr("data-name", topics[i]);
        // Providing the initial button text
        a.text(topics[i]);
        // Adding the button to the animalBtn div
        animalBtn.append(a);

      }

      $(".animal").on("click", function(event) {
          event.preventDefault();
          animal = $(this).attr("data-name");
          // make API to get image
          console.log(animal);
          displayAnimals();

      });

    }
  }

  $(document).ready(function() {
    // when document is ready, call the start method
    start(); 

  })