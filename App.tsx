import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { StateManager } from './models/StateManager';
import { RecordList } from './components/Records/RecordList';
export default function App() {
  const st = new StateManager();
  return (
    <View style={styles.container}>
      <RecordList stateManager={st} />
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
