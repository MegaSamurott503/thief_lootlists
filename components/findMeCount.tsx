import { useTheme } from '@react-navigation/native';
import { Text } from 'react-native';
import { memo, useEffect, useState } from 'react';

import { stylesList } from '@/constants/stylesList';

/* **************** */
/*   FIND ME COUNT  */
/* **************** */
// Custom text component to show an item's stack count.
// Wrap in a memo to avoid unnecessary re-renders.
export const FindMeCount = memo(function FindMeCount(props) {
  // Use defaults to avoid errors if some props are undefined.
  const {
    modeNames = [{'name': '', 'icon': ''}],
    findCount = [1,1,1],
    findCountMode = [-1,-1,-1],
    findCountActual = [-1,-1,-1],
    findBox = false,
    findPick = false,
    carryover = false,
  } = props;

  // Access theme colors.
  const { colors } = useTheme();

  // Change: tracks if this item has differing stack counts.
  // Used to add relevant stack numbers to text field.
  const [getDiffChange, setDiffChange] = useState(false);
  const [getModeChange, setModeChange] = useState(false);
  const [getActlChange, setActlChange] = useState(false);

  // Stack: stores stack count shared across difficulties / game modes.
  // Used to avoid reprinting the same count when unnecessary.
  const [getDiffStack, setDiffStack] = useState(0);
  const [getModeStack, setModeStack] = useState(0);
  const [getActlStack, setActlStack] = useState(0);

  useEffect(() => {
    // Does this have different stack counts on different difficulties?
    if (findCount[0] !== findCount[1] ||
      findCount[1] !== findCount[2] ||
      findCount[0] !== findCount[2]) {
      // Exception: only available on Normal.
      if (findCount[0] > 0 &&
        findCount[1] === 0 && findCount[2] === 0) {
        setDiffChange(false);
        setDiffStack(findCount[0]);
      // Exception: only available on Hard.
      } else if (findCount[1] > 0 &&
        findCount[0] === 0 && findCount[2] === 0) {
        setDiffChange(false);
        setDiffStack(findCount[1]);
      // Exception: only available on Expert.
      } else if (findCount[2] > 0 &&
        findCount[0] === 0 && findCount[1] === 0) {
        setDiffChange(false);
        setDiffStack(findCount[2]);
      // Exception: same on Normal & Hard, unavailable on Expert.
      } else if (findCount[0] > 0 && findCount[1] > 0 &&
        findCount[0] === findCount[1] && findCount[2] === 0) {
        setDiffChange(false);
        setDiffStack(findCount[0]);
      // Exception: same on Hard & Expert, unavailable on Normal.
      } else if (findCount[1] > 0 && findCount[2] > 0 &&
        findCount[1] === findCount[2] && findCount[0] === 0) {
        setDiffChange(false);
        setDiffStack(findCount[1]);
      // Exception: same on Normal & Expert, unavailable on Hard.
      } else if (findCount[0] > 0 && findCount[2] > 0 &&
        findCount[0] === findCount[2] && findCount[1] === 0) {
        setDiffChange(false);
        setDiffStack(findCount[2]);
      // Otherwise, different stack counts on all difficulties.
      } else {
        setDiffChange(true);
      }
    // Otherwise, same count on all difficulties.
    } else {
      setDiffChange(false);
      setDiffStack(findCount[0]);
    }

    // Does this have different stack counts on different game modes?
    if (findCountMode[0] !== findCountMode[1] ||
      findCountMode[1] !== findCountMode[2] ||
      findCountMode[0] !== findCountMode[2]) {
      // Exception: only available on Mode A.
      if (findCountMode[0] > 0 &&
        findCountMode[1] === 0 && findCountMode[2] === 0) {
        setModeChange(false);
        setModeStack(findCountMode[0]);
      // Exception: only available on Mode B.
      } else if (findCountMode[1] > 0 &&
        findCountMode[0] === 0 && findCountMode[2] === 0) {
        setModeChange(false);
        setModeStack(findCountMode[1]);
      // Exception: only available on Mode C.
      } else if (findCountMode[2] > 0 &&
        findCountMode[0] === 0 && findCountMode[1] === 0) {
        setModeChange(false);
        setModeStack(findCountMode[2]);
      // Exception: same on Modes A & B, unavailable on Mode C.
      } else if (findCountMode[0] > 0 && findCountMode[1] > 0 &&
        findCountMode[0] === findCountMode[1] && findCountMode[2] === 0) {
        setModeChange(false);
        setModeStack(findCountMode[0]);
      // Exception: same on Modes B & C, unavailable on Mode A.
      } else if (findCountMode[1] > 0 && findCountMode[2] > 0 &&
        findCountMode[1] === findCountMode[2] && findCountMode[0] === 0) {
        setModeChange(false);
        setModeStack(findCountMode[1]);
      // Exception: same on Modes A & C, unavailable on Mode B.
      } else if (findCountMode[0] > 0 && findCountMode[2] > 0 &&
        findCountMode[0] === findCountMode[2] && findCountMode[1] === 0) {
        setModeChange(false);
        setModeStack(findCountMode[2]);
      // Otherwise, different stack counts on all game modes.
      } else {
        setModeChange(true);
      }
    // Otherwise, same count on all game modes.
    } else {
      setModeChange(false);
      setModeStack(findCountMode[0]);
    }

    // Does this have different actual counts on different difficulties?
    if (findCountActual[0] !== findCountActual[1] ||
      findCountActual[1] !== findCountActual[2] ||
      findCountActual[0] !== findCountActual[2]) {
      // Exception: only available on Normal.
      if (findCountActual[0] > 0 &&
        findCountActual[1] === 0 && findCountActual[2] === 0) {
        setActlChange(false);
        setActlStack(findCountActual[0]);
      // Exception: only available on Hard.
      } else if (findCountActual[1] > 0 &&
        findCountActual[0] === 0 && findCountActual[2] === 0) {
        setActlChange(false);
        setActlStack(findCountActual[1]);
      // Exception: only available on Expert.
      } else if (findCountActual[2] > 0 &&
        findCountActual[0] === 0 && findCountActual[1] === 0) {
        setActlChange(false);
        setActlStack(findCountActual[2]);
      // Exception: same on Normal & Hard, unavailable on Expert.
      } else if (findCountActual[0] > 0 && findCountActual[1] > 0 &&
        findCountActual[0] === findCountActual[1] && findCountActual[2] === 0) {
        setActlChange(false);
        setActlStack(findCountActual[0]);
      // Exception: same on Hard & Expert, unavailable on Normal.
      } else if (findCountActual[1] > 0 && findCountActual[2] > 0 &&
        findCountActual[1] === findCountActual[2] && findCountActual[0] === 0) {
        setActlChange(false);
        setActlStack(findCountActual[1]);
      // Exception: same on Normal & Expert, unavailable on Hard.
      } else if (findCountActual[0] > 0 && findCountActual[2] > 0 &&
        findCountActual[0] === findCountActual[2] && findCountActual[1] === 0) {
        setActlChange(false);
        setActlStack(findCountActual[2]);
      // Otherwise, different actual counts on all difficulties.
      } else {
        setActlChange(true);
      }
    // Otherwise, same actual count on all difficulties.
    } else {
      setActlChange(false);
      setActlStack(findCountActual[0]);
    }
  }, []);

  return (
    <Text style={[
      stylesList.locCount,
      findBox && stylesList.locBox,
      findPick && stylesList.locPick,
    ]}>
      {' '}
      {/* Does this item carry over from the last mission? */}
      {carryover &&
        'x [previous #]'
      }
      {/* Don't print the 'x' if only showing the game mode(s)
          and the stack count is 1. */}
      {!getModeChange && getDiffStack !== 1 &&
        'x'
      }
      {/* Print this item's stack count (unchanged by difficulty). */}
      {!getDiffChange && Math.max(...findCount) > 0 &&
        (!getModeChange && getDiffStack !== 1) &&
        getDiffStack
      }
      {/* Can this item be acquired indefinitely? */}
      {!getDiffChange && findCount[0] === -1 &&
        (!getModeChange && getDiffStack !== 1) &&
        '∞'
      }
      {/* Is the available count different from the stack count? */}
      {!getDiffChange && Math.max(...findCountActual) > -1 &&
        <>
          {'('}
          {/* Is the available count the same on all difficulties? */}
          {!getActlChange &&
            getActlStack
          }
          {/* Is the available count different on Normal? */}
          {getActlChange && findCountActual[0] > -1 &&
            <Text style={{color: colors.locN}}>
              {findCountActual[0]}
            </Text>
          }
          {/* Separate the Normal stack from Hard or Expert, if needed. */}
          {getActlChange && findCountActual[0] > -1 &&
            (findCountActual[1] > -1 || findCountActual[2] > -1) &&
            '/'
          }
          {/* Is the available count different on Hard? */}
          {getActlChange && findCountActual[1] > -1 &&
            <Text style={{color: colors.locH}}>
              {findCountActual[1]}
            </Text>
          }
          {/* Separate the Hard stack from Expert, if needed. */}
          {getActlChange &&
            findCountActual[1] > -1 && findCountActual[2] > -1 &&
            '/'
          }
          {/* Is the available count different on Expert? */}
          {getActlChange && findCountActual[2] > -1 &&
            <Text style={{color: colors.locX}}>
              {findCountActual[2]}
            </Text>
          }
          {')'}
        </>
      }
      {/* Print this item's stack count (Normal difficulty). */}
      {getDiffChange && findCount[0] > 0 &&
        <Text style={{color: colors.locN}}>
          {findCount[0]}
        </Text>
      }
      {/* Can this item be acquired indefinitely? */}
      {getDiffChange && findCount[0] === -1 &&
        <Text style={{color: colors.locN}}>
          ∞
        </Text>
      }
      {/* Is the available count different from the stack count? */}
      {getDiffChange && findCountActual[0] > -1 &&
        <Text style={{color: colors.locN}}>
          ({findCountActual[0]})
        </Text>
      }
      {/* Separate the Normal stack from Hard or Expert, if needed. */}
      {getDiffChange && findCount[0] > 0 &&
        '/'
      }
      {/* Print this item's stack count (Hard difficulty). */}
      {getDiffChange && findCount[1] > 0 &&
        <Text style={{color: colors.locH}}>
          {findCount[1]}
        </Text>
      }
      {/* Can this item be acquired indefinitely? */}
      {getDiffChange && findCount[1] === -1 &&
        <Text style={{color: colors.locH}}>
          ∞
        </Text>
      }
      {/* Is the available count different from the stack count? */}
      {getDiffChange && findCountActual[1] > -1 &&
        <Text style={{color: colors.locH}}>
          ({findCountActual[1]})
        </Text>
      }
      {/* Separate the Hard stack from Expert, if needed. */}
      {getDiffChange &&
        (findCount[1] > 0 && findCount[2] > 0) &&
        '/'
      }
      {/* Print this item's stack count (Expert difficulty). */}
      {getDiffChange && findCount[2] > 0 &&
        <Text style={{color: colors.locX}}>
          {findCount[2]}
        </Text>
      }
      {/* Can this item be acquired indefinitely? */}
      {getDiffChange && findCount[2] === -1 &&
        <Text style={{color: colors.locX}}>
          ∞
        </Text>
      }
      {/* Is the available count different from the stack count? */}
      {getDiffChange && findCountActual[2] > -1 &&
        <Text style={{color: colors.locX}}>
          ({findCountActual[2]})
        </Text>
      }

      {/* Print this item's stack count (unchanged by game mode). */}
      {!getModeChange &&
        (!getDiffChange && getModeStack > 1) &&
        `x${getModeStack}`
      }
      {!getModeChange && getModeStack !== -1 &&
        '~'
      }
      {/* Print this item's stack count (Game mode A). */}
      {getModeChange && findCountMode[0] > 0 &&
        `x${findCountMode[0]}~`
      }
      {/* Is this stack count available on Game Mode A? */}
      {findCountMode[0] > 0 && Math.min(...findCountMode) > -1 &&
        `${modeNames[0].icon}`
      }
      {/* Separate the Mode A stack from Mode B or C, if needed. */}
      {getModeChange && findCountMode[0] > 0 &&
        '/'
      }
      {/* Print this item's stack count (Game mode B). */}
      {getModeChange && findCountMode[1] > 0 &&
        `x${findCountMode[1]}~`
      }
      {/* Is this stack count available on Game Mode B? */}
      {findCountMode[1] > 0 && Math.min(...findCountMode) > -1 &&
        `${modeNames[1].icon}`
      }
      {/* Separate the Mode B stack from Mode C, if needed. */}
      {getModeChange &&
        (findCountMode[1] > 0 && findCountMode[2] > 0) &&
        '/'
      }
      {/* Print this item's stack count (Game mode C). */}
      {getModeChange && findCountMode[2] > 0 &&
        `x${findCountMode[2]}~`
      }
      {/* Is this stack count available on Game Mode C? */}
      {findCountMode[2] > 0 && Math.min(...findCountMode) > -1 &&
        `${modeNames[2].icon}`
      }
    </Text>
  );
});
