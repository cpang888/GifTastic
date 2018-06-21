
  var topics = ["dog", "cat", "rabbit"];
    
  function start() {

    renderButtons();

    $("#submitBtn").on("click", function(event){
        event.preventDefault();
     
        var input = document.getElementById("addAnimal").value;
        console.log(input);

        // push the user's input animal to the topic's array
        topics.push(input);

        renderButtons();

    }); 
    
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
        // a.attr("data-still", "still");
        // Providing the initial button text
        a.text(topics[i]);
        // Adding the button to the animalBtn div
        animalBtn.append(a);

      }

      $(".animal").on("click", function(event) {
          event.preventDefault();
          var animal = $(this).attr("data-name");
          // make API to get image
          console.log(animal);

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

                var p = $("<p>").text("Rating: " + rating);

                var animalImage = $("<img>");
                animalImage.addClass("gif");
                
                animalImage.attr("src", results[i].images.fixed_height_still.url);
                animalImage.attr("data-still", results[i].images.fixed_height_still.url);
                animalImage.attr("data-animate", results[i].images.fixed_height.url);
                animalImage.attr("data-state", "still");

                gifDiv.prepend(p);
                gifDiv.prepend(animalImage);

                $("#animals").prepend(gifDiv);
              }

              $(".gif").on("click", function() {
                // event.preventDefault();
                
                var state = $(this).attr("data-state");
                console.log("state: " + state);
                
                if(state === "still") {
                  $(this).attr("src", $(this).attr("data-animate"));
                  $(this).attr("data-state", "animate");
                } else {
                  $(this).attr("src", $(this).attr("data-still"));
                  $(this).attr("data-state", "still");
                }
                
              });
            });

            
      });

      

    }
  }

  $(document).ready(function() {
    // when document is ready, call the start method
    start(); 

  })