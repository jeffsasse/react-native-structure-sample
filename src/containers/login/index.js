import React, {useEffect, useState} from 'react'
import {
  Dimensions,
  Image,
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Keyboard,
} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigation} from '@react-navigation/native'
import {TabView, TabBar, SceneMap} from 'react-native-tab-view'
import Modal from 'react-native-modal'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {Button, Input, Password} from '~/components'
import AppActions from '~/actions/app'
import ProductActions from '~/actions/product'
import {Colors} from '~/theme'
import Privacy from './privacy'
import License from './license'
import styles from './style'
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize'
import {scale, verticalScale, moderateScale} from 'react-native-size-matters'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures'
import * as app from '@config'

const EMAIL_REGX = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/

const FirstRoute = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [visible, setVisible] = useState(null)
  const status = useSelector((state) => state.app.status)
  const loading = status === 'pending'
  const disabled = email === '' || password === ''

  const dispatch = useDispatch()
  const [error1, setError1] = useState('')
  const [error2, setError2] = useState('')
  const handleSignUp = () => {
    if (!EMAIL_REGX.test(email)) setError1('Incorrect email address.')
    if (password.length < 6)
      setError2('Password should be at least 6 characters long.')
    if (EMAIL_REGX.test(email) && password.length > 5) {
      const payload = {
        username: email,
        email,
        password,
        password_confirmation: password,
      }
      dispatch(AppActions.registerRequest(payload))
    }
  }

  useEffect(() => {
    setError1('')
    setError2('')
  }, [email, password])

  return (
    <View style={styles.scene}>
      <Input
        autoCorrect={false}
        label="Email"
        keyboardType="email-address"
        error={error1}
        value={email}
        onChange={(e) => setEmail(e)}
      />
      <Password
        autoCorrect={false}
        label="Password"
        error={error2}
        value={password}
        onChange={(e) => setPassword(e)}
      />
      <Button
        text="GET STARTED"
        disabled={disabled}
        loading={loading}
        style={styles.login}
        onPress={handleSignUp}
      />

      <View style={styles.footer}>
        {/* <TouchableOpacity onPress={() => props.jumpTo('login')}>
          <Text style={styles.subtitle}>Already have an account? Log In</Text>
        </TouchableOpacity> */}
        <View style={{flex: 1}} />
        <View style={styles.modaldesc}>
          <Text style={styles.modaltitle}>By signing up you accept our</Text>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => setVisible('tos')}>
              <Text style={styles.modallabel}>License Agreement</Text>
            </TouchableOpacity>
            <Text style={styles.modaland}>and</Text>
            <TouchableOpacity onPress={() => setVisible('pp')}>
              <Text style={styles.modallabel}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Modal isVisible={visible !== null}>
        <View style={styles.modal}>
          <View style={styles.modalcontent}>
            {visible === 'tos' && <License />}
            {visible === 'pp' && <Privacy />}
          </View>
          <View style={styles.modalfooter}>
            <TouchableOpacity
              style={styles.close}
              onPress={() => setVisible(null)}
            >
              <Image
                source={require('~/assets/wrong.png')}
                style={styles.closeicon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const SecondRoute = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const status = useSelector((state) => state.app.status)
  const loading = status === 'pending'
  const disabled = email === '' || password === ''

  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [error1, setError1] = useState('')
  const [error2, setError2] = useState('')
  const handleLogin = () => {
    const payload = {email, password}
    Keyboard.dismiss()
    dispatch(
      AppActions.loginRequest(payload, 'Wrong Log In credentials. Try again'),
    )
  }

  useEffect(() => {
    setError1('')
    setError2('')
  }, [email, password])

  return (
    <View style={styles.scene}>
      <Input
        autoCorrect={false}
        label="Email"
        keyboardType="email-address"
        value={email}
        onChange={(e) => setEmail(e)}
      />
      {!!error1 && <Text style={styles.error}>{error1}</Text>}
      <Password
        autoCorrect={false}
        label="Password"
        value={password}
        onChange={(e) => setPassword(e)}
      />
      {!!error2 && <Text style={styles.error}>{error2}</Text>}
      <Button
        text="LOG IN"
        disabled={disabled}
        loading={loading}
        style={styles.login}
        onPress={handleLogin}
      />

      <View style={styles.footer}>
        {/* <TouchableOpacity onPress={() => props.jumpTo('signup')}>
          <Text style={styles.subtitle}>Don't have an Account? Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  )
}

const initialLayout = {width: Dimensions.get('window').width}

const LoginScreen = () => {
  const [index, setIndex] = React.useState(1)
  const [routes] = React.useState([
    {key: 'signup', title: 'SIGN UP'},
    {key: 'login', title: 'LOG IN'},
  ])

  const dispatch = useDispatch()

  const renderScene = SceneMap({
    signup: FirstRoute,
    login: SecondRoute,
  })
  const onSwipeDown = () => {
    /*const dispatch = useDispatch()
    Keyboard.dismiss()
    const payload = {email, password}
    console.log('ok------')
    dispatch(
      AppActions.loginRequest(payload, 'Wrong Log In credentials. Try again'),
      // ProductActions.getbundlesRequest(app.slug),
    )*/
    // need to change the getbundle api
    // current use the test user for getting getbundle api
    // aaa@aaa.aaa aaaaaa
    const payload = {email: 'aaa@aaa.aaa', password: 'aaaaaa'}
    Keyboard.dismiss()
    dispatch(
      AppActions.loginRequest(payload, 'Wrong Log In credentials. Try again'),
    )
  }

  return (
    <GestureRecognizer
      onSwipeDown={onSwipeDown}
      onSwipeUp={onSwipeDown}
      style={{
        flex: 1,
      }}
    >
      <KeyboardAwareScrollView
        extraHeight={220}
        enableOnAndroid
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag"
        contentContainerStyle={StyleSheet.flatten([
          styles.container,
          Platform.OS === 'ios' && {flex: 1},
        ])}
      >
        <View style={styles.header}>
          <Image source={require('~/assets/logo.png')} style={styles.logo} />
        </View>
        <View style={styles.body}>
          <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            renderTabBar={(props) => (
              <TabBar
                {...props}
                activeColor={Colors.primary}
                inactiveColor={Colors.secondary}
                indicatorStyle={{
                  backgroundColor: Colors.primary,
                  height: 2,
                  bottom: -2,
                  shadowOpacity: 0,
                  shadowColor: 'transparent',
                  shadowOffset: {
                    width: 0,
                    height: 0,
                  },
                  borderWidth: 0,
                  zIndex: 1,
                }}
                indicatorContainerStyle={{
                  borderBottomColor: Colors.secondary,
                  borderBottomWidth: 2,
                }}
                labelStyle={{
                  fontFamily: 'TradeGothicLTPro-Bold',
                  fontSize: RFValue(11, 360), // 26,
                }}
                style={{backgroundColor: '#fff'}}
              />
            )}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
          />
        </View>
      </KeyboardAwareScrollView>
    </GestureRecognizer>
  )
}

export default LoginScreen
