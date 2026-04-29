import { demoTenant, type CompanyWorkspace, type Tenant } from "@/lib/tenant";
import React, { createContext, useContext, useMemo, useState } from "react";

type TenantContextValue = {
  tenant: Tenant;
  activeCompany: CompanyWorkspace;
  companies: CompanyWorkspace[];
  setActiveCompanyId: (companyId: string) => void;
};

const TenantContext = createContext<TenantContextValue | null>(null);

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const [activeCompanyId, setActiveCompanyId] = useState(demoTenant.companies[0].id);

  const value = useMemo(() => {
    const activeCompany =
      demoTenant.companies.find((company) => company.id === activeCompanyId) ?? demoTenant.companies[0];

    return {
      tenant: demoTenant,
      activeCompany,
      companies: demoTenant.companies,
      setActiveCompanyId,
    };
  }, [activeCompanyId]);

  return <TenantContext.Provider value={value}>{children}</TenantContext.Provider>;
}

export function useTenant() {
  const context = useContext(TenantContext);

  if (!context) {
    throw new Error("useTenant must be used inside TenantProvider");
  }

  return context;
}

