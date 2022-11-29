-- migrate:up
CREATE TABLE orders (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id int NOT NULL,
    project_id int NOT NULL,
    status_id int NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT orders_project_id_fkey FOREIGN KEY (project_id) REFERENCES projects(id),
    CONSTRAINT orders_status_id_fkey FOREIGN KEY (status_id) REFERENCES order_status(id)
);

-- migrate:down
DROP TABLE orders;
