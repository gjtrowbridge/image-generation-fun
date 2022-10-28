import { getNewSVGCanvas, saveSVGFile } from './helpers'
import { distanceBetweenPoints, getEquilateralPolygon } from './helpers/shapes'

interface Asteroid {
  radius: number
  x: number
  y: number
}

const canvas = getNewSVGCanvas()

const domainWidth = 1000
const domainHeight = 1000
const blackHoleRadius = 100
// Keeps a clean area around the black hole if greater than 0
const blackHoleForcefieldBuffer = 5
const minAsteroidRadius = 1
const asteroidDensity = 1
const maxAsteroidRadius = blackHoleRadius / 4

// How strong is gravity?
const gravitationalConstant = 10000
const blackHoleMass = blackHoleRadius
const blackHoleLocation: [number, number] = [domainWidth / 2, domainHeight / 2]
const durationOfPull = 500
// How frequently to re-calculate the position of the thing moving towards the black hole
const pullDurationStepSize = 1

const getGravitationalForce = function (asteroid: Asteroid) {
  const distanceBetweenSquared =
    (blackHoleLocation[0] - asteroid.x) ** 2 +
    (blackHoleLocation[1] - asteroid.y) ** 2

  return (
    (gravitationalConstant * blackHoleMass * getAsteroidMass(asteroid)) /
    distanceBetweenSquared
  )
}

const getAsteroidMass = function (asteroid: Asteroid) {
  return asteroid.radius * asteroidDensity
}

const remainingAllowableDistanceToBlackHole = function (asteroid: Asteroid) {
  return (
    distanceBetweenPoints(
      [asteroid.x + asteroid.radius, asteroid.y + asteroid.radius],
      blackHoleLocation
    ) -
    (blackHoleRadius + asteroid.radius + blackHoleForcefieldBuffer)
  )
}

// Moves the asteroid towards the black hole
const moveTowardsBlackHole = function (asteroid: Asteroid) {
  // I'm doing it this way so I don't have to get super crazy with the gravity calculations,
  // this is close enough...
  for (
    let timeRemaining = durationOfPull;
    timeRemaining > 0;
    timeRemaining -= pullDurationStepSize
  ) {
    const force = getGravitationalForce(asteroid)
    const acceleration = force / getAsteroidMass(asteroid)
    let distanceTraveled = (acceleration * pullDurationStepSize ** 2) / 2
    const remainingDistanceAllowed =
      remainingAllowableDistanceToBlackHole(asteroid)
    if (distanceTraveled > remainingDistanceAllowed) {
      break
    }
    // Fix me tomorrow when not tired -> need to move in direction of thingy
    const totalDistanceX = blackHoleLocation[0] - asteroid.x
    const totalDistanceY = blackHoleLocation[1] - asteroid.y
    const totalDistanceDirect = Math.sqrt(
      totalDistanceX ** 2 + totalDistanceY ** 2
    )
    const scaleDownBy = distanceTraveled / totalDistanceDirect
    const toMoveX = scaleDownBy * totalDistanceX
    const toMoveY = scaleDownBy * totalDistanceY

    // console.log({
    //   force,
    //   acceleration,
    //   distanceTraveled,
    //   remainingDistanceAllowed,
    //   totalDistanceX,
    //   totalDistanceY,
    //   toMoveX,
    //   toMoveY,
    // })

    asteroid.x += toMoveX
    asteroid.y += toMoveY

    // if (distanceTraveled >= remainingDistanceAllowed) {
    //   break
    // }
  }
}

const randomCreateAsteroid = function (): Asteroid {
  const radius = Math.round(
    Math.random() * (maxAsteroidRadius - minAsteroidRadius) + minAsteroidRadius
  )
  const x = Math.round(Math.random() * domainWidth)
  const y = Math.round(Math.random() * domainHeight)
  return {
    radius,
    x,
    y,
  }
}

canvas.viewbox(0, 0, domainWidth, domainHeight)
canvas.polygon(getEquilateralPolygon(blackHoleRadius, 16, blackHoleLocation))
for (let i = 0; i < 1000; i++) {
  // Randomly generate until we get an asteroid that works
  while (true) {
    const asteroid = randomCreateAsteroid()
    if (remainingAllowableDistanceToBlackHole(asteroid) > 0) {
      // How far will it travel towards the black hole?
      moveTowardsBlackHole(asteroid)

      canvas
        .circle(asteroid.radius * 2)
        .move(asteroid.x, asteroid.y)
        .fill('green')
        .stroke({
          width: 1,
          color: 'green',
        })
      break
    }
  }
}

void saveSVGFile('blackHole', canvas.svg())
