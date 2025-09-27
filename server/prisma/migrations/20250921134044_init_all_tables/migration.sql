-- CreateTable
CREATE TABLE "public"."companies" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."emission_products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "scope" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "emission_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."emission_factors" (
    "id" TEXT NOT NULL,
    "emission_product_id" TEXT NOT NULL,
    "region" TEXT,
    "year" INTEGER,
    "factor_value" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "emission_factors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."emissions" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "emission_product_id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "registered_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "emissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "companies_email_key" ON "public"."companies"("email");

-- CreateIndex
CREATE UNIQUE INDEX "emission_products_name_key" ON "public"."emission_products"("name");

-- CreateIndex
CREATE UNIQUE INDEX "emissions_company_id_emission_product_id_year_key" ON "public"."emissions"("company_id", "emission_product_id", "year");

-- AddForeignKey
ALTER TABLE "public"."emission_factors" ADD CONSTRAINT "emission_factors_emission_product_id_fkey" FOREIGN KEY ("emission_product_id") REFERENCES "public"."emission_products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."emissions" ADD CONSTRAINT "emissions_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."emissions" ADD CONSTRAINT "emissions_emission_product_id_fkey" FOREIGN KEY ("emission_product_id") REFERENCES "public"."emission_products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
