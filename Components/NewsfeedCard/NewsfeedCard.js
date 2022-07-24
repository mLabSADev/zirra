import React from 'react'
import { TouchableOpacity, View, ImageBackground, StyleSheet } from 'react-native'
import Typography from '../Typography/Typography'

/**
 * @param {Number} bg image background 
 * @param {String} label display text
 * @returns 
 */

const NewsfeedCard = (props) => {
  return (
    <TouchableOpacity {...props} activeOpacity={0.9} style={styles.container}>
      <ImageBackground resizeMode='cover' style={styles.bg} source={{ uri: props.bg }}>

      </ImageBackground>
      <View style={styles.details}>
        <Typography variant="body1" text={props.label} />
      </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  container: {
    flexShrink: 0,
    width: 200,
    height: 180,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    overflow: "hidden",
    borderRadius: 8,
    marginLeft: 5,
    marginRight: 5,
    position: 'relative'
  },
  bg: {
    width: '100%',
    height: '100%',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow: "visible",
    borderRadius: 8,
  },
  details: {
    width: '100%',
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#FFFFFF",
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
  }
})
export default NewsfeedCard