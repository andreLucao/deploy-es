"use client";

import React, { Suspense } from "react";
import PaymentCancelledContent from "./payment-cancelled-content";

export default function PaymentCancelledPage() {
   return (
      <Suspense fallback={<div>Carregando...</div>}>
         <PaymentCancelledContent />
      </Suspense>
   );
}
