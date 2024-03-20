CREATE TABLE `verification_token` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`email` text,
	`token` text,
	`expires` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `verification_token_token_unique` ON `verification_token` (`token`);