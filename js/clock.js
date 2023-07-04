const clockAndToDo = document.querySelector("#clock_and_todo");
const clock=document.querySelector("#clock");
const toDoTitle=document.querySelector("#todo_title");

function getClock(){
    const date=new Date();
    
    //padStart(number,char)는 string이 number보다 작을 때 '앞'을 char로 채움
    const hours=String(date.getHours()).padStart(2,0);
    const minutes=String(date.getMinutes()).padStart(2,0);
    //const seconds=String(date.getSeconds()).padStart(2,0);

    clock.innerText=(`${hours}:${minutes}`);
    clock.addEventListener("click",convertToToDoLsit);
    toDoTitle.addEventListener("click",convertToClock);
}

function convertToToDoLsit(){
    clock.classList.add(REMOVED);
    toDoForm.classList.remove(REMOVED);
    toDoList.classList.remove(SUMMARIZED);
    ebb();
}

function convertToClock(){
    clock.classList.remove(REMOVED);
    toDoForm.classList.add(REMOVED);
    toDoList.classList.add(SUMMARIZED);
    flow();
}

getClock();
setInterval(getClock, 1000);