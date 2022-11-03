import {useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, GestureResponderEvent } from 'react-native';
import { Repository } from './models/repository/Repository';
import { RecordList } from './components/Records/RecordList';
import { AddRecord } from './components/Records/AddRecord';
import { Record } from './models/Record/Record';
import { Task } from './models/Task';
export default function App() {
  const repo = new Repository();
  useEffect(() => {
    (async () => {
      await repo.init();
      console.log('repo init finished',{repo});
    })();
  },[]);
  async function handleSave(event: GestureResponderEvent,inputs:{ title: string, description: string, startedAt: Date, finishedAt: Date; }) {
    console.log('save');
    console.log({inputs});
    const res = await repo.add("records", Task.fromJson(inputs)) as Record;
    console.log({res});
  }
  return (
    <View style={styles.container}>
      {/* <RecordList records={[...repo.records.values()]} /> */}
      <AddRecord inputs={{}} onSave={handleSave} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
