import { useState } from "react";
import { Platform, View, TextInput } from "react-native";
import { Button } from "react-native-elements";
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from "./styles";
import globalStyles from "../../styles/globalStyles";

type DatePickerProps = {
  title: string;
  placeholder: string;
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}

function DatePicker({ title, placeholder, date, setDate }: DatePickerProps) {
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');

  return (
    <View>
      {
        Platform.OS !== 'ios' && (
          <Button
            title={title}
            onPress={() => setShowDatePicker(true)}
          >
            <View style={[styles.container, styles.verticallySpaced]}>
              <TextInput
                value={date?.toString() ?? ''}
                style={[styles.inputField, globalStyles.body1]}
                placeholder={placeholder}
                editable={false}

              />
            </View>
          </Button>
        )
      }
      {
        showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            onChange={date => {
              setShowDatePicker(Platform.OS === 'ios');
              if (date.nativeEvent.timestamp) {
                setDate(new Date(date.nativeEvent.timestamp));
              }
            }}
          />
        )
      }
    </View >
  )
}

export default DatePicker;
