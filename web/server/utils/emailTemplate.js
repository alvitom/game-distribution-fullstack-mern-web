module.exports = (content) => {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                color: #333;
                padding: 20px;
            }
            .container {
                background-color: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                max-width: 600px;
                margin: 0 auto;
            }
            .header {
                text-align: center;
                margin-bottom: 20px;
            }
            .content {
                text-align: center;
            }
            .footer {
                margin-top: 20px;
                text-align: center;
                color: #777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Alvito Game Store</h1>
            </div>
            <div class="content">
                ${content}
            </div>
            <div class="footer">
                <p>Best regards,<br>Alvito Game Store</p>
                <p>&copy; 2024 Alvito Game Store. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
  `;
};
