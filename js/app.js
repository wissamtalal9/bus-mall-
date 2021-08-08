'use strict';

let imgArray = [
  '1.jpg',
  '2.jpg',
  '3.jpg',
  '4.jpg',
  '5.jpg',

  '6.jpg',
  '7.jpg',
  '8.jpg',
  '9.jpg',
  '10.jpg',

  '11.jpg',
  '12.jpg',
  '13.jpg',
  '14.jpg',
  '15.jpg',
];

// Constructor
// New obj
// prototype render
// Random function
// get by id
// Event Handler

let all = [];
let counter = 25;
let numberOfRound = 10;
let arr = ['**Name of image**', '**Showing**', '**Clicked Numer**', '**Date Of Clicked**'];



const imageSection = document.getElementById('imageSection');
let leftImage = document.getElementById('leftImage');
let MiddleImage = document.getElementById('MiddleImag');
let rightImage = document.getElementById('rightImage');
const buttonshow = document.getElementById('btnresult');
const divBtn = document.getElementById('divBtn');
  

function Rest(name, imageSrc, show, click, tim) {
  this.name = name;
  this.image = imageSrc;
  this.show = 0;
  this.click = 0;
  this.tim = new Date();
  Rest.all.push(this);

}

Rest.all = [];


for (let i = 0; i < imgArray.length; i++) {
  new Rest(imgArray[i].split('.')[0], imgArray[i]);

}
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


function render() {

  let leftRandom = getRandomNumber(0, imgArray.length - 1);
  let MiddleImageRandom = getRandomNumber(0, imgArray.length - 1);
  let rightRandom = getRandomNumber(0, imgArray.length - 1);


  leftImage.src = './img/' + Rest.all[leftRandom].image;
  // leftImage.setAttribute('src', leftImage.src = './img/' + Rest.all[0].image);
  MiddleImage.src = './img/' + Rest.all[MiddleImageRandom].image;
  rightImage.src = './img/' + Rest.all[rightRandom].image;


  Rest.all[leftRandom].show++;
  Rest.all[MiddleImageRandom].show++;
  Rest.all[rightRandom].show++;


}

buttonshow.addEventListener('click', btnhandler);
function btnhandler(e) {

  let ul_Element = document.createElement('ul');
  divBtn.appendChild(ul_Element);

  for (let i = 0; i < imgArray.length; i++) {
    let li_list = document.createElement('li');
    li_list.textContent = arr[0] + imgArray[i] +arr[1]+Rest.all[i].show +arr[2]+ Rest.all[i].click+arr[3]+Rest.all[i].tim;
    ul_Element.appendChild(li_list);
  }

}

imageSection.addEventListener('click', clickHandler);
function clickHandler(e) {
  if ((e.target.id === 'leftImage' || e.target.id === 'rightImage' || e.target.id === 'MiddleImag') && counter > 0) {
    render();
    counter--;
    //let dates = new Date;
    //  console.log(dates);

  }
}

render();
// console.log(Rest.all);


