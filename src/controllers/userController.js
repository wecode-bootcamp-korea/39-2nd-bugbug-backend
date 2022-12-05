const userService = require("../services/userService");
const { catchAsync } = require("../utils/error");
const { raiseCustomError } = require("../utils/error");

const signIn = catchAsync(async (req, res) => {
  const { code } = req.query;
  if (!code) raiseCustomError("KEY_ERROR", 401);

  const data = await userService.getKakaoAccessToken(code);
  const kakaoAccessToken = data.data["access_token"];
  const kakaoUserInfo = await userService.getKakaoUserInfo(kakaoAccessToken);
  const kakaoId = kakaoUserInfo.data["id"];
  const name = kakaoUserInfo.data.properties["nickname"];
  const email = kakaoUserInfo.data["kakao_account"]["email"];

  const userInfo = await userService.getUserByKaKaoId(kakaoId, name, email);

  return res.status(200).json(userInfo);
});

module.exports = {
  signIn,
};
