{
	"info": {
		"_postman_id": "97c38122-bcfd-47f8-a7b2-e82dc5e9fd4c",
		"name": "Invoice Collection",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "17210088"
	},
	"item": [
		{
			"name": "http://localhost:5000/route/invoice",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "http://localhost:5000/route/invoice",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "5000",
					"path": [
						"route",
						"invoice"
					]
				}
			},
			"response": []
		},
		{
			"name": "New Request",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "formdata",
					"formdata": [
						{
							"key": "fileName",
							"contentType": "",
							"type": "file",
							"src": "/C:/Users/ASUS/Documents/Interview/Express/InvoiceImport.xlsx"
						}
					]
				},
				"url": {
					"raw": "http://localhost:5000/route/invoice",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "5000",
					"path": [
						"route",
						"invoice"
					]
				}
			},
			"response": []
		},
		{
			"name": "http://localhost:5000/route/invoice",
			"request": {
				"method": "PUT",
				"header": [],
				"url": {
					"raw": "http://localhost:5000/route/invoice",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "5000",
					"path": [
						"route",
						"invoice"
					]
				}
			},
			"response": []
		},
		{
			"name": "http://localhost:5000/route/invoice",
			"request": {
				"method": "DELETE",
				"header": [],
				"url": {
					"raw": "http://localhost:5000/route/invoice",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "5000",
					"path": [
						"route",
						"invoice"
					]
				}
			},
			"response": []
		}
	]
}