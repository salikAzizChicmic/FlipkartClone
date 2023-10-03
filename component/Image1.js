import { useNavigation } from '@react-navigation/native';
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


function Image1(props) {
  const {title,price,image,rating,category,id}=props.value2;
 
  const {data1,setData1,settot,tot,cc,setcc,isLog}=useContext(MyContext)
const [added,setadded]=useState(false)
const navigation=useNavigation()
  const [fav, setfav] = useState(false)
  
  
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


  return (
    <TouchableOpacity  onPress={()=>{
      navigation.navigate('Imageclick',{val2:props.value2})
    }} >
    <View
      style={{
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        height: hp('54%'),
        width: wp('50%'),
          borderWidth: 1,
          borderColor:'lightgrey',
        padding: '2%',
      }}>
      <Image
        source={{uri:image}}
        style={{height: '53%', width: '70%', borderWidth: 1, paddingTop: 3,objectFit:'contain'}}
      />
      <View
        style={{
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
              borderRadius:3,
              flexDirection:'row',
              justifyContent:'space-between',
              alignItems:'center'
            }}
          >
            <Text style={{ color: "white", textAlign: "center" ,marginBottom:1}}>{rating.rate}</Text>
            <Image
              source={require('.././star.png')}
              style={{height: hp('2%'), width: wp('4%')}}
            />
          </TouchableOpacity>
          <Text>({rating.count})</Text>
        </View>
        <Text numberOfLines={1} ellipsizeMode="tail" style={{fontWeight:'bold',fontSize:hp("2.5%"),marginBottom:1}}>
          ${price}
        </Text>  
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
      {added?<View style={{padding:4,width:"50%"}}><Text style={{fontWeight:'bold' ,color: "white", textAlign: "center",backgroundColor:'green' ,fontSize:15,borderRadius:5}}>ADDED</Text></View>:  <TouchableOpacity
            onPress={()=>{
                if (isLog==='true') {
                  let t1= data1.map((val)=>{
                    if(val.id==id && val.count==0){
                      val.iscart=true;
                      val.count=1;
                      settot(tot+val.price)
                      setcc(cc+1)
    
                    }else{
                      //setadded(true)
                    }
                    return val;
                  })
                  setData1(t1)
                 //Alert.alert(JSON.stringify(t1))
                } else {
                  Alert.alert("Please Login")
                  navigation.navigate('Login1')
             }
            }} 
            activeOpacity={0.7} 
            style={{
              backgroundColor: "#FF4200", 
              padding: 5,
              borderRadius: 5,
              width:"50%"
            }}
          >
            <Text style={{ color: "white", textAlign: "center",fontWeight:'bold',fontSize:15 }}>ADD</Text>
          </TouchableOpacity>
          }
          {fav?<TouchableOpacity
            onPress={()=>{
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
                  navigation.navigate('Login1')
                }
             }
          }  
            activeOpacity={0.7} 
            style={{
              padding: 5,
              width:"25%"
            }}
          >
            <Image
              source={require('.././fav_red.png')}
              style={{height: hp('2.8%'), width: wp('10%'),objectFit:'contain'}}
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
                    navigation.navigate('Login1')
                  }
             }
          }  
            activeOpacity={0.7} 
            style={{
              //backgroundColor: "#FF4200", 
              padding: 5,
              
              width:"20%"
            }}
          >
            <Image
              source={require('.././fav_white.png')}
              style={{height: hp('2.8%'), width: wp('5%'),objectFit:'contain'}}
            />
          </TouchableOpacity>}
         
          </View>
      </View>
    </View>
    </TouchableOpacity>
  );
}

export default Image1;
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    backgroundColor: 'cyan',
  },
});
