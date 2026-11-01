// Checks and cleans the contact form data. The server is the source of truth:
// the React form repeats these rules only to give faster feedback.
// (If you change a limit here, change CONTACT_LIMITS in client/src/data/content.js too.)

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const asTrimmedString = (value) => (typeof value === 'string' ? value.trim() : '');

export function validateContact(body) {
  const source = body && typeof body === 'object' ? body : {};

  const name = asTrimmedString(source.name);
  const email = asTrimmedString(source.email);
  const message = asTrimmedString(source.message);

  // "website" is a hidden field humans never see. Bots fill every field, so
  // if it has anything in it we treat the request as spam.
  const spam = asTrimmedString(source.website) !== '';

  const errors = {};
  if (name.length < 2 || name.length > 80 || /[\r\n]/.test(name)) {
    errors.name = 'Please enter your name (2 to 80 characters).';
  }
  if (email.length > 254 || !EMAIL.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (message.length < 10 || message.length > 2000) {
    errors.message = 'Please write a message between 10 and 2000 characters.';
  }

  return { ok: Object.keys(errors).length === 0, errors, data: { name, email, message }, spam };
}
