///////////////////////////////// Import Dependencies /////////////////////////////////
import { 
    View, 
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../utils/Colors';
import { useContext } from 'react';
import { ShowMenuContext } from '../utils/contexts/ShowMenuContext';
/////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////// Globals /////////////////////////////////
interface DrawerNavigatorProps {
    navigation: any;
    handleDrawer: (arg0: string, arg1: any, arg2: any) => void;
    currentTab: string;
}

const homeIcon = require('../assets/icons/homeIcon.png');
const informationIcon = require('../assets/icons/informationIcon.png');
const logoutIcon = require('../assets/icons/logoutIcon.png');
const profilePhoto = require('../assets/images/profilePhoto.jpeg');
////////////////////////////////////////////////////////////////////////

///////////////////////////////// Component /////////////////////////////////
export default function DrawerNavigator(props: DrawerNavigatorProps) {
    const navigation = props.navigation;
    const handleDrawer = props.handleDrawer;
    const currentTab = props.currentTab;
    const CurrentUser = useSelector((state: any) => state.user.currentUser);
    const dispatch = useDispatch();
    const { showMenu, setShowMenu } = useContext(ShowMenuContext);

    function handleTabButtonPress(title: string, screenName: string | undefined) {
        if (title === "ĐĂNG XUẤT") {
            setShowMenu(false);
            dispatch({
                type: "user/logout",
                payload: null
            });
        }
        else {
            handleDrawer(title, navigation, screenName);
        }
    }

    return (
        <View style={styles.root}>
            <View style={styles.profilePhotoFrame}>
                <Image source={profilePhoto} style={styles.profilePhoto}/>
            </View>
            <Text style={styles.username}>{CurrentUser.username}</Text>
            <Text style={styles.email}>{CurrentUser.email}</Text>
            <View style={{ flexGrow: 1, marginTop: 50 }}>
                <TouchableOpacity style={[styles.tabButton, { backgroundColor: currentTab === "HOME" ? Colors.secondarySix : 'transparent' }]} onPress={() => handleTabButtonPress("HOME", "Home")}>
                    <Image source={homeIcon} style={styles.tabButtonIcon}/>
                    <Text style={styles.tabButtonTitle}>HOME</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={[styles.tabButton, { backgroundColor: currentTab === "THÔNG TIN APP" ? Colors.secondarySix : 'transparent' }]} onPress={() => handleTabButtonPress("THÔNG TIN APP", "Information")}>
                    <Image source={informationIcon} style={styles.tabButtonIcon}/>
                    <Text style={styles.tabButtonTitle}>THÔNG TIN APP</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={[styles.tabButton, { backgroundColor: 'transparent' }]} onPress={() => handleTabButtonPress("ĐĂNG XUẤT", undefined)}>
                    <Image source={logoutIcon} style={styles.tabButtonIcon}/>
                    <Text style={styles.tabButtonTitle}>ĐĂNG XUẤT</Text>
                </TouchableOpacity>
            </View>
        </View>
  )
}
////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////// Styles ///////////////////////////////////
const styles = StyleSheet.create({
    root: {
        minHeight: Dimensions.get('window').height,
        paddingHorizontal: 15,
        paddingTop: 60,
        backgroundColor: Colors.mainTwo
    },

    profilePhoto: {
        width: '100%',
        height: '100%',
        borderRadius: 35,
    },

    profilePhotoFrame: {
        width: 70,
        height: 70,
        borderRadius: 35
    },

    username: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.mainOne,
        marginTop: 20
    },

    email: {
        fontSize: 16,
        color: Colors.mainOne,
        marginTop: 10
    },

    tabButton: {
        width: 190,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingLeft: 13,
        paddingRight: 35,
        borderRadius: 8,
        marginTop: 15,
        marginBottom: 25
    },

    tabButtonIcon: {
        width: 30, 
        height: 30,
        tintColor: Colors.mainOne
    },

    tabButtonTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        paddingLeft: 15,
        color: Colors.mainOne
    }
});
//////////////////////////////////////////////////////////////////////////////////////