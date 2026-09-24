const test = require('node:test');
const assert = require('node:assert/strict');
const handler = require('../api/inquiry.js');

async function submit(contact, provider = { ok: true, status: 200, data: { id: 'test-email-id' } }) {
  const previousFetch = global.fetch;
  const previousEnv = { ...process.env };
  let sent;
  const res = {
    setHeader() {},
    status(code) { this.statusCode = code; return this; },
    json(body) { this.body = body; return this; },
  };
  process.env.RESEND_API_KEY = 'test-key';
  process.env.INQUIRY_TO_EMAIL = 'enquiries@cleardessertpack.com';
  process.env.RESEND_EMAIL_DOMAIN = 'cleardessertpack.com';
  global.fetch = async (url, options) => {
    assert.equal(url, 'https://api.resend.com/emails');
    sent = JSON.parse(options.body);
    return { ...provider, json: async () => provider.data };
  };
  try {
    await handler({ method: 'POST', headers: { origin: 'https://www.cleardessertpack.com' }, body: {
      name: 'Routing regression test', contact, to: 'untrusted@example.com',
      message: '<script>unsafe</script>',
    } }, res);
    return { res, sent };
  } finally {
    global.fetch = previousFetch;
    for (const key of ['RESEND_API_KEY', 'INQUIRY_TO_EMAIL', 'RESEND_EMAIL_DOMAIN']) {
      if (previousEnv[key] === undefined) delete process.env[key];
      else process.env[key] = previousEnv[key];
    }
  }
}

test('legacy configuration and form data cannot redirect enquiries away from the sole inbox', async () => {
  const { res, sent } = await submit('buyer@example.com');
  assert.equal(res.statusCode, 200);
  assert.deepEqual(sent.to, ['cleardessertpack@gmail.com']);
  assert.equal(sent.reply_to, 'buyer@example.com');
  assert.ok(!sent.html.includes('<script>'));
});

test('WhatsApp-only enquiries have a safe reply address and follow-up instructions', async () => {
  const { sent } = await submit('+44 7700 900123');
  assert.equal(sent.reply_to, 'cleardessertpack@gmail.com');
  assert.match(sent.text, /No customer email was supplied/);
});

test('mixed email and WhatsApp details preserve the buyer reply address', async () => {
  const { sent } = await submit('Email: buyer@example.com; WhatsApp: +44 7700 900123');
  assert.equal(sent.reply_to, 'buyer@example.com');
});

test('an obsolete company domain address cannot become the reply destination', async () => {
  const { sent } = await submit('enquiries@cleardessertpack.com');
  assert.equal(sent.reply_to, 'cleardessertpack@gmail.com');
});

test('provider rejection never reports success', async () => {
  const { res } = await submit('buyer@example.com', { ok: false, status: 403, data: { message: 'Rejected' } });
  assert.equal(res.statusCode, 502);
  assert.equal(res.body.ok, undefined);
});

test('a provider response without an email ID never reports success', async () => {
  const { res } = await submit('buyer@example.com', { ok: true, status: 200, data: {} });
  assert.equal(res.statusCode, 502);
});
