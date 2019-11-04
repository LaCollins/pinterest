import firebase from 'firebase/app';
import 'firebase/auth';
import uidData from './uidData';
import boardData from './boardData';
import pinData from './pinData';


const getCompleteBoards = () => new Promise((resolve, reject) => {
  const getCurrentUid = firebase.auth().currentUser.uid;
  uidData.getUidData(getCurrentUid)
    .then((singleUser) => {
      boardData.getBoardData(singleUser[0].id).then((boards) => {
        const newBoard = [];
        boards.forEach((x) => {
          pinData.getPinData(x.id).then((pins) => {
            newBoard.push(pins);
            console.log(newBoard);
            resolve(newBoard);
          });
        });
      });
    })
    .catch((error) => reject(error));
});

export default { getCompleteBoards };
