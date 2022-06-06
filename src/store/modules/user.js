import { login, logout } from "@/api/userInfo";
import { getToken, setToken } from "@/utils/auth";
import { getuserName, setuserName } from "@/utils/auth";
import { getUnreadMessage } from "@/api/FunctionMenu/Notice/index";

const state = {
  token: getToken(),
  userName: getuserName(),
  UnreadMessage: 0,
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_USERNAME: (state, name) => {
    state.userName = name;
  },
  CHANGE_UNREADMESSAGE: (state, number) => {
    state.UnreadMessage = number;
  },
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      const params = {
        loginName: userInfo.username.trim(),
        password: userInfo.password,
      };
      login(params).then((res) => {
        if (res.code === 200) {
          const { data } = res;
          commit("SET_TOKEN", data.token);
          commit("SET_USERNAME", data.name);
          setToken(data.token);
          setuserName(data.name);
          window.sessionStorage.setItem("userType", data.userType);
          resolve();
        } else {
          console.log(res, "asdasdasd");
          reject(res.data);
        }
      });
    });
  },
  // user logout
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout()
        .then((res) => {
          commit("SET_TOKEN", "");
          resolve(res);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  async changeUnreadMessage({ commit }) {
    const res = await getUnreadMessage();
    const data = res.data;
    commit("CHANGE_UNREADMESSAGE", data);
    return data;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
