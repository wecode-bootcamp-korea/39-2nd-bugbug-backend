const request = require("supertest");
const axios = require("axios");
const { createApp } = require("../app");
const { database } = require("../src/models/dataSource");

jest.mock("axios");

const users = [
  {
    id: 1,
    email: "rlatpgh@naver.com",
    social_id: 1564132,
    social_type_id: 1,
    address: "weqwe",
    created_at: "22.12.2",
    updated_at: "22.12.2",
    nickname: "ghthtp",
  },
  {
    id: 2,
    email: "tjwotjs@naver.com",
    social_id: 12111323,
    social_type_id: 1,
    address: "weqwe",
    created_at: "22.12.2",
    updated_at: "22.12.2",
    nickname: "wotjstjs",
  },
];

describe("Test/ Get Project By Project Id", () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await database.initialize();
    await database
      .createQueryBuilder()
      .insert()
      .into("users")
      .values(users)
      .execute();
  });

  afterAll(async () => {
    await database.query(`TRUNCATE users`);
    await database.destroy();
  });

  it("Success : should return project data with 200 status code when authorization code exists", async () => {
    const token = {
      data: {
        access_token:
          "7X9tBLERTEm8N2ED1h5gndDDS7pA4sgBUgmEzoYHCj10lwAAAYTQeliM",
        token_type: "bearer",
        refresh_token:
          "fdKsUzBORKBu5dpgvrAX3KsHD8Lcp6MEa1FPMfogCj10lwAAAYTQeliL",
        expires_in: 21599,
        scope: "account_email profile_image profile_nickname story_permalink",
        refresh_token_expires_in: 5183999,
      },
    };

    const userInfo = {
      data: {
        id: 2554897411,
        connected_at: "2022-11-29T08:00:57Z",
        properties: {
          nickname: "김세호",
          profile_image:
            "http://k.kakaocdn.net/dn/dq2lam/btrQ0HvOklm/C4qYtcgQJnMrJGtmnZT2rk/img_640x640.jpg",
          thumbnail_image:
            "http://k.kakaocdn.net/dn/dq2lam/btrQ0HvOklm/C4qYtcgQJnMrJGtmnZT2rk/img_110x110.jpg",
        },
        kakao_account: {
          profile_nickname_needs_agreement: false,
          profile_image_needs_agreement: false,
          profile: {
            nickname: "김세호",
            thumbnail_image_url:
              "http://k.kakaocdn.net/dn/dq2lam/btrQ0HvOklm/C4qYtcgQJnMrJGtmnZT2rk/img_110x110.jpg",
            profile_image_url:
              "http://k.kakaocdn.net/dn/dq2lam/btrQ0HvOklm/C4qYtcgQJnMrJGtmnZT2rk/img_640x640.jpg",
            is_default_image: false,
          },
          has_email: true,
          email_needs_agreement: false,
          is_email_valid: true,
          is_email_verified: true,
          email: "pabeba@naver.com",
        },
      },
    };
    await axios.mockResolvedValue(token);
    await axios.mockResolvedValue(userInfo);
    await request(app).get("/user/signin?code=213123").expect(200);
  });

  it("FAIL : should return KEY_ERROR message with 401 status code when code does not exist", async () => {
    await request(app).get("/user/signin").expect(401);
  });
});
