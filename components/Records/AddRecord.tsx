import { Record } from '/models/Record/Record';
import { View, Text, TextInput, Button ,GestureResponderEvent} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
type RecordProps = { title: string, description: string, startedAt: Date, finishedAt: Date; };
export function AddRecord({inputs,onSave}:{inputs: Partial<RecordProps>,onSave:(event: GestureResponderEvent, inputs:RecordProps) => void}) {
	const _inputs = { title: "", description: '', startedAt: new Date(), finishedAt: new Date(), ...inputs };
	const [inputState, setInputState] = useState(_inputs);
	function handleChange<T extends keyof RecordProps>(prop:T, value: RecordProps[T]) {
		setInputState({ ...inputState, [prop]: value });
	}
	
	const [showStartedAt, setShowStartedAt] = useState(false);
	const [showFinishedAt, setShowFinishedAt] = useState(false);
	
	const columnStyle = { justifyContents: 'space-around', flexDirection: 'column',alignItems:"stretch",alignContent:"space-between" } as const;
	const rowStyle = { padding:5, flexDirection: 'row', } as const;
	const inputStyle={borderBottomWidth:1, borderColor:"black",backgroundColor:"#88888811",minWidth:300, maxWidth:"100%", margin:5} as const;
	const textStyle={ margin:5 } as const;
	
	function dateToTimestring(date?: Date) {
		return !date?"--:--":date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0');
	}
	return (
		<View style={columnStyle}>
			<View style={rowStyle}>
				<Text style={textStyle}>Title</Text><TextInput style={inputStyle} value={inputState.title} onChangeText={val => handleChange("title", val)} placeholder={inputState.title}/>
			</View>
			<View style={rowStyle}>
				<Text style={textStyle}>StartedAt</Text>
				<Button onPress={()=>setShowStartedAt(true)} title={dateToTimestring(inputState.startedAt)} />

				{showStartedAt &&<DateTimePicker
					value={inputState.startedAt}
					mode={"time"}
					is24Hour={true}
					onChange={(e, val) => {setShowStartedAt(false);handleChange("startedAt", val??new Date())}}
				/>}
				<Text style={textStyle}>FinishedAt</Text>
				<Button  onPress={()=>setShowFinishedAt(true)} title={dateToTimestring(inputState.finishedAt)} />
			</View>
				{showFinishedAt&&<DateTimePicker 
				value={inputState.finishedAt} 
				mode={"time"}
				is24Hour={true}
				onChange={(e,val) => {setShowFinishedAt(false);handleChange("finishedAt",  val??new Date())}}
				/>}
			<View style={columnStyle}>
				<Text style={textStyle}>Description</Text>
				<TextInput 
				multiline={true}
				numberOfLines={4}
				style={inputStyle} value={inputState.description} onChangeText={val => handleChange("description", val)} />
			</View>
			<Button title="Save" onPress={(e)=>onSave(e,inputState)} />
		</View>
	);
}
