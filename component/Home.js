import React, { useContext, useEffect, useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
  Modal,
  Button,FlatList, ActivityIndicator
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { MyContext } from './MyProvider';
import Image1 from './Image1';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Search from './Search';

function Home(props) {
  const[search,setsearch]=useState("")
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
 const navigation=useNavigation()
  const { data1, setData1, cc, setIsLog, isLog } = useContext(MyContext)
  const [contPost,setContPost]=useState(4)
  const [isModal, setIsModal] = useState(false)
  const [searchError, setSearchError] = useState(false)
  
  const handleFav = () => {
    navigation.navigate("Wish")
    setIsModal(false)
  }
  const handleCart = () => {
    navigation.navigate("Mycart")
  
    setIsModal(false)
  }
  const handleLogin = async() => {
    navigation.navigate("Login1")
    setIsLog("false")
   
    setIsModal(false)
  }
  
  
  useEffect(() => {
    
    // Define the API endpoint URL
    const apiUrl = `https://fakestoreapi.com/products?limit=${contPost}`;

    // Make the GET request using fetch
    fetch(apiUrl)
      .then((response) => response.json())
      .then((responseData) => {
       let modifydata= responseData.map((val)=>{
          val.isfavourite=false;
          val.iscart=false;
          val.count=0;
          return val
        })
       
        setData(modifydata);
        setLoading(false);
        setData1(modifydata)
      })
      .catch((error) => {
       
        setLoading(false);
      });
    
  }, [contPost]);

  //searchng
  const handleEnterPress = (text) => {
    
    let p = text.toLowerCase();
    if(p.trim()==""){
      setData(data1)
      return;
    }
let y=data1.filter((val)=>{

  return val.category.toLowerCase().includes(p)||val.title.toLowerCase().includes(p)
})

if(y.length>0 ){
  setData(y)
  setSearchError(false)
}else{
  setData(data1)
  setSearchError(true)
}
   
  };
  //search icon 
  const handleEnterPress1 = () => {
    
    let p = search.toLowerCase();
    if(p.trim()==""){
      setData(data1)
      return;
    }
let y=data1.filter((val)=>{

  return val.category.toLowerCase().includes(p)||val.title.toLowerCase().includes(p)
})

if(y.length>0 ){
  setData(y)
  setSearchError(false)
}else{
  setData(data1)
  setSearchError(true)
}
   
  };

  //pagination
  const handleFlatListScroll = () => {
    if (contPost > data.length) {
      setLoading(false)
      return
    }
    setLoading(true)
    setContPost(contPost + 2)
  }
  return (
    <>
    {/* <View style={{backgroundColor: 'white'}}> */}
      <View style={{ width: wp('100%') }}>
      {isModal &&
          <Modal transparent={true}>
            <View style={{ flex:1,flexDirection: 'row' }}>
              <View style={{ backgroundColor: 'white', width: "60%", height: '100%' }}>
                <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'#047BD5',height:140,width:'100%'}}>
                      <Image style={{height:80,width:80}} source={require('../logo.png')} />
                </View>
                <View style={{ flexDirection: 'column', marginLeft:10,marginTop:25 }}>
                  <TouchableOpacity onPress={handleFav} style={{ backgroundColor: 'skyblue', marginRight: 5, opacity: 0.4, borderRadius: 5 }}>
                    <View style={{ flexDirection: 'row' }}>
                    <Image style={{height:17,width:17, marginLeft:5,marginTop:7}} source={require('../heart.png')} />
                    <Text style={{color:'#047BD5',fontSize:18,fontWeight:'bold',padding:3,marginLeft:5}}>Favourite</Text>
                    </View>
                    
                  </TouchableOpacity>

                  <TouchableOpacity onPress={handleCart} style={{ backgroundColor: 'skyblue', marginRight: 5, opacity: 0.4, borderRadius: 5, marginTop: 15 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Image style={{height:17,width:17, marginLeft:5,marginTop:7}} source={require('../carts.png')} />
                      <Text style={{ color: '#047BD5', fontSize: 18, fontWeight: 'bold', padding: 3, marginLeft: 5 }}>View Cart</Text>
                      </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={handleLogin} style={{ backgroundColor: 'skyblue', marginRight: 5, opacity: 0.4, borderRadius: 5, marginTop: 15 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Image style={{height:17,width:17, marginLeft:5,marginTop:7}} source={require('../logout.png')} />
                      <Text style={{ color: '#047BD5', fontSize: 18, fontWeight: 'bold', padding: 3, marginLeft: 5 }}>Logout</Text>
                      </View>
                  </TouchableOpacity>

                </View>
                <TouchableOpacity onPress={handleLogin}  style={{ justifyContent:'center',alignItems:'center',height: 60, width: 220, marginLeft: 10, borderWidth: 1, marginTop: 470, flexDirection: 'row' }}>
                  <Image style={{ height: 30, width: 30}} source={require('../logouts.png')} />
                  <Text style={{fontSize:25,marginLeft:8,color:'black',fontWeight:'bold'}}>Logout</Text>
                </TouchableOpacity>     
              </View>
              <TouchableOpacity onPress={()=>setIsModal(false)} style={{backgroundColor:'black',width:"40%",height:'100%',opacity:0.3}}>

              </TouchableOpacity>
              
              {/* <View  style={{backgroundColor:'black',width:"40%",height:'100%',opacity:0.3}}>
                        
                        </View> */}
             
              
            </View>
                      
                      
                  </Modal>
                  
                  
        }
        {/* nav */}
        <View style={{backgroundColor:'#047BD5',height:hp('20%'),alignItems:'center'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#047BD5',
            paddingStart: 15,
            paddingEnd: 15,
            height: hp('11%'),
            width:wp('100%')
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: hp('12%'),
              width: wp('48%'),
              // backgroundColor: 'red',
            }}>
              <View style={{}}>
                <TouchableOpacity
                  onPress={() => isLog==='true'?setIsModal(true):navigation.navigate("Login1")}
                >
              <Image
                source={require('.././menu.png')}
                style={{height: hp('.6%'), width: wp('10%'), marginBottom: 2}}
              />
              <Image
                source={require('.././menu.png')}
                style={{height: hp('.6%'), width: wp('10%'), marginBottom: 2}}
              />
              
              <Image
                source={require('.././menu.png')}
                style={{height: hp('.6%'), width: wp('10%'), marginBottom: 2}}
                  />
                </TouchableOpacity>
                
            </View>
            <Image
              source={require('.././flipkart.png')}
              style={{height: hp('12%'), width: wp('30%')}}
            />
          </View>
          <View
            style={{
              height: hp('12%'),
              width: wp('40%'),
              // backgroundColor: 'green',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
              <View style={{ flexDirection: 'row' }}>
                {isLog==='true' && <>
                  <TouchableOpacity
              onPress={()=>{
                navigation.navigate('Wish')
              }}>
              <Image
                source={require('.././whiteheart.png')}
                style={{height:30, width:30,marginTop:3,marginRight:10}}
              />
              </TouchableOpacity>


              <TouchableOpacity
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
                </>}
                
                {
                  isLog==='false' &&
                  <TouchableOpacity onPress={handleLogin} style={{ backgroundColor: 'white', padding: 4, borderRadius: 5 }}>
                      <View style={{flexDirection:'row',}}>
                        <Text style={{ fontSize: 15, paddingLeft: 4, paddingRight: 4 }}>Login</Text>
                        <Image style={{height:20,width:20}} source={require('../user.png')} />
                      </View>
                      
                  </TouchableOpacity>
                }
               
            
              </View>
              
          </View>
          
      
        </View>
          {/* search */}
          
        <View
            style={{
            backgroundColor:"white",
            flexDirection: 'row',
            justifyContent: 'center',
              marginLeft: 10,
              marginRight: 10,
            
            height: hp('7%'),
              width: wp('95%'),
            borderRadius:5,
            
          }}>
          <View
              style={{
                borderRadius:5,
              width: wp('9%'),
              padding: wp('1%'),
              backgroundColor:'white',
                justifyContent: 'center',
              
              }}>
              <TouchableOpacity onPress={handleEnterPress1}>
              <Image
              source={require('.././searchs.png')}
              style={{height: 20, width: 20,marginLeft:1}}
            />
              </TouchableOpacity>
            
          </View>
          
            <TextInput
            style={{flex: 1,backgroundColor:'white'}}
              placeholder="Enter Your Requirements"
              autoCapitalize="none"
              value={search}
              spellCheck={false}
              onChangeText={text => {
                setsearch(text.trim())
                handleEnterPress(""+text.trim())
              }}
              
              onSubmitEditing={handleEnterPress1}
            />
          
          <View
              style={{
              borderRadius:5,
              width: wp('7%'),
              backgroundColor: 'white',
              justifyContent: 'center',
            }}>
            <Image
              source={require('.././microphone.png')}
              style={{height: hp('2.8%'), width: wp('5%')}}
            />
              </View>
          </View>
          
        </View>

      </View>
      {searchError && <Search />}
      {(!searchError) &&
        <>
        <FlatList
            contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap'}}
            data={data}
            onEndReached={handleFlatListScroll}
            onEndReachedThreshold={0.1}
            renderItem={({item}) => <Image1 key={item.id} value2={item} />}
            keyExtractor={item => item.id}
        />
        {loading && <ActivityIndicator size="large" />}
        </>
      }
    </>
  );
}

export default Home;
const styles = StyleSheet.create({
  container: {
    color: 'black',
    backgroundColor: '#047BD5',
    height: hp('10%'),
    width: wp('100%'),
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
});
