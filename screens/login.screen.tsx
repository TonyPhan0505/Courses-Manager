import { useEffect, useState } from 'react';
import {  
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Alert,
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../utils/Colors';
import { useDispatch, useSelector } from 'react-redux'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const deviceWidth = Dimensions.get('window').width;
const fieldWidth = deviceWidth > 350 ? 340 : 300;
const fieldHeight = 38;
const deviceHeight = Dimensions.get('window').height;

const userIcon = require('../assets/icons/userIcon.png');
const logoImage = require('../assets/images/logo.png');
const copyrightImage = require('../assets/images/copyright.png');
const lockIcon = require('../assets/icons/lockIcon.png');
const eyeSlashIcon = require('../assets/icons/eyeSlashIcon.png');
const eyeIcon = require('../assets/icons/eyeIcon.png');
const checkCircleIcon = require('../assets/icons/checkCircleIcon.png');
const circleOutlineIcon = require('../assets/icons/circleOutlineIcon.png');

export default function LoginScreen() {
    const [ formSubmitted, setFormSubmitted ] = useState(false);
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ passwordHidden, setPasswordHidden ] = useState(true);
    const [ remember, setRemember ] = useState(false);
    const dispatch = useDispatch();
    const isSignedIn = useSelector((state: any) => state.user.isSignedIn);

    function login() {
      dispatch({
        type: "user/login",
        payload: {
          username: username,
          password: password
        }
      });
      setFormSubmitted(false);
    }

    function loginWithAzure() {
      Alert.alert("FIS Insight", "Chức năng này hiện chưa được hỗ trợ.");
    }

    useEffect(() => {
      if (isSignedIn === 0) {
        Alert.alert("Fis Insight", "Thông tin đăng nhập không đúng");
      }
    }, [isSignedIn]);

    useEffect(() => {
      const checkCachedCredentials = async () => {
        const username = await AsyncStorage.getItem('username');
        const password = await AsyncStorage.getItem('password');
        if (username && password) {
          setRemember(true);
          setUsername(username);
          setPassword(password);
        }
      };
      checkCachedCredentials();
    }, []);

    useEffect(() => {
      async function cacheCredentials() {
        await AsyncStorage.setItem('username', username);
        await AsyncStorage.setItem('password', password);
      }
      if (remember && username && password) {
        cacheCredentials();
      }
    }, [remember]);

    useEffect(() => {
      if (formSubmitted) {
        if (username && password) {
          login();
        } else {
          Alert.alert("FPT Insight", "Bạn chưa nhập đủ thông tin đăng nhập");
          setFormSubmitted(false);
        }
      }
    }, [formSubmitted]);

    return (
      <SafeAreaView style={{ height: '100%', backgroundColor: Colors.mainOne }}>
        <StatusBar barStyle="dark-content"/>
        <ScrollView contentContainerStyle={styles.root}>
            <Image source={logoImage} style={styles.logo}/>
            <View style={styles.inputFieldFrame}>
                <Image source={userIcon} style={styles.userIcon} />
                <TextInput 
                    style={styles.inputField}
                    textAlign="center"
                    placeholder="Tài khoản"
                    placeholderTextColor={Colors.secondaryOne}
                    value={username}
                    onChangeText={(data) => setUsername(data)}
                    autoCapitalize='none'
                />
            </View>
            <View style={styles.inputFieldFrame}>
                <Image source={lockIcon} style={styles.lockIcon}/>
                <TextInput 
                    style={styles.inputField}
                    textAlign="center"
                    placeholder="Mật khẩu"
                    placeholderTextColor={Colors.secondaryOne}
                    value={password}
                    onChangeText={(data) => setPassword(data)}
                    secureTextEntry={passwordHidden}
                    autoCapitalize='none'
                />
                <TouchableOpacity onPress={() => setPasswordHidden(!passwordHidden)}>
                    <Image source={ passwordHidden ? eyeSlashIcon : eyeIcon } style={styles.eyeIcon}/>
                </TouchableOpacity>
            </View>
            <View style={styles.rememberFrame}>
                <TouchableOpacity onPress={() => setRemember(!remember)}>
                    <Image source={ remember ? checkCircleIcon : circleOutlineIcon } style={styles.circleIcon}/>
                </TouchableOpacity>
                <Text style={styles.rememberText}>Ghi nhớ đăng nhập</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => setFormSubmitted(true)}>
                <Text style={styles.buttonText}>ĐĂNG NHẬP</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={loginWithAzure}>
                <Text style={styles.buttonText}>ĐĂNG NHẬP BẰNG AZURE</Text>
            </TouchableOpacity>
            <Image source={copyrightImage} style={styles.copyright}/>
          </ScrollView>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    minHeight: deviceHeight,
    alignItems: 'center',
    justifyContent: deviceWidth > 500 ? 'center' : 'flex-start',
    paddingBottom: 20
  },

  logo: {
    width: 260,
    height: 220,
    marginTop: deviceWidth > 500 ? 0 : 25
  },

  userIcon: {
    width: 20, 
    height: 20, 
    tintColor: Colors.secondaryFive, 
    marginHorizontal: 10
  },

  lockIcon: { 
    marginHorizontal: 10, 
    width: 20, 
    height: 20, 
    tintColor: Colors.secondaryFive 
  },

  eyeIcon: {
    width: 20, 
    height: 20, 
    tintColor: Colors.secondaryFive
  },

  circleIcon: {
    width: 19, 
    height: 19, 
    tintColor: Colors.mainTwo
  },

  inputFieldFrame: {
    width: fieldWidth,
    height: fieldHeight,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.secondarySeven,
    marginTop: 22
  },

  inputField: {
    width: fieldWidth - 80,
    height: '100%',
    color: Colors.secondaryOne,
    fontSize: 17,
    marginRight: 7
  },

  rememberFrame: {
    width: fieldWidth,
    height: fieldHeight,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },

  rememberText: {
    fontSize: 15,
    marginLeft: 8,
    color: Colors.mainTwo
  },

  button: {
    width: fieldWidth,
    height: fieldHeight,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: Colors.secondaryFour
  },

  buttonText: {
    fontWeight: 'bold',
    color: Colors.mainOne
  },

  copyright: {
    width: 310,
    height: 220,
    marginTop: 40
  }
});