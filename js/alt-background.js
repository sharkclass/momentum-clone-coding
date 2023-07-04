//다른 파일에서 ebb and flow를 구현하기 위해 미리 정의한 변수
const toDoList=document.querySelector("#todo-list");    
const toDoCompletedMessage=document.querySelector("#todo-completed-message");

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

//ebb and flow 변수 정의
const upperContainer=document.querySelector("#upper-container");
const downsideContainer=document.querySelector("#downside-container");

const HEIGHT_ONE_THIRD="height_one-third";
const HEIGHT_TWO_THIRD="height_two-third";


//ebb and flow 함수 정의
//ebb: 아래가 더 크게 함
function ebb(){
    upperContainer.classList.remove(HEIGHT_TWO_THIRD);
    downsideContainer.classList.remove(HEIGHT_ONE_THIRD);
    upperContainer.classList.add(HEIGHT_ONE_THIRD);
    downsideContainer.classList.add(HEIGHT_TWO_THIRD);
    toDoCompletedMessage.classList.add(REMOVED);
    toDoList.classList.remove(REMOVED);
}

//flow: 위가 더 크게 함
function flow(){
    upperContainer.classList.remove(HEIGHT_ONE_THIRD);
    downsideContainer.classList.remove(HEIGHT_TWO_THIRD);
    upperContainer.classList.add(HEIGHT_TWO_THIRD);
    downsideContainer.classList.add(HEIGHT_ONE_THIRD);
    isAllToDosCompleted();
}
