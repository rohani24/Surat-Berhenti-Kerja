document.addEventListener('DOMContentLoaded', () => {
    // Set default date to today
    const dateInput = document.getElementById('date');
    if(dateInput) {
        dateInput.valueAsDate = new Date();
    }

    const form = document.getElementById('letterForm');
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const languageInput = document.getElementById('language');
    const letterOutput = document.getElementById('letterOutput');
    const copyBtn = document.getElementById('copyBtn');

    const sigYes = document.getElementById('sigYes');
    const sigNo = document.getElementById('sigNo');
    const signatureNameGroup = document.getElementById('signatureNameGroup');
    const signatureNameInput = document.getElementById('signatureName');

    const toggleSignatureInput = () => {
        if (sigYes.checked) {
            signatureNameGroup.style.display = 'block';
        } else {
            signatureNameGroup.style.display = 'none';
        }
    };

    if (sigYes) sigYes.addEventListener('change', toggleSignatureInput);
    if (sigNo) sigNo.addEventListener('change', toggleSignatureInput);

    if (signatureNameInput) {
        signatureNameInput.addEventListener('input', (e) => {
            const sigElement = letterOutput.querySelector('.signature-font');
            if (sigElement) {
                sigElement.innerText = e.target.value;
            }
        });
    }

    // Language toggle logic
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            toggleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            languageInput.value = btn.getAttribute('data-value');
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get values
        const name = document.getElementById('name').value;
        const position = document.getElementById('position').value;
        const company = document.getElementById('company').value;
        const recipient = document.getElementById('recipient').value;
        const dateStr = document.getElementById('date').value;
        const noticeVal = document.getElementById('notice').value;
        const reason = document.getElementById('reason').value;
        const lang = languageInput.value;

        // Format Date (e.g., 30 Mac 2026 or 30 March 2026)
        const dateObj = new Date(dateStr);
        const monthsBM = ['Januari', 'Februari', 'Mac', 'April', 'Mei', 'Jun', 'Julai', 'Ogos', 'September', 'Oktober', 'November', 'Disember'];
        const monthsEN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        
        const formattedDate = lang === 'bm' 
            ? `${dateObj.getDate()} ${monthsBM[dateObj.getMonth()]} ${dateObj.getFullYear()}`
            : `${dateObj.getDate()} ${monthsEN[dateObj.getMonth()]} ${dateObj.getFullYear()}`;

        // Calculate end date
        const endDateObj = new Date(dateObj);
        let noticeTextBM = "";
        let noticeTextEN = "";
        
        if (noticeVal === "1") {
            endDateObj.setMonth(endDateObj.getMonth() + 1);
            noticeTextBM = "1 bulan";
            noticeTextEN = "1 month";
        } else if (noticeVal === "2") {
            endDateObj.setMonth(endDateObj.getMonth() + 2);
            noticeTextBM = "2 bulan";
            noticeTextEN = "2 months";
        } else {
            // 24 hours
            endDateObj.setDate(endDateObj.getDate() + 1);
            noticeTextBM = "24 jam";
            noticeTextEN = "24 hours";
        }

        const formattedEndDate = lang === 'bm'
            ? `${endDateObj.getDate()} ${monthsBM[endDateObj.getMonth()]} ${endDateObj.getFullYear()}`
            : `${endDateObj.getDate()} ${monthsEN[endDateObj.getMonth()]} ${endDateObj.getFullYear()}`;

        const signatureVal = document.querySelector('input[name="auto_signature"]:checked').value;
        const signatureName = document.getElementById('signatureName') ? document.getElementById('signatureName').value : '';
        let signatureOutput = '';
        if (signatureVal === 'yes') {
            signatureOutput = `<div class="signature-font">${signatureName || name}</div>`;
        } else {
            signatureOutput = `_____________________`;
        }

        // Generate Letter content
        let letterHTML = '';

        if (lang === 'bm') {
            letterHTML = `
${formattedDate}

${recipient}
${company}

Tuan/Puan,

<b>NOTIS PELETAKAN JAWATAN</b>

Dengan segala hormatnya, saya <b>${name}</b> yang memegang jawatan <b>${position}</b> di ${company}, dengan ini ingin memaklumkan hasrat saya untuk meletak jawatan daripada syarikat ini.

Selaras dengan tempoh notis yang ditetapkan iaitu selama <b>${noticeTextBM}</b>, hari terakhir saya bekerja adalah pada <b>${formattedEndDate}</b>. Penerimaan notis ini mengambil kira prosidural yang tertakluk kepada undang-undang syarikat.${reason ? ` Surat ini saya kemukakan atas sebab ${reason}.` : ''} Saya berhasrat untuk memastikan proses peralihan berjalan dengan lancar dan akan memberikan kerjasama sepenuhnya dalam urusan penyerahan tugas.

Saya mengambil kesempatan ini untuk merakamkan setinggi-tinggi penghargaan kepada pihak pengurusan dan rakan-rakan sekerja atas segala bimbingan, sokongan, dan pengalaman berharga yang telah diberikan sepanjang tempoh perkhidmatan saya.

Sekian, terima kasih.


Yang ikhlas,


${signatureOutput}
<b>${name}</b>
${position}
            `;
        } else {
            letterHTML = `
${formattedDate}

${recipient}
${company}

Dear Sir/Madam,

<b>NOTICE OF RESIGNATION</b>

Please accept this letter as formal notification of my intention to resign from my position as <b>${position}</b> at ${company}.

In accordance with my notice period of <b>${noticeTextEN}</b>, my final day will be <b>${formattedEndDate}</b>.${reason ? ` I am leaving my position due to ${reason}.` : ''} I wish to ensure a smooth transition during this period and will fully cooperate with the handover of my duties and responsibilities.

I would like to take this opportunity to express my sincere gratitude to the management and my colleagues for the guidance, support, and invaluable experience I have gained during my time with the company.

Thank you.


Sincerely,


${signatureOutput}
<b>${name}</b>
${position}
            `;
        }

        letterOutput.innerHTML = letterHTML.trim();
        
        // Ensure scroll to output smoothly
        if(window.innerWidth <= 900) {
            letterOutput.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

    copyBtn.addEventListener('click', () => {
        const textToCopy = letterOutput.innerText;
        if(textToCopy.includes('Sila isi borang')) {
            alert('Sila jana surat terlebih dahulu untuk menyalin.');
            return;
        }
        
        navigator.clipboard.writeText(textToCopy).then(() => {
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = `&#10003; Berjaya Disalin`;
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
            }, 2500);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            alert('Gagal menyalin surat. Sila cuba salin secara manual.');
        });
    });
});
