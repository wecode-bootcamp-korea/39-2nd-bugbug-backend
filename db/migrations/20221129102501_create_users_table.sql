-- migrate:up
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(200) NOT NULL,
    social_id BIGINT NOT NULL,
    nickname varchar(100),
    social_type_id INT NOT NULL,
    address VARCHAR(200) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT users_social_type_id_fkey FOREIGN KEY (social_type_id) REFERENCES social_types(id)
);

-- migrate:down
DROP TABLE users;
