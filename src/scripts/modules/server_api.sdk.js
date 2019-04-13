'use strict';

// Обёртка для выполнения HTTP запросов к бэкенду
// Обеспечивает прозрачное, простое и удобное составление и выполнение запросов
// Позволяет назначать обработчики результатов запросов по умолчанию, а также индивидуально для каждого запроса
// Поддержка переиспользования однажды "собранных" запросов и использования в них динамических параметров
// Прозрачно поддерживает сессионные Cookies и предотвращает кеширование ответов со сторонны браузера (для POST неактуально)
// под капотом стандартный XMLHttpRequest

// Примеры использования см. в файле api_test.sdk.html

// Настоятельно _рекомендуется_ продублировать блок инициализации из конца этого файла в своём коде
//		(тут при этом не комментить ничего не нужно)

// <script src="server_api.sdk.js">



//-------	Движок выполнения запросов		----------------------------------------------------------

// Служебная функция для динамической подстановки параметров
function dyn_assign( v ){ return (v instanceof Function) ? v():v; }

// Класс движка
export default class server_api 
{
	constructor(method, params, dh, ceh)
	{
		this.method = method;	// Конструктор реализован в служебных целях, вместо его прямого использования
		this.params = params;	// Рекомендуется использовать фабрику prepare_ajax_request()
		this.data_handler = dh;
		this.custom_error_handler = ceh;
	}
	
	// Чейнеры - для конструкций method chaining вида 
	//	request
	//		.call_on_success( (response_data) => {} )
	//		.call_on_when_shit_happens( (code) => {} )
	on_success (callback) {
		this.data_handler = callback;
		return this;
	}
	on_error (callback) {
		this.custom_error_handler = callback;
		return this;
	}
	
	// Фабрика инициализации
	static prepare_ajax_request( setup ){
		let request = new server_api(
				setup.using_method,
				setup.with_params,
				setup.and_then_with,
				setup.or_with
			);
		server_api.log('server_api: New AJAX API request prepared:');
		server_api.log({
			endpoint: 	server_api.endpoint_url,
			method:		request.method,
			params:		request.params
		});
		return request;
	}
	
	// Логирование с учётом debug_mode
	static log( msg ){
		if('debug_mode' in server_api)
			if(server_api.debug_mode)
				console.log( msg );
	}
	
	submit()	//Метод исполнения подготовленного запроса
	{
		//let anticache = '&___='+ (  Date.now() / 1000 | 0 ) +'_'+Math.floor(Math.random() * 1000000);
		let args_str = 'method='+this.method+'&';
		var params = this.params;
		Object.keys(this.params).forEach(function(key, id, keys_arr) {
			args_str += ( encodeURIComponent(key) + '=' + encodeURIComponent(dyn_assign(params[key])) + '&' );
		});
		
		var req_url = server_api.endpoint_url;
		
		server_api.log('server_api: Submiting on URL: `'+req_url+'`');
		
		var xhr = new XMLHttpRequest();	// Vanilla.JS нашё всё
		xhr.open('POST', req_url, true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.withCredentials = true;
		xhr.send(args_str);
		
		var api_request = this;
		
		
		function handle_error( err ){ //Обработка кодов ошибок API
			server_api.log("server_api: API error on method `"+api_request.method+"`. Details are below.");
			server_api.log( err );
			
			if('default_errors_handler' in server_api)			//существует дефолтный обработчик
				if( server_api.default_errors_handler( err ) )	//и отработали ошибку дефолтным обработчиком
					return;										//тогда дело сделано
			
			if('custom_error_handler' in api_request)				//иначе попробуем кастомный обработчик при наличии
				api_request.custom_error_handler( err );
			else server_api.log('Warning: no handlers found!');
		}
		
		function handle_success(data){ //Обработка ответа на успешный запрос
			if(!(data)) data = false;				//Избавимся от неопределённости типа когда данных нет (доработать)
			
			server_api.log('server_api: Request successful. Data:');
			server_api.log(data);
			
			if('data_handler' in api_request)		//Если обработчик ответа назначен
				api_request.data_handler(data);	//Вызовем его
		}
		
		xhr.onreadystatechange = function() {
			if (this.readyState != 4) return;	// Если запрос не завершён, подождём ещё
			  // по окончании запроса доступны:
			  // status, statusText
			  // responseText, responseXML (при content-type: text/xml)
			if (this.status != 200) {	// обработать ошибку
				let err = {
					code: 'E_LOCAL_FAULT',
					msg: "Сетевая ошибка! Не удалось загрузить данные.",
					url: req_url,
					status: this.status,
					statusText: this.statusText,
					responseText: this.responseText
				};
				handle_error( err );
				return;
			}
			
			server_api.log('server_api: Response body:');
			server_api.log(this.responseText);
			
			// Успешно получили что то с сервера
			// Попробуем распарсить
			try{
				let response = JSON.parse(this.responseText);
				
				// Прошли сюда - получили валидный объект ответа. Остались ошибки API
				if(response.ok)		//Нет ошибки
					handle_success(response.data);
				else				//Получили код ошибки от API
					handle_error(response.error);
				
			}catch(exc){	// JSON.parse швыряется исключениями SyntaxError в случае ошибок, перехватим тут
				if(exc.name == "SyntaxError") {
					let err = {
						code: 'E_LOCAL_FAULT',
						msg: "Ошибка обработки JSON! Ответ сервера некорректен.",
						url: req_url,
						JSONparse_exc: exc,
						responseText: this.responseText,
						status: this.status,
						statusText: this.statusText
					}
					handle_error( err );
				}
				else throw exc;	//все что не по адресу
			}
			return;
		}
	}
}

//-------	Предварительная настройка		----------------------------------------------------------	
// Настоятельно _рекомендуется_ продублировать этот блок в своём коде (тут при этом не комментить ничего не нужно)

server_api.endpoint_url = 'https://webiray.com/php/backend/endpoint.php';			//Адрес бэкэнда
server_api.debug_mode = true;			//Ругаться ли в консоль

server_api.default_errors_handler = function(code){
	//console.log(code);
					//Стандартный обработчик общих ошибок типа E_UNAUTHORIZED
					//Выполняется перед обработчиком, указанным при настройке запроса
					//	и при успешной обработке предотвращает его вызов
	return false;	//Если вернули true - обработали ошибку. false - передать управление дальше.
};