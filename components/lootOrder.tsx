import {
  StyleSheet,
  View, Text
} from 'react-native';

import { LootlistEntry } from '@/components/lootlistEntry';

import { myImages } from '@/constants/imgItems';

/* **************** */
/*    LOOT ORDER    */
/* **************** */
// Custom component of all the mission's loot, listed in the order they're found.
export function LootOrder(props) {
  // Get array of each individual loot.
  const orderedLoot = props.lootSort[0];

  return (
    <>
      {/* Map out each entry in loot order array. */}
      {orderedLoot.map((orderKey, orderIndex) => (
        <LootlistEntry
          key={`loot_${orderIndex}`}
          id={orderKey[3].id}
          title={props.title}
          modeNames={props.modeNames}
          lootCats={props.lootCats}
          areas={props.areas}
          notes={props.notes}
          name={orderKey[0]}
          img={orderKey[3].orderImg.map((imgKey, imgIndex) => {
            return myImages[imgKey];
          })}
          //values={oneLootObj}
          orderedIndex={orderIndex}
          orderedLoot={orderedLoot[orderIndex]}
          getLinkedFind={props.getLinkedFind}
          setLinkedFind={props.setLinkedFind}
          // If in a different general area from the next loot,
          // notify the LootlistEntry to separate them.
          addSpacing={orderIndex < orderedLoot.length &&
            orderedLoot[orderIndex+1] &&
            orderKey[3].findArea !== orderedLoot[orderIndex+1][3].findArea
              ? true : false
          }
        />
      ))}
    </>
  );
}

// Define various styles here.
const styles = StyleSheet.create({
  orderSplit: {
    marginTop: 9,
  },
});
