const userService = require("../services/userService");
const { catchAsync } = require("../utils/error");
const { raiseCustomError } = require("../utils/error");

const signIn = catchAsync(async (req, res) => {
  const { code } = req.query;
  if (!code) raiseCustomError("KEY_ERROR", 401);

  const data = await userService.getKakaoAccessToken(code);
  const kakaoAccessToken = data["access_token"];
  const kakaoUserInfo = await userService.getKakaoUserInfo(kakaoAccessToken);
  const kakaoId = kakaoUserInfo["id"];
  const name = kakaoUserInfo.properties["nickname"];
  const email = kakaoUserInfo["kakao_account"]["email"];

  const userInfo = await userService.getUserByKaKaoId(kakaoId, name, email);

  return res.status(200).json(userInfo);
});

module.exports = {
  signIn,
};
