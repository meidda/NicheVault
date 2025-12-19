# How to Add a Custom Domain (Niche Vault)

Since this is a **Next.js** application, the easiest and most recommended way to go live with a custom domain is via **Vercel**.

## Step 1: Buy Your Domain
If you haven't already, purchase your domain (e.g., `nichevault.com`) from a registrar like **Namecheap**, **GoDaddy**, or directly through **Vercel**.

## Step 2: Deploy to Vercel
1.  Go to [Vercel.com](https://vercel.com) and sign up/login.
2.  Click **"Add New..."** -> **"Project"**.
3.  Import your GitHub repository (`youtubeniches`).
4.  **Environment Variables**: In the configuration step, copy-paste your `.env` values (DATABASE_URL, NEXTAUTH_SECRET, etc.).
5.  Click **Deploy**.

## Step 3: Add Domain in Vercel
1.  Once deployed, go to the **Project Dashboard**.
2.  Click **Settings** -> **Domains**.
3.  Enter your domain (e.g., `nichevault.com`) and click **Add**.
4.  Vercel will give you input on how to configure your DNS.
    *   **Recommended**: It will ask you to add an **A Record** (76.76.21.21) and a **CNAME** (cname.vercel-dns.com) to your domain registrar.

## Step 4: Configure DNS (at your Registrar)
1.  Log in to where you bought your domain (Namecheap/GoDaddy).
2.  Find **DNS Management** or **Advanced DNS**.
3.  **Add A Record**:
    *   Host: `@`
    *   Value: `76.76.21.21`
4.  **Add CNAME Record**:
    *   Host: `www`
    *   Value: `cname.vercel-dns.com`
5.  Save changes. It may take up to 24 hours to propagate (usually happens in minutes).

## Step 5: Update Your Environment Variables
Once your domain is active (e.g., `https://nichevault.com`), you need to tell your app about it.

1.  Go back to **Vercel Settings** -> **Environment Variables**.
2.  Edit `NEXTAUTH_URL`:
    *   **Old**: `http://localhost:3000`
    *   **New**: `https://nichevault.com`
3.  **Redeploy** your project for changes to take effect (Go to Deployments -> click the 3 dots on the latest one -> Redeploy).

## Troubleshooting
*   **Google Auth Error**: If you use Google/GitHub login, go to the **Google Cloud Console** -> **Credentials** and add `https://nichevault.com` and `https://nichevault.com/api/auth/callback/google` to the **Authorized Redirect URIs**.
*   **Stripe**: Update your webhook endpoints in the Stripe Dashboard to the new domain.
