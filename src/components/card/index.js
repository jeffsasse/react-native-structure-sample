import React from 'react'
import {View} from 'react-native'
import styles from './style'

const Card = ({children, style}) => (
  <View style={[styles.container, style]}>{children}</View>
)

export default Card
