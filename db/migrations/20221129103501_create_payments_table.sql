-- migrate:up
CREATE TABLE payments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  payment_key VARCHAR(200) NOT NULL,
  order_id INT NOT NULL,
  status VARCHAR(100) NOT NULL,
  code VARCHAR(100) NOT NULL,
  pg_message VARCHAR(100) NOT NULL,
  method VARCHAR(100) NOT NULL,
  pg_response_status_code VARCHAR(100) NOT NULL,
  pg_response TEXT NOT NULL,
  approved_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  requested_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT payments_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT payments_order_id_fkey FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- migrate:down
DROP TABLE payments;
