'use strict';

// Function Getting the input value and appending it to to-do list
let todoName = '';
let todoArr = [];
let todoLength = 0;
let todoCompleteArr = [];
let todoActiveArr = [];

const init = () => {
  console.log(todoArr);
  console.log(todoActiveArr);
  if (todoArr.length === 0 && todoActiveArr.length === 0) {
    $('.modal__list-empty').show();
  } else {
    $('.modal__list-empty').hide();
  }

  // Drag and drop
  $('.modal__list-ul')
    .sortable({
      connectWith: '.modal__list-ul',
      stack: '.modal__list-ul ul',
    })
    .disableSelection();
};

init();

$('body').on('keypress', function (e) {
  todoName = $('.newTodo').val();
  if (e.charCode === 13) {
    if (todoName) {
      todoArr.push(todoName);
      getLength(todoArr);
      loopTodo(todoArr);
    }
    $('.newTodo').val('');
  }
});

$('body').on('mouseover', '.modal__list-li', function () {
  $(this).addClass('showDelete');
});
$('body').on('mouseleave', '.modal__list-li', function () {
  $(this).removeClass('showDelete');
});

$('body').on('click', '.modal__list-delete', function () {
  const _this = $(this).attr('data-id');
  const todoExist = todoArr.indexOf(_this);
  if (todoArr.length > 0) {
    $('.modal__list-ul').html('');
    if (todoExist > -1) {
      todoArr.splice(todoExist, 1);
      getLength(todoArr);
      fnDeletedLoopTodo(todoArr);
    }
    fnToast('Task deleted');
  } else {
    $('.toast').addClass('toast__show');
    $('.toast__message').html('No to-do list');
    setTimeout(() => {
      $('.toast').removeClass('toast__show');
    }, 4000);
  }
});
const fnDeletedLoopTodo = function (todoArr) {
  console.log(todoArr);
  fnLoopFilter(todoArr);
};
const loopTodo = function (todoArr) {
  init();
  for (let i = todoArr.length - 1; i < todoArr.length; i++) {
    $('.modal__list-ul').append(`
    <li class="modal__list-li" id ="todo-${i}">
      <div class="modal__list-flex">
        <span class="modal__list-span">
          <input class="todo-checkbox todo-checkbox-${todoArr[i]}" data-name="${todoArr[i]}" data-check="${i}" type="checkbox">
        </span>
        <span class="modal__list-todoname">${todoArr[i]}</span>
      </div>
      <div class="modal__list-delete" data-id="${todoArr[i]}">
        <img src="images/icon-cross.svg">
      </div>
    </li>`);
  }
};

$('body').on('click', '.todo-checkbox', function () {
  let _this = $(this).attr('data-check');
  let _thisName = $(this).attr('data-name');
  const todoExist = todoArr.indexOf(_thisName);
  $('#todo-' + _this).addClass('todo__completed');
  console.log(_thisName);
  if (todoExist > -1) {
    todoArr.splice(todoExist, 1);
  }
  todoCompleteArr.push(_thisName);
});

const getLength = (todoArr) => {
  let _length =
    todoArr.length > 1 ? todoArr.length + ' items' : todoArr.length + ' item';

  $('.todoLength').html(_length);
};

$('body').on('click', '.todoCompleted', function () {
  if (todoCompleteArr.length > 0) {
    $('.filter__tabs-span').removeClass('active__tab');
    $(this).addClass('active__tab');
    $('.modal__list-ul').html('');
    fnComplete(todoCompleteArr);
  } else {
    fnToast('No completed tasks');
  }
});

const fnLoopFilter = (todoArr) => {
  init();
  for (let i = 0; i < todoArr.length; i++) {
    $('.modal__list-ul').append(`
    <li class="modal__list-li" id ="todo-${i}">
      <div class="modal__list-flex">
        <span class="modal__list-span">
          <input class="todo-checkbox todo-checkbox-${todoArr[i]}" data-name="${todoArr[i]}" data-check="${i}" type="checkbox">
        </span>
        <span class="modal__list-todoname">${todoArr[i]}</span>
      </div>
      <div class="modal__list-delete" data-id="${todoArr[i]}">
        <img src="images/icon-cross.svg">
      </div>
    </li>`);
  }
};
$('body').on('click', '.todoAll', function () {
  $('.filter__tabs-span').removeClass('active__tab');
  $(this).addClass('active__tab');
  $('.modal__list-ul').html('');
  // let combine = [...todoArr, ...todoCompleteArr];
  fnLoopFilter(todoArr);
  fnComplete(todoCompleteArr);
});

$('body').on('click', '.todoActive', function () {
  if (todoArr.length > 0) {
    $('.filter__tabs-span').removeClass('active__tab');
    $(this).addClass('active__tab');
    $('.modal__list-ul').html('');
    // let combine = [...todoArr, ...todoCompleteArr];
    fnLoopFilter(todoArr);
  } else {
    fnToast('No active tasks yet');
  }

  // fnComplete(todoCompleteArr);
});

const fnComplete = (todoArr) => {
  init();
  for (let i = 0; i < todoArr.length; i++) {
    $('.modal__list-ul').append(`
    <li class="modal__list-li todo__completed" id ="todo-${i}">
      <div class="modal__list-flex">
        <span class="modal__list-span">
          <input class="todo-checkbox todo-checkbox-${todoArr[i]}" data-name="${todoArr[i]}" data-check="${i}" type="checkbox">
        </span>
        <span class="modal__list-todoname">${todoArr[i]}</span>
      </div>
      <div class="modal__list-delete" data-id="${todoArr[i]}">
        <img src="images/icon-cross.svg">
      </div>
    </li>`);
  }
};

$('body').on('click', '.todoClearCompleted', function () {
  if (todoCompleteArr.length > 0) {
    todoCompleteArr = [];
    fnToast('No tasks to clear');
  } else {
    fnToast('No tasks to clear');
  }
});

$('body').on('change', '.theme__checkbox', function () {
  let _this = $(this).prop('checked');
  console.log(_this);
  if (_this) {
    $('.container').toggleClass('lightTheme darkTheme');
  } else {
    $('.container').toggleClass('lightTheme darkTheme');
  }
});

const fnToast = (copy) => {
  $('.toast').addClass('toast__show');
  $('.toast__message').html(copy);
  setTimeout(() => {
    $('.toast').removeClass('toast__show');
  }, 4000);
};
