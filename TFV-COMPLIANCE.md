# Toll-Free SMS Verification — Compliance Pack

Everything needed to submit `conroetreeco.com` for toll-free messaging
verification through HighLevel, and the site changes that back it up.

**No one can guarantee approval.** Verification is a human review at the
carrier (Somos / the aggregator), and reviewers reject for judgment calls
as well as rules. What this pack does is close every documented rejection
reason that is under our control. The Twilio/carrier rejection codes are
cited inline so each item can be traced back to the rule it satisfies.

---

## 1. What is already done (in this repo)

| Item | Where | Rejection code it closes |
|---|---|---|
| Public Privacy Policy | `/privacy-policy/` | 30519 |
| Explicit "opt-in data is never shared" language | Privacy §3, T&C §13.9 | 30520, 30521 |
| Public SMS Terms & Conditions | `/terms-and-conditions/#sms-terms` | 30522 |
| Both policy links in the sitewide footer | `src/components/Footer.astro` | 30493 |
| Consent stated as optional, not required to buy | T&C §13.2, Privacy §3 | 30505 |
| HELP / STOP keywords documented | T&C §13.6, §13.7 | 30486 |
| "Carriers are not liable for delayed or undelivered messages" | T&C §13.8 | — (CTIA 5.1) |
| Message frequency + "message and data rates may apply" | T&C §13.4, §13.5 | — (CTIA 5.1) |
| Sample messages matching the use case | T&C §13.3 | 30499 |

The **exact sentences** carrier reviewers search for are these two, and they
appear on both pages:

> No mobile information will be shared with third parties or affiliates for
> marketing or promotional purposes. Text messaging originator opt-in data
> and consent will not be shared with any third parties.

Do not reword them. Do not add any clause anywhere on the site that says
personal data may be sold, rented, traded, or shared with marketing
partners — a single such sentence fails the review (30520).

---

## 2. BLOCKERS — the site will be rejected until these are fixed

These are not policy problems. They are on the live site right now and a
reviewer opens the live site.

### 2.1 ~~The site shows no phone number~~ — RESOLVED (code 30492, 30473)

`src/config/business.ts` now carries a real number, and every call button,
the header, the footer NAP, and the LocalBusiness schema pick it up from
that one field:

```
phone: '+19169942497'
phoneDisplay: '(916) 994-2497'
```

All 191 `tel:` links across the 34 built pages resolve to it, and no
`[PENDING]` placeholder renders anywhere on the site.

**One thing to sanity-check before submitting: 916 is a Sacramento,
California area code.** This is a Conroe, Texas business, the config was
written expecting a 936 number, and the site, the GBP, and the schema all
claim Montgomery County. That mismatch is not itself a listed rejection
code, but reviewers do compare the number against the stated business
location, and a non-local number on a hyper-local service site invites the
"is this business real?" question the whole submission is trying to answer.
It also works against the local-SEO premise of the build. If 916 is a
deliberate tracking or forwarding number, it will probably pass; if a 936
number is available, use that instead.

### 2.2 No business email address anywhere on the site (code 30482)

Carriers reject free webmail (gmail/yahoo/outlook) for the business contact
and expect a domain-matched address. `src/config/business.ts` now has:

```
legal: { email: 'office@conroetreeco.com', … }
```

**Fix:** create that mailbox on the `conroetreeco.com` domain and make sure
it receives mail — opt-out requests and privacy requests are directed there
by both policy pages. Use the same address on the verification form.

### 2.3 The GHL form's own policy links point at example.com (code 30493, 30509)

The embedded quote form (`IOj05Ci2FjifEoSyWk4o`) ends with:

```html
<a href="https://www.example.com">Privacy Policy</a> |
<a href="https://www.example.com">Terms of Service</a>
```

A reviewer clicks these. **Fix in the HighLevel form builder:**

- Privacy Policy → `https://www.conroetreeco.com/privacy-policy/`
- Terms of Service → `https://www.conroetreeco.com/terms-and-conditions/`

### 2.4 The business name is inconsistent (codes 30484, 30506, 30488)

Three different strings are in play:

- Website / GBP brand: **Conroe Tree Co.**
- GHL form consent checkbox: **Conroe Tree Company**
- Registered entity / DBA on file with Texas: **unknown**

Code 30484 rejects when the name does not match the business registration;
30506 rejects when the opt-in does not clearly display the end business.

**Fix:** pick the registered legal name, put it in
`business.legal.legalName` in `src/config/business.ts` (leave `''` only if
the registered name really is "Conroe Tree Co."), and use that same string
on the verification form, in the consent checkbox, and on the policy pages.
If the entity is e.g. "Conroe Tree Co. LLC" trading as "Conroe Tree Co.",
have the DBA/assumed name certificate ready (30488).

### 2.5 Effective date

`business.legal.effectiveDate` is set to `September 2, 2026`. Change it if
you publish later, so the date is not in the future.

---

## 3. Replace the opt-in checkbox text in HighLevel

Current text on the form:

> By checking this box, I consent to receive non-marketing text messages
> from Conroe Tree Company. Message & data rates may apply. Reply STOP to
> opt out.

That is missing HELP, message frequency, the "not a condition of purchase"
statement, and the policy links — all of which reviewers check for.
Replace it with this (keep the two links as real hyperlinks):

