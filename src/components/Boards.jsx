import React, { useEffect, useRef, useState } from "react";
import http from "../axios";

function Boards() {
  const [boards, setBoards] = useState([]);
  const [loader, setLoader] = useState(true);
  const nameRef = useRef();
  const descriptionRef = useRef();
  const colorRef = useRef();

  useEffect(() => {
    boardss();
  }, []);

  const boardss = () => {
    setLoader(true);
    http
      .get("/api/boards")
      .then((response) => {
        if (response.status === 200) {
          setBoards(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const createBoard = (event) => {
    event.preventDefault();
    const board = {
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      color: colorRef.current.value || undefined,
    };

    setLoader(true);
    http
      .post("/api/boards", board)
      .then((response) => {
        if (response.status === 201) {
          boardss();
          nameRef.current.value = "";
          descriptionRef.current.value = "";
          colorRef.current.value = "";
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  return (
    <div>
      <form
        onSubmit={createBoard}
        className="w-1/3 flex flex-col p-5 gap-4 mt-4 mx-auto border rounded-lg"
      >
        <input
          className="border rounded-lg p-3"
          ref={nameRef}
          type="text"
          placeholder="Enter board name..."
          required
        />
        <input
          className="border rounded-lg p-3"
          ref={descriptionRef}
          type="text"
          placeholder="Enter board description..."
        />
        <input
          className="border rounded-lg p-3"
          ref={colorRef}
          type="text"
          placeholder="Enter board color (optional)..."
        />
        <button
          disabled={loader}
          className="bg-green-600 p-3 rounded-lg text-white hover:bg-green-700 transition-all duration-500"
        >
          {loader ? "LOADING..." : "CREATE BOARD"}
        </button>
      </form>
      <div className="wrapper">
        {loader ? (
          <div className="text-center">Loading...</div>
        ) : (
          <ul className="list-disc pl-5">
            {boards.map((board) => (
              <li key={board.id} className="mb-2">
                <h3>{board.name}</h3>
                <p>{board.description}</p>
                <h3>{board.color}</h3>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Boards;
