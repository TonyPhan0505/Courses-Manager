////////////////////////// Import dependencies //////////////////////////
import { 
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../utils/Colors';
import TopBar from '../components/TopBar';
import TextInputBox from '../components/TextInputBox';
import DateBox from '../components/DateBox';
import TimeBox from '../components/TimeBox';
import DropdownInputBox from '../components/DropdownInputBox';
import DateModal from '../components/DateModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import idGenerator from '../utils/services/idGenerator.service';
////////////////////////////////////////////////////////////////////////

////////////////////////// Globals //////////////////////////
interface Props {
  navigation: any;
  route: any;
};

const saveIcon = require('../assets/icons/saveIcon.png');
////////////////////////////////////////////////////////////

////////////////////////// Component //////////////////////////
export default function CreateClassScreen(props: Props) {
  const { navigation, route } = props;
  const courseId = route.params.courseId;
  const dispatch = useDispatch();

  const [ formSubmitted, setFormSubmitted ] = useState(false);
  const [ className, setClassName ] = useState("");
  const [ trainer, setTrainer ] = useState("");
  const [ date, setDate ] = useState(new Date());
  const [ datePickerOpened, setDatePickerOpened ] = useState(false);
  const [ startedTime, setStartedTime ] = useState(new Date());
  const [ endedTime, setEndedTime ] = useState(new Date());
  const [ startTimePickerOpened, setStartTimePickerOpened ] = useState(false);
  const [ endTimePickerOpened, setEndTimePickerOpened ] = useState(false);
  const isTimeConflicted = useSelector((state: any) => state.class.isTimeConflicted);

  function areValidTimes() {
    return startedTime <= endedTime;
  }

  function validateInputs() {
    return className && trainer && areValidTimes() && building && room;
  }

  async function cacheItems() {
    await AsyncStorage.setItem('building', building.trim());
    await AsyncStorage.setItem('room', room.trim());
  }

  const BuildingsData = useSelector((state: any) => state.building.buildings);
  const RoomsData = useSelector((state: any) => state.room.rooms);

  const buildingOptions = BuildingsData.map((building: any) => {
    return {
        label: building.buildingName,
        value: building.buildingName
    }
  });

  const roomOptions = RoomsData.map((room: any) => {
    return {
        label: room.roomName,
        value: room.roomName
    };
  });

  const [ building, setBuilding ] = useState("");
  const [ buildingDropdownOpened, setBuildingDropdownOpened ] = useState(false);

  const [ room, setRoom ] = useState("");
  const [ roomDropdownOpened, setRoomDropdownOpened ] = useState(false);

  function getBuildingIdByName() {
    const buildingId = BuildingsData.filter((buildingItem: any) => { return buildingItem.buildingName === building })[0].buildingId;
    return buildingId;
  }

  function getRoomIdByName() {
    const roomId = RoomsData.filter((roomItem: any) => { return roomItem.roomName === room })[0].roomId;
    return roomId;
  }

  useEffect(() => {
    if (isTimeConflicted === 1) {
      dispatch({
        type: 'class/resetTimeConflictStatus'
      });
      setFormSubmitted(false);
      Alert.alert("Fis Insight", "Lớp học này có thời gian mâu thuẫn với một lớp học ở cùng địa điểm.")
    } else if (isTimeConflicted === 0) {
      dispatch({
        type: 'class/resetTimeConflictStatus'
      });
      // cache chosen building and room
      cacheItems();
      // reset submission state
      setFormSubmitted(false);
      // return to classes screen
      navigation.goBack();
    }
  }, [isTimeConflicted]);

  useEffect(() => {
    const getCachedLocation = async () => {
      const building = await AsyncStorage.getItem('building');
      const room = await AsyncStorage.getItem('room');
      setBuilding(building ? building : "");
      setRoom(room ? room : "");
    }
    getCachedLocation();
  }, []);

  useEffect(() => {
    if (formSubmitted && validateInputs()) {
      const newClass = {
        courseId: courseId,
        className: className,
        trainer: trainer,
        date: date.getTime(),
        startedTime: startedTime.getTime(),
        endedTime: endedTime.getTime(),
        buildingId: getBuildingIdByName(),
        roomId: getRoomIdByName(),
        classId: idGenerator()
      };
      // create class
      dispatch({
        type: "class/create",
        payload: newClass
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
        screenTitle="TẠO MỚI BUỔI HỌC"
        navigation={navigation}
        payload={undefined}
      />
      <ScrollView contentContainerStyle={styles.scroller}>
        <TextInputBox 
          prompt="Tên buổi học"
          placeholder="Nhập tên buổi học"
          data={className}
          setData={setClassName}
          messageWhenEmpty="Tên buổi học không thể thiếu"
          formSubmitted={formSubmitted}
        />
        <TextInputBox 
          prompt="Tên giảng viên"
          placeholder="Nhập tên giảng viên"
          data={trainer}
          setData={setTrainer}
          messageWhenEmpty="Tên giảng viên không thể thiếu"
          formSubmitted={formSubmitted}
        />
        <View style={{ width: '96%' }}>
          <DateBox 
            prompt="Chọn ngày"
            data={date} 
            setDatePickerOpened={setDatePickerOpened}
          />
        </View>
        <View style={styles.timeBoxesFrame}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
            <TimeBox 
                prompt="Chọn giờ bắt đầu"
                data={startedTime} 
                setTimePickerOpened={setStartTimePickerOpened}
            />
            <TimeBox 
                prompt="Chọn giờ kết thúc"
                data={endedTime} 
                setTimePickerOpened={setEndTimePickerOpened}
            />
          </View>
          {
            formSubmitted && areValidTimes() === false && <Text style={styles.invalidTimeErrorMessage}>Giờ bắt đầu không được sau giờ kết thúc</Text>
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
        datePickerOpened={datePickerOpened}
        setDatePickerOpened={setDatePickerOpened}
        data={date}
        setData={setDate}
        mode="date"
      />
      <DateModal
        datePickerOpened={startTimePickerOpened}
        setDatePickerOpened={setStartTimePickerOpened}
        data={startedTime}
        setData={setStartedTime}
        mode="time"
      />
      <DateModal
        datePickerOpened={endTimePickerOpened}
        setDatePickerOpened={setEndTimePickerOpened}
        data={endedTime}
        setData={setEndedTime}
        mode="time"
      />
    </SafeAreaView>
  )
}
////////////////////////////////////////////////////////////

////////////////////////// Styles //////////////////////////
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

  timeBoxesFrame: {
    width: '96%',
    marginVertical: 12
  },

  invalidTimeErrorMessage: {
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
////////////////////////////////////////////////////////////