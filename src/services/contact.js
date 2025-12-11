// Simple contact submission service
// TODO: replace with a real serverless endpoint (Vercel/Firebase Function) that validates, rate-limits, and verifies anti-abuse signals.

export async function submitContact(formData) {
  const payload = {
    name: formData.name?.trim(),
    email: formData.email?.trim(),
    phone: formData.phone?.trim() || '',
    service_interest: formData.service_interest || '',
    message: formData.message?.trim(),
    language: formData.language || 'he',
    timestamp: new Date().toISOString(),
  };

  const headers = {
    'Content-Type': 'application/json'
  };

  const response = await fetch('/api/contact', {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Failed to submit contact form');
  }

  return response.json().catch(() => ({}));
}
