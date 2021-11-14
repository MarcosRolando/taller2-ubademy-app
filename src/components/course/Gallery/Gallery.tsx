import React from 'react'
import { SafeAreaView, View } from "react-native"
import Carousel, { Pagination } from 'react-native-snap-carousel'
import GalleryItem, { SLIDER_WIDTH, ITEM_WIDTH } from './GalleryItem'
import { heightPercentageToDP as hp,
  widthPercentageToDP as wp } from "react-native-responsive-screen";


const data = [
  {
    title: "John 1",
    uri:
      "https://i.imgur.com/UYiroysl.jpg",
  },
  {
    title: "John 2",
    uri:
      "https://i.imgur.com/UPrs1EWl.jpg",
  },
]


const CarouselCards = () => {
  const [index, setIndex] = React.useState(0)
  const isCarousel = React.useRef(null)


  return (
    <SafeAreaView style={{alignItems:"center", alignContent: "center",}}>
      <Carousel
                sliderWidth={wp(80)}
                sliderHeight={wp(80)}
                itemWidth={wp(100) - wp(10)}
                data={data}
                renderItem={GalleryItem}
                layout={'stack'}
                layoutCardOffset={9}
      />
    </SafeAreaView>

  )
}



export default CarouselCards
