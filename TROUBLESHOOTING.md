# 🔧 Troubleshooting: Premium Content Not Unlocking

## Problem
After purchasing premium, the content remains blurred/locked.

## Root Cause
The **Stripe webhook is not processing payments** because the webhook secret is still set to the placeholder value.

## Solution

### Step 1: Check Current Status
Visit: **http://localhost:3000/debug**

This diagnostic page will show:
- ✅ or ❌ Webhook configuration status
- Your current session info
- All users in the database
- Environment variable status

### Step 2: Set Up Stripe Webhook

**Terminal 1: Keep dev server running**
```bash
# Already running: npm run dev
```

**Terminal 2: Start Stripe webhook listener**
```bash
cd /Users/meida/Desktop/youtubeniches
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

You'll see output like:
```
> Ready! Your webhook signing secret is whsec_1234567890abcdefghijklmnop
```

**Copy the entire secret** (starts with `whsec_`)

### Step 3: Update Environment Variable

Edit `/Users/meida/Desktop/youtubeniches/.env`:

```bash
# Change this line:
STRIPE_WEBHOOK_SECRET="whsec_placeholder"

# To your actual secret:
STRIPE_WEBHOOK_SECRET="whsec_1234567890abcdefghijklmnop"
```

### Step 4: Restart Dev Server

In Terminal 1 (where npm run dev is running):
1. Press `Ctrl+C` to stop
2. Run `npm run dev` again

### Step 5: Test the Flow

1. **Open incognito browser**
2. Go to: `http://localhost:3000/premium`
3. Click "Unlock Premium Content"
4. Use test card: `4242 4242 4242 4242`
5. Enter any email (e.g., `test@example.com`)
6. Complete payment

### Step 6: Verify Webhook Processing

In Terminal 2 (Stripe listener), you should see:
```
2024-XX-XX XX:XX:XX   --> checkout.session.completed [evt_xxxxx]
2024-XX-XX XX:XX:XX  <--  [200] POST http://localhost:3000/api/stripe/webhook [evt_xxxxx]
```

The `[200]` means success! ✅

### Step 7: Check Results

1. You'll be redirected to `/success` page
2. After 2 seconds, you should see: **"✓ Premium Status Active"**
3. Click "Start Exploring"
4. All content should be unlocked (no blur)

### Step 8: Verify in Database

Visit: **http://localhost:3000/debug**

Check that:
- User exists with your email
- `isPremium` shows ✅

## Why This Happens

The webhook flow:
```
1. User completes Stripe payment
   ↓
2. Stripe sends checkout.session.completed event to your webhook
   ↓
3. Webhook validates event signature using STRIPE_WEBHOOK_SECRET
   ↓
4. If signature is invalid (placeholder secret), webhook rejects event ❌
   ↓
5. User account is NOT created/updated
   ↓
6. isPremium stays false
   ↓
7. Content remains locked
```

With correct webhook secret:
```
1. User completes Stripe payment
   ↓
2. Stripe sends event
   ↓
3. Webhook validates signature ✅
   ↓
4. Creates/updates user with isPremium = true
   ↓
5. Success page refreshes session
   ↓
6. Content unlocks automatically
```

## Quick Checklist

- [ ] Stripe CLI installed (`brew install stripe/stripe-cli/stripe`)
- [ ] `stripe listen` running in separate terminal
- [ ] Webhook secret copied from terminal output
- [ ] `.env` file updated with real secret (not placeholder)
- [ ] Dev server restarted after updating `.env`
- [ ] Test purchase completed
- [ ] Webhook shows `[200]` response in terminal
- [ ] User appears in debug page with isPremium = true
- [ ] Content unlocked on homepage

## Still Not Working?

### Check 1: Webhook Secret Format
Make sure the secret in `.env` is:
```bash
STRIPE_WEBHOOK_SECRET="whsec_..."  # With quotes
```

NOT:
```bash
STRIPE_WEBHOOK_SECRET=whsec_...    # Without quotes (may cause issues)
```

### Check 2: Stripe Listen Running
The `stripe listen` command must stay running. If you close that terminal, webhooks stop working.

### Check 3: Dev Server Restarted
After changing `.env`, you MUST restart the dev server for changes to take effect.

### Check 4: Check Browser Console
Open browser DevTools (F12) → Console tab. Look for errors after payment.

### Check 5: Manual Database Update (Temporary Test)
To test if the unlock logic works, manually update the database:

```bash
npx prisma studio
```

1. Open the `User` table
2. Find your user by email
3. Change `isPremium` to `true`
4. Save
5. Refresh the homepage
6. Content should unlock

If content unlocks after manual update, the issue is definitely the webhook.

## Need More Help?

Visit the diagnostic page: **http://localhost:3000/debug**

It will show exactly what's wrong with your configuration.
