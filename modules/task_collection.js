export default class TaskCollection {
    static counter = 0;
    constructor() {
        this.domList = document.querySelector('.todo-list');
        this.collection = [
        {description: "This is Task 1 with bigger length!",completed: true,index: 1,},
        {description: "Task 2",completed: true,index: 2,},
        {description: "Task 3", completed: true, index: 3,},
        { description: "Task 4", completed: true, index: 4, },
        {description: "Task 5", completed: true,index: 5,},
        {description: "Task 6", completed: false,index: 6,},
      ];
      const ref = this;
       this.collection.forEach((element) =>{
           let completed = '';
           if (element.completed){
               completed = 'done';
           }


       ref.domList.innerHTML =`${ref.domList.innerHTML} <li class ="todo-item">
       <div class="checker"><span class =""><input class = "list-check-${element.index}" type = "checkbox"></span></div>
       <span class= "${completed}"> ${element.description}</span>
       <i class="fa fa-trash-o float-right"></i>
       </li>`;
       }, ref);

       this.collection.forEach((element) => {
           const checkList = document.querySelector(`.list-check-${element.index}`);
           checkList.checked = false;
           if (element.completed){
               checkList.checked = true;
           }
       });
      
    }
}