import { 
    Image,
    View, 
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import React from 'react';
import Colors from '../utils/Colors';

interface ClassCardProps {
    courseId: string;
    className: string;
    trainer: string;
    manager: string;
    date: Date;
    startedTime: Date;
    endedTime: Date;
    buildingName: string;
    roomName: string;
    classId: string;
    navigation: any;
};

interface DataRowProps {
    field: string;
    data: string;
};

const threeDotsIcon = require('../assets/icons/threeDotsIcon.png');
const instructorIcon = require('../assets/icons/userIcon.png');
const managerIcon = require('../assets/icons/managerIcon.png');
const dateIcon = require('../assets/icons/dateIcon.png');
const timeIcon = require('../assets/icons/timeIcon.png');
const buildingIcon = require('../assets/icons/buildingIcon.png');
const roomIcon = require('../assets/icons/roomIcon.png');
const wifiIcon = require('../assets/icons/wifiIcon.png');

function DataRow(props: DataRowProps) {
    const { field, data } = props;
    let tintColor;
    let icon;

    if (field === 'Giảng viên') {
        tintColor = Colors.secondaryTwo;
        icon = instructorIcon;
    } else if (field === 'Cán bộ quản lý') {
        tintColor = '#40304d';
        icon = managerIcon;
    } else if (field === 'Ngày') {
        tintColor = '#0a8dc3';
        icon = dateIcon;
    } else if (field === 'Thời gian') {
        tintColor = Colors.secondaryOne;
        icon = timeIcon;
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

export default function ClassCard(props: ClassCardProps) {
    const {  
        courseId,
        className,
        trainer,
        manager,
        date,
        startedTime,
        endedTime,
        buildingName,
        roomName,
        classId,
        navigation
    } = props;

    const formattedDate = new Date(date);
    const formattedStartedTime = new Date(startedTime);
    const formattedEndedTime = new Date(endedTime);

    return (
        <View style={styles.root}>
            <View style={styles.titleAndManageView}>
                <View style={styles.titleFrame}>
                    <Text style={styles.title}>{ className }</Text>
                </View>
                <View style={styles.manageFrame}>
                    <TouchableOpacity onPress={() => navigation.navigate("ManageClass", {
                        courseId: courseId,
                        className: className,
                        trainer: trainer,
                        manager: manager,
                        date: date,
                        startedTime: startedTime,
                        endedTime: endedTime,
                        buildingName: buildingName,
                        roomName: roomName,
                        classId: classId
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
                field="Ngày"
                data={`${formattedDate.getDate()}/${formattedDate.getMonth() + 1}/${formattedDate.getFullYear()}`}
            />
            <DataRow 
                field="Thời gian"
                data={`${formattedStartedTime.getHours()}:${formattedStartedTime.getMinutes()} - ${formattedEndedTime.getHours()}:${formattedEndedTime.getMinutes()}`}
            />
            <DataRow 
                field="Toà nhà"
                data={buildingName}
            />
            <DataRow 
                field="Phòng"
                data={roomName}
            />
            <View style={styles.wifiAndIdFrame}>
                <View style={styles.wifiFrame}>
                    <Image source={wifiIcon} style={[styles.dataRowIcon, { tintColor: '#34c96b' }]}/>
                    <Text style={styles.wifiName}>FPT.HCM</Text>
                </View>
                <View style={styles.idFrame}>
                    <View style={styles.idWrapper}>
                        <Text style={styles.classId}>{ classId }</Text>
                    </View>
                </View>
            </View>
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
        flexGrow: 1,
        alignItems: 'center',
        marginTop: 10,
        overflow: 'hidden'
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
    },

    wifiAndIdFrame: {
        flexDirection: 'row',
        flexGrow: 1,
        alignItems: 'center',
        marginTop: 10
    },

    wifiFrame: {
        width: '60%',
        flexDirection: 'row',
        alignItems: 'center'
    },

    wifiName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 8,
        color: Colors.secondaryOne
    },

    idFrame: {
        width: '40%',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 10
    },

    idWrapper: {
        padding: 10,
        height: 42,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: "#e7ebee"
    },

    classId: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.secondaryFour
    }
});