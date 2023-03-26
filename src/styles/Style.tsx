import  { StylesConfig } from "react-select";
export const buttonStyle="bg-main-bg p-2 px-5 rounded-sm text-white text-sm font-medium hover:bg-main-bg/90"
export const inputStyle=""

export const customStyles: StylesConfig = {
    control: (base, state) => ({
      ...base,
      background: "#fff",
      borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
      borderColor: state.isFocused ? "#d1d5db" : "#d1d5db",
      color: "#1f2937",
      padding: 2,
      fontWeight: "500",
    }),
    menu: (base) => ({
      ...base,
      color: "#1f2937",
      fontWeight: "500",
    }),
    menuList: (base, state) => ({
      ...base,
      background: "#fff",
      color: "#1f2937",
      fontWeight: "500",
    }),
    option: (base, state) => ({
      ...base,
      background: "white",
      color: "#1f2937",
      fontWeight: "500",
    }),
    singleValue: (base, state) => ({
      ...base,
      color: "#1f2937",
    }),
    input: (base, state) => ({
      ...base,
      border: "none",
      outline: "none",
      fontWeight: "500",
    }),
  };