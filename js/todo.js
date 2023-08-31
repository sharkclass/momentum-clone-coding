const toDoForm=document.querySelector("#todo-form");
const toDoInput=toDoForm.querySelector("input");
const mainTitle=document.querySelector("#main-title");
const toDoList=document.querySelector("#todo-list");   
const toDoContainer=document.querySelector("#todo-container"); 
const majorToDo=document.querySelector("#major-todo");
const virtualSpan=document.querySelector("#virtual-span");

//const toDoCompletedMessage=document.querySelector("#todo-completed-message");

const TODOS_KEY="todos";
const COMPLETED="completed"
const SORTABLE="sortable";
const REMOVED="removed";
const SUMMARIZED="summarized";
const TODOSCREEN="todo-screen";
const BUTTONHOVERED="button--hovered";
const TRASHCANHOVER="trash-can--hovered";
const TRASHCANNOTHOVER="trash-can--not-hovered";
const SORTTING="sortting";

let toDos=[];

//animate test-good!!!

function saveToDos(){
    localStorage.setItem(TODOS_KEY,JSON.stringify(toDos));
    submitOnlyMajorToDo();
}

function deleteToDo(event){
    const li = event.target.parentElement;//event("click")의 target에 들어가 parentElement를 찾고 remove()함수를 실행시켜 리스트를 제거함
    li.animate([
        {transform:"scale(1)"},
        {transform:"scale(0)"}
    ],300)
    setTimeout(()=>{
        li.remove();
    toDos=toDos.filter((toDo) => toDo.id !== parseInt(li.id));//toDos에서 button을 누른 li의 id와 같은 id를 가지고 있는 object를 찾아 제거함
    saveToDos();
    toDoFormSizeControl(); 
    },300)
}

//todo를 드래그하고 놓았을 때 html데이터를 localstorage에 저장하기 위해 html의 todolist를 js의 toDos에 저장하는 함수
function refreshToDos(event,ui){
    const li = ui.item[0];
    console.log(li);
    //움직인 todo가 원래 m 번째 array인지 toDos에서 알아내기-findIndex
    const movedFrom=toDos.findIndex((toDo)=>toDo.id == parseInt(li.id));
    //움직인 todo가 n 번째 child로 이동했는지 todo-list에서 알아내기
    //Array.from을 통해 ul.children을 호출해 유사 배열을 부르고, 거기서 indexOf를 이용해 li의 순서를 구함.
    const movedTo=Array.from(li.parentNode.children).indexOf(li);
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
    li.classList.add("nonselectable","todo","flex","button");
    const span=document.createElement("span");
    span.innerText=newToDoObj.text;
    span.classList.add("flex");
    const button=document.createElement("i");
    button.classList.add("fa-solid","fa-trash","trash-can--not-hovered")
    button.addEventListener("click",deleteToDo);
    button.addEventListener("mouseover",trashCanHover);
    button.addEventListener("mouseout",trashCanHover);
    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
    span.addEventListener("click", completeToDo);
    span.addEventListener("mouseover",todoListMouseOver);
    span.addEventListener("mouseout",todoListMouseOut);

    if(newToDoObj.isCompleted){
        li.classList.add(COMPLETED);
    }
}

document.querySelectorAll("#todo-list span").forEach(element => {
    element.addEventListener("mouseover",todoListMouseOver);
    element.addEventListener("mouseout",todoListMouseOut);
});


//todo list의 button effect

function isLiCompleted(li){
    console.log(`completed:${toDos[elementFinderWithId(toDos,li.id)].isCompleted}`);
    return toDos[elementFinderWithId(toDos,li.id)].isCompleted;
}

function todoListMouseOver(event){
    const span=event.target;
    const li=span.parentElement;
    const id=li.id;
    isLiCompleted(li);
        if(!isLiCompleted(li)){ //mouseover when not completed
            span.style.width=`${span.offsetWidth}px`;
            tmpInnerText=span.innerText;
            span.innerText="Complete";
            span.classList.add(BUTTONHOVERED);
        } else{//mouseover when completed
            span.classList.add(BUTTONHOVERED);
            li.classList.remove(COMPLETED);
        }
    
}

function todoListMouseOut(event){
    const span=event.target;
    const li=span.parentElement;
    const id=li.id;
    if(!isLiCompleted(li)){ //mouseout when not completed
        span.innerText=toDos[elementFinderWithId(toDos,id)].text;
        span.classList.remove(BUTTONHOVERED);
    }
    else{//mouseout when completed
        span.classList.remove(BUTTONHOVERED);
        li.classList.add(COMPLETED);
    }
}

//trash can의 button effect

