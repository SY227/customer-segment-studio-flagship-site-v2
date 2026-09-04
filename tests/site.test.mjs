import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

const html = await fs.readFile(new URL('../public/index.html', import.meta.url), 'utf8');
const js = await fs.readFile(new URL('../public/app.js', import.meta.url), 'utf8');
const css = await fs.readFile(new URL('../public/styles.css', import.meta.url), 'utf8');

test('hero opens directly with tight top spacing and no template navigation', () => {
  assert.doesNotMatch(html, /site-header|site-nav|header-cta|menu-button/);
  assert.match(html, /<main id="main">/);
  assert.match(css, /padding:\s*clamp\(18px, 2vw, 28px\) 0 76px/);
});

test('hero uses the approved flagship positioning', () => {
  assert.match(html, /Segmentation made simple\./);
  assert.match(html, /Strategy made visible\./);
  assert.match(html, /Turn customer data into an interactive strategy map/);
});

test('commercial site has one clear hero CTA and no developer source links', () => {
  assert.match(html, /Try Customer Segment Studio/);
  assert.doesNotMatch(html, /github\.com|GitHub|Inspect the source|Review the current source|View GitHub/i);
});

test('site uses real product screenshots instead of embedding the app', () => {
  assert.doesNotMatch(html, /<iframe|<video|<canvas/i);
  assert.match(html, /living-map-growing-buyers\.webp/);
  assert.match(html + js, /living-map-dormant-vips\.webp/);
  assert.match(html + js, /living-map-occasional-buyers\.webp/);
});

test('product experience uses three focused tabs instead of a long screenshot sequence', () => {
  assert.match(html, /See the field/);
  assert.match(html, /Understand the group/);
  assert.match(html, /Make the move/);
  assert.match(js, /experienceScreens/);
  assert.doesNotMatch(html, /REAL PRODUCT SCREENS|FROM SEGMENTS TO ACTION|NINE CUSTOMER GROUPS|WHAT IS CALCULATED · WHAT IS GUIDANCE/);
});

test('commercial story is shorter and ordered around product, value, trust, action', () => {
  const experience = html.indexOf('THE PRODUCT EXPERIENCE');
  const value = html.indexOf('BUSINESS VALUE');
  const how = html.indexOf('HOW IT WORKS');
  const final = html.indexOf('TRY THE STUDIO');
  assert.ok(experience > 0 && value > experience && how > value && final > how);
});

test('current product claims stay grounded', () => {
  assert.match(html, /CSV or Excel/);
  assert.match(html, /Recency, Frequency, and Monetary/);
  assert.match(html, /nine groups/i);
  assert.match(html, /deterministic/i);
});

test('all nine source-defined customer groups remain represented without a full extra section', () => {
  for (const label of ['Best Customers','Loyal Buyers','New Buyers','At-Risk VIPs','Growing Buyers','Occasional Buyers','Dormant VIPs','Light Repeaters','Inactive Customers']) {
    assert.match(html, new RegExp(label));
  }
  assert.match(html, /group-pills/);
});

test('methodology is available on demand instead of occupying a full standalone section', () => {
  assert.match(html, /<details class="method-details">/);
  assert.match(html, /How the analysis works/);
  assert.match(html, /Guidance, not arithmetic|Guidance/);
});

test('retired prototype language and fake proof are absent', () => {
  assert.doesNotMatch(html, /PlanFox|Segment Command|trusted by|customer logo|testimonial|working product|concept mockup/i);
});

test('experience tab content maps to source guidance', () => {
  assert.match(js, /test low-cost email before offering deeper discounts/);
  assert.match(js, /customer count, revenue share, revenue at stake/i);
  assert.match(js, /Where should we focus first/);
});


test('individual characters enrich the site without changing the product surface', () => {
  assert.match(html, /hero-character-cast/);
  assert.match(html, /group-character-grid/);
  for (const slug of ['best-customers','loyal-buyers','new-buyers','at-risk-vips','growing-buyers','occasional-buyers','dormant-vips','light-repeaters','inactive-customers']) {
    assert.match(html, new RegExp(`assets/characters/tiles/${slug}\.webp`));
  }
  assert.doesNotMatch(html, /<iframe|<video|<canvas/i);
  assert.match(html, /Try Customer Segment Studio/);
});
