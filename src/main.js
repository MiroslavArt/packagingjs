import { diffDates, diffToHtml } from "./datecalc.js"; // 1
import { formatError, changemode, formatTime } from "./utils.js"; // 2
//import {Howl, Howler} from '../node_modules/howler/dist/howler.core.min.js';
var sound = new Howl({
    src: ['src/sound.mp3']
});
  
// передключение между датами
var radios = document.querySelectorAll('input[type=radio][name="mode"]');
var calcform = document.getElementById("datecalc");
var timer = document.getElementById("timer");

function changeHandler(event) {
    changemode(this.value, calcform, timer)
}

Array.prototype.forEach.call(radios, function(radio) {
   radio.addEventListener('change', changeHandler);
});

changemode('datecalc', calcform, timer)

// калькулятор дат
const dateCalcForm = document.getElementById("datecalc");
const dateCalcResult = document.getElementById("datecalc__result");

dateCalcForm.addEventListener("submit", handleCalcDates);

function handleCalcDates(event) {
    dateCalcResult.innerHTML = "";
    event.preventDefault();

    let { firstDate, secondDate } = event.target.elements;
    firstDate = firstDate.value, secondDate = secondDate.value;

    if (firstDate && secondDate) {
        const diff = diffDates(firstDate, secondDate); // 3
        dateCalcResult.innerHTML = diffToHtml(diff); // 4
    }
    else dateCalcResult.innerHTML = formatError("Для расчета промежутка необходимо заполнить оба поля"); // 5
}

// таймер
const timerResult = document.getElementById("timer__result");
const timerPeriod = timer.querySelector('input[type=number][name="seconds"]');
const timerStart = timer.querySelector('button[type=button][name="start"]');
const timerFinish = timer.querySelector('button[type=button][name="finish"]');

timerStart.addEventListener("click", startTimer);
timerFinish.addEventListener("click", finishTimer);

function startTimer(event) {
    timerResult.innerHTML = "";
    event.preventDefault();

    let timerperiod = timerPeriod.value

    if (timerperiod) {
        window.timerId = setInterval(function () {
            // Условие если время закончилось то...
            if (timerperiod <= 0) {
                // Таймер удаляется
                clearInterval(window.timerId);
                // Выводит сообщение что время закончилось
                timerResult.innerHTML = formatTime(timerperiod)
                sound.play();
            } else { // Иначе
                // Создаём строку с выводом времени
                timerResult.innerHTML = formatTime(timerperiod)
            }
            --timerperiod; // Уменьшаем таймер
        }, 1000)
    }
    else timerResult.innerHTML = formatError("Не задано время таймера"); 
}

function finishTimer(event) {
    clearInterval(window.timerId);
    timerResult.innerHTML = formatTime(0)
    sound.play();
}

