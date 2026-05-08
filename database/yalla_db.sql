-- YALLA Morocco Travel Portal - Complete Database Schema and Data
-- Created for: yalla_db

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

-- --------------------------------------------------------
-- Database: yalla_db
-- --------------------------------------------------------
CREATE DATABASE IF NOT EXISTS `yalla_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `yalla_db`;

-- --------------------------------------------------------
-- Table structure for table `users`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `avatar` text DEFAULT NULL,
  `language` varchar(10) DEFAULT 'en',
  `nationality` varchar(50) DEFAULT NULL,
  `passport_number` varchar(50) DEFAULT NULL,
  `currency` varchar(10) DEFAULT 'MAD',
  `join_date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for table `destinations`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `destinations` (
  `id` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `tagline` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `full_description` text DEFAULT NULL,
  `theme` varchar(50) DEFAULT NULL,
  `weather` varchar(50) DEFAULT NULL,
  `budget` varchar(50) DEFAULT NULL,
  `popularity` int(11) DEFAULT 0,
  `temp` varchar(10) DEFAULT NULL,
  `vibe` varchar(50) DEFAULT NULL,
  `best_time` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for table `restaurants`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `restaurants` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `city_id` varchar(50) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `type` varchar(100) DEFAULT NULL,
  `price` varchar(10) DEFAULT NULL,
  `rating` decimal(3,1) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `city_id` (`city_id`),
  CONSTRAINT `restaurants_ibfk_1` FOREIGN KEY (`city_id`) REFERENCES `destinations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for table `accommodations`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `accommodations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `city_id` varchar(50) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `type` varchar(100) DEFAULT NULL,
  `price` varchar(10) DEFAULT NULL,
  `rating` decimal(3,1) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `city_id` (`city_id`),
  CONSTRAINT `accommodations_ibfk_1` FOREIGN KEY (`city_id`) REFERENCES `destinations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for table `activities`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `activities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `city_id` varchar(50) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `price` varchar(50) DEFAULT NULL,
  `icon` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `city_id` (`city_id`),
  CONSTRAINT `activities_ibfk_1` FOREIGN KEY (`city_id`) REFERENCES `destinations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for table `wishlist`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `wishlist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `item_id` varchar(50) DEFAULT NULL,
  `item_type` enum('destination','restaurant','accommodation','activity') NOT NULL,
  `added_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `wishlist_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Data Insertion
-- --------------------------------------------------------

-- Insert Destinations
INSERT INTO `destinations` (`id`, `name`, `tagline`, `image`, `description`, `full_description`, `theme`, `weather`, `budget`, `popularity`, `temp`, `vibe`, `best_time`) VALUES
('marrakech', 'Marrakech', 'The Red City', 'marrakech.png', 'A vibrant oasis of culture, history, and sensory experiences defined by ancient medinas and luxury riads.', 'Marrakech is a former imperial city in western Morocco and is a major economic center and home to mosques, palaces and gardens. The medina is a densely packed, walled medieval city dating to the Berber Empire, with mazelike alleys where thriving souks sell traditional textiles, pottery and jewelry.', 'cultural', 'sunny', 'premium', 10, '28°C', 'Vibrant', 'March - May'),
('chefchaouen', 'Chefchaouen', 'The Blue Pearl', 'chefchaouen.png', 'Wander through the ethereal blue labyrinth of the Rif Mountains\' most picturesque sanctuary.', 'Chefchaouen, or Chaouen, is a city in the Rif Mountains of northwest Morocco. It\'s known for the striking, blue-washed buildings of its old town. Leather and weaving workshops line its steep cobbled lanes.', 'mountains', 'mild', 'standard', 9, '22°C', 'Peaceful', 'April - June'),
('fes', 'Fes', 'The Spiritual Heart', 'fes.png', 'Step into the world\'s largest living medieval city and discover centuries of artisan legacy.', 'Fes is a northeastern Moroccan city often referred to as the country\'s cultural capital. It\'s primarily known for its Fes El Bali walled medina, with medieval Marinid architecture, vibrant souks and old-world atmosphere.', 'cultural', 'sunny', 'economy', 9, '25°C', 'Authentic', 'Sept - Nov'),
('casablanca', 'Casablanca', 'Atlantic Modernity', 'casablanca.png', 'A metropolitan fusion of Art Deco elegance and contemporary Moroccan ambition on the coast.', 'Casablanca is a port city and commercial hub in western Morocco, fronting the Atlantic Ocean. The city\'s French colonial legacy is seen in its Mauresque architecture, a blend of Moorish style and European art deco.', 'urban', 'mild', 'premium', 7, '23°C', 'Modern', 'April - Oct'),
('merzouga', 'Merzouga', 'Golden Sands', 'merzouga.png', 'Experience the silence of the Sahara under a canopy of stars amid towering golden dunes.', 'Merzouga is a small Moroccan town in the Sahara Desert, near the Algerian border. It\'s known as a gateway to Erg Chebbi, a huge expanse of sand dunes north of town. Camel treks venture into the dunes.', 'desert', 'extreme', 'standard', 8, '32°C', 'Adventurous', 'Oct - March'),
('tangier', 'Tangier', 'Gateway to Europe', 'tangier.png', 'The legendary port of spies and poets, where the Mediterranean meets the Atlantic breeze.', 'Tangier is a Moroccan port on the Strait of Gibraltar. It has been a strategic gateway between Africa and Europe since Phoenician times. Its whitewashed hillside medina is home to the Dar el Makhzen palace.', 'urban', 'mild', 'standard', 8, '21°C', 'Eclectic', 'May - Sept'),
('essaouira', 'Essaouira', 'Windy City', 'essaouira.png', 'A fortified seaport where art, music, and the Atlantic wind create a unique bohemian rhythm.', 'Essaouira is a port city and resort on Morocco\'s Atlantic coast. Its medina (old town) is protected by 18th-century seafront ramparts called the Skala de la Ville, designed by European engineers.', 'beach', 'mild', 'economy', 8, '20°C', 'Bohemian', 'March - Nov'),
('dakhla', 'Dakhla', 'Desert Meets Sea', 'dakhla.png', 'A paradise for kitesurfers where the Sahara sands dive into the turquoise Atlantic lagoon.', 'Dakhla is a city in Western Sahara, administered by Morocco. Built on a narrow Atlantic peninsula, it is a world-class destination for water sports and desert exploration.', 'beach', 'sunny', 'premium', 6, '24°C', 'Sporty', 'Dec - March'),
('agadir', 'Agadir', 'Sun, Sand, and Sea', 'agadir.png', 'A modern coastal city known for its beautiful wide beaches, golf courses, and year-round sunshine.', 'Agadir is a major city on the shore of the Atlantic Ocean near the foot of the Atlas Mountains. Rebuilt after a 1960 earthquake, it features wide avenues, modern hotels, and vibrant cafes.', 'beach', 'sunny', 'standard', 8, '26°C', 'Relaxing', 'All Year'),
('rabat', 'Rabat', 'The Imperial Capital', 'rabat.png', 'The elegant capital of Morocco, combining historical monuments with modern palm-lined boulevards.', 'Rabat is Morocco\'s capital city along the Bouregreg River and the Atlantic Ocean. Known for Islamic and colonial heritage including the Kasbah of the Udayas and the iconic Hassan Tower.', 'urban', 'mild', 'standard', 7, '22°C', 'Elegant', 'April - Nov'),
('ouarzazate', 'Ouarzazate', 'The Door of the Desert', 'ouarzazate.jpg', 'A cinematic gateway to the Sahara, famous for its majestic kasbahs and Hollywood film studios.', 'Ouarzazate is south of Morocco\'s High Atlas mountains. The Taourirt Kasbah and the nearby Aït Benhaddou feature stunning mud-brick architecture that has served as backdrop for many Hollywood blockbusters.', 'mountains', 'extreme', 'economy', 6, '30°C', 'Cinematic', 'Oct - May'),
('ifrane', 'Ifrane', 'Little Switzerland', 'ifrane.jpg', 'An alpine-style mountain resort town with pristine cedar forests, fresh air, and winter snow.', 'Ifrane is in Morocco\'s Middle Atlas region. Its alpine-style architecture and nearby ski slopes were built by the French during the protectorate era. Snow-covered in winter, and blooming in spring.', 'mountains', 'mild', 'premium', 6, '15°C', 'Charming', 'Dec - April'),
('meknes', 'Meknes', 'The Versailles of Morocco', 'meknes.jpg', 'A quieter imperial city with stunning grand gates, palaces, and the nearby Roman ruins of Volubilis.', 'Meknes is one of the four Imperial cities of Morocco. It became the capital under Sultan Moulay Ismaïl, who built impressive palaces, grand gates, and massive walls rivaling Versailles.', 'cultural', 'mild', 'economy', 5, '24°C', 'Historic', 'April - Sept'),
('el_jadida', 'El Jadida', 'Portuguese Heritage', 'el_jadida.jpg', 'A charming port city and UNESCO site known for its Portuguese citadel and underground cistern.', 'El Jadida, previously Mazagan, is a port city on Morocco\'s Atlantic coast. The fortified city built by the Portuguese in the early 16th century is a UNESCO World Heritage Site.', 'beach', 'mild', 'standard', 5, '21°C', 'Tranquil', 'May - Oct'),
('asilah', 'Asilah', 'The Artistic Haven', 'asilah.jpg', 'A whitewashed seaside town famous for its annual art festival and beautifully painted medina walls.', 'Asilah is a fortified town on Morocco\'s Atlantic coast. Its old medina is enclosed by 15th-century Portuguese ramparts. It is an art hub known for its annual arts festival and colorful murals.', 'beach', 'mild', 'economy', 6, '20°C', 'Artistic', 'May - Aug'),
('taroudant', 'Taroudant', 'Grandmother of Marrakech', 'taroudant.jpg', 'A market town with magnificent red-earth walls nestled against the high Atlas mountain backdrop.', 'Taroudant is in the Souss Valley. Known as the "Grandmother of Marrakech" for its surrounding ramparts, it is known for local crafts including jewelry and carpets.', 'cultural', 'sunny', 'standard', 4, '29°C', 'Authentic', 'Oct - March'),
('skoura', 'Skoura', 'The Palm Grove Oasis', 'skoura.jpg', 'A breathtaking palm grove oasis dotted with ancient kasbahs rising from the desert valley.', 'Skoura is a small oasis town in southern Morocco, near Ouarzazate. It is famous for its dense palm grove and the remarkable Amridil Kasbah, one of the finest examples of southern Moroccan architecture.', 'desert', 'extreme', 'economy', 5, '31°C', 'Serene', 'Nov - March'),
('beni_mellal', 'Beni Mellal', 'Gate of the Atlas', 'beni_mellal.jpg', 'A green and lush gateway to the Middle Atlas with beautiful waterfalls and a historic kasbah.', 'Beni Mellal is a major city in central Morocco at the foot of the Middle Atlas. Known for its fertile agricultural lands, the Aïn Asserdoun springs, and the historic Kasbah Ras el-Ain overlooking the city.', 'mountains', 'mild', 'economy', 4, '23°C', 'Lush', 'April - Oct'),
('nador', 'Nador', 'Gateway to the Mediterranean', 'nador.jpg', 'A vibrant northeastern port city and beautiful lagoon gateway between Morocco and Europe.', 'Nador is a northeastern Moroccan city on the Mediterranean coast near the Spanish enclave of Melilla. It is known for its natural lagoon, Mar Chica, offering beautiful scenery and water sports.', 'beach', 'sunny', 'standard', 5, '25°C', 'Coastal', 'June - Sept'),
('al_hoceima', 'Al Hoceima', 'Pearl of the Rif', 'al_hoceima.jpg', 'A stunning Mediterranean coastal gem with crystalline waters and dramatic cliff scenery.', 'Al Hoceima is a city on Morocco\'s northern Mediterranean coast, surrounded by the Rif Mountains. It is known for its crystal-clear turquoise waters, beautiful beaches, and the al-Hoceima National Park.', 'beach', 'sunny', 'economy', 6, '26°C', 'Wild', 'June - Sept'),
('laayoune', 'Laayoune', 'The Saharan City', 'laayoune.jpg', 'The largest city in the Western Sahara, a modern administrative hub on the edge of the desert.', 'Laayoune is the largest city in Western Sahara, administered by Morocco. It is a modern city built in the Sahara Desert, featuring wide boulevards, mosques, and a rich Sahrawi cultural heritage.', 'desert', 'extreme', 'economy', 3, '26°C', 'Remote', 'Nov - March'),
('guelmim', 'Guelmim', 'Gateway to the Sahara', 'guelmim.jpg', 'Known as the gateway to the Sahara, famous for its lively camel market and desert landscapes.', 'Guelmim is a city in southwestern Morocco. Known historically as the "Gateway to the Sahara," it is famous for its weekly camel market — one of the most important in the region — and its position between the Anti-Atlas and the Sahara.', 'desert', 'extreme', 'economy', 4, '30°C', 'Traditional', 'Oct - April'),
('tiznit', 'Tiznit', 'Silver City', 'tiznit.jpg', 'A walled southern town renowned for its exquisite traditional jewelry and vibrant medina.', 'Tiznit is a small city in southwestern Morocco, known as the Silver City for its artisan jewelry, especially traditional Berber silver. The medina is encircled by long red-earth ramparts and is a hub for silversmith workshops.', 'cultural', 'sunny', 'economy', 4, '27°C', 'Artisan', 'Oct - April');

-- Insert Restaurants
INSERT INTO `restaurants` (`city_id`, `name`, `type`, `price`, `rating`, `image`) VALUES
('marrakech', 'Nomad', 'Modern Moroccan', '$$', 4.8, 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=200'),
('marrakech', 'Le Jardin', 'Traditional', '$$$', 4.7, 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200'),
('chefchaouen', 'Aladdin', 'Rooftop View', '$$', 4.6, 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=200'),
('chefchaouen', 'Casa Hassan', 'Traditional', '$$', 4.5, 'https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?w=200'),
('fes', 'Cafe Clock', 'Vibrant Culture', '$$', 4.6, 'restaurant.png');

-- Insert Accommodations
INSERT INTO `accommodations` (`city_id`, `name`, `type`, `price`, `rating`, `image`) VALUES
('marrakech', 'Riad Kniza', 'Luxury Riad', '$$$$', 4.9, 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=200'),
('marrakech', 'Selman Marrakech', 'Palace', '$$$$$', 5.0, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200'),
('chefchaouen', 'Lina Ryad & Spa', 'Boutique', '$$$', 4.8, 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=200'),
('chefchaouen', 'Riad Cherifa', 'Traditional', '$$', 4.7, 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=200'),
('fes', 'Royal Mansour Fes', 'Palatial', '$$$$$', 4.9, 'riad.png');

-- Insert Activities
INSERT INTO `activities` (`city_id`, `name`, `price`, `icon`) VALUES
('marrakech', 'Hot Air Balloon', '$200', '🎈'),
('marrakech', 'Medina Food Tour', '$45', '🍲'),
('marrakech', 'Majorelle Garden', '$15', '🌵'),
('chefchaouen', 'Rif Mountains Hike', '$30', '⛰️'),
('chefchaouen', 'Spanish Mosque Sunset', 'Free', '🌅'),
('fes', 'Medina Walking Tour', '$20', '🚶'),
('fes', 'Cooking Class', '$40', '🍳');
