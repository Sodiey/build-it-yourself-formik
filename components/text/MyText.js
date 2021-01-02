import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Colors } from 'theme';
import { scaleFont } from 'theme/mixins';
import {
  FONT_FAMILY_ROBOTO,
  FONT_SIZE_14,
  FONT_FAMILY_SANS,
  FONT_FAMILY_POPPINS,
  FONT_WEIGHT_REGULAR,
  FONT_WEIGHT_BOLD,
} from 'theme/typography';

const _newKeys = {
  m: 'margin',
  p: 'padding',
  mh: 'marginHorizontal',
  mv: 'marginVertical',
  ph: 'paddingHorizontal',
  pv: 'paddingVertical',
  mt: 'marginTop',
  mr: 'marginRight',
  mb: 'marginBottom',
  ml: 'marginLeft',
  pt: 'paddingTop',
  pr: 'paddingRight',
  pb: 'paddingBottom',
  pl: 'paddingLeft',
};

function renameKeys(obj, newKeys) {
  const keyValues = Object.keys(obj).map((key) => {
    if (!_newKeys.hasOwnProperty(key)) {
      if (process.env.NODE_ENV === 'development') {
        console.error(
          `${key} is not a valid property, please check CustomText component `
        );
        return;
      }
    }
    const newKey = newKeys[key] || key;
    return { [newKey]: obj[key] };
  });
  return Object.assign({}, ...keyValues);
}

const CustomText = ({
  children,
  style,
  size,
  color,
  paragraph,
  title,
  align,
  spacing,
  isBold,
}) => {
  var renamedObj = {};
  if (spacing) {
    renamedObj = renameKeys(spacing, _newKeys);
  }

  return (
    <Text
      style={[
        styles.text(size, color, align, renamedObj, isBold),
        {
          fontFamily: paragraph
            ? FONT_FAMILY_SANS
            : title
            ? FONT_FAMILY_POPPINS
            : FONT_FAMILY_ROBOTO,
          ...style,
        },
      ]}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: (size, color, align, renamedObj, isBold) => ({
    ...renamedObj,
    color: color ? color : Colors.GRAY_DARK,
    fontWeight: isBold ? FONT_WEIGHT_BOLD : FONT_WEIGHT_REGULAR,
    textAlign: align ? align : 'left',
    fontSize: size ? scaleFont(size) : FONT_SIZE_14,
  }),
});

export default CustomText;
