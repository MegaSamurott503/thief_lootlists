import { useTheme } from '@react-navigation/native';
import {
  Platform,
  Image, Text,
  useWindowDimensions
} from 'react-native';
import { memo } from 'react';

import { FindMeCount } from '@/components/findMeCount';

import { stylesList } from '@/constants/stylesList';
import { stylesImg } from '@/constants/stylesImg';
import {
  iconGold, iconGems, iconGoods, iconSpecial
} from '@/constants/imgUI';

// TODO: 'underline line-through' only works on web; see speed potion in t1_lost
/* **************** */
/*  FIND ME PRECISE */
/* **************** */
// Custom text component to show an item's precise location.
// Wrap in a memo to avoid unnecessary re-renders.
export const FindMePrecise = memo(function FindMePrecise(props) {
  // Access window size.
  const { height, width } = useWindowDimensions();

  // Access theme colors.
  const { colors } = useTheme();

return (
    <Text style={[
      stylesList.locText,
      {fontSize: (Platform.OS === 'web') ? 12 : width*0.019,
        color: colors.text},
      //props.findSecret && {color: colors.locSecret},
      props.findUnable && stylesList.locNoGet,
    ]}>
      {/* If no precise location, insert a blank for spacing. */}
      {!props.findNarrow && !props.findExact &&
       !props.findRecipe && props.loadout !== "store" &&
       ' '
      }
      {/* Is this item an Easter Egg? */}
      {props.findEaster &&
        <>
          <Text style={{color: colors.locN}}>(</Text>
          <Text style={{color: colors.locX}}>\</Text>{/* ≈ */}
          <Text style={{color: colors.locH}}>) </Text>
        </>
      }
      {/* Is this item in a secret location? */}
      {props.findSecret &&
        <Text style={{color: colors.locSecret}}>
          {'[[ '}
        </Text>
      }
      {/* Print the general location of this item, if applicable. */}
      {props.findNarrow &&
        props.findNarrow
      }
      {/* Separate the general and exact locations, if needed. */}
      {props.findNarrow && props.findExact &&
        ', '
      }
      {/* Is this item able to be pickpocketed? */}
      {props.findPick &&
        <Text>{'{ '}</Text>
      }
      {/* Print the exact location of this item, if applicable. */}
      {props.findExact &&
        <Text style={[
          stylesList.locText,
          {fontSize: (Platform.OS === 'web') ? 12 : width*0.019},
          props.findBox && !props.findNoGet && stylesList.locBox,
          props.findBox && props.findNoGet && stylesList.locBoxNoGet,
          props.findPick && stylesList.locPick,
        ]}>
          {props.findExact}
        </Text>
      }
      {/* Is there more than 1 of this item in a container? */}
      {props.findCountBox && Math.max(...props.findCountBox) > 1 &&
        <FindMeCount
          findCount={props.findCountBox}
          findCountActual={props.findCountActual}
          findBox={props.findBox}
          findPick={props.findPick}
        />
      }
      {props.findPick &&
        <Text>{' }'}</Text>
      }
      {/* Is there more than 1 of this item at this location? */}
      {!props.loadout &&
        ((props.findCount && (Math.max(...props.findCount) > 1 ||
          Math.min(...props.findCount) === -1)
        ) ||
        (props.findCountMode && Math.max(...props.findCountMode) > -1)) &&
        <FindMeCount
          modeNames={props.modeNames}
          findCount={props.findCount}
          findCountMode={props.findCountMode}
          findCountActual={props.findCountActual}
        />
      }
      {/* Separate the location and requirements, if needed. */}
      {(props.findNarrow || props.findExact) &&
        ((props.loadout === "store" && props.price > -1) ||
          props.findRecipe) &&
        ', '
      }
      {/* Print the requirements, if any, for this item to appear. */}
      {props.findRecipe &&
        <Text style={stylesList.locCount}>{props.findRecipe}</Text>
      }
      {/* Do the requirements make more than 1 of this item appear? */}
      {props.findCountRecipe &&
        (Math.max(...props.findCountRecipe) > 1 ||
          Math.min(...props.findCountRecipe) === -1
        ) &&
        <FindMeCount
          findCount={props.findCountRecipe}
          findCountActual={props.findCountActual}
        />
      }
      {/* Separate the location and purchase price, if needed. */}
      {((props.findNarrow || props.findExact || props.findRecipe) &&
        (props.value && Math.min(...props.value) < 0)) &&
        ', '
      }
      {/* Print the loot that must be spent, if any, to acquire. */}
      {props.value && Math.min(...props.value) < 0 &&
        <>
          <Text style={stylesList.locCount}>
            {'spend'}
          </Text>
          {/* In-game gold must be spent. */}
          {(props.value[0] < 0) &&
            <Text style={stylesList.locCount}>
              {` ${Math.abs(props.value[0])} `}
              <Image
                source={iconGold}
                style={stylesImg.imgLootIcon}
              />
            </Text>
          }
          {/* In-game gems must be spent. */}
          {(props.value[1] < 0) &&
            <Text style={stylesList.locCount}>
              {` ${Math.abs(props.value[1])} `}
              <Image
                source={iconGems}
                style={stylesImg.imgLootIcon}
              />
            </Text>
          }
          {/* In-game goods must be spent. */}
          {(props.value[2] < 0) &&
            <Text style={stylesList.locCount}>
              {` ${Math.abs(props.value[2])} `}
              <Image
                source={iconGoods}
                style={stylesImg.imgLootIcon}
              />
            </Text>
          }
          {/* In-game special must be spent. */}
          {(props.value[3] < 0) &&
            <Text style={stylesList.locCount}>
              {` ${Math.abs(props.value[3])} `}
              <Image
                source={iconSpecial}
                style={stylesImg.imgLootIcon}
              />
            </Text>
          }
          {(Math.max(...props.findCount) > 1) &&
            <Text style={stylesList.locCount}>
              {' each'}
            </Text>
          }
        </>
      }
      {props.findSecret &&
        <Text style={{color: colors.locSecret}}>
          {' ]]'}
        </Text>
      }
      {props.findEaster &&
        <>
          <Text style={{color: colors.locH}}> (</Text>
          <Text style={{color: colors.locX}}>/</Text>
          <Text style={{color: colors.locN}}>)</Text>
        </>
      }
      {/* Is this item available in the loadout store? */}
      {props.loadout === "store" && props.price > -1 &&
        `Price: ${props.price}`
      }
      {/* Print the footnote icon for this item, if applicable. */}
      {props.findNote && props.loadout !== "start" &&
        <Text style={stylesList.locCount}>
          {props.findNote.delimiter &&
            (props.findNarrow || props.findExact || props.findRecipe) &&
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
