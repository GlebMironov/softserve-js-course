function todoComponent(backgroundColor, title) {
	var todo = $("<div>", {class: "todo"});
	var form = $("<form>");
	var label = $("<label>", {class: "label"});
	var newText = $("<input>", {type: "text", placeholder: "Enter Todo text here", size: "30", maxLenth: "150"});
	var button = $("<input>", {type: "button", value: "Add"});
	var message = $("<div>", {class: "todoMessage"});
	var listContainer = $("<ul>", {class: "todoList"});
	var todoCounter = 0;
	var todoStorageKey = "todo_" + function (t) {if (t === undefined) { return 'Unnamed'; } else { return t; }} (title);
	var todoStorage = {};

	todo.css("background-color", backgroundColor);
	label.html(title);

	form.append(label);
	form.append(newText);
	form.append(button);
	todo.append(form);
	todo.append(message);
	todo.append(listContainer);

	function hideMessage() {
		message.html("");
	}
	
	function localStorageRemoveItem(key) {
		delete todoStorage[key];
		localStorageSaveState();
	}

	function localStorageAddItem(key, value) {
		todoStorage[key] = value;
		localStorageSaveState();
	}
	
	function localStorageSaveState() {
		localStorage.setItem(todoStorageKey, JSON.stringify(todoStorage));
	}

	function localStorageRestoreState() {
		todoStorage = JSON.parse(localStorage.getItem(todoStorageKey));
		
		if (!todoStorage) {
			todoStorage = {};
		}
		
		for (var item in todoStorage) {
			var li = $("<li>", {class: "todoItem", todo_id: item});
			var timestamp = createTimestampElement(todoStorage[item]["timestamp"]);

			li.append(createDeleteElement());
			li.append(timestamp["element"]);
			li.append(document.createTextNode(todoStorage[item]["text"]));
			listContainer.append(li);
			todoCounter = item + 1;
		}
	}

	function createDeleteElement() {
		var img = $("<img>", {class: "todoDelete", title: "Delete item", src: "delete-cross.png", alt: "x"});

		img.on("click", function (event) {
			var element = $(event.target)[0].parentElement;

			localStorageRemoveItem(element.attributes["todo_id"].value);
			element.remove();
		});
		
		return img[0];
	}

	function createTimestampElement(value) {
		var span = $("<span>", {class: "todoDate"});

		if (value === undefined) {
			var date = new Date();
		} else {
			var date = new Date(value);
		}

		span.append(document.createTextNode(date.toLocaleString()));

		return {timestamp: date, element: span[0]};
	}

	function addRecord() {
		var todoText = newText.val().trim();

		if (todoText.length > 0) {
			var li = $("<li>", {class: "todoItem", todo_id: todoCounter});
			var timestamp = createTimestampElement();

			li.append(createDeleteElement());
			li.append(timestamp["element"]);
			li.append(document.createTextNode(todoText));
			listContainer.append(li);
			
			localStorageAddItem(
				todoCounter,
				{timestamp: timestamp["timestamp"], text: todoText}
			);

			hideMessage();
			newText.val("");
			todoCounter++;
		} else {
			message.html("Please enter some text");
			setTimeout(hideMessage, 1000);
		}
	}

	form.on("submit", function (event) { event.preventDefault(); addRecord(); });
	button.on("click", function () { addRecord(); });

	localStorageRestoreState();
	
	return todo[0];
}
