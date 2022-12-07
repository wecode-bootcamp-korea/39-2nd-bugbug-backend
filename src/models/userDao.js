const { database } = require("./dataSource");

const createUser = async (kakaoId, name, email, socialType = 1) => {
  const result = await database.query(
    `INSERT INTO 
      users (
        email,
        social_id,
        social_type_id,
        nickname
        )
      VALUES
        (?, ?, ?, ?);`,
    [email, kakaoId, socialType, name]
  );

  return result;
};

const getUserByKaKaoId = async (kakaoId) => {
  const result = await database.query(
    `SELECT
      id
    FROM
      users
    WHERE
      social_id=?;`,
    [kakaoId]
  );

  return result[0];
};

const updateUserInfo = async (kakaoId, name, email) => {
  return await database.query(
    `
        UPDATE users
        SET
            nickname=?,
            email=?
        WHERE social_id=?;`,
    [name, email, kakaoId]
  );
};

const getUserById = async (id) => {
  const result = await database.query(
    `
		SELECT 
			id,
      nickname
		FROM users
		WHERE id=?`,
    [id]
  );

  return result[0];
};

module.exports = {
  createUser,
  getUserByKaKaoId,
  updateUserInfo,
  getUserById,
};
