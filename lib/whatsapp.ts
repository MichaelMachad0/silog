function normalizarTelefone(telefone: string): string {
  const digits = telefone.replace(/\D/g, '')
  if (digits.length < 10) return digits
  if (digits.startsWith('55')) return digits
  return `55${digits}`
}

function whatsappHabilitado(): boolean {
  return process.env.WHATSAPP_ENABLED === 'true'
}

function whatsappMock(): boolean {
  return process.env.WHATSAPP_MOCK === 'true'
}

export async function enviarWhatsApp(
  telefone: string,
  texto: string
): Promise<{ ok: boolean; providerId?: string; error?: string }> {
  const to = normalizarTelefone(telefone)

  if (!whatsappHabilitado()) {
    return { ok: false, error: 'WhatsApp desabilitado (WHATSAPP_ENABLED)' }
  }

  if (whatsappMock()) {
    console.info('[WHATSAPP_MOCK]', { to, texto })
    return { ok: true, providerId: `mock-${Date.now()}` }
  }

  const token = process.env.WHATSAPP_TOKEN
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID

  if (!token || !phoneNumberId) {
    return {
      ok: false,
      error: 'WHATSAPP_TOKEN ou WHATSAPP_PHONE_NUMBER_ID não configurados',
    }
  }

  const version = process.env.WHATSAPP_API_VERSION ?? 'v21.0'
  const url = `https://graph.facebook.com/${version}/${phoneNumberId}/messages`

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to,
        type: 'text',
        text: { body: texto },
      }),
    })

    const data = (await res.json()) as {
      messages?: { id: string }[]
      error?: { message: string }
    }

    if (!res.ok) {
      return {
        ok: false,
        error: data.error?.message ?? `HTTP ${res.status}`,
      }
    }

    return { ok: true, providerId: data.messages?.[0]?.id }
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : 'Falha ao enviar mensagem',
    }
  }
}
