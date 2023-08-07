const loginForm=document.querySelector("#login-form");
const loginInput=document.querySelector("#login-form input");
const greeting=document.querySelector("#greeting");
const greetingUsername=document.querySelector("#greeting__username");

const HIDDEN_CLASSNAME="hidden";// upper case variable only uses as saving variable with only string
const USERNAME_KEY="username";

//greetings section이 지나고 다른 요소들이 등장하기 위해 정의된 변수들
const weatherContainer=document.querySelector("#weather-container")
//const quoteContainer=document.querySelector("#quote-container");

greetingUsername.innerText=localStorage.getItem(USERNAME_KEY);
greetingUsername.addEventListener("mouseover",userNameHover);
greetingUsername.addEventListener("mouseout",userNameHover);

function onLoginSubmit(event){
    event.preventDefault(); //preventDefault stops default behavior of browser and javascript gives event value to first argument of fuction for free when addEventListener activates.
    const username=loginInput.value;
    greetingUsername.innerText=username;
    localStorage.setItem(USERNAME_KEY,username); //browser에 값을 저장해 새로고침해도 값을 기억하도록 함. (key,value)형식으로 작성

    //fadeout animation
    loginForm.style.opacity=0;
    setTimeout(()=>{
        loginForm.classList.add(REMOVED);
        paintGreetings(username);
    }  
    ,1000);
    greetingUsername.addEventListener("mouseover",userNameHover);
    greetingUsername.addEventListener("mouseout",userNameHover);
}

//username의 button effect

function userNameHover(){
    const username=localStorage.getItem(USERNAME_KEY);
    if(greetingUsername.innerText==username){ 
        greetingUsername.style.width=`${greetingUsername.offsetWidth}px`;
        greetingUsername.innerText="Edit";
        greetingUsername.classList.add(BUTTONHOVERED);
    } else { 
        greetingUsername.innerText=username;
        greetingUsername.classList.remove(BUTTONHOVERED);
    }
}

function greetingMessage(){
    if(hours>=06&&hours<10){
        return `Good Morning, `;
    } else if(hours>=10&&hours<17){
        return `Have a nice day, `;
    } else if(hours>=17&&hours<24){
        return `Good evening, `;
    } else if(hours>=0&&hours<06){
        return `Keep it up! `;
    } else {
        return `Greeting, `;
    }
    //Good Morning, Have a nice day, Good Evening, Keep it up!
    //0600~1000, 1000~1700, 1700~2400, 2400~0600
}

//다른 요소들을 등장하게 하는 함수
function paintGreetings(){
    removeElement(loginForm);
    greeting.innerText=greetingMessage();

    //fadein animation
    showElement(greeting);
    showElement(mainContent);
    setTimeout(()=>{
        showElement(weatherContainer);
        showElement(toDoContainer);
        showElement(toDoList);
        //showElement(quoteContainer);
        showElement(mainTitle);
        showElement(toDoContainer);
    }  
    ,2000);  
}

const savedUsername=localStorage.getItem(USERNAME_KEY);

if(savedUsername==null){
    loginForm.classList.remove(REMOVED);//show the form
    loginForm.addEventListener("submit", onLoginSubmit);    
} else {
    paintGreetings(savedUsername);
}

function removeGreetings(){
    location.reload();
    localStorage.removeItem(USERNAME_KEY);
}

greetingUsername.addEventListener("click", removeGreetings);//greeting을 클릭하면 이름을 지우고 처음 화면으로 돌아가도록 함.