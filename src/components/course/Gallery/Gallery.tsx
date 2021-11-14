import React from 'react'
import { View } from "react-native"
import Carousel, { Pagination } from 'react-native-snap-carousel'
import GalleryItem, { SLIDER_WIDTH, ITEM_WIDTH } from './GalleryItem'

const data = [
  {
    title: "John 1",
    uri:
      require("../../../images/example.jpg"),
  },
  {
    title: "John 2",
    uri:
      require("../../../images/example2.jpg"),
  },
]


const CarouselCards = () => {
  const [index, setIndex] = React.useState(0)
  const isCarousel = React.useRef(null)


  return (
    <View>
      <Carousel
        layout="tinder"
        layoutCardOffset={9}
        ref={isCarousel}
        data={data}
        renderItem={GalleryItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index) => setIndex(index)}
        useScrollView={true}
      />
    </View>

  )
}



export default CarouselCards
