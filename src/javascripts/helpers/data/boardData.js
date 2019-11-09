import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getBoardData = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json?orderBy="uid"&equalTo="${userId}"`)
    .then((response) => {
      const demBoards = response.data;
      const boards = [];
      Object.keys(demBoards).forEach((fbId) => {
        demBoards[fbId].id = fbId;
        boards.push(demBoards[fbId]);
      });
      resolve(boards);
    })
    .catch((error) => reject(error));
});

const deleteBoard = (boardId) => axios.delete(`${baseUrl}/boards/${boardId}.json`);

export default { getBoardData, deleteBoard };
