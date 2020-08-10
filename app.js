//note class
class Note {
	constructor(id,title,description){
		this.id = id;
		this.title = title;
		this.description = description;
	}
}



class UI{
	//show all notes when page loaded
	static showNotes(){
		const notes = Store.getNotes();
		
		notes.forEach( (note) => {
			UI.showNewNote(note);
		} );
	}
	
	
	//show new note when added
	static showNewNote(note){
		const card = document.createElement("div");
		card.className = "card bg-warning";
		
		card.innerHTML = `
			<div class="card bg-warning">
				<div class="card-header">
					<span class="btn btn-danger text-right delete" >X</span>
					<span class="text-center font-weight-bold">${note.title}</span>
				</div>
				
				<div class="card-body text-justify">
				${note.description}
				</div>
			</div >`;
				
		const notes = document.querySelector("#notes");
		notes.appendChild(card);
	}
	
	
	static removeNote(el){
		if(el.classList.contains("delete")) {
			el.parentElement.parentElement.remove();
		}
	}

	static clearFields(){
		document.querySelector("#title").value = "";
		document.querySelector("#description").value = "";
	}
	
	
	
}



class Store{
	//get all notes from local storage
	static getNotes(){
		let notes;
		if (localStorage.getItem("notes") === null ){
			notes = [];
		}
		else{
			notes = JSON.parse(localStorage.getItem("notes"));
		}
		
		return notes;
	}
	
	
	
	//add new note to local storage
	static addNewNote(note){
		var notes = Store.getNotes();
		notes.push(note);
		localStorage.setItem("notes" , JSON.stringify(notes));
	}


	static removeNote(title){
		var notes = Store.getNotes();
		for(var i=0 ; i < notes.length ; i++)
		{
			if(notes[i].title === title){
				notes.splice(i,1);
				break;
			}
		}

		localStorage.setItem("notes" , JSON.stringify(notes));
	}
}





//event: show notes when page loaded
document.addEventListener("DOMContentLoaded" , UI.showNotes );


//event: add new note
document.querySelector("#form").addEventListener("submit" , (e) => {
	e.preventDefault();
	
	var title = document.querySelector("#title").value;
	var description = document.querySelector("#description").value;


	var notes = Store.getNotes();

	var id = notes[notes.length];
	
	var note = new Note(id,title,description);
	
	UI.showNewNote(note);
	
	Store.addNewNote(note);

	UI.clearFields();
	
} );



//event: remove note
document.querySelector("#notes").addEventListener("click" , (e) => {
	UI.removeNote(e.target);

	Store.removeNote(e.target.nextElementSibling.textContent);
});
