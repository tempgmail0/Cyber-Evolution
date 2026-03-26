document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // SPLASH SCREEN — WATER DROP ANIMATION
    // ============================================
    const splash = document.getElementById('splashScreen');
    const siteWrapper = document.getElementById('siteWrapper');

    // Show site after splash animation completes (~2.4s)
    setTimeout(() => {
        splash.classList.add('hidden');
        siteWrapper.classList.add('visible');
    }, 2500);


    // ============================================
    // HEADER — SCROLL EFFECT & HAMBURGER
    // ============================================
    const mainHeader = document.getElementById('mainHeader');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            mainHeader.classList.add('scrolled');
        } else {
            mainHeader.classList.remove('scrolled');
        }
    });

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
        });
    }

    // Close mobile menu on link click
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });


    // ============================================
    // MODAL HELPER FUNCTIONS
    // ============================================
    const openModal = (modalEl) => {
        if (modalEl) modalEl.classList.add('show');
    };

    const closeModal = (modalEl) => {
        if (modalEl) modalEl.classList.remove('show');
    };

    // Close modal when clicking on the overlay
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', () => {
            const modal = overlay.closest('.modal');
            if (modal) closeModal(modal);
        });
    });


    // ============================================
    // LOGIN MODAL
    // ============================================
    const loginModal  = document.getElementById('loginModal');
    const loginBtn    = document.getElementById('loginBtn');
    const closeLogin  = document.getElementById('closeLogin');
    const loginForm   = document.getElementById('loginForm');

    if (loginBtn)   loginBtn.addEventListener('click', () => openModal(loginModal));
    if (closeLogin) closeLogin.addEventListener('click', () => closeModal(loginModal));

    // LOGIN FORM SUBMIT — Verify against Telegram bot messages
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const tokenVal    = document.getElementById('token').value.trim();
            const passwordVal = document.getElementById('password').value.trim();

            if (!tokenVal || !passwordVal) {
                alert('❌ টোকেন এবং পাসওয়ার্ড দুটোই দিন।');
                return;
            }

            const submitBtn   = loginForm.querySelector('.btn-primary');
            const originalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> প্রমাণীকরণ হচ্ছে...';
            submitBtn.disabled = true;

            const botToken      = '8511270730:AAFa0-KUlzAma17XFf1DNxIGLvkU8mRzi54';
            const getUpdatesURL = `https://api.telegram.org/bot${botToken}/getUpdates`;

            fetch(getUpdatesURL)
                .then(res => res.json())
                .then(data => {
                    let isAuthorized = false;

                    if (data.ok && data.result) {
                        // Build final state of all messages (respects edits)
                        let messagesMap = {};

                        for (const update of data.result) {
                            const msg       = update.message       || update.channel_post;
                            const editedMsg = update.edited_message || update.edited_channel_post;

                            if (msg && msg.text)       messagesMap[msg.message_id]       = msg.text;
                            if (editedMsg && editedMsg.text) messagesMap[editedMsg.message_id] = editedMsg.text;
                        }

                        // Check each final message for TOKEN and PAS
                        for (const msgId in messagesMap) {
                            const text = messagesMap[msgId];

                            const tokenMatch = text.match(/TOKEN=(\S+)/);
                            const pasMatch   = text.match(/PAS=(\S+)/);

                            if (tokenMatch && pasMatch) {
                                if (tokenMatch[1] === tokenVal && pasMatch[1] === passwordVal) {
                                    isAuthorized = true;
                                    break;
                                }
                            }
                        }
                    }

                    if (isAuthorized) {
                        sessionStorage.setItem('cyber_evo_auth', 'token_valid');
                        submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> সফল! রিডাইরেক্ট হচ্ছে...';
                        setTimeout(() => { window.location.href = 'dashboard.html'; }, 800);
                    } else {
                        alert('❌ দুঃখিত! টোকেন অথবা পাসওয়ার্ড ভুল।');
                        submitBtn.innerHTML = originalHTML;
                        submitBtn.disabled  = false;
                    }
                })
                .catch(err => {
                    console.error(err);
                    alert('⚠️ সার্ভারের সাথে কানেক্ট করা যাচ্ছে না! ইন্টারনেট চেক করুন।');
                    submitBtn.innerHTML = originalHTML;
                    submitBtn.disabled  = false;
                });
        });
    }


    // ============================================
    // PAYMENT MODAL
    // ============================================
    const paymentModal  = document.getElementById('paymentModal');
    const enrollBtn     = document.getElementById('enrollBtn');
    const heroEnrollBtn = document.getElementById('heroEnrollBtn');
    const closePayment  = document.querySelector('.close-payment');

    if (enrollBtn)     enrollBtn.addEventListener('click',     () => openModal(paymentModal));
    if (heroEnrollBtn) heroEnrollBtn.addEventListener('click', () => openModal(paymentModal));
    if (closePayment)  closePayment.addEventListener('click',  () => closeModal(paymentModal));


    // PAYMENT FORM SUBMIT — Send to Telegram
    const paymentForm = document.getElementById('paymentForm');

    if (paymentForm) {
        paymentForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn   = paymentForm.querySelector('.btn-primary');
            const originalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> সাবমিট হচ্ছে...';
            submitBtn.disabled  = true;

            const senderNumber  = document.getElementById('senderNumber').value;
            const trxId         = document.getElementById('trxId').value;
            const contactNumber = document.getElementById('contactNumber').value;

            const botToken   = '8511270730:AAFa0-KUlzAma17XFf1DNxIGLvkU8mRzi54';
            const chatId     = '8721952828';
            const telegramURL = `https://api.telegram.org/bot${botToken}/sendMessage`;

            const message = `🔔 <b>New Course Enrollment!</b>\n━━━━━━━━━━━━━━━━━\n📱 <b>Sender bKash:</b> <code>${senderNumber}</code>\n💳 <b>TrxID:</b> <code>${trxId}</code>\n📞 <b>Contact:</b> <code>${contactNumber}</code>\n━━━━━━━━━━━━━━━━━`;

            fetch(telegramURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'HTML' })
            })
            .then(res => res.json())
            .then(() => {
                submitBtn.innerHTML = originalHTML;
                submitBtn.disabled  = false;
                closeModal(paymentModal);
                paymentForm.reset();
                openModal(document.getElementById('successModal'));
            })
            .catch(err => {
                console.error(err);
                submitBtn.innerHTML = originalHTML;
                submitBtn.disabled  = false;
                alert('⚠️ দুঃখিত, ডাটা সাবমিট হয়নি। ইন্টারনেট কানেকশন চেক করুন।');
            });
        });
    }


    // ============================================
    // SUCCESS MODAL
    // ============================================
    const successModal = document.getElementById('successModal');

    document.querySelectorAll('.close-success, .close-success-btn').forEach(btn => {
        btn.addEventListener('click', () => closeModal(successModal));
    });


    // ============================================
    // PRIVACY POLICY MODAL
    // ============================================
    const privacyModal = document.getElementById('privacyModal');
    const openPrivacy  = document.getElementById('openPrivacy');
    const closePrivacy = document.querySelector('.close-privacy');

    if (openPrivacy)  openPrivacy.addEventListener('click',  (e) => { e.preventDefault(); openModal(privacyModal); });
    if (closePrivacy) closePrivacy.addEventListener('click', () => closeModal(privacyModal));


    // ============================================
    // TERMS MODAL
    // ============================================
    const termsModal  = document.getElementById('termsModal');
    const openTerms   = document.getElementById('openTerms');
    const closeTerms  = document.querySelector('.close-terms');

    if (openTerms)  openTerms.addEventListener('click',  (e) => { e.preventDefault(); openModal(termsModal); });
    if (closeTerms) closeTerms.addEventListener('click', () => closeModal(termsModal));


    // ============================================
    // HOW TO BUY MODAL
    // ============================================
    const howToBuyModal  = document.getElementById('howToBuyModal');
    const closeHowToBuy  = document.querySelector('.close-howtobuy');

    // Multiple triggers
    ['openHowToBuy', 'openHowToBuy2'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('click', (e) => { e.preventDefault(); openModal(howToBuyModal); });
    });

    const howToBuyNavLink = document.querySelector('a[href="#how-to-buy"]');
    if (howToBuyNavLink) {
        howToBuyNavLink.addEventListener('click', () => {});
    }

    if (closeHowToBuy) closeHowToBuy.addEventListener('click', () => closeModal(howToBuyModal));

});
