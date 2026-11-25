-- Profile pictures are stored as data URLs, which do not fit in TEXT (64 KB)
USE `yalla_db`;
ALTER TABLE `users` MODIFY `avatar` mediumtext DEFAULT NULL;
