import React from "react";
import Board from "./components/Board";
import useDocumentTitle from "components/useDocumentTitle/useDocumentTitle";

function TrelloPage() {
  useDocumentTitle("داشبورد");
  return <Board />;
}

export default TrelloPage;
