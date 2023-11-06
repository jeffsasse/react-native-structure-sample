import React from 'react'
import {Text, View, Platform} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {Button, Progress, Loading} from '~/components'
import ProActions from '~/actions/product'
import {Colors, Metrics} from '~/theme'
import styles from './style'
import {ScrollView} from 'react-native-gesture-handler'

const IntroScreen = ({route, navigation}) => {
  const navData = route.params.data
  const type = route.params.type
  const modules = useSelector((state) => state.product.chapters)
  const status = useSelector((state) => state.product.status)
  const chapters = modules[navData?.ancestry]?.children
  let data = navData

  if (type == 'all') {
    data = {...data, is_subscribed: navData.is_subscribed}
  } else {
    let chapter = chapters.filter((item) => {
      return item.id == navData.id
    })[0]
    data = {...data, ...chapter}
  }
  const content = route.params.content
  navigation.setOptions({
    headerTitle: () => (
      <View style={styles.header}>
        <Text numberOfLines={1} style={styles.logo}>
          {data?.title || data?.module?.title}
        </Text>
        <Text style={styles.details}>Chapters</Text>
      </View>
    ),
    headerStyle: {
      backgroundColor: Colors.primary,
      height: Platform.OS === 'ios' ? (Platform.isPad ? 150 : 120) : 102,
    },
  })

  const dispatch = useDispatch()
  const handleStudy = () => {
    if (data.is_subscribed) {
      if (type == 'all') {
        navigation.navigate('Quiz', {
          data,
          content,
          type,
          mode: 'study',
        })
      } else {
        dispatch(ProActions.getquizRequest(data.id))
        navigation.navigate(data.actable_type || data.type, {
          data,
          mode: 'study',
        })
      }
    } else {
      dispatch(ProActions.getresultsRequest(data.id))
      navigation.navigate('Result', {data})
    }
  }
  const handleContinue = () => {
    if (data.is_subscribed) {
      if (type == 'all') {
        navigation.navigate('Quiz', {
          data,
          content,
          type,
          mode: 'exam',
        })
      } else {
        dispatch(ProActions.getquizRequest(data.id))
        navigation.navigate(data.actable_type || data.type, {
          data,
          mode: 'exam',
        })
      }
    } else {
      dispatch(ProActions.getresultsRequest(data.id))
      navigation.navigate('Result', {data})
    }
  }

  return status === 'pending' ? (
    <Loading animated hasBack type="secondary" />
  ) : (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{data?.title}</Text>
        {type != 'all' && (
          <Progress
            total={data.children_count}
            current={data.status == 'Completed' ? 0 : data.view_count}
            style={styles.progress}
          />
        )}
        <Text style={styles.title}>INSTRUCTIONS</Text>
        <Text style={styles.desc}>
          The quizzes consists of questions carefully designed to help you
          self-assess your comprehension of the information presented on the
          topics covered in the module.
        </Text>
      </View>
      <View
        style={[
          styles.controls,
          {flexDirection: Platform.OS === 'ios' ? 'column' : 'row'},
        ]}
      >
        <Button
          text="STUDY MODE"
          labelStyle={styles.studyLabel}
          style={[
            styles.study,
            Platform.OS === 'ios'
              ? {}
              : {flex: 1, marginRight: Metrics.spacing.three},
          ]}
          onPress={handleStudy}
        />
        <Button
          text={
            data.status === 'Not Started' ||
            data.status === 'Completed' ||
            data.status == null
              ? 'LAUNCH'
              : 'CONTINUE'
          }
          style={[
            styles.rbutton,
            Platform.OS === 'ios'
              ? {}
              : {flex: 1, marginLeft: Metrics.spacing.three},
          ]}
          onPress={handleContinue}
        />
      </View>
    </ScrollView>
  )
}

export default IntroScreen
