import React from 'react'
import { View, StyleSheet } from 'react-native'
import Typography from '../Typography/Typography'
const ProgressBar = (props) => {
    return (
        <View style={styles.container}>
            <View>
                <Typography variant="caption" text={`${props.state}`} />
            </View>
            <View style={styles.barWrapper}>
                <View style={{ width: `${props.progress}%`, ...styles.bar }}></View>
            </View>
            <View>
                <Typography variant="caption" text={`${props.progress}%`} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        height: 'auto',
        alignItems: 'center'
    },
    barWrapper: {
        flex: 1,
        height: 'auto',
        marginLeft: 10,
        marginRight: 10
    },
    bar: {
        height: 5,
        backgroundColor: '#FF7433',
        borderRadius: 10
    }
})
export default ProgressBar