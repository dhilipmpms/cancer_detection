// ===== AI Analysis Page JS =====
let uploadedFile = null;

document.addEventListener('DOMContentLoaded', () => {
    const uploadZone = document.getElementById('uploadZone');
    const fileInput = document.getElementById('fileInput');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const removeBtn = document.getElementById('removeImage');

    // Click to upload
    uploadZone.addEventListener('click', (e) => {
        if (e.target.id !== 'removeImage') fileInput.click();
    });

    // File input change
    fileInput.addEventListener('change', (e) => {
        if (e.target.files[0]) handleFile(e.target.files[0]);
    });

    // Drag & drop
    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.classList.add('dragover');
    });

    uploadZone.addEventListener('dragleave', () => {
        uploadZone.classList.remove('dragover');
    });

    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.classList.remove('dragover');
        if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
    });

    // Remove image
    removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        resetUpload();
    });

    // Analyze button
    analyzeBtn.addEventListener('click', runAnalysis);

    // Init scan type selection visual
    document.getElementById('ctLabel').style.borderColor = '#2563EB';
    document.getElementById('ctLabel').style.background = '#EFF6FF';
});

function handleFile(file) {
    if (!file.type.startsWith('image/')) {
        alert('Please upload an image file (JPEG, PNG, DICOM)');
        return;
    }

    uploadedFile = file;
    const reader = new FileReader();

    reader.onload = (e) => {
        document.getElementById('previewImg').src = e.target.result;
        document.getElementById('fileName').textContent = `${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`;
        document.getElementById('uploadPlaceholder').style.display = 'none';
        document.getElementById('imagePreview').style.display = 'block';
        document.getElementById('uploadZone').classList.add('has-image');
        document.getElementById('analyzeBtn').disabled = false;
    };

    reader.readAsDataURL(file);
}

function resetUpload() {
    uploadedFile = null;
    document.getElementById('fileInput').value = '';
    document.getElementById('uploadPlaceholder').style.display = 'block';
    document.getElementById('imagePreview').style.display = 'none';
    document.getElementById('uploadZone').classList.remove('has-image');
    document.getElementById('analyzeBtn').disabled = true;
}

async function runAnalysis() {
    if (!uploadedFile) return;

    const analyzeBtn = document.getElementById('analyzeBtn');
    const processingCard = document.getElementById('processingCard');
    const resultsPlaceholder = document.getElementById('resultsPlaceholder');
    const resultCard = document.getElementById('resultCard');

    // Show processing
    analyzeBtn.disabled = true;
    analyzeBtn.innerHTML = '<svg class="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg> Processing...';
    processingCard.style.display = 'block';
    resultsPlaceholder.style.display = 'none';
    resultCard.style.display = 'none';

    try {
        const result = await MockAPI.getPredictionResult(uploadedFile);
        showResult(result);
    } catch (err) {
        console.error('Analysis failed:', err);
        alert('Analysis failed. Please try again.');
    } finally {
        processingCard.style.display = 'none';
        analyzeBtn.disabled = false;
        analyzeBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg> Analyze with AI';
    }
}

function showResult(result) {
    const resultCard = document.getElementById('resultCard');
    const resultCardInner = document.getElementById('resultCardInner');
    const resultHeader = document.getElementById('resultHeader');

    resultCard.style.display = 'block';

    if (result.isPositive) {
        resultCardInner.className = 'result-card positive';
        resultHeader.className = 'result-header-positive';
        resultHeader.innerHTML = `
      <div style="display:flex;align-items:center;gap:12px;">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        <div>
          <h3 style="font-size:1.3rem;font-weight:800;">⚠ Cancer Detected</h3>
          <p style="font-size:0.85rem;opacity:0.9;margin-top:2px;">Suspicious lesion identified in liver scan</p>
        </div>
      </div>
    `;
        document.getElementById('confidenceBar').className = 'confidence-fill danger';
        document.getElementById('tumorRegionBox').style.display = 'block';
    } else {
        resultCardInner.className = 'result-card negative';
        resultHeader.className = 'result-header-negative';
        resultHeader.innerHTML = `
      <div style="display:flex;align-items:center;gap:12px;">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        <div>
          <h3 style="font-size:1.3rem;font-weight:800;">✓ No Cancer Detected</h3>
          <p style="font-size:0.85rem;opacity:0.9;margin-top:2px;">No suspicious lesions found in the scan</p>
        </div>
      </div>
    `;
        document.getElementById('confidenceBar').className = 'confidence-fill';
        document.getElementById('tumorRegionBox').style.display = 'none';
    }

    // Animate confidence bar
    setTimeout(() => {
        document.getElementById('confidenceBar').style.width = result.confidence + '%';
        document.getElementById('confidenceValue').textContent = result.confidence + '%';
    }, 100);

    // Fill details
    document.getElementById('tumorLocation').textContent = result.tumorLocation || 'N/A';
    document.getElementById('tumorSize').textContent = result.tumorSize || 'N/A';
    document.getElementById('modelVersion').textContent = result.modelVersion;
    document.getElementById('processingTimeResult').textContent = result.processingTime;
    document.getElementById('recommendation').textContent = result.recommendation;

    // Scroll to result
    resultCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function resetAnalysis() {
    resetUpload();
    document.getElementById('resultCard').style.display = 'none';
    document.getElementById('resultsPlaceholder').style.display = 'block';
    document.getElementById('confidenceBar').style.width = '0%';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
