///////////////////////////////// Import Dependencies /////////////////////////////////
import { useContext, useEffect, useState } from 'react';
import { 
  Animated, 
  StyleSheet,
  StatusBar,
  FlatList,
  View,
  Text
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import DrawerNavigator from '../navigators/DrawerNavigator';
import CourseCard from '../components/CourseCard';
import Colors from '../utils/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { getBuildingName } from '../utils/services/building.service';
import { getRoomName } from '../utils/services/room.service';
import TopBar from '../components/TopBar';
import { ShowMenuContext } from '../utils/contexts/ShowMenuContext';
import createDrawerConfigs from '../utils/createDrawerConfigs';
import { CourseObject } from '../redux/slices/course.slice';
import { BuildingObject } from '../redux/slices/building.slice';
import { RoomObject } from '../redux/slices/room.slice';
////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////// Globals /////////////////////////////////
interface HomeProps {
  navigation: any;
};
//////////////////////////////////////////////////////////////////////////

///////////////////////////////// Component /////////////////////////////////
export default function CoursesScreen(props: HomeProps) {
  const navigation = props.navigation;
  const dispatch = useDispatch();
  const { showMenu } = useContext(ShowMenuContext);
  const { offsetValue, scaleValue, closeButtonOffset, handleDrawer } = createDrawerConfigs();
  const [ isFetched, setIsFetched ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(true);

  const [ BuildingsData, setBuildingsData ] = useState<Array<BuildingObject>>([]);
  const [ RoomsData, setRoomsData ] = useState<Array<RoomObject>>([]);
  const [ CoursesData, setCoursesData ] = useState<Array<CourseObject>>([]);

  const courses = useSelector((state: any) => state.course.courses);
  const rooms = useSelector((state: any) => state.room.rooms);
  const buildings = useSelector((state: any) => state.building.buildings);

  useEffect(() => {
    if (isLoading) {
      dispatch({
        type: "data/fetch",
        payload: null
      });
      setIsFetched(true);
    }
  }, []);

  useEffect(() => {
    if (isFetched) {
      setBuildingsData(buildings);
      setRoomsData(rooms);
      setCoursesData(courses);
      setIsLoading(false);
    }
  }, [isFetched, courses, rooms, buildings]);

  return (
    <>
      {
        !isLoading ?
          <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle={ showMenu ? "light-content" : "dark-content" }/>
            <DrawerNavigator 
              navigation={navigation} 
              handleDrawer={handleDrawer}
              currentTab="HOME"
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
                  screenTitle="QUẢN LÝ KHOÁ HỌC"
                  navigation={navigation}
                  payload={undefined}
                />
                <FlatList 
                  data={CoursesData}
                  contentContainerStyle={{ width: "100%", alignItems: 'center' }}
                  renderItem={({item}) => 
                    <CourseCard 
                      courseId={item.courseId}
                      courseName={item.courseName}
                      trainer={item.trainer}
                      manager={item.manager}
                      startedDate={item.startedDate}
                      endedDate={item.endedDate}
                      building={getBuildingName(BuildingsData, item.buildingId)}
                      room={getRoomName(RoomsData, item.roomId)}
                      navigation={navigation}
                    />
                  }
                  keyExtractor={item => item.courseId}
                />
              </Animated.View>
            </Animated.View>
          </SafeAreaView>
        : 
          <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 17 }}>loading...</Text>
          </View>
      }
    </>
  )
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////// Styles /////////////////////////////////
const styles = StyleSheet.create({
  safeArea: { 
    flex: 1,
    backgroundColor: Colors.mainTwo
  },

  animatedView: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: Colors.mainOne,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 15,
    paddingTop: 60,
    paddingBottom: 100,
  }
});
///////////////////////////////////////////////////////////////////////////////