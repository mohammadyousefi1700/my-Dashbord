import React from "react";
import Board from "./components/Board";
import useDocumentTitle from "components/useDocumentTitle/useDocumentTitle";

function TrelloPage() {
  useDocumentTitle("trello");
  return <Board />;
  // return <div></div>;
}

export default TrelloPage;
