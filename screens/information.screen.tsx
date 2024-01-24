//////////////////////////////// Import dependencies ////////////////////////////////
import { StyleSheet, Dimensions, Animated, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useContext } from 'react';
import TopBar from '../components/TopBar';
import Colors from '../utils/Colors';
import DrawerNavigator from '../navigators/DrawerNavigator';
import { ShowMenuContext } from '../utils/contexts/ShowMenuContext';
import createDrawerConfigs from '../utils/createDrawerConfigs';
////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////// Globals ////////////////////////////////
interface Props {
  navigation: any;
}
////////////////////////////////////////////////////////////////////////

//////////////////////////////// Component ////////////////////////////////
export default function InformationScreen(props: Props) {
  const navigation = props.navigation;
  const { showMenu } = useContext(ShowMenuContext);
  const { offsetValue, scaleValue, closeButtonOffset, handleDrawer } = createDrawerConfigs();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={ showMenu ? "light-content" : "dark-content" }/>
      <DrawerNavigator 
        navigation={navigation} 
        handleDrawer={handleDrawer}
        currentTab="THÔNG TIN APP"
      />
      <Animated.View style={[
        styles.animatedView,
        {transform: [
          { scale: scaleValue },
          { translateX: offsetValue }
        ],
        borderRadius: showMenu ? 15 : 0
      }]}>
        <Animated.View style={{
          transform: [{
            translateY: closeButtonOffset
          }],
          alignItems: 'center'
        }}>
          <TopBar 
            handleDrawer={handleDrawer} 
            showMenu={showMenu}
            screenTitle="THÔNG TIN APP"
            navigation={navigation}
            payload={undefined}
          />
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  )
}
////////////////////////////////////////////////////////////////////////

//////////////////////////////// Styles ////////////////////////////////
const styles = StyleSheet.create({
  safeArea: {
    minHeight: Dimensions.get('window').height,
    backgroundColor: Colors.mainTwo
  },

  animatedView: {
    flexGrow: 1,
    maxWidth: 450,
    backgroundColor: Colors.mainOne,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 15,
    paddingVertical: 60
  }
});
////////////////////////////////////////////////////////////////////////