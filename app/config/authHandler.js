import AsyncStorage from "@react-native-async-storage/async-storage";

var UserClass = (() => {
  var user = [];
  var getUser = async () => {
    const data = await AsyncStorage.getItem("userClient");
    if (data != null) {
      return JSON.parse(data);
    }
    return user;
  };

  var setUser = (userData) => {
    user = userData;
    AsyncStorage.setItem("userClient", JSON.stringify(userData));
  };

  var isAuthenticated = async () => {
    const data = await AsyncStorage.getItem("userClient");
    if (data != null) {
      return true;
    }
    return false;
  };

  var logout = function () {
    AsyncStorage.removeItem("userClient");
    user = [];
  };

  return {
    getUser,
    setUser,
    isAuthenticated,
    logout,
  };
})();

export default UserClass;
