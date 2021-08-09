'use strict';

let imgArray = [
  'pablo-merchan-montes-MXovqM130UI-unsplash.jpg',
  'anna-pelzer-IGfIGP5ONV0-unsplash.jpg',
  'anna-tukhfatullina-food-photographer-stylist-Mzy-OjtCI70-unsplash.jpg',
  'brooke-lark-HlNcigvUi4Q-unsplash.jpg',
  'joseph-gonzalez-zcUgjyqEwe8-unsplash.jpg',
  'shayna-douglas-GvoVScughvI-unsplash.jpg',
  'brooke-lark-qdyBKWSzpSI-unsplash.jpg'
];

// Constructor
// New obj
// prototype render
// Random function
// get by id
// Event Handler

let all = [];
let counter = 0;
let numberOfRound = 10;

const imageSection = document.getElementById( 'imageSection' );
let leftImage = document.getElementById( 'leftImage' );
let rightImage = document.getElementById( 'rightImage' );

function Rest( name, imageSrc ) {
  this.name = name;
  this.image = imageSrc;
  this.shown = 0;
  Rest.all.push( this );
}

Rest.all = [];

for( let i = 0; i < imgArray.length; i++ ) {
  new Rest( imgArray[i].split( '.' )[0], imgArray[i] );
}

console.log( Rest.all );


function render() {
  let leftRandom = getRandomNumber( 0, imgArray.length - 1 );
  let rightRandom;

  do {
    rightRandom = getRandomNumber( 0, imgArray.length - 1 );
  } while( leftRandom === rightRandom );


  leftImage.src = './img/' + Rest.all[leftRandom].image;
  // leftImage.setAttribute('src', leftImage.src = './img/' + Rest.all[0].image);
  rightImage.src = './img/' + Rest.all[rightRandom].image;

  Rest.all[leftRandom].shown++;
  Rest.all[rightRandom].shown++;

  console.log( Rest.all );
}

render();

imageSection.addEventListener( 'click', clickHandler );
function clickHandler( e ) {
  if( ( e.target.id === 'leftImage' || e.target.id === 'rightImage' ) && counter < numberOfRound ) {
    render();
    counter++;
  } else {
    createChart();
  }

}

function getRandomNumber( min, max ) {
  return Math.floor( Math.random() * ( max - min + 1 ) + min );
}

// createChart();
function createChart() {

  let nameArr = [];
  let shownArr = [];

  for(let i = 0; i < Rest.all.length; i++) {
    nameArr.push(Rest.all[i].name);
    shownArr.push(Rest.all[i].shown);
  }

  let ctx = document.getElementById( 'myChart' ).getContext( '2d' );

  let myChart = new Chart( ctx, {
    type: 'bar',
    data: {
      labels: nameArr,
      datasets: [{
        label: '# shown',
        data: shownArr,
        backgroundColor:
                'rgba(255, 99, 132, 0.2)',

        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 2
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  } );
}