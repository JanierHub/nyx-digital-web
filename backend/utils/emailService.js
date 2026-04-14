import nodemailer from 'nodemailer';

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send contact email to admin
export const sendContactEmail = async (contactData) => {
  try {
    const transporter = createTransporter();

    const serviceLabels = {
      'web-development': 'Desarrollo Web',
      'mobile-app': 'Aplicación Móvil',
      'ui-ux': 'Diseño UI/UX',
      'consulting': 'Consultoría',
      'other': 'Otro'
    };

    const priorityLabels = {
      'low': 'Baja',
      'medium': 'Media',
      'high': 'Alta'
    };

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
          }
          .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
          }
          .header {
            background: linear-gradient(135deg, #64FFDA, #00E5FF);
            color: #0A192F;
            padding: 20px;
            text-align: center;
            border-radius: 10px 10px 0 0;
            margin: -30px -30px 20px -30px;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
          }
          .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin: 20px 0;
          }
          .info-item {
            padding: 10px;
            background: #f8f9fa;
            border-radius: 5px;
            border-left: 4px solid #64FFDA;
          }
          .info-label {
            font-weight: bold;
            color: #666;
            font-size: 12px;
            text-transform: uppercase;
            margin-bottom: 5px;
          }
          .info-value {
            color: #333;
            font-size: 14px;
          }
          .message-box {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 5px;
            margin: 20px 0;
          }
          .priority-high {
            border-left: 4px solid #e74c3c;
          }
          .priority-medium {
            border-left: 4px solid #f39c12;
          }
          .priority-low {
            border-left: 4px solid #27ae60;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            color: #666;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>ð¦ Nuevo Contacto - Nyx Digital</h1>
          </div>
          
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">Nombre</div>
              <div class="info-value">${contactData.name}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Email</div>
              <div class="info-value">${contactData.email}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Teléfono</div>
              <div class="info-value">${contactData.phone || 'No proporcionado'}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Empresa</div>
              <div class="info-value">${contactData.company || 'No proporcionado'}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Servicio</div>
              <div class="info-value">${serviceLabels[contactData.service] || contactData.service}</div>
            </div>
            <div class="info-item priority-${contactData.priority}">
              <div class="info-label">Prioridad</div>
              <div class="info-value">${priorityLabels[contactData.priority]}</div>
            </div>
          </div>

          ${contactData.budget ? `
          <div class="info-item">
            <div class="info-label">Presupuesto</div>
            <div class="info-value">${contactData.budget}</div>
          </div>
          ` : ''}

          ${contactData.timeline ? `
          <div class="info-item">
            <div class="info-label">Plazo</div>
            <div class="info-value">${contactData.timeline}</div>
          </div>
          ` : ''}

          <div class="message-box">
            <div class="info-label">Mensaje</div>
            <div class="info-value">${contactData.message}</div>
          </div>

          <div class="footer">
            <p>Este mensaje fue enviado desde el formulario de contacto de Nyx Digital</p>
            <p>Fecha: ${new Date().toLocaleString('es-ES')}</p>
            <p>IP: ${contactData.ip || 'No disponible'}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: process.env.EMAIL_FROM || `"Nyx Digital" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `Nuevo Contacto - ${contactData.name} - ${serviceLabels[contactData.service]}`,
      html: htmlContent,
      replyTo: contactData.email
    };

    await transporter.sendMail(mailOptions);
    console.log('Contact email sent successfully to admin');

  } catch (error) {
    console.error('Error sending contact email:', error);
    throw error;
  }
};

// Send confirmation email to client
export const sendConfirmationEmail = async (contactData) => {
  try {
    const transporter = createTransporter();

    const serviceLabels = {
      'web-development': 'Desarrollo Web',
      'mobile-app': 'Aplicación Móvil',
      'ui-ux': 'Diseño UI/UX',
      'consulting': 'Consultoría',
      'other': 'Otro'
    };

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
          }
          .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
          }
          .header {
            background: linear-gradient(135deg, #64FFDA, #00E5FF);
            color: #0A192F;
            padding: 20px;
            text-align: center;
            border-radius: 10px 10px 0 0;
            margin: -30px -30px 20px -30px;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
          }
          .welcome-message {
            font-size: 18px;
            color: #333;
            margin-bottom: 20px;
          }
          .service-info {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 5px;
            margin: 20px 0;
            border-left: 4px solid #64FFDA;
          }
          .next-steps {
            background: #e8f4f8;
            padding: 20px;
            border-radius: 5px;
            margin: 20px 0;
          }
          .next-steps h3 {
            color: #0A192F;
            margin-top: 0;
          }
          .next-steps ul {
            margin: 10px 0;
            padding-left: 20px;
          }
          .contact-info {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 5px;
            margin: 20px 0;
            text-align: center;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            color: #666;
            font-size: 12px;
          }
          .btn {
            display: inline-block;
            padding: 12px 24px;
            background: linear-gradient(135deg, #64FFDA, #00E5FF);
            color: #0A192F;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            margin: 10px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>ð¦ Gracias por contactar a Nyx Digital</h1>
          </div>
          
          <p class="welcome-message">
            Hola ${contactData.name},<br><br>
            ¡Gracias por tu interés en nuestros servicios! Hemos recibido tu solicitud y nos emociona poder ayudarte con tu proyecto.
          </p>

          <div class="service-info">
            <h3>Detalles de tu solicitud:</h3>
            <p><strong>Servicio solicitado:</strong> ${serviceLabels[contactData.service]}</p>
            ${contactData.message ? `<p><strong>Mensaje:</strong> ${contactData.message}</p>` : ''}
          </div>

          <div class="next-steps">
            <h3>ð¡ ¿Qué sucede ahora?</h3>
            <ul>
              <li>Revisaremos tu solicitud detalladamente</li>
              <li>Te contactaremos dentro de 24-48 horas hábiles</li>
              <li>Programaremos una llamada para discutir tus necesidades</li>
              <li>Te enviaremos una propuesta personalizada</li>
            </ul>
          </div>

          <div class="contact-info">
            <h3>ð§ Mientras tanto...</h3>
            <p>Puedes explorar más sobre nuestros servicios en nuestro sitio web o seguirnos en redes sociales para ver nuestros últimos proyectos.</p>
            <a href="https://nyxdigital.com" class="btn">Visitar nuestro sitio</a>
          </div>

          <div class="footer">
            <p><strong>Nyx Digital</strong></p>
            <p>Tu partner digital para el éxito</p>
            <p>Este es un mensaje automático, por favor no responder a este email.</p>
            <p>Fecha: ${new Date().toLocaleString('es-ES')}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: process.env.EMAIL_FROM || `"Nyx Digital" <${process.env.EMAIL_USER}>`,
      to: contactData.email,
      subject: 'Gracias por contactar a Nyx Digital - Te responderemos pronto',
      html: htmlContent
    };

    await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent successfully to client');

  } catch (error) {
    console.error('Error sending confirmation email:', error);
    throw error;
  }
};

export default { sendContactEmail, sendConfirmationEmail };
