import {StyleSheet} from 'react-native'
import {Colors, Metrics} from '~/theme'
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize'
import {scale, verticalScale, moderateScale} from 'react-native-size-matters'

const styles = StyleSheet.create({
  label: {
    color: 'white',
    fontSize: RFValue(8, 360), // 20
    fontFamily: 'TradeGothicLTPro-Bold',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: Metrics.spacing.two,
    borderColor: 'rgb(0,52,112)',
    borderWidth: 1,
    shadowColor: 'rgba(106,117,172,0.3)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    width: 'auto',
    height: 65, // 65
  },
})

export default styles
