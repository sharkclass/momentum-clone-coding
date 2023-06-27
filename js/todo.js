const toDoForm=document.querySelector("#todo-form");
const toDoInput=toDoForm.querySelector("input");
const toDoList=document.querySelector("#todo-list");    

const TODOS_KEY="todos";
const COMPLETED="completed"

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
    li.classList.add("nonselectable")
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
if(savedToDos !=null){
    const parsedToDos=JSON.parse(savedToDos);//string을 array로 바꾸어줌
    toDos=parsedToDos;
    parsedToDos.forEach(paintToDo);
}

function elementFinderWithId(array,id){
    for (let step=0;step<array.length;step++){
        if(array[step].id==id){
            return step;
        }
    }
}

function completeToDo(event){
    const li=event.target.parentElement;

    li.classList.toggle(COMPLETED);

    const orderOfToDo=elementFinderWithId(toDos,li.id);
    let toDoIsCompleted=toDos[orderOfToDo].isCompleted;

    if (toDoIsCompleted){
        toDoIsCompleted=false;
    }
    else{
        toDoIsCompleted=true;
    }
    toDos[orderOfToDo].isCompleted=toDoIsCompleted;
    localStorage.setItem(TODOS_KEY,JSON.stringify(toDos));
}