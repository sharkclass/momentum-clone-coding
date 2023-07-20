const date=new Date();

//padStart(number,char)는 string이 number보다 작을 때 '앞'을 char로 채움
const hours=String(date.getHours()).padStart(2,0);
const minutes=String(date.getMinutes()).padStart(2,0);
//const seconds=String(date.getSeconds()).padStart(2,0);

function getClock(){
    if(mainTitle.classList.contains("clock")){   
        mainTitle.innerText=(`${hours}:${minutes}`);
    }
    mainTitle.addEventListener("click",titleConverting);

}

function titleConverting(){
    if(mainTitle.classList.contains("clock")){
        mainTitle.classList.remove("clock");
        mainTitle.classList.add(TODOTITLE);
        mainTitle.innerText="To Do";

        toDoList.classList.remove(SUMMARIZED);
    } else{
        mainTitle.classList.remove(TODOTITLE);
        mainTitle.classList.add("clock");

        toDoList.classList.add(SUMMARIZED);

        getClock();
    }
}

getClock();
setInterval(getClock, 1000);