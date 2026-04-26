const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false, 
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

const sendAdminNotification = async (data) => {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.log('--- EMAIL NOTIFICATION (LOG) ---');
        console.log('To: Admin');
        console.log('Subject: Nueva consulta recibida');
        console.log('Data:', data);
        console.log('-------------------------------');
        return;
    }

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: process.env.ADMIN_EMAIL,
        subject: `Nueva consulta de ${data.name} - Lomas Seguridad`,
        html: `
            <h1>Nueva Consulta desde el Sitio Web</h1>
            <p><strong>Nombre:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Teléfono:</strong> ${data.phone || 'No provisto'}</p>
            <p><strong>Tipo de Propiedad:</strong> ${data.property_type}</p>
            <p><strong>Interés:</strong> ${data.service_interest}</p>
            <p><strong>¿Tiene alarma?:</strong> ${data.has_alarm}</p>
            <p><strong>Mensaje:</strong></p>
            <p>${data.message}</p>
            <br>
            <p><em>Este mensaje fue generado automáticamente desde lomasseguridad.com.ar</em></p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Admin notification email sent.');
    } catch (error) {
        console.error('Error sending admin notification email:', error);
    }
};

module.exports = {
    sendAdminNotification
};
