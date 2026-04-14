// Servicio de correo electrónico para Nyx Digital
// Simulación de envío de correos (en producción se integraría con un servicio real)

class EmailService {
  constructor() {
    this.emailQueue = [];
    this.isProduction = false; // Cambiar a true en producción
  }

  // Enviar correo de bienvenida
  async sendWelcomeEmail(userEmail, userName) {
    const emailData = {
      to: userEmail,
      subject: '¡Bienvenido a Nyx Digital! Tu cuenta ha sido creada',
      html: this.generateWelcomeEmailTemplate(userName),
      text: `¡Hola ${userName}!\n\nTe damos la bienvenida a Nyx Digital. Tu cuenta ha sido creada exitosamente.\n\nYa puedes comenzar a explorar nuestros servicios y solicitar cotizaciones.\n\nSi tienes alguna pregunta, no dudes en contactarnos.\n\n¡Bienvenido a la familia Nyx!\n\nAtentamente,\nEl equipo de Nyx Digital`
    };

    return this.sendEmail(emailData);
  }

  // Enviar correo de contacto
  async sendContactEmail(contactData) {
    const emailData = {
      to: 'contacto@nyxdigital.com',
      subject: `Nuevo contacto de ${contactData.name}`,
      html: this.generateContactEmailTemplate(contactData),
      text: `Nuevo contacto:\n\nNombre: ${contactData.name}\nEmail: ${contactData.email}\nTeléfono: ${contactData.phone}\nEmpresa: ${contactData.company}\nServicio: ${contactData.service}\n\nMensaje:\n${contactData.message}`
    };

    return this.sendEmail(emailData);
  }

  // Enviar correo (simulado)
  async sendEmail(emailData) {
    try {
      if (this.isProduction) {
        // En producción, aquí se integraría con un servicio real como SendGrid, Nodemailer, etc.
        const response = await this.sendRealEmail(emailData);
        return { success: true, message: 'Correo enviado exitosamente', response };
      } else {
        // Simulación para desarrollo
        console.log('=== CORREO ENVIADO (SIMULACIÓN) ===');
        console.log('Para:', emailData.to);
        console.log('Asunto:', emailData.subject);
        console.log('Contenido:', emailData.text);
        console.log('=====================================');

        // Guardar en cola para revisión
        this.emailQueue.push({
          ...emailData,
          sentAt: new Date().toISOString(),
          status: 'sent'
        });

        return { success: true, message: 'Correo enviado exitosamente (simulado)' };
      }
    } catch (error) {
      console.error('Error al enviar correo:', error);
      return { success: false, message: 'Error al enviar correo', error };
    }
  }

  // Plantilla de correo de bienvenida
  generateWelcomeEmailTemplate(userName) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bienvenido a Nyx Digital</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #112240, #0A192F); color: #CCD6F6; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #64FFDA; color: #112240; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
          .footer { text-align: center; color: #8892B0; margin-top: 30px; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>¡Bienvenido a Nyx Digital!</h1>
            <p>Tu cuenta ha sido creada exitosamente</p>
          </div>
          <div class="content">
            <h2>¡Hola ${userName}!</h2>
            <p>Te damos la bienvenida a la familia Nyx Digital. Estamos emocionados de tenerte como parte de nuestra comunidad.</p>
            
            <h3>¿Qué puedes hacer ahora?</h3>
            <ul>
              <li>Explorar nuestros servicios de desarrollo web</li>
              <li>Solicitar cotizaciones personalizadas</li>
              <li>Ver nuestros proyectos anteriores</li>
              <li>Contactarnos para cualquier consulta</li>
            </ul>
            
            <p>Ya estás listo para comenzar tu viaje digital con nosotros. Tu cuenta te da acceso a todas nuestras herramientas y servicios.</p>
            
            <a href="http://localhost:5174" class="button">Explorar Nyx Digital</a>
            
            <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos. Estamos aquí para ayudarte.</p>
            
            <div class="footer">
              <p>Este es un correo automático. Por favor no responder a este mensaje.</p>
              <p>&copy; 2024 Nyx Digital. Todos los derechos reservados.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // Plantilla de correo de contacto
  generateContactEmailTemplate(contactData) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nuevo Contacto - Nyx Digital</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #112240, #0A192F); color: #CCD6F6; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; }
          .info-box { background: #f8f9fa; padding: 15px; border-left: 4px solid #64FFDA; margin: 10px 0; }
          .footer { text-align: center; color: #8892B0; margin-top: 30px; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Nuevo Contacto</h1>
            <p>Has recibido un nuevo mensaje de contacto</p>
          </div>
          <div class="content">
            <h2>Información del Contacto</h2>
            
            <div class="info-box">
              <strong>Nombre:</strong> ${contactData.name}<br>
              <strong>Email:</strong> ${contactData.email}<br>
              <strong>Teléfono:</strong> ${contactData.phone}<br>
              <strong>Empresa:</strong> ${contactData.company}<br>
              <strong>Servicio de interés:</strong> ${contactData.service}
            </div>
            
            <h3>Mensaje:</h3>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 5px;">
              ${contactData.message}
            </div>
            
            <p><strong>Fecha y hora:</strong> ${new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' })}</p>
            
            <div class="footer">
              <p>Este es un correo automático del sistema de contacto de Nyx Digital.</p>
              <p>&copy; 2024 Nyx Digital. Todos los derechos reservados.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // Obtener cola de correos (para debugging)
  getEmailQueue() {
    return this.emailQueue;
  }

  // Limpiar cola de correos
  clearEmailQueue() {
    this.emailQueue = [];
  }

  // Enviar correo real (integración con servicio externo)
  async sendRealEmail(emailData) {
    // Aquí iría la integración con un servicio real como SendGrid, Nodemailer, etc.
    // Ejemplo con SendGrid:
    /*
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    const msg = {
      to: emailData.to,
      from: 'contacto@nyxdigital.com',
      subject: emailData.subject,
      text: emailData.text,
      html: emailData.html,
    };
    
    return await sgMail.send(msg);
    */
    
    // Simulación para desarrollo
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ messageId: 'mock-' + Date.now() });
      }, 1000);
    });
  }
}

export const emailService = new EmailService();
