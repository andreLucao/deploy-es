-- CreateTable
CREATE TABLE "public"."ad_product" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "credit_type" TEXT NOT NULL,
    "certification_type" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "image_url" TEXT,
    "supply" INTEGER NOT NULL,
    "batch_discount" DOUBLE PRECISION NOT NULL,
    "size_batch" INTEGER NOT NULL,
    "verified_stamp" BOOLEAN NOT NULL,
    "active" BOOLEAN NOT NULL,
    "company_id" TEXT NOT NULL,

    CONSTRAINT "ad_product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."comments" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ad_product_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ad_product_title_key" ON "public"."ad_product"("title");

-- AddForeignKey
ALTER TABLE "public"."ad_product" ADD CONSTRAINT "ad_product_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."comments" ADD CONSTRAINT "comments_ad_product_id_fkey" FOREIGN KEY ("ad_product_id") REFERENCES "public"."ad_product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."comments" ADD CONSTRAINT "comments_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
