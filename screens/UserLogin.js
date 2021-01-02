import React from 'react';

//COMPONENTS
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import CustomText from 'components/text';
import UserForm from './components/UserForm';

//ASSETS
import Constants from 'expo-constants';
import { Colors } from 'theme';
import login from 'assets/login.png';
import logo from 'assets/logo.png';

import Animated, {
  block,
  Clock,
  cond,
  Easing,
  set,
  clockRunning,
  stopClock,
  timing,
  eq,
  startClock,
  useCode,
  Value,
} from 'react-native-reanimated';

const runTiming = (clock, value, dest) => {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    frameTime: new Value(0),
    time: new Value(0),
  };
  const config = {
    toValue: new Value(1),
    duration: 1000,
    easing: Easing.inOut(Easing.ease),
  };
  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    timing(clock, state, config),
    state.position,
  ]);
};

const AnimatedImage = Animated.createAnimatedComponent(Image);

const { height } = Dimensions.get('window');

const UserLogin = ({ navigation }) => {
  const animatedValue = new Animated.Value(0);
  const clock = new Clock();
  useCode(
    () =>
      block([startClock(clock), set(animatedValue, runTiming(clock, 0, 1))]),
    []
  );

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [height, 0],
  });
  const changeFlex = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });

  const changeColor = Animated.interpolateColors(animatedValue, {
    inputRange: [0, 1],
    outputColorRange: ['transparent', Colors.WHITE],
  });

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          ...StyleSheet.absoluteFill,
          flex: 1,
        }}
      >
        <AnimatedImage
          source={login}
          style={[styles.image, { flex: changeFlex }]}
        />
      </View>
      <View style={styles.topContainer}>
        <Image source={logo} />
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.textContainer}>
          <CustomText size={30} title align="center" color={Colors.WHITE}>
            Welcome back!
          </CustomText>
          <CustomText
            align="center"
            size={16}
            color={Colors.WHITE}
            spacing={{
              ph: 20,
              pt: 10,
            }}
          >
            Access your schedule, book lessons, browse and manage your skills.
          </CustomText>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' && 'padding'}
          keyboardVerticalOffset={50}
          style={{ flex: 0.8 }}
        >
          <Animated.View
            style={[
              styles.logInContainer,
              {
                transform: [{ translateY: translateY }],
                backgroundColor: changeColor,
              },
            ]}
          >
            <UserForm />
          </Animated.View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

const debug = {
  borderWidth: 2,
  borderColor: 'red',
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  topContainer: {
    justifyContent: 'flex-end',
    marginTop: Constants.statusBarHeight + 10,
    paddingLeft: 20,
    // flex: 0.4,
  },
  bottomContainer: {
    // flex: 3.6,
    flex: 1,
  },
  textContainer: {
    flex: 0.5,
    justifyContent: 'center',
    // alignItems: 'center',
    // paddingTop: height / 8,
    // paddingBottom: height / 14,
  },
  logInContainer: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    // backgroundColor: Colors.WHITE,
  },
});

export default UserLogin;
