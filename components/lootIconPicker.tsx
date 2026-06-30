import {
  StyleSheet, Image
} from 'react-native';
//import { useContext } from 'react';

import { stylesImg } from '@/constants/stylesImg';
import {
  iconGold, iconGems, iconGoods, iconSpecial
} from '@/constants/imgUI';

/* **************** */
/* LOOT ICON PICKER */
/* **************** */
// Custom image component of a loot category's icon (gold, gems, goods, etc).
export function LootIconPicker(props) {
  // Use the identifier to decide which loot icon to return.
  function lootSwitch(lootCat) {
    switch(lootCat) {
      // Icon: gold coin
      case 'gold':
      case 'metal':
      case 'metals':
        return iconGold;
      // Icon: gemstone
      case 'gem':
      case 'gems':
        return iconGems;
      // Icon: portrait
      case 'good':
      case 'goods':
      case 'art':
        return iconGoods;
      // Icon: sparkles
      // (Default if none specified)
      case 'special':
      default:
        return iconSpecial;
    }
  }

  return (
    <Image
      source={lootSwitch(props.cat)}
      style={props.big
        ? stylesImg.imgLootIconBig
        : stylesImg.imgLootIcon
      }
    />
  );
}

// Define various styles here.
const styles = StyleSheet.create({

});
