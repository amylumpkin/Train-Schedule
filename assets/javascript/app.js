//firebase needs to host arrival and departure data
//need to retrieve and manipulate this data with scripts from Moment.js - it's a wrapper for 'date object' like jQuery is a wrapper for javascript.
$(document).ready(function(){
  //need the time in military time......

  $(".current-time").text("Current Time: " + moment(moment()).format("hh:mm"));

  //in firebase, add child, create property names and values 
  	//values can be integers, booleans (Only two possible values are true or false), or strings.
  //what are my values that I want to keep track of in firebase? 
  	//Train name, destination, frequency, next arrival(military time), how many minutes away.

  //not sure how to name these values in firebase.


  // Initialize Firebase
    var config = {
      apiKey: "AIzaSyCyW_XtxEzkoozLMQgPErrxh8TCmsC-37E",
      authDomain: "train-schedule-1fcf9.firebaseapp.com",
      databaseURL: "https://train-schedule-1fcf9.firebaseio.com",
      projectId: "train-schedule-1fcf9",
      storageBucket: "train-schedule-1fcf9.appspot.com",
      messagingSenderId: "231209230759"
    };

    firebase.initializeApp(config);

    //???var database = firebase.database();            finish watching video 7.2

    var trainName = " ";
    var destination = " ";
    var frequency = "hh:mm";
    var nextArrival = "hh:mm";
    var minutesAway = "hh:mm"
      
      //submit button on click here...collect data from form and send to firebase
  $("#add-train").submit(function(event){
    event.preventDefault();



    

    trainName = $("#input-train-name").val().trim();
    destination = $("#input-destination").val().trim();
    frequency = $("#input-frequency").val().trim();
    nextArrival = $("#input-next-arrival").val().trim();
    minutesAway = $("#input-minutes-away").val().trim();
    console.log(trainName);
    var newTrain= {
      trainName:trainName,
      destination:destination,
      frequency:frequency,
      nextArrival:nextArrival,
      minutesAway:minutesAway
    }
    //now push the data into firebase
    firebase.database().ref().push(newTrain);
  });





  

  //create a listener that will look for any changes made to database and run a function if a change has been made.
  // .ref() - leave empty if want to listen to all properties/paths, enter the property value in the () if you only want to listen to that one.
  //"value" - if anything is changed the function will run
  //when referencing snapshot use: snapshot.val



/************************************
// this is the listener, change 'value' to something else. 
// do I need several of these?
*/
firebase.database().ref().on("child_added",function(snapshot){
    createRow(snapshot);
    console.log(snapshot);
    console.log(snapshot.val());
  })

//function to get data and append to table
function createRow(data) {
  console.log(data.val);
  const tBody = $("tbody");
  const tRow = $("<tr>");
//method chaining to return selected objects
  const trainNameTd = $("<td>").text(data.val().trainName || "no trainName");
  const destinationTd = $("<td>").text(data.val().destination || "no destination");
  const frequencyTd = $("<td>").text(data.val().frequency || "no frequency");
  const nextArrivalTd = $("<td>").text(data.val().nextArrival || "no nextArrival");
  const minutesAwayTd = $("<td>").text(data.val().minutesAway || "No Minutes Away");

//append data to row
  tRow.append(trainNameTd, destinationTd, frequencyTd, nextArrivalTd, minutesAwayTd);

//append row to table body
  tBody.append(tRow);

}

//ajax call here... need an api key for train schedules?


//search the api and append table rows
//searchAPINAME("whatever I'm searching for");


//end document ready:


});





//testing with the counter...the child in this case is 'clicks' and value is 100...in firebase.

/*var count = 100;

  $("#clickButton").on("click", function(){
  	count--;
  	firebase.database().ref().set({
  		clicks:count 
  	});
  })

  $("#restartButton").on("click", function(){
  	firebase.database().ref().set({
  		clicks:100
  	});
  })
*/
