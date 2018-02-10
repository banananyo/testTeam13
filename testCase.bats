#!/usr/bin/env bats

@test "get data" {
	response=$(
	    curl -X GET \
	    -H "Content-Type:application/json" \
	    http://localhost:8080/api/employees
	)
	echo $response | grep "href"
}

@test "add UserMember" {
    response=$(curl -X POST \
                 http://localhost:8080/employees/add \
                 -H 'Cache-Control: no-cache' \
                 -H 'Content-Type: application/json' \
                 -H 'Postman-Token: a1894ea3-a934-c289-0aaf-e33163566a42' \
                 -d '{"firstName":"wadjakorn",
                           "lastName":"tonsri",
                           "tel":"081-111-1111",
                           "position":"developer",
                           "address":"unknown",
                           "age":23,
                           "sex":"male",
                           "id_card_NO":"1234456789012",
                           "e_mail":"wazjakorn@gmail.com",
                           "username":"baze",
                           "password":"1"}')
    echo $response | grep "success"
}

@test "wrong telephone pattern" {
    response=$(curl -X POST \
                 http://localhost:8080/employees/add \
                 -H 'Cache-Control: no-cache' \
                 -H 'Content-Type: application/json' \
                 -H 'Postman-Token: a1894ea3-a934-c289-0aaf-e33163566a42' \
                 -d '{"firstName":"wadjakorn",
                           "lastName":"tonsri",
                           "tel":"081-111-111",
                           "position":"developer",
                           "address":"unknown",
                           "age":23,
                           "sex":"male",
                           "id_card_NO":"1234456789012",
                           "e_mail":"wazjakorn@gmail.com",
                           "username":"baze",
                           "password":"1"}')
    echo $response | grep "failed"
}

@test "null age" {
    response=$(curl -X POST \
                 http://localhost:8080/employees/add \
                 -H 'Cache-Control: no-cache' \
                 -H 'Content-Type: application/json' \
                 -H 'Postman-Token: a1894ea3-a934-c289-0aaf-e33163566a42' \
                 -d '{"firstName":"wadjakorn",
                           "lastName":"tonsri",
                           "tel":"081-111-111",
                           "position":"developer",
                           "address":"unknown",
                           "age":null,
                           "sex":"male",
                           "id_card_NO":"1234456789012",
                           "e_mail":"wazjakorn@gmail.com",
                           "username":"baze",
                           "password":"1"}')
    echo $response | grep "failed"
}

