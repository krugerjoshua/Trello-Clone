import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBoard } from "../features/boards/BoardsSlice.js";

const BoardPage = () => {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.boards.currentBoard);

  useEffect(() => {
    dispatch(getBoard(1)); // hardcode first
  }, [dispatch]);

  if (!board) return <div>Loading...</div>;

  return (
    <div>
      <h1>{board.title}</h1>

      <div style={{ display: "flex", gap: "16px" }}>
        {board.lists.map((list) => (
          <div key={list.id}>
            <h3>{list.title}</h3>

            {list.cards.map((card) => (
              <div key={card.id}>{card.title}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardPage;