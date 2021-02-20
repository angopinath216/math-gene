import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import {
  Container,
  Text,
  StyleProvider,
  Grid,
  Row,
  Col,
  Button,
  Root,
  Header,
  Left,
  Content,
  Icon,
  Right,
  Body,
  Title,
} from "native-base";
import {
  Layout,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";

import Game from "../box/Game";
import { generateGame } from "../services/Core";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
const ResetIcon = (props) => <Icon {...props} name="refresh" />;

export default function Outline() {
  //const vector = 2;
  //const diffLevel = 0.1;
  //const gameValues = generateGame(vector, diffLevel);
  const highLevel = 5;
  const highDiffLevel = 0.6;
  const lowLevel = 2;
  const lowDiffLevel = 0.2;
  const [vector, setVector] = useState(lowLevel);
  const [diffLevel, setDiffLevel] = useState(lowDiffLevel);
  const [gameValues, setGameValues] = useState(generateGame(vector, diffLevel));
  const [levelCounter, setLevelCounter] = useState(1);

  var initGame = () => {
    const _gameValues = generateGame(vector, diffLevel);
    setGameValues(_gameValues);
  };

  var refreshGame = () => {
    console.log("refresh called");
    initGame();
  };

  var nextLevelDiffDecider = () => {
    if (highDiffLevel == diffLevel) {
      if (highLevel > vector) {
        setVector(vector + 1);
        setDiffLevel(lowDiffLevel);
      }
    } else {
      setDiffLevel(diffLevel + 0.1);
    }
  };

  var playNextLevel = () => {
    nextLevelDiffDecider();
    setLevelCounter(levelCounter + 1);
    initGame();
  };

  const renderBackAction = () => <TopNavigationAction />;

  const renderRightActions = () => (
    <TopNavigationAction onPress={() => refreshGame()} />
  );

  const getLevelString = () => {
    return "Level: " + levelCounter;
  };

  return (
    <>
      <TopNavigation
        style={{ marginTop: 20 }}
        alignment="center"
        title="Matrix Adder"
        subtitle={getLevelString()}
        accessoryLeft={renderBackAction}
        accessoryRight={renderRightActions}
      />
      <Game
        gameInput={gameValues}
        nextLevel={playNextLevel}
        restartLevel={refreshGame}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});