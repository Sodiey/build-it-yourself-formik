import React, { useState, useRef, createContext } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { LoginButton } from 'components/buttons';
// import { FloatingButton } from 'components/buttons';
import { Picker } from '@react-native-picker/picker';

import {
  FONT_FAMILY_ROBOTO,
  FONT_SIZE_INPUT,
  FONT_SIZE_LABEL,
} from 'theme/typography';

import { Colors } from 'theme';
const FormikData = createContext({});

export const Field = ({
  name,
  inputStyle,
  containerStyles,
  focusNext,
  label,
  ...otherProps
}) => {
  return (
    <FormikData.Consumer>
      {(props) => {
        const {
          handleChange,
          handleBlur,
          onValidateAt,
          registeredField,
          values,
          error,
          setFocus,
          focused,
        } = props;
        return (
          <View style={containerStyles}>
            {label && (
              <Text style={styles.defaultLabelStyle}>{label || name}</Text>
            )}
            <TextInput
              value={values[name]}
              ref={registeredField(name)}
              onSubmitEditing={setFocus(focusNext)}
              onChangeText={handleChange(name)}
              onBlur={handleBlur(name)}
              onFocus={setFocus(name)}
              onEndEditing={onValidateAt.bind(this, name)}
              returnKeyType={focusNext ? 'next' : 'done'}
              style={[
                { ...styles.defaultStyle, ...inputStyle },
                {
                  borderColor:
                    focused === name ? Colors.SECONDARY : Colors.INPUT_TEXT,
                },
              ]}
              {...otherProps}
            />
            {error[name] && (
              <Text
                style={{ color: Colors.ERROR, fontFamily: FONT_FAMILY_ROBOTO }}
              >
                {error[name]}
              </Text>
            )}
          </View>
        );
      }}
    </FormikData.Consumer>
  );
};

export const Select = ({ name, containerStyles, label, focusNext, items }) => {
  return (
    <FormikData.Consumer>
      {({ handleChange, values, setFocus, focused, registeredField }) => {
        registeredField(name).call(this, {
          select: 'noref',
          focus: () => {},
        });
        return (
          <View style={containerStyles}>
            {label && <Text style={styles.defaultLabelStyle}>{label}</Text>}
            <View
              style={{
                borderWidth: 1,
                borderColor:
                  focused === name ? Colors.SECONDARY : Colors.INPUT_TEXT,
                borderRadius: 10,
              }}
            >
              <Picker
                selectedValue={values[name]}
                mode="dropdown"
                onValueChange={(itemValue) => {
                  setFocus(focusNext).call(this);
                  handleChange(name).call(this, itemValue);
                }}
                style={styles.defaultStyle}
              >
                {items.map((val, i) => (
                  <Picker.Item label={`${val}`} value={val} key={i} />
                ))}
              </Picker>
            </View>
          </View>
        );
      }}
    </FormikData.Consumer>
  );
};

export const Debug = () => (
  <View style={styles.container}>
    <View style={styles.inner}>
      <Text style={styles.forminText}>Formik State</Text>
    </View>
    <FormikData.Consumer>
      {({ handleChange, handleBlur, handleSubmit, ...rest }) => (
        <Text style={styles.dataText}>
          {JSON.stringify(rest.error, null, 2)}
        </Text>
      )}
    </FormikData.Consumer>
  </View>
);

export const FormButton = (props) => {
  return (
    <FormikData.Consumer>
      {({ handleSubmit }) => (
        <>
          {props.loading ? (
            <ActivityIndicator size="large" color={Colors.PRIMARY} />
          ) : (
            <LoginButton
              title={props.title}
              color={props.color}
              textColor={props.textColor}
              onPress={handleSubmit}
            />
          )}
        </>
      )}
    </FormikData.Consumer>
  );
};

