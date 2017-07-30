const UserReducer = (state = { isLoggedIn: false }, action) => {
  switch (action.type) {
    case "USER_SET": {
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
    case "USER_REMOVE": {
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

/**
 * Stores user information.
 * 
 * @export
 * @param {string} token
 * @param {string} email
 * @param {string} name
 * @param {string} photo
 * @returns {Object} Action
 */
export function setUser(token, email, name, photo) {
  return {
    type: "USER_SET",
    payload: {
      token,
      email,
      name,
      photo
    }
  };
}

/**
 * Removes user infromation.
 * 
 * @export
 * @returns {Object} Action
 */
export function removeUser() {
  return {
    type: "USER_REMOVE"
  };
}
