const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const direction = document.getElementById('direction');
const resultDiv = document.getElementById('result');
const examplesDiv = document.getElementById('examples');

searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    searchBtn.click();
  }
});

searchInput.addEventListener('input', () => {
  resultDiv.textContent = '';
  examplesDiv.innerHTML = '';
});

searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (!query) return;

  const langpair = direction.value;
  resultDiv.textContent = 'Searching...';
  examplesDiv.innerHTML = '';

  fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(query)}&langpair=${langpair}`)
    .then(response => response.json())
    .then(data => {
      const matches = data.matches || [];

      if (matches.length === 0) {
        resultDiv.textContent = 'No translation found.';
        return;
      }

       const sorted = [...matches].sort((a, b) => {
        const matchDiff = b.match - a.match;
        // If match scores are close (within 0.05), treat as a tie and
        // let usage count decide instead. Otherwise, trust the match score.
        if (Math.abs(matchDiff) > 0.05) return matchDiff;
        return (b['usage-count'] || 0) - (a['usage-count'] || 0);
      });

      const best = sorted[0];

      // MyMemory sometimes echoes the input back instead of admitting
      // it has no real translation — catch that case explicitly.
      if (best.translation.trim().toLowerCase() === query.trim().toLowerCase()) {
        resultDiv.textContent = 'No translation found for this word.';
        return;
      }

      resultDiv.textContent = best.translation;

      // Show the rest as examples, skipping the one we already used as the main result
      sorted.slice(1).forEach(match => {
        const item = document.createElement('div');
        item.className = 'example-item';
        item.textContent = `${match.segment} → ${match.translation}`;
        examplesDiv.appendChild(item);
      });
    })
    .catch(error => {
      resultDiv.textContent = 'Something went wrong. Please try again.';
      console.error(error);
    });
});