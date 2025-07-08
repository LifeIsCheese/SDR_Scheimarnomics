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