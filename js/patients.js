// ===== Patients Page JS =====
let allPatients = [];

document.addEventListener('DOMContentLoaded', async () => {
    try {
        allPatients = await MockAPI.getPatientHistory();
        renderTable(allPatients);

        // Search
        document.getElementById('searchInput').addEventListener('input', filterPatients);
        document.getElementById('filterSelect').addEventListener('change', filterPatients);

        // Form submission
        document.getElementById('patientForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = e.target.querySelector('button[type="submit"]');
            btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Saved!';
            btn.style.background = 'linear-gradient(135deg, #059669, #10B981)';
            setTimeout(() => {
                btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg> Save Report';
                btn.style.background = '';
                e.target.reset();
            }, 2000);
        });

        // PDF download mock
        document.getElementById('downloadPdfBtn').addEventListener('click', () => {
            const btn = document.getElementById('downloadPdfBtn');
            btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Downloaded!';
            setTimeout(() => {
                btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Download PDF Report';
            }, 2000);
        });
    } catch (err) {
        console.error('Patient load error:', err);
    }
});

function filterPatients() {
    const search = document.getElementById('searchInput').value.toLowerCase();
    const filter = document.getElementById('filterSelect').value;

    let filtered = allPatients;

    if (search) {
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(search) ||
            p.id.toLowerCase().includes(search) ||
            p.doctor.toLowerCase().includes(search)
        );
    }

    if (filter !== 'all') {
        filtered = filtered.filter(p => p.result === filter);
    }

    renderTable(filtered);
}

function renderTable(patients) {
    const tbody = document.getElementById('patientTableBody');

    if (patients.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;padding:2rem;color:#94A3B8;">No patients found matching your criteria.</td></tr>';
        return;
    }

    tbody.innerHTML = patients.map(p => `
    <tr>
      <td><span style="font-weight:600;color:#2563EB;">${p.id}</span></td>
      <td style="font-weight:500;">${p.name}</td>
      <td>${p.age}</td>
      <td>${new Date(p.scanDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
      <td><span style="background:#F1F5F9;padding:3px 10px;border-radius:6px;font-size:0.78rem;font-weight:600;color:#475569;">${p.scanType}</span></td>
      <td>
        <span class="badge ${p.result === 'positive' ? 'badge-positive' : 'badge-negative'}">
          ${p.result === 'positive' ? '⚠ Positive' : '✓ Negative'}
        </span>
      </td>
      <td>
        <div style="display:flex;align-items:center;gap:8px;">
          <div class="confidence-bar" style="width:70px;">
            <div class="confidence-fill ${p.result === 'positive' ? 'danger' : ''}" style="width:${p.confidence}%"></div>
          </div>
          <span style="font-size:0.82rem;font-weight:600;">${p.confidence}%</span>
        </div>
      </td>
      <td style="color:#64748B;font-size:0.85rem;">${p.doctor}</td>
    </tr>
  `).join('');
}
