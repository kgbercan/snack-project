qNum = 0;

$(document).ready(function(){
   $("#start").click(start)
   $("#yes").click(function(){
      answer(true)
   })
   $("#no").click(function(){
      answer(false)
   })
});

function start(){
   $("#loading").removeClass("hidden");
   $("#start").addClass("hidden");
   $("#yes").removeClass("hidden");
   $("#no").removeClass("hidden");
   getQuestions();
}

function getQuestions(){
   $.get("questions.xml", function(data){
      console.log("getting questions");
      var $q = $(data).find("q")
      console.log("finding q: " + $q);
      $("#loading").addClass("hidden")
      console.log("qNum: " + qNum);
      console.log("q length: " + $q.length);
      if(qNum < $q.length){
         console.log("in the if");
         $("#question").html($q[qNum].firstChild.nodeValue)
         console.log($q[qNum].firstChild.nodeValue);
      }
      else {
         $("#question").html("You've completed the quiz.")
      }
      qNum += 1
   });
}

function answer(ans){
   console.log(ans);
}
