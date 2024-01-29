import {Button, FlatList, StyleSheet, Text, View, Image} from 'react-native';
import {Agenda, Calendar} from 'react-native-calendars';
import {Icon, SegmentedButtons} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {format} from 'date-fns';

// interface Event {
//     name: string;
//     height: number;
//     day: string;
//     selected?: boolean;
//     marked?: boolean;
//     selectedColor?: string;
// }

// Sample events data
const events = [
  {
    date: '2024-02-01',
    name: 'Ice Cream Day',
    description:
      'Hello parents! Just letting you know next week the school will be on public holiday the whole week.  Regards,Teacher Sara.',
    createdBy: 'Teacher Sara',
    type: 'public',
    color: '#86A8D8',
    avatar: require('../../assets/images/calendar/Round-2.png'),
  },
  {
    date: '2024-01-02',
    name: 'Sports Attire Collection',
    description:
      'Hello parents! Just letting you can collect the sports attire from the school office.',
    createdBy: 'Teacher Sara',
    type: 'public',
    color: '#86A8D8',
    avatar: require('../../assets/images/calendar/Round-2.png'),
  },
  {
    date: '2024-01-03',
    name: 'Painting Day',
    description:
      'Hello parents! On the painting day, all students are required to bring their own painting tools.  Regards,Teacher Sara.',
    createdBy: 'Teacher Sara',
    type: 'parent',
    color: '#86A8D8',
    avatar: require('../../assets/images/calendar/Round-2.png'),
  },
  {
    date: '2024-01-06',
    name: 'Sports Day',
    description:
      'Hello parents! Just letting you the sports day will be held on 6th February 2024.  Regards,Teacher Sara.',
    createdBy: 'Teacher Sara',
    type: 'public',
    color: '#86A8D8',
    avatar: require('../../assets/images/calendar/Round-2.png'),
  },
  {
    date: '2024-01-18',
    name: 'Paul Birthday Celebration',
    description:
      'Hello parents! Just letting you know next week the school will be on public holiday the whole week.  Regards,Teacher Sara.',
    createdBy: 'Teacher Sara',
    type: 'parent',
    color: '#FC5D8F',
    avatar: require('../../assets/images/calendar/Round.png'),
  },
  {
    date: '2024-01-09',
    name: 'Sleep Day',
    description:
      'Hello parents! Sleep day will be held on 9th February 2024.  Regards,Teacher Sara.',
    createdBy: 'Teacher Sara',
    type: 'public',
    color: '#86A8D8',
    avatar: require('../../assets/images/calendar/Round-2.png'),
  },
];

const CalendarScreen = () => {
  const [selected, setSelected] = useState('parent');
  let publicDates: any = {};
  let parentDates: any = {};
  let publicArr: any[] = [];
  let parentArr: any[] = [];

  events.forEach(event => {
    if (event.type === 'public') {
      publicDates[event.date] = {
        name: event.name,
        height: 2,
        day: '1',
        selected: true,
        selectedColor: event.color,
      };
      publicArr.push(event);
    } else {
      parentDates[event.date] = {
        name: event.name,
        height: 2,
        day: '1',
        selected: true,
        selectedColor: event.color,
      };
      parentArr.push(event);
    }
  });

  const Item = ({item}: any) => (
    <LinearGradient
      style={styles.agendaItem}
      colors={[item.color, '#F5F5F5']}
      start={{x: 0.04, y: 0}}
      end={{x: 0.0400001, y: 0}}>
      <Ionicons name="calendar-outline" size={25} color="black" />
      <Text style={styles.agendaDate}>
        {format(new Date(item.date), 'dd MMM')}
      </Text>
      <View style={styles.verticleLine}></View>
      <Text style={styles.agendaName}>{item.name}</Text>
      <Image
              source={item.avatar}
            />
    </LinearGradient>
  );

  console.log(publicDates);
  console.log(parentDates);
  return (
    <SafeAreaView>
      {/* <TopBar title="Calendar" showShadow /> */}
      <View style={{padding: 20}}>
        <Calendar
          style={{
            borderWidth: 0,
            borderRadius: 20,
            paddingBottom: 10,
          }}
          theme={{
            backgroundColor: '#F5F5F5',
            calendarBackground: '#F5F5F5',
            textSectionTitleColor: 'black',
            dayTextColor: '#2d4150',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#fff',
            todayBackgroundColor: '#001D6C',
            textDisabledColor: '#d9e1e8',
            textDayStyle: {color: 'black'},
            arrowColor: 'black',
          }}
          // Specify the current date
          // Callback that gets called when the user selects a day
          onDayPress={(day: any) => {
            console.log('selected day', day);
          }}
          // Mark specific dates as marked
          markedDates={selected === 'public' ? publicDates : parentDates}
        />

        <View style={{paddingTop: 10}}>
          <FlatList
            data={selected === 'public' ? publicArr : parentArr}
            renderItem={Item}
            keyExtractor={item => item.date}
          />
        </View>
        {/* <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={styles.agendaItem}>
            <Text style={styles.agendaDate}>Date</Text>
            <View style={styles.verticleLine}></View>
            <Text style={styles.agendaName}>Name</Text>
          </View>
        </View> */}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  verticleLine: {
    height: '100%',
    marginHorizontal: 10,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#a2a2a2',
  },
  agendaItem: {
    flexDirection: 'row',
    padding: 10,
    paddingLeft: 20,
    borderRadius: 5,
    backgroundColor: '#F5F5F5',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  agendaDate: {
    flex: 0.2,
    color: 'black',
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    paddingLeft: 10,
  },

  agendaName: {
    flex: 0.8,
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
  },
});
export default CalendarScreen;