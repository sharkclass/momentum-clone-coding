const toDoForm=document.querySelector("#todo-form");
const toDoInput=toDoForm.querySelector("input");
const toDoList=document.querySelector("#todo-list");    

const TODOS_KEY="todos";

let toDos=[];

function saveToDos(){
    localStorage.setItem(TODOS_KEY,JSON.stringify(toDos));
}

function deleteToDo(event){
    const li = event.target.parentElement;//event("click")의 target에 들어가 parentElement를 찾고 remove()함수를 실행시켜 리스트를 제거함
    li.remove();
    toDos=toDos.filter((toDo) => toDo.id !== parseInt(li.id));//toDos에서 button을 누른 li의 id와 같은 id를 가지고 있는 object를 찾아 제거함
    saveToDos();
}

function paintToDo(newToDoObj){
    const li =document.createElement("li");
    li.id=newToDoObj.id;
    const span=document.createElement("span");
    span.innerText=newToDoObj.text;
    const button=document.createElement("button");
    button.innerText="X";
    button.addEventListener("click",deleteToDo);
    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
    span.addEventListener("click", completeToDo);
}

function handleToDoSubmit(event){
    event.preventDefault();
    const newToDo=toDoInput.value; 
    toDoInput.value="";
    const newToDoObj={
        text:newToDo,
        id:Date.now()//생성당시 밀리초를 id로 저장함으로써 각각의 todo를 구분할 수 있
    };
    toDos.push(newToDoObj);//toDos에 string 대신에 object를 저장함
    paintToDo(newToDoObj);
    saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

function sayHello(item){ //item은 forEach()가 argument로 보내주는 값으로 array의 각 item임
    console.log("this is the turn of", item);
}

const savedToDos=localStorage.getItem(TODOS_KEY);

if(savedToDos !=null){
    const parsedToDos=JSON.parse(savedToDos);//string을 array로 바꾸어줌
    toDos=parsedToDos;
    parsedToDos.forEach(paintToDo);
}

function completeToDo(event){
    const span=event.target;
    span.classList.toggle("completed");

    console.log("hi");
}