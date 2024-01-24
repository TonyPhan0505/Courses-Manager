import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    Image 
} from 'react-native'
import React from 'react'

interface Props {
  handleDrawer: any;
  showMenu: any;
  screenTitle: string;
  navigation: any;
  payload: any;
}

const hamburgerIcon = require('../assets/icons/hamburgerIcon.png');
const closeIcon = require('../assets/icons/closeIcon.png');
const backArrowIcon = require('../assets/icons/backArrowIcon.png');
const plusIcon = require('../assets/icons/plusIcon.png');

const specialScreens = [
  "TẠO MỚI KHOÁ HỌC",
  "QUẢN LÝ BUỔI HỌC",
  "TẠO MỚI BUỔI HỌC",
  "SỬA KHOÁ HỌC",
  "SỬA BUỔI HỌC"
];

export default function TopBar(props: Props) {
    const { handleDrawer, showMenu, screenTitle, navigation, payload } = props;
  
    return (
      <View style={styles.topBar}>
        <View style={[styles.topBox, { width: '15%', justifyContent: 'center', paddingLeft: 15 }]}>
          {
            !specialScreens.includes(screenTitle) ?
              <TouchableOpacity onPress={handleDrawer}>
                <Image source={ !showMenu ? hamburgerIcon : closeIcon } style={styles.menuHandlerIcon}/>
              </TouchableOpacity>
            : 
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={backArrowIcon} style={{ width: 25, height: 25, marginLeft: 5 }}/>
              </TouchableOpacity>
          }
        </View>
        <View style={[styles.topBox, { width: '70%', justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={styles.screenName}>{ screenTitle }</Text>
        </View>
        <View style={[styles.topBox, { width: '15%', justifyContent: 'center', alignItems: 'flex-end', paddingRight: 15 }]}>
        {
          screenTitle === "QUẢN LÝ KHOÁ HỌC" || screenTitle === "QUẢN LÝ BUỔI HỌC" ?
            <TouchableOpacity onPress={() => navigation.navigate(
              screenTitle === "QUẢN LÝ KHOÁ HỌC" ?
                "CreateCourse"
              : "CreateClass", payload ? {
                courseId: payload.courseId
              } : null
            )}>
              <Image source={plusIcon} style={styles.plusSign}/>
            </TouchableOpacity>
          : null
        }
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    topBar: {
        maxWidth: 450,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30
    },

    topBox: {
        height: '100%'
    },

    menuHandlerIcon: {
        width: 37,
        height: 37
    },

    screenName: {
        fontSize: 18,
        fontWeight: 'bold'
    },

    plusSign: {
        width: 30,
        height: 30
    }
});