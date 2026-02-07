document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Toggle
    const navToggle = document.querySelector('[data-nav-toggle]');
    const nav = document.querySelector('[data-nav]');
    
    if (navToggle && nav) {
        navToggle.addEventListener('click', () => {
            const isHidden = nav.classList.contains('hidden');
            if (isHidden) {
                nav.classList.remove('hidden');
                nav.classList.add('flex');
                navToggle.setAttribute('aria-expanded', 'true');
            } else {
                nav.classList.add('hidden');
                nav.classList.remove('flex');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // 2. Gallery Modal Viewer
    const modal = document.querySelector('[data-modal]');
    const modalImg = document.querySelector('[data-modal-img]');
    const modalCap = document.querySelector('[data-modal-cap]');
    const modalClose = document.querySelector('[data-modal-close]');
    const galleryTriggers = document.querySelectorAll('[data-gallery]');

    if (modal) {
        galleryTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const src = trigger.getAttribute('data-src');
                const cap = trigger.getAttribute('data-cap');
                modalImg.src = src;
                modalCap.textContent = cap;
                modal.classList.remove('hidden');
                modal.classList.add('flex');
                document.documentElement.classList.add('no-scroll');
            });
        });

        const closeModal = () => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.documentElement.classList.remove('no-scroll');
        };

        if (modalClose) modalClose.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });
    }

    // 3. Booking Form Logic
    const bookingForm = document.querySelector('[data-booking-form]');
    const confirmPanel = document.querySelector('[data-booking-confirm]');

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            
            // Validate required fields
            const requiredFields = bookingForm.querySelectorAll('[data-required]');
            requiredFields.forEach(field => {
                const wrapper = field.closest('[data-field]');
                const errorEl = wrapper.querySelector('[data-error]');
                
                if (!field.value || (field.type === 'checkbox' && !field.checked)) {
                    isValid = false;
                    field.classList.add('border-red-500');
                    if (errorEl) errorEl.classList.remove('hidden');
                } else {
                    field.classList.remove('border-red-500');
                    if (errorEl) errorEl.classList.add('hidden');
                }
            });

            if (isValid) {
                const submitBtn = bookingForm.querySelector('button[type="submit"]');
                submitBtn.disabled = true;
                submitBtn.textContent = 'Processing...';

                // Simulate network delay
                setTimeout(() => {
                    bookingForm.classList.add('hidden');
                    confirmPanel.classList.remove('hidden');
                    confirmPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    bookingForm.reset();
                }, 1500);
            }
        });
    }
});
