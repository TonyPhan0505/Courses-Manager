import { 
    Image,
    View, 
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Colors from '../utils/Colors';

interface CourseCardProps {
    courseId: string;
    courseName: string;
    trainer: string;
    manager: string;
    startedDate: Date;
    endedDate: Date;
    building: string;
    room: string;
    navigation: any;
};

interface DataRowProps {
    field: string;
    data: string;
};

const threeDotsIcon = require('../assets/icons/threeDotsIcon.png');
const trainerIcon = require('../assets/icons/userIcon.png');
const managerIcon = require('../assets/icons/managerIcon.png');
const calendarIcon = require('../assets/icons/calendarIcon.png');
const buildingIcon = require('../assets/icons/buildingIcon.png');
const roomIcon = require('../assets/icons/roomIcon.png');

function DataRow(props: DataRowProps) {
    const { field, data } = props;
    let tintColor;
    let icon;

    if (field === 'Giảng viên') {
        tintColor = Colors.secondaryTwo;
        icon = trainerIcon;
    } else if (field === 'Cán bộ quản lý') {
        tintColor = '#40304d';
        icon = managerIcon;
    } else if (field === 'Thời gian') {
        tintColor = '#42c8fb';
        icon = calendarIcon;
    } else if (field === 'Toà nhà') {
        tintColor = '#0090d7';
        icon = buildingIcon;
    } else {
        tintColor = Colors.secondaryFour;
        icon = roomIcon;
    }

    function formatData(data: any) {
        data = data.toString();
        if (data.length > 26) {
            data = data.substring(0, 26) + "...";
        }
        return data;
    }

    return (
        <View style={styles.dataRow}>
            <Image source={icon} style={[styles.dataRowIcon, { tintColor: tintColor }]}/>
            <Text style={styles.dataRowField}>{ field }: </Text>
            <Text style={styles.dataRowData}>{ formatData(data) }</Text>
        </View>
    );
}

export default function CourseCard(props: CourseCardProps) {
    const { 
        courseId,
        courseName, 
        trainer,
        manager,
        startedDate,
        endedDate,
        building,
        room,
        navigation
    } = props;

    const startYear = new Date(startedDate).getFullYear();
    const startMonth = new Date(startedDate).getMonth() + 1;
    const startDay = new Date(startedDate).getDate();
    const stringStartDate = `${startDay.toString()}/${startMonth.toString()}/${startYear.toString()}`

    const endYear = new Date(endedDate).getFullYear();
    const endMonth = new Date(endedDate).getMonth() + 1;
    const endDay = new Date(endedDate).getDate();
    const stringEndDate = `${endDay.toString()}/${endMonth.toString()}/${endYear.toString()}`;

    const timeString = stringStartDate + ' - ' + stringEndDate;

    return (
        <View style={styles.root}>
            <View style={styles.titleAndManageView}>
                <View style={styles.titleFrame}>
                    <TouchableOpacity onPress={() => navigation.navigate("Classes", { courseId: courseId })}>
                        <Text style={styles.title}>{ courseName }</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.manageFrame}>
                    <TouchableOpacity onPress={() => navigation.navigate("ManageCourse", {
                        courseId: courseId,
                        courseName: courseName, 
                        trainer: trainer,
                        manager: manager,
                        startedDate: startedDate,
                        endedDate: endedDate,
                        building: building,
                        room: room
                    })}>
                        <Image source={threeDotsIcon} style={styles.threeDots}/>
                    </TouchableOpacity>
                </View>
            </View>
            <DataRow 
                field="Giảng viên"
                data={trainer}
            />
            <DataRow 
                field="Cán bộ quản lý"
                data={manager}
            />
            <DataRow 
                field="Thời gian"
                data={timeString}
            />
            <DataRow 
                field="Toà nhà"
                data={building}
            />
            <DataRow 
                field="Phòng"
                data={room}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        borderRadius: 7,
        width: 340,
        paddingVertical: 15,
        paddingLeft: 10,
        borderWidth: 1,
        marginBottom: 20
    },

    titleAndManageView: {
        flexDirection: 'row',
        flexGrow: 1,
        maxHeight: 50,
        alignItems: 'center'
    },

    titleFrame: {
        width: '85%',
        overflow: 'hidden'
    },

    manageFrame: {
        width: '15%',
        alignItems: 'flex-end'
    },

    title: {
        fontSize: 19,
        fontWeight: 'bold',
        color: Colors.secondaryOne
    },

    threeDots: {
        width: 35,
        height: 35
    },

    dataRow: {
        flexDirection: 'row',
        width: "100%",
        alignItems: 'center',
        marginTop: 10
    },

    dataRowIcon: {
        width: 26,
        height: 26
    },

    dataRowField: {
        fontSize: 18,
        marginLeft: 8,
        color: Colors.secondaryOne
    },

    dataRowData: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.secondaryThree
    }
});