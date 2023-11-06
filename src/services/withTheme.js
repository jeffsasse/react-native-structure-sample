import 'react-native-gesture-handler'
import React from 'react'
import {useSelector} from 'react-redux'
import {Provider, DefaultTheme} from 'react-native-paper'
import _ from 'lodash'
import {type} from '@config'

const withTheme = (Component) => {
  return function (props) {
    const route = props.route.name
    let customTheme = DefaultTheme
    const module = useSelector((state) => state.product.module)
    const configurations = module?.product?.configurations
    if (type === 'bundle' && route !== 'Bundle' && route !== 'Login') {
      customTheme =
        configurations && !_.isEmpty(configurations)
          ? {...customTheme, ...configurations}
          : customTheme
    } else if (type === 'single' && route !== 'Login') {
      customTheme = !_.isEmpty(configurations)
        ? {...customTheme, ...configurations}
        : customTheme
    } else {
      customTheme = DefaultTheme
    }

    return (
      <Provider theme={customTheme}>
        <Component theme={customTheme} {...props} />
      </Provider>
    )
  }
}

export default withTheme
