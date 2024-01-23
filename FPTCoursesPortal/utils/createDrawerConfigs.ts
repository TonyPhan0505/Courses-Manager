////////////////////////////// Import dependencies //////////////////////////////
import { Animated } from 'react-native';
import { useContext, useRef } from 'react';
import { ShowMenuContext } from './contexts/ShowMenuContext';
///////////////////////////////////////////////////////////////////////////////

////////////////////////////// Main //////////////////////////////
export default function createDrawerConfigs() {
    const { showMenu, setShowMenu } = useContext(ShowMenuContext);
    const offsetValue = useRef(new Animated.Value(0)).current;
    const scaleValue = useRef(new Animated.Value(1)).current;
    const closeButtonOffset = useRef(new Animated.Value(0)).current;

    function handleDrawer(title: string, navigation: any, nextScreenName: string) {
        Animated.timing(scaleValue, {
            toValue: showMenu ? 1 : 0.88,
            duration: 300,
            useNativeDriver: true
        })
            .start()

        Animated.timing(offsetValue, {
            toValue: showMenu ? 0 : 230,
            duration: 300,
            useNativeDriver: true
        })
            .start()

        Animated.timing(closeButtonOffset, {
            toValue: !showMenu ? -30 : 0,
            duration: 300,
            useNativeDriver: true
        })
            .start()
        setShowMenu(!showMenu);
        if (nextScreenName) {
            navigation.navigate(nextScreenName);
        }
    }

    return { offsetValue, scaleValue, closeButtonOffset, handleDrawer };
}
///////////////////////////////////////////////////////////////////////////////