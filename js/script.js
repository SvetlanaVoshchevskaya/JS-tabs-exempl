window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const tab = document.querySelectorAll('.info-header-tab');
  const info = document.querySelector('.info-header');
  const tabContent = document.querySelectorAll('.info-tabcontent');

  const hideContent = (a) => {
    for (let i = a; i < tabContent.length; i++) {
      tabContent[i].classList.remove('show');
      tabContent[i].classList.add('hide');
    }
  };
  hideContent(1);
  const showContent = (b) => {
    if (tabContent[b].classList.contains('hide')) {
      tabContent[b].classList.remove('hide');
      tabContent[b].classList.add('show');
    }
  };
  info.addEventListener('click', (event) => {
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

  const deadline = '2020-04-07';

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
    function addZero(num) {
      {
        if (num <= 9) {
          return `0${num}`;
        } else {
          return num;
        }
      }
    }

    function updateClock() {
      let t = getTimeRemaning(endtime);
      // hours.textContent = t.hour >= 10 ? t.hour : `0${t.hour}`;
      // minutes.textContent = t.min >= 10 ? t.min : `0${t.min}`;
      // seconds.textContent = t.second >= 10 ? t.second : `0${t.second}`;
      hours.textContent = addZero(t.hour);
      minutes.textContent = addZero(t.min);
      seconds.textContent = addZero(t.second);
      if (t.total <= 0) {
        clearInterval(timeInterval);
        hours.textContent = '00';
        minutes.textContent = '00';
        seconds.textContent = '00';
      }
    }
  }
  setClock('timer', deadline);

  // modal
  const moreBtn = document.querySelector('.more'),
    overlay = document.querySelector('.overlay'),
    closeBtn = document.querySelector('.popup-close');
  const descrBtn = document.querySelectorAll('.description-btn');

  function openModal() {
    overlay.style.display = 'block';
    this.classList.add('more-splash');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    overlay.style.display = 'none';
    document.body.style.overflow = '';
  }

  // function addMoreDescr() {
  //   for (let i = 0; i < descrBtn.length; i++) {
  //     descrBtn[i].addEventListener('click', openModal);
  //   }
  // }

  // addMoreDescr();
  moreBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  descrBtn.forEach((el) => el.addEventListener('click', openModal));

  //Form
  const message = {
    loading: 'Loading ...',
    success: 'Спасибо! Мы с Вами свяжемся!',
    failure: ' Произошла ошибка связитесь с нами по телефону..',
  };
  const form = document.querySelector('.main-form');
  const contactForm = document.querySelector('#form');
  const input = form.getElementsByTagName('input');
  const statusMessage = document.createElement('div');
  statusMessage.classList.add('status');

  function onSubmit(event) {
    event.preventDefault();
    form.appendChild(statusMessage);
    contactForm.appendChild(statusMessage);
    //XMLHttpRequest
    const req = new XMLHttpRequest();
    req.open('POST', 'server.php');
    req.setRequestHeader('Content-Type', 'application/json');

    let formData = new FormData(form);
    const obj = {};
    formData.forEach((value, key) => (obj[key] = value));

    const json = JSON.stringify(obj);
    req.send(json);

    // fetch

    // await fetch('server.php', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(obj),
    // }).then((response) => {
    //   if (response.ok) {
    //     statusMessage.innerHTML = message.success;
    //   } else {
    //     statusMessage.innerHTML = message.failure;
    //   }
    // });

    req.addEventListener('readystatechange', () => {
      if (req.readyState < 4) {
        statusMessage.innerHTML = message.loading;
      } else if (req.readyState === 4 && req.status === 200) {
        statusMessage.innerHTML = message.success;
        setTimeout(closeModal, 2000);
      } else {
        statusMessage.innerHTML = message.failure;
      }
    });
    for (let i = 0; i < input.length; i++) {
      input[i].value = '';
    }
  }

  form.addEventListener('submit', onSubmit);
  contactForm.addEventListener('submit', onSubmit);
});
