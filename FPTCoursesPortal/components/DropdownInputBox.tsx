import { 
    View,
    Text,
    StyleSheet
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Colors from '../utils/Colors';

interface DropdownInputBoxProps {
    prompt: string;
    options: Array<any>;
    data: string;
    setData: React.Dispatch<React.SetStateAction<string>>;
    isOpen: any;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    placeholder: string;
};

export default function DropdownInputBox (props: DropdownInputBoxProps) {
    const { prompt, options, data, setData, isOpen, setOpen, placeholder } = props;

    return (
        <View style={styles.dropdownInputBox}>
            <Text style={styles.inputPrompt}>{ prompt }</Text>
            <Dropdown 
                style={styles.dropdown}
                data={options}
                search={true}
                labelField="label"
                valueField="value"
                onChange={(item: any) => {
                    setData(item.value);
                    setOpen(false);
                }}
                value={data}
                placeholder={!isOpen ? placeholder : '...'}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    inputPrompt: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.secondaryOne,
        marginBottom: 6
    },

    dropdownInputBox: {
        width: '93%',
        marginVertical: 12
    },

    dropdown: {
        width: '100%',
        height: 60,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
});