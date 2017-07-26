const UserReducer = (state = { isLoggedIn: false }, action) => {
  switch (action.type) {
    case "SET_USER": {
      state = {
        ...state,
        isLoggedIn: true,
        token: action.payload.token,
        email: action.payload.email,
        name: action.payload.name,
        photo: action.payload.photo
      };
      break;
    }
    case "REMOVE_USER": {
      state = {
        ...state,
        isLoggedIn: false,
        token: undefined,
        email: undefined,
        name: undefined,
        photo: undefined
      };
    }
  }
  return state;
};

export default UserReducer;
