 async function loadAnnouncements() {
            try {
                const response = await fetch('http://localhost:3000/get-announcements');
                if (!response.ok) {
                    throw new Error('Failed to fetch announcements');
                }
                const announcements = await response.json();

                const container = document.getElementById('announcements-container');
                container.innerHTML = ''; // Clear any existing content

                announcements.forEach(announcement => {
                    const box = document.createElement('div');
                    box.classList.add('box');

                    // Add announcement image
                    const img = document.createElement('img');
                    img.src = 'img/prueba.jpg'; // Use a placeholder image or the one provided
                    img.alt = 'Anunț imagine';
                    box.appendChild(img);

                    // Add announcement info
                    const info = document.createElement('div');
                    info.classList.add('info');

                    const title = document.createElement('h3');
                    title.textContent = announcement.title; // Announcement title
                    info.appendChild(title);

                    const message = document.createElement('p');
                    message.textContent = announcement.message; // Announcement message
                    info.appendChild(message);

                    const btn = document.createElement('a');
                    btn.classList.add('btn');
                    btn.href = '#';
                    btn.textContent = 'Mai Mult';
                    info.appendChild(btn);

                    box.appendChild(info);

                    // Append the box to the container
                    container.appendChild(box);
                });
            } catch (error) {
                console.error('Error loading announcements:', error);
            }
        }

        // Call the function to load announcements when the page loads
        window.onload = loadAnnouncements;