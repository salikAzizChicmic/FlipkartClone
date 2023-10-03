import { useNavigation } from '@react-navigation/native'
import React, { useContext, useEffect, useState } from 'react'
import { View ,Text, ScrollView, Image,TouchableOpacity} from 'react-native'
import Image1 from './Image1'
import { MyContext } from './MyProvider'

const Search = ({ route }) => {
  
  const navigation=useNavigation()

    return (
      <ScrollView style={{ backgroundColor: "white" }}>
          <View style={{ justifyContent: 'center', alignItems: 'center',marginTop:200 }}>
              <Image style={{height:120,width:120}} source={require('../serror.png')} />
              <Text style={{ fontWeight: '500', fontSize: 16, color: 'black' }}>Sorry, no results found!</Text>
              <Text style={{marginLeft:13,marginRight:13,textAlign:'center'}}>Please check the spelling or try searching for something else</Text>
          </View>
    
    </ScrollView>
  )
}

export default Search