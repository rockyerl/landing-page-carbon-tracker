import { Suspense } from "react";
import KYCPage from "@/components/kyc";

export default function Page() {
    return (
        <Suspense>
            <KYCPage />
        </Suspense>
    );
}