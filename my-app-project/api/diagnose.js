// api/diagnose.js - Vercel Serverless Function
// This endpoint proxies OpenAI calls so the API key is not exposed to the client.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { imageUrl } = req.body;
  if (!imageUrl) {
    return res.status(400).json({ error: 'imageUrl is required' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error('OPENAI_API_KEY not set');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const prompt = `다음 이미지에 보이는 과수 잎이나 줄기의 병충해를 진단하고, 간단히 원인과 조치를 알려주세요. 이미지 URL: ${imageUrl}`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.2,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('OpenAI API error', response.status, err);
      return res.status(502).json({ error: 'OpenAI API error' });
    }

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content?.trim() || '진단 결과를 가져올 수 없습니다.';
    return res.status(200).json({ result });
  } catch (e) {
    console.error('Server error', e);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
