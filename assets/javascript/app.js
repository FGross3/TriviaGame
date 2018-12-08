$(document).ready(function() {
    var movieQuestion = [{
        question: "Which actor plays Mike Banning in the 2016 film 'London Has Fallen'?",
        choices: ["James McAvoy", "Gerard Butler", "Michael Fassbender", "Daniel Craig" ],
        images:  ["../images/Rajah.gif"],
        validAnswer: 1,
        correctAnswer: "Gerard Butler"
        }, {
        question:"Which 1980s movie was set in Hill Valley, California?",
        choices: ["The Goonies", "E.T.", "Back to the Future", "Jurassic Park"],
        validAnswer: 2,
        correctAnswer: "Back to the Future"
        },{
        question:"Which American state is the setting for 'Forrest Gump'?",
        choices: ["Mississippi", "Kentucky", "Alabama", "Florida"],
        validAnswer: 2,
        correctAnswer: "Alabama"
        },{
        question:"What role is played by Adam Driver in the 2015 file 'Star Wars: The Force Awakens'?",
        choices: ["Kylo Ren", "Finn", "Rey", "Poe Dameron"],
        validAnswer: 0,
        correctAnswer: "Kylo Ren"    
        },{
        question:"Who plays the title role in 'Edward Scissorhands'?",
        choices: ["River Phoenix", "Wesley Snipes", "Johnny Depp", "Sean Penn"],
        validAnswer: 2,
        correctAnswer: "Johnny Depp"     
        },{
        question:"Hans Gruber, played by Alan Rickman, is the villian in which movie?",
        choices: ["Lethal Weapon", "The Bourne Supremacy", "Die Hard", "The Terminator"],
        validAnswer: 2,
        correctAnswer: "Die Hard"  
        },{
        question:"Michael, Gertie and Elliott are the children in which movie?",
        choices: ["Mrs. Doubtfire", "Mr. Popper's Penguins", "E.T.", "The Goonies"],
        validAnswer: 2,
        correctAnswer: "E.T."  
        },{
        question:"What was the name of the Monty Python film that parodied the Bible story?",
        choices: ["Life of Brian", "Monty Python and the Holy Grail", "The Meaning of Life", "And Now for Something Different"],
        validAnswer: 1,
        correctAnswer: "Monty Python and the Holy Grail" 
        },{
        question:"Which scientist was portrayed by Eddie Redmayne in 'The Theory of Everything'?",
        choices: ["Albert Einstein", "Tim Berners-Lee", "Stephen Hawking", "Charles Darwin"],
        validAnswer: 2,
        correctAnswer: "Stephen Hawking"
        },{
        question:"What is the name of the fierce hybrid dinosaur in 'Jurassic World'?",
        choices: ["Indominus Rex", "Incredible Rex", "Invincible Rex", "Indigestible Rex"],
        validAnswer: 0,
        correctAnswer: "Indominus Rex"
    }];
    
    var correct = 0;
    var wrong = 0;
    var timeUp = 0;
    var timer = 10;
    var intervalId;
    var userGuess ="";
    var running = false;
    var qCount = 10;
    var pick;
    var index;
    var newArray = [];
    var holder = [];
    var q = 0;

    $(".startBtn").on("click", function () {
        $(".startBtn").hide();
		displayQuestion();
        runTimer();
    });

    function runTimer(){
	    if (!running) {
	    intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    };
    
    function decrement() {
	    $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer --;
        
        if (timer === -1) {
            stop();
            timeUp++;
            $(".question").html("<p>Time is up! The correct answer is: " + movieQuestion[q].correctAnswer);
            $(".btnContainer").empty();
            $("#timeleft").empty();
            q++;
            setTimeout(displayQuestion, 5000);
        }
    }
    
    function stop() {
	    running = false;
        clearInterval(intervalId);
        timer = 10;
    }

    function displayQuestion() {
        $(".question").html(movieQuestion[q].question);

        for (var i=0; i < movieQuestion[q].choices.length; i++){
            var newBtn = $("<button class='btn-choice'>")
            newBtn.html(movieQuestion[q].choices[i]);
            newBtn.attr("data-choice", i);
            $(".btnContainer").append(newBtn);
        }

        runTimer();

        $(".btn-choice").click(function(){
            userPick = $(this).data("choice");
            movieQuestion[q].validAnswer;
            console.log("clicked")
            if(userPick === movieQuestion[q].validAnswer) {
                stop();
                correct++;
                $(".question").html("<p>Correct!");
                $(".btnContainer").empty();
                $("#timeleft").empty();
                q++;
                setTimeout(quesCountCheck, 3000);
            } else {
                stop();
                wrong++;
                $(".question").html("<p>Wrong!");
                $(".btnContainer").empty();
                $("#timeleft").empty();
                q++;
                setTimeout(quesCountCheck, 3000);
            }
        });
    };
    
    function quesCountCheck(){
        if ((wrong + correct + timeUp) === qCount) {
            $(".question").empty();
            $(".question").html("<h3>Game Over!  Here's how you did: </h3>");
            $(".btnContainer").append("<h4> Correct: " + correct + "</h4>" );
            $(".btnContainer").append("<h4> Incorrect: " + wrong + "</h4>" );
            $(".btnContainer").append("<h4> Unanswered: " + timeUp + "</h4>" );
            // $("#reset").show();
            correct = 0;
            wrong = 0;
            timeUp = 0;
            } else {
                runTimer();
                displayQuestion();
            }
    }
    
});