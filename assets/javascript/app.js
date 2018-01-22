//firebase needs to host arrival and departure data
//need to retrieve and manipulate this data with Moment.js


//in firebase, add child, create property names and values 
	//values can be integers, booleans (Only two possible values are true or false), or strings.
//what are my values that I want to keep track of in firebase? 
	//Train name, destination, frequency, next arrival(military time), how many minutes away.

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

  //create a listener that will look for any changes made to database and run a function if a change has been made.
  // .ref() - leave empty if want to listen to all properties/paths, enter the property value in the () if you only want to listen to that one.
  //"value" - if anything is changed the function will run
  //when referencing snapshot use: snapshot.val

  //testing with the counter...the child in this case is 'clicks' and value is 100...in firebase.
  var count = 100;

  firebase.database().ref().on("value",function(snapshot){
  		//why is this not working??? missing a ) ? video lesson 7.1
  	count = snapshot.val().clicks;
  	$("#clickValue").html(count);
  	
  })

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

