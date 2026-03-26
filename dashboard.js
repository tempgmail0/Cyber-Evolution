document.addEventListener('DOMContentLoaded', () => {
    // --- Security Check ---
    // If not logged in, redirect to home page immediately
    if (sessionStorage.getItem('cyber_evo_auth') !== 'token_valid') {
        window.location.href = 'index.html';
        return; // Prevent further script execution
    }

    // --- Course Data ---
    const courseModules = [
        { id: 1, title: "এডভান্স জাভা প্রোগ্রামিং", icon: "fa-brands fa-java" },
        { id: 2, title: "ডাটা স্ট্রাকচার ও অ্যালগরিদম (DSA)", icon: "fa-solid fa-code-merge" },
        { id: 3, title: "প্রফেশনাল জাভা প্রজেক্ট ডেভেলপমেন্ট", icon: "fa-solid fa-laptop-code" },
        { id: 4, title: "ম্যালওয়্যার টেস্টিং", icon: "fa-solid fa-bug" },
        { id: 5, title: "ম্যালওয়্যার রিভার্স ইঞ্জিনিয়ারিং", icon: "fa-solid fa-microscope" },
        { id: 6, title: "বেসিক নেটওয়ার্কিং", icon: "fa-solid fa-network-wired" },
        { id: 7, title: "জাভা ও নেটওয়ার্কিং ব্যবহার করে সফটওয়্যার", icon: "fa-solid fa-window-restore" }
    ];

    // --- Populate Course Grid ---
    const courseGrid = document.getElementById('courseGrid');
    const noticeModal = document.getElementById('noticeModal');

    courseModules.forEach(module => {
        // Create card element
        const card = document.createElement('div');
        card.className = 'module-card';
        
        // Setup inner HTML
        card.innerHTML = `
            <div>
                <div class="module-icon">
                    <i class="${module.icon}"></i>
                    <i class="fa-solid fa-lock lock-icon"></i>
                </div>
                <h3 class="module-title">${module.id}. ${module.title}</h3>
            </div>
            <div class="module-status">
                <i class="fa-solid fa-lock"></i> ভিডিও লকড
            </div>
        `;
        
        // Add click listener to show notice
        card.addEventListener('click', () => {
            noticeModal.classList.add('show');
        });
        
        courseGrid.appendChild(card);
    });

    // --- Modal Logic ---
    const closeBtn = document.querySelector('.close-btn');
    const btnOkay = document.querySelector('.btn-okay');

    const closeModal = () => {
        noticeModal.classList.remove('show');
    };

    closeBtn.addEventListener('click', closeModal);
    btnOkay.addEventListener('click', closeModal);

    window.addEventListener('click', (e) => {
        if (e.target === noticeModal) {
            closeModal();
        }
    });

    // --- Logout Logic ---
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', () => {
        // Remove auth session
        sessionStorage.removeItem('cyber_evo_auth');
        // Redirect
        window.location.href = 'index.html';
    });
});
