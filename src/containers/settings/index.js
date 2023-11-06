import React, {useEffect, useState} from 'react'
import {Dimensions, View, Text, Platform} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {TabActions, useNavigation} from '@react-navigation/native'
import {TabView, TabBar, SceneMap} from 'react-native-tab-view'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {Button, Card, Input, Password} from '~/components'
import AppActions from '~/actions/app'
import {Colors} from '~/theme'
import styles from './style'
import {RFValue} from 'react-native-responsive-fontsize'

const EMAIL_REGX = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/

const FirstRoute = () => {
  const user = useSelector((state) => state.app.user)
  const [cemail, setCEmail] = useState(user?.email)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error1, setError1] = useState('')
  const [error2, setError2] = useState('')

  useEffect(() => {
    setError1('')
    setError2('')
  }, [email, password])

  const dispatch = useDispatch()
  const navigation = useNavigation()
  const handleUpdate = () => {
    if (!EMAIL_REGX.test(email)) setError1('Incorrect email address.')
    if (password.length < 6)
      setError2('Password should be at least 6 characters long.')
    if (EMAIL_REGX.test(email) && password.length > 5) {
      const payload = {email, password}
      const callback = () => {
        setPassword('')
        setEmail('')
        navigation.dispatch(TabActions.jumpTo('Home'))
      }
      dispatch(AppActions.emailRequest(payload, callback))
    }
  }

  const handleLogOut = () => {
    const callback = navigation.dispatch(TabActions.jumpTo('Home'))
    dispatch(AppActions.logoutRequest(null, callback))
  }

  const status = useSelector((state) => state.app.status)
  const loading = status === 'pending'

  return (
    <View style={styles.scene}>
      <Text style={styles.header}>UPDATE EMAIL</Text>
      <Card style={styles.card}>
        <Input
          label="Current Email"
          editable={false}
          value={cemail}
          style={styles.input}
        />
        <Input
          label="New Email"
          error={error1}
          value={email}
          style={styles.input}
          onChange={(e) => setEmail(e)}
        />
        <Password
          label="Password"
          error={error2}
          value={password}
          style={styles.input}
          onChange={(e) => setPassword(e)}
        />
        {!!error2 && <Text style={styles.error}>{error2}</Text>}
        <Button text="UPDATE EMAIL" loading={loading} onPress={handleUpdate} />
      </Card>
      <Button text="LOG OUT" style={styles.logout} onPress={handleLogOut} />
    </View>
  )
}

const SecondRoute = () => {
  const [cpassword, setCPassword] = useState('')
  const [npassword, setNPassword] = useState('')
  const [error, setError] = useState('')

  const status = useSelector((state) => state.app.status)
  const loading = status === 'pending'

  const dispatch = useDispatch()
  const navigation = useNavigation()
  const handleUpdate = () => {
    if (npassword.length < 6) {
      setError('Password should be at least 6 characters long.')
      return
    }
    const payload = {
      current_password: cpassword,
      password: npassword,
      confirmation_password: npassword,
    }
    const callback = () => {
      setCPassword('')
      setNPassword('')
      navigation.dispatch(TabActions.jumpTo('Home'))
    }
    dispatch(AppActions.passwordRequest(payload, callback))
  }
  const handleLogOut = () => {
    const callback = navigation.dispatch(TabActions.jumpTo('Home'))
    dispatch(AppActions.logoutRequest(null, callback))
  }

  return (
    <View style={styles.scene}>
      <Text style={styles.header}>UPDATE PASSWORD</Text>
      <Card style={styles.card}>
        <Password
          label="Current Password"
          value={cpassword}
          style={styles.input}
          onChange={(e) => setCPassword(e)}
        />
        <Password
          label="New Password"
          error={error}
          value={npassword}
          style={styles.input}
          onChange={(e) => setNPassword(e)}
        />
        <Button
          text="UPDATE PASSWORD"
          loading={loading}
          onPress={handleUpdate}
        />
      </Card>
      <Button text="LOG OUT" style={styles.logout} onPress={handleLogOut} />
    </View>
  )
}

const initialLayout = {width: Dimensions.get('window').width}

const SettingsScreen = ({route, navigation}) => {
  navigation.setOptions({
    headerStyle: {
      backgroundColor: Colors.primary,
      shadowColor: Colors.primary,
      height: Platform.isPad ? 120 : 100,
    },
    headerTitleStyle: {
      color: 'white',
      fontFamily: 'TradeGothicLTPro-Bold',
      fontSize: RFValue(11, 360),
    },
  })

  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    {key: 'email', title: 'EMAIL'},
    {key: 'password', title: 'PASSWORD'},
  ])

  const renderScene = SceneMap({
    email: FirstRoute,
    password: SecondRoute,
  })

  return (
    <KeyboardAwareScrollView
      extraHeight={200}
      keyboardShouldPersistTaps="always"
      style={styles.container}
    >
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
              fontSize: RFValue(8, 360),
            }}
            style={{backgroundColor: Colors.background}}
          />
        )}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
    </KeyboardAwareScrollView>
  )
}

export default SettingsScreen
