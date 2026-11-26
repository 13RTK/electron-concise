CREATE TABLE `messages` (
	`id` integer PRIMARY KEY,
	`role` text NOT NULL,
	`content` text NOT NULL,
	CONSTRAINT "role_check" CHECK("role" in ('user', 'assistant'))
);
