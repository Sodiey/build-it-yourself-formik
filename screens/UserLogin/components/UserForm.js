import React from 'react';
//COMPONENTS
import { StyleSheet, View, Dimensions, ScrollView, Alert } from 'react-native';
import { CustomFormik, Field, FormButton, Select } from 'services/CustomFormik';
import { Container } from 'components/containers';
import { LoginButton } from 'components/buttons';

//ASSETS
import * as yup from 'yup';
import { Colors } from 'theme';

const { height, width } = Dimensions.get('window');

const UserForm = ({ handleSignUp, isLogin }) => {
  var initialValues;
  if (isLogin) {
    initialValues = {
      email: '',
      password: '',
    };
  } else {
    initialValues = {
      email: 'sotiris.karapo@gmail.com',
      password: '123456',
      gender: 'male',
    };
  }

  const initialValuesKeys = Object.keys(initialValues);

  return (
    <CustomFormik
      initialValues={initialValues}
      validationShema={yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required(),
      })}
      onSumbit={({ values }) => {
        if (!isLogin) {
          handleSignUp();
          return;
        }
        Alert.alert('Authenticated User', `${values.email} has logged in`, [
          { text: 'okay' },
        ]);
      }}
    >
      <Container style={styles.container}>
        <ScrollView
          contentContainerStyle={{
            height: isLogin ? height / 2 : height / 1.3,
          }}
        >
          <View style={styles.form}>
            <View style={styles.formControl}>
              {initialValuesKeys.map((input, i) => {
                if (input === 'gender') {
                  return (
                    <Select
                      key={i}
                      name={input}
                      items={['male', 'female']}
                      label={input}
                      containerStyles={{ marginVertical: 0 }}
                      focusNext={initialValuesKeys[i + 1]}
                    />
                  );
                }
                return (
                  <Field
                    key={i}
                    name={input}
                    label={!isLogin && input}
                    containerStyles={{ marginVertical: 10 }}
                    secureTextEntry={input === 'password'}
                    keyboardType={
                      input === 'email' ? 'email-address' : 'default'
                    }
                    placeholder={input}
                    placeholderTextColor={Colors.INPUT_TEXT}
                    focusNext={initialValuesKeys[i + 1]}
                    autoCapitalize="none"
                  />
                );
              })}
            </View>
            <View style={styles.buttonContainer}>
              <FormButton
                // loading={loading}
                title={isLogin ? 'Login' : 'Sign Up'}
                color={Colors.SECONDARY}
                textColor={Colors.WHITE}
              />
              <LoginButton
                title={isLogin ? 'Switch to Sign up' : 'Switch to Log in'}
                textColor={Colors.SECONDARY}
                onPress={handleSignUp}
              />
            </View>
          </View>
        </ScrollView>
      </Container>
    </CustomFormik>
  );
};

const debug = {
  borderWidth: 2,
  borderColor: 'red',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    justifyContent: 'flex-end',
    marginBottom: 25,
  },
  form: {
    flex: 1,
    // ...debug,
  },
  formControl: {
    justifyContent: 'center',
    flex: 0.9,
    // ...debug,
  },
  buttonContainer: {
    marginTop: 10,
    // flex: 1,
  },
});

export default UserForm;
