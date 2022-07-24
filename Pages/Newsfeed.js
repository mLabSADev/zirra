import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, StyleSheet, Image, ScrollView, Modal, ActivityIndicator } from 'react-native'
import NewsCard from '../Components/NewsCard/NewsCard'
import Typography from '../Components/Typography/Typography'
import globals from './globals.styles'
const data = [{
    title: 'In an electoral democracy, protest provides an essential voice for minority groups',
    author: 'Jane Doe',
    urlToImage: 'https://media.istockphoto.com/photos/rear-view-of-people-with-placards-and-posters-on-global-strike-for-picture-id1181043820?k=20&m=1181043820&s=612x612&w=0&h=deGUZpwPxx5Fo5qXgq04dQEa_66OMxLByaxWn7Ic2TU=',
    description: 'The classic theorists of representational government recognised that universal suffrage and majority voting threaten to impose the ‘tyranny of the majority’ and override...',
    publishedAt: '25 March 2022'
}, {
    title: 'People realise that they are not alone',
    author: 'Batman',
    urlToImage: 'https://images.unsplash.com/photo-1591259622709-bdb033b4be2b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvdGVzdHxlbnwwfHwwfHw%3D&w=1000&q=80',
    description: 'One way in which the establishment maintains its power is by creating a dominant discourse from which dissidents’ views are excluded. If people think differently, they may feel...',
    publishedAt: '25 March 2022'
}, {
    title: 'Sometimes we win in ways we had not intended or planned',
    author: 'Ghost',
    urlToImage: 'https://cdn2.opendemocracy.net/media/images/International_Womens_Day_March_29_June_2017_Lo.width-800_rsw5zid.jpg',
    description: 'Political events are unpredictable. The protests against nuclear cruise missiles at Greenham Common in the UK in the 1980s appeared to have failed when the missiles were installed,...',
    publishedAt: '25 March 2022'
},]
const Newsfeed = (props) => {
    const [news, setNews] = useState(data)
    const [openModal, setModal] = useState(true)
    const [activeRead, setActiveRead] = useState('')
    useEffect(() => {
        fetch('https://newsapi.org/v2/everything?q=racism&from=2022-02-23&sortBy=publishedAt&apiKey=29b31e76ab0a43f2a429669b689dabf2').then(res => {
            res.json().then(data => {
                if (data.status === 'error') {
                    setTimeout(() => {
                        setModal(false)
                    }, 1000);
                } else {
                    console.log(data)
                    // setNews(data.articles)
                    setTimeout(() => {
                        setModal(false)
                    }, 1000);
                }

            }).catch(err => {
                console.log(err)
            })
        })
    }, [])
    return (
        <View style={styles.container}>
            <Modal animationType="fade"
                transparent={true}
                visible={openModal} >
                <View style={{ flex: 1, backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" />
                    <View>
                        <Typography variant="body2" text="Just a sec, getting the good stuff..." />
                    </View>

                </View>
            </Modal>
            <SafeAreaView style={styles.wrap}>
                <View style={globals.header}>
                    <View style={styles.header}>
                        <View style={{ flex: 1, height: 'auto' }}>
                            <Typography variant="header" text="Newsfeed" />
                            <View style={styles.line} />
                        </View>
                        <Image style={{ width: 44, height: 44 }} source={require("../assets/images/logo.png")} />
                    </View>
                </View>
                <View style={{ flex: 1, padding: 20, borderRadius: 20 }}>
                    <ScrollView>
                        {news.map((c, i) => {

                            return (<NewsCard onPress={() => {
                                props.navigation.navigate('ReadFeed', { url: c.url })
                            }} key={i} title={c.title} author={c.author} image={c.urlToImage} text={c.description} date={c.publishedAt} />)
                        })}

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
    wrap: {
        height: '100%',
        width: '100%',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
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
})
export default Newsfeed