export const HandleSeparateThreeDigits = (data?: any | null) => {
  const number = new Intl.NumberFormat("fa-IR", { style: "decimal" }).format(
    data
  );

  return number;
};
