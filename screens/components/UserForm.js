import React from 'react';
//COMPONENTS
import { StyleSheet, View, Dimensions, ScrollView } from 'react-native';
import { CustomFormik, Field, FormButton } from 'services/CustomFormik';
import { Container } from 'components/containers';

//ASSETS
import * as yup from 'yup';
import { Colors } from 'theme';

const { height, width } = Dimensions.get('window');

const UserForm = () => {
  return (
    <CustomFormik
      initialValues={{
        // email: '',
        // password: '',
        email: 'name.email@gmail.com',
        password: '123456',
      }}
      validationShema={yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required(),
      })}
      onSumbit={({ values }) => {
        console.log(values);
      }}
    >
      <Container style={styles.container}>
        <ScrollView
          contentContainerStyle={{
            height: height / 2.2,
          }}
        >
          <View style={styles.form}>
            <View style={styles.formControl}>
              <Field
                name="email"
                containerStyles={{ marginVertical: 20 }}
                keyboardType="email-address"
                placeholder="email"
                placeholderTextColor={Colors.INPUT_TEXT}
                focusNext="password"
                autoCapitalize="none"
              />
              <Field
                name="password"
                placeholder="password"
                placeholderTextColor={Colors.INPUT_TEXT}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>
            <View style={styles.buttonContainer}>
              <FormButton
                // loading={loading}
                title="Login"
                color={Colors.SECONDARY}
                textColor={Colors.WHITE}
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
    // justifyContent: 'space-between',
    flex: 1,
    // ...debug,
  },
  formControl: {
    justifyContent: 'center',
    flex: 1,
    // ...debug,
    // marginBottom: 80,
  },
  buttonContainer: {
    marginTop: 20,
    // flex: 1,
  },
});

export default UserForm;
