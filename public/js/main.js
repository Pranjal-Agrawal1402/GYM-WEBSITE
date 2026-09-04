// Contact form: submit via fetch so the visitor gets instant feedback
// without a full page reload, and gets told exactly which field needs
// fixing if validation fails.
document.addEventListener('DOMContentLoaded', function () {
	var form = document.getElementById('contact-form');
	if (!form) return;

	var statusBox = document.getElementById('form-status');
	var submitBtn = document.getElementById('contact-submit');

	function clearFieldErrors() {
		form.querySelectorAll('.field-error').forEach(function (el) {
			el.textContent = '';
		});
		form.querySelectorAll('.has-error').forEach(function (el) {
			el.classList.remove('has-error');
		});
	}

	function showStatus(type, message) {
		statusBox.textContent = message;
		statusBox.className = 'form-status visible ' + type;
	}

	function showFieldErrors(errors) {
		Object.keys(errors).forEach(function (field) {
			var errEl = form.querySelector('[data-error-for="' + field + '"]');
			var inputEl = form.querySelector('[name="' + field + '"]');
			if (errEl) errEl.textContent = errors[field];
			if (inputEl) inputEl.classList.add('has-error');
		});
	}

	form.addEventListener('submit', function (event) {
		event.preventDefault();
		clearFieldErrors();
		statusBox.className = 'form-status';

		var formData = new FormData(form);
		var payload = {};
		formData.forEach(function (value, key) {
			payload[key] = value;
		});

		submitBtn.disabled = true;
		var originalLabel = submitBtn.textContent;
		submitBtn.textContent = 'Sending...';

		fetch('/contact', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload),
		})
			.then(function (res) {
				return res.json().then(function (data) {
					return { ok: res.ok, data: data };
				});
			})
			.then(function (result) {
				if (result.ok && result.data.success) {
					form.reset();
					showStatus('success', "Thanks — your message has been sent. We'll get back to you soon.");
				} else if (result.data.errors) {
					if (result.data.errors.form) {
						showStatus('error', result.data.errors.form);
					} else {
						showStatus('error', 'Please fix the highlighted fields and try again.');
						showFieldErrors(result.data.errors);
					}
				} else {
					showStatus('error', 'Something went wrong. Please try again.');
				}
			})
			.catch(function () {
				showStatus('error', 'Could not reach the server. Please check your connection and try again.');
			})
			.finally(function () {
				submitBtn.disabled = false;
				submitBtn.textContent = originalLabel;
				statusBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
			});
	});
});
