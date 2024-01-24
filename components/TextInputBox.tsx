import {
    View,
    Text,
    TextInput,
    StyleSheet
} from 'react-native';
import Colors from '../utils/Colors';

interface TextInputBoxProps {
    prompt: string;
    placeholder: string;
    data: string;
    setData: React.Dispatch<React.SetStateAction<string>>;
    messageWhenEmpty: string;
    formSubmitted: boolean;
};

export default function TextInputBox(props: TextInputBoxProps) {
    const { 
        prompt, 
        placeholder, 
        data, 
        setData, 
        messageWhenEmpty, 
        formSubmitted 
    } = props;

    return (
        <View style={styles.textInputBox}>
            <Text style={styles.inputPrompt}>{ prompt }</Text>
            <TextInput 
                style={styles.inputField}
                value={data}
                onChangeText={(text: string) => setData(text)}
                placeholder={placeholder}
                placeholderTextColor={Colors.secondaryFive}
            />
            { formSubmitted && !data && <Text style={styles.errorMessage}>{ messageWhenEmpty }</Text> }
        </View>
    );
}

const styles = StyleSheet.create({
    textInputBox: {
        width: '96%',
        marginVertical: 12
    },

    inputPrompt: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.secondaryOne,
        marginBottom: 10
    },

    inputField: {
        borderWidth: 1,
        borderColor: Colors.secondaryFive,
        fontSize: 18,
        color: Colors.mainTwo,
        borderRadius: 10,
        width: '100%',
        height: 60,
        padding: 7
    },

    errorMessage: {
        fontSize: 15,
        color: Colors.secondarySix,
        marginTop: 6
    }
});