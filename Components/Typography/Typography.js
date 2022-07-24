import React from "react";
import { StyleSheet, Text, View } from 'react-native';

/**
 * 
 * @param {String} variant "header" | "subHeader" | "caption" | "bodyOne" | "bodyTwo" | "button" | "label"
 * @param {String} priority "primary" | "secondary" for "button" variant
 * @param {String} text display text
 * @param {String} c "light" |  "dark"
 * @returns 
 */

const Typography = ({ variant, text, priority, c }) => {
    switch (variant) {
        case 'header':
            return (
                <View style={{ width: '100%', ...styles.container }}>
                    <Text style={{ color: c === 'dark' ? "white" : "#1a1a1a", ...styles.header }}>{text}</Text>
                </View>)
            break;
        case 'subHeader':
            return (
                <View style={{ width: '100%', ...styles.container }}>
                    <Text style={{ color: c === 'light' ? 'white' : "#1a1a1a", ...styles.subHeader }}>{text}</Text>
                </View>)
            break;
        case 'caption':
            return (
                <View style={{ ...styles.container }}>
                    <Text style={{ color: c === 'light' ? "#fff" : "#828282", ...styles.caption }}>{text}</Text>
                </View>
            )
            break;
        case 'body1':
            return (
                <View style={{ width: '100%', ...styles.container }}>
                    <Text style={{ color: c === "light" ? '#fff' : "#262626", ...styles.bodyOne }}>{text}</Text>
                </View>)
            break;
        case 'body2':
            return (
                <View style={{ width: '100%', ...styles.container }}>
                    <Text style={{ color: c === 'light' ? "#ffffff" : 'black', ...styles.bodyTwo }}>{text}</Text>
                </View>)
            break;
        case 'button':
            return (
                <View style={{ width: '100%', ...styles.container }}>
                    <Text style={{ color: priority === 'primary' ? "#ffffff" : "#171717", ...styles.button }}>{text}</Text>
                </View>)
            break;
        case 'label':
            return (
                // default text should be dark
                // only when specidy light should color change
                <View style={{ width: '100%', ...styles.container }}>
                    <Text style={{ color: c === 'dark' ? 'white' : "#1a1a1a", ...styles.label }}> {text} </Text>
                </View>)
            break;
        case 'logo':
            return (
                <Text style={styles.logo}> {text} </Text>
            )
            break;
    }
}
const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        marginTop: 10,
        paddingLeft: 0,
    },
    header: {
        width: "100%",
        overflow: "hidden",
        fontStyle: "normal",
        fontFamily: "Montserrat-Bold",
        fontSize: 36
    },
    subHeader: {
        flexShrink: 0,
        fontStyle: "normal",
        fontFamily: "Montserrat-Bold",
        fontSize: 20,
    },
    caption: {
        height: 'auto', flex: 1,
        flexShrink: 0,
        fontWeight: "400",
        fontStyle: "normal",
        fontFamily: "Montserrat-Medium",
        fontSize: 12,
    },
    bodyOne: {
        fontWeight: "400",
        fontStyle: "normal",
        fontFamily: "Montserrat-Regular",
        fontSize: 14,
        lineHeight: 25
    },
    bodyTwo: {
        fontStyle: "normal",
        fontFamily: "Montserrat-SemiBold",
        fontSize: 16,
        textAlign: 'left',
    },
    button: {
        fontStyle: "normal",
        fontFamily: "Montserrat-SemiBold",
        fontSize: 14,
        textTransform: "uppercase",
        textAlign: 'center'
    },
    label: {
        fontWeight: "600",
        fontStyle: "normal",
        fontFamily: "Montserrat-Medium",
        fontSize: 14,
    },
    logo: {
        fontWeight: "900",
        fontStyle: "normal",
        fontFamily: "Montserrat",
        color: "#1a1a1a",
        fontSize: 18,
    }
})
export default Typography