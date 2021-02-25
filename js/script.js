let container = document.querySelector('.container')
let ship = document.querySelector('.ship')
let fighter = container.querySelector('.fighter')
let gameover = document.querySelector('.gameover')
let audio = document.querySelector('.audio')
let lasersound = document.querySelector('.lasersound')
let crash = document.querySelector('.crash')
let counter = document.querySelector('.counter')
let stop = document.querySelector('.stop')

stop.addEventListener('click', () => {
  audio.pause()
  audio.currentTime = 0
})

audio.play()
audio.volume = 0.01

let laserFunction = () => {
  lasersound.pause()
  lasersound.currentTime = 0
  lasersound.volume = 0.01
  lasersound.play()
  asteroid = document.querySelector('.asteroid')
  let positionShipX = ship.offsetLeft
  let positionShipY = ship.offsetTop
  let laser = document.createElement('div')
  laser.classList.add('laser')
  laser.innerHTML = '🔥'
  container.insertAdjacentElement('beforeend', laser)
  laser.style.left = positionShipX + 'px'
  laser.style.top = positionShipY - 90 + 'px'
  let positionLaserY = laser.offsetTop
  let positionLaserX = laser.offsetLeft
  let positionAsteroidY = asteroid.offsetTop + 10
  let positionAsteroidX = asteroid.offsetLeft
  let interval = setInterval(() => {
    positionLaserY = laser.offsetTop
    positionLaserX = laser.offsetLeft
    positionAsteroidY = asteroid.offsetTop + 10
    positionAsteroidX = asteroid.offsetLeft
    if (positionLaserY < positionAsteroidY) {
      if (
        positionLaserX > positionAsteroidX - asteroid.offsetWidth / 2 &&
        positionLaserX < positionAsteroidX + asteroid.offsetWidth / 2
      ) {
        crash.play()
        crash.volume = 0.01
        counter.textContent = Number(counter.innerHTML) + 1
        container.removeChild(asteroid)
        container.removeChild(laser)
        clearInterval(interval)
        createAsteroid()
      }
    }

    laser.style.top = positionLaserY - 4 + 'px'
    if (positionLaserY < -10) {
      clearInterval(interval)
      container.removeChild(laser)
    }
  }, 0.1)
}

let createAsteroid = () => {
  let asteroidShape = Math.floor(Math.random() * 3) + 1
  let shape
  switch (asteroidShape) {
    case 1:
      shape = '🌑'
      break
    case 2:
      shape = '😈'
      break
    case 3:
      shape = '🦂'
      break
    default:
      break
  }

  let asteroid = document.createElement('div')
  let asteroidSize = Math.floor(Math.random() * 20) + 3
  asteroid.classList.add('asteroid')
  asteroid.innerHTML = shape
  asteroid.style.left =
    Math.floor(Math.random() * window.innerWidth - 20) + 20 + 'px'
  asteroid.style.fontSize = asteroidSize + 'rem'
  container.insertAdjacentElement('beforeend', asteroid)
  let randomNumber = Math.floor(Math.random() * 8) + 1
  let asteroidFall = setInterval(() => {
    let positionAsteroid = asteroid.offsetTop
    asteroid.style.top = positionAsteroid + randomNumber + 'px'
    if (positionAsteroid > window.innerHeight) {
      gameover.style.display = 'flex'
      clearInterval(asteroidFall)
      container.removeChild(asteroid)
      container.removeChild(laser)
      clearInterval(interval)
    }
  }, 20)
}
createAsteroid()
let asteroid = document.querySelector('.asteroid')

document.addEventListener('keydown', event => {
  let positionShipX = ship.offsetLeft
  let positionShipY = ship.offsetTop
  if (event.keyCode === 37) {
    ship.style.left = positionShipX - 40 + 'px'
  }
  if (event.keyCode === 39) {
    ship.style.left = positionShipX + 40 + 'px'
  }
  if (event.keyCode === 32) {
    laserFunction()
  }
})

document.addEventListener('click', event => {
  laserFunction(event)
})

gameover.addEventListener('click', () => {
  gameover.style.display = 'none'
  createAsteroid()
})

window.addEventListener('mousemove', event => {
  ship.style.left = event.clientX + 'px'
})

ship.addEventListener('touchmove', event => {
  ship.style.left = Math.floor(event.touches[0].clientX) + 'px'
})
