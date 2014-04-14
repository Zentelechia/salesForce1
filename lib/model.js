clientTemplate = {
	requiredPositions : ["Учредитель","Гендир","Секретарь","Механик","Диспетчер","Бухгалтер"],
	fields : [
	
	{
		sys: "legal",
		caption : "Юр.лицо",
		hint: "Полное название юрлица клиента, например: ООО 'Астра+'"
	},
	{
		sys: "qty",
		caption : "Обший автопарк",
		hint: "Общее количество единиц техники"
	},
	{
		sys: "stage",
		caption : "Стадия",
		hint: "Текущая стадия процесса продаж",
		default: "Сбор информации"
	},
	{
		sys: "task",
		caption : "Главная текущая задача",
		hint: "Что сейчас важно сделать для продвижения вперед"
	},
	{
		sys: "comments",
		caption : "Комментарии",
		hint: "Дополнительные сведения о клиенте"
	}
	],
	projectStages : [
	{
		name: "Сбор информации", stage : 1, color : "#AAA", 
		tasks:[
		"Выяснить три контактных лица",
		"Заполнить карточку клиента"
		]
	},
	{
		name: "Первая встреча", stage : 2, color : "#999",
		tasks:[
		"Выяснить еще три контактных лица",
		"Дозаполнить карточку клиента"
		]
	},
	{
		name: "Презентация", stage : 3, color : "magenta",
		tasks:[]
	},
	{
		name: "Тест", stage : 4, color : "pink",
		tasks:[]
	},
	{
		name: "Тендер", stage : 5, color : "green",
		tasks:[]
	},
	{
		name: "КП", stage : 6, color : "red",
		tasks:[]
	},
	{
		name: "Договор и счет", stage : 7, color : "#AAA",
		tasks:[]
	},
	{
		name: "Внедрение", stage : 8, color : "blue",
		tasks:[]
	},
	{
		name: "Обслуживание", stage : 9, color : "lightblue",
		tasks:[]
	},
	]
}
contactTemplate = {
	fields : [
	{
		sys: "position",
		caption: "Должность"
	},
	{
		sys: "fio",
		caption:"ФИО"
	},
	{
		sys: "address",
		caption:"Адрес"
	},
	{
		sys: "phones",
		caption:"Телефоны"
	},
	{
		sys: "email",
		caption:"Email'ы"
	},
	{
		sys: "comments",
		caption:"Комментарии"
	},
	{
		sys: "zone",
		caption:"Обязанности"
	},
	{
		sys: "birthday",
		caption:"ДР"
	}
	]
}

menu = [
{
	text: "История",
	route: "/"
},
{
	text: "Контрагенты",
	route: "clients"
},
{
	text: "Контакты",
	route: "contacts"
},
{	text: "Задачи",
	route: "tasks"
}
];

