"use strict";

function TestLoadData(pagename)
{
  $.ajax(`http://localhost:3000/${pagename}`,
    { type:'GET', dataType:'html', success:DataLoaded, error:ErrorHandler }
  );
}

function DataLoaded(data)
{
  console.log('загруженные через AJAX данные:');
  console.log(data);
  
  var pageHTML=data;

  document.getElementById('IPage').innerHTML=pageHTML;
}

function ErrorHandler(jqXHR,StatusStr,ErrorStr)
{
  alert(StatusStr+' '+ErrorStr);
}

// текущее состояние приложения
// это Model из MVC
var SPAState={};

const buttonsIds = ["Plants", "Main"];

// а также при первом открытии страницы
// обновляет ВСЮ вариабельную часть веб-страницы
// соответственно этому состоянию
// это упрощённая реализация РОУТИНГА - автоматического выполнения нужных
// частей кода в зависимости от формы URLа
// "роутинг" и есть "контроллер" из MVC - управление приложением через URL
function switchToState(state) {
  SPAState.pagename = state;
  
  console.log('Новое состояние приложения:');
  console.log(SPAState);

  for (let id of buttonsIds) {
    document.getElementById(id).style.display = id === state ? "none" : "block";
  }

  TestLoadData(SPAState.pagename)
  
  // обновляем вариабельную часть страницы под текущее состояние
  // это реализация View из MVC - отображение состояния модели в HTML-код
  
}

switchToState("Main")