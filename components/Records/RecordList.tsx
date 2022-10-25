import type { StateManager } from '../../models/StateManager';
import { View, Text } from 'react-native';
export function RecordList({ stateManager }: { stateManager: StateManager; }) {
	if (stateManager.records().length === 0) {
		return <div>There are no records.</div>;
	}
	return (
		<View>
			{stateManager.records().map((record, i) => (
				<View>
					<Text key={i}>{record.title}</Text>
					<Text key={i}>{record.description}</Text>
					<Text key={i}>{record.title}</Text>
				</View>

			))}
		</View>
	);
}
