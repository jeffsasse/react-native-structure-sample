import React, {useState} from 'react'
import {Platform, Text, TextInput, TouchableOpacity, View} from 'react-native'
import styles from './style'

const Input = ({
  label = 'email',
  error = '',
  value,
  style,
  onChange,
  ...props
}) => {
  const [secure, setSecure] = useState(true)
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      {Platform.OS === 'ios' ? (
        <TextInput
          {...props}
          autoCapitalize={'none'}
          placeholder="Password"
          secureTextEntry={secure}
          numberOfLines={1}
          value={value}
          color="#000"
          placeholderTextColor="#c7c7cd"
          style={styles.input}
          onChangeText={(e) => onChange(e)}
        />
      ) : (
        <TextInput
          {...props}
          autoCapitalize={'none'}
          placeholder="Password"
          secureTextEntry={secure}
          numberOfLines={1}
          value={value}
          placeholderTextColor="#c7c7cd"
          style={styles.input}
          onChangeText={(e) => onChange(e)}
        />
      )}

      <TouchableOpacity
        style={styles.secure}
        onPress={() => setSecure(!secure)}
      >
        <Text style={styles.secureText}>{secure ? 'Show' : 'Hide'}</Text>
      </TouchableOpacity>
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  )
}

export default Input
