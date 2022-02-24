 class TaskCollection {
   
    constructor() {
       this.addTask = document.querySelector('.add-task');
       this.domList = document.querySelector('.todo-list');
       this.collection = [];
    }
    initApp = () =>{
        this.onLoadList();
        this.updateDom();
    }

  updateDom = () =>{
    const ref = this;
    this.domList.innerHTML ='';
    this.collection.forEach((element) =>{
        let completed = '';
        if (element.completed){
            completed = 'done';
        }

    ref.domList.innerHTML =`${ref.domList.innerHTML} <li class ="todo-item">
    <div class="checker"><span class =""><input class = "list-check-${element.index}" type = "checkbox"></span></div>
    <span class= "${completed} edit" contentEditable = "true"> ${element.description}</span>
    <i class="fa fa-trash-o float-right delete"></i>
    </li>`;
    }, ref);

    this.collection.forEach((element) => {
        const checkList = document.querySelector(`.list-check-${element.index}`);
        checkList.checked = false;
        if (element.completed){
            checkList.checked = true;
        }
    });
    this.eventDispatcher();
  }
  eventDispatcher = ()=> {
      this.onclickeventDispatcher();
      this.onsubmiteventDispatcher();
      this.onediteventDispatcher();
  }

  onclickeventDispatcher = ()=>{
    const buttons = document.querySelectorAll('.delete');
    const ref = this;
    buttons.forEach((button,index) =>{
        button.addEventListener('click',(event) =>{
            const eventIdentifier = event.currentTarget;
            const localArray = [];
            let count = 1;
            eventIdentifier.ref.collection.forEach((element,i) =>{
                if(i !== eventIdentifier.index) {
                    eventIdentifier.ref.collection[i].index = count;
                    localArray.push(eventIdentifier.ref.collection[i]);
                    count +=1;
                }

            });
            eventIdentifier.ref.collection = localArray;
            eventIdentifier.ref.onSaveList();
            ref.updateDom();

        });
        button.index = index ;
        button.ref = ref;
    },ref);
  }
  onsubmiteventDispatcher = () =>{
      this.addTask.addEventListener('keyup', (event) =>{
        if(event.keyCode !== 13){
            return;
        }
        const input = event.currentTarget.ref.addTask.value;
        if(input.replace(/\s/g,'').length || input.length <= 0){
            return;
        }

        if(event.keyCode == 13){
            event.currentTarget.ref.collection.push({
                index : (event.currentTarget.ref.collection.length + 1) ,
                description : input,
                completed : false,
            });
            event.currentTarget.ref.onSaveList();
            event.currentTarget.ref.addTask.value = '';
        }
        event.currentTarget.ref.updateDom();
        event.preventDefault();
      });
      this.addTask.ref = this;
  }
  onediteventDispatcher = () =>{
      const ref = this;
      const listEdit = document.querySelectorAll('.edit');
      listEdit.forEach((edit, index) => {
          edit.addEventListener('keyup',(event) =>{
              if(event.keyCode !== 13){
                  return;
              }
              const refobj = event.currentTarget;
              let input = refobj.value.innerHTML;
              refobj.value.innerHTML = input.replace('<br>','');
              input = refobj.value.innerHTML ;
              if(input.replace(/\s/g,'').length || input.length <= 0){
                return;
            }
            if( refobj.value.innerHTML !== refobj.ref.collection[refobj.index].description){
                refobj.value.innerHTML = input.replace('<br>','');
                refobj.ref.collection[refobj.index].description = refobj.value.innerHTML;
                refobj.ref.onSaveList();
                refobj.value.blur();           
            }
          });
          edit.index = index ;
          edit.ref = ref;
          edit.value = edit;
      }, ref);
  }
  onSaveList = () =>{
      localStorage.setItem('application_config',JSON.stringify(this.collection));
  }

  onLoadList = () =>{
      if(localStorage.getItem('application_config') != null){
          this.collection = JSON.parse(localStorage.getItem('application_config'));
      }
  }
      
    }
export default TaskCollection ; 