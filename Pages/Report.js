import React, { useState } from 'react'
import { View, SafeAreaView, StyleSheet, Dimensions, Text, ScrollView, StatusBar, ActivityIndicator, Image, TouchableOpacity, Modal } from 'react-native'
import InputButton from '../Components/Button/Button'
import InputText from '../Components/TextInput/TextInput'
import Typography from '../Components/Typography/Typography'
import globals from './globals.styles';
import DatePicker from 'react-native-date-picker'
import { launchImageLibrary } from 'react-native-image-picker';
import Radionbutton from '../Components/RadioButton/Radionbutton'
import incidentRadio from '../Components/incidentRadios'
import reporterRadios from '../Components/reporterRadios'
import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'
import ProgressBar from '../Components/ProgressBar/ProgressBar'
import { check, checkNotifications, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import CheckMark from '../Components/CheckMark/CheckMark'
import DeviceInfo from 'react-native-device-info';
import AlertBox from '../Components/AlertBox/AlertBox'
import formErrors from '../Components/formErrors'
import reporterErrors from '../Components/reporterErrors'
import { Formik } from 'formik'
import * as Yup from 'yup'
const WIDTH = Dimensions.get('window').width
const incidentFormData = {
    whatProvince: '',// *
    whatTown: '', // *
    occuredAtSchool: '', // *
    whichSchool: '',
    additionalDetails: '',
    video: '',
    image: '',
    isHappening: '', // *
    dateOfIncident: '',
    personDetails: '',
    personFullName: '',
    isTwoPeople: '',
    secondPersonFullName: '',
    infoAboutThem: '',
    contactNumberOfAgainst: '',
    contactEmailOfAgainst: '',
    wasWitness: '',
    witnessDetails: '',
    whatHappened: '', // *
    isReported: '',
    didOrganisationResolve: '',
    needInterpreter: '',
    relief: '',
    reliefDetails: '',
    herdAboutUs: ''
}
const reporterFormData = {
    anonymousReport: false,
    name: '', // *
    surname: '', // *
    ID: '',
    dateOfBirth: '', //*
    race: '', //*
    otherRace: '',//*
    gender: '', //*
    otherGender: '',//*
    province: '', //*
    town: '', //*
    email: '', //*
    phoneNumber: '',
    altPhoneNumber: '',
    faxNumber: '',
    communication: '',
    contactPerson: ''
}

const Report = (props) => {
    const [imageProgress, setImageProgress] = useState(0)
    const [imageUploadState, setImageUploadState] = useState('')
    const [videoProgress, setVideoProgress] = useState(0)
    const [videoUploadState, setVideoUploadState] = useState('')
    const [isHappening, setIsHappening] = useState('')
    const [activeSlide, setActiveSlide] = useState(0)
    const [date, setDate] = useState(new Date())
    const [openDate, setOpenDate] = useState(false)
    const [openReporterDate, setOpenReporterDate] = useState(false)
    const [imageURL, setImageURL] = useState('')
    const [alertDialogue, setAlertDialogue] = useState(false)
    const [alertInfo, setAlertInfo] = useState({ title: '', message: '' })
    const [navBack, setNavBack] = useState(false)
    const [loader, setLoader] = useState(false)
    const FormSchema = Yup.object().shape({
        whatTown: Yup.string().required('Required').min(2, 'Too Short!').max(50, 'Too long!'),
        whatProvince: Yup.string().required('Required').min(2, 'Too Short!').max(50, 'Too long!'),
        isHappening: Yup.string().required('Required'),
        whatHappened: Yup.string().required('Required').min(2, 'Too short!'),
        name: Yup.string().required('Required'),
        surname: Yup.string().required('Required'),
        dateOfBirth: Yup.string().required('Required'),
        race: Yup.string().required('Required'),
        gender: Yup.string().required('Required'),
        province: Yup.string().required('Required'),
        town: Yup.string().required('Required'),
        email: Yup.string().email().required('Required'),
    })
    // Upload Image
    const selectImage = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: true,
            selectionLimit: 1,
            includeExtra: true
        }
        const result = launchImageLibrary(options, (obj) => {
            if (obj?.fileName) {
                const reference = storage().ref(`/images/${obj.fileName}`)
                const task = reference.putFile(obj.uri)
                task.on('state_changed', snap => {
                    let progress = (snap.bytesTransferred / snap.totalBytes) * 100
                    setImageProgress(progress)
                    switch (snap.state) {
                        case 'paused':
                            setImageUploadState('Paused')
                            break;
                        case 'running':
                            setImageUploadState('Uploading')
                            break;
                        case 'success':
                            setImageUploadState('Image Uploaded')
                            reference.getDownloadURL().then(url => {

                            })
                            break;
                    }
                })
            } else {
                setAlertInfo({ message: 'Select an image to upload', title: 'No image selected' })
                setAlertDialogue(true)
            }
        }, err => {
            setAlertInfo({ message: { err }, title: 'Something went wrong' })
            setAlertDialogue(true)
        })
    }

    // Upload Video
    const selectVideo = async () => {
        const options = {
            mediaType: 'video',
            includeExtra: true
        }
        const result = await launchImageLibrary(options, (obj) => {

            const reference = storage().ref(`/videos/${obj.fileName}`)
            const task = reference.putFile(obj.uri)
            task.on('state_changed', snap => {
                let progress = (snap.bytesTransferred / snap.totalBytes) * 100
                setImageProgress(progress)
                switch (snap.state) {
                    case 'paused':
                        setImageUploadState('Paused')
                        break;
                    case 'running':
                        setImageUploadState('Uploading')
                        break;
                    case 'success':
                        setImageUploadState('Image Uploaded')
                        reference.getDownloadURL().then(res => {
                            // setIncidentForm(prev => ({
                            //     ...prev,
                            //     video: res
                            // }))
                        })
                        break;
                }
            })
            task.catch(err => {
                console.log(err)
            })

        })

    }
    const requestCameraPermission = async () => {
        try {
            //    Check for permissions
            check(PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION).then((res) => {
                switch (res) {
                    case RESULTS.UNAVAILABLE:
                        console.log('This feature is not available (on this device / in this context)');
                        break;
                    case RESULTS.DENIED:
                        console.log('The permission has not been requested / is denied but requestable');
                        const Rationale = {
                            title: 'Storage Request',
                            message: 'Zirra needs access to your local storage.',
                            buttonPositive: 'Okay',
                            buttonNegative: 'No',
                        }
                        request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, Rationale).then(r => {
                            switch (r) {
                                case RESULTS.UNAVAILABLE:
                                    console.log('This feature is not available (on this device / in this context)');
                                    break;
                                case RESULTS.DENIED:
                                    console.log('The permission has not been requested / is denied but requestable');
                                    break;
                                case RESULTS.LIMITED:
                                    console.log('The permission is limited: some actions are possible');
                                    break;
                                case RESULTS.GRANTED:
                                    console.log('The permission is granted');
                                    selectVideo()
                                    break;
                                case RESULTS.BLOCKED:
                                    console.log('The permission is denied and not requestable anymore');
                                    break;
                            }
                        })
                        break;
                    case RESULTS.LIMITED:
                        console.log('The permission is limited: some actions are possible');
                        break;
                    case RESULTS.GRANTED:
                        console.log('The permission is granted');
                        check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then(result => {
                            switch (result) {
                                case RESULTS.UNAVAILABLE:
                                    console.log('This feature is not available (on this device / in this context)');
                                    break;
                                case RESULTS.DENIED:
                                    console.log('The permission has not been requested / is denied but requestable');
                                    break;
                                case RESULTS.LIMITED:
                                    console.log('The permission is limited: some actions are possible');
                                    break;
                                case RESULTS.GRANTED:
                                    console.log('The permission is granted');
                                    selectVideo()
                                    break;
                                case RESULTS.BLOCKED:
                                    console.log('The permission is denied and not requestable anymore');
                                    break;
                            }
                        })
                        break;
                    case RESULTS.BLOCKED:
                        console.log('The permission is denied and not requestable anymore');
                        break;
                }
            })
        } catch (err) {
            console.warn(err);
        }
    };
    const swipeMessage = '<<< Swipe left to the next step.'
    const onChange = (nativeEvent) => {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
        if (slide != activeSlide) {
            setActiveSlide(slide)
        }
    }
    const submitInfo = (payload) => {
        setLoader(true)
        const a = new Date()
        const cYr = a.getFullYear()
        const b = new Date(payload.dateOfBirth)
        const uYr = b.getFullYear()
        const age = uYr - cYr
        const over18 = age > 18 ? 'Yes' : 'No'

        const finalData = { isOver18: over18, ...payload }
        firestore().collection('reports').add(finalData).then((doc) => {
            firestore().collection('reports').doc(doc.id).set({ image: imageURL }, { merge: true }).then(res => {
                setLoader(false)
                setNavBack(true)
                setAlertInfo({ message: 'Your report has been recorded. Thank you for your participation,', title: 'Thank you' })
                setAlertDialogue(true)
            })

        }).catch(err => {
            setLoader(false)
            setAlertInfo({ message: 'Something went wrong, the report did not reach our servers.', title: 'Oh no' })
            setAlertDialogue(true)
            console.log(err)
        })
    }
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#FF7433" />
            <Modal animationType="fade"
                transparent={true}
                visible={loader} >
                <View style={{ flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.88)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" />
                    <View>
                        <Typography variant="body2" text="Saving Information." />
                    </View>

                </View>
            </Modal>
            <AlertBox
                header={alertInfo.title}
                text={alertInfo.message}
                open={alertDialogue}
                onPress={() => {
                    setAlertDialogue(false)
                    if (navBack) {
                        props.navigation.goBack()
                    }
                }} />
            <SafeAreaView style={styles.wrap}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.textHeader}>Zimele Racism Reporting</Text>
                    <View style={styles.bodyWrapper}>
                        <Text style={styles.textBody}>Please complete all required fields marked with (*)</Text>
                    </View>
                </View>
                {/* .... */}
                <View style={styles.stepper}>
                    <View>
                        <Typography variant="body1" text="New Report" />
                        <Typography variant="subHeader" text={activeSlide > 4 ? "Tell us about yourself" : "Incident Details"} />
                    </View>
                    <View>
                        <Typography variant="body1" text={`Step ${activeSlide > 4 ? (activeSlide) - 5 : activeSlide + 1} / ${activeSlide > 4 ? '2' : '5'}`} />
                    </View>
                </View>
                <Formik

                    validationSchema={FormSchema}
                    initialValues={{ ...reporterFormData, ...incidentFormData }}
                    onSubmit={values => {
                        submitInfo(values)
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, setFieldValue, errors, touched, isValid }) => {
                        return (<ScrollView
                            onScroll={({ nativeEvent }) => onChange(nativeEvent)}
                            horizontal
                            pagingEnabled
                            style={{ width: '100%', flex: 1 }}>

                            {/* Slide 1 */}
                            <View style={styles.slide}>
                                <View style={styles.slideDetais}>
                                    <ScrollView>
                                        <InputText value={values.whatProvince} onChangeText={handleChange('whatProvince')} ml={true} label="In what province did it happen? *" />
                                        {errors.whatProvince && touched.whatProvince ?
                                            (
                                                <View style={styles.errors}>
                                                    <Typography c="light" variant="caption" text={errors.whatProvince} />
                                                </View>
                                            ) : null
                                        }
                                        <InputText value={values.whatTown} onChangeText={handleChange('whatTown')} ml={true} label="In what town/city did it happen? *" />
                                        {errors.whatTown && touched.whatTown ?
                                            (
                                                <View style={styles.errors}>
                                                    <Typography c="light" variant="caption" text={errors.whatTown} />
                                                </View>
                                            ) : null
                                        }
                                        <View style={{ Width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
                                            <Typography text={incidentRadio.occuredAtSchool.title} variant="label" />
                                            {
                                                incidentRadio.occuredAtSchool.options.map((c, i) => {
                                                    return (<Radionbutton active={values.occuredAtSchool === c ? true : false} key={i} onPress={() => setFieldValue('occuredAtSchool', c)} label={c} />)
                                                })
                                            }
                                            {errors.occuredAtSchool && touched.occuredAtSchool ?
                                                (
                                                    <View style={styles.errors}>
                                                        <Typography c="light" variant="caption" text={errors.occuredAtSchool} />
                                                    </View>
                                                ) : null
                                            }
                                        </View>
                                        {values.occuredAtSchool === 'Yes' ? (<InputText value={values.whichSchool} onChangeText={handleChange('whichSchool')} ml={true} label=" Which school did this incident occur in?" />) : (null)}
                                        {errors.whichSchool && touched.whichSchool ?
                                            (
                                                <View style={styles.errors}>
                                                    <Typography c="light" variant="caption" text={errors.whichSchool} />
                                                </View>
                                            ) : null
                                        }
                                        <InputText value={values.additionalDetails} onChangeText={handleChange('additionalDetails')} ml={true} label="Additional detail to where did incident/s happen?" />

                                        {/* Media upload */}
                                        <View >
                                            <Typography variant="label" text="Upload Media" />
                                            <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'white' }}>
                                                {/* <InputButton onPress={requestCameraPermission} variant="primary" text="Video" /> */}
                                                <View style={{ width: 10, height: '100%' }} />
                                                <InputButton onPress={() => {
                                                    selectImage()
                                                }} variant="primary" text="Picture" />

                                            </View>
                                        </View>
                                        {imageProgress > 0 && (<ProgressBar state={imageUploadState} progress={imageProgress} />)}

                                        <Typography text={swipeMessage} variant="subHeader" />
                                    </ScrollView>

                                </View>
                            </View>
                            {/* ... */}
                            {/* Slide 2 */}
                            <View style={styles.slide}>
                                <View style={styles.slideDetais}>
                                    <ScrollView>
                                        <View style={{ Width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
                                            <Typography text={incidentRadio.isHappening.title} variant="label" />
                                            {
                                                incidentRadio.isHappening.options.map((c, i) => {
                                                    return (<Radionbutton active={values.isHappening === c ? true : false} key={i} onPress={() => setFieldValue('isHappening', c)} label={c} />)
                                                })
                                            }
                                            {errors.isHappening && touched.isHappening ?
                                                (
                                                    <View style={styles.errors}>
                                                        <Typography c="light" variant="caption" text={errors.whatTown} />
                                                    </View>
                                                ) : null
                                            }
                                        </View>
                                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
                                            <View style={{ flex: 1, height: 'auto' }}>
                                                <DatePicker
                                                    modal
                                                    mode='date'
                                                    theme="light"
                                                    open={openDate}
                                                    androidVariant="iosClone"
                                                    date={date}
                                                    onConfirm={(date) => {
                                                        setOpenDate(false)
                                                        const dateFormat = new Date(date)
                                                        setFieldValue('dateOfIncident', dateFormat.toDateString())
                                                        setDate(date)
                                                    }}
                                                    onCancel={() => {
                                                        setOpenDate(false)
                                                    }} />
                                                <InputText value={values.dateOfIncident} onChangeText={handleChange('dateOfIncident')} ml={true} label="Date of incident" />
                                            </View>
                                            <TouchableOpacity onPress={() => { setOpenDate(true) }} style={{ padding: 10, marginLeft: 10, marginBottom: 5 }}>
                                                <Image resizeMode='contain' style={{ width: 24, height: 24 }} source={require('../assets/icons/coloured/calendar-3.png')} />
                                            </TouchableOpacity>
                                        </View>

                                        {/* Radio Buttons */}
                                        <View style={{ Width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
                                            <Typography text={incidentRadio.personDetais.title} variant="label" />
                                            {
                                                incidentRadio.personDetais.options.map((c, i) => {
                                                    return (<Radionbutton active={values.personDetails === c ? true : false} key={i} onPress={(el) => { setFieldValue('personDetails', c) }} label={c} />)
                                                })
                                            }
                                        </View>
                                        {/* ... */}

                                        {values.personDetails === 'Yes' && (<InputText value={values.personFullName} onChangeText={handleChange('personFullName')} ml={true} label="Persons First and Last name*" />)}

                                        {/* Radio Buttons */}
                                        <View style={{ Width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
                                            <Typography text={incidentRadio.isTwoPeople.title} variant="label" />
                                            {
                                                incidentRadio.isTwoPeople.options.map((c, i) => {
                                                    return (<Radionbutton active={values.isTwoPeople === c ? true : false} key={i} onPress={(el) => { setFieldValue('isTwoPeople', c) }} label={c} />)
                                                })
                                            }
                                        </View>
                                        {/* ... */}
                                        {values.isTwoPeople === 'Yes' && (<InputText value={values.secondPersonFullName} onChangeText={handleChange('secondPersonFullName')} ml={true} label="Second persons First and Last name*" />)}

                                        <Typography text={swipeMessage} variant="subHeader" />
                                    </ScrollView>

                                </View>
                            </View>
                            {/* ... */}
                            {/* Slide 3 */}
                            <View style={styles.slide}>
                                <View style={styles.slideDetais}>
                                    <ScrollView>
                                        <InputText value={values.infoAboutThem} onChangeText={handleChange('infoAboutThem')} ml={true} label="Any information about them" />

                                        <InputText type="phone-pad" value={values.contactNumberOfAgainst} onChangeText={handleChange('contactNumberOfAgainst')} ml={true} label="Contact number of the person against whom you are lodging the complaint." />

                                        <InputText type="email-address" value={values.contactEmailOfAgainst} onChangeText={handleChange('contactEmailOfAgainst')} ml={true} label="Contact email of the person against whom you are lodging the complaint." />


                                        {/* Radio Buttons */}
                                        <View style={{ Width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
                                            <Typography text={incidentRadio.wasWitness.title} variant="label" />
                                            {
                                                incidentRadio.wasWitness.options.map((c, i) => {
                                                    return (<Radionbutton active={values.wasWitness === c ? true : false} key={i} onPress={(el) => {
                                                        setFieldValue('wasWitness', c)
                                                    }} label={c} />)
                                                })
                                            }
                                        </View>
                                        {/* ... */}
                                        <Typography text={swipeMessage} variant="subHeader" />
                                    </ScrollView>

                                </View>
                            </View>
                            {/* ... */}
                            {/* Slide 4 */}
                            <View style={styles.slide}>
                                <View style={styles.slideDetais}>
                                    <ScrollView>
                                        {values.wasWitness === 'Yes' && (<InputText value={values.witnessDetails} onChangeText={handleChange('witnessDetails')} ml={true} label="Witness details" />)}

                                        <InputText value={values.whatHappened} onChangeText={handleChange('whatHappened')} ml={true} label="Tell us what happened*" />
                                        {errors.whatHappened && touched.whatHappened ?
                                            (
                                                <View style={styles.errors}>
                                                    <Typography c="light" variant="caption" text={errors.whatHappened} />
                                                </View>
                                            ) : null
                                        }
                                        {/* Radio Buttons */}
                                        <View style={{ Width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
                                            <Typography text={incidentRadio.isReported.title} variant="label" />
                                            {
                                                incidentRadio.isReported.options.map((c, i) => {
                                                    return (<Radionbutton active={values.isReported === c ? true : false} key={i} onPress={(el) => { setFieldValue('isReported', c) }} label={c} />)
                                                })
                                            }
                                        </View>
                                        {/* ... */}
                                        {/* Radio Buttons */}
                                        <View style={{ Width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
                                            <Typography text={incidentRadio.didOrganisationResolve.title} variant="label" />
                                            {
                                                incidentRadio.didOrganisationResolve.options.map((c, i) => {
                                                    return (<Radionbutton active={values.didOrganisationResolve === c ? true : false} key={i} onPress={(el) => { setFieldValue('didOrganisationResolve', c) }} label={c} />)
                                                })
                                            }
                                        </View>
                                        {/* ... */}
                                        <Typography text={swipeMessage} variant="subHeader" />
                                    </ScrollView>
                                </View>

                            </View>
                            {/* ... */}
                            {/* Slide 5 */}
                            <View style={styles.slide}>
                                <View style={styles.slideDetais}>
                                    <ScrollView>
                                        {/* Radio Buttons */}
                                        <View style={{ Width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
                                            <Typography text={incidentRadio.needInterpreter.title} variant="label" />
                                            {
                                                incidentRadio.needInterpreter.options.map((c, i) => {
                                                    return (<Radionbutton active={values.needInterpreter === c ? true : false} key={i} onPress={() => { setFieldValue('needInterpreter', c) }} label={c} />)
                                                })
                                            }
                                        </View>
                                        {/* ... */}
                                        {/* Radio Buttons */}
                                        <View style={{ Width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
                                            <Typography text={incidentRadio.relief.title} variant="label" />
                                            {
                                                incidentRadio.relief.options.map((c, i) => {
                                                    return (<Radionbutton active={values.relief === c ? true : false} key={i} onPress={() => { setFieldValue('relief', c) }} label={c} />)
                                                })
                                            }
                                        </View>
                                        {/* ... */}
                                        {values.relief === 'Other' && (<InputText value={values.reliefDetails} onChangeText={val => { setFieldValue('reliefDetails', val) }} ml={true} label="What other relief is required?" />)}

                                        {/* Radio Buttons */}
                                        <View style={{ Width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
                                            <Typography text={incidentRadio.herdAboutUs.title} variant="label" />
                                            {
                                                incidentRadio.herdAboutUs.options.map((c, i) => {
                                                    return (<Radionbutton active={values.herdAboutUs === c ? true : false} key={i} onPress={() => { setFieldValue('herdAboutUs', c) }} label={c} />)
                                                })
                                            }
                                        </View>
                                        {/* ... */}
                                        <Typography text={swipeMessage} variant="subHeader" />
                                    </ScrollView>
                                </View>

                            </View>
                            {/* ... */}
                            {/* Slide 6 */}
                            <View style={styles.slide}>
                                <View style={styles.userSlide}>
                                    <ScrollView>
                                        {/* onValueChange = the checkbox */}
                                        {/* onPress = the TouchableOpacity */}
                                        <Typography c="light" variant="body1" text={isValid ? 'Yes' : 'No'} />
                                        <CheckMark
                                            onValueChange={() => {
                                                setFieldValue('anonymousReport', !values.anonymousReport)
                                                if (!values.anonymousReport) {
                                                    setFieldValue('name', 'N/A')
                                                    setFieldValue('surname', 'N/A')
                                                    setFieldValue('dateOfBirth', 'N/A')
                                                    setFieldValue('race', 'N/A')
                                                    setFieldValue('gender', 'N/A')
                                                    setFieldValue('province', 'N/A')
                                                    setFieldValue('town', 'N/A')
                                                    setFieldValue('email', 'unknown@unknown.co.za')
                                                } else {
                                                    setFieldValue('name', '')
                                                    setFieldValue('surname', '')
                                                    setFieldValue('dateOfBirth', '')
                                                    setFieldValue('race', '')
                                                    setFieldValue('gender', '')
                                                    setFieldValue('province', '')
                                                    setFieldValue('town', '')
                                                    setFieldValue('email', '')
                                                }

                                            }}
                                            value={values.anonymousReport}
                                            onPress={() => {
                                                setFieldValue('anonymousReport', !values.anonymousReport)
                                                if (!values.anonymousReport) {

                                                    setFieldValue('name', 'N/A')
                                                    setFieldValue('surname', 'N/A')
                                                    setFieldValue('dateOfBirth', 'N/A')
                                                    setFieldValue('race', 'N/A')
                                                    setFieldValue('gender', 'N/A')
                                                    setFieldValue('province', 'N/A')
                                                    setFieldValue('town', 'N/A')
                                                    setFieldValue('email', 'unknown@unknown.co.za')
                                                } else {
                                                    setFieldValue('name', '')
                                                    setFieldValue('surname', '')
                                                    setFieldValue('dateOfBirth', '')
                                                    setFieldValue('race', '')
                                                    setFieldValue('gender', '')
                                                    setFieldValue('province', '')
                                                    setFieldValue('town', '')
                                                    setFieldValue('email', '')
                                                }
                                            }}
                                        />
                                        <View style={{ height: 'auto', flex: 1, opacity: values.anonymousReport ? 0.4 : 1 }}>
                                            <InputText disabled={values.anonymousReport} ic="light" lc="dark" value={values.name} onChangeText={handleChange('name')} ml={true} label="Name *" />
                                            {errors.name && values.anonymousReport == false ?
                                                (
                                                    <View style={styles.errors}>
                                                        <Typography c="light" variant="caption" text={errors.name} />
                                                    </View>
                                                ) : null
                                            }
                                            <InputText disabled={values.anonymousReport} ic="light" lc="dark" value={values.surname} onChangeText={handleChange('surname')} ml={true} label="Surname *" />
                                            {errors.surname && values.anonymousReport == false ?
                                                (
                                                    <View style={styles.errors}>
                                                        <Typography c="light" variant="caption" text={errors.surname} />
                                                    </View>
                                                ) : null
                                            }
                                            <InputText disabled={values.anonymousReport} ic="light" type="phone-pad" lc="dark" value={values.ID} onChangeText={handleChange('ID')} ml={true} label="ID Number" />

                                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
                                                <View style={{ flex: 1, height: 'auto' }}>
                                                    <DatePicker
                                                        modal
                                                        mode='date'
                                                        theme="light"
                                                        open={openReporterDate}
                                                        androidVariant="iosClone"
                                                        date={date}
                                                        onConfirm={(date) => {
                                                            setOpenReporterDate(false)
                                                            const dateFormat = new Date(date)
                                                            setFieldValue('dateOfBirth', dateFormat.toDateString())
                                                            setDate(date)
                                                        }}
                                                        onCancel={() => {
                                                            setOpenReporterDate(false)
                                                        }} />
                                                    <InputText disabled={values.anonymousReport} ic="light" lc="dark" value={values.dateOfBirth} onChangeText={handleChange('dateOfBirth')} ml={true} label="Date of Birth *" />

                                                </View>
                                                <TouchableOpacity onPress={() => { if (values.anonymousReport) { } else { setOpenReporterDate(true) } }} style={{ padding: 10, marginLeft: 10, marginBottom: 5 }}>
                                                    <Image resizeMode='contain' style={{ width: 24, height: 24 }} source={require('../assets/icons/coloured/calendar-3.png')} />
                                                </TouchableOpacity>
                                            </View>
                                            {errors.dateOfBirth && values.anonymousReport == false ?
                                                (
                                                    <View style={styles.errors}>
                                                        <Typography c="light" variant="caption" text={errors.dateOfBirth} />
                                                    </View>
                                                ) : null
                                            }

                                            {/* Radio Buttons */}
                                            <View style={{ Width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
                                                <Typography c="dark" text={`${reporterRadios.race.title}  *`} variant="label" />
                                                {
                                                    reporterRadios.race.options.map((c, i) => {
                                                        return (<Radionbutton lc="dark" active={values.race === c ? true : false} key={i} onPress={() => { if (values.anonymousReport) { } else { setFieldValue('race', c) } }} label={c} />)
                                                    })
                                                }
                                            </View>
                                            {errors.race && values.anonymousReport == false ?
                                                (
                                                    <View style={styles.errors}>
                                                        <Typography c="light" variant="caption" text={errors.race} />
                                                    </View>
                                                ) : null
                                            }
                                            {/* ... */}
                                            {values.race === 'Other' && (<InputText ic="light" type="phone-pad" lc="dark" value={values.otherRace} onChangeText={(val) => setFieldValue('otherRace', val)} ml={true} label="Please Specify *" />)}

                                            {/* Radio Buttons */}
                                            <View style={{ Width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
                                                <Typography c="dark" text={`${reporterRadios.gender.title}  *`} variant="label" />
                                                {
                                                    reporterRadios.gender.options.map((c, i) => {
                                                        return (<Radionbutton lc="dark" active={values.gender === c ? true : false} key={i} onPress={(el) => { if (values.anonymousReport) { } else { setFieldValue('gender', c) } }} label={c} />)
                                                    })
                                                }
                                            </View>
                                            {/* ... */}
                                            {errors.gender && values.anonymousReport == false ?
                                                (
                                                    <View style={styles.errors}>
                                                        <Typography c="light" variant="caption" text={errors.gender} />
                                                    </View>
                                                ) : null
                                            }
                                            {values.gender === 'Other' && (<InputText ic="light" type="phone-pad" lc="dark" value={values.otherGender} onChangeText={(val) => setFieldValue('otherGender', val)} ml={true} label="Please Specify *" />)}

                                        </View>
                                        <Typography c="light" text={swipeMessage} variant="subHeader" />
                                    </ScrollView>

                                </View>

                            </View>
                            {/* ... */}
                            {/* Slide 7 */}
                            <View style={styles.slide}>
                                <View style={styles.userSlide}>
                                    <ScrollView>
                                        <View style={{ height: 'auto', flex: 1, opacity: values.anonymousReport ? 0.4 : 1 }}>
                                            <InputText disabled={values.anonymousReport} ic="light" lc="dark" value={values.province} onChangeText={handleChange('province')} ml={true} label="Province *" />
                                            {errors.province && values.anonymousReport == false ?
                                                (
                                                    <View style={styles.errors}>
                                                        <Typography c="light" variant="caption" text={errors.province} />
                                                    </View>
                                                ) : null
                                            }

                                            <InputText disabled={values.anonymousReport} ic="light" lc="dark" value={values.town} onChangeText={handleChange('town')} ml={true} label="Town / City *" />
                                            {errors.town && values.anonymousReport == false ?
                                                (
                                                    <View style={styles.errors}>
                                                        <Typography c="light" variant="caption" text={errors.town} />
                                                    </View>
                                                ) : null
                                            }

                                            <InputText disabled={values.anonymousReport} type="email-address" ic="light" lc="dark" value={values.email} onChangeText={handleChange('email')} ml={true} label="Email Address *" />
                                            {errors.email && values.anonymousReport == false ?
                                                (
                                                    <View style={styles.errors}>
                                                        <Typography c="light" variant="caption" text={errors.email} />
                                                    </View>
                                                ) : null
                                            }
                                            <InputText disabled={values.anonymousReport} type="phone-pad" ic="light" lc="dark" value={values.phoneNumber} onChangeText={handleChange('phoneNumber')} ml={true} label="Phone Number" />
                                            <InputText disabled={values.anonymousReport} type="phone-pad" ic="light" lc="dark" value={values.altPhoneNumber} onChangeText={handleChange('altPhoneNumber')} ml={true} label="Alternative Phone Number" />
                                            <InputText disabled={values.anonymousReport} type="phone-pad" ic="light" lc="dark" value={values.faxNumber} onChangeText={handleChange('faxNumber')} ml={true} label="Fax Number" />
                                            {/* Radio Buttons */}
                                            <View style={{ Width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
                                                <Typography c="dark" text={reporterRadios.communication.title} variant="label" />
                                                {
                                                    reporterRadios.communication.options.map((c, i) => {
                                                        return (<Radionbutton lc="dark" active={values.communication === c ? true : false} key={i} onPress={() => { if (values.anonymousReport) { } else { setFieldValue('communication', c) } }} label={c} />)
                                                    })
                                                }
                                            </View>
                                            {/* ... */}
                                            <InputText disabled={values.anonymousReport} ic="light" lc="dark" value={values.contactPerson} onChangeText={handleChange('contactPerson')} ml={true} label="Contact Person" />
                                        </View>
                                        <InputButton onPress={handleSubmit} variant="primary" text="Submit" />
                                    </ScrollView>

                                </View>
                            </View>
                            {/* ... */}

                        </ScrollView>)
                    }}
                </Formik>
                {/* <View style={{ paddingLeft: 20, paddingRight: 20, display: 'flex', flexDirection: 'row', backgroundColor: 'white' }}>
                    <InputButton onPress={() => { props.navigation.goBack() }} text="Cancel" />
                    <View style={{ width: 10, height: '100%' }} />
                    <View style={{ width: '70%', height: '100%' }}>
                        <InputButton onPress={() => {
                            // checkIncidentInputs()
                        }} variant="primary" text="Submit" />
                    </View>
                </View> */}
            </SafeAreaView>
        </View>
    )
}
const styles = StyleSheet.create({
    header: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: 20,
        boxShadow: "0px 0px 39px -22px rgba(0, 0, 0, 0.25)",
        backgroundColor: "#FF7433",
        overflow: "visible",
        borderBottomEndRadius: 30,
        borderBottomStartRadius: 30,
    },
    textHeader: {
        width: "100%",
        overflow: "hidden",
        fontWeight: "500",
        fontStyle: "normal",
        fontFamily: "Montserrat-Bold",
        color: "#fff",
        fontSize: 26
    },
    bodyWrapper: {
        height: "auto", /* 54px */
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10,
    },
    textBody: {
        fontWeight: "400",
        fontStyle: "normal",
        fontFamily: "Montserrat-Regular",
        color: "#fff",
        fontSize: 14,
    },
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#FAFAFA'
    },
    wrap: {
        height: '100%',
        width: '100%',
    },
    stepper: {
        // height: 50,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20
    },
    slide: {
        width: WIDTH,
        padding: 10,
    },
    slideDetais: {
        width: '100%',
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        overflow: 'hidden'
    },
    userSlide: {
        width: '100%',
        padding: 10,
        backgroundColor: '#242424',
        borderRadius: 20
    },
    errors: { paddingLeft: 10, paddingRight: 10, marginTop: 5, borderRadius: 8, backgroundColor: '#FF00004f' }

})
export default Report