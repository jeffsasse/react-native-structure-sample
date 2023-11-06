import {StyleSheet} from 'react-native'
import {Colors, Metrics} from '~/theme'
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize'
import {scale, verticalScale, moderateScale} from 'react-native-size-matters'

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
  },
  scene: {
    flex: 1,
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Metrics.spacing.four,
    paddingBottom: Metrics.spacing.four,
  },
  logo: {
    width: scale(70), //77
    height: (scale(70) * 89) / 77, //89
  },
  goback: {
    position: 'absolute',
    left: Metrics.spacing.three,
    top: Metrics.spacing.four,
  },
  appname: {
    fontSize: RFValue(7, 360), // 20
    fontWeight: '600',
  },
  body: {
    flex: 3,
    backgroundColor: 'white',
    borderTopLeftRadius: Metrics.spacing.two,
    borderTopRightRadius: Metrics.spacing.two,
    padding: 20,
  },
  login: {
    marginTop: 40,
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Metrics.spacing.three,
    paddingBottom: Metrics.spacing.three,
  },
  signup: {
    marginLeft: Metrics.spacing.two,
  },
  subtitle: {
    fontFamily: 'TradeGothic',
    fontSize: RFValue(6, 360), // 16
    textDecorationStyle: 'solid',
    textDecorationColor: 'black',
    textDecorationLine: 'underline',
    marginTop: Metrics.spacing.three,
  },
  forgot: {
    fontFamily: 'TradeGothic',
    fontSize: RFValue(6, 360), // 16
    textDecorationStyle: 'solid',
    textDecorationColor: 'black',
    textDecorationLine: 'underline',
    marginTop: Metrics.spacing.four,
  },
  modaldesc: {
    alignItems: 'center',
  },
  modaltitle: {
    fontFamily: 'TradeGothic',
    fontSize: RFValue(5.5, 360), // 16
    color: Colors.grey,
    lineHeight: 24,
  },
  row: {
    flexDirection: 'row',
  },
  modallabel: {
    fontFamily: 'TradeGothic',
    fontSize: RFValue(6, 360), //16
    color: Colors.grey,
    lineHeight: 24,
    textDecorationStyle: 'solid',
    textDecorationColor: Colors.grey,
    textDecorationLine: 'underline',
  },
  modaland: {
    fontFamily: 'TradeGothic',
    fontSize: RFValue(5.5, 360), //16
    lineHeight: 24,
    color: Colors.grey,
    marginLeft: Metrics.spacing.two,
    marginRight: Metrics.spacing.two,
  },
  modal: {
    flex: 1,
  },
  modalcontent: {
    backgroundColor: 'white',
    borderRadius: Metrics.spacing.two,
    marginTop: Metrics.spacing.five,
    paddingHorizontal: Metrics.spacing.three,
    paddingVertical: Metrics.spacing.four,
    width: 'auto',
    height: '75%',
  },
  mtitle: {
    fontFamily: 'TradeGothicLTPro-Bold',
    fontSize: RFValue(10, 360), //26
  },
  mupdate: {
    fontFamily: 'TradeGothic',
    fontSize: RFValue(6, 360), //16
    marginTop: Metrics.spacing.one,
  },
  mdesc: {
    fontFamily: 'TradeGothic',
    fontSize: RFValue(6, 360), //16
    marginTop: Metrics.spacing.four,
  },
  mdesc0: {
    fontFamily: 'TradeGothic',
    fontSize: RFValue(6, 360), //16
  },
  mpview: {
    flexDirection: 'row',
    marginTop: Metrics.spacing.four,
  },
  mppview: {
    flexDirection: 'row',
    marginTop: 5,
  },
  mdot: {
    fontFamily: 'TradeGothic',
    fontSize: RFValue(6, 360), //16
    marginTop: 1,
    paddingLeft: Metrics.spacing.three,
  },
  mparagraph: {
    fontFamily: 'TradeGothic',
    fontSize: RFValue(6, 360), //16
    paddingLeft: Metrics.spacing.three,
  },
  mlink: {
    color: 'blue',
    fontFamily: 'TradeGothic',
    fontSize: RFValue(6, 360), //16
    textDecorationColor: 'blue',
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
  },
  modalfooter: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
  },
  close: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    marginTop: Metrics.spacing.four,
    marginHorizontal: 'auto',
    width: 60,
    height: 60,
  },
  error: {
    color: Colors.wrong,
    fontFamily: 'TradeGothic',
    fontSize: 14,
    marginTop: Metrics.spacing.two,
  },
  closeicon: {
    width: 20,
    height: 20,
  },
})

export default styles
