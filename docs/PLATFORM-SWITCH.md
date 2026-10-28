# Switching between Sales (NexVridhi) and Quotation (NexLekha)

Both sign-in pages show a sliding toggle: **Sales Management | Quotation Management**.
Clicking the other side opens the other platform. The two platforms stay separate products with their own
database, users and passwords; the switch only opens the other web app.

## Configure the addresses
| Where | Variable | Example |
|---|---|---|
| Sales `frontend/.env` | `VITE_QUOTATION_APP_URL` | `http://localhost:5174` or `https://quotes.yourcompany.com` |
| Quotation `frontend/.env` | `VITE_SALES_APP_URL` | `http://localhost:5173` or `https://sales.yourcompany.com` |

If a variable is empty, the switch assumes the other app runs on the same host: sales on port 5173, quotation on 5174.
Variables are read when the frontend is built or started, so restart `npm run dev` / rebuild after changing them.

## Running both on one computer (example)
| | Sales | Quotation |
|---|---|---|
| Frontend | 5173 | 5174 (`vite.config.ts`) |
| Backend | 4000 | 4100 (`PORT` in `backend/.env`; also set `VITE_API_URL=http://localhost:4100/api`) |
| PostgreSQL | 5432 | 5433 (or the same server with another database name) |

Set `FRONTEND_URL` in each backend `.env` to its own frontend address so cookies and CORS work.
