import React, { useState, useRef, useCallback } from 'react'
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import Typography from '../Typography/Typography'
import WebView from 'react-native-webview'
import YoutubePlayer from "react-native-youtube-iframe";
const CardLink = (props) => {
    return (<TouchableOpacity style={styles.linkMain}>
        <Typography variant="body1" text={props.label} />
    </TouchableOpacity>)
}

/**
 * 
 * @param {Boolean} activeRead sets state for text to show
 * @returns 
 */
const RacismCard = (props) => {
    const [playing, setPlaying] = useState(false);
    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(false);
            Alert.alert("video has finished playing!");
        }
    }, []);
    const togglePlaying = useCallback(() => {
        setPlaying((prev) => !prev);
    }, []);
    return (
        <View style={styles.main}>
            <TouchableOpacity {...props} style={styles.header}>
                <View style={{ flex: 1, height: 'auto' }}>
                    <Typography variant="subHeader" text={props.title} />
                    <View style={styles.line} />
                </View>
                <View>
                    <Image style={{ width: 24, height: 24, transform: [{ rotate: props.activeRead ? '180deg' : '0deg' }] }} source={require('../../assets/icons/black/expand_more.png')} />
                </View>

                {/* <Image style={{ width: 24, height: 24 }} source={require('../../assets/icons/black/expand_less.png')} /> */}
            </TouchableOpacity>
            <View style={[styles.body, { height: props.activeRead ? 'auto' : 0 }]}>
                <Typography variant="body1" text={props.text} />
                {props.activeRead && (<YoutubePlayer
                    height={200}
                    // play={playing}
                    videoId={props.url}
                // onChangeState={onStateChange}
                />)}

                <Typography variant="body2" text="Examples: " />
                {
                    props.links.map((c, i) => {
                        return (<CardLink key={i} label={c.label} />)
                    })
                }

            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: '#fff',
        borderRadius: 20,
        marginBottom: 5
    },
    header: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    body: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 0,
        paddingBottom: 10,
        top: 0,
        overflow: 'hidden'
    },
    line: {
        width: '50%',
        height: 4,
        backgroundColor: "#ff7433",
        borderRadius: 20
    },
    linkMain: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 5,
        backgroundColor: '#F2F2F2',
        borderRadius: 20,
    }
})

export default RacismCard