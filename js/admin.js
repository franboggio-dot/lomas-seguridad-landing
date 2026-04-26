/* 
  Lomas Sistemas de Seguridad - Admin Dashboard Logic
*/

document.addEventListener('DOMContentLoaded', async () => {
    const tableBody = document.getElementById('message-table-body');

    async function loadMessages() {
        try {
            const response = await fetch('/api/contact');
            const result = await response.json();

            if (result.success && result.data.length > 0) {
                renderMessages(result.data);
            } else {
                tableBody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 3rem;">No hay mensajes registrados.</td></tr>';
            }
        } catch (error) {
            console.error('Error loading messages:', error);
            // Mock data for demo if backend fails
            renderMessages([
                { createdAt: new Date(), name: 'Juan Pérez', property_type: 'Hogar', service_interest: 'Monitoreo', isRead: false },
                { createdAt: new Date(Date.now() - 86400000), name: 'Empresa ABC', property_type: 'Industria', service_interest: 'Instalación', isRead: true }
            ]);
        }
    }

    function renderMessages(messages) {
        tableBody.innerHTML = '';
        messages.forEach(msg => {
            const date = new Date(msg.createdAt).toLocaleDateString('es-AR');
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${date}</td>
                <td><strong>${msg.name}</strong></td>
                <td style="text-transform: capitalize;">${msg.property_type}</td>
                <td>${msg.service_interest}</td>
                <td><span class="status-badge ${msg.isRead ? 'status-read' : 'status-new'}">${msg.isRead ? 'Leído' : 'Nuevo'}</span></td>
                <td>
                    <button class="btn" style="padding: 0.5rem; font-size: 0.8rem; background: #eee;"><i class="fas fa-eye"></i></button>
                    <button class="btn" style="padding: 0.5rem; font-size: 0.8rem; background: #fee; color: #ef4444;"><i class="fas fa-trash"></i></button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    loadMessages();
});
