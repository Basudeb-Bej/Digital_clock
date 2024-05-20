function clock(){
  const hour = document.getElementById('per-hour');
  const minute = document.getElementById('per-minute');
  const second = document.getElementById('per-second');
  const ampm = document.getElementById('ampm');
  
  const calendar = document.querySelector('.date');
  const day = document.querySelector('.day')
  const date = new Date();


let dd = date.getDate();
let mm = date.getMonth();
let yy = date.getFullYear();
  let month = ["January", "February", "March", "April", "May", "June", "July","August", "September", "October", "November", "December"];
  let today = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  calendar.innerHTML = 'Date: ' + dd + ' / ' + month[mm] + ' / ' + yy;
  day.innerHTML = 'Day : ' + today[date.getDay()];
 
  let h = new Date().getHours();
     if(h === 00){
       h = 12;
     }
  let m = new Date().getMinutes();
  let s = new Date().getSeconds();
  let am = 'AM'
     if(h > 12){
       h = h - 12;
       am = 'PM';
     }
    
  hour.innerHTML = h < 10 ? '0' + h : h;
  minute.innerHTML = m < 10 ? '0' + m : m;
  second.innerHTML = s < 10 ? '0' + s : s;
  ampm.innerHTML = am;
}
clock();
var interval = setInterval(clock, 1000);



const handHour = document.querySelector('.hour');
const handMin = document.querySelector('.min');
const handSec = document.querySelector('.sec');

setInterval(loop);

function loop() {
  const date = new Date();
  let hs = date.getSeconds() * 6;
  let hm = date.getMinutes() * 6;
  let hh = date.getHours() * 30;
  handSec.style.transform = `rotateZ(${hs}deg)`;
  handMin.style.transform = `rotateZ(${hm + hs / 60}deg)`;
  handHour.style.transform = `rotateZ(${hh + hm / 12}deg)`;

  let ds = date.getSeconds();
  let dm = date.getMinutes();
  let dh = date.getHours();

  let ap;
  if (dh < 12) {
    ap = 'AM';
  } else {
    ap = 'PM';
  }
  if (dh === 0) {
    dh = 12;
  }
  if (dh > 12) {
    dh -= 12;
  }
  if (ds < 10) {
    ds = '0' + ds;
  }
  if (dm < 10) {
    dm = '0' + dm;
  }
  if (dh < 10) {
    dh = '0' + dh;
  }
}

loop();
