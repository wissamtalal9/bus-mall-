'use strict';
// The Lenght of the iage :
//************************************************************************* */
let imgArray = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg',
  '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.png',
  '11.jpg', '12.jpg', '13.png', '14.jpg', '15.jpg', '16.jfif',
  '17.jfif', '18.jfif', '19.jfif', '20.jpg', '21.jfif', '22.jfif', '23.jfif', '24.jfif']


const imageSection = document.getElementById('imageSection');

let first_image = document.getElementById('first_Image');
let second_image = document.getElementById('second_Image');
let third_image = document.getElementById('third_Image');

let first_image_random;
let second_image_random;
let third_image_random;

let counter = 0;
let number_of_round = 25;

// The Arrays

let name_array = [];
let show_array = [];
let click_array = [];
let all = [];
let images = [];

// The Random Number Fuction
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// The Rest function
function Rest(name, imageSrc) {
  this.name = name;
  this.image = imageSrc;
  this.click = 0;
  this.show = 0;
  Rest.all.push(this);
}
Rest.all = [];


// Return all images in the array
for (let i = 0; i < imgArray.length; i++) {
  new Rest(imgArray[i].split('.')[0], imgArray[i]);
}
//console.log(Rest.all);

// Render Function 
function render() {
  first_image_random = getRandomNumber(0, imgArray.length - 1);
  let second_image_random;
  let third_image_random;

  do {
    second_image_random = getRandomNumber(0, imgArray.length - 1);
    third_image_random = getRandomNumber(0, imgArray.length - 1);
  } while (first_image_random === second_image_random
  || first_image_random === third_image_random
    || third_image_random === second_image_random

  );

  first_image.src = './img/' + Rest.all[first_image_random].image;
  second_image.src = './img/' + Rest.all[second_image_random].image;
  third_image.src = './img/' + Rest.all[third_image_random].image;

  Rest.all[first_image_random].show++;
  Rest.all[second_image_random].show++;
  Rest.all[third_image_random].show++;

}
render();
console.log(Rest.all);

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);

}

imageSection.addEventListener('click', thehandlerImageClick);
function thehandlerImageClick(event) {
  if ((event.target.id === 'first_Image' || event.target.id === 'second_Image' || event.target.id === 'third_Image') && counter < number_of_round) {

    if (event.target.id = 'first_Image') {
      Rest.all[first_image_random].click++;
    }
    else if (event.target.id = 'second_Image') {
      Rest.all[second_image_random].click++;
    }
    else if (event.target.id = 'third_Image') {
      Rest.all[third_image_random].click++;
    }
    else {
      imageSection.removeEventListener('click', thehandlerImageClick);
    }
    render();
    counter++;
  }
  else if (counter >= number_of_round) {
    button.addEventListener('click', lisnhandler)
    function lisnhandler(e) {

      // call functions for chart result
      showResult();
    }
    button.addEventListener('click',resulthandler)
    function resulthandler() {
      chartResult();

    }

  }
}
function showResult() {

  let orderlist = document.createElement('ul');
  ol_result.appendChild(orderlist);

  for (let i = 0; i < imgArray.length; i++) {

    let list_item = document.createElement('li');
    list_item.textContent ='name '+Rest.all[i].name +' show '+Rest.all[i].show +' click '+ Rest.all[i].click;
    ol_result.appendChild(list_item);
  }
  console.log(Rest.all)
}

function chartResult() {
  for (let i = 0; i < Rest.all.length; i++) {
    name_array.push(Rest.all[i].name);
    show_array.push(Rest.all[i].show);
    click_array.push(Rest.all[i].click)

  }
  // console.log(name_array);

  let ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: name_array,
      datasets: [{
        label: '# Clicks',
        data: click_array,
        backgroundColor: 'rgba(153, 102, 255, 1)',

        borderColor: ['rgba(54, 162, 235, 1)'],
        borderWidth: 2
      },
      {
        label: '# Show',
        data: show_array,
        backgroundColor: 'rgba(255, 206, 86, 1)',
        borderColor: ['rgba(255, 206, 86, 1)'],
        borderWidth: 2
      }]
    },
    options: {
      scales: {
        yAxes: [{
          stacked: false,
          ticks: {
            min: 0,
            stepSize: 1,
          }
        }]
      }
    }
  });
}
