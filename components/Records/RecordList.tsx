import {Repository} from '/models/Repository/Repository';
import { View, Text } from 'react-native';
export function RecordList({ repository }: { repository: Repository; }) {
	if (repository.records.size === 0) {
		return <div>There are no records.</div>;
	}
	return (
		<View>
			{[...repository.records.values()].map((record, i) => (
				<View>
					<Text key={i+record.title}>{record.title}</Text>
					<Text key={i+record.description.slice(0,5)}>{record.description}</Text>
					<Text key={i+record.user.name}>{record.user.name}</Text>
				</View>
			))}
		</View>
	);
}
