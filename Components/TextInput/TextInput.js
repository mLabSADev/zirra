import React, { useState } from "react";
import { TextInput, StyleSheet, View } from 'react-native';
import Typography from "../Typography/Typography";

/**
 * 
 * @param {String} type enum("default", 'numeric', 'email-address', "ascii-capable", 'numbers-and-punctuation', 'url', 'number-pad', 'phone-pad', 'name-phone-pad', 'decimal-pad', 'twitter', 'web-search', 'visible-password')
 * @param {String} label placeholder / label
 * @param {String} lc label color - "light" : "dark"
 * @param {String} ic input color - "light" : "dark"
 * @param {Number} nol (numberOfLines) for textarea inputs
 * @param {Boolean} ml (multiline) text area (true) or default input (false)
 * @param {Boolean} disabled disable or enable input (false by default)
 */
const InputText = (props) => {
    const [inputHeight, setInputHeight] = useState(90)
    return (
        <View style={styles.container}>
            <Typography c={props.lc} text={props.label} variant="label" />
            <TextInput
                {...props}
                editable={!props.disabled }
                // selectTextOnFocus={props.disabled}
                multiline={props.ml}
                numberOfLines={props.nol > 1 ? props.nol : 1}
                style={{ color: props.ic === 'light' ? 'white' : 'black', ...styles.input }}
                keyboardType={props.type}
                onContentSizeChange={e => setInputHeight(e.nativeEvent.contentSize.height)} // can help with autoheight but need to code it
            />
        </View>)
}

var styles = StyleSheet.create({
    container: {
        boxSizing: "border-box",
        flexShrink: 0,
        width: '100%', /* 330px */
        height: "auto", /* 106px */
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        paddingTop: 10,
        overflow: "visible",
    },
    input: {
        width: '100%',
        backgroundColor: "rgba(135, 135, 135, 0.10)",
        borderColor: "rgba(130, 130, 130, 0.15)",
        borderWidth: 1,
        borderRadius: 20,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,

    }
})

export default InputText;