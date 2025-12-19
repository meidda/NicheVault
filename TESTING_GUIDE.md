# Testing Guide: Login & Premium Flow

This guide provides step-by-step instructions to test the complete authentication and premium purchase flow.

## Prerequisites

1. **Dev Server Running**: `npm run dev` on `localhost:3000`
2. **Stripe CLI** (for webhook testing): `stripe listen --forward-to localhost:3000/api/stripe/webhook`
3. **Environment Variables**: All keys configured in `.env`

## Test Scenarios

### Scenario 1: Google OAuth Login → Premium Purchase

**Steps:**
1. Navigate to `http://localhost:3000/premium`
2. You should see "Login to continue" with Google and Email buttons
3. Click "Continue with Google"
4. Complete Google OAuth flow
5. You'll be redirected back to `/premium`
6. Verify you see "Unlock Premium Content" button (not login buttons)
7. Click "Unlock Premium Content"
8. You should be redirected to Stripe Checkout
9. Use test card: `4242 4242 4242 4242`, any future date, any CVC
10. Complete payment
11. Redirected to `/success` page
12. After 2 seconds, session refreshes
13. Click "Start Exploring"
14. Verify all content is unlocked (no blur)

**Expected Results:**
- ✅ Google login works
- ✅ Session persists after login
- ✅ Checkout button appears for logged-in users
- ✅ Stripe checkout opens
- ✅ Webhook updates `isPremium = true`
- ✅ Content unlocks automatically

### Scenario 2: Email/Password Login → Premium Purchase

**Steps:**
1. Navigate to `http://localhost:3000/premium`
2. Click "Login with Email"
3. Enter credentials and login
4. Redirected back to `/premium`
5. Click "Unlock Premium Content"
6. Complete Stripe checkout (test card: `4242 4242 4242 4242`)
7. Verify premium status on success page
8. Return to homepage and verify content is unlocked

**Expected Results:**
- ✅ Email login works
- ✅ Session persists
- ✅ Premium purchase completes
- ✅ Content unlocks

### Scenario 3: Register New User → Premium Purchase

**Steps:**
1. Navigate to `http://localhost:3000/register`
2. Fill in: Name, Email, Password
3. Click "Create Account"
4. Redirected to `/login`
5. Login with new credentials
6. Navigate to `/premium`
7. Click "Unlock Premium Content"
8. Complete Stripe checkout
9. Verify premium status

**Expected Results:**
- ✅ Registration creates user
- ✅ Login works with new account
- ✅ Premium purchase completes
- ✅ User marked as premium

### Scenario 4: Already Premium User

**Steps:**
1. Login as a user who already has `isPremium = true`
2. Navigate to `/premium`
3. You should see "You are already a Premium Member" (green badge)
4. Navigate to homepage
5. All content should be unlocked

**Expected Results:**
- ✅ Shows premium status
- ✅ No checkout button
- ✅ All content visible

## Debugging Checklist

### Login Not Working?
- [ ] Check browser console for errors
- [ ] Verify `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `.env`
- [ ] Check `NEXTAUTH_SECRET` is set
- [ ] Verify `NEXTAUTH_URL` matches your local URL
- [ ] Check Network tab for `/api/auth/session` calls

### Session Not Persisting?
- [ ] Verify `AuthProvider` is wrapping the app in `layout.tsx`
- [ ] Check browser cookies (should see `next-auth.session-token`)
- [ ] Clear browser cache and cookies, try again
- [ ] Check for console errors related to NextAuth

### Checkout Not Opening?
- [ ] Verify user is logged in (check session in React DevTools)
- [ ] Check browser console for fetch errors
- [ ] Verify `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` are set
- [ ] Check Network tab for `/api/stripe/checkout` response

### Premium Not Unlocking After Payment?
- [ ] Verify Stripe webhook is running (`stripe listen`)
- [ ] Check webhook secret matches in `.env`
- [ ] Check Stripe Dashboard → Events for `checkout.session.completed`
- [ ] Verify database: `npx prisma studio` → Check user's `isPremium` field
- [ ] Try manually refreshing the page

## Database Verification

```bash
# Open Prisma Studio
npx prisma studio

# Check Users table
# Verify:
# - User exists with correct email
# - isPremium = true after payment
# - createdAt timestamp is correct
```

## Stripe Webhook Verification

```bash
# Start webhook forwarding
stripe listen --forward-to localhost:3000/api/stripe/webhook

# In another terminal, trigger test event
stripe trigger checkout.session.completed

# Check terminal output for webhook processing
```

## Common Issues & Solutions

### Issue: "Login to continue" shows even after login
**Solution**: 
- Session not updating properly
- Check `useSession()` hook in premium page
- Verify `AuthProvider` is in layout
- Clear browser cache

### Issue: Checkout button doesn't redirect to Stripe
**Solution**:
- Check browser console for errors
- Verify Stripe keys are correct
- Check `/api/stripe/checkout` endpoint is working

### Issue: Premium status not showing after payment
**Solution**:
- Webhook may not be processing
- Check `stripe listen` is running
- Verify webhook secret in `.env`
- Manually update database and refresh page to test

## Success Criteria

All of these should work:
- ✅ Google OAuth login
- ✅ Email/password login  
- ✅ Session persists across page navigation
- ✅ Logged-in users see checkout button
- ✅ Non-logged-in users see login options
- ✅ Stripe checkout opens for logged-in users
- ✅ Payment completes successfully
- ✅ Webhook updates `isPremium = true`
- ✅ Success page shows premium badge
- ✅ Content unlocks on homepage
- ✅ Logout works correctly
