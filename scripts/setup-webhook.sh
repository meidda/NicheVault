#!/bin/bash

echo "🔧 Stripe Webhook Setup Script"
echo "================================"
echo ""

# Check if Stripe CLI is installed
if ! command -v stripe &> /dev/null; then
    echo "❌ Stripe CLI not found. Installing..."
    brew install stripe/stripe-cli/stripe
else
    echo "✅ Stripe CLI is installed"
fi

echo ""
echo "📝 Next steps:"
echo ""
echo "1. Run this command in a NEW terminal:"
echo "   stripe login"
echo ""
echo "2. Follow the browser authentication"
echo ""
echo "3. Then run:"
echo "   stripe listen --forward-to localhost:3000/api/stripe/webhook"
echo ""
echo "4. Copy the webhook secret (starts with whsec_)"
echo ""
echo "5. Update .env file:"
echo "   STRIPE_WEBHOOK_SECRET=\"whsec_your_secret_here\""
echo ""
echo "6. Restart dev server (Ctrl+C then npm run dev)"
echo ""
echo "Or run: ./scripts/setup-webhook.sh --auto"
echo ""

if [ "$1" == "--auto" ]; then
    echo "🚀 Starting automatic setup..."
    echo ""
    echo "Step 1: Authenticating with Stripe..."
    stripe login
    
    echo ""
    echo "Step 2: Starting webhook listener..."
    echo "Copy the webhook secret and press Ctrl+C"
    echo ""
    stripe listen --forward-to localhost:3000/api/stripe/webhook --print-secret
fi
