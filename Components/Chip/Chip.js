import React from 'react'
import { TouchableOpacity, View, Image, StyleSheet } from 'react-native'
import Typography from '../Typography/Typography'
const Chip = (props) => {
    return (
        <TouchableOpacity style={styles.containerChip} {...props}>
            <View>
                <Typography variant="caption" text="more" />
            </View>
            <Image style={{ width: 14, height: 14, marginLeft: 10 }} resizeMode="contain" source={require('../../assets/icons/black/chevron_right.png')}></Image>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    containerChip: {
        width: 'auto',
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: "#ffffff",
        borderRadius: 30,
    }
})
export default Chip