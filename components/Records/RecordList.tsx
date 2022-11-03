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
					<Text key={i+record.title}>{record.title}</Text>
					<Text key={i+record.description.slice(0,5)}>{record.description}</Text>
					<Text key={i+record.user.name}>{record.user.name}</Text>
				</View>
			))}
		</View>
	);
}
