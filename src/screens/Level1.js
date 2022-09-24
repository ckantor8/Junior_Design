/*
 * Level One Screen
 * React Native Game Engine Lives Here
 * Maintains the state of the game
 */

import React, { Component } from "react";
import {Image, ImageBackground, Linking, Modal, StyleSheet, Text, View } from "react-native";
import { GameEngine } from "react-native-game-engine";
import Background from "../assets/living-room/level-1-floor.png";
import GameStatusBar from "../components/GameStatusBar";
import MenuButton from "../components/buttons/MenuButton";
import NoteButton from "../components/buttons/NoteButton";
import SpeakButton from "../components/buttons//SpeakButton";
import { get, insert } from "../Db";
import Entities from "../entities/Level1Entities";
import Dispatches from "../systems/Level1Dispatches";
import Movement from "../systems/Movement";
import * as ScreenOrientation from 'expo-screen-orientation';
import train from "../assets/gameNotePics/train.png";
import outlet from "../assets/gameNotePics/outlet.png";
import { CoreStyle } from "../components/CoreStyle.js";

export default class LevelOne extends Component {
  constructor(props) {
    super(props);

    this.state = {
      engineRunning: true,
      modalVisible: false,
      levelComplete: false,
      collectNote1Visible: false,
      collectNote2Visible: false,
      inventorySize: 0,
      inventoryCap: 2,
      min: "00",
      sec: "00",
      msec: "00",
      note1Collected: false,
      note2Collected: false,
      interactionIconVisible: false,
      interactionModalVisible: false,
      note1ModalVisible: false,
      note2ModalVisible: false,
      markBadgeModal: false,
    };

    this.gameEngine = null;
  }

  async componentDidMount() {
    this.state.badgeEarned = await get("mark");
    let gold = await get("gold1");
    let silver = await get("silver1");
    let bronze = await get("bronze1");

    if (gold === "true") {
      this.state.highestEarned = "gold";
    } else if (silver === "true") {
      this.state.highestEarned = "silver";
    } else if (bronze === "true") {
      this.state.highestEarned == "bronze";
    } else {
      this.state.highestEarned == null;
    }
  }

  // This is a callback function that is passed as a
  // prop to pause. When the pause button in the status bar
  // is clicked the status bar calls this function which changes
  // the pause state
  pauseCheckCallback = (pauseStatus) => {
    this.setState({ engineRunning: pauseStatus });
  };

  //callback to take the user to the next level
  handleNextLevel = () => {
    this.props.navigation.replace("LevelTwo");
  };

  //callback to restart the level
  handleLevelRestart = () => {
    this.props.navigation.replace("LevelOne");
  };

  // go home callback
  handleReturnToHome = () => {
    this.props.navigation.replace("Home");
  };

  // callback that is called when the user hits the Note Button
  // updates the inventory by one
  handleCollectNote1 = () => {
    this.setState({ inventorySize: this.state.inventorySize + 1 });
    this.setState({ note1ModalVisible: true });
    this.timerRef.stopClock();
  };

  // callback that is called when the user hits the Note Button
  // updates the inventory by one
  handleCollectNote2 = () => {
    this.setState({ inventorySize: this.state.inventorySize + 1 });
    this.setState({ note2ModalVisible: true });
    this.timerRef.stopClock();
  };
  //callback that changes the level status to complete
  // called after contacting the stairs with a full inventory
  handleLevelComplete = () => {
    this.setState({ levelComplete: true });
    if (
      this.state.sec < 15 &&
      this.state.min == 0 &&
      this.state.highestEarned !== "gold"
    ) {
      insert("gold1", "true");
      insert("silver1", "false");
      insert("bronze1", "false");
      this.setState({ highestEarned: "gold" });
    } else if (
      this.state.sec < 30 &&
      this.state.min == 0 &&
      this.state.highestEarned !== "gold" &&
      this.state.highestEarned !== "silver"
    ) {
      insert("silver1", "true");
      insert("bronze1", "false");
      this.setState({ highestEarned: "silver" });
    } else {
      insert("bronze1", "true");
      this.setState({ highestEarned: "bronze" });
    }
    insert("lvl2", "true");
  };

