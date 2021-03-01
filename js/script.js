let container = document.querySelector('.container')
let ship = document.querySelector('.ship')
let gameover = document.querySelector('.gameover')
let audio = document.querySelector('.audio')
let lasersound = document.querySelector('.lasersound')
let crash = document.querySelector('.crash')
let counter = document.querySelector('.counter')
let toggleMusic = document.querySelector('.toggleMusic')
let muteSpeaker = toggleMusic.querySelector('.muteSpeaker')
let musicButton = toggleMusic.querySelector('.musicButton')
let play = document.querySelector('.play')
let earth = document.querySelector('.earthImg')
let mars = document.querySelector('.marsImg')
let space = document.querySelector('.spaceImg')
let lives = document.querySelector('.lives')
let videoContainer = document.querySelector('.videoContainer')
let videoSource = videoContainer.querySelector('source')

let asteroidElement
let asteroidShapeNumber
let asteroidShapeSize
let asteroidShape
let laserX
let laserY
let asteroidX
let asteroidY
let stars = 3

//Display stars
let showStars = () => {
  lives.textContent = ''
  while (stars > 0) {
    let star = document.createElement('img')
    star.setAttribute('src', 'img/star.svg')
    star.classList.add('star')
    lives.append(star)
    stars--
  }
}

let setCounter = () => {
  counter.textContent = Number(counter.innerHTML) + 1
}

//Plays laser sound
let laserSound = () => {
  lasersound.pause()
  lasersound.currentTime = 0
  lasersound.volume = 0.01
  lasersound.play()
}

//Remove laser when asteroid is hit
let removeLaser = laser => {
  if (laser) {
    container.removeChild(laser)
  }
}
//Remove lasers when hit the bottom of the window
let removeLasers = () => {
  let oldLaser = document.querySelector('.laser')
  if (oldLaser.offsetTop <= -10) {
    container.removeChild(oldLaser)
  }
}

//Laser movement
let laserMovement = laser => {
  laser.style.top = laser.offsetTop - window.innerHeight + 'px'
  let laserInterval = setInterval(() => {
    if (
      laser.offsetTop <=
        asteroidElement.offsetTop + asteroidElement.offsetHeight - 10 &&
      laser.offsetTop >= asteroidElement.offsetTop
    ) {
      if (
        laser.offsetLeft >
          asteroidElement.offsetLeft - asteroidElement.offsetWidth / 2 &&
        laser.offsetLeft <
          asteroidElement.offsetLeft + asteroidElement.offsetWidth
      ) {
        crash.play()
        crash.volume = 0.01
        removeLaser(laser)
        container.removeChild(asteroidElement)
        setCounter()
        asteroidFunction()
        clearInterval(laserInterval)
      }
    }
  }, 10)
}

//Create laser and initial positioning
let createLaser = () => {
  let laser = document.createElement('img')
  laser.classList.add('laser')
  laser.setAttribute('src', 'img/bullet.svg')
  container.insertAdjacentElement('beforeend', laser)
  laser.style.left = ship.offsetLeft - 14 + 'px'
  laser.style.top = ship.offsetTop - 100 + 'px'
  laserMovement(laser)
}

//Lasershot function
let laserShot = () => {
  createLaser()
  removeLasers()
  laserSound()
}

//Set the asteroid position
let setAsteroidPosition = asteroid => {
  let maxWidth = window.innerWidth - 100
  console.log(maxWidth)
  asteroid.style.left = Math.floor(Math.random() * maxWidth) + 60 + 'px'
  setTimeout(() => {
    asteroid.style.top = window.innerHeight + 100 + 'px'
  }, 1)
}

//Set asteroid shape
let setAsteroidShape = asteroid => {
  asteroidShapeNumber = Math.floor(Math.random() * 6) + 1
  asteroidShapeSize = Math.floor(Math.random() * 14) + 4
  switch (asteroidShapeNumber) {
    case 1:
      asteroidShape = 'img/asteroid-purple.svg'
      break
    case 2:
      asteroidShape = 'img/meteorite.svg'
      break
    case 3:
      asteroidShape = 'img/orange-meteorite.svg'
      break
    case 4:
      asteroidShape = 'img/asteroid-black.svg'
      break
    case 5:
      asteroidShape = 'img/rock.svg'
      break
    case 6:
      asteroidShape = 'img/meteorite-white.svg'
      break
    default:
      break
  }
  asteroid.setAttribute('src', asteroidShape)
  asteroid.style.height = `${asteroidShapeSize}rem`
  asteroid.style.width = `${asteroidShapeSize}rem`
}

//Remove asteroid
let removeAsteroid = asteroid => {
  let asteroidFall = setInterval(() => {
    if (asteroid.offsetTop >= window.innerHeight + 100) {
      container.removeChild(asteroid)
      clearInterval(asteroidFall)
      asteroidFunction()
    }
  }, 10)
}

//Create asteroid
let createAsteroid = () => {
  asteroidElement = document.createElement('img')
  asteroidElement.classList.add('asteroid')
  asteroidElement.setAttribute('draggable', 'false')
  return asteroidElement
}

//Full asteroid functionality
let asteroidFunction = () => {
  let asteroid = createAsteroid()
  setAsteroidShape(asteroid)
  container.append(asteroid)
  setAsteroidPosition(asteroid)
  removeAsteroid(asteroid)
}

showStars()
asteroidFunction()

//Music playback start after 3 seconds
let musicPlay = setTimeout(() => {
  audio.play()
  audio.volume = 0.01
}, 1000)

//Mouse laser shot event listener
document.addEventListener('click', () => {
  laserShot()
})

//Toggle music
toggleMusic.addEventListener('click', () => {
  if (audio.paused) {
    muteSpeaker.style.opacity = '0'
    return audio.play()
  }
  console.log('test')
  audio.pause()
  audio.currentTime = 0
  muteSpeaker.style.opacity = '1'
})

//Keyboard ship movement
document.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') {
    ship.style.left = ship.offsetLeft - 40 + 'px'
  }
  if (event.key === 'ArrowRight') {
    ship.style.left = ship.offsetLeft + 40 + 'px'
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
  videoSource.setAttribute('src', 'video/mars.mp4')
  videoContainer.load()
})
//Space background
space.addEventListener('click', () => {
  videoSource.setAttribute('src', 'video/galaxy.mp4')
  videoContainer.load()
})
