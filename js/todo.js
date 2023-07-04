const toDoForm=document.querySelector("#todo-form");
const toDoInput=toDoForm.querySelector("input");

const TODOS_KEY="todos";
const COMPLETED="completed"
const SORTABLE="sortable";
const REMOVED="removed";
const SUMMARIZED="summarized";

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

//todo를 드래그하고 놓았을 때 html데이터를 localstorage에 저장하기 위해 html의 todolist를 js의 toDos에 저장하는 함수
function refreshToDos(event,ui){
    const li = ui.item[0];
    //움직인 todo가 원래 m 번째 array인지 toDos에서 알아내기-findIndex
    const movedFrom=toDos.findIndex((toDo)=>toDo.id == parseInt(li.id));
    //움직인 todo가 n 번째 child로 이동했는지 todo-list에서 알아내기
    //Array.from을 통해 ul.children을 호출해 유사 배열을 부르고, 거기서 indexOf를 이용해 li의 순서를 구함.
    const movedTo=Array.from(li.parentNode.children).indexOf(li);
    console.dir(li.parentElement)
    console.dir(li);
    //이동한 toDo movedFrom 변수로 구하기
    const toDo=toDos[movedFrom];
    //toDos에서 m 번째에 움직인 todo 제거하기
    toDos.splice(movedFrom,1);
    //toDos에서 n 번째에 움직인 todo 추가하기
    toDos.splice(movedTo,0,toDo);
    saveToDos();
}

function paintToDo(newToDoObj){
    const li =document.createElement("li");
    li.id=newToDoObj.id;
    li.classList.add("nonselectable","todo");
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

//toDos에서 id를 바탕으로 toDo의 순서를 찾는 함수
function elementFinderWithId(array,id){
    for (let step=0;step<array.length;step++){
        if(array[step].id==id){
            return step;
        }
    }
}

//todo를 complete했을 때 실행되는 main 함수

isAllToDosCompleted();

function completeToDo(event){
    
    const li=event.target.parentElement;

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
    isAllToDosCompleted();
}

//to do list의 드래그 기능
$(".sortable").sortable({
    axis:"y",
    stop: function (event,ui){
        refreshToDos(event,ui);
    }
});

