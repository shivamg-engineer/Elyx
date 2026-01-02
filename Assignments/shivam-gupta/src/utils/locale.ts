export type Lang = "English" | "मराठी";

/**
 * Very small language detection: checks for Devanagari characters (used by Marathi/Hindi).
 * If any Devanagari character is found, returns 'mr', otherwise 'en'.
 */
export function detectLanguageFromName(name?: string): Lang {
  if (!name) return "English";
  const devanagari = /[\u0900-\u097F]/;
  return devanagari.test(name) ? "मराठी" : "English";
}

type TransRecord = Record<string, { English: string; मराठी: string }>;

export const TRANSLATIONS: TransRecord = {
  Dashboard: { English: "Dashboard", मराठी: "डॅशबोर्ड" },
  "Institute Registration": { English: "Institute Registration", मराठी: "संस्थान नोंदणी" },
  Register: { English: "Register", मराठी: "नोंदणी" },
  Profile: { English: "Profile", मराठी: "प्रोफाइल" },
  Verification: { English: "Verification", मराठी: "तपासणी" },
  Application: { English: "Application", मराठी: "अर्ज" },
  Staffing: { English: "Staffing", मराठी: "कर्मचारी" },
  Academics: { English: "Academics", मराठी: "अकॅडेमिक्स" },
  Workload: { English: "Workload", मराठी: "कामाचे प्रमाण" },
  NOC: { English: "NOC", मराठी: "NOC" },
  Assets: { English: "Assets", मराठी: "संपत्ती" },
  "Legal Cases": { English: "Legal Cases", मराठी: "कायदेशीर प्रकरणे" },
  Students: { English: "Students", मराठी: "विद्यार्थी" },
  RTI: { English: "RTI", मराठी: "RTI" },
  Grievance: { English: "Grievance", मराठी: "तक्रार" },
  Reports: { English: "Reports", मराठी: "अहवाल" },
  Settings: { English: "Settings", मराठी: "सेटिंग्ज" },
};

export function getTranslation(key: string, lang: Lang): string {
  const entry = TRANSLATIONS[key];
  if (!entry) return key; // fallback to original
  return entry[lang] || entry.English;
}
