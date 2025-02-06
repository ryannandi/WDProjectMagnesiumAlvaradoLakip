// team variables
/*let alpine = 0;
let astonMartin = 0;
let ferrari = 0;
let haas = 0;
let mcLaren = 0;
let mercedes = 0;
let rb = 0;
let redBull = 0;
let alpine = 0;*/

    var alpine = 0;
    var astonMartin = 0;
    var ferrari = 0;
    var haas = 0;
    var mcLaren = 0;
    var mercedes = 0;
    var rb = 0;
    var redBull = 0;
    var williams = 0;
    var sauber = 0;
    
    function alpineScore(){
      alpine++
      return alpine
    }
    
    function astonMartinScore(){
      astonMartin++
      return astonMartin
    }
    
    function ferrariScore(){
      ferrari++
      return ferrari
      console.log("imissyousainz")
    }
    
    function sauberScore(){
      sauber++
      return sauber
    }
    
    function sauberScore(){
      sauber++
      return sauber
    }
    
    function sauberScore(){
      sauber++
      return sauber
    }
    
    function sauberScore(){
      sauber++
      return sauber
    }
    
      function scoreQuiz() { // function executes when button is clicked
        // read all radio buttons and place them in answers as an array
        let answers = document.querySelectorAll("input[type=radio]");
        let totalScore = 0;
        for (i in answers) { // loops trough the answers array using index i
          // get the sum of the value of checked radio buttons
          if (answers[i].checked)
              if (Numberanswers[i].value == "mclaren"){
                   mclarenScore() 
                  }
              if (answers[i].value == "ferrari"){
                   ferrariScore() 
                  }
              if (answers[i].value == "red bull"){
                   redBullScore() 
                  }
              if (answers[i].value == "mercedes"){
                   mercedesScore() 
                  }
              if (answers[i].value == "aston martin"){
                   astonMartinScore() 
                  }
              if (answers[i].value == "alpine"){
                   alpineScore() 
                  }
              if (answers[i].value == "haas"){
                   haasScore() 
                  }
              if (answers[i].value == "rb"){
                   rbScore() 
                  }
              if (answers[i].value == "williams"){
                   williamsScore() 
                  }
              if (answers[i].value == "sauber"){
                   score.innerHTML = sauberScore() 
                  }
            
              if (sauber > alpine){
                score.innerHTML = "Your team is Sauber"
              }
        }
        // output the score on the browser
        
      }