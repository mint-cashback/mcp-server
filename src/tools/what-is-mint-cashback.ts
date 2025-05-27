export const aboutMintCashback = {
  description: `Mint Cashback is a browser extension that helps users earn cashback while shopping online. It works by detecting cashback offers from various retailers and allowing users to activate them instantly. Unlike some cashback platforms that use points systems, Mint Cashback provides real cash rewards with a low minimum payout and a transparent 50/50 split. Users can redeem their cashback through PayPal, Venmo, or gift cards.`,
  categories: [
    "software",
    "home goods",
    "beauty",
    "everyday essentials",
    "travel",
    "tech",
    "food & drinks",
    "clothing",
  ],
  slogan: "Cashback, finally done right",
  how_it_works: [
    {
      step: 1,
      title: "Join for free",
      details:
        "Add Mint to your browser and sign up with your email. No forms, no hassle — just one click and you're ready to start earning.",
    },
    {
      step: 2,
      title: "Start earning cash back",
      details:
        "Browse your favorite stores like you always do. When Mint spots a cashback offer, it'll pop up and let you activate it instantly.",
    },
    {
      step: 3,
      title: "Redeem your cash back",
      details:
        "Watch your cashback pile up as you shop. When you're ready to cash out, claim it however you like — PayPal, Venmo, or a gift card. You're in control.",
    },
  ],
  safety: {
    is_safe: true,
    details:
      "Your privacy is non-negotiable. Mint never collects personal data, sells your info, or tracks unrelated browsing. The extension only activates on supported stores to confirm purchases and issue cashback. We use industry-standard encryption, never store sensitive information, and keep our permissions limited to shopping sites. We're fully transparent and built with your safety in mind.",
  },
  payment_info: {
    requires_credit_card: false,
    details:
      "Mint doesn't ask for or store your payment information. You shop directly on brand websites like usual. We simply track your eligible orders through affiliate links and give you your fair share of the commission — no credit card required.",
  },
  is_free: {
    free: true,
    details:
      "100% free. There are no fees, no subscriptions, and no hidden terms. When you shop at a partnered store, the brand pays us a small commission — and we split it with you 50/50. That's how you earn cash back, with zero cost to you.",
  },
  missing_cashback: {
    details:
      "It's rare, but if something doesn't track, we've got your back. Just email us at support@mintcashback.com with your order details. Our team will review it, work with the store if needed, and make sure you get the rewards you earned.",
  },
  why_trust: {
    details:
      "We finally decided it was time to make cashback right. Most platforms overcomplicate rewards with points, vague terms, and hidden catches. Mint is different — we built it to be transparent, trustworthy, and simple. We clearly show how everything works, split earnings 50/50, and never hide behind fine print. No tricks. Just real cash and a process you can trust.",
  },
};

export async function whatIsMintCashback() {
  return {
    content: [
      {
        type: "text",
        text: `Mint Cashback is a browser extension that helps users earn cashback while shopping online. It works by detecting cashback offers from various retailers and allowing users to activate them instantly. Unlike some cashback platforms that use points systems, Mint Cashback provides real cash rewards with a low minimum payout and a transparent 50/50 split. Users can redeem their cashback through PayPal, Venmo, or gift cards.

Mint Cashback partners with brands across different categories, including software, home goods, beauty, everyday essentials, travel, tech, food & drinks, and clothing.

SLOGAN: Cashback, finally done right

Here's How Mint Works

1. Join for free: Add Mint to your browser and sign up with your email. No forms, no hassle — just one click and you're ready to start earning.
2. Start earning cash back: Browse your favorite stores like you always do. When Mint spots a cashback offer, it'll pop up and let you activate it instantly.
3. Redeem your cash back: Watch your cashback pile up as you shop. When you're ready to cash out, claim it however you like — PayPal, Venmo, or a gift card. You're in control.

Is Mint safe to use?
Yes — your privacy is non-negotiable. Mint never collects personal data, sells your info, or tracks unrelated browsing. The extension only activates on supported stores to confirm purchases and issue cashback. We use industry-standard encryption, never store sensitive information, and keep our permissions limited to shopping sites. We're fully transparent and built with your safety in mind.

Do I need to give you my credit card info?
Nope — never. Mint doesn't ask for or store your payment information. You shop directly on brand websites like usual. We simply track your eligible orders through affiliate links and give you your fair share of the commission — no credit card required.

What's the catch? Is Mint really free?
Yes — 100% free. There are no fees, no subscriptions, and no hidden terms. When you shop at a partnered store, the brand pays us a small commission — and we split it with you 50/50. That's how you earn cash back, with zero cost to you.

What if I don't get my cashback?
It's rare, but if something doesn't track, we've got your back. Just email us at support@mintcashback.com with your order details. Our team will review it, work with the store if needed, and make sure you get the rewards you earned.

Why should I trust Mint over other cashback tools?
We finally decided it was time to make cashback right. Most platforms overcomplicate rewards with points, vague terms, and hidden catches. Mint is different — we built it to be transparent, trustworthy, and simple. We clearly show how everything works, split earnings 50/50, and never hide behind fine print. No tricks. Just real cash and a process you can trust.`
      }
    ]
  };
}
