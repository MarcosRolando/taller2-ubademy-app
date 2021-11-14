import React from "react";
import { Image, Text, View } from "react-native";
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';

const Gallery = () => {

  const data = [
    {
      title: "John 1",
      source:
        "../../images/example.jpg",
    },
    {
      title: "John 2",
      source:
        "../../images/example2.jpg",
    },
  ]

  const CarouselCardItem = ({ item, index } : any) => {
    return (
      <View style={styles.container} key={index}>
        <Image
          source={{ uri: item.imgUrl }}
          style={styles.image}
        />
        <Text style={styles.header}>{item.title}</Text>
        <Text style={styles.body}>{item.body}</Text>
      </View>
    )
  }

  return (
    <Carousel />
  )
}

export default Gallery;