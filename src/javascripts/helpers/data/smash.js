import 'firebase/auth';
import uidData from './uidData';
import boardData from './boardData';


const getCompleteBoards = (uid) => new Promise((resolve, reject) => {
  uidData.getUidData(uid)
    .then((singleUser) => {
      boardData.getBoardData(singleUser[0].id).then((boards) => {
        let newBoard = [];
        if (boards.length > 0) {
          boards.forEach((board) => {
            const newB = { ...board };
            newBoard.push(newB);
          });
        } else {
          newBoard = [];
        }
        resolve(newBoard);
      });
    })
    .catch((error) => reject(error));
});

export default { getCompleteBoards };
