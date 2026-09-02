"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { SiteConfig, defaultConfig } from "@/lib/siteConfig";

interface ConfigContextValue {
  config: SiteConfig;
  loading: boolean;
  refresh: () => Promise<void>;
}

const ConfigContext = createContext<ConfigContextValue>({
  config: defaultConfig,
  loading: true,
  refresh: async () => {},
});

export function useSiteConfig() {
  return useContext(ConfigContext);
}

export function ConfigProvider({
  children,
  initialConfig,
}: {
  children: ReactNode;
  initialConfig?: SiteConfig;
}) {
  const [config, setConfig] = useState<SiteConfig>(
    initialConfig
      ? { ...defaultConfig, ...initialConfig, sections: { ...defaultConfig.sections, ...initialConfig.sections } }
      : defaultConfig
  );
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      const res = await fetch("/api/admin/config");
      if (res.ok) {
        const data = await res.json();
        setConfig({
          ...defaultConfig,
          ...data,
          sections: { ...defaultConfig.sections, ...(data.sections || {}) },
        });
      }
    } catch (err) {
      console.error("Failed to load site config", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      root.style.setProperty("--primary", config.globalStyles.primaryColor);
      root.style.setProperty("--accent", config.globalStyles.accentColor);
      root.style.setProperty("--radius", config.globalStyles.borderRadius);
    }
  }, [config.globalStyles]);

  return (
    <ConfigContext.Provider value={{ config, loading, refresh }}>
      {children}
    </ConfigContext.Provider>
  );
}
