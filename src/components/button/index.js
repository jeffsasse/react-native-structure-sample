import React from 'react'
import {ActivityIndicator, Text, TouchableOpacity} from 'react-native'
import styles from './style'

const Button = ({
  text = null,
  disabled = false,
  loading = false,
  labelStyle,
  style,
  children,
  onPress,
}) => (
  <TouchableOpacity
    disabled={disabled || loading}
    style={[styles.button, style, disabled && {opacity: 0.2}]}
    onPress={onPress}
  >
    {loading ? (
      <ActivityIndicator size="large" color="white" />
    ) : text ? (
      <Text style={[styles.label, labelStyle]}>{text}</Text>
    ) : (
      children
    )}
  </TouchableOpacity>
)

export default Button
