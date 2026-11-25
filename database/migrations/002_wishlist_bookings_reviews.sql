-- Run on a database created before this change (new installs use yalla_db.sql)
USE `yalla_db`;

-- Wishlist: any item type (e.g. World Cup packages) and the details shown on the wishlist page
DELETE FROM `wishlist` WHERE `user_id` IS NULL OR `item_id` IS NULL;
ALTER TABLE `wishlist`
  MODIFY `user_id` int(11) NOT NULL,
  MODIFY `item_id` varchar(50) NOT NULL,
  MODIFY `item_type` varchar(30) NOT NULL,
  ADD COLUMN `name` varchar(150) DEFAULT NULL AFTER `item_type`,
  ADD COLUMN `image` varchar(500) DEFAULT NULL AFTER `name`,
  ADD COLUMN `city` varchar(100) DEFAULT NULL AFTER `image`,
  ADD COLUMN `price` varchar(50) DEFAULT NULL AFTER `city`,
  ADD COLUMN `category` varchar(50) DEFAULT NULL AFTER `price`,
  ADD UNIQUE KEY `user_item` (`user_id`, `item_type`, `item_id`);

CREATE TABLE IF NOT EXISTS `bookings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `type` enum('worldcup','guide','activity','transport') NOT NULL,
  `title` varchar(200) NOT NULL,
  `city` varchar(100) DEFAULT NULL,
  `trip_date` date DEFAULT NULL,
  `trip_time` varchar(10) DEFAULT NULL,
  `travelers` int(11) NOT NULL DEFAULT 1,
  `total_price` varchar(50) DEFAULT NULL,
  `payment_method` varchar(30) DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `status` enum('confirmed','cancelled') NOT NULL DEFAULT 'confirmed',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `reviews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `title` varchar(150) DEFAULT NULL,
  `text` text NOT NULL,
  `rating` tinyint(4) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `reviews_rating` CHECK (`rating` BETWEEN 1 AND 5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
