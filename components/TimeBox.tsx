import { 
    View, 
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import React from 'react';
import Colors from '../utils/Colors';

interface TimeInputBoxProps {
    prompt: string;
    data: Date;
    setTimePickerOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

const dropdownIcon = require('../assets/icons/dropdownIcon.png');

export default function TimeBox(props: TimeInputBoxProps) {
    const { prompt, data, setTimePickerOpened } = props;

    const formattedData = new Date(data);

    return (
        <View style={styles.timeBox}>
            <Text style={styles.inputPrompt}>{ prompt }</Text>
            <View style={styles.timeDataField}>
                <View style={{ width: '70%' }}>
                    <Text style={styles.timeData}>{formattedData.getHours()}:{formattedData.getMinutes()}</Text>
                </View>
                <View style={{ width: '30%', alignItems: 'flex-end' }}>
                    <TouchableOpacity onPress={() => setTimePickerOpened(true)}>
                        <Image source={dropdownIcon} style={styles.dropdownIcon}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    timeBox: {
        width: '47%'
    },

    inputPrompt: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.secondaryOne,
        marginBottom: 10
    },

    timeDataField: {
        width: '100%',
        height: 60,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.secondaryFive,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center'
    },

    timeData: {
        fontSize: 18,
        color: Colors.mainTwo
    },

    dropdownIcon: {
        width: 20,
        height: 20
    }
});