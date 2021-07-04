$(document).ready(function(){
    var quizData ;
    $.get("https://5d76bf96515d1a0014085cf9.mockapi.io/quiz", function(response){
        quizData = response;
        for(var i=0; i<response.length; i++){
            questionWithOption(response[i]);
        }  
        
    });

    function questionWithOption(data){
        /* <div class="questions">
                    <h3>Q<span>1. </span><span>Which was one of Voldemort's Horcruxes?</span></h3>
                    <div class="option-section">
                        <div class="question-option">
                            <label>
                                <input type="radio" name="questionoption1" id="" value="1"> optionA
                            </label>
                            <i class="adjust-icon fas fa-check"></i>
                        </div>
                    </div>
                    <div class="yellow-line"></div>
                 </div> */
            var questions = $("<div>").addClass("questions");
            var questionPlusNumber = "Q."+ data.id +" "+data.question;
            var questionHeading = $("<h3>").html(questionPlusNumber); 
            var optionSection = $("<div>").addClass("option-section");
            var divideLine = $("<div>").addClass("yellow-line");
            questions.append(questionHeading, optionSection, divideLine); 
            for(var i=0; i<data.options.length; i++){
                var questionOption = $("<div>").addClass("question-option");
                optionSection.append(questionOption);
                var optionLabel = $("<label>");
                var inputRatio = $("<input>").addClass("input-radio-btn").attr("type","radio").attr("name","q"+ data.id).attr("value", (i+1));
                var optionLabelText = $("<span>").html(data.options[i]);
                var iconAnswer = $("<i>").addClass("adjust-icon fas ").attr("id", 'icon'+data.id + (i+1));
                optionLabel.append(inputRatio , optionLabelText);
                questionOption.append(optionLabel, iconAnswer);
            }
            $("#question-form").append(questions);
    }
    $("#question-from").submit(function(e){
        e.preventDefault();
        var answer = {};
        var radioButtons = $(".input-radio-btn");
        for( var i=0; i<radioButtons.length; i++ ){
            if(radioButtons[i].checked){
                answer[radioButtons[i].name] = Number(radioButtons[i].value);
            }
            // else{
            //     answer[radioButtons[i].name] = 0 ;
            // }
        }
        var score = 0;
        for(var j=0; j<quizData.length; j++){
            var key = "q" + quizData[j].id;
            if(answer[key] === quizData[j].answer){
                var iconid = "#"+"icon"+ quizData[j].id + answer[key];
                console.log(iconid);
                score++ ;
                $(iconid).addClass("fa-check right-icon");
            }else{
                var iconid = "#"+"icon"+ quizData[j].id + answer[key];
                var correctIconId = "#"+"icon"+ quizData[j].id + quizData[j].answer;
                $(correctIconId).addClass("fa-check right-icon");
                $(iconid).addClass("fa-times wrong-icon");
            }
        }
        $("#score").html(score);
        $(".input-radio-btn").attr("disabled", "true");
        $(window).scrollTop(screenTop);
    });

});