let darkmode = localStorage.getItem('darkmode')

const enableDarkmode = () => {
  document.body.classList.add('darkmode')
  localStorage.setItem('darkmode', 'active')
  document.getElementById('theme_yes').checked = true
}

const disableDarkmode = () => {
  document.body.classList.remove('darkmode')
  localStorage.setItem('darkmode', 'inactive')
  document.getElementById('theme_no').checked = true
}

// Apply saved theme on load
if (darkmode === 'active') {
  enableDarkmode()
} else {
  disableDarkmode()
}

let eventImg = localStorage.getItem('eventImg')

const enableEventImg = () => {
  localStorage.setItem('eventImg', 'active');
  let images = document.querySelectorAll('.event-container img, .face-status-container img');
  for (let img of images) {
    img.style.display = 'block';
  }
  document.getElementById('eventImg_yes').checked = true;
};

const disableEventImg = () => {
  localStorage.setItem('eventImg', 'inactive');
  let images = document.querySelectorAll('.event-container img, .face-status-container img');
  for (let img of images) {
    img.style.display = 'none';
  }
  document.getElementById('eventImg_no').checked = true;
};

// Apply saved theme on load
if (eventImg === 'active') {
  enableEventImg()
} else {
  disableEventImg()
}