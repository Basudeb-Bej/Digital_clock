function clock(){
  const hour = document.getElementById('hour');
  const minute = document.getElementById('minute');
  const second = document.getElementById('second');
  const ampm = document.getElementById('ampm');
  
  let h = new Date().getHours();
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
