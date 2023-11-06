import {Dimensions} from 'react-native'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height
const baseFontSize = 16
const typeScale = [3, 2.25, 1.5, 1.25, 1, 0.875, 0.75]
const baseSpacingUnit = baseFontSize

const fontSize = {
  one: baseFontSize * typeScale[0],
  two: baseFontSize * typeScale[1],
  three: baseFontSize * typeScale[2],
  four: baseFontSize * typeScale[3],
  five: baseFontSize * typeScale[4],
  six: baseFontSize * typeScale[5],
  seven: baseFontSize * typeScale[6],
}

// Spacing scale after
const spacing = {
  zero: 0,
  one: baseSpacingUnit * 0.25,
  two: baseSpacingUnit * 0.5,
  three: baseSpacingUnit * 1,
  four: baseSpacingUnit * 2,
  five: baseSpacingUnit * 4,
  six: baseSpacingUnit * 8,
  seven: baseSpacingUnit * 16,
}

const animationDelay = 500

export default {
  baseFontSize,
  typeScale,
  baseSpacingUnit,
  fontSize,
  spacing,
  screenWidth,
  screenHeight,
  animationDelay,
}
