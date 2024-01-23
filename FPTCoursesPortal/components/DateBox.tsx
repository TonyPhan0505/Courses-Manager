import { 
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native';
import Colors from '../utils/Colors';

interface DateInputBoxProps {
    prompt: string;
    data: Date;
    setDatePickerOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

const dropdownIcon = require('../assets/icons/dropdownIcon.png');

export default function DateBox(props: DateInputBoxProps) {
    const { prompt, data, setDatePickerOpened } = props;
    const formattedData = new Date(data);

    return (
        <View style={styles.dateBox}>
            <Text style={styles.inputPrompt}>{ prompt }</Text>
            <View style={styles.dateDataField}>
                <View style={{ width: '70%' }}>
                    <Text style={styles.dateData}>{formattedData.getDate()}/{formattedData.getMonth() + 1}/{formattedData.getFullYear()}</Text>
                </View>
                <View style={{ width: '30%', alignItems: 'flex-end' }}>
                    <TouchableOpacity onPress={() => setDatePickerOpened(true)}>
                        <Image source={dropdownIcon} style={styles.dropdownIcon}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    dateBox: {
        width: '47%'
    },

    inputPrompt: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.secondaryOne,
        marginBottom: 10
    },

    dateDataField: {
        width: '100%',
        height: 60,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.secondaryFive,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center'
    },

    dateData: {
        fontSize: 18,
        color: Colors.mainTwo
    },

    dropdownIcon: {
        width: 20,
        height: 20
    }
});