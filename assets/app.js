// Initial array of topics
var topicArr = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];

// Function for displaying buttons
function renderButtons() {

    // Delete the content inside the buttons-appear-here div prior to adding new movies, so that you don't get repeat buttons
    $("#buttons-appear-here").empty();

    // Loop through the array of topics, then generate buttons for each topic in the array
    for ( let i = 0; i < topicArr.length; i++) {
        var newButton = $("<button>" + topicArr[i] + "</button>");
        newButton.attr("data-term", topicArr[i]);
        $("#buttons-appear-here").append(newButton);
    }
}

// This function handles events where the add movie button is clicked
$("#add-button").on("click", function(event) {
    // event.preventDefault() prevents submit button from trying to send a form
    event.preventDefault();

    // grab the text the user types into the input field
    var input = $("#search-term").val().trim();
    // add the new topic into the topicArr
    topicArr.push(input);
    // Then renderButtons function is called, rendering the list of movie buttons
    renderButtons();
});

// Calling the renderButtons function to display the initial list of movies
renderButtons();


$("#buttons-appear-here").on("click", "button", function() {
    var term = $(this).attr("data-term");
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + term + "&api_key=dc6zaTOxFJmzC&limit=10&rating=pg";

    $.get(queryURL).then(function(response) {

        // since the image information is inside of the data key, make a variable named results and set it equal to response.data
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
        // Make a div with jQuery and store it in a variable named animalDiv.
            var animalDiv = $("<div>");
        // Make a paragraph tag with jQuery and store it in a variable named p.
            var p = $("<p>");
        // Set the inner text of the paragraph to the rating of the image in results[i].
            p.text("rating: " + results[i].rating);
        // Make an image tag with jQuery and store it in a variable named animalImage.
            var animalImage = $("<img>");
        // Set the image's src to results[i]'s fixed_height.url.
            animalImage.attr("src", results[i].images.fixed_height.url);
        // Append the p variable to the animalDiv variable.
            animalDiv.append(p);
        // Append the animalImage variable to the animalDiv variable.
            animalDiv.append(animalImage);
        // Prepend the animalDiv variable to the element with an id of gifs-appear-here.
            $("#gifs-appear-here").prepend(animalDiv);

        }

        });
});