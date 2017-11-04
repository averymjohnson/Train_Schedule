  //Initialize Firebase
  var config = {
    apiKey: "AIzaSyAp5AWJgtDhhPeoSD9cgGPlJOkW3I9j5ys",
    authDomain: "train-schedule-7fdd5.firebaseapp.com",
    databaseURL: "https://train-schedule-7fdd5.firebaseio.com",
    projectId: "train-schedule-7fdd5",
    storageBucket: "",
    messagingSenderId: "615431833555"
  };
  firebase.initializeApp(config);

     $("#addbtn").on("click", function(){
        event.preventDefault();

      var trainName = $("#train-name").val().trim();
      var dest = $("#destination").val().trim();
      var firsttrain = $("#first-train").val().trim();
      var freq = $("#freq").val().trim();

      var train = {
        name: trainName,
        dest: dest,
        start: firsttrain,
        freq: freq
        };

      firebase.database().ref().push(train);

      alert("Train Added");

      $("#train-name").val("");
      $("#destination").val("");
      $("#first-train").val("");
      $("#freq").val("");
     });

  firebase.database().ref().on("child_added", function(childSnapshot){

    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().dest;
    var startTrain = childSnapshot.val().start;
    var trainFreq = childSnapshot.val().freq;

    var minAway = trainFreq - (moment().diff(moment.unix(startTrain, "YYYY-MM-DD HH:mm"), "minutes") % trainFreq);

    var minElapsed = moment().diff(moment.unix(startTrain, "YYYY-MM-DD HH:mm"), "minutes");

    var nextTrain = parseInt(startTrain) + ((minElapsed + minAway) * 60);

    var trainOutput = moment.unix(nextTrain).format("LT");

  $("#results-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + "</td><td>" + trainOutput + "</td><td>" + minAway + "</td></tr>");
  });
