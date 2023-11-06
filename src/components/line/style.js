import {StyleSheet} from 'react-native'
import {Colors, Metrics} from '~/theme'
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize'
import {scale, verticalScale, moderateScale} from 'react-native-size-matters'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 22,
    borderBottomColor: Colors.secondary,
    borderBottomWidth: 1,
  },
  header: {
    width: 20,
  },
  skipped: {
    backgroundColor: Colors.border,
    borderRadius: 5,
    width: 10,
    height: 10,
  },
  body: {
    flex: 1,
    overflow: 'hidden',
  },
  text: {
    fontFamily: 'TradeGothic',
    fontSize: RFValue(6, 360), // 16,
  },
  footer: {
    marginLeft: Metrics.spacing.three,
    width: 'auto',
  },
  arrow: {
    resizeMode: 'contain',
    width: 12,
    height: 10,
  },
})

export default styles
