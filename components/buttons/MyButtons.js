import React from 'react';
import { FloatingAction } from 'react-native-floating-action';
import { RectButton } from 'react-native-gesture-handler';
import {
  StyleSheet,
  Text,
  Button,
  Platform,
  TouchableOpacity,
} from 'react-native';

import { Colors } from 'theme';
import { FONT_FAMILY_ROBOTO } from 'theme/typography';

export const LoginButton = ({
  title,
  color,
  textColor,
  onPress,
  rounded,
  size,
}) => {
  return (
    <>
      {Platform.OS === 'android' ? (
        <RectButton
          onPress={onPress}
          style={[
            styles.center,
            styles.innerBtn,
            {
              zIndex: 2,
              backgroundColor: color,
              borderRadius: rounded ? 10 : 0,
              height: size === 'small' ? 40 : 50,
            },
          ]}
          activeOpacity={0.8}
        >
          <Text style={[styles.btnText, { color: textColor }]}>{title}</Text>
        </RectButton>
      ) : (
        <Button onPress={onPress} color={color} title={title} />
      )}
    </>
  );
};

export const FloatingButton = ({
  actions,
  onPressItem,
  color,
  floatingIcon,
  ...otherPorps
}) => {
  return (
    <FloatingAction
      actions={actions}
      onPressItem={onPressItem}
      color={color}
      floatingIcon={floatingIcon}
      {...otherPorps}
    />
  );
};

const _SIZE = 50;

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerBtn: {
    width: '100%',
  },
  skillButton: {
    flex: 1,
    height: _SIZE,
    borderRadius: _SIZE / 2,
  },
  actionsButton: {
    borderWidth: 1,
    width: _SIZE,
    marginLeft: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: _SIZE / 2,
  },
  btnText: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: FONT_FAMILY_ROBOTO,
  },
});
