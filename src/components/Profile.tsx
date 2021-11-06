import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { Avatar, Title, List, Subheading } from "react-native-paper";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import styles from "../constants/styles";
import getCoursesData from "../scripts/profile";
//import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEnvelope, faGlobe, faFolder } from '@fortawesome/free-solid-svg-icons';


const Profile = () => {
    //const [coursesData, setCoursesData] = React.useState([]);
    const [coursesData, setCoursesData] = React.useState({
        courseStudent: [] as any,
        courseProfessor: [] as any,
        courseCollaborator: [] as any
    })

    useEffect(() => {
        async function fetchData() {
            // Después se cambia, cuando ya tengamos los mensajes.
            // Pero dejo una "template"
           let data = await getCoursesData();
           setCoursesData({
                courseStudent: [...data],
                courseProfessor: [...data],
                courseCollaborator: [...data]
           })
        }
        fetchData();
    }, [])

    function renderCourses(coursesName : any) : any[] {
        var courses:any = [];
        for (let i = 0; i < coursesName.length; i++) {
            courses.push(
                <List.Item key={i} title={coursesName[i].name} onPress={() => console.log("Oh! Me has presionado!")} />
            )
        }
        return courses;
    }

    var coursesStudent = renderCourses(coursesData.courseStudent);
    var courseProfessor =  renderCourses(coursesData.courseProfessor);
    var courseCollaborator = renderCourses(coursesData.courseCollaborator);

    return (
        <SafeAreaView style={styles.profileContainer}>
            
            <ScrollView>

                <Title style={styles.profileTitle}>
                    Profile
                </Title>

                <View style={styles.profileImage}>

                    <Avatar.Image
                        size={wp(30)}
                        source={require("../images/example.jpg")}
                    />

                    <Title style={styles.profileName}>
                        Name Surname
                    </Title>

                </View>

                <View >

                <Subheading style={styles.profileSubtitle}>
                    Info
                </Subheading>

                <List.Item
                    title="example@gmail.com"
                    description="Email"
                    left={props => <List.Icon {...props} icon={({ size, color }) => (
                        <FontAwesomeIcon color={color} size={size} icon={ faEnvelope } />
                      )} />}
                />

                <List.Item
                    title="Argentina :("
                    description="Location"
                    left={props => <List.Icon {...props} icon={({ size, color }) => (
                        <FontAwesomeIcon color={color} size={size} icon={ faGlobe } />
                      )} />}
                />

                </View>

                <Subheading style={styles.profileSubtitle}>
                    Courses
                </Subheading>

                <List.Accordion
                    title="Courses as a student"
                    left={props => <List.Icon {...props}
                        icon={props => <List.Icon {...props} icon={({ size, color }) => (
                            <FontAwesomeIcon color={color} size={size} icon={ faFolder } />
                        )} />} />}>
                    {coursesStudent}
                </List.Accordion>

                <List.Accordion
                    title="Courses as a teacher"
                    left={props => <List.Icon {...props}
                    icon={props => <List.Icon {...props} icon={({ size, color }) => (
                        <FontAwesomeIcon color={color} size={size} icon={ faFolder } />
                    )} />} />}>
                    {courseProfessor}
                </List.Accordion>

                <List.Accordion
                    title="Courses as a collaborator"
                    left={props => <List.Icon {...props} 
                    icon={props => <List.Icon {...props} icon={({ size, color }) => (
                        <FontAwesomeIcon color={color} size={size} icon={ faFolder } />
                    )} />} />}>
                    {courseCollaborator}
                </List.Accordion>

            </ScrollView>

        </SafeAreaView>
    );

}

export default Profile;
