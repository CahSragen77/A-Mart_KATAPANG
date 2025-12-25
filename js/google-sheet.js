/**
 * GOOGLE SHEETS INTEGRATION FOR A-MART KATAPANG
 * Version: 1.0.0
 * 
 * INSTRUKSI SETUP:
 * 1. Buat Google Spreadsheet baru
 * 2. Tambahkan header: No., Nama Lengkap, WhatsApp, Email, Alamat, Sumber Info, Tanggal
 * 3. Publish spreadsheet: File > Share > Publish to web
 * 4. Buat Google Apps Script: Extensions > Apps Script
 * 5. Copy script dari bawah file ini
 * 6. Deploy sebagai Web App
 * 7. Copy URL Web App dan paste di variabel WEB_APP_URL
 */

// ============================================
// 1. CONFIGURATION
// ============================================
const GOOGLE_SHEETS_CONFIG = {
    // Ganti dengan URL Web App Anda
    WEB_APP_URL: 'github.com/CahSragen77/A-Mart_KATAPANG/blob/main/js/google-sheet.js',
    
    // Sheet name
    SHEET_NAME: 'BukuTamu',
    
    // Success message
    SUCCESS_MESSAGE: 'Data berhasil dikirim ke Google Sheets!',
    
    // Error message
    ERROR_MESSAGE: 'Gagal mengirim data. Silakan coba lagi.'
};

// ============================================
// 2. SUBMIT TO GOOGLE SHEETS
// ============================================
async function submitToGoogleSheets(formData) {
    try {
        console.log('Mengirim data ke Google Sheets:', formData);
        
        // Prepare data for Google Sheets
        const sheetData = {
            nama: formData.nama || '',
            whatsapp: formData.whatsapp || '',
            email: formData.email || '',
            alamat: formData.alamat || '',
            info: formData.info_tambahan || '',
            timestamp: new Date().toISOString()
        };
        
        // Send to Google Sheets via fetch
        const response = await fetch(GOOGLE_SHEETS_CONFIG.WEB_APP_URL, {
            method: 'POST',
            mode: 'no-cors', // Important for Google Apps Script
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sheetData)
        });
        
        // Note: With 'no-cors', we can't read the response
        // But we assume it's successful if no network error
        console.log('Data sent to Google Sheets successfully');
        
        // Send WhatsApp notification with coupon
        const couponCode = sendWhatsAppNotification(formData);
        
        return {
            success: true,
            message: GOOGLE_SHEETS_CONFIG.SUCCESS_MESSAGE,
            couponCode: couponCode
        };
        
    } catch (error) {
        console.error('Error submitting to Google Sheets:', error);
        
        // Fallback: Save to localStorage
        saveToLocalStorage(formData);
        
        return {
            success: false,
            message: GOOGLE_SHEETS_CONFIG.ERROR_MESSAGE,
            error: error.message
        };
    }
}

// ============================================
// 3. LOCAL STORAGE FALLBACK
// ============================================
function saveToLocalStorage(formData) {
    try {
        // Get existing data
        const existingData = JSON.parse(localStorage.getItem('amart_guestbook') || '[]');
        
        // Add new data with timestamp
        const newEntry = {
            ...formData,
            id: Date.now(),
            timestamp: new Date().toISOString()
        };
        
        // Save back to localStorage
        existingData.push(newEntry);
        localStorage.setItem('amart_guestbook', JSON.stringify(existingData));
        
        console.log('Data saved to localStorage:', newEntry);
        
        // Send WhatsApp notification
        sendWhatsAppNotification(formData);
        
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
    }
}

