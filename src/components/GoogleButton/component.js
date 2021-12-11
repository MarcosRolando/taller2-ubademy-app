import React from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, Text, Image, ActivityIndicator, StyleSheet } from 'react-native'
import colors from '../../styles/colors';

export const GoogleButton = ({ color, backgroundColor, style, onPress, disabled, ...props }) => {
  return (
    <TouchableOpacity style={[
      styles.container,
      {
        opacity: props.disabled ? 0.5 : 1,
        backgroundColor,
      },
      style
    ]}
    onPress={onPress}
    disabled={disabled}
    >
      {props.loading ?
        <ActivityIndicator size={'small'} color={color} /> :
        <View style={{ width: '100%', alignItems: 'center' }}>
          <Image style={styles.logo} source={require('../../../assets/google-logo.png')} />
          <Text style={[styles.label, { color }]}>{props.children}</Text>
        </View>}
    </TouchableOpacity>
  );
}

GoogleButton.propTypes = {
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
}

GoogleButton.defaultProps = {
  color: 'black',
  backgroundColor: colors.primary,
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  logo: {
    position: 'absolute',
    left: 20,
    width: 20,
    height: 20,
    marginRight: 20,
    backgroundColor: 'white',
  },
  label: {
    fontSize: 14,
    fontWeight: '900',
  },
})