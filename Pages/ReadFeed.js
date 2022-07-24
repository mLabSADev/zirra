import React from 'react'
import { View, SafeAreaView, StyleSheet, ImageBackground, StatusBar, ScrollView, Text, Image } from 'react-native'
import Typography from '../Components/Typography/Typography'
import LinearGradient from 'react-native-linear-gradient';
import InputButton from '../Components/Button/Button';
const ReadFeed = () => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#FF7433" />
            <View style={styles.picture}>
                <ImageBackground source={{ uri: 'https://media.istockphoto.com/photos/circuit-blue-board-background-copy-space-computer-data-technology-picture-id1340728386?b=1&k=20&m=1340728386&s=170667a&w=0&h=FQ7GuNOoq7JzCwb4YWJZ3iyMxky5hAaVnFf7VcQ-dA0=' }} resizeMode='cover' style={{ width: '100%', height: '100%' }} >
                    <View></View>
                    <LinearGradient style={styles.headerDetails} colors={['rgba(0, 0, 0, 0)', 'rgb(0, 0, 0)']}>
                        <Typography c="light" variant="subHeader" text="Racism in sport: why it comes to the surface when teams lose" />
                        <Typography c="light" variant="body1" text="Published: July 14, 2021" />
                    </LinearGradient>
                </ImageBackground>
            </View>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ padding: 20 }}>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        {/* Author */}
                        <View style={authorStyles.main}>
                            <View style={authorStyles.initials}>
                                <Text style={{ textAlign: 'center' }}>JT</Text>
                            </View>
                            <View><Typography variant="caption" text="Jade Travis" /></View>
                        </View>
                        {/* ... */}
                        {/* Views */}
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: '#000', paddingRight: 10 }}>56</Text>
                            <Image resizeMode='contain' style={{ width: 24, height: 24 }} source={require('../assets/icons/coloured/eye.png')} />
                        </View>
                        {/* ... */}
                    </View>
                    <Typography variant="body1" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum quam quam, mollis quis scelerisque quis, sodales at nulla. Cras ac porta arcu, sed condimentum tortor. Phasellus eget risus arcu. Aliquam sapien nisl, auctor a sodales eu, vulputate nec lectus. Phasellus blandit varius cursus. Suspendisse semper gravida odio vitae luctus. Donec porttitor sem enim, ac egestas leo tristique et. Phasellus convallis justo eu elit tristique, id cursus ligula porttitor. Nullam vitae tristique velit, sit amet tempor neque. Maecenas laoreet felis et semper accumsan. Phasellus sed ornare velit. Quisque eget leo magna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.Suspendisse semper gravida odio vitae luctus. Donec porttitor sem enim, ac egestas leo tristique et. Phasellus convallis justo eu elit tristique, id cursus ligula porttitor. Nullam vitae tristique velit, sit amet tempor neque. Maecenas laoreet felis et semper accumsan. Phasellus sed ornare velit. Quisque eget leo magna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.Suspendisse semper gravida odio vitae luctus. Donec porttitor sem enim, ac egestas leo tristique et. Phasellus convallis justo eu elit tristique, id cursus ligula porttitor. Nullam vitae tristique velit, sit amet tempor neque. Maecenas laoreet felis et semper accumsan. Phasellus sed ornare velit. Quisque eget leo magna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.Suspendisse semper gravida odio vitae luctus. Donec porttitor sem enim, ac egestas leo tristique et. Phasellus convallis justo eu elit tristique, id cursus ligula porttitor. Nullam vitae tristique velit, sit amet tempor neque. Maecenas laoreet felis et semper accumsan. Phasellus sed ornare velit. Quisque eget leo magna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.Suspendisse semper gravida odio vitae luctus. Donec porttitor sem enim, ac egestas leo tristique et. Phasellus convallis justo eu elit tristique, id cursus ligula porttitor. Nullam vitae tristique velit, sit amet tempor neque. Maecenas laoreet felis et semper accumsan. Phasellus sed ornare velit. Quisque eget leo magna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus." />
                </View>
            </ScrollView>
            <View style={{height: 70, paddingLeft: 20, paddingRight: 20}}>
                <InputButton variant="primary" text="Support Event" />
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#FAFAFA'
    },
    wrap: {
        height: '100%',
        width: '100%',
    },
    picture: {
        width: "100%",
        height: "34%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        overflow: "hidden",
        position: 'relative',
        borderBottomEndRadius: 30,
        borderBottomStartRadius: 30,
    },
    headerDetails: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: 20
    }
})
const authorStyles = StyleSheet.create({
    main: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 3,
        paddingBottom: 3,
        paddingRight: 16,
        paddingLeft: 3,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ebebeb'
    },
    picture: {
        width: 30,
        height: 30
    },
    initials: {
        width: 30,
        height: 30,
        backgroundColor: "rgb(255, 116, 51)",
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        marginRight: 10
    },
})
export default ReadFeed