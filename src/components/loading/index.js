import React from 'react'
import {ActivityIndicator, Text, View} from 'react-native'
import {Colors} from '~/theme'
import styles from './style'

const Loading = ({animated = true, hasBack = false, type = 'main'}) =>
  animated && (
    <View
      style={[
        styles.container,
        hasBack && {backgroundColor: Colors.background},
      ]}
    >
      {type === 'main' && <ActivityIndicator size="large" color="grey" />}
      {type === 'secondary' && (
        <View style={styles.loading}>
          <Text style={styles.title}>LOADING...</Text>
        </View>
      )}
    </View>
  )

export default Loading
