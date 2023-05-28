const images=[
    "0.jpg",
    "1.jpg",
    "2.jpg",
    "3.jpg"
];

const randomImage=images[Math.floor(Math.random()*images.length)];//Math.floor()==내림

const bgImage=document.createElement("img");

bgImage.src=`img/${randomImage}`;
bgImage.id="bg-image";

document.body.appendChild(bgImage);