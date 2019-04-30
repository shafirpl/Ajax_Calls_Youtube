// var mycat = {
//     "name": "Meowsalot",
//     "species": "cat",
//     "favFood": "tuna"
// }

// var myFavColors = ["blue", "green", "purple"];

// var thePets = [
//     {
//         "name": "Meowsalot",
//         "species": "cat",
//         "favFood": "tuna"
//     },

//     {
//         "name": "Barky",
//         "species": "dog",
//         "favFood": "carrots"
//     }
// ]

/*
* Here we are trying to add event listener to the button so that
* when only the button is clicked, we show the stuff on the page
*/
var btn = document.getElementById("btn");
var animalContainer = document.getElementById("animal-info");
var pageCounter = 1;

btn.addEventListener("click", function () {
/*
* This is the most common approach to ajax calls, we initiate 
* a new instance of XMLHttpRequest, and then we call the method
* open on it.
* Or step by step method
* 1. get or send the data via open method
* 2. Do something with the data, by using onload method
* 3. Send the request, using the function send
*/
    var ourRequest = new XMLHttpRequest();
    /* open takes two arguments, the first argument specifies whether we want to send
    * data or receive data, if we want to get/receive data, we would pass GET, if 
    * we want to send data we would pass post to it. Similar to nodejs get and post method
    * The second argument is the url we are talking to
    */
    ourRequest.open('GET', 'https://learnwebcode.github.io/json-example/animals-'+ pageCounter + '.json');

    /*
    * Now after getting this data, we need to do something with this data
    * we use onload method to do that
    */
    ourRequest.onload = function () {
        //error handling
        //remember status between 200 and 400 means the server is working 
        // as expected, for example
        //404 is > 200 which means server not found or something like that so 
        //it means this part of code is fine
        if(ourRequest.status >= 200 && ourRequest.status < 400) {
            //Here we are printing out the data we got
            // console.log(ourRequest.responseText);
            //here we are storing all the json data to ourData variable
            // var ourData = ourRequest.responseText;
            //this would give us/conosle logs a [ , instead of console logging the first data
            //Watch from 14:04 https://www.youtube.com/watch?v=rJesac0_Ftw
            // console.log(outData[0]);

            //So in order to solve the problem, we have to tell that we have to use
            //or parse json data,so we have to use json.parse
            var ourData = JSON.parse(ourRequest.responseText);
            renderHTML(ourData);
            console.log(ourData[0]);
        } else {
            console.log("We connected to the server, but it returned an error");
        }

    }

    //here we are error handling
    ourRequest.onerror = function () {
        //this usually means if the internet is not connected or something like that
        console.log("Connection Error");
    }

    //Finally we have to send the request, that is what we are doing here
    ourRequest.send();
    pageCounter++;
    if(pageCounter>3) {
        btn.classList.add("hide-me");
    }

});


//this function will add paragraphs to the body of html

function renderHTML(data){
    var htmlString = "";
    for (i = 0; i< data.length; i++){
        htmlString += "<p>" + data[i].name + "is a "+ data[i].species + ' that likes to eat' + ' ' 
        //this for loop is for looping through all the likes food of that species
        for (ii = 0; ii < data[i].foods.likes.length; ii++){
            if( ii == 0) {
                htmlString += data[i].foods.likes[ii];
            } else {
                htmlString += " and " + data[i].foods.likes[ii];
            }
        }

        htmlString += " and dislikes to eat " ;
        for (ii = 0; ii < data[i].foods.dislikes.length; ii++) {
            if (ii == 0) {
                htmlString += data[i].foods.dislikes[ii];
            } else {
                htmlString += " and " + data[i].foods.dislikes[ii];
            }
        }
        
        htmlString += "." + "</p>" +"<hr>";
    }
    animalContainer.insertAdjacentHTML('beforeend', htmlString);
}