function trashCanHover(event){
    const button=event.target;
    if(button.classList.contains(TRASHCANHOVER)){
        button.classList.add(TRASHCANNOTHOVER);
        button.classList.remove(TRASHCANHOVER);
    } else{
        button.classList.remove(TRASHCANNOTHOVER);
        button.classList.add(TRASHCANHOVER);
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
    submitOnlyMajorToDo();
}

//summarized screen에서는 main goal 하나만 입력하고 나머지는 todo list에서 입력하게 함.

function submitOnlyMajorToDo(){
    if(toDoList.classList.contains(SUMMARIZED)){
        if(localStorage.getItem(TODOS_KEY).length!=2){
            removeElement(toDoInput);
            majorToDo.innerText="Main Goal"
        }else{
            showElement(toDoInput);
            majorToDo.innerText="What is your main goal"
        }
    }else{
        showElement(toDoInput);
    }
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
}else{
    localStorage.setItem(TODOS_KEY,"[]");
}
submitOnlyMajorToDo();

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

/*
//모든 todo가 완료되었을 때 completed!가 뜨게 하는 함수
function isAllToDosCompleted(){
    if(toDoList.classList.contains(SUMMARIZED)){
        let completedCount=0;
        for(step=0;step<toDos.length;step++){
            if(!toDos[step].isCompleted){
                toDoCompletedMessage.classList.add(REMOVED);
                toDoList.classList.remove(REMOVED);
                break;
            } else{
                completedCount++;
            }
            if(completedCount==toDos.length){
                toDoCompletedMessage.classList.remove(REMOVED);
                toDoList.classList.add(REMOVED);
            }
        }
    }
}
*/

//isAllToDosCompleted();
var tmpInnerText;

function completeToDo(event){
    
    const li=event.target.parentElement;
    const span=event.target;

    li.classList.toggle(COMPLETED);

    const orderOfToDo=elementFinderWithId(toDos,li.id);
    const toDo=toDos[orderOfToDo];

    if(!toDo.isCompleted){
        span.innerText="Completed!";
    }
    setTimeout(()=>{
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

        //complete된 todo가 맨 아래로 내려가는 애니메이션 만들기 (jquery 이용)

        toDoList.innerHTML="";
        showToDoFromLocalStorage();
        //isAllToDosCompleted();
    },500)
    
}

//to do list의 드래그 기능
var startIndex, changeIndex, uiHeight;

$(".sortable").sortable({
    axis:"y",
    stop: function (event,ui){
        refreshToDos(event,ui);
    },

    // 항목을 드래그할 때 다른 항목들이 부드럽게 움직이게 함.
    'placeholder': 'marker',
    start: function(e, ui) {
        startIndex = ui.placeholder.index();
        uiHeight = ui.item.outerHeight(true);//get offset incl margin

        ui.item.nextAll('li:not(.marker)').css({
            transform: 'translateY(' +uiHeight+ 'px)'
        });

        ui.item[0].firstChild.innerText=toDos[elementFinderWithId(toDos,ui.item[0].id)].text
        //ui.item[0].css("background-color","black");

        ui.item.css("backdrop-filter", 'blur(10px)',);
        ui.item.css("box-shadow", '2px 7px 15px 8px rgba(0,0,0,0.3)',);

        ui.placeholder.css({
            height: 0,
            padding: 0
        });
    },
    change: function(e, ui) {

        changeIndex = ui.placeholder.index();


        if (startIndex > changeIndex) {

            var slice = $('ul li').slice(changeIndex, $('ul li').length);

            slice.not('.ui-sortable-helper').each(function() {
                var item = $(this);
                item.css({
                    transform: 'translateY(' +uiHeight+ 'px)'
                });
            });

        } else if (startIndex < changeIndex) {

            var slice = $('ul li').slice(startIndex, changeIndex);

            slice.not('.ui-sortable-helper').each(function() {
                var item = $(this);
                item.css({
                    transform: 'translateY(0px)',
                    
                });
            });
        }

        startIndex = changeIndex
    },
    stop: function(e, ui) {
        $('.todo').css({
            transform: 'translate(0)',
        });
        ui.item.css("backdrop-filter", '',);
        ui.item.css("box-shadow", '',);
    }
});

//input의 사이즈가 입력한 글자에 맞춰 자동으로 늘어나게 하는 함수

toDoFormSizeControl();
toDoInput.addEventListener("keydown",toDoFormSizeControl);
toDoInput.addEventListener("keyup",toDoFormSizeControl);

function toDoFormSizeControl(){
        showElement(virtualSpan);
        virtualSpan.innerText=toDoInput.value;
        toDoInput.style.width=`${virtualSpan.clientWidth}px`;
        removeElement(virtualSpan);
}


