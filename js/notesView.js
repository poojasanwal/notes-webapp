export default class notesView {
    constructor(root, { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}) {
        this.root = root;
        this.onNoteSelect = onNoteSelect;
        this.onNoteAdd = onNoteAdd;
        this.onNoteEdit = onNoteEdit;
        this.onNoteDelete = onNoteDelete;
        this.root.innerHTML = `

        <section class="sidebar">
        <div class="notes-list">
          <div class="note_sideview">
            <div class="note-title"></div>
            <div class="note-body"></div>
            <div class="note-date"></div>
          </div>
        </div>
      </section>
        `;

        const btnAddNote = this.root.querySelector("#new-note");
        const inpTitle = this.root.querySelector(".note-header");
        const inpBody = this.root.querySelector(".textarea");

        btnAddNote.addEventListener("click", () => {
            this.onNoteAdd();
        });

        [inpTitle, inpBody].forEach(inputField => {
            inputField.addEventListener("blur", () => {
                const updatedTitle = inpTitle.value.trim();
                const updatedBody = inpBody.value.trim();

                this.onNoteEdit(updatedTitle, updatedBody);
            });
        });

        this.updateNotePreviewVisibility(false);
    }

    _createListItemHTML(id, title, body, updated) {
        const MAX_BODY_LENGTH = 60;


        return `
            <div class="note-sideview" data-note-id="${id}"
                <div class="note-title">${title}</div>
                <div class="note-body">
                    ${body.substring(0, MAX_BODY_LENGTH)}
                    ${body.length > MAX_BODY_LENGTH ? "..." : ""}
                </div>
                <div class="note-date">
                    ${updated.toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" })}
                </div>
            </div>
        `;
    }

    updateNoteList(notes) {
        const notesListContainer = this.root.querySelector(".notes-list");

        // Empty list
        notesListContainer.innerHTML = "";

        for (const note of notes) {
            const html = this._createListItemHTML(note.id, note.title, note.body, new Date(note.updated));

            notesListContainer.insertAdjacentHTML("beforeend", html);
        }

        // Add select/delete events for each list item

        notesListContainer.querySelectorAll(".note-sideview").forEach(noteListItem => {
            noteListItem.addEventListener("click", () => {
                this.onNoteSelect(noteListItem.dataset.noteId);
            });

// probabably here 
            document.getElementById("trash").addEventListener("click", () => {
                const doDelete = confirm("Are you sure you want to delete this note?");

                if (doDelete) {
                    this.onNoteDelete(noteListItem.dataset.noteId);
                }
            });
        });
    }

    updateActiveNote(note) {
        this.root.querySelector(".note-header").value = note.title;
        this.root.querySelector(".textarea").value = note.body;

        this.root.querySelectorAll(".note-sideview").forEach(noteListItem => {
            noteListItem.classList.remove("note-sideview--selected");
        });

        this.root.querySelector(`.note-sideview[data-note-id="${note.id}"]`).classList.add("note-sideview--selected");
    }

    updateNotePreviewVisibility(visible) {
        this.root.querySelector(".notes-sec").style.visibility = visible ? "visible" : "hidden";
    }
}