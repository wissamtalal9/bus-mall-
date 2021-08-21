'use strict';
// The Lenght of the iage :
//************************************************************************* */
let imgArray = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg',
  '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.png',
  '11.jpg', '12.jpg', '13.png', '14.jpg', '15.jpg', '16.jfif',
  '17.jfif', '18.jfif', '19.jfif', '20.jpg', '21.jfif', '22.jfif', '23.jfif', '24.jfif']


const imageSection = document.getElementById('imageSection');
const ol_result = document.getElementById('ol_result');

const show_chart = document.getElementById('show_chart');
const show_result = document.getElementById('show_result');

let first_image = document.getElementById('first_Image');
let second_image = document.getElementById('second_Image');
let third_image = document.getElementById('third_Image');

let first_image_random;
let second_image_random;
let third_image_random;

let counter = 0;
let number_of_round = 25;

// The Arrays


let all = [];
let images = [];

// The Random Number Fuction
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// The Rest function
function Rest(name, imageSrc,show = 0,  click = 0 ) {
  this.name = name;
  this.image = imageSrc;
  this.show = show;
  this.click = click;

  Rest.all.push(this);
}
Rest.all = [];

getData()

// Render Function 
function render() {

  do {
    first_image_random = getRandomNumber(0, imgArray.length - 1);
    second_image_random = getRandomNumber(0, imgArray.length - 1);
    third_image_random = getRandomNumber(0, imgArray.length - 1);
  }

  while (first_image_random === second_image_random
  || first_image_random === third_image_random
  || third_image_random === second_image_random
  || images.includes(first_image_random)
  || images.includes(second_image_random)
  || images.includes(third_image_random)

  );
  images = [first_image_random, second_image_random, third_image_random];
  console.log(images)


  first_image.src = './img/' + Rest.all[first_image_random].image;
  second_image.src = './img/' + Rest.all[second_image_random].image;
  third_image.src = './img/' + Rest.all[third_image_random].image;

  Rest.all[first_image_random].show++;
  Rest.all[second_image_random].show++;
  Rest.all[third_image_random].show++;

  localStorage.data = JSON.stringify(Rest.all);
 // console.log(data);


}
Rest.prototype.getName = function() {
  console.log('test')
}

render();
console.log(Rest.all);
// console.log(images)

function getRandomNumber(min, max) {
  // If I wanted to use Includes in the render can I use this from generate random
  // let random;
  // let allow;

  // do {
  //   random = Math.floor(Math.random() * (max - min + 1) + min);
  //   allow = true;

  //   for (let i = 0; i < images.length; i++) {
  //     if (random === images[i]) {
  //       allow = false;
  //     }
  //   }
  // }
  //   while (allow)
  //   return random;
  return Math.floor(Math.random() * (max - min + 1) + min);

}

imageSection.addEventListener('click', thehandlerImageClick);
function thehandlerImageClick(event) {
  if ((event.target.id === 'first_Image' || event.target.id === 'second_Image' || event.target.id === 'third_Image') && counter < number_of_round) {

    if (event.target.id == 'first_Image') {
      Rest.all[first_image_random].click++;
    }
    else if (event.target.id == 'second_Image') {
      Rest.all[second_image_random].click++;
    }
    else if (event.target.id == 'third_Image') {
      Rest.all[third_image_random].click++;
    }
    else {
      imageSection.removeEventListener('click', thehandlerImageClick);
    }
    render();
    counter++;
    console.log(Rest.all);
  }
  else if (counter >= number_of_round) {
    // call functions for chart result
    myChart.addEventListener('click', letcall)
    function letcall() {
      showResult();

      chartResult();

    }
  }
}
// function selectbutton (){
//   if (show_chart.click){
//     showResult.removeEventListener('click',resulthandler);
//     show_result.hidden();
//     showResult.hidden();
//   }
//   else if (show_result.click){
//     show_chart.removeEventListener('click', lisnhandler)
//     show_chart.hidden();
//     chartResult.hidden();
//   }

// }

show_chart.addEventListener('click', showResult)
function showResult() {
  var br = document.createElement("br");
  const orderlist = document.createElement('ul');
  ol_result.appendChild(orderlist);
  let data = JSON.parse( localStorage.data );

  for( let i = 0; i < data.length; i++ ) {
    let list_item = document.createElement('li');

     list_item.textContent = ('The name: '+ data[i].name +' show: '+ data[i].show +'click: '+ data[i].click );
     orderlist.appendChild(list_item);
    }
 
 
 
  // for (let i = 0; i < Rest.all.length; i++) {

  //   let list_item = document.createElement('li');
  //   list_item.textContent = 'name ' + data.name+ ' show ' + Rest.all[i].show + ' click ' + Rest.all[i].click +br+br;
  //   orderlist.appendChild(list_item);
  // }
 // console.log(Rest.all)
  show_chart.removeEventListener('click', showResult);
}


show_result.addEventListener('click', chartResult)
function chartResult() {

  let name_array = [];
  let show_array = [];
  let click_array = [];

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
        label: '#Clicks',
        data: click_array,
        backgroundColor: 'rgba(153, 102, 255, 1)',

        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2
      },
      {
        label: '#Show',
        data: show_array,
        backgroundColor: 'rgba(255, 206, 86, 1)',
        borderColor: 'rgba(255, 206, 86, 1)',
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
  show_result.removeEventListener('click', chartResult)
}



//JSON Storage All value from linral object to conctructor object

function getData() {
  if( localStorage.data ) {
    let data = JSON.parse( localStorage.data );
    for( let i = 0; i < data.length; i++ ) {
      new Rest( data[i].name, data[i].image, data[i].shown, data[i].click );
    }
  } else {
    for( let i = 0; i < imgArray.length; i++ ) {
      new Rest( imgArray[i].split( '.' )[0], imgArray[i] );
    }
  }
}
console.log(localStorage.data);


// let obj = {
//   name: 'ahmed',
//   age: 25
// }

// // console.log(typeof JSON.stringify(obj))
// // console.log(typeof obj)

// localStorage.setItem('ClassCode', '201d34')
// localStorage.data = JSON.stringify(obj)
// localStorage.data1 = 'Emad'

// // console.log(['Ahmed', 'Amer', 'Abrar', 'Abdullah'])
// // console.log(localStorage.data)

// // let newObj = localStorage.getItem('data')
// let newObj = localStorage.data;
// let convertedObj = JSON.parse(newObj)
// console.log(convertedObj.name);