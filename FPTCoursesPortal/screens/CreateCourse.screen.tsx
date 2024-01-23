/////////////////////////// Import Dependencies ///////////////////////////
import { 
    Dimensions,
    View, 
    Text, 
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Alert
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from '../utils/Colors';
import TopBar from '../components/TopBar';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextInputBox from '../components/TextInputBox';
import DateModal from '../components/DateModal';
import DateBox from '../components/DateBox';
import DropdownInputBox from '../components/DropdownInputBox';
import idGenerator from '../utils/services/idGenerator.service';
//////////////////////////////////////////////////////////////////////////

///////////////////////////////// Globals /////////////////////////////////
interface CreateCourseProps {
    navigation: any;
};

const saveIcon = require('../assets/icons/saveIcon.png');
//////////////////////////////////////////////////////////////////////////

/////////////////////////// Component ///////////////////////////
export default function CreateCourseScreen(props: CreateCourseProps) {
    const navigation = props.navigation;
    const dispatch = useDispatch();

    const [ courseName, setCourseName ] = useState("");
    const [ trainer, setTrainer ] = useState("");
    const [ manager, setManager ] = useState("");
    const [ startedDate, setStartedDate ] = React.useState<Date>(new Date());
    const [ endedDate, setEndedDate ] = React.useState<Date>(new Date());
    const [ startedDatePickerOpened, setStartedDatePickerOpened ] = useState(false);
    const [ endedDatePickerOpened, setEndedDatePickerOpened ] = useState(false);
    const isDuplicated = useSelector((state: any) => state.course.isDuplicated);

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

    const [ building, setBuilding ] = useState("");
    const [ buildingDropdownOpened, setBuildingDropdownOpened ] = useState(false);

    const [ room, setRoom ] = useState("");
    const [ roomDropdownOpened, setRoomDropdownOpened ] = useState(false);

    const [ formSubmitted, setFormSubmitted ] = useState(false);

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
        if (isDuplicated === 1) {
            dispatch({
                type: "course/resetIsDuplicated"
            });
            setFormSubmitted(false);
            Alert.alert("Fis Insight", "Khoá học này đã được tạo từ trước.");
        } else if (isDuplicated === 0) {
            // cache chosen building and room
            cacheItems();
            // reset duplicate status
            dispatch({
                type: "course/resetIsDuplicated"
            });
            // return to home screen
            navigation.navigate("Home");
        }
    }, [isDuplicated]);

    useEffect(() => {
        const getCache = async () => {
            const cachedBuilding = await AsyncStorage.getItem('building');
            const cachedRoom = await AsyncStorage.getItem('room');
            if (cachedBuilding) {
                setBuilding(cachedBuilding);
            } 
            if (cachedRoom) {
                setRoom(cachedRoom);
            }
        }
        getCache();
    }, []);

    useEffect(() => {
        if (formSubmitted && validateInputs()) {
            const newCourse = {
                courseId: idGenerator(),
                courseName: courseName,
                trainer: trainer,
                manager: manager,
                startedDate: startedDate.getTime(),
                endedDate: endedDate.getTime(),
                buildingId: getBuildingIdByName(),
                roomId: getRoomIdByName()
            };
            // create new course
            dispatch({
                type: "course/create",
                payload: newCourse
            });
        }
    }, [formSubmitted]);

    useEffect(() => {
        async function resetRoom() {
            const cachedBuilding = await AsyncStorage.getItem('building');
            if (cachedBuilding && building !== cachedBuilding) {
                await AsyncStorage.removeItem('building');
                await AsyncStorage.removeItem('room');
                setRoom("");
            }
        };
        if (building) {
            resetRoom();
        }
    }, [building]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <TopBar 
                handleDrawer={undefined} 
                showMenu={undefined}
                screenTitle="TẠO MỚI KHOÁ HỌC"
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
                <View style={{ width: '96%', alignItems: 'flex-end', marginVertical: 20 }}>
                    <TouchableOpacity style={styles.submitButton} onPress={() => setFormSubmitted(true)}>
                        <Image source={saveIcon} style={styles.saveIcon}/>
                        <Text style={styles.saveText}>LƯU</Text>
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
///////////////////////////////////////////////////////////////

/////////////////////////// Styles ///////////////////////////
const styles = StyleSheet.create({
    safeArea: {
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

    submitButton: {
        width: 120,
        height: 45,
        borderRadius: 10,
        backgroundColor: Colors.secondaryFour,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    saveIcon: {
        width: 26,
        height: 26,
        tintColor: Colors.mainOne
    },

    saveText: {
        color: Colors.mainOne,
        marginLeft: 4,
        fontSize: 19
    }
});
///////////////////////////////////////////////////////////////