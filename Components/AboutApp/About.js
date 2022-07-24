import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import InputButton from '../Button/Button'
import Typography from '../Typography/Typography'
const About = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.mainDetails}>
                <Typography variant="subHeader" text="What is this app?" />
                <Typography variant="body1" text="The Zimele Racism Reporting app intends to collect data on racism hot-spots in South Africa and connect survivors of racism to appropriate justice, mediation and mental health support networks." />
                <Typography variant="subHeader" text="Founded by:" />
                <View style={styles.foundersWrapper}>
                    <Image style={styles.hrs} source={require('../../assets/images/hrs.png')} />
                    <View style={styles.second}>
                        <Image style={styles.ak} source={require('../../assets/images/ak.png')} />
                        <Image style={styles.mlab} source={require('../../assets/images/mlab.png')} />
                    </View>
                </View>
                <InputButton {...props} text="Okay" variant="primary" />
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
    mainDetails: {
        position: 'absolute',
        bottom: 0,
        flex: 1,
        height: "auto", /* 496px */
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: 20,
        backgroundColor: "#ffffff",
        borderRadius: 20,
        margin: 10
    },
    foundersWrapper: {
        flex: 1,
        height: 'auto',
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    hrs: {
        width: 109,
        height: 178,
    },
    second: {
        flex:1 ,
        height: 'auto',
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    ak: {
        width: 188,
        height: 68,
    },
    mlab: {
        width: 167,
        height: 71,
    }

})
export default About