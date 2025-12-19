# Stripe Webhook Setup Guide

This guide explains how to set up Stripe webhooks for the Premium Purchase flow.

## Overview

The webhook listens for `checkout.session.completed` events and automatically:
- Updates `isPremium = true` for logged-in users
- Creates new user accounts for guest purchases (using email from Stripe)
- Handles both test and production modes

## Development Setup (Local Testing)

### 1. Install Stripe CLI

```bash
brew install stripe/stripe-cli/stripe
```

### 2. Login to Stripe

```bash
stripe login
```

### 3. Forward Webhooks to Local Server

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

This command will output a webhook signing secret like:
```
> Ready! Your webhook signing secret is whsec_xxxxxxxxxxxxx
```

### 4. Update .env

Copy the webhook secret and update your `.env` file:

```bash
STRIPE_WEBHOOK_SECRET="whsec_xxxxxxxxxxxxx"
```

### 5. Test the Webhook

In a new terminal, trigger a test event:

```bash
stripe trigger checkout.session.completed
```

## Production Setup

### 1. Create Webhook Endpoint in Stripe Dashboard

1. Go to [Stripe Dashboard → Developers → Webhooks](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. Enter your production URL: `https://yourdomain.com/api/stripe/webhook`
4. Select events to listen to:
   - `checkout.session.completed`
5. Click "Add endpoint"

### 2. Get Webhook Secret

After creating the endpoint, Stripe will show you the **Signing secret**. Copy it.

### 3. Update Production Environment Variables

Add the webhook secret to your production environment:

```bash
STRIPE_WEBHOOK_SECRET="whsec_xxxxxxxxxxxxx"
```

## Testing the Flow

### Test Mode (Recommended)

1. Use Stripe test mode keys (already configured)
2. Click "Unlock Premium Content"
3. Use test card: `4242 4242 4242 4242`
4. Any future expiry date and any CVC
5. Complete checkout
6. Verify:
   - Webhook receives event (check Stripe Dashboard → Developers → Events)
   - User's `isPremium` is set to `true` in database
   - Success page shows premium status
   - Content is unlocked on homepage

### Verify Database

```bash
npx prisma studio
```

Check the `User` table to confirm `isPremium = true`.

## Webhook Endpoint

**URL**: `/api/stripe/webhook`
**Method**: POST
**Events**: `checkout.session.completed`

### Webhook Logic

```typescript
if (userId) {
  // Logged-in user → Update existing user
  await prisma.user.update({
    where: { id: userId },
    data: { isPremium: true }
  });
} else if (email) {
  // Guest purchase → Create or update by email
  await prisma.user.upsert({
    where: { email },
    update: { isPremium: true },
    create: {
      email,
      name: 'Premium User',
      isPremium: true
    }
  });
}
```

## Troubleshooting

### Webhook Not Receiving Events

1. Check webhook secret is correct in `.env`
2. Verify `stripe listen` is running (dev) or endpoint is configured (prod)
3. Check Stripe Dashboard → Developers → Events for delivery status

### User Not Marked Premium

1. Check webhook logs in terminal
2. Verify database connection
3. Check Stripe Dashboard → Events → View event details

### Session Not Refreshing

The success page automatically refreshes the session after 2 seconds. If premium status doesn't show:
1. Manually refresh the page
2. Check browser console for errors
3. Verify webhook processed successfully

## Security Notes

- Never commit `STRIPE_WEBHOOK_SECRET` to version control
- Use different webhook secrets for development and production
- Stripe CLI automatically validates webhook signatures
- Production webhooks require HTTPS
