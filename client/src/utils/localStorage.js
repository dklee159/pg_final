export const addAdminToLocalStorage = (admin) => {
  localStorage.setItem("admin", JSON.stringify(admin));
};

export const removeAdminFromLocalStorage = () => {
  localStorage.removeItem("admin");
};

export const getAdminFromLocalStorage = () => {
  const result = localStorage.getItem("admin");
  const admin = result ? JSON.parse(result) : null;
  return admin;
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
