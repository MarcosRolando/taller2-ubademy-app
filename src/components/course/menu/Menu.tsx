import React from "react";
import { ScrollView, View, TouchableOpacity } from "react-native";
import { Card, List, Title, Button, Portal, Text } from "react-native-paper";
import { COURSE, COURSE_MENU_EXAMS, COURSE_MENU_EXAMS_CORRECTION, COURSE_REVIEWS, COURSE_STUDENTS } from "../../../routes";
import styles from "../../../styles/styles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import colors from "../../../styles/colors";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { getCourseInfo, postSubscribeToCourse,
  postUnsubscribeToCourse } from "../../../scripts/course";
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { getMyCourses } from "../../../scripts/profile";
import AddCollaborator from "./AddCollaborator";


const Menu = ({id, navigation}: any) => {
  const [canEdit, setCanEdit] = React.useState(false);
  const [canCorrect, setCanCorrect] = React.useState(false);
  const [isProfessor, setIsProfessor] = React.useState(false);
  const [canSeeExams, setCanSeeExams] = React.useState(false);

  const [seePortal, setSeePortal] = React.useState(true);
  const [showUnsubscribe, setShowUnsubscribe] = React.useState(false);
  const [showAddCollaborator, setShowAddCollaborator] = React.useState(false);

  const [title, setTitle] = React.useState("");
  const [subType, setSubType] = React.useState("Free");
  const [cover, setCover] = React.useState(undefined);

  function goToCourseScreen() {
    navigation.navigate(COURSE, {id: id});
  }

  function goToExamsScreen() {
    navigation.navigate(COURSE_MENU_EXAMS, {
        id: id,
        canEdit: canEdit,
        isProfessor: isProfessor
    })
  }

  function goToStudentsExamsScreen() {
    navigation.navigate(COURSE_MENU_EXAMS_CORRECTION, {
      id: id,
      canCorrect: canCorrect
    })
  }

  function goToStudentsScreen(){
    navigation.navigate(COURSE_STUDENTS, {
      courseId: id
    })
  }

  function goToReviewsScreen() {
    navigation.navigate(COURSE_REVIEWS, {
      courseId: id
    })
  }

  function addCollaborator() {
    setShowAddCollaborator(true);
  }

  async function subscribeToCourse() {
    try {
      const res = await postSubscribeToCourse(id);
      setSeePortal(false);
      setShowUnsubscribe(true);
    } catch (error) {
      alert(error)
    }
  }

  async function unsubscribeToCourse() {
    try {
      const res = await postUnsubscribeToCourse(id);
      setSeePortal(true);
      setShowUnsubscribe(false);
    } catch (error) {
      alert(error)
    }
  }

  useFocusEffect(React.useCallback(() => {
    (async () => {
      const myCourses = await getMyCourses();

      for (let i = 0; i < myCourses.student.length; i++) {
        if (myCourses.student[i]._id === id) {
          setCanEdit(false);
          setCanCorrect(false);
          setSeePortal(false);
          setShowUnsubscribe(true);
          setCanSeeExams(true);
          break;
        }
      }
      for (let i = 0; i < myCourses.collaborator.length; i++) {
        if (myCourses.collaborator[i]._id === id) {
          setCanEdit(false);
          setCanCorrect(true);
          setSeePortal(false);
          setIsProfessor(true);
          setCanSeeExams(true);
          break;
        }
      }
      for (let i = 0; i < myCourses.creator.length; i++) {
        if (myCourses.creator[i]._id === id) {
          setCanEdit(true);
          setCanCorrect(true);
          setSeePortal(false);
          setIsProfessor(true);
          setCanSeeExams(true);
          break;
        }
      }
    })();

    (async () => {
      try {
        const info = await getCourseInfo(id);
        setTitle(info.title);
        setSubType(info.subscription_type);
        setCover(info.images[0]);
      } catch (error) {
        alert(error)
      }
    })();
  }, []))

  return (
    <ScrollView style={styles.screen}>
      
      <Title style={{...styles.profileTitle, paddingTop: hp(2)}}>
        {title}
      </Title>

      <View style={{marginTop: hp(2)}}>
        <Card>
          <Card.Cover
          source={{uri: cover}}
          resizeMode={'contain'}
          style={{backgroundColor: colors.background}}/>
        </Card>
      </View>

      <View style={styles.menu}>
        <List.Item
          title={"See course"}
          right={props => <List.Icon {...props} icon="hand-pointing-right"/>}
          onPress={goToCourseScreen}
        />

        {canSeeExams ? (
          <List.Item
            title={"See course's exams"}
            right={props => <List.Icon {...props} icon="hand-pointing-right"/>}
            onPress={goToExamsScreen}
          />
        ) : <></>}

        {canCorrect ? (

          <List.Item
            title={"See students' exams"}
            right={props => <List.Icon {...props} icon="hand-pointing-right"/>}
            onPress={goToStudentsExamsScreen}
          />

        ) : <></>}

        {canEdit ? (
          <View>
            <List.Item
              title={"Add collaborator"}
              right={props => <List.Icon {...props} icon="hand-pointing-right"/>}
              onPress={addCollaborator}
            />

            <List.Item
              title={"See students"}
              right={props => <List.Icon {...props} icon="hand-pointing-right"/>}
              onPress={goToStudentsScreen}
            />
          </View>
        ) : <></>}

        <List.Item
          title={"See reviews"}
          right={props => <List.Icon {...props} icon="hand-pointing-right"/>}
          onPress={() => goToReviewsScreen()}
          />

      </View>

      {seePortal ? (
        <Portal>
          <View style={styles.viewOnFront}>

            <Text>{subType}</Text>

            <TouchableOpacity
              // TODO: que se avise al baka-back que se subscribió
              onPress={() => subscribeToCourse()}
              style={{backgroundColor: colors.background, borderRadius: 1.5, padding:wp(2), marginLeft:wp(10)}}
            >
              <Text style={{}}
                >SUBSCRIBE
              </Text>
            </TouchableOpacity>
            
          </View>
        </Portal>
      ) : <></> }

      {showUnsubscribe ? (
        <Button
          color={colors.error}
          onPress={() => unsubscribeToCourse()}
        >
          Unsubscribe
        </Button>
      ) : <></>}

        <AddCollaborator
          courseId={id}
          showAddCollaborator={showAddCollaborator}
          setShowAddCollaborator={setShowAddCollaborator}
        />

    </ScrollView>
  )
}

export default Menu;