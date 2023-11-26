-- CreateTable
CREATE TABLE "mail_tokens" (
    "value" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mail_tokens_pkey" PRIMARY KEY ("value")
);

-- CreateIndex
CREATE UNIQUE INDEX "mail_tokens_user_id_key" ON "mail_tokens"("user_id");

-- AddForeignKey
ALTER TABLE "mail_tokens" ADD CONSTRAINT "mail_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
