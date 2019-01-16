require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");

var command = process.argv[2];
var input = process.argv.splice(3).join(" ");

function commandInput(command, input) {
    if (command == "spotify-this-song") {
        var input;
        if (input ===  " ") {
            input = "The Sign Ace Of Base";
        } else {
            input = input;
        }
        spotify
        .search({ type: "track", query: input })

        .then(function (response) {
            console.log(`Artist: ${response.tracks.items[0].artists[0].name}`)
            console.log(`Song: ${response.tracks.items[0].name}`)
            console.log(`Link: ${response.tracks.items[0].preview_url}`)
            console.log(`Album: ${response.tracks.items[0].album.name}`)        
        })
    } else if (command == "movie-this") {
        if (input == "") {
            input = "The.Blind.Side"
        }
        axios.get("https://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy").then(
            function (response) {
                console.log(`Movie: ${response.data.Title}`);
                console.log(`Year: ${response.data.Year}`);
                console.log(`IMDb Rating: ${response.data.imdbRating}`);
                console.log(`Rotten Tomoatoes Rating: ${response.data.Ratings[1].Value}`);
                console.log(`Country: ${response.data.Country}`);
                console.log(`Language: ${response.data.Language}`);
                console.log(`Plot: ${response.data.Plot}`);
                console.log(`Actors: ${response.data.Actors}`);
})
} else if (command == "concert-this") {
    axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp").then(
            function (response) {
                for (i = 0; i < response.data.length; i++) {
                    console.log(`Artist: ${response.data[i].lineup.join(", ")}`)
                    console.log(`Venue: ${response.data[i].venue.name}`)
                    console.log(`Location: ${response.data[i].venue.city}, ${response.data[i].venue.region}, ${response.data[i].venue.country}`);
                    console.log("Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY"))
                }
})

} else if (command == "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        else {

            var randomText = data.split(",");

            command = randomText[0];

            input = randomText[1];

            commandInput(command, input)
        }
})
}}
commandInput(command, input)

