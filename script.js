document.addEventListener('DOMContentLoaded', () => {
    // 1. Identify which subject page we are on
    const bodyElement = document.querySelector('body');
    const currentSubject = bodyElement.getAttribute('data-subject');
    
    // If we are on a subject page, initialize notes logic
    if (currentSubject) {
        const noteInput = document.getElementById('noteInput');
        const addNoteBtn = document.getElementById('addNoteBtn');
        const notesList = document.getElementById('notesList');
        
        // Load existing notes from local storage
        let notes = JSON.parse(localStorage.getItem(`notes_${currentSubject}`)) || [];

        // Function to display notes on the screen
        function renderNotes() {
            notesList.innerHTML = ''; // Clear list
            notes.forEach((note, index) => {
                const li = document.createElement('li');
                li.textContent = note;
                
                // Add a delete button to each note
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = '✖';
                deleteBtn.className = 'delete-btn';
                deleteBtn.onclick = () => deleteNote(index);
                
                li.appendChild(deleteBtn);
                notesList.appendChild(li);
            });
        }

        // Function to add a new note
        function addNote() {
            const noteText = noteInput.value.trim();
            if (noteText !== '') {
                notes.push(noteText); // Add to array
                localStorage.setItem(`notes_${currentSubject}`, JSON.stringify(notes)); // Save to storage
                noteInput.value = ''; // Clear textarea
                renderNotes(); // Update UI
            } else {
                alert("Please write something before adding a note.");
            }
        }

        // Function to delete a note
        function deleteNote(index) {
            notes.splice(index, 1); // Remove from array
            localStorage.setItem(`notes_${currentSubject}`, JSON.stringify(notes)); // Update storage
            renderNotes(); // Update UI
        }

        // Event listener for button click
        addNoteBtn.addEventListener('click', addNote);

        // Render notes on initial load
        renderNotes();
    }
});