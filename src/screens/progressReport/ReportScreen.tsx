import {FlatList, Text, View} from 'react-native';
import PDF from '../../assets/images/pdf.svg';
import {format} from 'date-fns';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const ReportScreen = () => {
  const data = [
    {
      id: 1,
      year: '2023',
      report: [
        {id: 1, term: '1', pdfUrl: '', title: 'January', date: new Date()},
        {id: 2, term: '2', pdfUrl: '', title: 'January', date: new Date()},
        {id: 3, term: '3', pdfUrl: '', title: 'January', date: new Date()},
        {id: 4, term: '4', pdfUrl: '', title: 'January', date: new Date()},
      ],
    },
    {
      id: 2,
      year: '2024',
      report: [
        {id: 1, term: '1', pdfUrl: '', title: 'January', date: new Date()},
        {id: 2, term: '2', pdfUrl: '', title: 'January', date: new Date()},
        {id: 3, term: '3', pdfUrl: '', title: 'January', date: new Date()},
        {id: 4, term: '4', pdfUrl: '', title: 'January', date: new Date()},
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
        renderItem={({item}) => <Item item={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
const Item = ({item}: {item: any}) => (
  <View>
    <Text className="text-[#001D6C] text-[24px] font-medium px-5 mb-4">
      {item.year}
    </Text>
    {item?.report?.map((report: any, index: number) => (
      <View key={index}>
        <View  className="bg-[#E0EDFF] p-2 ">
          <Text className="px-5 text-[#001D6C] text-[16px] font-bold">
            Term {report.term}
          </Text>
        </View>
        <View key={index} className="p-5  flex-row items-center">
          <View className="bg-[#BCBCBCB2] p-4  rounded-2xl">
            <PDF />
          </View>

          {/* <Text>{report.pdfUrl}</Text> */}
          <View className="ml-4 flex-1 ">
            <Text className="text-[#001D6C] text-[15px] ">
              {report.title}.pdf
            </Text>
            <Text className="text-[#9FA1A5] text-[10px] ">
              Uploaded {format(report.date, 'dd MMM yyyy ')}
            </Text>
          </View>

          <MaterialCommunityIcons name="download" color="#001D6C" size={32} />
        </View>
      </View>
    ))}
    <View className="mb-5" />
  </View>
);
export default ReportScreen;
