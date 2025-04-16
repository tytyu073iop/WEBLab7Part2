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

window.onhashchange=switchToStateFromURLHash;

// текущее состояние приложения
// это Model из MVC
var SPAState={};

// фотографии, которые можно просмотреть
var photos={
  1 : { image:"Hilu3.jpg", comment:"собака Шарик" },
  2 : { image:"Retriever3.jpg", comment:"собака Барбос" }
};

// вызывается при изменении закладки УРЛа
// а также при первом открытии страницы
// читает новое состояние приложения из закладки УРЛа
// и обновляет ВСЮ вариабельную часть веб-страницы
// соответственно этому состоянию
// это упрощённая реализация РОУТИНГА - автоматического выполнения нужных
// частей кода в зависимости от формы URLа
// "роутинг" и есть "контроллер" из MVC - управление приложением через URL
function switchToStateFromURLHash() {
  var URLHash=window.location.hash;
  
  // убираем из закладки УРЛа решётку
  // (по-хорошему надо ещё убирать восклицательный знак, если есть)
  var stateStr=URLHash.substr(1);
  
  if ( stateStr != "" ) { // если закладка непустая, читаем из неё состояние и отображаем
    var parts=stateStr.split("_")
    SPAState={ pagename: parts[0] }; // первая часть закладки - номер страницы
  } else {
    SPAState={pagename:'Main'}; // иначе показываем главную страницу
  }
  
  console.log('Новое состояние приложения:');
  console.log(SPAState);

  TestLoadData(SPAState.pagename)
  
  // обновляем вариабельную часть страницы под текущее состояние
  // это реализация View из MVC - отображение состояния модели в HTML-код
  
}

switchToStateFromURLHash();