import React from 'react'
import { TouchableOpacity, View, Image, ImageBackground, StyleSheet } from 'react-native'
import Typography from '../Typography/Typography'
import LinearGradient from 'react-native-linear-gradient';
const TypesCard = (props) => {
    const colors = [['#FC7272', '#DF1515'], ['#1ED2FC', '#015FDF'], ['#9FE99F', '#2C8B2C']]
    
    return (
        <LinearGradient colors={colors[props.index]} style={styles.linearGradient}>
            <TouchableOpacity {...props} activeOpacity={0.9} style={styles.container}>
                <View resizeMode='cover' style={styles.bg} source={props.bg}>
                    <Image resizeMode='contain' style={styles.image} source={props.image} />
                </View>
                <View style={styles.details}>
                    <Typography variant="body2" text={props.label} />
                </View>
            </TouchableOpacity>
        </LinearGradient>

    )
}
const styles = StyleSheet.create({
    container: {
        flexShrink: 0,
        flex: 1,
        height: "auto", /* 174px */
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 1)",
        overflow: "hidden",
        borderRadius: 19,
        marginVertical: 1,
        marginLeft: 1,
        marginRight: 10,
        elevation: 1,
        paddingHorizontal: 20
    },
    linearGradient: {
        borderRadius: 20,
        marginBottom: 10,
    },
    bg: {
        height: 100,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "visible",
        borderRadius: 8,
    },
    image: {
        width: 60,
        // height: 72,
    },
    details: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        paddingLeft: 10,
        paddingRight: 10,
    }
})
export default TypesCard