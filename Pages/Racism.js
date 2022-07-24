import React, { useEffect, useState } from 'react'
import { View, SafeAreaView, StyleSheet, Image, ScrollView, Text, Modal } from 'react-native'
import RacismCard from '../Components/RacismCard/RacismCard'
import CARD from '../Components/racismData'
import SpecialButton from '../Components/SpecialButton/SpecialButton'
import Typography from '../Components/Typography/Typography'
import globals from './globals.styles'
import Hotspots from '../Components/Hotspots/Hotspots'
const Racism = (props) => {
    const [activeRead, setActiveRead] = useState('')
    const [openModal, setModal] = useState(false)
    useEffect(() => {
        console.log('Reading: ', props.route.params.active)
        if (props.route.params.active) {
            setTimeout(() => {
                setActiveRead(props.route.params.active)
            }, 300);
        }
    }, [])
    return (
        <View style={styles.container}>
            <Modal animationType="slide"
                transparent={true}
                visible={openModal} >
                <Hotspots url="https://voiceofracism.co.nz/" onPress={() => {
                    setModal(false)
                }} />
            </Modal>
            <SafeAreaView style={styles.wrap}>
                <View style={globals.header}>
                    <View style={styles.header}>
                        <View style={{ flex: 1, height: 'auto' }}>
                            <Typography variant="header" text="Types of Racism" />
                            <View style={styles.line} />
                        </View>
                        <Image style={{ width: 44, height: 44 }} source={require("../assets/images/logo.png")} />
                    </View>
                </View>
                <View style={{ flex: 1, padding: 0, borderRadius: 20, overflow: 'hidden' }}>
                    <ScrollView contentContainerStyle={{ padding: 20 }} >
                        <Typography variant="subHeader" text="Racism" />
                        <Typography variant="body1" text="prejudice, discrimination, or antagonism by an individual, community, or institution against a person or people on the basis of their membership of a particular racial or ethnic group, typically one that is a minority or marginalized." />
                        {CARD.map((c, i) => {
                            return (
                                <RacismCard url={c.videoUrl} links={c.links} key={i} title={c.title} text={c.text} activeRead={activeRead === c.title} onPress={() => {
                                    if (activeRead === c.title) {
                                        setActiveRead('')
                                    } else {
                                        setActiveRead(c.title)
                                    }
                                }} />
                            )
                        })}
                        <View style={styles.special}>
                            <Text style={styles.specialHeader}>Give nothing to racism</Text>
                            <Text style={styles.specialItalics}>It's not just in South Africa.</Text>
                            <Text style={styles.specialBody}>To create the Voice of Racism, more than 200 people shared their experiences of racism in New Zealand. These were curated into a collection of everyday experiences, to represent the racism that exists in the lives of many. These experiences include things that were said to them verbally and through people’s actions, and the internalised racism they live with.</Text>
                            <SpecialButton onPress={() => setModal(true)} />
                        </View>
                    </ScrollView>
                </View>

            </SafeAreaView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#FAFAFA'
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    wrap: {
        height: '100%',
        width: '100%',
    },
    logoWrapper: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    line: {
        width: '50%',
        height: 4,
        backgroundColor: "#ff7433",
        borderRadius: 20
    },
    special: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: 20,
        backgroundColor: "#300042",
        overflow: "visible",
        borderRadius: 20,
    },
    specialHeader: {
        fontFamily: 'Montserrat-Bold',
        color: "#ffffff",
        fontSize: 24,
    },
    specialItalics: {
        fontSize: 14,
        color: "#ffffff",
        fontFamily: 'Montserrat-Italic',
        lineHeight: 23,
        paddingBottom: 20
    },
    specialBody: {
        fontSize: 14,
        color: "#ffffff",
        fontFamily: 'Montserrat-Regular',
        lineHeight: 23
    }
})
export default Racism