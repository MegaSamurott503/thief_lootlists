import { useTheme } from '@react-navigation/native';
import {
  Platform,
  Text,
  useWindowDimensions
} from 'react-native';
import { memo, useEffect, useState } from 'react';

import { FindMeCount } from '@/components/findMeCount';

import { stylesList } from '@/constants/stylesList';

/* **************** */
/*   FIND ME AREA   */
/* **************** */
// Custom text component to show an item's general area.
// Wrap in a memo to avoid unnecessary re-renders.
export const FindMeArea = memo(function FindMeArea(props) {
  // Access window size.
  const { height, width } = useWindowDimensions();

  // Access theme colors.
  const { colors } = useTheme();

  // DiffExclude: tracks if this item is only on certain difficulties.
  // Used to add difficulty markers to text field.
  const [getDiffExclude, setDiffExclude] = useState(false);

  useEffect(() => {
    // Is this item only available here on certain difficulties?
    if (
      props.findCount && Math.min(...props.findCount) === 0 ||
      props.findCountRecipe && Math.min(...props.findCountRecipe) === 0 ||
      props.findCountBox && Math.min(...props.findCountBox) === 0
    ) {
      setDiffExclude(true);
    }

  }, []);

  return (
    <Text style={[
      stylesList.locText,
      {fontSize: (Platform.OS === 'web') ? 12 : width*0.019,
        color: colors.text}
    ]}>
      {/* Does this item trigger (or contribute to) an objective? */}
      {props.findObj &&
        <Text style={{fontWeight: 'bold', color: colors.locObj}}>
          {'✶'}
        </Text>
      }
      {/* Is this item available here on Normal? */}
      {getDiffExclude &&
        (props.findCount && props.findCount[0] > 0 ||
          props.findCountRecipe && props.findCountRecipe[0] > 0 ||
          props.findCountBox && props.findCountBox[0] > 0) &&
        <Text style={{fontWeight: 'bold', color: colors.locN}}>
          {'■'}
          {/*'●■▲◆'*/}
        </Text>
      }
      {/* Is this item available here on Hard? */}
      {getDiffExclude &&
        (props.findCount && props.findCount[1] > 0 ||
          props.findCountRecipe && props.findCountRecipe[1] > 0 ||
          props.findCountBox && props.findCountBox[1] > 0) &&
        <Text style={{fontWeight: 'bold', color: colors.locH}}>
          {'▲'}
        </Text>
      }
      {/* Is this item available here on Expert? */}
      {getDiffExclude &&
        (props.findCount && props.findCount[2] > 0 ||
          props.findCountRecipe && props.findCountRecipe[2] > 0 ||
          props.findCountBox && props.findCountBox[2] > 0) &&
        <Text style={{fontWeight: 'bold', color: colors.locX}}>
          {'◆'}
        </Text>
      }
      {/* Separate the markings from the location, if needed. */}
      {(props.findObj || getDiffExclude) &&
        ' '
      }
      {/* Print the area where this item is found. */}
      {props.findArea}
      {/* Is there more than 1 of this item at loadout?
          Or, is there more than 1 of this item in the secret list? */}
      {(props.loadout === "start" || props.loadout === "store" ||
        props.secret) &&
        ((props.findCount && Math.max(...props.findCount) > 1) ||
        (props.findCountMode && Math.max(...props.findCountMode) > -1) ||
        props.carryover) &&
        <FindMeCount
          modeNames={props.modeNames}
          findCount={props.findCount}
          findCountMode={props.findCountMode}
          findCountActual={props.findCountActual}
          carryover={props.carryover}
        />
      }
      {/* Mirror the objective and difficulty markings, if any. */}
      {/*{(props.findObj || getDiffExclude) &&
        ' '
      }
      {getDiffExclude &&
        (props.findCount && props.findCount[2] > 0 ||
          props.findCountRecipe && props.findCountRecipe[2] > 0 ||
          props.findCountBox && props.findCountBox[2] > 0) &&
        <Text style={{fontWeight: 'bold', color: colors.locX}}>
          {'▷'}
        </Text>
      }
      {getDiffExclude &&
        (props.findCount && props.findCount[1] > 0 ||
          props.findCountRecipe && props.findCountRecipe[1] > 0 ||
          props.findCountBox && props.findCountBox[1] > 0) &&
        <Text style={{fontWeight: 'bold', color: colors.locH}}>
          {'>'}
        </Text>
      }
      {getDiffExclude &&
        (props.findCount && props.findCount[0] > 0 ||
          props.findCountRecipe && props.findCountRecipe[0] > 0 ||
          props.findCountBox && props.findCountBox[0] > 0) &&
        <Text style={{fontWeight: 'bold', color: colors.locN}}>
          {'❱'}
        </Text>
      }
      {props.findObj &&
        <Text style={{fontWeight: 'bold', color: colors.locObj}}>
          {'✶'}
        </Text>
      }*/}
      {/* Print the footnote icon for this item, if applicable. */}
      {props.findNote && props.loadout === "start" &&
        <Text style={stylesList.locCount}>
          {props.findNote.delimiter &&
            `${props.findNote.delimiter}`
          }
          {props.findNote.icon &&
            `${props.findNote.icon}`
          }
        </Text>
      }
    </Text>
  );
});
