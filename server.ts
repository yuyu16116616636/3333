import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Server-side AI Victory Commentary route using Gemini API
  app.post('/api/victory-commentary', async (req, res) => {
    try {
      const { winner, runnerUp, matchesWon } = req.body;

      if (!winner || !winner.name) {
        return res.status(400).json({ error: 'Winner information required' });
      }

      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
        // Return structured energetic fallback commentary if API key is unconfigured
        return res.json({
          commentary: `🎉 대망의 결승전! 강력한 라이벌 ${runnerUp?.name || '상대'}을(를) 제치고 ${winner.name}이(가) 제1회 포켓몬 16강 월드컵 최종 챔피언에 올랐습니다! ${winner.types?.join(', ')} 타입의 압도적인 매력과 총합 ${winner.stats?.total || 500}에 달하는 강력한 능력치로 최고의 포켓몬 타이틀을 차지했습니다!`,
          title: `전설이 된 챔피언, ${winner.name}!`,
          isAiGenerated: false
        });
      }

      const ai = new GoogleGenAI({ apiKey });

      const prompt = `
당신은 열정적인 포켓몬 리그 전문 아나운서 및 해설자입니다.
포켓몬 16강 이상형 월드컵에서 "${winner.name}"이(가) 최종 우승을 차지했습니다!

우승자 정보:
- 이름: ${winner.name} (${winner.nameEn})
- 분류: ${winner.category}
- 타입: ${winner.types?.join(', ')}
- 총 종족값: ${winner.stats?.total} (체력:${winner.stats?.hp}, 공격:${winner.stats?.attack}, 방어:${winner.stats?.defense}, 특수공격:${winner.stats?.spAtk}, 특수방어:${winner.stats?.spDef}, 스피드:${winner.stats?.speed})
- 준우승 상대: ${runnerUp ? runnerUp.name : '강력한 라이벌'}
- 거친 총 승리 라운드: ${matchesWon || 4}경기 연승

위 정보를 바탕으로 한글로 신나고 드라마틱하며 박진감 넘치는 우승 축하 해설 멘트를 3~4문장으로 작성해주세요! 포켓몬의 기술, 타입, 특징을 재미있게 녹여서 포켓몬 팬들이 환호할 만한 멘트로 작성해 주세요. 또한 어울리는 짧은 챔피언 타이틀 제목도 하나 함께 포함해 주세요.

응답 형식 (JSON):
{
  "title": "한 줄 챔피언 타이틀 (예: 불꽃의 제왕 리자몽, 전설의 왕좌에 오르다!)",
  "commentary": "박진감 넘치는 우승 해설 내용"
}
`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json'
        }
      });

      const responseText = response.text || '';
      let parsed = { title: `${winner.name}, 영광의 챔피언!`, commentary: responseText };
      try {
        parsed = JSON.parse(responseText);
      } catch {
        // format fallback
      }

      res.json({
        title: parsed.title,
        commentary: parsed.commentary,
        isAiGenerated: true
      });
    } catch (err) {
      console.error('Gemini Commentary API Error:', err);
      // Fallback response on error
      res.json({
        commentary: `🎉 뜨거운 환호 속에서 ${req.body?.winner?.name || '승자'} 포켓몬이 16강 이상형 월드컵 최고의 챔피언 왕관을 차지했습니다!`,
        title: `최고의 포켓몬, ${req.body?.winner?.name || '승자'}!`,
        isAiGenerated: false
      });
    }
  });

  // Vite middleware in dev or static serve in prod
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
