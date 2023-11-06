import React from 'react'
import {Image, Text, TouchableOpacity, View} from 'react-native'
import {Colors} from '~/theme'
import styles from './style'

const Line = ({type, text, style, onPress = () => {}}) => (
  <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
    <View style={styles.header}>
      {(type === 'right' || type === 'Correct') && (
        <Image source={require('~/assets/right.png')} style={styles.arrow} />
      )}
      {(type === 'wrong' || type === 'Incorrect') && (
        <Image source={require('~/assets/wrong.png')} style={styles.arrow} />
      )}
      {type === 'skipped' && <View style={styles.skipped} />}
    </View>
    <View style={styles.body}>
      <Text
        style={[
          styles.text,
          type === 'skipped' ? {color: Colors.border} : {color: Colors[type]},
        ]}
        numberOfLines={1}
      >
        {text}
      </Text>
    </View>
    <View style={styles.footer}>
      <Image source={require('~/assets/arrow.png')} style={styles.arrow} />
    </View>
  </TouchableOpacity>
)

export default Line
