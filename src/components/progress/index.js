import React from 'react'
import {Text, View} from 'react-native'
import styles from './style'

const Progress = ({total = 75, current = 0, style}) => (
  <View style={[styles.container, style]}>
    <Text>
      {current} OF {total}
    </Text>
    <View style={styles.content}>
      <View style={[styles.primary, {flex: current}]} />
      <View style={[styles.secondary, {flex: total - current}]} />
    </View>
  </View>
)

export default Progress
