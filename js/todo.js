const toDoForm=document.querySelector("#todo-form");
const toDoInput=toDoForm.querySelector("input");
const toDoList=document.querySelector("#todo-list");    

const TODOS_KEY="todos";
const COMPLETED="completed"
const SORTABLE="sortable";

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
    li.classList.add("nonselectable");
    const span=document.createElement("span");
    span.innerText=newToDoObj.text;
    const button=document.createElement("button");
    button.innerText="X";
    button.addEventListener("click",deleteToDo);
    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
    span.addEventListener("click", completeToDo);

    if(newToDoObj.isCompleted){
        li.classList.add(COMPLETED);
    }
}

function handleToDoSubmit(event){
    event.preventDefault();
    const newToDo=toDoInput.value; 
    toDoInput.value="";
    const newToDoObj={
        text:newToDo,
        id:Date.now(),//생성당시 밀리초를 id로 저장함으로써 각각의 todo를 구분할 수 있
        isCompleted:false
    };
    toDos.push(newToDoObj);//toDos에 string 대신에 object를 저장함
    paintToDo(newToDoObj);
    saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos=localStorage.getItem(TODOS_KEY);

//새로고침했을 때 localstorage에 있는 todos를 그려줌
function showToDoFromLocalStorage(){
    const parsedToDos=JSON.parse(localStorage.getItem(TODOS_KEY));//string을 array로 바꾸어줌
    toDos=parsedToDos;
    parsedToDos.forEach(paintToDo);
}

if(savedToDos !=null){
    showToDoFromLocalStorage();
}


//todo를 complete했을 때 나타나는 기능을 위한 함수들

//complete한 함수를 doDos에서 찾기위해 id를 바탕으로 toDo의 순서를 찾는 함수
function elementFinderWithId(array,id){
    for (let step=0;step<array.length;step++){
        if(array[step].id==id){
            return step;
        }
    }
}

//todo를 complete했을 때 실행되는 main 함수
function completeToDo(event){
    const li=event.target.parentElement;
    const span=event.target;

    li.classList.toggle(COMPLETED);

    const orderOfToDo=elementFinderWithId(toDos,li.id);
    const toDo=toDos[orderOfToDo];

    toDo.isCompleted=!toDo.isCompleted;
    if(!toDo.isCompleted){
        let tmp=toDo;
        toDos.splice(orderOfToDo,1);
        toDos.unshift(tmp);
    }else{
        let tmp=toDo;
        toDos.splice(orderOfToDo,1);
        toDos.push(tmp);
    }

    localStorage.setItem(TODOS_KEY,JSON.stringify(toDos));
    toDoList.innerHTML="";
    showToDoFromLocalStorage();
}

//to do list의 드래그 기능
$(function(){
    $(".sortable").sortable();
});