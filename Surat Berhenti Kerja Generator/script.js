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

    // E-Sign Elements
    const enableEsignCheckbox = document.getElementById('enableEsign');
    const esignModule = document.getElementById('esignModule');
    const esignTabBtns = document.querySelectorAll('.esign-tab-btn');
    const esignTabs = document.querySelectorAll('.esign-tab-content');
    const canvas = document.getElementById('sigCanvas');
    const clearBtn = document.getElementById('clearSig');
    const sigUpload = document.getElementById('sigUpload');

    const faqQuestions = document.querySelectorAll('.faq-question');

    let signatureImage = null;

    // --- Translation Dictionary ---
    const translations = {
        bm: {
            genSubtext: "Lengkapkan butiran di bawah untuk menjana surat berhenti kerja rasmi secara automatik.",
            labelName: "NAMA PENUH ANDA",
            placeholderName: "Contoh: Amir Bin Ahmad",
            labelPosition: "JAWATAN ANDA",
            placeholderPosition: "Contoh: Marketing Executive",
            labelCompany: "NAMA SYARIKAT",
            placeholderCompany: "Contoh: ABC Sdn Bhd",
            labelRecipient: "NAMA PENERIMA (PENGURUS/HR)",
            placeholderRecipient: "Contoh: Encik Ali",
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
            labelName: "YOUR FULL NAME",
            placeholderName: "Example: Amir Bin Ahmad",
            labelPosition: "YOUR POSITION",
            placeholderPosition: "Example: Marketing Executive",
            labelCompany: "COMPANY NAME",
            placeholderCompany: "Example: ABC Sdn Bhd",
            labelRecipient: "RECIPIENT NAME (MANAGER/HR)",
            placeholderRecipient: "Example: Mr. Ali",
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
            if (ctx && canvas) ctx.clearRect(0, 0, canvas.width, canvas.height);
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

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const position = document.getElementById('position').value;
            const company = document.getElementById('company').value;
            const recipient = document.getElementById('recipient').value;
            const dateStr = dateInput.value;
            const lang = languageInput.value;
            const reason = reasonInput.value;

            const dateObj = new Date(dateStr);
            const formattedDate = lang === 'bm' 
                ? `${dateObj.getDate()} ${monthsBM[dateObj.getMonth()]} ${dateObj.getFullYear()}`
                : `${dateObj.getDate()} ${monthsEN[dateObj.getMonth()]} ${dateObj.getFullYear()}`;

            const { formattedEndDate } = calculateEndDate();

            let noticeText = '';
            if (noticeSelect.value === '0') noticeText = lang === 'bm' ? '24 jam' : '24 hours';
            else if (noticeSelect.value === '1') noticeText = lang === 'bm' ? '1 bulan' : '1 month';
            else if (noticeSelect.value === '2') noticeText = lang === 'bm' ? '2 bulan' : '2 months';
            else noticeText = customNoticeInput.value || (lang === 'bm' ? '[Tempoh Notis]' : '[Notice Period]');

            let signatureMarkup = '';
            if (enableEsignCheckbox.checked && signatureImage) {
                signatureMarkup = `<img src="${signatureImage}" class="signature-img" alt="Signature">`;
            } else {
                signatureMarkup = `<div style="margin-top:20px; border-bottom: 1px dashed #000; width: 200px; height: 40px;"></div>`;
            }

            let letterHTML = (lang === 'bm') ? `
${formattedDate}

${recipient}
${company}

Tuan/Puan,

<b>NOTIS PELETAKAN JAWATAN</b>

Dengan segala hormatnya, saya <b>${name}</b> yang memegang jawatan <b>${position}</b> di ${company}, dengan ini ingin memaklumkan hasrat saya untuk meletak jawatan daripada syarikat ini.

Selaras dengan tempoh notis yang ditetapkan iaitu selama <b>${noticeText}</b>, hari terakhir saya bekerja adalah pada <b>${formattedEndDate}</b>. Penerimaan notis ini mengambil kira prosidural yang tertakluk kepada undang-undang syarikat.${reason ? ` Surat ini saya kemukakan atas sebab ${reason}.` : ''} Saya berhasrat untuk memastikan proses peralihan berjalan dengan lancar dan akan memberikan kerjasama sepenuhnya dalam urusan penyerahan tugas.

Saya mengambil kesempatan ini untuk merakamkan setinggi-tinggi penghargaan kepada pihak pengurusan dan rakan-rakan sekerja atas segala bimbingan, sokongan, dan pengalaman berharga yang telah diberikan sepanjang tempoh perkhidmatan saya.

Sekian, terima kasih.


Yang ikhlas,


${signatureMarkup}
<b>${name}</b>
${position}
            ` : `
${formattedDate}

${recipient}
${company}

Dear Sir/Madam,

<b>NOTICE OF RESIGNATION</b>

Please accept this letter as formal notification of my intention to resign from my position as <b>${position}</b> at ${company}.

In accordance with my notice period of <b>${noticeText}</b>, my final day will be <b>${formattedEndDate}</b>.${reason ? ` My departure is due to ${reason}.` : ''} I wish to ensure a smooth transition during this period and will fully cooperate with the handover of my duties and responsibilities.

I would like to take this opportunity to express my sincere gratitude to the management and my colleagues for the guidance, support, and invaluable experience I have gained during my time with the company.

Thank you.


Sincerely,


${signatureMarkup}
<b>${name}</b>
${position}
            `;

            letterOutput.innerHTML = letterHTML.trim();
            if(window.innerWidth <= 900) letterOutput.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
            if (letterOutput.innerText.includes('Sila isi borang') || letterOutput.innerText.includes('Please fill')) {
                alert(languageInput.value === 'bm' ? 'Sila jana surat terlebih dahulu.' : 'Please generate the letter first.');
                return;
            }

            // Simple native browser print dialog (User chooses 'Save as PDF')
            window.print();
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
