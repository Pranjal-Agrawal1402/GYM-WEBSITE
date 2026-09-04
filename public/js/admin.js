// Client-side search filter for the entries table. Filtering happens
// entirely in the browser since the whole entry list is already on the
// page — no extra round trip needed for a table this size.
document.addEventListener('DOMContentLoaded', function () {
	var searchInput = document.getElementById('admin-search');
	var table = document.getElementById('admin-entries-table');
	var countLabel = document.getElementById('admin-search-count');
	if (!searchInput || !table) return;

	var rows = Array.prototype.slice.call(table.querySelectorAll('tbody tr'));

	function applyFilter() {
		var term = searchInput.value.trim().toLowerCase();
		var visible = 0;

		rows.forEach(function (row) {
			var matches = !term || row.getAttribute('data-search').indexOf(term) !== -1;
			row.classList.toggle('is-hidden', !matches);
			if (matches) visible++;
		});

		if (countLabel) {
			countLabel.textContent = term ? visible + ' of ' + rows.length + ' shown' : '';
		}
	}

	searchInput.addEventListener('input', applyFilter);
});
