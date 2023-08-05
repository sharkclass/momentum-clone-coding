/*
const images=[
    "0.jpg",
    "1.jpg",
    "2.jpg",
    "3.jpg"
];

const randomImage=images[Math.floor(Math.random()*images.length)];//Math.floor()==내림
*/

//randomImage를 body의 background-image로 지정하는 방식
const body=document.querySelector("body");
body.style.backgroundImage=`url(img/pictures/spirited-away1.jpg)`;


//img element를 만드는 방식
//const bgImage=document.createElement("div");
//bgImage.src=`img/${randomImage}`;
//bgImage.id="bg-image";
//bgImage.style.backgroundImage=`url(img/pictures/${randomImage})`;
//document.body.appendChild(bgImage);