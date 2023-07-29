const mainContent=document.querySelector("#main-content");
const greetingMessages=document.querySelector("#greeting-messages");

const CLOCKSCREEN="clock-screen";

const date=new Date();

//padStart(number,char)는 string이 number보다 작을 때 '앞'을 char로 채움
const hours=String(date.getHours()).padStart(2,0);
const minutes=String(date.getMinutes()).padStart(2,0);
//const seconds=String(date.getSeconds()).padStart(2,0);

function getClock(){
    if(mainContent.classList.contains(CLOCKSCREEN)){   
        mainTitle.innerText=(`${hours}:${minutes}`);
    }
    mainTitle.addEventListener("click",titleConverting);

}

//title의 button effect

mainTitle.addEventListener("mouseover",titleConvertShowing);
mainTitle.addEventListener("mouseout",titleConvertDisappering);

function titleConvertShowing(){
    if(mainContent.classList.contains(CLOCKSCREEN)){ //clock-screen
        mainTitle.innerText="To Do";
        clearInterval(clockInterval);
        mainTitle.classList.add(BUTTONHOVERED);
    } else if(mainContent.classList.contains(TODOSCREEN)) { //todo-screen
        mainTitle.innerText=(`${hours}:${minutes}`);
        mainTitle.classList.add(BUTTONHOVERED);
    }
}

function titleConvertDisappering(){
    if(mainContent.classList.contains(CLOCKSCREEN)){ //clock-screen
        getClock();
        clockInterval=setInterval(getClock, 1000);
        mainTitle.classList.remove(BUTTONHOVERED);
    } else if(mainContent.classList.contains(TODOSCREEN)) { //todo-screen
        mainTitle.innerText="To Do";
        mainTitle.classList.remove(BUTTONHOVERED);
    }
}

//title converting
function titleConverting(){
    if(mainContent.classList.contains(CLOCKSCREEN)){ //clock->todo
        mainContent.classList.remove(CLOCKSCREEN);
        mainContent.classList.add(TODOSCREEN);

        mainTitle.innerText="To Do";
        //greeting이랑 todo container 지우기
        removeElement(greetingMessages);
        majorToDo.innerText="Write a To Do here";

        toDoList.classList.remove(SUMMARIZED);
        submitOnlyMajorToDo();
    } else{ //todo->clock
        mainContent.classList.remove(TODOSCREEN);
        mainContent.classList.add(CLOCKSCREEN);

        showElement(greetingMessages);
        majorToDo.innerText="What is your main goal?";

        toDoList.classList.add(SUMMARIZED);
        submitOnlyMajorToDo();

        mainTitle.innerText=(`${hours}:${minutes}`);
        getClock();
    }
    toDoFormSizeControl();
}

getClock();
let clockInterval=setInterval(getClock, 1000);