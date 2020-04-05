window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const tab = document.querySelectorAll('.info-header-tab');
  const info = document.querySelector('.info-header');
  const tabContent = document.querySelectorAll('.info-tabcontent');

  function hideContent(a) {
    for (let i = a; i < tabContent.length; i++) {
      tabContent[i].classList.remove('show');
      tabContent[i].classList.add('hide');
    }
  }
  function showContent(b) {
    if (tabContent[b].classList.contains('hide')) {
      tabContent[b].classList.remove('hide');
      tabContent[b].classList.add('show');
    }
  }
  info.addEventListener('click', function (event) {
    let target = event.target;
    if (target && target.classList.contains('info-header-tab')) {
      for (let i = 0; i < tab.length; i++) {
        if (target === tab[i]) {
          hideContent(0);
          showContent(i);
          break;
        }
      }
    }
  });

  // timer

  const deadline = '2020-04-06';

  function getTimeRemaning(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date());
    const second = Math.floor((t / 1000) % 60);
    const min = Math.floor((t / 1000 / 60) % 60);
    const hour = Math.floor(t / (1000 * 60 * 60));
    return {
      total: t,
      second,
      min,
      hour,
    };
  }

  function setClock(id, endtime) {
    const timer = document.getElementById(id),
      hours = timer.querySelector('.hours'),
      minutes = timer.querySelector('.minutes'),
      seconds = timer.querySelector('.seconds');
    let timeInterval = setInterval(updateClock, 1000);

    function updateClock() {
      let t = getTimeRemaning(endtime);
      hours.textContent = t.hour >= 10 ? t.hour : `0${t.hour}`;
      minutes.textContent = t.min >= 10 ? t.min : `0${t.min}`;
      seconds.textContent = t.second >= 10 ? t.second : `0${t.second}`;
      if (t.total <= 0) {
        clearInterval(timeInterval);
        hours.textContent = '00';
        minutes.textContent = '00';
        seconds.textContent = '00';
      }
    }
  }
  setClock('timer', deadline);
});
