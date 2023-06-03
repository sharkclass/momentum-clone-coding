const clock = document.querySelector("h2#clock");

function getClock(){
    const date=new Date();
    
    //padStart(number,char)는 string이 number보다 작을 때 '앞'을 char로 채움
    const hours=String(date.getHours()).padStart(2,0);
    const minutes=String(date.getMinutes()).padStart(2,0);
    const seconds=String(date.getSeconds()).padStart(2,0);

    clock.innerText=(`${hours}:${minutes}`);
}

getClock();
setInterval(getClock, 1000);