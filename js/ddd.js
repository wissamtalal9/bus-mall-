'use strict'

let imgArray = ['bag.jpg',
    'banana.jpg',
    'bathroom.jpg',
    'boots.jpg',
    'breakfast.jpg',
    'bubblegum.jpg',
    'chair.jpg',
    'cthulhu.jpg',
    'dog-duck.jpg',
    'dragon.jpg',
    'pen.jpg',
    'pet-sweep.jpg',
    'scissors.jpg',
    'shark.jpg',
    'sweep.png',
    'tauntaun.jpg',
    'unicorn.jpg',
    'water-can.jpg',
    'wine-glass.jpg']
let counter = 25;
let leftRandom = 0;
let middleRandom = 0;
let rightRandom = 0;
let previous=[];





const select = document.getElementById('select');
let leftImage = document.getElementById('left');
let middleImage = document.getElementById('middle');
let rightImage = document.getElementById('right');
const button = document.getElementById('button');
const main = document.getElementById('main');

function Mall(name, imageSrc, show, click) {
    this.name = name;
    this.imageSrc = imageSrc;
    this.show = 0;
    this.click = 0;
    Mall.all.push(this);
}

Mall.all = [];
for (let i = 0; i < imgArray.length; i++) {
    new Mall(imgArray[i].split('.')[0], imgArray[i]);
}
//console.log(Mall.all);

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function render() {
    leftRandom = random(0, (imgArray.length - 1));
    middleRandom = random(0, (imgArray.length - 1));
    rightRandom = random(0, (imgArray.length - 1));

    // prevent having same image on the same page
    do {leftRandom = random(0, (imgArray.length - 1));}
    while(leftRandom == rightRandom || leftRandom == middleRandom);

    do {rightRandom = random(0, (imgArray.length - 1));}
    while(rightRandom == leftRandom || rightRandom == middleRandom);

    do {middleRandom = random(0, (imgArray.length - 1));}
    while(middleRandom == rightRandom || middleRandom == leftRandom);

    leftImage.src = './img/' + Mall.all[leftRandom].imageSrc;
    middleImage.src = './img/' + Mall.all[middleRandom].imageSrc;
    rightImage.src = './img/' + Mall.all[rightRandom].imageSrc;


    Mall.all[leftRandom].show++;
    Mall.all[middleRandom].show++;
    Mall.all[rightRandom].show++;

    //console.log(Mall.all);
    //console.log(counter);
    

    previous.push(leftRandom, middleRandom, rightRandom);
    let p=[];
    
    console.log(counter);

    // prevent having the same images in two following pages
let current=[];
current.push(leftRandom, middleRandom, rightRandom);
console.log(current);


    if (counter<=24){
    p=[previous[(previous.length)-6], previous[(previous.length)-5], previous[(previous.length)-4]];

    // while ( current.includes( p[0] || p[1]|| p[2]) ){
    //     leftRandom = random(0, (imgArray.length - 1));
    //     middleRandom = random(0, (imgArray.length - 1));
    //     rightRandom = random(0, (imgArray.length - 1));    
    // }; 
}
    //if (previous.length
    //console.log(previous.length);
    //console.log(previous);
    console.log(p);




   
}

select.addEventListener('click', clickCounter);
function clickCounter(event) {
    if ((counter > 0) && (event.target.id === 'left' || event.target.id === 'middle' || event.target.id === 'right')) {
        render();
        counter--;
        //console.log(counter);
    }
    

    if (event.target.id === 'left') {
        Mall.all[leftRandom].click++;
    }
    else if (event.target.id === 'middle') {
        Mall.all[middleRandom].click++;
    }
    else if (event.target.id === 'right') {
        Mall.all[rightRandom].click++;
    }

    if ( counter == 0 ){
        createChart();
        select.removeEventListener('click', clickCounter)}

         

}

button.addEventListener('click', showResults);
function showResults(event2) {
    const ulElement = document.createElement('ul');
    main.appendChild(ulElement);


    for (let i = 0; i < imgArray.length; i++) {
        let liElement = document.createElement('li');
        liElement.textContent = Mall.all[i].name + ' was shown: ' + Mall.all[i].show + ' and was clicked: ' + Mall.all[i].click;
        ulElement.appendChild(liElement);
    }

   
}

render();

// create chart
function createChart() {
    let namesArr = [];
    let showArr = [];
    let clickArr = [];

    for (let i = 0; i < imgArray.length; i++) {
        namesArr.push(Mall.all[i].name);
        showArr.push(Mall.all[i].show);
        clickArr.push(Mall.all[i].click);

        //console.log(namesArr)
        //console.log(showArr)
        //console.log(clickArr)
    }

    let ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: namesArr,
            datasets: [{
                label: 'Showing Count',
                data: showArr,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
                order: 2
            }, {
                label: 'Clicking Count',
                data: clickArr,
                type: 'bar',
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 206, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(153, 102, 255)',
                    'rgb(255, 159, 64)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 206, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(153, 102, 255)',
                    'rgb(255, 159, 64)'
                ],
                borderWidth: 1,
                order: 1
            }],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}