import React from 'react'
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native'
import Typography from '../Typography/Typography'
const NewsCard = (props) => {
    const date = new Date(props.date)
    return (
        <TouchableOpacity activeOpacity={0.7} style={styles.main} {...props}>
            {props.image && (<View style={styles.image}>
                <Image resizeMode="cover" style={{ width: '100%', height: 200 }} source={{ uri: props.image }} />
            </View>)}

            <View style={{ paddingTop: props.image ? 0 : 15, ...styles.details }}>
                <Typography variant="subHeader" text={props.title} />

                <Typography variant="body1" text={`${props.text}...`} />
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderRadius: 20,
                    paddingLeft: 0,
                    paddingRight: 20,
                    paddingLeft: 5,
                    backgroundColor: '#F2F2F2'
                }}>
                    <View style={{
                        maxWidth: '60%',
                        backgroundColor: '#FF7433',
                        paddingLeft: 15,
                        paddingRight: 15,
                        borderRadius: 20
                    }}>
                        {props.author && (<Typography c="light" variant="caption" text={`by ${props.author}`} />)}
                    </View>
                    <View >
                        <Typography variant="body1" text={date.toDateString()} />
                    </View>

                </View>

            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    main: {
        flex: 1,
        height: 'auto',
        backgroundColor: '#fff',
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#f2f2f2'
    },
    image: {
        width: '100%',
        height: 'auto'
    },
    details: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
    }
})
export default NewsCard