qNum = 0;
aNum = 0;
// sweet > healthy > prep > hot
answers = {true: {true: {true: {true: "Healthy Pumpkin Cheesecake Muffin", false: "Vegan Pumpkin Pie Energy Bars"}, false: {true: "Hemp and Maple Pecan Oatmeal", false: "Banana Maple Yogurt Parfait"}},false: {true: {true: "Sweet Butter Cookies",false: "Macadamia Toffee Brittle"}, false: {true: "Godiva Hot Chocolate",false: "Aldi Mini Eclairs"}},}, false: {true: {true: {true: "Broccoli Cheese Bites", false: "Edimame Crostini With Pears"}, false: {true: "Pre-Made Soup", false: "Trader Joes Green Bean Chips"}}, false: {true: {true: "Bacon-Wrapped Little Smokies", false: "SNACK N: not seasonal, unhealthy, prep, cold"}, false: {true: "Tostitos Creamy Spinach Dip with Chips", false: "Chips"}},},};

// audio controls
var music = document.getElementById('music');

function playAudio() {
	if (music.paused) {
		music.play();
		pButton.className = "";
		pButton.className = "pause";
	} else {
		music.pause();
		pButton.className = "";
		pButton.className = "play";
	}
}

$(document).ready(function(){
   $("#start").click(start)
   $("#yes").click(function(){
      answer(true)
   })
   $("#no").click(function(){
      answer(false)
   })
   $("#results").click(function(){
      getResults();
   })
});


function start(){
   $("#loading").removeClass("hidden");
   $("#start").addClass("hidden");
   $("#yes").removeClass("hidden");
   $("#no").removeClass("hidden");
   answer();
}

function answer(ans){
   getQuestions();
	if(qNum>0){
	   saveAnswer(ans);
	}
}

function getQuestions(){
   $.get("questions.xml", function(data){
      var $q = $(data).find("q")
      $("#loading").addClass("hidden")
      if(qNum < $q.length){
         $("#question").html($q[qNum].firstChild.nodeValue)
      }
      else {
         $("#question").html("You've completed the quiz.<br>")
         $("#yes").addClass("hidden")
		 	$("#no").addClass("hidden")
         $("#start").addClass("hidden")
         $("#results").removeClass("hidden")
      }
      qNum += 1
   });
}

function saveAnswer(ans){
	console.log(answers);
   $.get("questions.xml", function(data){
      var $a = $(data).find("a")
      if (aNum < $a.length){
         $a[aNum].firstChild.nodeValue = ans
         answers = answers[ans]
			console.log(answers[ans])
      }
      aNum += 1
   });
}

function getResults(){
   //display answer
   $("#results").addClass("hidden");
   $("#details").removeClass("hidden");
	$("#question").html(answers);
}
