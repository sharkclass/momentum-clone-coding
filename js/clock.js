const mainContent=document.querySelector("#main-content");

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

function titleConverting(){
    if(mainContent.classList.contains(CLOCKSCREEN)){ //clock->todo
        mainContent.classList.remove(CLOCKSCREEN);
        mainContent.classList.add(TODOSCREEN);
        mainTitle.innerText="To Do";
        //greeting이랑 todo container 지우기
        removeElement(greeting);
        majorToDo.innerText="Write a To Do here";

        toDoList.classList.add(SORTABLE);
        
        //to do list의 드래그 기
        $(".sortable").sortable({
            axis:"y",
            stop: function (event,ui){
                refreshToDos(event,ui);
            }
        });
        toDoList.classList.remove(SUMMARIZED);
        submitOnlyMajorToDo();
    } else{ //todo->clock
        mainContent.classList.remove(TODOSCREEN);
        mainContent.classList.add(CLOCKSCREEN);
        showElement(greeting);
        majorToDo.innerText="What is your main goal?";

        toDoList.classList.remove(SORTABLE);
        toDoList.classList.add(SUMMARIZED);
        submitOnlyMajorToDo();

        mainTitle.innerText=(`${hours}:${minutes}`);
        getClock();
    }
    toDoFormSizeControl();
}

getClock();
setInterval(getClock, 1000);