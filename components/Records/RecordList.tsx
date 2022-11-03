import {Record} from '/models/Record/Record';
import { View, Text } from 'react-native';
export function RecordList({ records }: { records: Record[]; }) {
	if (records.length === 0) {
		return <Text>There are no records.</Text>;
	}
	return (
		<View>
			{records.map((record, i) => (
				<View>
					<Text key={i+record.title.value}>{record.title.value}</Text>
					<Text key={i+record.description.value.slice(0,5)}>{record.description.value}</Text>
					<Text key={i+record.user.name.value}>{record.user.name.value}</Text>
				</View>
			))}
		</View>
	);
}
