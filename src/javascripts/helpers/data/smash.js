import firebase from 'firebase/app';
import 'firebase/auth';
import uidData from './uidData';
import boardData from './boardData';


const getCompleteBoards = () => new Promise((resolve, reject) => {
  const getCurrentUid = firebase.auth().currentUser.uid;
  uidData.getUidData(getCurrentUid)
    .then((singleUser) => {
      boardData.getBoardData(singleUser[0].id).then((boards) => {
        const newBoard = [];
        boards.forEach((board) => {
          const newB = { ...board };
          newBoard.push(newB);
          resolve(newBoard);
        });
      });
    })
    .catch((error) => reject(error));
});

export default { getCompleteBoards };
