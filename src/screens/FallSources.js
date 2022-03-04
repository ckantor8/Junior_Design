import React from "react";
import { ImageBackground, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Background from "../assets/bg.png";
import BackButton from "../components/BackButton";
import MainButton from "../components/MainButton";
import MediaButton from "../components/MediaButton";
import Navbar from "../components/NavBar";

export default function FallSources({ navigation }) {
    //NAV CALLBACK
    const goHome = () => {
        navigation.pop();
    };
    const handleInfoNav = () => {
        navigation.navigate("Info");
    };
    const goToFalls = () => {
        navigation.navigate("Falls");
    };
    const backToSources = () => {
        navigation.navigate("Sources");
    };
    const handleNextNav = () => {
        navigation.navigate("BurningSources");
    };

    return (
    <ImageBackground source={Background} style={styles.image}>

    <View style={styles.btns}>
        <MediaButton
              text="Back to Sources"
              onPress={backToSources}
              txtColor={"black"}
        ></MediaButton>
        <BackButton
            text=">"
            txtColor={"black"}
            onPress={handleNextNav}
        ></BackButton>
    </View>

<ScrollView>

    <Text style={styles.title}> Fall Sources: </Text>

    <View style={styles.container}>

    <TouchableOpacity onPress={() => Linking.openURL('https://www.stanfordchildrens.org/en/topic/default?id=accident-statistics-90-P02853#:~:text=Injury%20is%20the%20leading%20cause,of%20nonfatal%20injury%20for%20children')}>
         <Text style={{textDecorationLine:'underline', color:'blue'}}> [1] Stanford Children Accident Statistics </Text>
    </TouchableOpacity>

    <Text> {'\n'} </Text>

    <TouchableOpacity onPress={() => Linking.openURL('https://www.stanfordchildrens.org/en/topic/default?id=falls--injury-statistics-and-incidence-rates-90-P02974')}>
         <Text style={{textDecorationLine:'underline', color:'blue'}}> [2] Stanford Children Incidence Rates </Text>
    </TouchableOpacity>

    <Text> {'\n'} </Text>

    <TouchableOpacity onPress={() => Linking.openURL('https://www.cdc.gov/safechild/images/cdc-childhoodinjury.pdf')}>
         <Text style={{textDecorationLine:'underline', color:'blue'}}> [3] Center for Disease Control </Text>
    </TouchableOpacity>

    <Text> {'\n'} </Text>

    <TouchableOpacity onPress={() => Linking.openURL('https://www.safekids.org/tip/falls-prevention-tips')}>
         <Text style={{textDecorationLine:'underline', color:'blue'}}> [4] SafeKids Fall Prevention Tips </Text>
    </TouchableOpacity>

    <Text> {'\n'} </Text>

    <TouchableOpacity onPress={() => Linking.openURL('https://www.safekids.org/tv')}>
         <Text style={{textDecorationLine:'underline', color:'blue'}}> [5] SafeKids - Tip-Overs </Text>
    </TouchableOpacity>

    <Text> {'\n'} </Text>

    <TouchableOpacity onPress={() => Linking.openURL('https://www.safekids.org/playgroundsafety')}>
         <Text style={{textDecorationLine:'underline', color:'blue'}}> [6] SafeKids - Playground Safety </Text>
    </TouchableOpacity>

    <Text> {'\n'} </Text>

    <TouchableOpacity onPress={() => Linking.openURL('https://kidshealth.org/en/parents/products-strollers.html')}>
         <Text style={{textDecorationLine:'underline', color:'blue'}}> [7] KidsHealth - Stroller Safety </Text>
    </TouchableOpacity>

    <Text> {'\n'} </Text>

    <MainButton
          text="Go to Falls"
          onPress={goToFalls}
          txtColor={"black"}
    ></MainButton>
    </View>
</ScrollView>

    <View style = {styles.pushdown}>
    <Navbar navigation={navigation}/>
    </View>

    </ImageBackground>
    );
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    btns: {
        display: "flex",
        flexDirection: "row",
        marginHorizontal: 20,
        justifyContent: "space-between",
    },
    title: {
        // margin: 100,
        //height: 70,
        fontSize: 40,
        marginBottom: 15,
        fontWeight: "bold",
        textAlign: "center",
        textDecorationLine: "underline"
    },
    subtitle: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: "center",
        fontWeight: "bold",
    },
    content: {
        fontSize: 16,
        marginBottom: 20,
    },
    page: {
        fontSize: 18,
        textAlign: "center",
        marginTop: 50,
        fontStyle: "italic",
    },
    container: {
        alignItems: "center",
    },
    pushdown: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#C4C4C4",
    },
});