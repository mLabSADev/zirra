import React from 'react'
import { View, Modal, StyleSheet } from 'react-native'
import InputButton from '../Button/Button'
import Typography from '../Typography/Typography'
/**
 * 
 * @param {String} header Header 
 * @param {String} text Message
 * @param {Boolean} open Message
 * @returns 
 */
const AlertBox = (props) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.open}
            onDismiss={() => {
                console.log("Modal has been closed.", props);
            }}
        >
            <View style={styles.container}>
                <View style={styles.main}>
                    <Typography variant="subHeader" text={props.header} />
                    <Typography variant="body1" text={props.text} />
                    <View style={{ height: 70 }}>
                        <InputButton {...props} variant="primary" text="Okay" />
                    </View>

                </View>
            </View>

        </Modal>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.50)',
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    main: {
        width: '76%',
        height: "auto", /* 198px */

        padding: 20,
        backgroundColor: "#ffffff",
        overflow: "hidden",
        borderRadius: 20,
    }
})
export default AlertBox;