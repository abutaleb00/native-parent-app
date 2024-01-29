import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ScrollView, Text, View} from 'react-native';
import ReceiptScreen from './ReceiptsScreen';
import {RouteProp, useRoute} from '@react-navigation/native';
import PendingIcon from '../../assets/images/paymentPending.svg';
import SuccessIcon from '../../assets/images/paymentSuccess.svg';
import {format} from 'date-fns';
import {Button, Card} from 'react-native-paper';
import {formatCurrency} from '../../utils/general';
const Tab = createMaterialTopTabNavigator();
interface RouteParams {
  type: string;
}
const FeeDetailScreen = () => {
  const route = useRoute<RouteProp<Record<string, RouteParams>, string>>();
  const type = route.params?.type;
  //   const type = route.params?.type;
  const data = [{}];
  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      className="bg-white flex-1  p-5">
      <View className="flex-[2]">
        <View>
          {type === 'bill' ? (
            <View className=" items-center">
              <PendingIcon />
              <Text className="text-[#FB0D0D] text-[16px] font-bold mt-4">
                Pending Payment
              </Text>
            </View>
          ) : (
            <View className="items-center">
              <SuccessIcon />
              <Text className="text-[#001D6C] text-[16px] font-bold mt-4">
                Payment Success!
              </Text>
            </View>
          )}
        </View>
        <View className="items-center">
          <Text className="text-[#001D6C] text-[32px] font-medium my-5">
            {formatCurrency('100')}
          </Text>
          <Text className="text-[#001D6C] text-[24px] font-light ">
            Samantha Binti Shamil
          </Text>
          <Text className="text-[#001D6C] text-[18px] font-light mt-5">
            INV-001
          </Text>
          <Text className="text-[#001D6C] text-[16px] font-normal mt-3">
            {format(new Date(), 'dd MMM yyyy ')}
          </Text>

          <View className="w-full items-center mt-10">
            <Button
              mode="contained"
              style={{
                paddingVertical: 8,
                borderRadius: 5,
                backgroundColor: '#001D6C',
                width: '80%',
              }}
              labelStyle={{fontSize: 20, fontWeight: '600'}}
              textColor="white"
              onPress={() => console.log('Simple Button pressed')}>
              {type === 'receipt' ? 'Get Receipt' : 'Pay Now'}
            </Button>
            {type === 'receipt' && (
              <Button
                mode="contained"
                style={{
                  paddingVertical: 8,
                  borderRadius: 5,
                  backgroundColor: 'white',
                  marginTop: 20,
                  borderWidth: 0.5,
                  width: '80%',
                  borderColor: '#001D6C',
                }}
                labelStyle={{fontSize: 20, fontWeight: '600'}}
                textColor="#001D6C"
                onPress={() => console.log('Simple Button pressed')}>
                Get Invoice
              </Button>
            )}
          </View>
          <Card className="bg-white rounded-xl p-5 w-full mt-14">
            <Text className="text-[#001D6C] text-[16px] font-medium ">
              Invoice Details
            </Text>
            <View>
              <Text className="text-[#001D6C99] text-[21px] font-normal mt-5">
                Invoice Number: INV-001
              </Text>
              <Text className="text-[#001D6C] text-[20px] font-medium ">
                {formatCurrency('100')}
              </Text>
            </View>
          </Card>
        </View>
      </View>

      {type === 'bill' && (
        <View className=" flex-[0.5] justify-center items-center ">
          <Button
            mode="contained"
            style={{
              paddingVertical: 8,
              borderRadius: 5,
              backgroundColor: 'white',
              marginTop: 20,
              borderWidth: 0.5,
              width: '80%',
              borderColor: '#001D6C',
            }}
            labelStyle={{fontSize: 20, fontWeight: '600'}}
            textColor="#001D6C"
            onPress={() => console.log('Simple Button pressed')}>
            Download Invoice
          </Button>
        </View>
      )}
    </ScrollView>
  );
};
export default FeeDetailScreen;
