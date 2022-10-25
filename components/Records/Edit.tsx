import { TextInput,View } from 'react-native';
import { useState } from 'react';
import {Record} from '/models/Record/Record';

export function Edit({ record }: { record: Record; }) {
	const [title, setTitle] = useState(record.title);
	const [description, setDescription] = useState(record.description);
	const [startedAt, setStartedAt] = useState(record.startedAt);
	const [finishedAt, setFinishedAt] = useState(record.finishedAt);
	const [relatedTask, setRelatedTask] = useState(record.taskId);
	return (
		<View>
		<TextInput
			value={record.title}
			onChangeText={(title) => setTitle(title)}
		/>
		<TextInput
			value={record.description}
			onChangeText={(description) => setDescription(description)}
		/>
		<TextInput
			value={record.startedAt}
			onChangeText={(startedAt) => setStartedAt(startedAt)}
		/>
		<TextInput
			value={record.finishedAt}
			onChangeText={(finishedAt) => setFinishedAt(finishedAt)}
		/>
		<TextInput
			value={record.taskId}
			onChangeText={(relatedTask) => setRelatedTask(relatedTask)}
		/>
		</View>
	);

	
}
