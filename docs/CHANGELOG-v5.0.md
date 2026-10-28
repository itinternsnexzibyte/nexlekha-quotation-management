# v5.0
- **NexLekha branding** on the platform (sign-in, sidebar, header, browser tab). Generated quotation PDFs keep the NexziByte letterhead.
- **Platform switch** on the sign-in page (see PLATFORM-SWITCH.md).
- **Signature** of the authorised signatory is printed above the company signature line in every quotation PDF and in the on-screen document editor (`backend/assets/signature.png`, path `SIGNATURE_PATH`).
- **"Others" product option** in the quotation line items: name, description, package size, UOM, MOQ, GST, highlights, specifications and picture. Appears on the PDF (including the specification page). Administrators can tick "save to catalogue". `QUOTATION_USER_CAN_ADD_CUSTOM_ITEMS=false` limits it to administrators.
- **Numbering fixes:** revision numbers no longer chain (`…/0001-R1-R2`), a quotation that already has a newer revision cannot be revised again, simultaneous saves retry instead of failing, and the default quotation date uses the user's local date (it was the UTC date, i.e. yesterday in India before 5:30 am).
- Upgrade: `cd backend && npx prisma generate && npx prisma db push`, rebuild, restart.

## v5.1 - CORS fix
- Error: "Access-Control-Allow-Origin header has a value 'http://localhost:5174' that is not equal to the supplied origin 'http://localhost:5173'". The frontend was served on :5173 but `FRONTEND_URL` in `backend/.env` said :5174.
- The frontend now always starts on **5174** (`strictPort`, so it never silently moves to another port).
- `FRONTEND_URL` may list several addresses separated by commas. In development, `http://localhost` / `http://127.0.0.1` on ports 5173 and 5174 are accepted automatically. In production only the listed addresses are accepted.
- The backend prints the allowed origins at startup.
- `frontend/.env.example` added (`VITE_API_URL`, `VITE_SALES_APP_URL`).
