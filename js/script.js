let container = document.querySelector('.container')
let ship = document.querySelector('.ship')
let fighter = container.querySelector('.fighter')
let gameover = document.querySelector('.gameover')
let audio = document.querySelector('.audio')
let lasersound = document.querySelector('.lasersound')
let crash = document.querySelector('.crash')
let counter = document.querySelector('.counter')
let stop = document.querySelector('.stop')
let play = document.querySelector('.play')
let space = document.querySelector('.space')
let mars = document.querySelector('.mars')
let earth = document.querySelector('.earth')
let lifes = document.querySelector('.lifes')
let videoContainer = document.querySelector('.videoContainer')
let videoSource = videoContainer.querySelector('source')
console.log(videoSource)

let death = 3
let stars = ['⭐', '⭐', '⭐']

//Music playback start after 3 seconds
let musicPlay = setTimeout(() => {
  audio.play()
  audio.volume = 0.01
}, 3000)

//Display stars
let showStars = () => {
  lifes.textContent = ''
  stars.forEach(star => {
    lifes.textContent += star
  })
}

//Stop music
stop.addEventListener('click', () => {
  audio.pause()
  audio.currentTime = 0
})

//Key
document.addEventListener('keydown', event => {
  let positionShipX = ship.offsetLeft
  if (event.key === 'ArrowLeft') {
    ship.style.left = positionShipX - 40 + 'px'
  }
  if (event.key === 'ArrowRight') {
    ship.style.left = positionShipX + 40 + 'px'
  }
  if (event.key === ' ') {
    console.log('Space')
  }
})

//Mouse ship movement
document.addEventListener('mousemove', event => {
  ship.style.left = event.clientX + 'px'
})

//Touch ship movement
ship.addEventListener('touchmove', event => {
  ship.style.left = Math.floor(event.touches[0].clientX) + 'px'
})

//Earth background
earth.addEventListener('click', () => {
  videoSource.setAttribute('src', 'video/earth.mp4')
  videoContainer.load()
})
//Mars background
mars.addEventListener('click', () => {
  videoSource.setAttribute('src', 'dfg')
  videoContainer.load()
})
//Space background
space.addEventListener('click', () => {
  videoSource.setAttribute('src', 'video/earth.mp4')
  videoContainer.load()
})
