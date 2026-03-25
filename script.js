  (function() {
    // telegram username / link (ডেমো টেলিগ্রাম লিংক, প্রয়োজনে পরিবর্তন করতে পারেন)
    // এখানে আপনার আসল টেলিগ্রাম ইউজারনেম বা ইনভাইট লিংক দিন। 
    // উদাহরণ: "https://t.me/your_username" অথবা "https://t.me/cyber_evolution_team"
    // ডেমোর জন্য একটি ডেডিকেটেড লিংক ব্যবহার করা হয়েছে যা আপনি সহজেই সম্পাদনা করতে পারবেন।
    const TELEGRAM_LINK = "https://t.me/Cyber_Evolution_CEO"; // ← এখানে আপনার টেলিগ্রাম লিংক বা ইউজারনেম সেট করুন
    // যদি কোনো কাস্টম ইউজারনেম না থাকে, তাহলে https://t.me/ আপনার আইডি বসান।
    
    const contactBtn = document.getElementById('telegramContactBtn');
    if (contactBtn) {
      contactBtn.addEventListener('click', function() {
        // টেলিগ্রামে যাওয়ার আগে একটি ছোট নোটিশ / কনফার্মেশন (ইচ্ছে হলে)
        // আমরা সরাসরি রিডাইরেক্ট করব।
        if (TELEGRAM_LINK && TELEGRAM_LINK !== "") {
          window.open(TELEGRAM_LINK, '_blank');
        } else {
          // যদি লিংক না থাকে তবে সতর্কতা
          alert("টেলিগ্রাম লিংক কনফিগার করা হয়নি। অনুগ্রহ করে পরিচালকের সাথে যোগাযোগ করুন।");
        }
      });
    }
    
    // আরও ইন্টারঅ্যাকটিভিটি: সব কার্ডে hover effect এর জন্য JS কিছু লাগবে না, css handle করে।
    // console log for evolution
    console.log("Cyber Evolution website loaded — Master your skills!");
    
    // Add a small ripple/effect to contact button optionally
    const btn = document.querySelector('.telegram-btn');
    if (btn) {
      btn.addEventListener('mousedown', function(e) {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => { this.style.transform = ''; }, 120);
      });
    }
  })();
