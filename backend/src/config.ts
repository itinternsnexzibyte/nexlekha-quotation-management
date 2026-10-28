import "dotenv/config";
import { z } from "zod";

const schema = z.object({
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(32),
  BOOTSTRAP_TOKEN: z.string().min(24),
  // One address, or several separated by commas (for example the quotation site and a second host).
  FRONTEND_URL: z.string().min(1).default("http://localhost:5174"),
  PORT: z.coerce.number().default(4000),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  COMPANY_CODE: z.string().default("NBS"),
  ENGINEER_CODE: z.string().default("QT"),
  COMPANY_NAME: z.string().default("NEXZIBYTE SOLUTIONS PVT LTD"),
  COMPANY_ADDRESS: z.string().default("Hyderabad, Telangana, India"),
  COMPANY_EMAIL: z.string().email(),
  COMPANY_PHONE: z.string(),
  COMPANY_WEBSITE: z.string(),
  COMPANY_GSTIN: z.string().optional().default(""),
  COMPANY_LOGO_PATH: z.string().default("assets/nexzibyte-logo.png"),
  COMPANY_PROFILE_CARD_PATH: z.string().default("assets/company-profile-card.png"),
  COMPANY_BROCHURE_PATH: z.string().default("assets/company-brochure.png"),
  SIGNATURE_PATH: z.string().default("assets/signature.png"),
  SIGNATORY_NAME: z.string().default("Tejaswini Gangula"),
  SIGNATORY_DESIGNATION: z.string().default("Technical Director & Operations"),
  QUOTATION_USER_CAN_ADD_CUSTOM_ITEMS: z.enum(["true", "false"]).default("true").transform((v) => v === "true"),
  INTEGRATION_API_KEY: z.string().min(24)
});

const parsed = schema.parse(process.env);
const isUrl = (value: string) => { try { new URL(value); return true; } catch { return false; } };
const listed = parsed.FRONTEND_URL.split(",").map((v) => v.trim().replace(/\/+$/, "")).filter(Boolean);
if (!listed.length || !listed.every(isUrl)) throw new Error("FRONTEND_URL must be one or more valid URLs separated by commas");
// While developing, the usual Vite ports are accepted too, so a browser tab on :5173 or :5174 never hits a CORS error.
const devOrigins = parsed.NODE_ENV === "production" ? [] : ["5173", "5174"].flatMap((port) => [`http://localhost:${port}`, `http://127.0.0.1:${port}`]);

export const config = { ...parsed, FRONTEND_URL: listed[0]! };
export const allowedOrigins = [...new Set([...listed, ...devOrigins])];
