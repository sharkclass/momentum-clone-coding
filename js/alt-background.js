//다른 파일에서 ebb and flow를 구현하기 위해 미리 정의한 변수
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
