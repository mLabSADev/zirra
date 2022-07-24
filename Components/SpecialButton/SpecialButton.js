import React from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import Typography from '../Typography/Typography'
function SpecialButton(props) {
    return (
        <TouchableOpacity {...props} style={styles.main}>
            <View><Typography c="dark" variant="label" text="Listen to the experience" /></View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    main: {
        width: "100%",
        height: "auto", /* 42px */
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: "rgba(255, 255, 255, 0.09)",
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: 20,
        marginTop: 20
    }
})
export default SpecialButton