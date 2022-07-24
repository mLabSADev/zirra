import React from 'react'
import WebView from 'react-native-webview'
import { View, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native'
import Typography from '../Typography/Typography'

const HEIGHT = Dimensions.get('screen').height

const Hotspots = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.mapView}>
                <WebView style={{ width: '100%', flex: 1, borderTopEndRadius: 20, overflow: 'hidden' }} source={{ uri: props.url ? props.url : 'https://www.lipsum.com/feed/html' }} />
                <TouchableOpacity {...props} style={styles.buttonMain}>
                    <Image style={{ width: 24, height: 24 }} source={require('../../assets/icons/white/close.png')} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        position: 'relative',
        backgroundColor: 'rgba(0, 0, 0, 0.15)'
    },
    mapView: {
        width: '100%',
        height: '90%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: "#fff",
        zIndex: 1
    },
    buttonMain: {
        padding: 15,
        backgroundColor: '#FF7433',
        position: 'absolute',
        zIndex: 20,
        borderRadius: 20,
        top: 10,
        right: 10
    }
})
export default Hotspots