  //confusing process to get time from the timer component
  // callback is passed to statusbar which passes it to timer.
  // Time calls the function when level complete changes and updates
  // the final level time
  getTime = (time) => {
    this.setState({ min: time.min });
    this.setState({ sec: time.sec });
    this.setState({ msec: time.msec });
  };

  // function called by the speak button
  // makes the npc dialog modal visible
  handleNPCInteraction = () => {
    this.setState({ interactionModalVisible: true });
  };

  //Handles all of the collisions and information that comes from
  //the system dispatches. (Level1Dispatches.js)
  onEvent = (e) => {
    if (e.type === "note-one-found" && this.state.note1Collected == false) {
      this.setState({ collectNote1Visible: true });
    }
    if (e.type === "note-two-found" && this.state.note2Collected == false) {
      this.setState({ collectNote2Visible: true });
    }
    if (e.type === "npc-interact") {
      this.setState({ interactionIconVisible: true });
    }
    if (e.type === "none") {
      this.setState({ collectNote1Visible: false });
      this.setState({ collectNote2Visible: false });
      this.setState({ interactionIconVisible: false });
    }
    if (
      e.type === "at-objective" &&
      this.state.inventoryCap == this.state.inventorySize &&
      this.state.levelComplete != true
    ) {
      this.handleLevelComplete();
    }
  };
  
