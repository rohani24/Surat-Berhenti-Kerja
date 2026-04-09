document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const form = document.getElementById('letterForm');
    const dateInput = document.getElementById('date');
    const noticeSelect = document.getElementById('notice');
    const customNoticeGroup = document.getElementById('customNoticeGroup');
    const customNoticeInput = document.getElementById('customNotice');
    const autoEndDateText = document.getElementById('autoEndDate');
    
    const reasonSelect = document.getElementById('reasonSelect');
    const customReasonGroup = document.getElementById('customReasonGroup');
    const reasonInput = document.getElementById('reason');
    
    const languageInput = document.getElementById('language');
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    
    const letterOutput = document.getElementById('letterOutput');
    const copyBtn = document.getElementById('copyBtn');
    const downloadPdfBtn = document.getElementById('downloadPdf');

    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    
    // E-Sign Elements
    const enableEsignCheckbox = document.getElementById('enableEsign');
    const esignModule = document.getElementById('esignModule');
    const esignTabBtns = document.querySelectorAll('.esign-tab-btn');
    const esignTabs = document.querySelectorAll('.esign-tab-content');
    const canvas = document.getElementById('sigCanvas');
    const clearBtn = document.getElementById('btnClearSig');
    const sigUpload = document.getElementById('sigUpload');
    
    // Resume Elements
    const resumeDropzone = document.getElementById('resumeDropzone');
    const resumeFile = document.getElementById('resumeFile');
    const fileUploadStatus = document.getElementById('fileUploadStatus');
    const fileNameDisplay = document.getElementById('fileName');
    const removeFileBtn = document.getElementById('removeFile');
    const resumeError = document.getElementById('resumeError');
    const janaBtn = document.getElementById('janaBtn');

    const faqQuestions = document.querySelectorAll('.faq-question');

    let signatureImage = null;
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzqqsY-S8OIzAN9xUaBOqbrL93PDPbAu_hS6yfTcwccPF2T3_8kqGe59VxC2xjM03xQ/exec';

    // --- Translation Dictionary ---
    const translations = {
        bm: {
            genSubtext: "Lengkapkan butiran di bawah untuk menjana surat berhenti kerja rasmi secara automatik.",
            labelPhone: "NO TELEFON",
            placeholderPhone: "Contoh: 012-3456789",
            labelEmail: "EMEL",
            placeholderEmail: "Contoh: nama@email.com",
            labelName: "NAMA PENUH ANDA",
            placeholderName: "Contoh: Amir Bin Ahmad",
            labelPosition: "JAWATAN ANDA",
            placeholderPosition: "Contoh: Marketing Executive",
            labelCompany: "NAMA SYARIKAT",
            placeholderCompany: "Contoh: ABC Sdn Bhd",
            labelRecipient: "NAMA PENERIMA (PENGURUS/HR)",
            placeholderRecipient: "Contoh: Encik Ali",
            labelResume: "RESUME ANDA",
            textDropzone: "Seret fail ke sini atau <b>pilih fail</b>",
            textResumeHelper: "Resume anda bantu kami hasilkan surat yang lebih sesuai dengan tahap kerjaya anda.",
            textResumeNote: "Sistem kami menyesuaikan gaya bahasa surat mengikut profil profesional anda.",
            resumeError: "Sila muat naik resume sebelum jana surat berhenti kerja.",
            errEmail: "Sila masukkan emel yang sah.",
            errEmpty: "Sila lengkapkan semua butiran wajib.",
            errResume: "Sila muat naik resume anda.",
            errNotice: "Sila isi tempoh notis.",
            labelDate: "TARIKH SURAT",
            labelNotice: "TEMPOH NOTIS",
            optNotice0: "24 Jam",
            optNotice1: "1 Bulan",
            optNotice2: "2 Bulan",
            optNoticeCustom: "Custom (Isi Sendiri)",
            placeholderCustomNotice: "Contoh: 45 hari, 6 minggu",
            labelEndDate: "HARI TERAKHIR BEKERJA (DIKIRA):",
            autoEndDatePlaceholder: "Pilih tarikh & notis...",
            labelReason: "SEBAB BERHENTI (PILIHAN)",
            optReasonNone: "-- Pilih Sebab (Jika Ada) --",
            optReasonBetter: "Peluang kerjaya yang lebih baik",
            optReasonHealth: "Masalah kesihatan",
            optReasonFamily: "Urusan keluarga",
            optReasonStudy: "Melanjutkan pelajaran",
            optReasonCustom: "Lain-lain (Nyatakan sendiri)",
            placeholderReason: "Cth: Ingin mencuba bidang baru...",
            textEsign: "Tambah Tandatangan Digital (Pilihan)",
            btnTabDraw: "Lukis",
            btnTabUpload: "Muat Naik",
            btnClearSig: "Padam & Lukis Semula",
            helpSigUpload: "Sila muat naik fail PNG telus untuk hasil terbaik.",
            labelLang: "BAHASA SURAT",
            janaBtn: "JANA SEKARANG"
        },
        en: {
            genSubtext: "Complete the details below to automatically generate an official resignation letter.",
            labelPhone: "PHONE NUMBER",
            placeholderPhone: "Example: 012-3456789",
            labelEmail: "EMAIL",
            placeholderEmail: "Example: name@email.com",
            labelName: "YOUR FULL NAME",
            placeholderName: "Example: Amir Bin Ahmad",
            labelPosition: "YOUR POSITION",
            placeholderPosition: "Example: Marketing Executive",
            labelCompany: "COMPANY NAME",
            placeholderCompany: "Example: ABC Sdn Bhd",
            labelRecipient: "RECIPIENT NAME (MANAGER/HR)",
            placeholderRecipient: "Example: Mr. Ali",
            labelResume: "YOUR RESUME",
            textDropzone: "Drag fail here or <b>choose file</b>",
            textResumeHelper: "Your resume helps us generate a letter that fits your career stage.",
            textResumeNote: "Our system adapts the letter style based on your professional profile.",
            resumeError: "Please upload your resume before generating the resignation letter.",
            errEmail: "Please enter a valid email address.",
            errEmpty: "Please complete all required fields.",
            errResume: "Please upload your resume.",
            errNotice: "Please fill the notice period.",
            labelDate: "DATE OF LETTER",
            labelNotice: "NOTICE PERIOD",
            optNotice0: "24 Hours",
            optNotice1: "1 Month",
            optNotice2: "2 Months",
            optNoticeCustom: "Custom (Self-filled)",
            placeholderCustomNotice: "Example: 45 days, 6 weeks",
            labelEndDate: "FINAL WORKING DAY (CALCULATED):",
            autoEndDatePlaceholder: "Select date & notice...",
            labelReason: "REASON FOR RESIGNATION (OPTIONAL)",
            optReasonNone: "-- Select Reason (If Any) --",
            optReasonBetter: "Better career opportunities",
            optReasonHealth: "Health issues",
            optReasonFamily: "Family matters",
            optReasonStudy: "Furthering education",
            optReasonCustom: "Others (Specify yourself)",
            placeholderReason: "E.g.: Wanting to try a new field...",
            valReasonBetter: "better career opportunities",
            valReasonHealth: "health issues",
            valReasonFamily: "family matters",
            valReasonStudy: "furthering education",
            textEsign: "Add Digital Signature (Optional)",
            btnTabDraw: "Draw",
            btnTabUpload: "Upload",
            btnClearSig: "Clear & Redraw",
            helpSigUpload: "Please upload a transparent PNG file for best results.",
            labelLang: "LETTER LANGUAGE",
            janaBtn: "GENERATE NOW"
        }
    };

    function updateFormLanguage(lang) {
        const t = translations[lang];
        if (!t) return;
        
        document.getElementById('genSubtext').innerText = t.genSubtext;
        document.getElementById('labelName').innerText = t.labelName;
        document.getElementById('labelPosition').innerText = t.labelPosition;
        document.getElementById('labelCompany').innerText = t.labelCompany;
        document.getElementById('labelRecipient').innerText = t.labelRecipient;
        document.getElementById('labelDate').innerText = t.labelDate;
        document.getElementById('labelNotice').innerText = t.labelNotice;
        document.getElementById('labelEndDate').innerText = t.labelEndDate;
        document.getElementById('labelReason').innerText = t.labelReason;
        document.getElementById('textEsign').innerText = t.textEsign;
        document.getElementById('btnTabDraw').innerText = t.btnTabDraw;
        document.getElementById('btnTabUpload').innerText = t.btnTabUpload;
        document.getElementById('btnClearSig').innerText = t.btnClearSig;
        document.getElementById('helpSigUpload').innerText = t.helpSigUpload;
        document.getElementById('labelLang').innerText = t.labelLang;
        document.getElementById('labelPhone').innerText = t.labelPhone;
        document.getElementById('labelEmail').innerText = t.labelEmail;
        document.getElementById('labelResume').innerText = t.labelResume;
        document.getElementById('textDropzone').innerHTML = t.textDropzone;
        document.getElementById('textResumeHelper').innerText = t.textResumeHelper;
        document.getElementById('textResumeNote').innerText = t.textResumeNote;
        document.getElementById('resumeError').innerText = t.resumeError;

        document.getElementById('phone').placeholder = t.placeholderPhone;
        document.getElementById('email').placeholder = t.placeholderEmail;
        document.getElementById('janaBtn').innerText = t.janaBtn;

        document.getElementById('name').placeholder = t.placeholderName;
        document.getElementById('position').placeholder = t.placeholderPosition;
        document.getElementById('company').placeholder = t.placeholderCompany;
        document.getElementById('recipient').placeholder = t.placeholderRecipient;
        document.getElementById('customNotice').placeholder = t.placeholderCustomNotice;
        document.getElementById('reason').placeholder = t.placeholderReason;

        document.getElementById('optNotice0').text = t.optNotice0;
        document.getElementById('optNotice1').text = t.optNotice1;
        document.getElementById('optNotice2').text = t.optNotice2;
        document.getElementById('optNoticeCustom').text = t.optNoticeCustom;

        document.getElementById('optReasonNone').text = t.optReasonNone;
        document.getElementById('optReasonBetter').text = t.optReasonBetter;
        document.getElementById('optReasonHealth').text = t.optReasonHealth;
        document.getElementById('optReasonFamily').text = t.optReasonFamily;
        document.getElementById('optReasonStudy').text = t.optReasonStudy;
        document.getElementById('optReasonCustom').text = t.optReasonCustom;

        // Update Option Values for Reason (to ensure exported text matches language)
        if (lang === 'en') {
            document.getElementById('optReasonBetter').value = translations.en.valReasonBetter;
            document.getElementById('optReasonHealth').value = translations.en.valReasonHealth;
            document.getElementById('optReasonFamily').value = translations.en.valReasonFamily;
            document.getElementById('optReasonStudy').value = translations.en.valReasonStudy;
        } else {
            document.getElementById('optReasonBetter').value = "peluang kerjaya yang lebih baik";
            document.getElementById('optReasonHealth').value = "masalah kesihatan";
            document.getElementById('optReasonFamily').value = "urusan keluarga";
            document.getElementById('optReasonStudy').value = "melanjutkan pelajaran";
        }

        // Also update the hidden reason input if it's currently showing one of the auto-values
        if (reasonSelect.value !== 'custom' && reasonSelect.value !== '') {
            reasonInput.value = reasonSelect.value;
        }

        if (autoEndDateText.innerText.includes('...') || autoEndDateText.innerText.includes('Pilih') || autoEndDateText.innerText.includes('Select')) {
            autoEndDateText.innerText = t.autoEndDatePlaceholder;
        }
    }

    // --- Initialization ---
    if(dateInput) {
        dateInput.valueAsDate = new Date();
    }

    const monthsBM = ['Januari', 'Februari', 'Mac', 'April', 'Mei', 'Jun', 'Julai', 'Ogos', 'September', 'Oktober', 'November', 'Disember'];
    const monthsEN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    function calculateEndDate() {
        const dateStr = dateInput.value;
        const noticeVal = noticeSelect.value;
        const lang = languageInput.value;

        if (!dateStr) return { formattedEndDate: "" };

        const dateObj = new Date(dateStr);
        const endDateObj = new Date(dateObj);
        let isCustomUnknown = false;

        if (noticeVal === "1") {
            endDateObj.setMonth(endDateObj.getMonth() + 1);
        } else if (noticeVal === "2") {
            endDateObj.setMonth(endDateObj.getMonth() + 2);
        } else if (noticeVal === "0") {
            endDateObj.setDate(endDateObj.getDate() + 1);
        } else if (noticeVal === "custom") {
            const customVal = customNoticeInput.value.trim();
            let num = parseInt(customVal.replace(/[^\d]/g, ''));
            if (!isNaN(num) && num > 0) {
                if (customVal.toLowerCase().includes('hari') || customVal.toLowerCase().includes('day')) {
                    endDateObj.setDate(endDateObj.getDate() + num);
                } else if (customVal.toLowerCase().includes('minggu') || customVal.toLowerCase().includes('week')) {
                    endDateObj.setDate(endDateObj.getDate() + (num * 7));
                } else if (customVal.toLowerCase().includes('bulan') || customVal.toLowerCase().includes('month')) {
                    endDateObj.setMonth(endDateObj.getMonth() + num);
                } else {
                    isCustomUnknown = true;
                }
            } else {
                isCustomUnknown = true;
            }
        }

        if (isCustomUnknown && noticeVal === 'custom' && !customNoticeInput.value) {
            autoEndDateText.innerText = lang === 'bm' ? "Sila isi tempoh custom..." : "Please fill custom period...";
            return { formattedEndDate: "" };
        }

        const formattedEndDate = isCustomUnknown 
            ? (lang === 'bm' ? "[Tarikh Akhir Bekerja]" : "[Final Working Date]")
            : (lang === 'bm' 
                ? `${endDateObj.getDate()} ${monthsBM[endDateObj.getMonth()]} ${dateObj.getFullYear()}`
                : `${endDateObj.getDate()} ${monthsEN[endDateObj.getMonth()]} ${dateObj.getFullYear()}`);

        autoEndDateText.innerText = formattedEndDate;
        return { endDateObj, formattedEndDate };
    }

    function showToast(message) {
        const container = document.getElementById('toastContainer');
        if (!container) return;
        
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<i class="ph ph-warning-circle"></i> <span>${message}</span>`;
        
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'toastOut 0.3s forwards';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
    
    function validateForm(showFeedback = false) {
        const lang = languageInput.value;
        const t = translations[lang];
        
        const requiredFields = [
            'name', 'phone', 'email', 'position', 
            'company', 'recipient', 'date'
        ];
        
        let firstInvalid = null;
        let allFilled = true;
        
        requiredFields.forEach(id => {
            const el = document.getElementById(id);
            if (!el || el.value.trim() === "") {
                allFilled = false;
                if (showFeedback) {
                    el.classList.add('invalid');
                    if (!firstInvalid) firstInvalid = el;
                }
            } else {
                el.classList.remove('invalid');
            }
        });

        // Specific email validation
        const emailValid = emailInput.value.trim() === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
        if (showFeedback && emailInput.value && !emailValid) {
            emailInput.classList.add('invalid');
            if (!firstInvalid) firstInvalid = emailInput;
        }
        
        // Notice validation
        let noticeValid = noticeSelect.value !== "";
        if (noticeSelect.value === 'custom' && !customNoticeInput.value.trim()) {
            noticeValid = false;
            if (showFeedback) {
                customNoticeInput.classList.add('invalid');
                if (!firstInvalid) firstInvalid = customNoticeInput;
            }
        }

        // Resume validation
        const resumeUploaded = resumeUploadedFile !== null;
        if (showFeedback && !resumeUploaded) {
            resumeDropzone.classList.add('invalid');
            if (!firstInvalid) firstInvalid = resumeDropzone;
        } else {
            resumeDropzone.classList.remove('invalid');
        }
        
        if (resumeUploaded) {
            resumeError.style.display = 'none';
        }

        const isFormValid = allFilled && emailValid && noticeValid && resumeUploaded;
        
        if (showFeedback && !isFormValid) {
            if (!emailValid) {
                alert(t.errEmail);
            } else if (!allFilled) {
                showToast(t.errEmpty);
            } else if (!resumeUploaded) {
                showToast(t.errResume);
            } else if (!noticeValid) {
                showToast(t.errNotice);
            }
            
            if (firstInvalid) {
                firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
        
        return isFormValid;
    }

    [
        'name', 'phone', 'email', 'position', 
        'company', 'recipient', 'date', 'notice', 'customNotice'
    ].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', (e) => {
                if (id === 'phone') {
                    // Strips non-digit characters
                    e.target.value = e.target.value.replace(/\D/g, '');
                }
                if (e.target.value.trim() !== "") e.target.classList.remove('invalid');
                validateForm(false);
            });
            el.addEventListener('change', () => validateForm(false));
        }
    });

    [dateInput, noticeSelect, customNoticeInput, languageInput].forEach(el => {
        if (el) {
            el.addEventListener('change', calculateEndDate);
            el.addEventListener('input', calculateEndDate);
        }
    });

    calculateEndDate();

    if (noticeSelect) {
        noticeSelect.addEventListener('change', (e) => {
            if (e.target.value === 'custom') {
                customNoticeGroup.style.display = 'block';
                customNoticeInput.focus();
            } else {
                customNoticeGroup.style.display = 'none';
            }
        });
    }

    if (reasonSelect) {
        reasonSelect.addEventListener('change', (e) => {
            if (e.target.value === 'custom') {
                customReasonGroup.style.display = 'block';
                reasonInput.focus();
            } else {
                customReasonGroup.style.display = 'none';
                reasonInput.value = e.target.value;
            }
        });
    }

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            toggleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const lang = btn.getAttribute('data-value');
            languageInput.value = lang;
            updateFormLanguage(lang);
            calculateEndDate();
        });
    });

    if (enableEsignCheckbox) {
        enableEsignCheckbox.addEventListener('change', (e) => {
            esignModule.style.display = e.target.checked ? 'block' : 'none';
            if (e.target.checked) resizeCanvas();
        });
    }

    esignTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            esignTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const target = btn.getAttribute('data-tab');
            esignTabs.forEach(t => t.style.display = t.id === target + 'Tab' ? 'block' : 'none');
            if (target === 'draw') resizeCanvas();
        });
    });

    const ctx = canvas ? canvas.getContext('2d') : null;
    let drawing = false;

    function resizeCanvas() {
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
    }

    function getMousePos(e) {
        if (!canvas) return { x: 0, y: 0 };
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    }

    if (canvas) {
        canvas.addEventListener('mousedown', (e) => {
            drawing = true;
            const pos = getMousePos(e);
            ctx.beginPath();
            ctx.moveTo(pos.x, pos.y);
        });
        canvas.addEventListener('mousemove', (e) => {
            if (!drawing) return;
            const pos = getMousePos(e);
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
        });
        canvas.addEventListener('mouseup', () => {
            drawing = false;
            signatureImage = canvas.toDataURL();
        });
        canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            drawing = true;
            const pos = getMousePos(e);
            ctx.beginPath();
            ctx.moveTo(pos.x, pos.y);
        });
        canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (!drawing) return;
            const pos = getMousePos(e);
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
        });
        canvas.addEventListener('touchend', () => {
            drawing = false;
            signatureImage = canvas.toDataURL();
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            // Re-calling resizeCanvas resets the canvas dimensions and clears the buffer
            resizeCanvas();
            signatureImage = null;
        });
    }

    if (sigUpload) {
        sigUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => { signatureImage = event.target.result; };
                reader.readAsDataURL(file);
            }
        });
    }

    // --- Resume Upload Handlers ---
    let resumeUploadedFile = null;

    function handleFile(file) {
        if (!file) return;

        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!allowedTypes.includes(file.type) && !file.name.match(/\.(pdf|doc|docx)$/i)) {
            alert(languageInput.value === 'bm' ? 'Sila muat naik fail PDF, DOC atau DOCX sahaja.' : 'Please upload PDF, DOC or DOCX files only.');
            return;
        }

        if (file.size > maxSize) {
            alert(languageInput.value === 'bm' ? 'Saiz fail mestilah kurang daripada 5MB.' : 'File size must be less than 5MB.');
            return;
        }

        resumeUploadedFile = file;
        fileNameDisplay.innerText = file.name;
        fileUploadStatus.style.display = 'flex';
        
        // Mocking a file object update for the input so validation picks it up
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        resumeFile.files = dataTransfer.files;
        
        resumeDropzone.classList.remove('invalid');
        validateForm(false);
    }

    resumeDropzone.addEventListener('click', () => resumeFile.click());

    resumeFile.addEventListener('change', (e) => {
        handleFile(e.target.files[0]);
    });

    resumeDropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        resumeDropzone.classList.add('dragover');
    });

    resumeDropzone.addEventListener('dragleave', () => {
        resumeDropzone.classList.remove('dragover');
    });

    resumeDropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        resumeDropzone.classList.remove('dragover');
        handleFile(e.dataTransfer.files[0]);
    });

    removeFileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        resumeUploadedFile = null;
        resumeFile.value = '';
        fileUploadStatus.style.display = 'none';
        validateForm(false);
    });

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (!validateForm(true)) {
                return;
            }

            const formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                position: document.getElementById('position').value,
                company: document.getElementById('company').value,
                recipient: document.getElementById('recipient').value,
                date: document.getElementById('date').value,
                notice: document.getElementById('notice').value === 'custom' ? document.getElementById('customNotice').value : document.getElementById('notice').value,
                reason: document.getElementById('reason').value,
                language: document.getElementById('language').value
            };

            const name = formData.name;
            const phone = formData.phone;
            const position = formData.position;
            const company = formData.company;
            const recipient = formData.recipient;
            const dateStr = formData.date;
            const lang = formData.language;
            const reason = formData.reason;

            const dateObj = new Date(dateStr);
            const monthsBM = ['Januari', 'Februari', 'Mac', 'April', 'Mei', 'Jun', 'Julai', 'Ogos', 'September', 'Oktober', 'November', 'Disember'];
            const monthsEN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            
            const formattedDate = lang === 'bm' 
                ? (dateObj.getDate() ? `${dateObj.getDate()} ${monthsBM[dateObj.getMonth()]} ${dateObj.getFullYear()}` : "")
                : (dateObj.getDate() ? `${dateObj.getDate()} ${monthsEN[dateObj.getMonth()]} ${dateObj.getFullYear()}` : "");

            const { formattedEndDate } = calculateEndDate();

            let noticeText = '';
            if (noticeSelect.value === '0') noticeText = lang === 'bm' ? '24 jam' : '24 hours';
            else if (noticeSelect.value === '1') noticeText = lang === 'bm' ? '1 bulan' : '1 month';
            else if (noticeSelect.value === '2') noticeText = lang === 'bm' ? '2 bulan' : '2 months';
            else noticeText = customNoticeInput.value || (lang === 'bm' ? '[Tempoh Notis]' : '[Notice Period]');

            let signatureMarkup = '';
            if (enableEsignCheckbox.checked && signatureImage) {
                signatureMarkup = `<img src="${signatureImage}" class="signature-img" style="max-height: 80px; display: block; margin: 10px 0;" alt="Signature">`;
            } else {
                signatureMarkup = `<div style="margin-top:20px; border-bottom: 1px dashed #000; width: 200px; height: 40px;"></div>`;
            }

            const letterHTML = (lang === 'bm') ? 
`<div class="letter-content" style="color: #2c3e50 !important; display: block !important;">
<p style="margin-bottom: 0.8rem;">Tarikh: ${formattedDate}</p>
<p style="margin-bottom: 0.8rem;">Kepada,<br>${recipient}<br>${company}</p>
<p style="margin-bottom: 0.8rem;">Tuan/Puan,</p>
<p style="margin-bottom: 1rem; border-bottom: 1.5px solid #2c3e50; display: inline-block;"><b>NOTIS PELETAKAN JAWATAN</b></p>
<p style="margin-bottom: 0.8rem;">Dengan segala hormatnya, saya <b>${name}</b> yang memegang jawatan <b>${position}</b> di ${company}, dengan ini ingin memaklumkan hasrat saya untuk meletak jawatan daripada syarikat ini.</p>
<p style="margin-bottom: 0.8rem;">Selaras dengan tempoh notis yang ditetapkan iaitu selama <b>${noticeText}</b>, hari terakhir saya bekerja adalah pada <b>${formattedEndDate}</b>. Penerimaan notis ini mengambil kira prosidural yang tertakluk kepada undang-undang syarikat.${reason ? ` Surat ini saya kemukakan atas sebab ${reason}.` : ''} Saya berhasrat untuk memastikan proses peralihan berjalan dengan lancar dan akan memberikan kerjasama sepenuhnya dalam urusan penyerahan tugas.</p>
<p style="margin-bottom: 0.8rem;">Saya mengambil kesempatan ini untuk merakamkan setinggi-tinggi penghargaan kepada pihak pengurusan dan rakan-rakan sekerja atas segala bimbingan, sokongan, dan pengalaman berharga yang telah diberikan sepanjang tempoh perkhidmatan saya.</p>
<p style="margin-bottom: 0.8rem;">Sekian, terima kasih.</p>
<p style="margin-bottom: 0.3rem;">Yang ikhlas,</p>
<div class="signature-block">
${signatureMarkup}
<p style="margin-top: 0.5rem;"><b>${name}</b><br>${position}<br>${phone}</p>
</div>
</div>` : 
`<div class="letter-content" style="color: #2c3e50 !important; display: block !important;">
<p style="margin-bottom: 0.8rem;">Date: ${formattedDate}</p>
<p style="margin-bottom: 0.8rem;">To,<br>${recipient}<br>${company}</p>
<p style="margin-bottom: 0.8rem;">Dear Sir/Madam,</p>
<p style="margin-bottom: 1rem; border-bottom: 1.5px solid #2c3e50; display: inline-block;"><b>NOTICE OF RESIGNATION</b></p>
<p style="margin-bottom: 0.8rem;">Please accept this letter as formal notification of my intention to resign from my position as <b>${position}</b> at ${company}.</p>
<p style="margin-bottom: 0.8rem;">In accordance with my notice period of <b>${noticeText}</b>, my final day will be <b>${formattedEndDate}</b>.${reason ? ` My departure is due to ${reason}.` : ''} I wish to ensure a smooth transition during this period and will fully cooperate with the handover of my duties and responsibilities.</p>
<p style="margin-bottom: 0.8rem;">I would like to take this opportunity to express my sincere gratitude to the management and my colleagues for the guidance, support, and invaluable experience I have gained during my time with the company.</p>
<p style="margin-bottom: 0.8rem;">Thank you.</p>
<p style="margin-bottom: 0.3rem;">Sincerely,</p>
<div class="signature-block">
${signatureMarkup}
<p style="margin-top: 0.5rem;"><b>${name}</b><br>${position}<br>${phone}</p>
</div>
</div>`;

            letterOutput.innerHTML = letterHTML;
            if(window.innerWidth <= 900) letterOutput.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // --- Background Data Submission ---
            try {
                fetch(scriptURL, { 
                    method: 'POST', 
                    mode: 'no-cors', 
                    body: JSON.stringify(formData) 
                });
            } catch (err) {}
        });
    }

    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const textToCopy = letterOutput.innerText;
            if(textToCopy.includes('Sila isi borang')) {
                alert('Sila jana surat terlebih dahulu.');
                return;
            }
            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = copyBtn.innerHTML;
                copyBtn.innerHTML = `<i class="ph ph-check"></i> Berjaya Disalin`;
                setTimeout(() => { copyBtn.innerHTML = originalText; }, 2000);
            });
        });
    }

    if (downloadPdfBtn) {
        downloadPdfBtn.addEventListener('click', () => {
            const letterContent = document.querySelector('.letter-content');
            if (!letterContent) {
                alert(languageInput.value === 'bm' ? 'Sila jana surat terlebih dahulu.' : 'Please generate the letter first.');
                return;
            }

            const printBuffer = document.getElementById('printBuffer');
            
            // Clone the letter content and clean it up for printing
            const clone = letterContent.cloneNode(true);
            
            // Clear buffer and append clone
            printBuffer.innerHTML = '';
            printBuffer.appendChild(clone);

            // Trigger print with a small delay for safety
            setTimeout(() => {
                window.print();
                // Clean up buffer after print dialog closes
                printBuffer.innerHTML = '';
            }, 300);
        });
    }

    faqQuestions.forEach(q => {
        q.addEventListener('click', () => {
            const answer = q.nextElementSibling;
            const isOpen = answer.style.display === 'block';
            document.querySelectorAll('.faq-answer').forEach(a => a.style.display = 'none');
            document.querySelectorAll('.faq-question').forEach(aq => aq.classList.remove('active'));
            if (!isOpen) {
                answer.style.display = 'block';
                q.classList.add('active');
            }
        });
    });
});