// ============================================
// 4. EXPORT LOCAL STORAGE DATA
// ============================================
function exportLocalStorageData() {
    try {
        const data = JSON.parse(localStorage.getItem('amart_guestbook') || '[]');
        
        if (data.length === 0) {
            alert('Tidak ada data di localStorage.');
            return;
        }
        
        // Convert to CSV
        const headers = ['No.', 'Nama', 'WhatsApp', 'Email', 'Alamat', 'Sumber Info', 'Tanggal'];
        const csvRows = [headers.join(',')];
        
        data.forEach((item, index) => {
            const row = [
                index + 1,
                `"${item.nama || ''}"`,
                `"${item.whatsapp || ''}"`,
                `"${item.email || ''}"`,
                `"${item.alamat || ''}"`,
                `"${item.info_tambahan || ''}"`,
                `"${new Date(item.timestamp).toLocaleString('id-ID')}"`
            ];
            csvRows.push(row.join(','));
        });
        
        const csvString = csvRows.join('\n');
        
        // Download CSV
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `buku-tamu-amart-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        alert(`Data berhasil diexport (${data.length} entri)`);
        
    } catch (error) {
        console.error('Error exporting data:', error);
        alert('Gagal mengexport data.');
    }
}

// ============================================
// 5. INTEGRATE WITH MAIN FORM
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Replace form submission with Google Sheets integration
    const form = document.getElementById('guestbookForm');
    
    if (form) {
        // Remove existing submit event
        const newForm = form.cloneNode(true);
        form.parentNode.replaceChild(newForm, form);
        
        // Add new submit event
        newForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Validate form
            if (!validateForm()) {
                return;
            }
            
            // Get form data
            const formData = {
                nama: this.querySelector('#nama').value,
                whatsapp: this.querySelector('#whatsapp').value,
                email: this.querySelector('#email').value,
                alamat: this.querySelector('#alamat').value,
                info_tambahan: this.querySelector('#info').value
            };
            
            // Show loading
            const submitBtn = this.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim ke Google Sheets...';
            submitBtn.disabled = true;
            
            try {
                // Submit to Google Sheets
                const result = await submitToGoogleSheets(formData);
                
                if (result.success) {
                    showMessage('success', `✅ ${result.message} Kupon: ${result.couponCode}`);
                    
                    // Reset form
                    this.reset();
                } else {
                    showMessage('error', `⚠️ ${result.message} Data disimpan lokal.`);
                }
                
            } catch (error) {
                console.error('Form submission error:', error);
                showMessage('error', '⚠️ Terjadi kesalahan. Data disimpan lokal.');
            } finally {
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
    
    // Add export button for admin (hidden by default)
    const exportBtn = document.createElement('button');
    exportBtn.id = 'exportDataBtn';
    exportBtn.innerHTML = '<i class="fas fa-download"></i> Export Data';
    exportBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #264653;
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 5px;
        cursor: pointer;
        z-index: 9999;
        font-size: 12px;
        display: none; /* Hidden by default, show with password */
    `;
    exportBtn.onclick = exportLocalStorageData;
    document.body.appendChild(exportBtn);
    
    // Add password prompt for admin access
    window.addEventListener('keydown', function(e) {
        // Ctrl+Shift+E to show export button
        if (e.ctrlKey && e.shiftKey && e.key === 'E') {
            const password = prompt('Masukkan password admin:');
            if (password === 'amart123') { // Change this password!
                exportBtn.style.display = 'block';
                alert('Admin mode aktif. Export button ditampilkan.');
            }
        }
    });
});

// ============================================
// GOOGLE APPS SCRIPT CODE (Copy ini ke Google Apps Script)
// ============================================
/*
// Google Apps Script untuk menerima data dari web

function doPost(e) {
  try {
    // Parse JSON data
    const jsonData = JSON.parse(e.postData.contents);
    
    // Get active spreadsheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("BukuTamu") || ss.insertSheet("BukuTamu");
    
    // Set headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 7).setValues([[
        "No.", 
        "Nama Lengkap", 
        "Nomor WhatsApp", 
        "Email Aktif", 
        "Alamat Lengkap", 
        "Sumber Info", 
        "Tanggal"
      ]]);
    }
    
    // Add new row
    const lastRow = sheet.getLastRow() + 1;
    const timestamp = new Date(jsonData.timestamp || new Date());
    
    sheet.getRange(lastRow, 1, 1, 7).setValues([[
      lastRow - 1, // No.
      jsonData.nama || "",
      jsonData.whatsapp || "",
      jsonData.email || "",
      jsonData.alamat || "",
      jsonData.info || "",
      Utilities.formatDate(timestamp, "Asia/Jakarta", "dd/MM/yyyy HH:mm:ss")
    ]]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        message: "Data berhasil disimpan",
        row: lastRow 
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      status: "OK", 
      message: "Google Sheets API is running" 
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
*/
