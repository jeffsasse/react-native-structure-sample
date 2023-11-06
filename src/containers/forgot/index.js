import React, {useState} from 'react'
import {Image, View, Text, TouchableOpacity} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigation} from '@react-navigation/native'
import {Button, Input} from '~/components'
import AppActions from '~/actions/app'
import styles from './style'

const ForgotScreen = () => {
  const [email, setEmail] = useState('')
  const navigation = useNavigation()

  const status = useSelector((state) => state.app.status)
  const loading = status === 'pending'

  const dispatch = useDispatch()
  const handleReset = () => {
    const payload = {email}
    dispatch(AppActions.forgotpasswordRequest(payload, navigation))
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('~/assets/logo.png')} style={styles.logo} />
      </View>
      <View style={styles.body}>
        <TouchableOpacity
          style={styles.goback}
          onPress={() => navigation.goBack()}
        >
          <View style={styles.goside}>
            <Image
              source={require('~/assets/arrow.png')}
              style={styles.arrow}
            />
          </View>
          <View style={styles.gocenter}>
            <Text style={styles.forgot}>FORGOT PASSWORD</Text>
          </View>
          <View style={styles.goside} />
        </TouchableOpacity>

        <Input
          label="Email"
          value={email}
          keyboardType="email-address"
          onChange={(e) => setEmail(e)}
        />

        <Button
          text="RESET PASSWORD"
          disabled={email === ''}
          loading={loading}
          style={styles.reset}
          onPress={handleReset}
        />
      </View>
    </View>
  )
}

export default ForgotScreen
