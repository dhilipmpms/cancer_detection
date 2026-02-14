// ===== Dashboard Page JS =====
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const data = await MockAPI.getDashboardSummary();

        // Animate counters
        App.animateCounter(document.getElementById('totalScans'), data.totalScans);
        App.animateCounter(document.getElementById('positiveCount'), data.positiveCount);
        App.animateCounter(document.getElementById('negativeCount'), data.negativeCount);
        App.animateCounter(document.getElementById('accuracy'), data.accuracy, 1500, '%');

        // Populate recent activity table
        const tbody = document.getElementById('recentActivity');
        tbody.innerHTML = data.recentActivity.map(item => `
      <tr>
        <td><span style="font-weight:600;color:#2563EB;">${item.id}</span></td>
        <td>${item.patient}</td>
        <td>
          <span class="badge ${item.result === 'positive' ? 'badge-positive' : 'badge-negative'}">
            ${item.result === 'positive' ? '⚠ Positive' : '✓ Negative'}
          </span>
        </td>
        <td>
          <div style="display:flex;align-items:center;gap:8px;">
            <div class="confidence-bar" style="width:80px;">
              <div class="confidence-fill ${item.result === 'positive' ? 'danger' : ''}" style="width:${item.confidence}%"></div>
            </div>
            <span style="font-size:0.82rem;font-weight:600;">${item.confidence}%</span>
          </div>
        </td>
        <td style="color:#64748B;font-size:0.82rem;">${item.time}</td>
      </tr>
    `).join('');

        // Update sidebar doctor info
        const user = App.checkAuth();
        if (user) {
            const nameEl = document.getElementById('sidebarDoctorName');
            if (nameEl) nameEl.textContent = user.name;
            const avatarEl = document.getElementById('sidebarAvatar');
            if (avatarEl) {
                const initials = user.name.replace('Dr. ', '').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
                avatarEl.textContent = initials;
            }
        }
    } catch (err) {
        console.error('Dashboard load error:', err);
    }
});