// export const FormFloatButton = (props) => {
//   return (
//     <FormikData.Consumer>
//       {({ handleSubmit }) => (
//         <FloatingButton
//           actions={props.actions}
//           onPressItem={handleSubmit}
//           color={props.color}
//           floatingIcon={
//             props.loading && (
//               <ActivityIndicator size="large" color={Colors.WHITE} />
//             )
//           }
//         />
//       )}
//     </FormikData.Consumer>
//   );
// };

export const CustomFormik = (props) => {
  const [formData, setFormData] = useState({
    values: props.initialValues || {},
    touched: {},
    error: {},
    focused: undefined,
    isSubmiting: false,
  });
  const fieldRegistry = useRef({});

  const registeredField = (name) => (ref) => {
    if (fieldRegistry.current) {
      fieldRegistry.current[name] = { ref };
    }
  };

  const unregisterField = (name) => () => {
    delete fieldRegistry.current[name];
  };

  const handleChange = (name) => (text) => {
    setFormData((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [name]: text,
      },
    }));
  };
  const handleBlur = (name) => (text) => {
    setFormData((prev) => ({
      ...prev,
      touched: {
        ...prev.touched,
        [name]: true,
      },
    }));
  };
  const setFocus = (name) => () => {
    if (fieldRegistry.current) {
      setFormData((prev) => ({
        ...prev,
        focused: name,
      }));
      if (name) fieldRegistry.current[name].ref.focus();
    }
  };
  function setErros(name, message) {
    setFormData((prev) => ({
      ...prev,
      error: {
        ...prev.error,
        [name]: message,
      },
    }));
  }

  // function setIsSubmiting(value) {
  //   setFormData((prev) => ({
  //     ...prev,
  //     isSubmiting: value,
  //   }));
  // }

  async function onValidateAt(name) {
    try {
      await props.validationShema.validateAt(name, formData.values).then(() => {
        setFormData((prev) => ({
          ...prev,
          error: {
            ...prev.error,
            [name]: undefined,
          },
        }));
      });
    } catch (err) {
      // err.inner.forEach((e) => {
      //   setErros(e.path, e.message);
      // });
      setErros(err.path, err.message);
    }
  }

  async function onValidate() {
    try {
      await props.validationShema
        .validate(formData.values, { abortEarly: false })
        .then(() => {
          setFormData((prev) => ({
            ...prev,
            error: {},
          }));
        });
    } catch (err) {
      err.inner.forEach((e) => {
        setErros(e.path, e.message);
      });
    }
  }

  async function handleSubmit() {
    if (props.validationShema) {
      onValidate();
      await props.validationShema
        .isValid(formData.values)
        .then(function (valid) {
          if (valid) props.onSumbit({ ...formData });
        });
    } else {
      props.onSumbit({ ...formData });
    }
  }

  function checkChildren() {
    if (typeof props.children === 'object') {
      return props.children;
    } else {
      return props.children({ ...formData });
    }
  }

  return (
    <FormikData.Provider
      value={{
        ...formData,
        handleChange,
        handleBlur,
        handleSubmit,
        onValidateAt,
        registeredField,
        setFocus,
      }}
    >
      {checkChildren()}
    </FormikData.Provider>
  );
};

const styles = StyleSheet.create({
  defaultStyle: {
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    color: Colors.TEXT,
    fontSize: FONT_SIZE_INPUT,
    fontFamily: FONT_FAMILY_ROBOTO,
  },
  defaultLabelStyle: {
    fontFamily: FONT_FAMILY_ROBOTO,
    color: Colors.DIM_GRAY,
    fontSize: FONT_SIZE_LABEL,
    marginVertical: 10,
    textTransform: 'capitalize',
  },
  container: {
    marginVertical: 3,
    marginHorizontal: 1,
    borderRadius: 4,
    backgroundColor: '#f6f8fa',
  },
  inner: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    backgroundColor: '#555',
    color: '#fff',
  },
  forminText: {
    letterSpacing: 1,
    padding: 10,
    fontSize: 21,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  dataText: {
    fontSize: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});
