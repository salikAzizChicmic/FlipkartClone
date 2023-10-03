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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { MyContext } from './MyProvider';
import { useNavigation } from '@react-navigation/native';


function Imageclick(props) {
   const {title,price,image,rating,category,description,id}=props.route.params.val2;
   const {data1,setData1,settot,tot,cc,setcc,isLog}=useContext(MyContext)
  const [added, setadded] = useState(false)
  const [fav, setfav] = useState(false)
  const navigation = useNavigation()

  useEffect(()=>{
    //console.log("hello")
  data1.map((val)=>{
    //console.log("hello")
    if(val.id==id &&  val.isfavourite==true){
      //console.log(val)
      setfav(true)
    }else if(val.id==id &&  val.isfavourite==false){
      //console.log(val)
      setfav(false)
    }
    return val;
  })
  },[data1])
   useEffect(()=>{
    //console.log("hello")
  data1.map((val)=>{
    //console.log("hello")
    if(val.id==id && val.count>0){
      setadded(true)
    }else if(val.id==id && val.count<=0){
      setadded(false)
    }
    return val;
  })
  },[cc])


  return (
    <>
    <View style={{flexDirection:'row',paddingStart:10,paddingEnd:14,justifyContent:'space-between',alignItems:'center',height:60,width:'100%',backgroundColor:'#047BD5',padding:5}}>
    <TouchableOpacity onPress={()=>{
      navigation.goBack()
    }}>
    <Image
                source={require('.././back.png')}
                style={{height: hp('4%'), width: wp('8%')}}
              />
        </TouchableOpacity>
        {isLog === 'true' && 
          <TouchableOpacity
          disabled={isLog==='true'?false:true}
              onPress={()=>{
                navigation.navigate('Mycart')
              }}>
              <Image
                source={require('.././cart.png')}
                style={{height: hp('4%'), width: wp('8%')}}
              />
              <View style={{backgroundColor:'red',position:'absolute',right:-4,borderRadius:50,height:18,width:18}}>
              <Text style={{color:'white',textAlign:'center'}}>{cc}</Text>
              </View>
              
              </TouchableOpacity>
        }
        
</View>
    <ScrollView contentContainerStyle={{
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        height: hp('100%'),
        width: wp('100%'),
        borderWidth: 1,
        padding: '4%',
      }}>
        <View style={{flexDirection:'row'}}>
      <Image
        source={{uri:image}}
        style={{height: 450, width: 300, borderWidth: 1, padding: 3,objectFit:'contain'}}
          />
          {fav ? <TouchableOpacity
            onPress={() => {
              if (isLog === 'true') {
                let t1 = data1.map((val) => {
                  if (val.id == id) {
                    val.isfavourite = false;
                  }
                  return val;
                })
                setData1(t1)
              }
              else {
                Alert.alert("Please Login")
              }
            }
            }
            activeOpacity={0.7}
            style={{
              padding: 5,
              width: "25%"
            }}
          >
            <Image
              source={require('.././fav_red.png')}
              style={{ height: 50, width: 50, marginTop: 10, marginLeft: 15, objectFit: 'contain' }}
            />
          </TouchableOpacity>:<TouchableOpacity
            onPress={()=>{
              if (isLog === 'true') {
                let t1 = data1.map((val) => {
                  if (val.id == id) {
                    val.isfavourite = true;
              
                    // setfav(true)
                  }
                  return val;
                })
                //console.log(t1)
                setData1(t1)
              }
              else {
                Alert.alert("Please Login")
                
              }
         }
      }  
            activeOpacity={0.7}
            style={{
              padding: 5,
              width: "25%"
            }}
          >
            <Image
              source={require('../heart.png')}
              style={{ height: 50, width: 50, marginTop: 10, marginLeft: 15, objectFit: 'contain' }}
            />
          </TouchableOpacity>}
          </View>
      <View style={{
          backgroundColor: 'white',
          height: '40%',
          width: '100%',
          // borderWidth: 1,
        }}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={{fontWeight:'bold',fontSize:hp('2%'),marginBottom:1}}>
         {title}
        </Text>
        <Text numberOfLines={1} ellipsizeMode="tail" style={{marginBottom:1}}>
          {category}
        </Text>
        <View style={{flexDirection:'row',alignItems:'center',marginBottom:1}}>
        <TouchableOpacity
            onPress={{}} 
            activeOpacity={0.7} 
            style={{
              backgroundColor: "green", 
              marginBottom:1,
              padding: 4,
              marginRight:2,
              width:"25%",
              borderRadius:3
            }}
          >
            <Text style={{ color: "white", textAlign: "center" ,marginBottom:1}}>{rating.rate} *</Text>
          </TouchableOpacity>
          {/* <Text>({price})</Text> */}
        </View>
        <Text style={{color:'blue',fontWeight:'bold',}}>{description}</Text>
        <Text numberOfLines={1} ellipsizeMode="tail" style={{fontWeight:'bold',fontSize:hp("2.5%"),marginBottom:1}}>
          $109.95
        </Text>  
       
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
 {added?<View style={{padding:1,width:wp('95%'),backgroundColor:'green'}}><Text style={{ color: "white", textAlign: "center" ,fontSize:20,fontWeight:'bold',height:45,marginTop:10}}>ADDED</Text></View>:  <TouchableOpacity
              onPress={() => {
                if (isLog === 'true') {
                  let t1 = data1.map((val) => {
                    if (val.id == id && val.count == 0) {
                      val.iscart = true;
                      val.count = 1;
                      settot(tot + val.price)
                      setcc(cc + 1)
                      //setadded(false)
                      // val.title="sdfas";
                    } else {
                      //setadded(true)
                    }
                    return val;
                  })
                  setData1(t1)
                }
                else {
                  Alert.alert("Please Login")
                  navigation.navigate('Login1')
                }
              
            }} 
            activeOpacity={0.7} 
            style={{
              backgroundColor: "#FF4200", 
              padding: 5,
              //borderWidth:1,
              width:"100%",height:50
            }}
          >
            <Text style={{ color: "white", textAlign: "center",fontSize:20,fontWeight:'bold',marginTop:5 }}>ADD TO CART</Text>
          </TouchableOpacity>
          } 


{/* <TouchableOpacity
            onPress={()=>{
              Alert.alert('your item is ready')
            }} 
            activeOpacity={0.7} 
            style={{
              backgroundColor: "#FF4200", 
              padding: 5,
              borderLeftWidth:1,
              width:"50%"
            }}
          >
            <Text style={{ color: "white", textAlign: "center" }}>BUY NOW</Text>
          </TouchableOpacity> */}





          {/* <TouchableOpacity
            onPress={{}} 
            activeOpacity={0.7} 
            style={{
              //backgroundColor: "#FF4200", 
              padding: 5,
              
              width:"20%"
            }}
          >
            <Image
              source={require('.././fav_white.png')}
              style={{height: hp('2.8%'), width: wp('5%')}}
            />
          </TouchableOpacity> */}
         
          </View>
      </View>
    </ScrollView>
    </>
  );
}

export default Imageclick;
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    backgroundColor: 'cyan',
  },
});
