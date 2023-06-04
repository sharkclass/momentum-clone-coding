const loginForm=document.querySelector("#login-form");
const loginInput=document.querySelector("#login-form input");
const greeting=document.querySelector("#greeting");

const HIDDEN_CLASSNAME="hidden";// upper case variable only uses as saving variable with only string
const USERNAME_KEY="username";

//ebb and flow 변수 정의
const upperContainer=document.querySelector("#upper-container");
const downsideContainer=document.querySelector("#downside-container");

const HEIGHT_ONE_THIRD="height_one-third";
const HEIGHT_TWO_THIRD="height_two-third";

function onLoginSubmit(event){
    event.preventDefault(); //preventDefault stops default behavior of browser and javascript gives event value to first argument of fuction for free when addEventListener activates.
    loginForm.classList.add(HIDDEN_CLASSNAME);
    const username=loginInput.value;
    localStorage.setItem(USERNAME_KEY,username); //browser에 값을 저장해 새로고침해도 값을 기억하도록 함. (key,value)형식으로 작성
    paintGreetings(username);
}

function paintGreetings(username){
    flow()
    greeting.classList
    greeting.innerText=`Hello ${username}`;//==("Hello " + username)-->`"string" ${variable}`
    greeting.classList.remove(HIDDEN_CLASSNAME);
}

const savedUsername=localStorage.getItem(USERNAME_KEY);

//ebb and flow 함수 정의
function ebb(){
    upperContainer.classList.remove(HEIGHT_TWO_THIRD);
    downsideContainer.classList.remove(HEIGHT_ONE_THIRD);
    upperContainer.classList.add(HEIGHT_ONE_THIRD);
    downsideContainer.classList.add(HEIGHT_TWO_THIRD);
}

function flow(){
    upperContainer.classList.remove(HEIGHT_ONE_THIRD);
    downsideContainer.classList.remove(HEIGHT_TWO_THIRD);
    upperContainer.classList.add(HEIGHT_TWO_THIRD);
    downsideContainer.classList.add(HEIGHT_ONE_THIRD);
}

if(savedUsername==null){
    ebb();
    loginForm.classList.remove(HIDDEN_CLASSNAME);//show the form
    loginForm.addEventListener("submit", onLoginSubmit);    
} else {
    flow();
    paintGreetings(savedUsername);
}