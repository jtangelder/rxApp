import { Observable } from 'rx';

const btns = document.querySelectorAll('#btn1, #btn2');
const area = document.querySelector('#area');

const clickEventValueStream = Observable.fromEvent(btns, 'click')
  .map(ev => ev.target.value);

const changeColorStream = Observable.just(null)
  .merge(clickEventValueStream);

const colorStream = changeColorStream
  .map((color)=> {
    if (color === null) {
        return '#eee';
    }
    return color;
  });

colorStream.subscribe((color)=> {
    area.style.background = color;
});