> By checking this box, I consent to receive non-marketing text messages
> from Conroe Tree Co. about my estimate, appointment scheduling, and job
> updates at the mobile number provided. Consent is not a condition of
> purchase. Message frequency varies. Message and data rates may apply.
> Reply HELP for help or STOP to opt out at any time. See our
> [Privacy Policy](https://www.conroetreeco.com/privacy-policy/) and
> [SMS Terms](https://www.conroetreeco.com/terms-and-conditions/#sms-terms).

**Two settings on that field must not change:**

- **Leave it unchecked by default.** A pre-checked box is code 30508.
- **Leave it NOT required.** Code 30505 rejects when opt-in is mandatory to
  receive service. The form must still submit for someone who declines.

Because the box is optional, the HighLevel workflow that sends SMS **must
be filtered on that consent field**. Texting a lead who left it unchecked
is the violation the whole rule exists to prevent, and it is what gets a
number's traffic blocked after approval.

---

## 4. Auto-replies to configure in HighLevel

### HELP (required — code 30486 checks for business name and contact)

```
Conroe Tree Co.: For help, call (916) 994-2497 or email office@conroetreeco.com. Msg frequency varies. Msg & data rates may apply. Reply STOP to unsubscribe. Terms: conroetreeco.com/terms-and-conditions
```

### STOP confirmation

```
Conroe Tree Co.: You have been unsubscribed and will receive no further messages from this number. Reply START to resubscribe.
```

### First outbound message to a new opt-in

Every first message must identify the business and carry the opt-out:

```
Conroe Tree Co.: Thanks for your request. We got your details and will confirm a time to look at the tree. Msg & data rates may apply. Reply STOP to opt out, HELP for help.
```

---

## 5. What to put on the verification form

**Use case:** Customer Care (or "Account Notifications" / "Conversational" —
whichever HighLevel offers). Do **not** select Marketing or Promotional.
The opt-in says "non-marketing," and a mismatch between the opt-in wording
and the declared use case is code 30507 / 30498.

**Business name:** the registered legal name from §2.4 — matching the
registration exactly.

**Business website:** `https://www.conroetreeco.com`

**Privacy Policy URL:** `https://www.conroetreeco.com/privacy-policy/`

**Terms & Conditions URL:** `https://www.conroetreeco.com/terms-and-conditions/`

> Both URL fields became mandatory in HighLevel's step 3, and carriers
> reject any new toll-free verification without both links as of
> **September 15, 2026**. Submit with them populated.

**Opt-in type:** Web form + inbound text + verbal.

**Opt-in workflow description** — paste something like this, edited to be
true:

> Customers opt in on the "Get a Free Quote" form at
> https://www.conroetreeco.com/contact/. They enter their name, phone,
> email, and a description of the tree work needed, then must affirmatively
> check a consent box that is unchecked by default and reads: "By checking
> this box, I consent to receive non-marketing text messages from Conroe
> Tree Co. about my estimate, appointment scheduling, and job updates at
> the mobile number provided. Consent is not a condition of purchase.
> Message frequency varies. Message and data rates may apply. Reply HELP
> for help or STOP to opt out at any time." The box is optional and the
> form submits without it; customers who decline are contacted by phone or
> email only. Customers also opt in by texting our published number first,
> or by verbally asking for text updates during a call, which staff record
> in the CRM with the date and time of consent. We do not purchase, rent,
> or import phone lists, and consent is never shared with any third party.

**Sample messages** — use the three in `/terms-and-conditions/#sms-terms`
§13.3. They must describe the same kind of message as the use case.

**Message volume:** give an honest low number (e.g. 50–100/day). Inflated
volume for a local tree service invites scrutiny.

**Evidence to attach:** a screenshot of the quote form showing the
unchecked consent box with its full wording visible, and a screenshot of
the footer showing the Privacy Policy and Terms links.

---

## 6. Pre-submission checklist

- [x] Real phone number in `business.ts` (`phone` + `phoneDisplay`) — **still needs deploying**
- [ ] Confirm the 916 (Sacramento) area code is intentional for a Conroe, TX business
- [ ] `office@conroetreeco.com` mailbox created and receiving
- [ ] `business.legal.legalName` set to the registered entity name
- [ ] `https://www.conroetreeco.com/privacy-policy/` loads publicly, no login
- [ ] `https://www.conroetreeco.com/terms-and-conditions/` loads publicly, no login
- [ ] Footer shows both links on every page
- [ ] GHL form policy links no longer point to example.com
- [ ] GHL consent checkbox text replaced (§3), unchecked, optional
- [ ] GHL SMS workflow filters on the consent field
- [ ] HELP and STOP auto-replies configured (§4)
- [ ] Business name identical across: registration · verification form · website · consent checkbox
- [ ] Use case is Customer Care, not Marketing
- [ ] Screenshots of the form and footer attached
- [ ] Nothing anywhere on the site says data may be sold, rented, or shared with marketing partners

---

## 7. If it still gets rejected

The rejection comes back with a numeric code. Look it up — the code names
the exact defect, and almost all of them are resubmittable within 7 days
before the edit window closes (code 30437). The non-resubmittable ones
(30523, 30524, 30526, 30528, 30529) relate to domain reputation, fraud
flags, and prohibited content, none of which apply to a tree service on its
own clean domain.

Send the code and the reviewer's note and the specific fix is usually a
one-line change to one of the items above.
