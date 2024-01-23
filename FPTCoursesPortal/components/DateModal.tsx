import DatePicker from 'react-native-date-picker';

interface DateModalProps {
    datePickerOpened: boolean;
    setDatePickerOpened: React.Dispatch<React.SetStateAction<boolean>>;
    data: Date;
    setData: React.Dispatch<React.SetStateAction<Date>>;
    mode: "date" | "time" | "datetime" | undefined;
};

export default function DateModal(props: DateModalProps) {
    const { 
        datePickerOpened, 
        setDatePickerOpened, 
        data, 
        setData,
        mode
    } = props;

    const formattedData = new Date(data);

    return (
        <DatePicker
            modal
            open={datePickerOpened}
            date={formattedData}
            mode={mode}
            onConfirm={(date) => {
                setDatePickerOpened(false)
                setData(new Date(date))
            }}
            onCancel={() => {
                setDatePickerOpened(false)
            }}
        />
    );
}