  render() {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
    const { modalVisible } = this.state;
    return (
      <ImageBackground source={Background} style={CoreStyle.image}>
        <View style={CoreStyle.gameContain}>
          <View style={CoreStyle.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.interactionModalVisible}
              supportedOrientations={["landscape"]}
              onRequestClose={() => {
                this.setModalVisible(!modalVisible);
              }}
            >
              <View style={CoreStyle.centeredView}>
                <View style={CoreStyle.modalView}>
                  <Text allowFontScaling={true} style={CoreStyle.modalText}>
                  Collect All The Notes To Progress To The Next Level.</Text>
                  <Text allowFontScaling={true} style={CoreStyle.modalText}>
                    Then go the stairs to finish the level. </Text>
                  <Text allowFontScaling={true} style={CoreStyle.textStyle}>Hide Modal</Text>
                  <MenuButton
                    text="OK"
                    onPress={() => {
                      this.setState({ interactionModalVisible: false });
                    }}
                  ></MenuButton>
                </View>
              </View>
            </Modal>
          </View>
          <View style={CoreStyle.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.levelComplete}
              supportedOrientations={["landscape"]}
              onRequestClosed={() => {
                this.setModalVisible(!modalVisible);
              }}
            >
              <View style={CoreStyle.centeredView}>
                <View style={CoreStyle.modalView}>
                  <Text allowFontScaling={true} style={CoreStyle.modalText}>
                    Time: {this.state.min}:{this.state.sec}:{this.state.msec}
                  </Text>
                  <MenuButton
                    text="CONTINUE"
                    onPress={this.handleNextLevel}
                  ></MenuButton>
                  <MenuButton
                    text="PLAY AGAIN"
                    onPress={this.handleLevelRestart}
                  ></MenuButton>
                  <MenuButton
                    text="QUIT"
                    onPress={this.handleReturnToHome}
                  ></MenuButton>
                </View>
              </View>
            </Modal>
          </View>
          <GameEngine
            ref={(ref) => {
              this.gameEngine = ref;
            }}
            style={CoreStyle.gameContainer}
            running={this.state.engineRunning}
            systems={[Movement, Dispatches]}
            onEvent={this.onEvent}
            entities={Entities()}
          ></GameEngine>
          <GameStatusBar
            pauseUpdater={this.pauseCheckCallback}
            inventorySize={this.state.inventorySize}
            inventoryCap={this.state.inventoryCap}
            navigation={this.props.navigation}
            levelComplete={this.state.levelComplete}
            timeToLevel={this.getTime}
            currentLevel={"LevelOne"}
            ref={(cd) => this.timerRef = cd}
          />
          <View style={{ alignItems: "flex-end" }}>
            <NoteButton
              visible={this.state.collectNote1Visible}
              onPress={this.handleCollectNote1}
            />
            <NoteButton
              visible={this.state.collectNote2Visible}
              onPress={this.handleCollectNote2}
            />
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.note1ModalVisible}
              supportedOrientations={["landscape"]}
              onRequestClose={() => {
                this.setModalVisible(!modalVisible);
              }}
            >
              <View style={CoreStyle.centeredView}>
                <View style={CoreStyle.modalView}>
                  <Text allowFontScaling={true} style={CoreStyle.modalTitle}>Coins:</Text>
                  <Text allowFontScaling={true} style={CoreStyle.modalText}>
                    Choose a toy chest without a lid. Toys should be large
                    enough — at least 1¼" (3 centimeters) in diameter and 2¼" (6
                    centimeters) in length — so that they can't be swallowed or
                    lodged in the windpipe. Avoid marbles, coins, balls, and
                    games with balls that are 1.75 inches (4.4 centimeters) in
                    diameter or less because they can become lodged in the
                    throat above the windpipe and cause trouble with breathing.
                  </Text>
                   <Text allowFontScaling={true} style={CoreStyle.modalText} onPress={() => { Linking.openURL('https://kidshealth.org/en/parents/products-toys.html') }}>
                    Source: https://kidshealth.org/en/parents/products-toys.html
                  </Text> 
                  <Image style={styles.img} source={train}/>
                  <Text allowFontScaling={true} style={CoreStyle.textStyle}>Hide Modal</Text>
                  <MenuButton
                    text="OK"
                    onPress={() => {
                      this.setState({ note1ModalVisible: false });
                      this.setState({ note1Collected: true });
                      if (this.state.badgeEarned == null) {
                        this.setState({ markBadgeModal: true });
                      }
                      this.timerRef.startClock();
                    }}
                  ></MenuButton>
                </View>
              </View>
            </Modal>
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.markBadgeModal}
              supportedOrientations={["landscape"]}
              onRequestClose={() => {
                this.setModalVisible(!modalVisible);
              }}
            >
              <View style={CoreStyle.centeredView}>
                <View style={CoreStyle.modalView}>
                  <Text allowFontScaling={true} style={CoreStyle.modalText}>
                    Congrats! You found your first Note. Go to the badges page
                    to track your progress!
                  </Text>
                  <MenuButton
                    text="OK"
                    onPress={() => {
                      this.setState({ markBadgeModal: false });
                      insert("mark", "true");
                      this.setState({ badgeEarned: "true" });
                    }}
                  ></MenuButton>
                </View>
              </View>
            </Modal>
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.note2ModalVisible}
              supportedOrientations={["landscape"]}
              onRequestClose={() => {
                this.setModalVisible(!modalVisible);
              }}
            >
              <View style={CoreStyle.centeredView}>
                <View style={CoreStyle.modalView}>
                  <Text allowFontScaling={true} style={CoreStyle.modalTitle}>Outlets:</Text>
                  <Text allowFontScaling={true} style={CoreStyle.modalText}>
                    Outlet covers are great solutions to prevent accidental
                    electrocutions. Nearly one-third of accidents occur when a
                    child inserts common household items into receptacles, 70
                    percent of them occurring when adults are present. Items
                    that children insert into outlets can be found anywhere, and
                    commonly include: hairpins, keys, plugs, paper clips, staples, tools,
                    jewelry, belt buckles, nail files, and knives. {'\n'}{'\n'}
                    Approximately 100 kids die each year by electrocution, and
                    many others are seriously hurt. {'\n'}{'\n'}
                    95 percent of injuries resulting from electrical outlets
                    will involve burns. Though they range in severity, it is
                    important to understand that burns are very serious in young
                    children whose skin is thin and offers little resistance to
                    electric flow or heat.
                  </Text>
                  <Text allowFontScaling={true} style={CoreStyle.modalText} onPress={() => { Linking.openURL('https://mrelectric.com/child-proof-outlets'); }}>
                      Source: https://mrelectric.com/child-proof-outlets
                    </Text>
                  <Text allowFontScaling={true} style={CoreStyle.textStyle}>Hide Modal</Text>
                  <MenuButton
                    text="OK"
                    onPress={() => {
                      this.setState({ note2ModalVisible: false });
                      this.setState({ note2Collected: true });
                      if (this.state.badgeEarned == null) {
                        this.setState({ markBadgeModal: true });
                      }
                      this.timerRef.startClock();
                    }}
                  ></MenuButton>
                </View>
              </View>
            </Modal>
            <SpeakButton
              visible={this.state.interactionIconVisible}
              onPress={this.handleNPCInteraction}
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  img: {
    height: 70,
    width: 70,
  },
});
