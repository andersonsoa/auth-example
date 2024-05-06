CREATE TABLE `password_reset_token` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`token` text NOT NULL,
	`expires` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `two_factor_confirmation` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`user_id` text
);
--> statement-breakpoint
CREATE TABLE `two_factor_token` (
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
CREATE UNIQUE INDEX `verification_token_email_token_unique` ON `verification_token` (`email`,`token`);