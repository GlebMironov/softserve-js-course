function todoComponent(backgroudColor) {
	var todo = document.createElement("div");
	var form = document.createElement("form");
	var newText = document.createElement("input");
	var button = document.createElement("input");
	var message = document.createElement("div");
	var listContainer = document.createElement("ul");
	var todoCounter = 0;

	todo.className = "todo";
	todo.style["background-color"] = backgroudColor;

	newText.type = "text";
	newText.placeholder = "Enter Todo text here";
	newText.size = "30";
	newText.maxLength = "150";
	
	button.type = "button";
	button.value = "Add";
	
	message.className = "todoMessage";
	
	listContainer.className = "todoList";
	
	form.appendChild(newText);
	form.appendChild(button);
	todo.appendChild(form);
	todo.appendChild(message);
	todo.appendChild(listContainer);

	function hideMessage() {
		message.innerHTML = "";
	}

	function deleteRecord(event) {
		event.preventDefault();
		listContainer.removeChild(event.target.parentElement);
	}
	
	function createDeleteElement() {
		var img = document.createElement("img");

		img.title = "Delete item";
		img.className = "todoDelete";
		img.src = "delete-cross.png";
		img.alt = "x";
		img.addEventListener("click", deleteRecord, false);
		
		return img;
	}
	
	function createTodoDateElement() {
		var date = new Date();
		var span = document.createElement("span");

		span.className = "todoDate";
		span.appendChild(document.createTextNode(date.toLocaleString()));
		
		return span;
	}
	
	function addRecord() {
		var todoText = newText.value.trim();

		if (todoText.length > 0) {
			var li = document.createElement("li");

			hideMessage();
			todoCounter++;

			li.className = "todoItem";
			li.setAttribute("todo_id", todoCounter);
			li.appendChild(createDeleteElement());
			li.appendChild(createTodoDateElement());
			li.appendChild(document.createTextNode(todoText));

			listContainer.appendChild(li);
			newText.value = "";
		} else {
			message.innerHTML = "Please enter some text";
			setTimeout(hideMessage, 1000);
		}
	}

	function addButtonClicked() { 
		addRecord();
	}

	function newRecordFormSubmit(event) {
		event.preventDefault();
		addRecord();
	}

	form.addEventListener("submit", newRecordFormSubmit, false);
	button.addEventListener("click", addButtonClicked, false);
	
	return todo;
}
