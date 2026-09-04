# Customer Segment Studio Flagship Site v0.3.7

A source-grounded commercial website for the current Customer Segment Studio product.

## Core positioning

**Segmentation made simple. Strategy made visible.**

Turn customer data into an interactive strategy map that shows who matters, what to do next, and where your time and money can create the most value.

## v0.3.7 character-only enrichment

This release keeps the v0.3.4 commercial flow, copy, product screenshots, CTA behavior, and static Vercel deployment unchanged.

The only customer-facing enrichment is the use of the product's source-defined individual character identities:

- a restrained character cast beneath the hero explanation,
- nine compact character tiles in the existing “Nine Groups” area.

The main product is not embedded or modified. The site still uses real product screenshots and links to the current live studio.

## Run locally

```bash
npm run check
npm test
npm run build
npm run dev
```

Open `http://localhost:3000`.

If port 3000 is in use:

```bash
PORT=3001 npm run dev
```

## No API key required

The website is static. Gemini is part of the optional guidance path in the current flagship application, not this marketing site.
