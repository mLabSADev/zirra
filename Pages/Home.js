import React, { useState, useEffect, useRef } from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
    Image,
    Modal,
    StatusBar,
    Animated
} from 'react-native';
import Swiper from "react-native-swiper";
import InputButton from "../Components/Button/Button";
import InputText from "../Components/TextInput/TextInput";
import TypesCard from "../Components/TypesCard/TypesCard";
import Typography from "../Components/Typography/Typography";
import MultipleShadows from "react-native-multiple-shadows";
import Chip from "../Components/Chip/Chip";
import NewsfeedCard from "../Components/NewsfeedCard/NewsfeedCard";
import About from "../Components/AboutApp/About";
import Hotspots from "../Components/Hotspots/Hotspots";
import globals from "./globals.styles";

const TYPES = [{
    icon: require('../assets/images/individual.png'),
    bg: require('../assets/images/individual_pattern.png'),
    label: 'Individual Racism'
}, {
    icon: require('../assets/images/systemic.png'),
    bg: require('../assets/images/systemic_pattern.png'),
    label: 'Systemic Racism'
}, {
    icon: require('../assets/images/internalised.png'),
    bg: require('../assets/images/internalised_pattern.png'),
    label: 'Internalised Racism'
}]
const NEWSFEED = [{
    BG: 'https://static.euronews.com/articles/stories/04/73/52/50/1280x720_cmsv2_525c30d3-2b68-5714-b2d6-18d2384822aa-4735250.jpg',
    label: 'Anti-racism protests spread throughout the world'
}, {
    BG: 'https://static.euronews.com/articles/stories/04/73/52/50/1052x701_cmsv2_94ec03d4-920b-5707-b0cb-52622072eeab-4735250.jpg',
    label: "Riot police protect the statue of Belgium's King Leopold II "
}, {
    BG: 'https://static.euronews.com/articles/stories/04/73/52/50/1052x701_cmsv2_b4f12c9e-1ffa-5a7e-abf2-17bb1444cf54-4735250.jpg',
    label: "Riot officers fired tear gas as protesters threw projectiles"
}, {
    BG: 'https://static.euronews.com/articles/stories/04/73/52/50/1052x701_cmsv2_9d063823-a3f7-5270-b726-17f9b3041a64-4735250.jpg',
    label: "People light flares as they gather in Milan"
},]
const Home = (props) => {
    const [aboutOpen, setAboutOpen] = useState(false)
    const [hotspotModal, setHotspotModal] = useState(false)
    const [viewHeight, setViewHeight] = useState(false)
    const heightAnim = useRef(new Animated.Value(95)).current

    const hideText = () => {
        Animated.timing(
            heightAnim,
            {
                toValue: 0,
                useNativeDriver: false,
                duration: 300
            }
        ).start()
    }
    const showText = () => {
        Animated.timing(
            heightAnim,
            {
                toValue: 95,
                useNativeDriver: false,
                duration: 300
            }
        ).start()
    }
    const onChange = (nativeEvent) => {
        if (nativeEvent.contentOffset.y > 20) {
            hideText()
        } else {
            showText()
        }
    }
    useEffect(() => {
        // const backHandler = BackHandler.addEventListener(
        //     "hardwareBackPress",
        //     () => {
        //         if (aboutOpen) {
        //             console.log('about open')
        //             setAboutOpen(false)
        //             return true
        //         } else if (hotspotModal) {
        //             console.log('hotspot open')
        //             setHotspotModal(false)
        //             return true
        //         } else {
        //             Alert.alert("Exiting Zirra", "Exit App?", [
        //                 {
        //                     text: "Cancel",
        //                     onPress: () => null,
        //                     style: "cancel"
        //                 },
        //                 { text: "YES", onPress: () => BackHandler.exitApp() }
        //             ]);
        //             return true;
        //         }

        //     }
        // );

        // return () => backHandler.remove();
    }, []);
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#fff" barStyle="#000" />
            {/* About modal */}
            <Modal animationType="slide"
                transparent={true}
                visible={aboutOpen}>
                <About onPress={() => {
                    setAboutOpen(false)
                }} />
            </Modal >
            {/* End About Modal */}

            {/* Map Modal */}
            <Modal animationType="slide"
                transparent={true}
                visible={hotspotModal} >
                <Hotspots onPress={() => {
                    setHotspotModal(false)
                }} />
            </Modal>
            {/* End Map Modal */}

            {/* Main Page */}
            <SafeAreaView style={styles.wrap} >
                {/* Header */}
                <View style={globals.header}>
                    {/* Logo */}
                    <View style={styles.logoContainer}>
                        <View style={styles.logoWrapper}>
                            <Typography variant="logo" text="Zirra" />
                            <View style={styles.line}></View>
                        </View>
                        <MultipleShadows style={styles.innerShadow} shadowStyles={styles.shadows} count={styles.shadows.length}>
                            <Image style={{ width: 44, height: 44 }} source={require('../assets/images/logo.png')} />
                        </MultipleShadows>
                    </View>
                    {/* ... */}

                    {/* Text */}
                    <Typography variant="header" text="Zimele Racism Reporting" />
                    <Animated.View style={{ height: heightAnim, width: '100%', overflow: 'hidden' }}>
                        <Typography variant="body1" text="This App works as a racism incident reporting tool that allows individuals to report cases of racism countrywide." />
                    </Animated.View>



                    {/* ... */}

                    {/* Buttons */}
                    <View style={styles.headerButtonsW}>
                        <InputButton onPress={() => {
                            props.navigation.navigate('Report')
                        }} variant="primary" text="REPORT RACISM" />
                        <View style={{ width: 10, height: '100%' }} />
                        <InputButton text="ABOUT" onPress={() => setAboutOpen(true)} />
                    </View>
                    {/* ... */}
                </View>
                {/* ... */}

                {/* Scroll */}
                <ScrollView onScroll={({ nativeEvent }) => onChange(nativeEvent)} style={styles.homeContent}>
                    <View style={styles.typesHeader}>
                        <View style={{ flex: 1, height: 'auto' }}>
                            <Typography variant="label" text="Types of Racism" />
                        </View>

                    </View>
                    {TYPES.map((c, i) => {
                        return (
                            <TypesCard index={i} onPress={() => {
                                props.navigation.navigate('Racism', { active: c.label })
                            }} key={i} bg={c.bg} image={c.icon} label={c.label} />
                        )
                    })}
                    {/* <ScrollView horizontal style={{ width: '100%', paddingTop: 5, paddingBottom: 5 }}>

                    </ScrollView> */}
                    {/* <View style={styles.typesHeader}>
                        <View style={{ flex: 1, height: 'auto' }}><Typography variant="label" text="Newsfeed" /></View>
                        <Chip onPress={() => {
                            props.navigation.navigate('Newsfeed')
                        }} text="more" />
                    </View> */}
                    {/* <ScrollView horizontal>
                        {NEWSFEED.map((c, i) => (
                            <NewsfeedCard onPress={() => {
                                props.navigation.navigate('Newsfeed')
                            }} key={c.label} label={c.label} bg={c.BG} />
                        ))}

                    </ScrollView> */}
                </ScrollView>
                {/* ... */}

                {/* Hotspot Button */}
                {/* <View style={styles.buttonWrapper}>
                    <InputButton onPress={() => setHotspotModal(true)} text="REPORT HOTPOTS" />
                </View> */}
                {/* ... */}
            </SafeAreaView>
        </View>
    )
}
var styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#FAFAFA'
    },
    wrap: {
        height: '100%',
        width: '100%',
    },
    logoContainer: {
        width: '100%',
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    logoWrapper: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    line: {
        width: 60,
        height: 4,
        backgroundColor: "#ff7433",
        borderRadius: 20
    },
    headerButtonsW: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: '#fff',
    },
    buttonWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: '#fff',
        paddingLeft: 20,
        paddingRight: 20
    },
    homeContent: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    typesHeader: {
        width: "100%",
        height: "auto", /* 54px */
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10,
    },
    racisms: {
        flexShrink: 0,
        width: "100%",
        height: "auto", /* 174px */
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    innerShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    shadow: {
        shadowColor: '#FF0000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 200.
    },
    shadows: [{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    {
        shadowColor: 'green',
        shadowOffset: { width: -12, height: -12 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
    },
    {
        shadowColor: '#252525',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 50,
    }]
})

export default Home;