import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import Typography from '../Typography/Typography'
const CheckMark = (props) => {
    return (
        <TouchableOpacity {...props} style={styles.main}>
            <View style={styles.textWrapper}>
                <Typography c="dark" variant="label" text="I want to report this anonymously" />
            </View>
            <CheckBox onValueChange={props.onValueChange} value={props.value} />
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    main: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 10,
        paddingLeft: 15,
        paddingBottom: 10,
        paddingRight: 15,
        overflow: "visible",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#FF7433'
    },
    textWrapper: {
        flex: 1,
        height: 'auto'
    }
})
export default CheckMark