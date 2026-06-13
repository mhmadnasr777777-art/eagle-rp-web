// المتغيرات الأساسية لعناصر واجهة التفعيل
const stepRules = document.getElementById('step-rules');
const stepForm = document.getElementById('step-form');
const whitelistForm = document.getElementById('whitelistForm');
const langBtnText = document.getElementById('lang-btn-text');

// ==========================================
// 1. نظام تبديل اللغة التفاعلي (Multi-language)
// ==========================================

function toggleLanguage() {
    // التحقق من اللغة الحالية المطبقة على الـ body
    const isEn = document.body.classList.toggle('en');
    
    if (isEn) {
        document.documentElement.lang = 'en';
        document.documentElement.dir = 'ltr';
        langBtnText.textContent = 'العربية';
        localStorage.setItem('selectedLang', 'en'); // حفظ الخيار في المتصفح
    } else {
        document.documentElement.lang = 'ar';
        document.documentElement.dir = 'rtl';
        langBtnText.textContent = 'English';
        localStorage.setItem('selectedLang', 'ar'); // حفظ الخيار في المتصفح
    }

    // تحديث النصوص في الصفحة بناءً على الـ Attributes (data-ar / data-en)
    updatePageTexts(isEn ? 'en' : 'ar');
}

function updatePageTexts(lang) {
    const elementsToTranslate = document.querySelectorAll('[data-ar][data-en]');
    
    elementsToTranslate.forEach(element => {
        if (lang === 'en') {
            element.textContent = element.getAttribute('data-en');
        } else {
            element.textContent = element.getAttribute('data-ar');
        }
    });
}

// فحص اللغة المحفوظة مسبقاً عند فتح الصفحة وتطبيقها تلقائياً
window.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('selectedLang') || 'ar';
    if (savedLang === 'en') {
        document.body.classList.add('en');
        document.documentElement.lang = 'en';
        document.documentElement.dir = 'ltr';
        langBtnText.textContent = 'العربية';
        updatePageTexts('en');
    } else {
        updatePageTexts('ar');
    }
});


// ==========================================
// 2. نظام خطوات التفعيل والـ Whitelist
// ==========================================

// الانتقال لصفحة الأسئلة عند الضغط على "الموافقة على الشروط"
function nextStep() {
    if (stepRules && stepForm) {
        stepRules.classList.add('hidden');
        stepForm.classList.remove('hidden');
        
        // التمرير التلقائي لأعلى نموذج الأسئلة
        stepForm.scrollIntoView({ behavior: 'smooth' });
    }
}

// في حال تم الضغط على زر "غير موافق على الشروط"
function disagree() {
    const currentLang = document.documentElement.lang;
    if (currentLang === 'en') {
        alert('You must agree to the terms to proceed with activation.');
    } else {
        alert('يجب عليك الموافقة على الشروط لكي تتمكن من الانتقال إلى مرحلة التفعيل.');
    }
}

// التعامل مع حدث إرسال نموذج الأسئلة (Submit)
if (whitelistForm) {
    whitelistForm.addEventListener('submit', function(event) {
        event.preventDefault(); // منع الصفحة من إعادة التحميل الافتراضية

        const currentLang = document.documentElement.lang;
        
        // هنا يتم التقاط البيانات (يمكن ربطه لاحقاً بـ Discord Webhook)
        if (currentLang === 'en') {
            alert('Your application has been submitted successfully! Please wait for management approval.');
        } else {
            alert('تم إرسال تقديمك بنجاح! يرجى الانتظار لحين مراجعة الإدارة وتفعيلك.');
        }

        // إعادة تعيين الحقول وإرجاع المستخدم لصفحة الشروط الأساسية
        whitelistForm.reset();
        stepForm.classList.add('hidden');
        stepRules.classList.remove('hidden');
    });
}


// ==========================================
// 3. تأثيرات شريط التنقل (Active Navbar Link)
// ==========================================
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navLinks.forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
    });
});