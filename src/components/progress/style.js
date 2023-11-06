import {StyleSheet} from 'react-native'
import {Colors, Metrics} from '~/theme'
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize'
import {scale, verticalScale, moderateScale} from 'react-native-size-matters'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 'auto',
  },
  title: {
    fontFamily: 'TradeGothic',
    fontSize: RFValue(5, 360), // 13,
  },

  content: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: Metrics.spacing.two,
  },

  primary: {
    backgroundColor: Colors.primary,
    height: scale(11),
  },
  secondary: {
    backgroundColor: '#EAF1FF',
    height: scale(11),
  },
})

export default styles
