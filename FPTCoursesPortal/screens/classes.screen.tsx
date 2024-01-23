///////////////////////////// Import dependencies /////////////////////////////
import { 
    FlatList,
    StyleSheet,
    Dimensions
} from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../utils/Colors';
import TopBar from '../components/TopBar';
import ClassCard from '../components/ClassCard';
import { getManager } from '../utils/services/course.service';
import { getBuildingName } from '../utils/services/building.service';
import { getRoomName } from '../utils/services/room.service';
/////////////////////////////////////////////////////////////////////////////

///////////////////////////// Globals /////////////////////////////
interface Props {
    navigation: any;
    route: any;
};
//////////////////////////////////////////////////////////////////

///////////////////////////// Component /////////////////////////////
export default function ClassesScreen(props: Props) {
    const { navigation, route } = props;
    const courseId = route.params.courseId;
    const ClassesData = useSelector((state: any) => state.class.classes);
    const CoursesData = useSelector((state: any) => state.course.courses);
    const BuildingsData = useSelector((state: any) => state.building.buildings);
    const RoomsData = useSelector((state: any) => state.room.rooms);
    const relevantClasses = ClassesData.filter((Class: any) => {
        return Class.courseId === courseId;
    });

    return (
        <SafeAreaView style={styles.safeArea}>
            <TopBar 
                handleDrawer={undefined} 
                showMenu={undefined}
                screenTitle="QUẢN LÝ BUỔI HỌC"
                navigation={navigation}
                payload={{
                    courseId: courseId
                }}
            />
            <FlatList 
                data={relevantClasses}
                contentContainerStyle={{ alignItems: 'center' }}
                renderItem={({item}) => 
                    <ClassCard 
                        courseId={courseId}
                        className={item.className}
                        trainer={item.trainer}
                        manager={getManager(CoursesData, item.courseId)}
                        date={item.date}
                        startedTime={item.startedTime}
                        endedTime={item.endedTime}
                        buildingName={getBuildingName(BuildingsData, item.buildingId)}
                        roomName={getRoomName(RoomsData, item.roomId)}
                        classId={item.classId}
                        navigation={navigation}
                    />
                }
                keyExtractor={item => item.courseId + "-" + item.className}
            />
        </SafeAreaView>
  )
}
///////////////////////////////////////////////////////////////////

///////////////////////////// Styles /////////////////////////////
const styles = StyleSheet.create({
    safeArea: {
        width: Dimensions.get('window').width,
        minHeight: Dimensions.get('window').height,
        backgroundColor: Colors.mainOne,
        paddingBottom: 12
    }
});
///////////////////////////////////////////////////////////////////