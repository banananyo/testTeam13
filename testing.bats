#!/usr/bin/env bats

@test "B5823093#1 การใส่ข้อมูลถูกค้องตามปกติ " {
    json=$(curl -s -H "Content-Type: application/json"\
     -X POST \
    -d '{"firstName":"P","lastName":"Pop","tel": "092-629-2713"}' \
    http://localhost:8080/api/customers)
	
echo $json | grep "092-629-2713"	
}

@test "B5823093#1 ใส่เลขเบอร์โทรศัพท์ไม่ครบ 092-768" {
   json=$(curl -s -H "Content-Type: application/json"\
    -X POST \
    -d '{"tel":"092768"}'\
    http://localhost:8080/api/customers)
#grep เเล้วเจอข้อความ error เลย return 0
echo $json | grep "must match"
}


@test "B5823093#1 ใส่เลขเบอร์โทรศัพท์เป็นตัวอักษรผสมกับตัวเลขรับ OOO-909" {
   json=$(curl -s -H "Content-Type: application/json"\
    -X POST \
    -d '{"tel":"OOO-909"}'\
    http://localhost:8080/api/customers)
	
#grep เเล้วเจอข้อความ error เลย return 0

echo $json | grep "must match"
}

@test "B5823093#1 ใส่เลขเบอร์โทรศัพท์ซ้ำกัน " {
   json=$(curl -s -H "Content-Type: application/json"\
    -X POST \
    -d '{"tel":"092-629-2713"}'\
    http://localhost:8080/api/customers)
#grep เเล้วเจอข้อความ error เลย return 0
echo $json | grep "Error"
}

@test "B5823093#1 ค่า firstName เป็น NULL " {
   json=$(curl -s -H "Content-Type: application/json"\
    -X POST \
    -d '{"firstName": null }'\
    http://localhost:8080/api/customers)
#grep เเล้วเจอข้อความ error เลย return 0
echo $json | grep "Error"
}


@test "B5823093#1 ค่า lastName เป็น NULL " {
   json=$(curl -s -H "Content-Type: application/json"\
    -X POST \
    -d '{"lastName": null }'\
    http://localhost:8080/api/customers)
#grep เเล้วเจอข้อความ error เลย return 0
echo $json | grep "Error"
}

@test "B5823093#2 ค่า assure รับค่าต่ำสุดเป็น 100 " {
   json=$(curl -s -H "Content-Type: application/json"\
    -X POST \
    -d '{"assure": 100 }'\
    http://localhost:8080/api/payments)
#grep เเล้วเจอข้อความ error เลย return 0
echo $json | grep "100"
}

@test "B5823093#2 ค่า assure รับค่าต่ำสุดน้อยกว่า 100 " {
   json=$(curl -s -H "Content-Type: application/json"\
    -X POST \
    -d '{"assure": 100 }'\
    http://localhost:8080/api/payments)
#grep เเล้วเจอข้อความ error เลย return 0
echo $json | grep "Error"
}

@test "B5823093#2 ค่า assure เป็น  NULL " {
   json=$(curl -s -H "Content-Type: application/json"\
    -X POST \
    -d '{"assure": null }'\
    http://localhost:8080/api/payments)
#grep เเล้วเจอข้อความ error เลย return 0
echo $json | grep "Error"
}

@test "B5823093#2 ค่า repair รับค่าต่ำสุดคือ  100 " {
   json=$(curl -s -H "Content-Type: application/json"\
    -X POST \
    -d '{"repair": 100 }'\
    http://localhost:8080/api/payments)
#grep เเล้วเจอข้อความ error เลย return 0
echo $json | grep "100"
}

@test "B5823093#2 ค่า repair รับค่าต่ำสุดน้อยกว่า 100 " {
   json=$(curl -s -H "Content-Type: application/json"\
    -X POST \
    -d '{"repair": 100 }'\
    http://localhost:8080/api/payments)
#grep เเล้วเจอข้อความ error เลย return 0
echo $json | grep "Error"
}

@test "B5823093#2 ค่า repair เป็น NULL " {
   json=$(curl -s -H "Content-Type: application/json"\
    -X POST \
    -d '{"repair": null }'\
    http://localhost:8080/api/payments)
#grep เเล้วเจอข้อความ error เลย return 0
echo $json | grep "Error"
}

@test "B5823093#2 ค่า compart รับค่าต่ำสุดคือ  1 " {
   json=$(curl -s -H "Content-Type: application/json"\
    -X POST \
    -d '{"assure": 1 }'\
    http://localhost:8080/api/payments)
#grep เเล้วเจอข้อความ error เลย return 0
echo $json | grep "1"
}

@test "B5823093#2 ค่า compart รับค่าเป็น 0 " {
   json=$(curl -s -H "Content-Type: application/json"\
    -X POST \
    -d '{"assure": 0 }'\
    http://localhost:8080/api/payments)
#grep เเล้วเจอข้อความ error เลย return 0
echo $json | grep "Error"
}

@test "B5823093#2 ค่า compart เป็น NULL " {
   json=$(curl -s -H "Content-Type: application/json"\
    -X POST \
    -d '{"repair": null }'\
    http://localhost:8080/api/payments)
#grep เเล้วเจอข้อความ error เลย return 0
echo $json | grep "Error"
}


@test "B5823093#2 ค่า totalPrice เป็น NULL " {
   json=$(curl -s -H "Content-Type: application/json"\
    -X POST \
    -d '{"totalPrice": null }'\
    http://localhost:8080/api/payments)
#grep เเล้วเจอข้อความ error เลย return 0
echo $json | grep "Error"
}

@test "B5823154#2 กรอกข้อมูล Computer_Case ด้วยตัวเลขถูกต้อง" {
   json=$(curl -s -H "Content-Type: application/json"\
    -X POST \
    -d '{"computer_Case":"1"}'\
    http://localhost:8080/api/checkSparepartses)
echo $json | grep "1"
}

@test "B5823154#2 กรอกข้อมูล Computer_Case ไม่ถูกต้องเป็นช่องว่าง" {
   json=$(curl -s -H "Content-Type: application/json"\
    -X POST \
    -d '{"computer_Case": null}'\
    http://localhost:8080/api/checkSparepartses)

echo $json | grep "Error"
}



@test "B5823154#2 กรอกข้อมูล Computer_Case ไม่ถูกต้องเป็นตัวอักษร" {
   json=$(curl -s -H "Content-Type: application/json"\
    -X POST \
    -d '{"computer_Case":"jvkbjlk"}'\
    http://localhost:8080/api/checkSparepartses)

echo $json | grep "must match"
}


@test "B5823154#2 กรอกข้อมูล Computer_Case ไม่ถูกต้องเกิน0-99" {
   json=$(curl -s -H "Content-Type: application/json"\
    -X POST \
    -d '{"computer_Case":"1234"}'\
    http://localhost:8080/api/checkSparepartses)

echo $json | grep "must match"
}



@test "B5823154#2 กรอกข้อมูล Soundcard ด้วยตัวเลขถูกต้อง" {
   json=$(curl -s -H "Content-Type: application/json"\
    -X POST \
    -d '{"sound_Card":"1"}'\
    http://localhost:8080/api/checkSparepartses)
echo $json | grep "1"
}

@test "B5823154#2 กรอกข้อมูล Soundcard ไม่ถูกต้องเป็นช่องว่าง" {
   json=$(curl -s -H "Content-Type: application/json"\
    -X POST \
    -d '{"sound_Card": null}'\
    http://localhost:8080/api/checkSparepartses)

echo $json | grep "Error"
}



@test "B5823154#2 กรอกข้อมูล Soundcard ไม่ถูกต้องเป็นตัวอักษร" {
   json=$(curl -s -H "Content-Type: application/json"\
    -X POST \
    -d '{"sound_Card":"aaah"}'\
    http://localhost:8080/api/checkSparepartses)

echo $json | grep "must match"
}


@test "B5823154#2 กรอกข้อมูล Soundcard ไม่ถูกต้องเกิน0-99" {
   json=$(curl -s -H "Content-Type: application/json"\
    -X POST \
    -d '{"sound_Card":"1003"}'\
    http://localhost:8080/api/checkSparepartses)

echo $json | grep "must match"
}







