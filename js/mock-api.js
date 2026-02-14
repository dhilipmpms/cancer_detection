// ===== Mock API Module =====
// Simulates backend responses so the Python/REST API can be plugged in later.

const MockAPI = (() => {
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Random helper
  const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  // ----- Dashboard Summary -----
  async function getDashboardSummary() {
    await delay(800);
    return {
      totalScans: 2847,
      positiveCount: 412,
      negativeCount: 2435,
      accuracy: 96.8,
      recentActivity: [
        { id: 'P-1042', patient: 'Rajesh Kumar', result: 'negative', time: '12 min ago', confidence: 94.2 },
        { id: 'P-1041', patient: 'Ananya Sharma', result: 'positive', time: '28 min ago', confidence: 97.1 },
        { id: 'P-1040', patient: 'Mohammed Ali', result: 'negative', time: '45 min ago', confidence: 91.8 },
        { id: 'P-1039', patient: 'Priya Nair', result: 'negative', time: '1 hr ago', confidence: 89.5 },
        { id: 'P-1038', patient: 'Suresh Reddy', result: 'positive', time: '1.5 hr ago', confidence: 95.3 },
        { id: 'P-1037', patient: 'Fatima Begum', result: 'negative', time: '2 hr ago', confidence: 92.7 },
      ]
    };
  }

  // ----- AI Prediction -----
  async function getPredictionResult(imageFile) {
    await delay(2500); // Simulate AI processing time
    const isPositive = Math.random() > 0.55;
    const confidence = isPositive
      ? (rand(78, 98) + Math.random()).toFixed(1)
      : (rand(85, 99) + Math.random()).toFixed(1);

    return {
      prediction: isPositive ? 'Cancer Detected' : 'No Cancer Detected',
      isPositive,
      confidence: parseFloat(confidence),
      tumorLocation: isPositive ? 'Right lobe, Segment VII' : null,
      tumorSize: isPositive ? `${(rand(8, 45) / 10).toFixed(1)} cm` : null,
      recommendation: isPositive
        ? 'Immediate consultation with a hepatologist is strongly recommended. Consider biopsy and additional imaging (contrast-enhanced CT/MRI).'
        : 'No suspicious lesions identified. Routine follow-up recommended as per clinical guidelines.',
      modelVersion: 'LiverNet v3.2.1',
      processingTime: `${(rand(18, 42) / 10).toFixed(1)}s`,
      timestamp: new Date().toISOString()
    };
  }

  // ----- Patient History -----
  async function getPatientHistory() {
    await delay(600);
    return [
      { id: 'P-1042', name: 'Rajesh Kumar', age: 58, scanDate: '2026-02-14', scanType: 'CT', result: 'negative', confidence: 94.2, doctor: 'Dr. Mehra' },
      { id: 'P-1041', name: 'Ananya Sharma', age: 45, scanDate: '2026-02-14', scanType: 'MRI', result: 'positive', confidence: 97.1, doctor: 'Dr. Patel' },
      { id: 'P-1040', name: 'Mohammed Ali', age: 62, scanDate: '2026-02-13', scanType: 'CT', result: 'negative', confidence: 91.8, doctor: 'Dr. Mehra' },
      { id: 'P-1039', name: 'Priya Nair', age: 39, scanDate: '2026-02-13', scanType: 'MRI', result: 'negative', confidence: 89.5, doctor: 'Dr. Singh' },
      { id: 'P-1038', name: 'Suresh Reddy', age: 71, scanDate: '2026-02-12', scanType: 'CT', result: 'positive', confidence: 95.3, doctor: 'Dr. Patel' },
      { id: 'P-1037', name: 'Fatima Begum', age: 55, scanDate: '2026-02-12', scanType: 'CT', result: 'negative', confidence: 92.7, doctor: 'Dr. Mehra' },
      { id: 'P-1036', name: 'Vikram Joshi', age: 48, scanDate: '2026-02-11', scanType: 'MRI', result: 'positive', confidence: 88.9, doctor: 'Dr. Singh' },
      { id: 'P-1035', name: 'Lakshmi Devi', age: 66, scanDate: '2026-02-11', scanType: 'CT', result: 'negative', confidence: 96.4, doctor: 'Dr. Patel' },
      { id: 'P-1034', name: 'Arjun Menon', age: 53, scanDate: '2026-02-10', scanType: 'MRI', result: 'negative', confidence: 93.1, doctor: 'Dr. Mehra' },
      { id: 'P-1033', name: 'Kavitha Rao', age: 60, scanDate: '2026-02-10', scanType: 'CT', result: 'positive', confidence: 91.6, doctor: 'Dr. Singh' },
    ];
  }

  // ----- Analytics Data -----
  async function getAnalyticsData() {
    await delay(700);
    return {
      monthlyDetection: {
        labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
        positive: [32, 38, 29, 41, 35, 28],
        negative: [198, 212, 189, 225, 210, 195]
      },
      overallDistribution: {
        positive: 412,
        negative: 2435
      },
      modelPerformance: {
        labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
        accuracy: [94.2, 95.1, 95.8, 96.1, 96.5, 96.8],
        sensitivity: [91.5, 92.3, 93.0, 93.8, 94.2, 94.5],
        specificity: [95.8, 96.2, 96.9, 97.1, 97.4, 97.6]
      }
    };
  }

  // ----- System Info -----
  async function getSystemInfo() {
    await delay(400);
    return {
      model: {
        name: 'LiverNet CNN',
        type: 'Convolutional Neural Network (ResNet-50 backbone)',
        framework: 'TensorFlow 2.15 / PyTorch 2.1',
        lastUpdate: '2026-02-01',
        version: 'v3.2.1',
        trainingDataSize: '45,000+ annotated CT/MRI images',
        inputResolution: '512 × 512 pixels'
      },
      performance: {
        accuracy: 96.8,
        sensitivity: 94.5,
        specificity: 97.6,
        f1Score: 95.2,
        avgInferenceTime: '2.3s'
      },
      disclaimer: 'This AI system is designed to assist medical professionals in detecting potential liver cancer from CT and MRI scans. It does NOT replace professional medical diagnosis. All results should be verified by qualified healthcare professionals. This tool is for clinical decision support only.'
    };
  }

  return { getDashboardSummary, getPredictionResult, getPatientHistory, getAnalyticsData, getSystemInfo };
})();
