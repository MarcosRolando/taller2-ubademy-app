import React, { useRef, useEffect } from 'react'
import { BackHandler, Modal, SafeAreaView, Text, TouchableOpacity, View } from "react-native"
import { IconButton } from 'react-native-paper'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import GalleryItem, { SLIDER_WIDTH, ITEM_WIDTH } from './GalleryItem'
import { heightPercentageToDP as hp,
  widthPercentageToDP as wp } from "react-native-responsive-screen";
import ImageViewer from 'react-native-image-zoom-viewer';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearchPlus, faSearchMinus } from '@fortawesome/free-solid-svg-icons';
import colors from '../../../styles/colors'


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



const CarouselCards = (props: any) => {
  const [indexCarousel, setIndexCarousel] = React.useState(0)
  const [indexZoom, setIndexZoom] = React.useState(0);
  const carouselRef = useRef(null) as any;
  const [isModalVisible, setModalVisible] = React.useState(false);
  const images = props.images;

  function closeModal() {
    if (isModalVisible) {
      setModalVisible(false);
    } else {
      setModalVisible(true);
    }
    console.log(props.info.images);
    console.log(data);
  }


  return (
    <SafeAreaView >
      <View style={{alignItems:"center", alignContent: "center"}}>
        <Modal
          visible={isModalVisible}
          transparent={false}
        >
          <ImageViewer
            imageUrls={props.info.images}
            enableSwipeDown={true}
            onSwipeDown={closeModal}
            useNativeDriver={true}
            onChange={(index) => {
              setIndexCarousel(index as number);
              setIndexZoom(index as number);
            }}
            index={indexCarousel}
          />

          <View style={{position:"absolute", marginLeft:wp(80), marginTop:hp(90)}}>
            <IconButton
              icon={({size, color}) => (
                <FontAwesomeIcon color={color} size={size} icon={ faSearchMinus } />
              )}
              color={colors.primary}
              size={wp(10)}
              onPress={closeModal}
            />
          </View>
        </Modal>

        <Carousel
          ref={carouselRef}
          sliderWidth={wp(100)}
          sliderHeight={wp(100)}
          itemWidth={wp(100) - wp(15)}
          data={props.info.images}
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
          dotsLength={props.info.images.length}
          activeDotIndex={indexCarousel}
          carouselRef={carouselRef}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 0,
            backgroundColor: colors.primary
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          tappableDots={true}
        />
      </View>

      <View style={{position:"absolute", marginLeft:wp(70)}}>
        <IconButton
            icon={({size, color}) => (
              <FontAwesomeIcon color={color} size={size} icon={ faSearchPlus } />
            )}
            color={colors.primary}
            size={wp(10)}
            onPress={closeModal}
          />
      </View>

    </SafeAreaView>

  )
}



export default CarouselCards
