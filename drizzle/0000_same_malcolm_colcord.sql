-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "budget" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "budget_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"budgetTotal" numeric(10, 2) NOT NULL,
	"owner" varchar NOT NULL,
	"days" integer NOT NULL,
	"leftOverTotal" numeric(10, 2) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "expense" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "expense_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"transactionType" varchar NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"notes" text,
	"owner" varchar NOT NULL,
	"createdAt" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE "income" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "income_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"source" varchar NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"owner" varchar NOT NULL
);

*/