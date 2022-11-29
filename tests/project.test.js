const request = require("supertest");

const { createApp } = require("../app");
const { database } = require("../src/models/dataSource");
const { loginRequired } = require("../src/utils/checkUser");
const { upload, uploadFile, unlinkFile } = require("../src/utils/s3");

jest.mock("../src/utils/checkUser", () => ({ loginRequired: jest.fn() }));
jest.mock("../src/utils/s3", () => ({
  upload: jest.fn(),
  uploadFile: jest.fn(),
  unlinkFile: jest.fn(),
}));
jest.mock("multer");

const projects = [
  {
    id: 1,
    user_id: 1,
    type_id: 2,
    name: "키링",
    img_url: "amazon.sdk.jpg",
    summary: "아기자기키링",
    story: "장인의 키링",
    gift: 10000,
    gift_information: "키링3개",
    target_amount: 100000,
    opening: "22-12-10",
    deadline: "22-12-30",
    created_at: "22-12-06",
    updated_at: "22-12-06",
  },
  {
    id: 2,
    user_id: 2,
    type_id: 1,
    name: "손난로",
    img_url: "amazon.hot.jpg",
    summary: "뜨끈한 손난로",
    story: "장인의 손난로",
    gift: 12000,
    gift_information: "손난로20개",
    target_amount: 120000,
    opening: "2022-12-10",
    deadline: "2022-12-30",
    created_at: "22-12-06",
    updated_at: "22-12-06",
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
      .into("projects")
      .values(projects)
      .execute();
  });

  afterAll(async () => {
    await database.query(`TRUNCATE TABLE projects`);
    await database.destroy();
  });

  it("SUCCESS : should respond with a 200 status code when project exists", async () => {
    await request(app).get("/projects/1").expect(200);
  });

  it("FAIL : should return error when project does not exist", async () => {
    await request(app).get("/projects/4").expect(404);
  });

  it("SUCCESS : should respond with a 200 status code when project registers", async () => {
    await loginRequired.mockImplementation((req, res, next) => {
      req.user = { id: 1 };
      next();
    });
    await upload.mockImplementation((req, res, next) => {
      req.file = {
        fieldname: "file",
        originalname: "logo-ver1.png",
        encoding: "7bit",
        mimetype: "image/png",
        destination: "uploads/",
        filename: "9d76ef2652ef6fdfd1b26f7ecfb416aa",
        path: "uploads/9d76ef2652ef6fdfd1b26f7ecfb416aa",
        size: 3370,
      };
      next();
    });
    await uploadFile.mockResolvedValue({
      ETag: '"e64ac6312da5ca49e1ff398c1b1b605e"',
      Location:
        "https://hosose.s3.ap-northeast-1.amazonaws.com/9d76ef2652ef6fdfd1b26f7ecfb416aa",
      key: "9d76ef2652ef6fdfd1b26f7ecfb416aa",
      Key: "9d76ef2652ef6fdfd1b26f7ecfb416aa",
      Bucket: "hosose",
    });
    await unlinkFile.mockResolvedValue("good");
    const projectData = `{"title": "제목", "summary": "내용", "category": "2", "story": "스토리", "price": "10000000", "gift": "200", "gift_information": "설명후원", "date_start": "2022-12-05", "date_end": "2022-12-09", "file": "C:fakepathcharacter2-sche.png"}`;

    await request(app)
      .post("/projects")
      .send({
        targetValue: projectData,
      })
      .expect(201);
  });
});
