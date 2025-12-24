document.addEventListener('DOMContentLoaded', function() {
            // Initialize existing functionality
            updateDateTime();
            setInterval(updateDateTime, 1000);

            initMobileMenu();
            initFormValidation();

            // Feedback Form
            const feedbackForm = document.getElementById('feedbackForm');
            if (feedbackForm) {
                feedbackForm.addEventListener('submit', function(e) {
                    e.preventDefault();

                    const message = document.getElementById('feedback-message').value.trim();

                    if (!message) {
                        alert('Harap isi pesan Anda!');
                        return;
                    }

                    // Simulate form submission
                    alert('Terima kasih atas masukan Anda! Kami sangat menghargai kontribusi Anda untuk perbaikan layanan kami.');
                    feedbackForm.reset();
                });
            }

            // Donation Buttons
            const donationButtons = document.querySelectorAll('.btn-donate');
            const donationModal = document.getElementById('donationModal');
            const closeDonationModal = document.getElementById('closeDonationModal');

            donationButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const program = this.dataset.program;
                    const programSelect = document.getElementById('donation-program');

                    if (programSelect) {
                        programSelect.value = program;
                    }

                    donationModal.style.display = 'block';
                });
            });

            if (closeDonationModal) {
                closeDonationModal.addEventListener('click', () => {
                    donationModal.style.display = 'none';
                });
            }

            // Close modal when clicking outside
            window.addEventListener('click', (e) => {
                if (e.target === donationModal) {
                    donationModal.style.display = 'none';
                }
            });

            // Payment Tabs
            const paymentTabs = document.querySelectorAll('.payment-tab');

            paymentTabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    // Remove active class from all tabs
                    paymentTabs.forEach(t => t.classList.remove('active'));

                    // Add active class to clicked tab
                    this.classList.add('active');

                    // Hide all content
                    document.querySelectorAll('.payment-content').forEach(content => {
                        content.classList.remove('active');
                    });

                    // Show corresponding content
                    const tabId = this.dataset.tab + '-tab';
                    document.getElementById(tabId).classList.add('active');
                });
            });

            // Copy buttons
            const copyButtons = document.querySelectorAll('.btn-copy');

            copyButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const textToCopy = this.dataset.copy;

                    // Copy to clipboard
                    navigator.clipboard.writeText(textToCopy).then(() => {
                        const originalText = this.innerHTML;
                        this.innerHTML = '<i class="fas fa-check"></i> Tersalin!';

                        setTimeout(() => {
                            this.innerHTML = originalText;
                        }, 2000);
                    }).catch(err => {
                        console.error('Failed to copy: ', err);
                    });
                });
            });

            // Donation amount buttons
            const amountOptions = document.querySelectorAll('.amount-option');
            const amountInput = document.getElementById('donation-amount');

            amountOptions.forEach(option => {
                option.addEventListener('click', function() {
                    const amount = this.dataset.amount;
                    amountInput.value = amount;
                });
            });

            // Donation form
            const donationForm = document.getElementById('donationForm');
            if (donationForm) {
                donationForm.addEventListener('submit', function(e) {
                    e.preventDefault();

                    const name = document.getElementById('donor-name').value.trim();
                    const phone = document.getElementById('donor-phone').value.trim();
                    const amount = document.getElementById('donation-amount').value.trim();
                    const program = document.getElementById('donation-program').value;

                    if (!name || !phone || !amount || !program) {
                        alert('Harap isi semua field yang wajib!');
                        return;
                    }

                    // Get selected payment method
                    const activeTab = document.querySelector('.payment-tab.active');
                    const paymentMethod = activeTab ? activeTab.dataset.tab : 'bank';

                    // Show confirmation
                    const programNames = {
                        'waqaf': 'Waqaf Al-Qur\'an',
                        'kemanusiaan': 'Bantuan Kemanusiaan',
                        'beasiswa': 'Beasiswa Pendidikan'
                    };

                    const paymentMethods = {
                        'bank': 'Transfer Bank',
                        'ewallet': 'E-Wallet',
                        'retail': 'Retail'
                    };

                    const confirmation = `
                        Konfirmasi Donasi:
                        
                        Nama: ${name}
                        Telepon: ${phone}
                        Program: ${programNames[program]}
                        Jumlah: Rp ${parseInt(amount).toLocaleString('id-ID')}
                        Metode: ${paymentMethods[paymentMethod]}
                        
                        Silakan lanjutkan pembayaran sesuai metode yang dipilih.
                    `;

                    if (confirm(confirmation)) {
                        // Show payment instructions
                        let paymentInstruction = '';

                        switch (paymentMethod) {
                            case 'bank':
                                paymentInstruction = 'Silakan transfer ke rekening bank yang tersedia.';
                                break;
                            case 'ewallet':
                                paymentInstruction = 'Silakan transfer ke nomor e-wallet yang tersedia.';
                                break;
                            case 'retail':
                                paymentInstruction = 'Silakan tunjukkan kode pembayaran di kasir Alfamart/Indomaret.';
                                break;
                        }

                        alert(`Terima kasih atas donasi Anda!\n\n${paymentInstruction}\n\nJangan lupa konfirmasi via WhatsApp ke 0812-3456-7890 dengan menyertakan bukti transfer.`);

                        // Close modal and reset form
                        donationModal.style.display = 'none';
                        donationForm.reset();
                    }
                });
            }

            // Add CSS for this page
            const style = document.createElement('style');
            style.textContent = `
                .feedback-section {
                    background: white;
                    border-radius: 12px;
                    padding: 30px;
                    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
                    margin-bottom: 40px;
                }
                
                .section-header {
                    text-align: center;
                    margin-bottom: 30px;
                }
                
                .section-header h2 {
                    color: #2c3e50;
                    font-size: 2rem;
                    margin-bottom: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                }
                
                .section-subtitle {
                    color: #7f8c8d;
                    font-size: 1rem;
                }
                
                .feedback-container {
                    display: grid;
                    grid-template-columns: 2fr 1fr;
                    gap: 30px;
                }
                
                .feedback-form {
                    padding-right: 30px;
                    border-right: 1px solid #eee;
                }
                
                .form-group {
                    margin-bottom: 25px;
                }
                
                .form-group label {
                    display: block;
                    margin-bottom: 8px;
                    font-weight: 500;
                    color: #2c3e50;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                
                .form-group input,
                .form-group select,
                .form-group textarea {
                    width: 100%;
                    padding: 12px 15px;
                    border: 2px solid #e0e0e0;
                    border-radius: 8px;
                    font-family: 'Poppins', sans-serif;
                    font-size: 0.95rem;
                    transition: all 0.3s ease;
                }
                
                .form-group textarea {
                    resize: vertical;
                }
                
                .form-group input:focus,
                .form-group select:focus,
                .form-group textarea:focus {
                    border-color: #3498db;
                    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
                    outline: none;
                }
                
                .radio-group {
                    display: flex;
                    gap: 20px;
                    margin-top: 10px;
                }
                
                .radio-label {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    cursor: pointer;
                }
                
                .radio-label input[type="radio"] {
                    display: none;
                }
                
                .radio-custom {
                    width: 18px;
                    height: 18px;
                    border: 2px solid #3498db;
                    border-radius: 50%;
                    position: relative;
                }
                
                .radio-label input[type="radio"]:checked + .radio-custom::after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 10px;
                    height: 10px;
                    background: #3498db;
                    border-radius: 50%;
                }
                
                .checkbox-label {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    cursor: pointer;
                }
                
                .checkbox-label input[type="checkbox"] {
                    display: none;
                }
                
                .checkbox-custom {
                    width: 18px;
                    height: 18px;
                    border: 2px solid #3498db;
                    border-radius: 4px;
                    position: relative;
                }
                
                .checkbox-label input[type="checkbox"]:checked + .checkbox-custom::after {
                    content: '✓';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    color: #3498db;
                    font-weight: bold;
                }
                
                .btn-submit-feedback {
                    background: linear-gradient(90deg, #3498db 0%, #2980b9 100%);
                    color: white;
                    border: none;
                    padding: 15px 30px;
                    font-size: 1rem;
                    font-weight: 600;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 10px;
                    box-shadow: 0 4px 15px rgba(52, 152, 219, 0.4);
                }
                
                .btn-submit-feedback:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 6px 20px rgba(52, 152, 219, 0.6);
                }
                
                .feedback-info {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }
                
                .info-card {
                    background: #f8f9fa;
                    padding: 20px;
                    border-radius: 8px;
                }
                
                .info-card h3 {
                    color: #2c3e50;
                    margin-bottom: 15px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                
                .info-card ul {
                    list-style: none;
                    padding-left: 0;
                }
                
                .info-card ul li {
                    padding: 5px 0;
                    padding-left: 20px;
                    position: relative;
                }
                
                .info-card ul li::before {
                    content: '✓';
                    position: absolute;
                    left: 0;
                    color: #2ecc71;
                    font-weight: bold;
                }
                
                .testimonial {
                    background: white;
                    padding: 15px;
                    border-radius: 6px;
                    margin-bottom: 15px;
                    border-left: 4px solid #3498db;
                }
                
                .testimonial p {
                    font-style: italic;
                    margin-bottom: 5px;
                }
                
                .testimonial-author {
                    font-size: 0.9rem;
                    color: #7f8c8d;
                }
                
                .donation-section {
                    background: white;
                    border-radius: 12px;
                    padding: 30px;
                    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
                    margin-bottom: 40px;
                }
                
                .donation-programs {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 25px;
                    margin: 30px 0;
                }
                
                .program-card {
                    background: #f8f9fa;
                    border-radius: 10px;
                    padding: 25px;
                    text-align: center;
                    transition: all 0.3s ease;
                    border: 2px solid transparent;
                }
                
                .program-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                    border-color: #3498db;
                }
                
                .program-icon {
                    font-size: 3rem;
                    color: #3498db;
                    margin-bottom: 15px;
                }
                
                .program-card h3 {
                    color: #2c3e50;
                    margin-bottom: 10px;
                }
                
                .program-card p {
                    color: #7f8c8d;
                    font-size: 0.9rem;
                    margin-bottom: 20px;
                    line-height: 1.5;
                }
                
                .program-target {
                    margin: 20px 0;
                }
                
                .progress-bar {
                    height: 8px;
                    background: #e0e0e0;
                    border-radius: 4px;
                    overflow: hidden;
                    margin-bottom: 8px;
                }
                
                .progress-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #2ecc71 0%, #27ae60 100%);
                    border-radius: 4px;
                }
                
                .progress-text {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.85rem;
                    color: #7f8c8d;
                }
                
                .btn-donate {
                    background: linear-gradient(90deg, #e74c3c 0%, #c0392b 100%);
                    color: white;
                    border: none;
                    padding: 12px 25px;
                    border-radius: 50px;
                    cursor: pointer;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    width: 100%;
                }
                
                .btn-donate:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 6px 20px rgba(231, 76, 60, 0.4);
                }
                
                .payment-methods {
                    margin-top: 40px;
                }
                
                .payment-methods h3 {
                    color: #2c3e50;
                    margin-bottom: 20px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                
                .payment-tabs {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 25px;
                    border-bottom: 2px solid #eee;
                    padding-bottom: 10px;
                }
                
                .payment-tab {
                    padding: 10px 25px;
                    border: 2px solid #3498db;
                    background: white;
                    color: #3498db;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: 600;
                    transition: all 0.3s ease;
                }
                
                .payment-tab.active {
                    background: #3498db;
                    color: white;
                }
                
                .payment-content {
                    display: none;
                }
                
                .payment-content.active {
                    display: block;
                }
                
                .payment-options {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 20px;
                    margin-bottom: 30px;
                }
                
                .payment-option {
                    background: #f8f9fa;
                    padding: 20px;
                    border-radius: 8px;
                    text-align: center;
                    border: 2px solid transparent;
                    transition: all 0.3s ease;
                }
                
                .payment-option:hover {
                    border-color: #3498db;
                    transform: translateY(-3px);
                }
                
                .bank-logo, .ewallet-logo, .retail-logo {
                    width: 60px;
                    height: 60px;
                    margin: 0 auto 15px;
                    background-size: contain;
                    background-repeat: no-repeat;
                    background-position: center;
                }
                
                .bank-logo.bca { background-image: url('images/bca-logo.png'); }
                .bank-logo.mandiri { background-image: url('images/mandiri-logo.png'); }
                .bank-logo.bni { background-image: url('images/bni-logo.png'); }
                .ewallet-logo.dana { background-image: url('images/dana-logo.png'); }
                .ewallet-logo.gopay { background-image: url('images/gopay-logo.png'); }
                .ewallet-logo.ovo { background-image: url('images/ovo-logo.png'); }
                .retail-logo.alfamart { background-image: url('images/alfamart-logo.png'); }
                .retail-logo.indomaret { background-image: url('images/indomaret-logo.png'); }
                
                .bank-info h4 {
                    color: #2c3e50;
                    margin-bottom: 5px;
                }
                
                .bank-info p {
                    color: #7f8c8d;
                    font-size: 0.9rem;
                    margin: 2px 0;
                }
                
                .btn-copy {
                    background: #3498db;
                    color: white;
                    border: none;
                    padding: 8px 15px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 0.9rem;
                    margin-top: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 5px;
                    transition: all 0.3s ease;
                    width: 100%;
                }
                
                .btn-copy:hover {
                    background: #2980b9;
                }
                
                .donation-note {
                    background: #e3f2fd;
                    padding: 15px;
                    border-radius: 8px;
                    border-left: 4px solid #3498db;
                }
                
                .donation-note p {
                    color: #2c3e50;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                
                .contact-info-section {
                    background: white;
                    border-radius: 12px;
                    padding: 30px;
                    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
                }
                
                .contact-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 25px;
                }
                
                .contact-item {
                    text-align: center;
                    padding: 25px 15px;
                    background: #f8f9fa;
                    border-radius: 8px;
                    transition: all 0.3s ease;
                }
                
                .contact-item:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                }
                
                .contact-item i {
                    font-size: 2.5rem;
                    color: #3498db;
                    margin-bottom: 15px;
                }
                
                .contact-item h3 {
                    color: #2c3e50;
                    margin-bottom: 10px;
                }
                
                .contact-item p {
                    color: #7f8c8d;
                    font-size: 0.9rem;
                    margin: 5px 0;
                }
                
                .donation-modal {
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.5);
                    z-index: 2000;
                    animation: fadeIn 0.3s ease;
                }
                
                .donation-modal-content {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: white;
                    width: 90%;
                    max-width: 500px;
                    max-height: 90vh;
                    border-radius: 12px;
                    overflow-y: auto;
                }
                
                .modal-header {
                    background: #2c3e50;
                    color: white;
                    padding: 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .close-modal {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                }
                
                .modal-body {
                    padding: 25px;
                }
                
                .amount-options {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                    margin: 10px 0;
                }
                
                .amount-option {
                    flex: 1;
                    min-width: calc(50% - 10px);
                    padding: 10px;
                    border: 2px solid #3498db;
                    background: white;
                    color: #3498db;
                    border-radius: 6px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                
                .amount-option:hover,
                .amount-option.active {
                    background: #3498db;
                    color: white;
                }
                
                .btn-proceed-donation {
                    background: linear-gradient(90deg, #2ecc71 0%, #27ae60 100%);
                    color: white;
                    border: none;
                    padding: 15px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    margin-top: 20px;
                }
                
                .btn-proceed-donation:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 6px 20px rgba(46, 204, 113, 0.4);
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @media (max-width: 768px) {
                    .feedback-container {
                        grid-template-columns: 1fr;
                    }
                    
                    .feedback-form {
                        padding-right: 0;
                        border-right: none;
                        border-bottom: 1px solid #eee;
                        padding-bottom: 30px;
                        margin-bottom: 30px;
                    }
                    
                    .donation-programs {
                        grid-template-columns: 1fr;
                    }
                    
                    .payment-options {
                        grid-template-columns: 1fr;
                    }
                    
                    .contact-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    
                    .payment-tabs {
                        flex-direction: column;
                    }
                    
                    .payment-tab {
                        width: 100%;
                        text-align: center;
                    }
                }
                
                @media (max-width: 480px) {
                    .contact-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .amount-option {
                        min-width: calc(100% - 10px);
                    }
                }
            `;
            document.head.appendChild(style);
        });
