import { CONTACT_LIMITS as L } from '../data/content';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Quick checks in the browser so people get feedback instantly.
// The server runs the same checks again (never trust the browser alone).
export function validateContactForm({ name, email, message }) {
  const errors = {};
  const n = name.trim();
  const e = email.trim();
  const m = message.trim();

  if (n.length < L.nameMin || n.length > L.nameMax) errors.name = 'Please enter your name.';
  if (e.length > 254 || !EMAIL.test(e)) errors.email = 'Please enter a valid email address.';
  if (m.length < L.messageMin) errors.message = `Please write at least ${L.messageMin} characters.`;
  else if (m.length > L.messageMax) errors.message = `Please keep it under ${L.messageMax} characters.`;

  return errors;
}

// If the React site and the Node server are on different domains, set VITE_API_URL
// (for example https://my-api.onrender.com) when you build. Otherwise leave it empty.
const API = import.meta.env.VITE_API_URL || '';

export async function sendContact(values) {
  let res;
  try {
    res = await fetch(`${API}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
  } catch {
    throw new Error('network'); // offline, or the server is down
  }

  let data = {};
  try {
    data = await res.json();
  } catch {
    // Not JSON (for example a static host answering with an HTML 404 page).
  }

  if (!res.ok) {
    const err = new Error(data.error || 'request-failed');
    err.status = res.status;
    err.fields = data.fields;
    throw err;
  }
  return data;
}
