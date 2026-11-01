import { useState } from 'react';
import { CONTACT_LIMITS as L, PROFILE } from '../../../data/content';
import { sendContact, validateContactForm } from '../../../utils/contact';
import Button from '../../ui/Button';

const EMPTY = { name: '', email: '', message: '', website: '' }; // "website" is the hidden spam trap

// One label + input + error message.
function Field({ name, label, error, as: Tag = 'input', ...props }) {
  const id = `cf-${name}`;
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <Tag
        id={id}
        name={name}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <p className="field-error" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [formError, setFormError] = useState('');

  function onChange(e) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (status === 'sending') return;

    const found = validateContactForm(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus('sending');
    setFormError('');
    try {
      await sendContact(values);
      setValues(EMPTY);
      setStatus('sent');
    } catch (err) {
      if (err.fields) {
        setErrors(err.fields); // the server found something the browser didn't
        setFormError('Please check the highlighted fields.');
      } else if (err.status === 429) {
        setFormError(err.message); // "Too many messages..."
      } else {
        setFormError("Your message couldn't be sent right now.");
      }
      setStatus('error');
    }
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <Field
        name="name"
        label="Name"
        value={values.name}
        onChange={onChange}
        error={errors.name}
        autoComplete="name"
        maxLength={L.nameMax}
      />
      <Field
        name="email"
        label="Email"
        type="email"
        value={values.email}
        onChange={onChange}
        error={errors.email}
        autoComplete="email"
        maxLength={254}
      />
      <Field
        name="message"
        label="Message"
        as="textarea"
        rows={6}
        value={values.message}
        onChange={onChange}
        error={errors.message}
        maxLength={L.messageMax}
      />

      {/* Spam trap: invisible to people, tempting to bots. If it's filled in, the server ignores the message. */}
      <div className="hp" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={onChange} />
        </label>
      </div>

      <div className="form-foot">
        <Button type="submit" variant="accent" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </Button>

        <p className="form-status" role="status" aria-live="polite">
          {status === 'sent' && 'Thanks! Your message is on its way. I will reply soon.'}
          {status === 'error' && (
            <>
              {formError} You can also{' '}
              <a href={`mailto:${PROFILE.email}`}>email me directly</a>.
            </>
          )}
        </p>
      </div>
    </form>
  );
}
