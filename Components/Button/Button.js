import React from "react";
import { TouchableOpacity, StyleSheet } from 'react-native'
import Typography from "../Typography/Typography";

/**
 * 
 * @param {String} variant for text, "primary" = orange
 * @param {String} text display text
 * @returns 
 */

const InputButton = (props) => {
    return (
        <TouchableOpacity {...props} activeOpacity={0.4} style={{ backgroundColor: props.variant == 'primary' ? '#FF7433' : '#FAFAFA', ...styles.primary }}>
            <Typography priority={props.variant} text={props.text} variant="button" />
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    primary: {
        flex: 1,
        height: 'auto',
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
        marginTop: 10,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        overflow: "hidden",
        borderRadius: 20,

    }
})
export default InputButton