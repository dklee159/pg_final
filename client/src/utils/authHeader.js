const authHeader = (thunkAPI) => {
  return {
    headers: {
      authorization: `Bearer ${thunkAPI.getState().admin.admin.token}`,
    },
  };
};

export default authHeader;
