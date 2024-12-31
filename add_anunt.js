document.getElementById('anunt-adaugare').addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent the default form submission

  // Collect form data
  const announcement = {
    name: document.getElementById('name').value,
    title: document.getElementById('room').value,
    message: document.getElementById('message').value,
  };

  try {
    // Send a POST request to the correct server endpoint
    const response = await fetch('http://localhost:3000/save-announcement', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(announcement),
    });

    // Handle server response
    if (response.ok) {
      alert('Announcement saved successfully!');
      window.open("http://localhost:3000/anunturi.html")
    } else {
      alert('Failed to save announcement. Try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please check the console for details.');
  }
});
