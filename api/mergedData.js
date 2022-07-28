import { deleteSingleTeam, getSingleTeam, getTeamPlayers } from './teamsData';
import { deleteSinglePlayer, getSinglePlayer } from './playerData';

const viewPlayerDetails = (playerFirebaseKey) => new Promise((resolve, reject) => {
  getSinglePlayer(playerFirebaseKey)
    .then((playerObject) => {
      getSingleTeam(playerObject.firebaseKey)
        .then((teamObject) => {
          resolve({ teamObject, ...playerObject });
        });
    }).catch((error) => reject(error));
});

const viewTeamDetails = (teamFirebaseKey) => new Promise((resolve, reject) => {
  getSingleTeam(teamFirebaseKey)
    .then((teamObject) => {
      getTeamPlayers(teamObject.firebaseKey)
        .then((teamPlayersArray) => {
          resolve({ players: teamPlayersArray, ...teamObject });
        });
    }).catch((error) => reject(error));
});

const deleteTeamPlayers = (teamId) => new Promise((resolve, reject) => {
  getTeamPlayers(teamId).then((playersArray) => {
    const deletePlayerPromises = playersArray.map((player) => deleteSinglePlayer(player.firebaseKey));

    Promise.all(deletePlayerPromises).then(() => {
      deleteSingleTeam(teamId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export { viewPlayerDetails, viewTeamDetails, deleteTeamPlayers };
