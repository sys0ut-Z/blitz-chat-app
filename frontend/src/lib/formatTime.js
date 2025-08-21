export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    // second: "2-digit"
  })
}

// OR

// export const formatTime = (date) => {
//   date.toString().replace("T", " ").split(".")[0]
// }