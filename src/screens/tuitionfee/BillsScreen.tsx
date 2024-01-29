import {FlatList, Platform, Text, TouchableOpacity, View} from 'react-native';
import PDF from '../../assets/images/pdf.svg';
import {format} from 'date-fns';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {formatCurrency} from '../../utils/general';
import {useNavigation} from '@react-navigation/native';
import {Checkbox} from 'react-native-paper';
import {useState} from 'react';
const BillsScreen = () => {
  const navigation = useNavigation();
  const data = [
    {
      id: 1,
      year: 2023,
      date: new Date(),
      bill: [
        {
          id: 1,
          amount: '200',
          invNumber: 'INV-011',
          name: 'Katy',
        },
        {
          id: 2,
          amount: '200',
          invNumber: 'INV-011',
          name: 'Katy',
        },
        {
          id: 3,
          amount: '200',
          invNumber: 'INV-011',
          name: 'Katy',
        },
        {
          id: 4,
          amount: '200',
          invNumber: 'INV-011',
          name: 'Katy',
        },
      ],
    },
    {
      id: 2,
      year: 2024,
      date: new Date(),
      bill: [
        {
          id: 1,
          amount: '200',
          invNumber: 'INV-011',
          name: 'Katy',
        },
        {
          id: 2,
          amount: '200',
          invNumber: 'INV-011',
          name: 'Katy',
        },
        {
          id: 3,
          amount: '200',
          invNumber: 'INV-011',
          name: 'Katy',
        },
        {
          id: 4,
          amount: '200',
          invNumber: 'INV-011',
          name: 'Katy',
        },
      ],
    },
  ];
  return (
    <View style={{flex: 1, paddingVertical: 20}}>
      {/* {data.map((item, index) => {
        return (
          <View key={index}>
            <Text>{item.year}</Text>
            {item.report.map((report, index) => (
              <View key={index}>
                <Text>{report.term}</Text>
                <Text>{report.pdfUrl}</Text>
                <Text>{report.title}</Text>
                <Text>{report.date.toDateString()}</Text>
              </View>
            ))}
          </View>
        );
      })} */}
      <FlatList
        data={data}
        renderItem={({item}) => <Item item={item} navigation={navigation} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
const Item = ({item, navigation}: {item: any; navigation: any}) => {
  const [checked, setChecked] = useState(false);
  return (
    <View>
      <Text className="text-[#001D6C] text-[24px] font-medium px-5 mb-4">
        {item.year}
      </Text>
      <View className="bg-[#E0EDFF] p-2 ">
        <Text className="px-5 text-[#001D6C] text-[16px] font-bold">
          {format(item.date, 'MMM yyyy ')}
        </Text>
      </View>
      {item?.bill?.map((bill: any, index: number) => (
        <View key={index}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('FeeDetails', {type: 'bill'})}
            //   className="p-5  flex-row items-center border-b-[0.2px] border-[#B1B1B1]"
            style={{
              padding: 20,
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomWidth: index === item.bill.length - 1 ? 0 : 0.2,
              borderColor: '#B1B1B1',
            }}>
            {/* <Text>{bill.pdfUrl}</Text> */}
            <View className="flex-[2] flex-row items-center">
              <Checkbox.Item
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => {
                  setChecked(!checked);
                }}
                mode="android"
                label=""
                color="#2AB514"
                uncheckedColor="#D8D8D8"
              />
              <View className="-ml-3">
                <Text className="text-[#001D6C] text-[15px] ">{bill.name}</Text>
                <Text className="text-[#9FA1A5] text-[10px] ">
                  {bill.invNumber}
                </Text>
              </View>
            </View>
            <Text className="text-[#001D6C] text-[15px] flex-1 text-right">
              {formatCurrency(bill.amount)}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
      <View className="mb-5" />
    </View>
  );
};
export default BillsScreen;
