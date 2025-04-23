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

function getTopPlantsTable() {
  $.ajax(`http://localhost:3000/JSON/plants`,
    { type:'GET', dataType:'json', success:buildTopPlantsTable, error:ErrorHandler }
  );
}

function buildTopPlantsTable(jsonData) {
  // console.log(jsonData)
  // console.log(typeof jsonData)
  // let hash = JSON.parse(jsonData);
  // console.log("building");
  let hash = jsonData

  let html = "<table><thead><tr><th>Растение</th><th>Как ухаживать за ним</th></tr></thead><tbody>"
  for (let key in hash) {
      html += `<tr><td>${key}</td><td>${hash[key]}</td></tr>`;
  }
  html += "</tbody></table>";

  $("#tablePlaceHolder").html(html);
}