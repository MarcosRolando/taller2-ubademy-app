import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { Avatar, Paragraph, Title, List } from "react-native-paper";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import styles from "../constants/styles";

const Profile = () => {

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

                <Paragraph>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </Paragraph>

                <List.Accordion
                    title="Courses as a student"
                    left={props => <List.Icon {...props} icon="folder" />}>
                    <List.Item title="First item" onPress={() => console.log("Oh! Me has presionado!")} />
                    <List.Item title="Second item" />
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