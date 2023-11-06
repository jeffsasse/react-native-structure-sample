import {Dimensions, Platform, StyleSheet} from 'react-native'
import {Colors, Metrics} from '~/theme'
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize'
import {scale, verticalScale, moderateScale} from 'react-native-size-matters'

const width = Dimensions.get('screen').width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.primary,
    alignItems: Platform.OS === 'ios' ? 'center' : 'flex-start',
    width: width - 140,
  },
  logo: {
    color: 'white',
    fontFamily: 'TradeGothicLTPro-Bold',
    fontSize: RFValue(11, 360), //26
  },
  details: {
    color: 'white',
    fontFamily: 'TradeGothic',
    fontSize: RFValue(6, 360), //16,
    marginTop: Metrics.spacing.two,
  },
  content: {
    flex: 3,
    padding: Metrics.spacing.three,
  },
  title: {
    fontFamily: 'TradeGothicLTPro-Bold',
    fontSize: RFValue(6, 360), //16
    marginBottom: Metrics.spacing.three,
    textTransform: 'uppercase',
  },
  progress: {
    marginBottom: Metrics.spacing.five,
  },
  desc: {
    fontFamily: 'TradeGothic',
    fontSize: RFValue(7, 360), //18
    lineHeight: 26,
  },
  controls: {
    flex: 2,
    padding: Metrics.spacing.three,
  },
  study: {
    backgroundColor: Colors.background,
    borderColor: Colors.primary,
    borderWidth: 2,
    marginBottom: Metrics.spacing.four,
  },
  studyLabel: {
    color: Colors.primary,
  },
})

export default styles
