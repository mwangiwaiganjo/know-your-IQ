//getting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box =  document.querySelector(" .quiz_box");
const timeCount = quiz_box.querySelector(".timer .timer_sec");
const timeoff = quiz_box.querySelector("header .time_text");


const option_list = document.querySelector(".option_list");

//if Start Questionare Button Clicked
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //show the Info box
}

//if Exit Button Clicked
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide the Info box
}

//if Continue Button Clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide the info box
    quiz_box.classList.add("activeQuiz"); //show the quiz 
    showQuestions(0);
    queCounter(1);
    startTimer(10);
}

let que_count = 0;
let que_numb = 1;
let counter;
let timeValue = 10;
let userScore = 0;

const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const quit_quiz = result_box.querySelector(".buttons .quit");


quit_quiz.onclick = ()=>{
    window.location.reload();
}

//if Next Button Clicked
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        startTimer(timeValue);
        next_btn.style.display = "none";
    }else{
        clearInterval(counter);
        startTimer(timeValue);
        console.log("questions completed");
        showResultBox();

    }
}

//getting questions and options from array
function showQuestions(index) {
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>'+ questions[index].numb + "."+ questions[index].question +'</span>';
    let option_tag = '<div class="option">'+ questions[index].options[0] + '<span></span></div>'
                     + '<div class="option">'+ questions[index].options[1] + '<span></span></div>'
                     + '<div class="option">'+ questions[index].options[2] + '<span></span></div>';

    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag; 
       
    const option = option_list.querySelectorAll(".option")
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
        
    }
}

function optionSelected(answer){
    clearInterval(counter);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let alloptions = option_list.children.length;
    if(userAns == correctAns){
        userScore += 1;
        console.log(userScore);
        answer.classList.add("correct");
        console.log("Answer is Correct");
    }else{
        answer.classList.add("incorrect");
        console.log("Answer is wrong");
        
    }

    //once user selected disabled all options
    for (let i = 0;  i < alloptions; i++) {
        option_list.children[i].classList.add("disabled"); 
    }
    next_btn.style.display = "block";
}
function showResultBox(){
    info_box.classList.remove("activeInfo"); //hide the Info box
    quiz_box.classList.remove("activeQuiz"); //hide the quiz box
    result_box.classList.add("activeResult"); //show the Result box
    const ScoreText = result_box.querySelector(".score_text");
    if (userScore > 3){
        let scoreTag =  '<span>and congrats!, You got <p>'+ userScore +'</p><p>out of</p><p>'+ questions.length +'</p></span>';
        ScoreText.innerHTML = scoreTag;
    }
   else if (userScore > 1){
        let scoreTag =  '<span>and nice!, You got <p>'+ userScore +'</p><p>out of</p><p>'+ questions.length +'</p></span>';
        ScoreText.innerHTML = scoreTag;
    }
    else{
        let scoreTag =  '<span>and sorry, You got only <p>'+ userScore +'</p><p>out of</p><p>'+ questions.length +'</p></span>';
        ScoreText.innerHTML = scoreTag;
    }
}
function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if (time< 9){
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if (time < 0){
            clearInterval(counter);
            timeCount.textContent = "00"; 
    
            let correctAns = questions[que_count].answer;
            let alloptions = option_list.children.length;
    
            for (let i = 0;  i < alloptions; i++) {
                option_list.children[i].classList.add("disabled"); 
            }
            next_btn.style.display = "block";
        }
    }
}




function queCounter(index){
    const buttom_ques_counter = quiz_box.querySelector(".total_que");
    let totalQuescounttag = '<span><p>'+ index +'</p><p>of</p><p>'+ questions.length +'</p><p>questions</p></span>';
    buttom_ques_counter.innerHTML = totalQuescounttag; 
} 