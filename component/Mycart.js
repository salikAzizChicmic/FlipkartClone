import React, { useContext, useEffect, useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  Button,
} from 'react-native';
import { MyContext } from './MyProvider';

import Cartitem from './Cartitem';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

function Mycart(props) {
  const navigation=useNavigation()
  const {data1,setData1,tot,cc,settot,setcc}=useContext(MyContext)
  const [filt,setfilt]=useState([])
  
  useEffect(()=>{
    setfilt(data1.filter((val)=>{
      return val.iscart==true && val.count>0;
         }))
  },[])

  return (
    <>
     <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:60,width:'100%',backgroundColor:'#047BD5',padding:5}}>
    <TouchableOpacity onPress={()=>{
      navigation.goBack()
    }}>
    <Image
                source={require('.././back.png')}
                style={{height: hp('4%'), width: wp('8%')}}
              />
              </TouchableOpacity>
            
</View>
   <Text style={{fontSize:20,fontWeight:'bold',marginLeft:4}}>My Cart</Text>
      <ScrollView contentContainerStyle={{
        flexDirection: 'row', flexWrap: 'wrap', backgroundColor: 'white',marginRight:4
      }}>

   {
    filt.map((val)=>{
      return <Cartitem key={val.id} value3={val} value6={setfilt} />
    })
   }
        {tot>0 &&
          <View>
            <View style={{}}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 6 }}>Price Detail</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: wp('98%'), padding: 3, margin: 4 }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Price</Text>
              <Text style={{ fontSize: 15, fontWeight: 'bold',width:65,height:20 }}>${tot}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: wp('98%'), padding: 3, margin: 4 }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Discount</Text>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>- $0</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: wp('98%'), padding: 3, margin: 4 }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Delivery Charge</Text>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Free Delivery</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: wp('100%'), padding: 3, borderTopWidth: 1, borderBottomWidth: 1 }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Total Amount</Text>
              <Text style={{ fontSize: 15, fontWeight: 'bold' ,width:65,height:20}}>
                {tot}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', width: wp('100%'), marginTop: 8 }}>
              <TouchableOpacity
                onPress={() => {
                
                  let t1 = data1.map((val) => {
                    val.count = 0;
                    val.iscart = false;
                    if (val.count <= 0) {
                      setfilt(data1.filter((val) => {
                        return val.iscart == true && val.count > 0;
                      }))
                    }
                    return val;
                  })
                  settot(0)
                  setcc(0)
                  setData1(t1)
                  Alert.alert("Your order is placed")
                }}
                activeOpacity={0.7}
                style={{
                  backgroundColor: "orange",
                  marginBottom: 15,
                  padding: 4,
                 
                  width: wp("93%"),
                  height: hp('6%'),
            
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',

                }}
              >
                <Text style={{ color: "black", fontWeight: 'bold', fontSize: 20, textAlign: "center" }}>Place Order</Text>
           
              </TouchableOpacity>
            </View>
          </View>
        }
          {/* <View style={{backgroundColor:'white',height:hp('50%'),width:wp('50%'),borderWidth:1}}></View>
          <View style={{backgroundColor:'white',height:hp('50%'),width:wp('50%'),borderWidth:1}}></View>
          <View style={{backgroundColor:'red',height:hp('50%'),width:wp('50%'),borderWidth:1}}></View>
          <View style={{backgroundColor:'white',height:hp('50%'),width:wp('50%'),borderWidth:1}}></View>
          <View style={{backgroundColor:'white',height:hp('50%'),width:wp('50%'),borderWidth:1}}></View>
          <View style={{backgroundColor:'white',height:hp('50%'),width:wp('50%'),borderWidth:1}}></View>
          <View style={{backgroundColor:'white',height:hp('50%'),width:wp('50%'),borderWidth:1}}></View>
          <View style={{backgroundColor:'white',height:hp('50%'),width:wp('50%'),borderWidth:1}}></View>  */}
         
     
        </ScrollView>
    </>
  );
}

export default Mycart;
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    backgroundColor: 'cyan',
  },
});
