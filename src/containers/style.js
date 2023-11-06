import {StyleSheet} from 'react-native'
import {Colors, Metrics} from '~/theme'
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize'
import {scale, verticalScale, moderateScale} from 'react-native-size-matters'

const styles = StyleSheet.create({
  navLabel: {
    fontFamily: 'TradeGothic',
    fontSize: RFValue(5, 360), // 13
    marginTop: 10,
  },
  navStyle: {
    borderTopColor: Colors.secondary,
    borderTopWidth: 1,
    height: Platform.OS === 'ios' ? 90 : 75,
    paddingBottom: Platform.OS === 'ios' ? 25 : 13,
  },
  tabScreenStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: 'transparent',
    borderTopWidth: 2,
    width: 70,
  },

  tabImageStyle: {
    marginTop: 15,
    tintColor: Colors.secondary,
    width: 27,
    height: 24,
  },
})

export default styles
