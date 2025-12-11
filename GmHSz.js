// ==============================================
// BAKEC AI BACKEND - SUPER SIMPLE VERSION
// ==============================================

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ================= CONFIGURASI =================
// GANTI API_KEY_DISINI dengan API key Google AI Anda!
const API_KEY = 'API_KEY_DISINI'; // ← GANTI INI!

// ================= ENDPOINT UTAMA =================
app.post('/api/chat', async (req, res) => {
    try {
        console.log('📩 Menerima pesan:', req.body.message);
        
        const userMessage = req.body.message;
        
        // Kirim ke Google AI (Gemini)
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`,
            {
                contents: [{
                    parts: [{ text: userMessage }]
                }]
            }
        );
        
        const aiResponse = response.data.candidates[0].content.parts[0].text;
        
        console.log('✅ Respons berhasil');
        
        res.json({
            success: true,
            reply: aiResponse,
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        
        res.json({
            success: false,
            error: error.message,
            reply: "Maaf, sedang ada masalah. Coba lagi nanti ya!"
        });
    }
});

// ================= ENDPOINT TEST =================
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>BAKEC AI Backend</title>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    text-align: center; 
                    padding: 50px; 
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                }
                .container {
                    background: rgba(255,255,255,0.1);
                    padding: 30px;
                    border-radius: 15px;
                    backdrop-filter: blur(10px);
                    max-width: 600px;
                    margin: 0 auto;
                }
                h1 { color: #4cc9f0; }
                .status { 
                    background: #10b981; 
                    padding: 10px 20px; 
                    border-radius: 20px; 
                    display: inline-block;
                    margin: 20px 0;
                }
                .api-url {
                    background: #2d3748;
                    color: #e2e8f0;
                    padding: 15px;
                    border-radius: 8px;
                    font-family: monospace;
                    margin: 20px 0;
                    word-break: break-all;
                }
                .instructions {
                    text-align: left;
                    background: rgba(0,0,0,0.2);
                    padding: 20px;
                    border-radius: 10px;
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>🚀 BAKEC AI BACKEND</h1>
                <div class="status">✅ BACKEND BERJALAN DENGAN BAIK</div>
                
                <h2>📍 Endpoint API:</h2>
                <div class="api-url">POST: ${req.protocol}://${req.get('host')}/api/chat</div>
                
                <div class="instructions">
                    <h3>📋 Cara Pakai:</h3>
                    <ol>
                        <li>Buka file <strong>bakec-admin.html</strong></li>
                        <li>Di form API Configuration, masukkan URL ini:</li>
                        <li><code>${req.protocol}://${req.get('host')}/api/chat</code></li>
                        <li>Klik <strong>Save Configuration</strong></li>
                        <li>Buka <strong>bakec-ai-chat.html</strong></li>
                        <li>Chat dengan AI!</li>
                    </ol>
                    
                    <h3>🔧 Test API:</h3>
                    <p>Copy URL di atas dan test di Postman atau curl:</p>
                    <pre style="background: #2d3748; color: white; padding: 15px; border-radius: 5px;">
{
    "message": "Halo, apa kabar?"
}</pre>
                </div>
            </div>
        </body>
        </html>
    `);
});

// ================= JALANKAN SERVER =================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`=========================================`);
    console.log(`🚀 BAKEC AI BACKEND BERJALAN`);
    console.log(`📍 Port: ${PORT}`);
    console.log(`🔗 Local: http://localhost:${PORT}`);
    console.log(`💡 Ganti API_KEY di baris 10 dengan API key Anda!`);
    console.log(`=========================================`);
});