class TaskCollection {
    constructor() {
      this.addTask = document.querySelector('.add-task');
      this.domList = document.querySelector('.todo-list');
      this.collection = [];
    }
    initApp = () => {
      this.onLoadList();
      this.updateDom();
    }
    updateDom = () => {
      const ref = this;
      this.domList.innerHTML = '';
      this.collection.forEach((element) => {
        let completed = '';
        if (element.completed) {
          completed = 'done';
        }
        ref.domList.innerHTML = `${ref.domList.innerHTML} <li class="todo-item">
        <div class="checker"><span class=""><input class="list-check-${element.index} action_check" type="checkbox"></span></div>
        <span class="${completed} desc" contentEditable="true">${element.description}</span>
        <i class="fa fa-trash-o float-right delete"></i>
        </li>`;
      }, ref);
      this.collection.forEach((element) => {
        const checkList = document.querySelector(`.list-check-${element.index}`);
        checkList.checked = false;
        if (element.completed) {
          checkList.checked = true;
        }
      });
      this.eventDispatcher();
    }
    eventDispatcher = () => {
      this.onclickeventDispatcher();
      this.onsubmiteventDispatcher();
      this.onediteventDispatcher();
    }
    onclickeventDispatcher = () => {
      const buttons = document.querySelectorAll('.delete');
      const ref = this;
      buttons.forEach((button, index) => {
        button.addEventListener('click', (event) => {
          const eventIdentifier = event.currentTarget;
          const localArray = [];
          let count = 1;
          eventIdentifier.ref.collection.forEach((element, i) => {
            if (i !== eventIdentifier.index) {
              eventIdentifier.ref.collection[i].index = count;
              localArray.push(eventIdentifier.ref.collection[i]);
              count += 1;
            }
          });
          eventIdentifier.ref.collection = localArray;
          eventIdentifier.ref.onSaveList();
          ref.updateDom();
        });
        button.index = index;
        button.ref = ref;
      }, ref);
      const checks = document.querySelectorAll('.action_check');
      checks.forEach((check,index) =>{

        check.addEventListener('click',(event) =>{
          const refObj = event.currentTarget;
          if(refObj.ref.collection[refObj.index].completed){
            refObj.ref.collection[refObj.index].completed = false;
          }
          else {
            refObj.ref.collection[refObj.index].completed = true;
          }
          refObj.ref.onSaveList();
          ref.updateDom();

        });
        check.index =index;
        check.ref = ref ;
      },ref);

      const clearBtn = document.querySelector('.custom-btn');
      clearBtn.addEventListener('click',(event)=>{
        const refObj = event.currentTarget;
        const filteredTasks = refObj.ref.collection.filter((item) =>{
          const state = item.completed == false;
          return state;
        });
        refObj.ref.collection = filteredTasks;
        refObj.ref.onSaveList();
          ref.updateDom();
      });
      clearBtn.ref = this;

    }
    

    onsubmiteventDispatcher = () => {
      this.addTask.addEventListener('keyup', (event) => {
        if (event.keyCode !== 13) {
          return;
        }
        const input = event.currentTarget.ref.addTask.value;
        if (!input.replace(/\s/g, '').length || input.length <= 0) {
          return;
        }
  
        if (event.keyCode === 13) {
          event.currentTarget.ref.collection.push({
            index: (event.currentTarget.ref.collection.length + 1), description: input, completed: false,
          });
  
          event.currentTarget.ref.onSaveList();
          event.currentTarget.ref.addTask.value = '';
        }
        event.currentTarget.ref.updateDom();
        event.preventDefault();
      });
      this.addTask.ref = this;
    }
    onediteventDispatcher = () => {
      const ref = this;
      const listDesc = document.querySelectorAll('.desc');
      listDesc.forEach((desc, index) => {
        desc.addEventListener('keyup', (event) => {    
          if (event.keyCode !== 13) {
            return;
          }
  
          const refObj = event.currentTarget;
          let input = refObj.value.innerHTML;
          refObj.value.innerHTML = input.replace('<br>', '');
          input = refObj.value.innerHTML;
          if (!input.replace(/\s/g, '').length || input.length <= 0) {
            return;
          }
          if (refObj.value.innerHTML !== refObj.ref.collection[refObj.index].description) {
            refObj.value.innerHTML = input.replace('<br>', '');
            refObj.ref.collection[refObj.index].description = refObj.value.innerHTML;
            refObj.ref.onSaveList();
            refObj.value.blur();
          }
        });
        desc.index = index;
        desc.ref = ref;
        desc.value = desc;
      }, ref);
    }
    onSaveList = () => {
      localStorage.setItem('application_config', JSON.stringify(this.collection));
    }
    onLoadList = () => {
      if (localStorage.getItem('application_config') != null) {
        this.collection = JSON.parse(localStorage.getItem('application_config'));
      }
    }
  }
  
  export default TaskCollection;