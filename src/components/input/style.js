import {StyleSheet} from 'react-native'
import {Colors, Metrics} from '~/theme'
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize'
import {scale, verticalScale, moderateScale} from 'react-native-size-matters'

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  label: {
    fontFamily: 'TradeGothic',
    fontSize: RFValue(6, 360), // 16
    marginBottom: Metrics.spacing.two,
  },
  input: {
    backgroundColor: 'white',
    borderColor: Colors.secondary,
    borderWidth: 1,
    borderRadius: Metrics.spacing.two,
    color: '#000000',
    fontFamily: 'TradeGothic',
    fontSize: RFValue(6, 360), // 16
    paddingHorizontal: 20,
    height: 65,
  },
  disabled: {
    backgroundColor: 'rgb(246,248,252)',
  },
  error: {
    color: Colors.wrong,
    fontFamily: 'TradeGothic',
    fontSize: RFValue(5, 360), // 14
    marginTop: Metrics.spacing.two,
  },
})

export default styles
