import React, { useRef, useEffect } from 'react'
import { BackHandler, Modal, SafeAreaView, Text, TouchableOpacity, View } from "react-native"
import { IconButton } from 'react-native-paper'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import GalleryItem, { SLIDER_WIDTH, ITEM_WIDTH } from './GalleryItem'
import { heightPercentageToDP as hp,
  widthPercentageToDP as wp } from "react-native-responsive-screen";
import ImageViewer from 'react-native-image-zoom-viewer';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearchPlus } from '@fortawesome/free-solid-svg-icons';


const data = [
  {
    title: "John 1",
    url:
      "https://i.imgur.com/UYiroysl.jpg",
  },
  {
    title: "John 2",
    url:
      "https://i.imgur.com/UPrs1EWl.jpg",
  },
]


const CarouselCards = () => {
  const [indexCarousel, setIndexCarousel] = React.useState(0)
  const [indexZoom, setIndexZoom] = React.useState(0);
  const carouselRef = useRef(null) as any;
  const [isModalVisible, setModalVisible] = React.useState(true)

  function closeModal() {
    if (isModalVisible) {
      setModalVisible(false);
    } else {
      setModalVisible(true);
    }
  }


  return (
    <SafeAreaView style={{alignItems:"center", alignContent: "center",}}>
      <Modal
        visible={isModalVisible}
        transparent={true}
      >
        <ImageViewer
          imageUrls={data}
          enableSwipeDown={true}
          onSwipeDown={closeModal}
          useNativeDriver={true}
          onChange={(index) => {
            setIndexCarousel(index as number);
            setIndexZoom(index as number);
          }}
          index={indexCarousel}
        />
      </Modal>

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
        onSnapToItem={(i) => {
          setIndexCarousel(i);
          setIndexZoom(i);
        }}
        firstItem={indexZoom}
      />

      <Pagination
        dotsLength={data.length}
        activeDotIndex={indexCarousel}
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

      <IconButton
          icon={({size, color}) => (
            <FontAwesomeIcon color={color} size={size} icon={ faSearchPlus } />
          )}
          color={"red"}
          size={wp(15)}
          onPress={closeModal}
        />

    </SafeAreaView>

  )
}



export default CarouselCards
