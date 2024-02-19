export const HandleSeparateThreeDigits = (data?: any | null) => {
  const number = new Intl.NumberFormat("fa-IR", { style: "decimal" }).format(
    data
  );

  console.log("number", number);
  return <div>{number}</div>;
};
