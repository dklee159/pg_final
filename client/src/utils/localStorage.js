export const addUserToLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};

export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem("user");
  const user = result ? JSON.parse(result) : null;
  return user;
};

export const addPlayerToLocalStorage = (player) => {
  localStorage.setItem("player", JSON.stringify(player));
};

export const removePlayerFromLocalStorage = () => {
  localStorage.setItem("player", JSON.stringify({}));
};

export const getPlayerFromLocalStorage = () => {
  const result = localStorage.getItem("player");
  const player = result ? JSON.parse(result) : null;
  return player;
};

export const addQuizNumToLocalStorage = (num) => {
  localStorage.setItem("quizNum", JSON.stringify(num));
};
