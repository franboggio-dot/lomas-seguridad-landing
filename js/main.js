/* 
  Lomas Sistemas de Seguridad - Main Logic & Form Handling
*/

document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    // 1. Sticky Header Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Contact Form Handling
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            // Loading State
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (response.ok) {
                    // Success State
                    showStatus('¡Gracias! Recibimos tu consulta. Te contactaremos pronto.', 'success');
                    contactForm.reset();
                } else {
                    // Error State
                    showStatus(result.message || 'Hubo un error al enviar el formulario. Por favor, intentá de nuevo.', 'error');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                // Fallback for local testing without backend
                showStatus('Simulación: Formulario enviado correctamente (Backend no detectado).', 'success');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });
    }

    function showStatus(message, type) {
        formStatus.textContent = message;
        formStatus.style.display = 'block';
        formStatus.className = type === 'success' ? 'status-success' : 'status-error';
        
        // Basic styling for status message
        formStatus.style.color = type === 'success' ? '#10b981' : '#ef4444';
        formStatus.style.fontWeight = 'bold';
        formStatus.style.padding = '1rem';
        
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }
});
