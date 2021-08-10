import React,{useState,useEffect} from 'react'
import { ScrollView, View} from 'react-native'
import {
    HeaderContainer,
    Title,
    AddPicContainer,
    AddPicButton,
    PicBox,
    Picture,
    PicText
} from '../components/style'
import axios from 'axios'

const Home=({navigation,route})=>{

    const [response,setResponse]=useState([])
    
    const getAllImage=async()=>{
        const url=`https://photo-app-backend-api.herokuapp.com/image/all/${route.params._id}`
        const data=await axios.get(url)
        setResponse(data.data.images)
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getAllImage()
        })
        return unsubscribe
      }, [navigation])

    const clickHandler = () => {
        navigation.navigate('Addpic',{...route.params})    
    }

    return (
        <View style={{flex:1}}>
            <ScrollView>
                <HeaderContainer source={require('../assets/image/pic5.png')}>
                    <Title>Photo App</Title>
                </HeaderContainer>
                {response.map((image) => {
                   return(
                       <PicBox key={image._id}>
                           <Picture source={{uri:image.path}} />
                           <PicText>Uploaded by: {image.username}</PicText>
                           <PicText>Face Count: {image.countOfFaces}</PicText>
                       </PicBox>
                   )
                })}
            </ScrollView>
            <AddPicContainer onPress={clickHandler}>
                <AddPicButton
                    source={{
                    uri:
                        'https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png'
                    }}
                />
            </AddPicContainer>
        </View>
    )
}

export default Home