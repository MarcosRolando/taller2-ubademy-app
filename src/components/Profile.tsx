import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { Avatar, Paragraph, Title, List } from "react-native-paper";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import styles from "../constants/styles";

const Profile = () => {

    var coursesStudentNames = ["Curso de Python", "Curso de Chocolate I"]
    //var coursesStudent:any = [];

    function renderCourses(coursesName : any) : any[] {
        var courses:any = [];
        for (let i = 0; i < coursesName.length; i++) {
            courses.push(
                <List.Item key={i} title={coursesName[i]} onPress={() => console.log("Oh! Me has presionado!")} />
            )
        }
        return courses;
    }

    /**
    function renderCourses1(coursesName : any, courses : any) {
        let i = 0;
        for (let courseName in coursesName) {
            courses.push(
                <List.Item key={i} title={courseName} onPress={() => console.log("Oh! Me has presionado!")} />
            )
            i = i + 1;
            console.log(courseName);
        }
        console.log(courses);
    }
    */

    var coursesStudent = renderCourses(coursesStudentNames);

    return (
        <SafeAreaView style={styles.profileContainer}>
            
            <ScrollView>

                <Title style={styles.profileTitle}>
                    Profile
                </Title>

                <View style={styles.profileImage}>

                    <Avatar.Image
                        size={wp(40)}
                        source={require("../images/example.jpg")}
                    />

                    <Title style={styles.profileName}>
                        Name Surname
                    </Title>

                </View>

                <List.Accordion
                    title="Courses as a student"
                    left={props => <List.Icon {...props} icon="folder" />}>
                    {coursesStudent}
                </List.Accordion>

                <List.Accordion
                    title="Courses as a teacher"
                    left={props => <List.Icon {...props} icon="folder" />}>
                    <List.Item title="First item" />
                    <List.Item title="Second item" />
                </List.Accordion>

                <List.Accordion
                    title="Courses as a collaborator"
                    left={props => <List.Icon {...props} icon="folder" />}>
                    <List.Item title="First item" />
                    <List.Item title="Second item" />
                    <List.Item title="Second item" />
                    <List.Item title="Second item" />
                    <List.Item title="Second item" />
                    <List.Item title="Second item" />
                    <List.Item title="Second item" />
                </List.Accordion>

            </ScrollView>

        </SafeAreaView>
    );

}

export default Profile;