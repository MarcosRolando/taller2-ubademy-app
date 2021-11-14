import React, {useRef} from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native"
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
  const carouselRef = useRef(null) as any;

  return (
    <SafeAreaView style={{alignItems:"center", alignContent: "center",}}>
      <Carousel
        ref={carouselRef}
        sliderWidth={wp(100)}
        sliderHeight={wp(100)}
        itemWidth={wp(100) - wp(15)}
        data={data}
        renderItem={GalleryItem}
        layout={'tinder'}
        layoutCardOffset={9}
        useScrollView={true}
        onSnapToItem={(i) => setIndex(i)}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={index}
        carouselRef={carouselRef}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.92)'
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
      />
        
    </SafeAreaView>

  )
}



export default CarouselCards
