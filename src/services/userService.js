const axios = require("axios");
const qs = require("qs");
const jwt = require("jsonwebtoken");

const userDao = require("../models/userDao");
const { raiseCustomError } = require("../utils/error");

const GRANT_TYPE = process.env.GRANT_TYPE;
const REST_API_KEY = process.env.REST_API_KEY;
const REDIRECT_URI = process.env.REDIRECT_URI;

const getKakaoAccessToken = async (authorizationCode) => {
  const response = await axios({
    method: "post",
    url: "https://kauth.kakao.com/oauth/token",
    headers: {
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    data: qs.stringify({
      grant_type: GRANT_TYPE,
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code: authorizationCode,
    }),
  });
  return response;
};

const getKakaoUserInfo = async (kakaoAccessToken) => {
  return await axios({
    method: "get",
    url: "https://kapi.kakao.com/v2/user/me",
    headers: {
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      Authorization: `Bearer ${kakaoAccessToken}`,
    },
  });
};

const saveUserInfo = async (kakaoId, name, email) => {
  return await userDao.createUser(kakaoId, name, email);
};

const updateUserInfo = async (kakaoId, name, email) => {
  const user = await userDao.getUserByKaKaoId(kakaoId);

  if (!user) raiseCustomError(`USER_DOES_NOT_EXIST`, 401);

  const update = await userDao.updateUserInfo(kakaoId, name, email);
  return update;
};

const getUserByKaKaoId = async (kakaoId, name, email) => {
  let user = await userDao.getUserByKaKaoId(kakaoId);

  if (!user) {
    await saveUserInfo(kakaoId, name, email);
    user = await userDao.getUserByKaKaoId(kakaoId);
  }

  if (user) {
    await updateUserInfo(kakaoId, name, email);
  }

  const userId = user.id;

  const accessToken = jwt.sign({ userId: userId }, process.env.secretKey, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return { accessToken: accessToken };
};

const getUserById = async (id) => {
  return await userDao.getUserById(id);
};

module.exports = {
  getKakaoAccessToken,
  getKakaoUserInfo,
  getUserByKaKaoId,
  getUserById,
};
