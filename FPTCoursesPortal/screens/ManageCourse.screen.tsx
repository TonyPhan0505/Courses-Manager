//////////////////////// Import Dependencies ////////////////////////
import { 
    ScrollView,
    StyleSheet,
    Dimensions,
    View,
    Text,
    TouchableOpacity,
    Image,
    Alert
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from '../utils/Colors';
import TopBar from '../components/TopBar';
import TextInputBox from '../components/TextInputBox';
import DateModal from '../components/DateModal';
import DateBox from '../components/DateBox';
import DropdownInputBox from '../components/DropdownInputBox';
import AsyncStorage from '@react-native-async-storage/async-storage';
////////////////////////////////////////////////////////////////////

//////////////////////// Globals ////////////////////////
interface Props {
    navigation: any;
    route: any;
};

const saveIcon = require('../assets/icons/saveIcon.png');
const deleteIcon = require('../assets/icons/deleteIcon.png');
////////////////////////////////////////////////////////

//////////////////////// Component ////////////////////////
export default function ManageCourseScreen(props: Props) {
    const { navigation, route } = props;
    const course = route.params;
    const dispatch = useDispatch();

    const [ formSubmitted, setFormSubmitted ] = useState(false);
    const [ courseName, setCourseName ] = useState(course.courseName);
    const [ trainer, setTrainer ] = useState(course.trainer);
    const [ manager, setManager ] = useState(course.manager);
    const [ startedDate, setStartedDate ] = React.useState<Date>(new Date(course.startedDate));
    const [ endedDate, setEndedDate ] = React.useState<Date>(new Date(course.endedDate));
    const [ startedDatePickerOpened, setStartedDatePickerOpened ] = useState(false);
    const [ endedDatePickerOpened, setEndedDatePickerOpened ] = useState(false);

    const BuildingsData = useSelector((state: any) => state.building.buildings);
    const RoomsData = useSelector((state: any) => state.room.rooms);
    const buildingOptions = BuildingsData.map((building: any) => {
        return {
            label: building.buildingName,
            value: building.buildingName
        }
    });
    function getBuildingIdByName() {
        const buildingId = BuildingsData.filter((buildingItem: any) => { return buildingItem.buildingName === building })[0].buildingId;
        return buildingId;
    }
    const roomOptions = RoomsData.map((room: any) => {
        return {
            label: room.roomName,
            value: room.roomName
        };
    });
    function getRoomIdByName() {
        const roomId = RoomsData.filter((roomItem: any) => { return roomItem.roomName === room })[0].roomId;
        return roomId;
    }
    const [ building, setBuilding ] = useState(course.building);
    const [ buildingDropdownOpened, setBuildingDropdownOpened ] = useState(false);
    const [ room, setRoom ] = useState(course.room);
    const [ roomDropdownOpened, setRoomDropdownOpened ] = useState(false);

    function areValidDates() {
        return startedDate <= endedDate;
    }

    function validateInputs() {
        return courseName 
            && trainer 
            && manager
            && areValidDates() 
            && building 
            && room;
    }

    async function cacheItems() {
        await AsyncStorage.setItem('building', building.trim());
        await AsyncStorage.setItem('room', room.trim());
    }

    useEffect(() => {
        const getCachedLocation = async () => {
          const cachedBuilding = await AsyncStorage.getItem('building');
          const cachedRoom = await AsyncStorage.getItem('room');
          if (cachedBuilding) {
            setBuilding(cachedBuilding);
          }
          if (cachedRoom) {
            setRoom(cachedRoom);
          }
        }
        getCachedLocation();
    }, []);

    useEffect(() => {
        if (formSubmitted && validateInputs()) {
            const updatedCourse = {
                courseId: course.courseId,
                courseName: courseName,
                trainer: trainer,
                manager: manager,
                startedDate: startedDate.getTime(),
                endedDate: endedDate.getTime(),
                buildingId: getBuildingIdByName(),
                roomId: getRoomIdByName()
            };
            // edit course
            dispatch({
                type: "course/edit",
                payload: updatedCourse
            });
            // cache chosen building and room
            cacheItems();
            // return to home screen
            navigation.navigate("Home");
        }
    }, [formSubmitted]);

    useEffect(() => {
        async function resetRoom() {
            const cachedBuilding = await AsyncStorage.getItem('building');
            if (cachedBuilding && (building !== cachedBuilding)) {
                await AsyncStorage.removeItem('building');
                await AsyncStorage.removeItem('room');
                setRoom("");
            }
        };
        if (building) {
            resetRoom();
        }
    }, [building]);

    function deleteCourse() {
        Alert.alert("FPT Insight", "Bạn có chắc chắn muốn xoá khoá học này không?", [
            {
                text: "No"
            },
            {
                text: "Yes",
                onPress: () => {
                    dispatch({
                        type: "course/delete",
                        payload: course.courseId
                    });
                    navigation.navigate("Home");
                }
            }
        ]);
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <TopBar 
                handleDrawer={undefined} 
                showMenu={undefined}
                screenTitle="SỬA KHOÁ HỌC"
                navigation={navigation}
                payload={undefined}
            />
            <ScrollView contentContainerStyle={styles.scroller}>
                <TextInputBox 
                    prompt="Tên khoá"
                    placeholder="Nhập tên khoá học"
                    data={courseName}
                    setData={setCourseName}
                    messageWhenEmpty="Tên khoá học không thể thiếu"
                    formSubmitted={formSubmitted}
                />
                <TextInputBox 
                    prompt="Giảng viên"
                    placeholder="Nhập tên giảng viên"
                    data={trainer}
                    setData={setTrainer}
                    messageWhenEmpty="Tên giảng viên không thể thiếu"
                    formSubmitted={formSubmitted}
                />
                <TextInputBox 
                    prompt="Cán bộ quản lý"
                    placeholder="Nhập tên cán bộ quản lý"
                    data={manager}
                    setData={setManager}
                    messageWhenEmpty="Tên cán bộ không thể thiếu"
                    formSubmitted={formSubmitted}
                />
                <View style={styles.dateBoxesFrame}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                        <DateBox 
                            prompt="Từ ngày"
                            data={startedDate} 
                            setDatePickerOpened={setStartedDatePickerOpened}
                        />
                        <DateBox 
                            prompt="Đến ngày"
                            data={endedDate} 
                            setDatePickerOpened={setEndedDatePickerOpened}
                        />
                    </View>
                    {
                        formSubmitted && areValidDates() === false && <Text style={styles.invalidDatesErrorMessage}>Ngày bắt đầu không được sau ngày kết thúc</Text>
                    }
                </View>
                <DropdownInputBox 
                    prompt="Toà nhà"
                    options={buildingOptions}
                    data={building}
                    setData={setBuilding}
                    isOpen={buildingDropdownOpened}
                    setOpen={setBuildingDropdownOpened}
                    placeholder="Chọn toà nhà"
                />
                <DropdownInputBox 
                    prompt="Phòng"
                    options={roomOptions}
                    data={room}
                    setData={setRoom}
                    isOpen={roomDropdownOpened}
                    setOpen={setRoomDropdownOpened}
                    placeholder="Chọn phòng"
                />
                <View style={styles.buttonsFrame}>
                    <TouchableOpacity style={[styles.submitButton, { backgroundColor: Colors.secondarySix, marginRight: 20 }]} onPress={deleteCourse}>
                        <Image source={deleteIcon} style={styles.buttonIcon}/>
                        <Text style={styles.buttonText}>XOÁ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.submitButton, { backgroundColor: Colors.secondaryFour }]} onPress={() => setFormSubmitted(true)}>
                        <Image source={saveIcon} style={styles.buttonIcon}/>
                        <Text style={styles.buttonText}>LƯU</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <DateModal
                datePickerOpened={startedDatePickerOpened}
                setDatePickerOpened={setStartedDatePickerOpened}
                data={startedDate}
                setData={setStartedDate}
                mode="date"
            />
            <DateModal
                datePickerOpened={endedDatePickerOpened}
                setDatePickerOpened={setEndedDatePickerOpened}
                data={endedDate}
                setData={setEndedDate}
                mode="date"
            />
        </SafeAreaView>
    )
}
//////////////////////////////////////////////////////////

//////////////////////// Styles ////////////////////////
const styles = StyleSheet.create({
    safeArea: {
        width: '100%',
        minHeight: Dimensions.get('window').height,
        backgroundColor: Colors.mainOne
    },

    scroller: {
        width: Dimensions.get('window').width,
        paddingBottom: 100,
        alignItems: 'center'
    },

    dateBoxesFrame: {
        width: '96%',
        marginVertical: 12
    },

    invalidDatesErrorMessage: {
        fontSize: 15,
        color: Colors.secondarySix,
        marginTop: 6
    },

    buttonsFrame: {
        width: '96%', 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end', 
        marginVertical: 20
    },

    submitButton: {
        width: 120,
        height: 45,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonIcon: {
        width: 26,
        height: 26,
        tintColor: Colors.mainOne
    },

    buttonText: {
        color: Colors.mainOne,
        marginLeft: 4,
        fontSize: 19
    }
});
///////////////////////////////////////////////////////