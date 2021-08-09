'use strict';

let imgArray = [
  '1.jpg','2.jpg','3.jpg','4.jpg','5.jpg',
  '6.jpg','7.jpg','8.jpg','9.jpg','10.jpg',
  '11.jpg','12.jpg','13.jpg','14.jpg','15.jpg',
];

// Call Element from index.html
const imageSection = document.getElementById('imageSection');

const Stop_button = document.getElementById('stop_btn');
const divBtn = document.getElementById('btn_div');
const ul = document.getElementById('ul_result');

// let oneImage = document.getElementById('first_image');
// let twoImage = document.getElementById('second_image');
// let threeImage = document.getElementById('thirs_image');


let firstImage = 0;
let secondImage = 0;
let thirdImage = 0;
let all = [];
let counter = 25;
let numberOfRound = 10;
let arr = ['**Name of image**', '**Showing**', '**Clicked Numer**', '**Date Of Clicked**'];

  
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Concrtuctor for return info image prototype
function Rest(name, imageSrc) {
  this.name = name;
  this.image = imageSrc;
  this.show = 0;
  this.click = 0;
  this.tim = new Date();
  Rest.all.push(this);

}

Rest.all = [];

// Render Fnction 
function render() {
  
  do {
    firstImage = getRandomNumber(0, imgArray.length - 1);
    secondImage = getRandomNumber(0, imgArray.length - 1);
    thirdImage = getRandomNumber(0, imgArray.length - 1);

  } while (firstImage === secondImage || firstImage === thirdImage || secondImage === thirdImage
          || firstImage === first_image || firstImage === second_image ||  firstImage === third_image
          || secondImage === first_image || secondImage === second_image || secondImage === third_image

          || thirdImage === first_image || thirdImage === second_image || thirdImage === third_image
  );
          first_image = first;
          second_image = secondImage;
          third_image = thirdImage;

          counter++;

  leftImage.src = './img/' + Rest.all[leftRandom].image;
  // leftImage.setAttribute('src', leftImage.src = './img/' + Rest.all[0].image);
  MiddleImage.src = './img/' + Rest.all[MiddleImageRandom].image;
  rightImage.src = './img/' + Rest.all[rightRandom].image;


  Rest.all[leftRandom].show++;
  Rest.all[MiddleImageRandom].show++;
  Rest.all[rightRandom].show++;


}
for (let i = 0; i < imgArray.length; i++) {
  new Rest(imgArray[i].split('.')[0], imgArray[i]);

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

    

  }
}

// render();
// console.log(Rest.all);


