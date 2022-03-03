import TaskCollection from "../modules/task_collection";

describe("Add to list", () => {
  test("Test case 1", () => {
    document.body.innerHTML =
      "<div>" + '  <ul class="todo-list"></ul>' + "</div>";

    const Test = new TaskCollection(true);
    Test.addTaskToList("TaskTest_1 of Example 1");
    Test.addTaskToList("TaskTest_1 of Example-2");
    expect(Test.onSaveList()).not.toBeUndefined();
    const list = document.querySelectorAll(".todo-list li");
    expect(list).toHaveLength(2);
  });

  test("Test case 2", () => {
    document.body.innerHTML =
      "<div>" + '  <ul class="todo-list"></ul>' + "</div>";

    const Test = new TaskCollection(true);
    Test.addTaskToList("TaskTest_2 of Example-1");
    const list = document.querySelectorAll(".todo-list li");
    expect(list).toHaveLength(1);
  });

  test("Test case 3", () => {
    document.body.innerHTML =
      "<div>" + '  <ul class="todo-list"></ul>' + "</div>";

    const Test = new TaskCollection(true);
    expect(Test.onLoadList()).not.toBeUndefined();
    Test.addTaskToList("TaskTest_3 of Example-1");
    Test.addTaskToList("TaskTest_3 of Example-2");
    Test.addTaskToList("TaskTest_3 of EXample-3");
    Test.addTaskToList("TaskTest_3 of Example-4");
    Test.addTaskToList("TaskTest_3 of Example-5");
    expect(Test.onSaveList()).not.toBeUndefined();
    const list = document.querySelectorAll(".todo-list li");
    expect(list).toHaveLength(5);
  });

  test("Test case 4", () => {
    document.body.innerHTML =
      "<div>" + '  <ul class="todo-list"></ul>' + "</div>";

    const Test = new TaskCollection(true);
    Test.addTaskToList("TaskTest_4 of Example-1");
    Test.addTaskToList("TaskTest_4 of Example-2");
    Test.addTaskToList("TaskTest_4 of Example-3");
    expect(Test.onSaveList()).not.toBeUndefined();
    const list = document.querySelectorAll(".todo-list li");
    expect(list).toHaveLength(3);
  });

  test("Test case 5", () => {
    document.body.innerHTML =
      "<div>" + '  <ul class="todo-list"></ul>' + "</div>";

    const Test = new TaskCollection(true);
    Test.addTaskToList("TaskTest_5 of Example-1");
    Test.addTaskToList("TaskTest_5 of Example-2");
    Test.addTaskToList("TaskTest_5 of Example-3");
    Test.addTaskToList("TaskTest_5 of Example-3");
    expect(Test.onSaveList()).not.toBeUndefined();
    const list = document.querySelectorAll(".todo-list li");
    expect(list).toHaveLength(4);
  });
});

describe("Delete from list", () => {
  test("Test case 6", () => {
    document.body.innerHTML =
      "<div>" + '  <ul class="todo-list"></ul>' + "</div>";

    const Test = new TaskCollection(true);
    Test.addTaskToList("TaskTest_1 of Example 1");
    Test.addTaskToList("TaskTest_1 of Example-2");
    Test.deleteTask(0);
    Test.addTaskToList("TaskTest_1 of Example-3");
    Test.deleteTask(1);
    expect(Test.onSaveList()).not.toBeUndefined();
    const list = document.querySelectorAll(".todo-list li");
    expect(list).toHaveLength(1);
  });

  test("Test case 7", () => {
    document.body.innerHTML =
      "<div>" + '  <ul class="todo-list"></ul>' + "</div>";

    const Test = new TaskCollection(true);
    Test.addTaskToList("TaskTest_2 of Example-1");
    Test.deleteTask(0);
    expect(Test.onSaveList()).not.toBeUndefined();
    const list = document.querySelectorAll(".todo-list li");
    expect(list).toHaveLength(0);
  });

  test("Test case 8", () => {
    document.body.innerHTML =
      "<div>" + '  <ul class="todo-list"></ul>' + "</div>";

    const Test = new TaskCollection(true);
    Test.addTaskToList("TaskTest_3 of Example-1");
    Test.addTaskToList("TaskTest_3 of Example-2");
    Test.addTaskToList("TaskTest_3 of EXample-3");
    Test.addTaskToList("TaskTest_3 of Example-4");
    Test.addTaskToList("TaskTest_3 of Example-5");
    Test.deleteTask(0);
    Test.deleteTask(1);
    Test.deleteTask(2);
    expect(Test.onSaveList()).not.toBeUndefined();
    const list = document.querySelectorAll(".todo-list li");
    expect(list).toHaveLength(2);
  });

  test("Test case 9", () => {
    document.body.innerHTML =
      "<div>" + '  <ul class="todo-list"></ul>' + "</div>";

    const Test = new TaskCollection(true);
    Test.addTaskToList("TaskTest_4 of Example-1");
    Test.deleteTask(0);
    Test.addTaskToList("TaskTest_4 of Example-2");
    Test.addTaskToList("TaskTest_4 of Example-3");
    expect(Test.onSaveList()).not.toBeUndefined();
    const list = document.querySelectorAll(".todo-list li");
    expect(list).toHaveLength(2);
  });

  test("Test case 10", () => {
    document.body.innerHTML =
      "<div>" + '  <ul class="todo-list"></ul>' + "</div>";

    const Test = new TaskCollection(true);
    Test.deleteTask(0);
    Test.addTaskToList("TaskTest_5 of Example-1");
    Test.deleteTask(0);
    Test.addTaskToList("TaskTest_5 of Example-2");
    Test.deleteTask(10);
    Test.addTaskToList("TaskTest_5 of Example-3");
    Test.deleteTask(0);
    Test.addTaskToList("TaskTest_5 of Example-3");
    expect(Test.onSaveList()).not.toBeUndefined();

    const list = document.querySelectorAll(".todo-list li");
    expect(list).toHaveLength(2);
  });
});
