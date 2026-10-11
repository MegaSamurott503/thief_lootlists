import { useTheme } from '@react-navigation/native';
import {
  StyleSheet, Platform,
  Text, View, ScrollView,
  useWindowDimensions
} from 'react-native';
import { useState } from 'react';
import { MultipleSelectList } from 'react-native-dropdown-select-list';

import { GoToMission } from '@/components/goToMission';
import { SectionHeader } from '@/components/sectionHeader';
import { FilterDropdown } from '@/components/filterDropdown';

import {
  myFMs,
  myGames, myYears,
  myAuthors, myProtagonists,
  myCampaigns, myContests,
  myGenres, myTimes,
  myLocations, myEnemies,
  myCharacters, myItems,
  filterFM
} from '@/constants/jsonFilters';
import { stylesTitle } from '@/constants/stylesTitle';
import { stylesGoTo } from '@/constants/stylesGoTo';
//import { stylesSelect } from '@/constants/stylesSelect';

/* **************** */
/*  THIEF FM SCREEN */
/* **************** */
// Screen for choosing a Thief fan mission.
// Contained in tab navigator to easily switch Thief games.
export default function ThiefFMScreen() {
  // Access window size.
  const { height, width } = useWindowDimensions();

  // Access theme colors.
  const { colors } = useTheme();

  // Filter: tracks the FM filters.
  // Used to show or hide FMs based on author, contest, genre, etc.
  const [getFilterGame, setFilterGame] = useState([]);
  const [getFilterYear, setFilterYear] = useState([]);
  const [getFilterAuthor, setFilterAuthor] = useState([]);
  const [getFilterProtagonist, setFilterProtagonist] = useState([]);
  const [getFilterCampaign, setFilterCampaign] = useState([]);
  const [getFilterContest, setFilterContest] = useState([]);
  const [getFilterGenre, setFilterGenre] = useState([]);
  const [getFilterTime, setFilterTime] = useState([]);
  const [getFilterLocation, setFilterLocation] = useState([]);
  const [getFilterEnemies, setFilterEnemies] = useState([]);
  const [getFilterCharacter, setFilterCharacter] = useState([]);
  const [getFilterItem, setFilterItem] = useState([]);

  function enemyFilterCheck(filterEnemy, myEnemy) {
    switch (filterEnemy) {
      case myEnemy:
        return true;
      case "~ Any Humans ~":
        if (myEnemy === "Guards" || myEnemy === "Servants" ||
            myEnemy === "Nobles" || myEnemy === "Thieves" ||
            myEnemy === "City Watch" || myEnemy === "Hammerites" ||
            myEnemy === "Mechanists" || myEnemy === "Pagans" ||
            myEnemy === "Keepers" || myEnemy === "Mages") {
          return true;
        } else {
          return false;
        }
      case "~ No Humans ~":
        if (myEnemy !== "Guards" && myEnemy !== "Servants" &&
            myEnemy !== "Nobles" && myEnemy !== "Thieves" &&
            myEnemy !== "City Watch" && myEnemy !== "Hammerites" &&
            myEnemy !== "Mechanists" && myEnemy !== "Pagans" &&
            myEnemy !== "Keepers" && myEnemy !== "Mages") {
          return false;
        } else {
          return true;
        }
      case "~ Any Undead ~":
        if (myEnemy === "Zombies" || myEnemy === "Skeletons" ||
            myEnemy === "Haunts" || myEnemy === "Ghosts" ||
            myEnemy === "Other Undead") {
          return true;
        } else {
          return false;
        }
      case "~ No Undead ~":
        if (myEnemy !== "Zombies" && myEnemy !== "Skeletons" &&
            myEnemy !== "Haunts" && myEnemy !== "Ghosts" &&
            myEnemy !== "Other Undead") {
          return false;
        } else {
          return true;
        }
      case "~ Any Creatures ~":
        if (myEnemy === "Spiders" || myEnemy === "Burricks" ||
            myEnemy === "Craymen" || myEnemy === "Apebeasts" ||
            myEnemy === "Bugbeasts" || myEnemy === "Frogbeasts" ||
            myEnemy === "Treebeasts" || myEnemy === "Other Creatures") {
          return true;
        } else {
          return false;
        }
      case "~ No Creatures ~":
        if (myEnemy !== "Spiders" && myEnemy !== "Burricks" &&
            myEnemy !== "Craymen" && myEnemy !== "Apebeasts" &&
            myEnemy !== "Bugbeasts" && myEnemy !== "Frogbeasts" &&
            myEnemy !== "Treebeasts" && myEnemy !== "Other Creatures") {
          return false;
        } else {
          return true;
        }
      case "~ Any Robots ~":
        if (myEnemy === "Bots" || myEnemy === "Cameras" ||
            myEnemy === "Turrets" || myEnemy === "Other Robots") {
          return true;
        } else {
          return false;
        }
      case "~ No Robots ~":
        if (myEnemy !== "Bots" && myEnemy !== "Cameras" &&
            myEnemy !== "Turrets" && myEnemy !== "Other Robots") {
          return false;
        } else {
          return true;
        }
      case "~ Any Miscellaneous ~":
        if (myEnemy === "Monsters" || myEnemy === "Elementals") {
          return true;
        } else {
          return false;
        }
      case "~ No Miscellaneous ~":
        if (myEnemy !== "Monsters" && myEnemy !== "Elementals") {
          return false;
        } else {
          return true;
        }
      default:
        return false;
    }
  }

  // When using the campaign filter,
  // sort FMs chronologically instead of alphabetically.
  function sortCampaigns() {
    let camFMs = [];

    // Create a nested array for all series & campaigns.
    let camArray = [];
    let camIndex = Object.keys(myCampaigns);
    camIndex.forEach((ind) => {
      camArray.push([]);
    });

    // Sort each series/campaign FM into the nested array.
    myFMs.allFMs.forEach((fm) => {
      if (fm.campaign && fm.campaignSort) {
        // The outer index matches the name of the series/campaign.
        // The inner index matches the given order number for that FM.
        camArray[camIndex.findIndex((cam) => cam === fm.campaign)][fm.campaignSort] = fm;
      }
    });

    // Flatten the nested array into the final, sorted array.
    camFMs = camArray.flat();
    return camFMs;
  }

  return (
    <ScrollView>
      <View style={stylesGoTo.buttonPage}>
        <Text style={[stylesTitle.bigTitle(width), {color: colors.text}]}>
          {` THIEF Fan Missions `}
        </Text>

        {/* Series of filters to narrow down long list of FMs. */}
        {/* Section for OR filters (match any selected filters). */}
        <SectionHeader headerName="OR Filters"/>
        <View style={styles.filterFMView}>
          {/* Game filter. */}
          <FilterDropdown
            getFilter={getFilterGame}
            setFilter={setFilterGame}
            data={filterFM.games}
            placeholder="Filter by Game"
            label="Games:"
          />
          {/* Year filter. */}
          <FilterDropdown
            getFilter={getFilterYear}
            setFilter={setFilterYear}
            data={filterFM.years}
            placeholder="Filter by Year"
            label="Years:"
          />
          {/* Author filter. */}
          <FilterDropdown
            getFilter={getFilterAuthor}
            setFilter={setFilterAuthor}
            data={filterFM.authors}
            placeholder="Filter by Author"
            label="Authors:"
          />
          {/* Protagonist filter. */}
          <FilterDropdown
            getFilter={getFilterProtagonist}
            setFilter={setFilterProtagonist}
            data={filterFM.protagonists}
            placeholder="Filter by Protagonist"
            label="Protagonist:"
          />
          {/* Series & campaign filter. */}
          <FilterDropdown
            getFilter={getFilterCampaign}
            setFilter={setFilterCampaign}
            data={filterFM.campaigns}
            placeholder="Filter by Campaign"
            label="Campaigns:"
          />
          {/* Contest filter. */}
          <FilterDropdown
            getFilter={getFilterContest}
            setFilter={setFilterContest}
            data={filterFM.contests}
            placeholder="Filter by Contest"
            label="Contests:"
          />
        </View>
        {/* Section for AND filters (match all selected filters). */}
        <SectionHeader headerName="AND Filters"/>
        <View style={styles.filterFMView}>
          {/* Genre filter. */}
          <FilterDropdown
            getFilter={getFilterGenre}
            setFilter={setFilterGenre}
            data={filterFM.genres}
            placeholder="Filter by Genre"
            label="Genres:"
          />
          {/* Time & weather filter. */}
          <FilterDropdown
            getFilter={getFilterTime}
            setFilter={setFilterTime}
            data={filterFM.times}
            placeholder="Filter by Time/Weather"
            label="Times:"
          />
          {/* Locations filter. */}
          <FilterDropdown
            getFilter={getFilterLocation}
            setFilter={setFilterLocation}
            data={filterFM.locations}
            placeholder="Filter by Location"
            label="Locations:"
          />
          {/* Enemies filter. */}
          <FilterDropdown
            getFilter={getFilterEnemies}
            setFilter={setFilterEnemies}
            data={filterFM.enemies}
            placeholder="Filter by Enemies"
            label="Enemies:"
          />
          {/* Characters filter. */}
          <FilterDropdown
            getFilter={getFilterCharacter}
            setFilter={setFilterCharacter}
            data={filterFM.characters}
            placeholder="Filter by Characters"
            label="Characters:"
          />
          {/* Items filter. */}
          <FilterDropdown
            getFilter={getFilterItem}
            setFilter={setFilterItem}
            data={filterFM.items}
            placeholder="Filter by Items"
            label="Items:"
          />
        </View>

        {/* Map out each entry in FM array. */}
        <SectionHeader headerName="Missions"/>
        <View style={stylesGoTo.buttonView}>
          {/* If not using a campaign filter, sort all FMs alphabetically. */}
          {getFilterCampaign.length === 0 &&
            myFMs.allFMs.map((missKey, missIndex) => (
              // If game filter has one or more games selected,
              // hide this button if this FM's game is not selected.
              ( getFilterGame.length === 0 ||
                ( missKey.game && getFilterGame.includes(myGames[missKey.game]) )
              ) &&
              // If year filter has one or more years selected,
              // hide this button if this FM's year is not selected.
              ( getFilterYear.length === 0 ||
                ( missKey.year && getFilterYear.includes(myYears[missKey.year]) )
              ) &&
              // If author filter has one or more authors selected,
              // hide this button if this FM's author(s) is not selected.
              // Test every selected filter against every entry in the author array.
              ( getFilterAuthor.length === 0 ||
                ( missKey.authors && getFilterAuthor.some(
                  x => missKey.authors.some(y => myAuthors[y] === x)) )
              ) &&
              // If protagonist filter has one or more protagonists selected,
              // hide this button if this FM's protagonist(s) is not selected.
              // Test every selected filter against every entry in the protag array.
              ( getFilterProtagonist.length === 0 ||
                ( missKey.protagonist && getFilterProtagonist.some(
                  x => missKey.protagonist.some(y => myProtagonists[y] === x)) )
              ) &&
              // If contest filter has one or more contests selected,
              // hide this button if this FM's contest is not selected.
              ( getFilterContest.length === 0 ||
                ( missKey.contest && getFilterContest.includes(myContests[missKey.contest]) )
              ) &&
              // If genre filter has one or more genres selected,
              // hide this button if this FM's genre(s) isn't among the selected.
              // Test every selected filter against every entry in the genre array.
              ( getFilterGenre.length === 0 ||
                ( missKey.genres && getFilterGenre.every(
                  x => missKey.genres.some(y => myGenres[y] === x)) )
              ) &&
              // If time/weather filter has one or more times selected,
              // hide this button if this FM's time(s) isn't among the selected.
              // Test every selected filter against every entry in the time array.
              ( getFilterTime.length === 0 ||
                ( missKey.times && getFilterTime.every(
                  x => missKey.times.some(y => myTimes[y] === x)) )
              ) &&
              // If location filter has one or more locations selected,
              // hide this button if this FM's location(s) isn't among the selected.
              // Test every selected filter against every entry in the location array.
              ( getFilterLocation.length === 0 ||
                ( missKey.locations && getFilterLocation.every(
                  x => missKey.locations.some(y => myLocations[y] === x)) )
              ) &&
              // If enemy filter has one or more enemy groups selected,
              // hide this button if this FM's enemies aren't among the selected.
              // Test every selected filter against every entry in the enemy array.
              // Also test against "all/no" enemy groupings.
              ( getFilterEnemies.length === 0 ||
                ( missKey.enemies && getFilterEnemies.every(x =>
                  (x === "~ No Humans ~" || x === "~ No Undead ~" ||
                    x === "~ No Creatures ~" || x === "~ No Robots ~" ||
                    x === "~ No Miscellaneous ~")
                    ? !missKey.enemies.some(y => enemyFilterCheck(x,myEnemies[y]))
                    : missKey.enemies.some(y => enemyFilterCheck(x,myEnemies[y]))
                ) )
              ) &&
              // If character filter has one or more characters selected,
              // hide this button if this FM's characters aren't among the selected.
              // Test every selected filter against every entry in the character array.
              ( getFilterCharacter.length === 0 ||
                ( missKey.characters && getFilterCharacter.every(
                  x => missKey.characters.some(y => myCharacters[y] === x)) )
              ) &&
              // If item filter has one or more items selected,
              // hide this button if this FM's items aren't among the selected.
              // Test every selected filter against every entry in the item array.
              ( getFilterItem.length === 0 ||
                ( missKey.items && getFilterItem.every(
                  x => missKey.items.some(y => myItems[y] === x)) )
              ) &&
                <GoToMission
                  key={`${missKey.id}_${missIndex}`}
                  missionID={missKey.id}
                  missionName={missKey.name}
                  subName={missKey.subName}
                  game={missKey.game}
                  year={missKey.year}
                  authors={missKey.authors}
                  protagonist={missKey.protagonist}
                  contest={missKey.contest}
                  genres={missKey.genres}
                  times={missKey.times}
                  locations={missKey.locations}
                  enemies={missKey.enemies}
                  characters={missKey.characters}
                  items={missKey.items}
                  imgAB={missKey.imgAB}
                  boxSize={missKey.boxSize}
                />
          ))}
          {/* If using a campaign filter, sort all campaign FMs chronologically. */}
          {getFilterCampaign.length > 0 &&
            sortCampaigns().map((missKey, missIndex) => (
              // If game filter has one or more games selected,
              // hide this button if this FM's game is not selected.
              ( getFilterGame.length === 0 ||
                ( missKey.game && getFilterGame.includes(myGames[missKey.game]) )
              ) &&
              // If year filter has one or more years selected,
              // hide this button if this FM's year is not selected.
              ( getFilterYear.length === 0 ||
                ( missKey.year && getFilterYear.includes(myYears[missKey.year]) )
              ) &&
              // If author filter has one or more authors selected,
              // hide this button if this FM's author(s) is not selected.
              // Test every selected filter against every entry in the author array.
              ( getFilterAuthor.length === 0 ||
                ( missKey.authors && getFilterAuthor.some(
                  x => missKey.authors.some(y => myAuthors[y] === x)) )
              ) &&
              // If protagonist filter has one or more protagonists selected,
              // hide this button if this FM's protagonist(s) is not selected.
              // Test every selected filter against every entry in the protag array.
              ( getFilterProtagonist.length === 0 ||
                ( missKey.protagonist && getFilterProtagonist.some(
                  x => missKey.protagonist.some(y => myProtagonists[y] === x)) )
              ) &&
              // If campaign filter has one or more campaigns selected,
              // hide this button if this FM's campaign is not selected.
              // Campaign missions have an extra button to be listed chronologically.
              // Only show the chronological button if the campaign filter is used.
              ( missKey.campaign && getFilterCampaign.includes(myCampaigns[missKey.campaign])
              ) &&
              // If contest filter has one or more contests selected,
              // hide this button if this FM's contest is not selected.
              ( getFilterContest.length === 0 ||
                ( missKey.contest && getFilterContest.includes(myContests[missKey.contest]) )
              ) &&
              // If genre filter has one or more genres selected,
              // hide this button if this FM's genre(s) is not selected.
              // Test every selected filter against every entry in the genre array.
              ( getFilterGenre.length === 0 ||
                ( missKey.genres && getFilterGenre.every(
                  x => missKey.genres.some(y => myGenres[y] === x)) )
              ) &&
              // If time/weather filter has one or more times selected,
              // hide this button if this FM's time(s) isn't among the selected.
              // Test every selected filter against every entry in the time array.
              ( getFilterTime.length === 0 ||
                ( missKey.times && getFilterTime.every(
                  x => missKey.times.some(y => myTimes[y] === x)) )
              ) &&
              // If location filter has one or more locations selected,
              // hide this button if this FM's location(s) is not selected.
              // Test every selected filter against every entry in the location array.
              ( getFilterLocation.length === 0 ||
                ( missKey.locations && getFilterLocation.every(
                  x => missKey.locations.some(y => myLocations[y] === x)) )
              ) &&
              // If enemy filter has one or more enemy groups selected,
              // hide this button if this FM's enemies are not selected.
              // Test every selected filter against every entry in the enemy array.
              // Also test against "all/no" enemy groupings.
              ( getFilterEnemies.length === 0 ||
                ( missKey.enemies && getFilterEnemies.every(x =>
                  (x === "~ No Humans ~" || x === "~ No Undead ~" ||
                    x === "~ No Creatures ~" || x === "~ No Robots ~" ||
                    x === "~ No Miscellaneous ~")
                    ? !missKey.enemies.some(y => enemyFilterCheck(x,myEnemies[y]))
                    : missKey.enemies.some(y => enemyFilterCheck(x,myEnemies[y]))
                ) )
              ) &&
              // If character filter has one or more characters/items selected,
              // hide this button if this FM's characters/items aren't among the selected.
              // Test every selected filter against every entry in the character array.
              ( getFilterCharacter.length === 0 ||
                ( missKey.characters && getFilterCharacter.every(
                  x => missKey.characters.some(y => myCharacters[y] === x)) )
              ) &&
              // If item filter has one or more items selected,
              // hide this button if this FM's items aren't among the selected.
              // Test every selected filter against every entry in the item array.
              ( getFilterItem.length === 0 ||
                ( missKey.items && getFilterItem.every(
                  x => missKey.items.some(y => myItems[y] === x)) )
              ) &&
                <GoToMission
                  key={`${missKey.id}_${missIndex}`}
                  missionID={missKey.id}
                  missionName={missKey.name}
                  subName={missKey.subName}
                  game={missKey.game}
                  year={missKey.year}
                  authors={missKey.authors}
                  protagonist={missKey.protagonist}
                  campaign={missKey.campaign}
                  contest={missKey.contest}
                  genres={missKey.genres}
                  times={missKey.times}
                  locations={missKey.locations}
                  enemies={missKey.enemies}
                  characters={missKey.characters}
                  items={missKey.items}
                  imgAB={missKey.imgAB}
                  boxSize={missKey.boxSize}
                />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

// Define various styles here.
const styles = StyleSheet.create({
  filterFMView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    //alignContent: 'space-around',
    justifyContent: 'center',
  },
});
