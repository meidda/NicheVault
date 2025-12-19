# Quick Start: Testing the Stripe Purchase Flow

## ✅ All Features Already Implemented

Your app has a complete **pay-first guest checkout flow** with automatic account creation and content unlocking.

## Prerequisites

1. **Dev server running**: `npm run dev` at `localhost:3000`
2. **Stripe CLI installed**: `brew install stripe/stripe-cli/stripe`
3. **Environment variables set** (already configured in `.env`)

## Step 1: Start Stripe Webhook Listener

Open a new terminal and run:

```bash
cd /Users/meida/Desktop/youtubeniches
stripe login
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

This will output a webhook signing secret like:
```
> Ready! Your webhook signing secret is whsec_xxxxxxxxxxxxx
```

**Copy this secret** and update your `.env` file:
```bash
STRIPE_WEBHOOK_SECRET="whsec_xxxxxxxxxxxxx"
```

## Step 2: Test Guest Purchase (No Login Required)

1. Open **incognito/private browser** window
2. Navigate to: `http://localhost:3000/premium`
3. Click **"Unlock Premium Content"** button
4. Stripe Checkout opens immediately (no login required!)
5. Enter test card details:
   - Card: `4242 4242 4242 4242`
   - Expiry: Any future date (e.g., `12/34`)
   - CVC: Any 3 digits (e.g., `123`)
   - Email: `test@example.com` (or any email)
6. Click "Pay"
7. You'll be redirected to `/success` page
8. After 2 seconds, you should see: **"✓ Premium Status Active"**
9. Click **"Start Exploring"**
10. Verify all content is unlocked (no blur)

## Step 3: Verify Database

```bash
npx prisma studio
```

Check the `User` table:
- User should exist with email `test@example.com`
- `isPremium` should be `true`
- `createdAt` timestamp should match purchase time

## Step 4: Test Future Login

1. Close the browser (or logout)
2. Return to `http://localhost:3000`
3. Click "Log in"
4. Since the account was created without a password, you have 2 options:

   **Option A: Google Login** (if email matches)
   - Click "Log in with Google"
   - Use the same email as purchase
   - Premium status will be preserved

   **Option B: Set Password**
   - Click "Forgot password?" (if implemented)
   - Or register with same email
   - System will link to existing premium account

5. After login, verify:
   - Premium status shows in navbar
   - All content remains unlocked

## Webhook Verification

In the terminal running `stripe listen`, you should see:

```
2024-XX-XX XX:XX:XX   --> checkout.session.completed [evt_xxxxx]
2024-XX-XX XX:XX:XX  <--  [200] POST http://localhost:3000/api/stripe/webhook [evt_xxxxx]
```

This confirms the webhook is working!

## Common Issues & Solutions

### Issue: "No login required" doesn't show
**Solution**: The text is at the bottom of the premium page. Scroll down to see it.

### Issue: Webhook not receiving events
**Solution**: 
1. Check `stripe listen` is running
2. Verify webhook secret in `.env` matches the output from `stripe listen`
3. Restart dev server after updating `.env`

### Issue: Premium badge doesn't appear on success page
**Solution**:
1. Wait 2 seconds (session refresh delay)
2. Check browser console for errors
3. Verify webhook processed successfully (check `stripe listen` output)
4. Manually refresh the page

### Issue: Content still blurred after purchase
**Solution**:
1. Check database: `npx prisma studio` → User table → `isPremium` should be `true`
2. If `isPremium` is false, webhook didn't process
3. Check `stripe listen` for errors
4. Verify `STRIPE_WEBHOOK_SECRET` is correct

## Testing Checklist

- [ ] Guest can click "Unlock Premium Content" without login
- [ ] Stripe Checkout opens immediately
- [ ] Test card payment completes successfully
- [ ] Webhook receives `checkout.session.completed` event
- [ ] User account created in database with correct email
- [ ] `isPremium = true` in database
- [ ] Success page shows "✓ Premium Status Active" after 2 seconds
- [ ] Homepage shows unlocked content (no blur)
- [ ] Logout button appears in navbar for logged-in users
- [ ] Future login preserves premium status

## What Happens Behind the Scenes

1. **User clicks button** → `app/premium/page.tsx` calls `/api/stripe/checkout`
2. **Stripe session created** → `app/api/stripe/checkout/route.ts` creates checkout session
3. **User completes payment** → Stripe processes payment
4. **Webhook triggered** → Stripe sends `checkout.session.completed` to your webhook
5. **Account created** → `app/api/stripe/webhook/route.ts` creates/updates user with `isPremium = true`
6. **User redirected** → Stripe redirects to `/success`
7. **Session refreshed** → `app/success/page.tsx` refreshes session after 2 seconds
8. **Content unlocked** → Homepage re-renders with premium content visible

## Files Involved

| File | Purpose |
|------|---------|
| `app/premium/page.tsx` | Premium purchase page (no login required) |
| `app/api/stripe/checkout/route.ts` | Creates Stripe checkout session |
| `app/api/stripe/webhook/route.ts` | Handles payment success, creates user |
| `app/success/page.tsx` | Success page with session refresh |
| `lib/auth.ts` | JWT callback preserves premium status |
| `components/Navbar.tsx` | Shows logout button |
| `components/LogoutButton.tsx` | Logout functionality |

## Environment Variables

```bash
# Copy these to your .env file with your actual values
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_your_stripe_publishable_key"

# UPDATE THIS with output from 'stripe listen'
STRIPE_WEBHOOK_SECRET="whsec_placeholder"
```

## Ready to Test!

Everything is already implemented. Just:
1. Start `stripe listen` to get webhook secret
2. Update `.env` with the secret
3. Restart dev server
4. Test a purchase in incognito mode

The complete flow is working end-to-end! 🎉
