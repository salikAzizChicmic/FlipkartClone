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

function Wishimage(props) {
  const {title,price,image,rating,category,id,count}=props.value8;
  //const p=props.value6;
  const {data1,setData1,tot,settot,cc,setcc}=useContext(MyContext)
 const navigation=useNavigation();
  const img1=image;
  const [added,setadded]=useState(false)


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
   
    <TouchableOpacity  onPress={()=>{
       navigation.navigate('Imageclick',{val2:props.value8})
    }}
    >
    <View
      style={{
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        height: hp('54%'),
        width: wp('50%'),
        borderWidth: 1,
        padding: '2%',
        }}>
        <View style={{ flexDirection: 'row',height:'53%' }}>
        <Image
        source={{uri:img1}}
        style={{ width: '70%', borderWidth: 1, paddingTop: 3,objectFit:'contain'}}
          />
           <TouchableOpacity onPress={()=>{
        let t1= data1.map((val)=>{
          if(val.id==id){
            val.isfavourite=false;
            props.value9(data1.filter((val)=>{
              return val.isfavourite==true ;
                 }))
          }
          return val;
        })
        //let t2=tot-price;
        setData1(t1) 
       // settot(t2)
       }}
            activeOpacity={0.7} 
            style={{
             // backgroundColor: "green", 
              marginBottom:1,
              padding: 4,
              marginLeft:15,
              marginTop:8,
              
              
            }}
          >
            <Image style={{height:20,width:20}} source={require('../trash.png')} />
           
          </TouchableOpacity>
        </View>
      
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
        <Text numberOfLines={1} ellipsizeMode="tail" style={{fontWeight:'bold',fontSize:hp("2.5%"),marginBottom:1}}>
        ${price}
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
          <Image
              source={require('.././plus.png')}
              style={{height: hp('7%'), width: wp('14%'),marginLeft:80}}
            />
           
        </View>
         
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        {/* <TouchableOpacity
            onPress={{}} 
            activeOpacity={0.7} 
            style={{
              backgroundColor: "#FF4200", 
              padding: 5,
              
              width:"80%"
            }}
          >
            <Text style={{ color: "white", textAlign: "center" }}>Add to Cart</Text>
          </TouchableOpacity> */}
        {added?<View style={{padding:1,width:"80%"}}><Text style={{ color: "white", textAlign: "center",backgroundColor:'green' ,fontSize:20}}>ADDED</Text></View>:  <TouchableOpacity
            onPress={()=>{
             let t1= data1.map((val)=>{
                if(val.id==id && val.count==0){
                  val.iscart=true;
                  val.count=1;
                  settot(tot+val.price)
                  setcc(cc+1)
                  //setadded(false)
                 // val.title="sdfas";
                }else{
                  //setadded(true)
                }
                return val;
              })
              setData1(t1)
             //Alert.alert(JSON.stringify(t1))
            }} 
            activeOpacity={0.7} 
            style={{
              backgroundColor: "#FF4200", 
              padding: 5,
              //borderWidth:1,
              width:"80%"
            }}
          >
            <Text style={{ color: "white", textAlign: "center" }}>ADD TO CART</Text>
          </TouchableOpacity>
          } 

         
          </View>
      </View>
    </View>
    </TouchableOpacity>
  
  );
}

export default Wishimage;
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    backgroundColor: 'cyan',
  },
});
