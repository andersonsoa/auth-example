CREATE TABLE `account` (
	`userId` text NOT NULL,
	`type` text NOT NULL,
	`provider` text NOT NULL,
	`providerAccountId` text NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` integer,
	`token_type` text,
	`scope` text,
	`id_token` text,
	PRIMARY KEY(`provider`, `providerAccountId`),
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `password_reset_token` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`token` text NOT NULL,
	`expires` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `two_factor_confirmation` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`user_id` text,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `two_factor_token` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`token` text NOT NULL,
	`expires` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`name` text,
	`email` text NOT NULL,
	`password` text,
	`emailVerified` integer,
	`roles` text,
	`image` text,
	`is_two_factor_enable` integer
);
--> statement-breakpoint
CREATE TABLE `verification_token` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`token` text NOT NULL,
	`expires` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `password_reset_token_token_unique` ON `password_reset_token` (`token`);--> statement-breakpoint
CREATE UNIQUE INDEX `password_reset_token_email_token_unique` ON `password_reset_token` (`email`,`token`);--> statement-breakpoint
CREATE UNIQUE INDEX `two_factor_confirmation_user_id_unique` ON `two_factor_confirmation` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `two_factor_token_token_unique` ON `two_factor_token` (`token`);--> statement-breakpoint
CREATE UNIQUE INDEX `two_factor_token_email_token_unique` ON `two_factor_token` (`email`,`token`);--> statement-breakpoint
CREATE UNIQUE INDEX `verification_token_token_unique` ON `verification_token` (`token`);--> statement-breakpoint
CREATE UNIQUE INDEX `verification_token_email_token_unique` ON `verification_token` (`email`,`token`);