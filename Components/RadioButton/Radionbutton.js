import React from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import Typography from '../Typography/Typography'

/**
 * 
 * @param {String} lc label color - "light" | "dark" 
 * @returns 
 */

function Radionbutton(props) {
    return (
        <TouchableOpacity {...props} style={styles.container}>
            <View style={{ backgroundColor: props.active ? '#FF7433' : 'rgba(135, 135, 135, 0.14)', ...styles.radioContainer }}>
                <View style={{ backgroundColor: props.active ? 'white' : null, ...styles.radioDot }}></View>
            </View>
            <View style={{flex: 1, height: '100%'}}>
                <Typography c={props.lc} variant="label" text={props.label} />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
    radioContainer: {
        width: 26,
        height: 26,
        borderRadius: 200,
        padding: 7,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,

    },
    radioDot: {
        width: '100%',
        height: '100%',

        borderRadius: 200
    },

})
export default Radionbutton