//following this: https://stackoverflow.com/questions/42912755/how-to-create-a-db-for-mongodb-container-on-start-up

db.createUser(
  {
      user: "test-user",
      pwd: "test-password",
      roles: [
          {
              role: "readWrite",
              db: "stairlicationDB"
          }
      ]
  }
);

db = db.getSiblingDB('stairlicationDB')

db.createCollection("Buildings")

db.Buildings.insert({
    "building":
        {
            "companyCode": "9999",
            "businessEntity": 234567,
            "buildingID": 81011,
            "zipCode": 98123,
            "city": "Berlin",
            "street": "Müllerstr.",
            "houseNr": "4",
            "rooms": "These are rooms",
            "details": "These are details",
            "validFrom": "2021-08-31",
            "validUntil": "2021-08-31",
            "edit": "This is the qrCode Code",
            "info": "Anzeigen 1"
        },
        "files": {
          "floorplan_0_id": "61f706d1e3467b7b93db79ae",
          "floorplan_1_id": "61f706d1e3467b7b93db79c3",
          "csv_id": "61f706d1e3467b7b93db79d7",
          "dataJSON_id": "61f706d1e3467b7b93db79d9",
          "infoJSON_id": "61f706d1e3467b7b93db79db",
          "thumbnail_id": "61f706d1e3467b7b93db79dd"
        }
})
db.Buildings.insert({
    "building":
        {
            "companyCode": "9999",
            "businessEntity": 234567,
            "buildingID": 81011,
            "zipCode": 74311,
            "city": "München",
            "street": "Müllerstr.",
            "houseNr": "4",
            "rooms": "These are rooms",
            "details": "These are details",
            "validFrom": "2021-08-31",
            "validUntil": "2021-08-31",
            "edit": "This is the qrCode Code",
            "info": "Anzeigen 1"
        },
        "files": {
          "floorplan_0_id": "61f706d1e3467b7b93db79ae",
          "floorplan_1_id": "61f706d1e3467b7b93db79c3",
          "csv_id": "61f706d1e3467b7b93db79d7",
          "dataJSON_id": "61f706d1e3467b7b93db79d9",
          "infoJSON_id": "61f706d1e3467b7b93db79db",
          "thumbnail_id": "61f706d1e3467b7b93db79dd"
        }
})
db.Buildings.insert({
    "building":
        {
            "companyCode": "9999",
            "businessEntity": 234567,
            "buildingID": 81011,
            "zipCode": 11111,
            "city": "München",
            "street": "Müllerstr.",
            "houseNr": "4",
            "rooms": "These are rooms",
            "details": "These are details",
            "validFrom": "2021-08-31",
            "validUntil": "2021-08-31",
            "edit": "This is the qrCode Code",
            "info": "Anzeigen 1"
        },
        "files": {
          "floorplan_0_id": "61f706d1e3467b7b93db79ae",
          "floorplan_1_id": "61f706d1e3467b7b93db79c3",
          "csv_id": "61f706d1e3467b7b93db79d7",
          "dataJSON_id": "61f706d1e3467b7b93db79d9",
          "infoJSON_id": "61f706d1e3467b7b93db79db",
          "thumbnail_id": "61f706d1e3467b7b93db79dd"
        }
})
db.Buildings.insert({
    "building":
        {
            "companyCode": "9999",
            "businessEntity": 234567,
            "buildingID": 81011,
            "zipCode": 22222,
            "city": "München",
            "street": "Müllerstr.",
            "houseNr": "4",
            "rooms": "These are rooms",
            "details": "These are details",
            "validFrom": "2021-08-31",
            "validUntil": "2021-08-31",
            "edit": "This is the qrCode Code",
            "info": "Anzeigen 1"
        },
        "files": {
          "floorplan_0_id": "61f706d1e3467b7b93db79ae",
          "floorplan_1_id": "61f706d1e3467b7b93db79c3",
          "csv_id": "61f706d1e3467b7b93db79d7",
          "dataJSON_id": "61f706d1e3467b7b93db79d9",
          "infoJSON_id": "61f706d1e3467b7b93db79db",
          "thumbnail_id": "61f706d1e3467b7b93db79dd"
        }
})
db.Buildings.insert({
    "building":
        {
            "companyCode": "9999",
            "businessEntity": 234567,
            "buildingID": 81011,
            "zipCode": 33333,
            "city": "München",
            "street": "Müllerstr.",
            "houseNr": "4",
            "rooms": "These are rooms",
            "details": "These are details",
            "validFrom": "2021-08-31",
            "validUntil": "2021-08-31",
            "edit": "This is the qrCode Code",
            "info": "Anzeigen 1"
        },
        "files": {
          "floorplan_0_id": "61f706d1e3467b7b93db79ae",
          "floorplan_1_id": "61f706d1e3467b7b93db79c3",
          "csv_id": "61f706d1e3467b7b93db79d7",
          "dataJSON_id": "61f706d1e3467b7b93db79d9",
          "infoJSON_id": "61f706d1e3467b7b93db79db",
          "thumbnail_id": "61f706d1e3467b7b93db79dd"
        }
})
db.Buildings.insert({
    "building":
        {
            "companyCode": "9999",
            "businessEntity": 234567,
            "buildingID": 81011,
            "zipCode": 44444,
            "city": "München",
            "street": "Müllerstr.",
            "houseNr": "4",
            "rooms": "These are rooms",
            "details": "These are details",
            "validFrom": "2021-08-31",
            "validUntil": "2021-08-31",
            "edit": "This is the qrCode Code",
            "info": "Anzeigen 1"
        },
        "files": {
          "floorplan_0_id": "61f706d1e3467b7b93db79ae",
          "floorplan_1_id": "61f706d1e3467b7b93db79c3",
          "csv_id": "61f706d1e3467b7b93db79d7",
          "dataJSON_id": "61f706d1e3467b7b93db79d9",
          "infoJSON_id": "61f706d1e3467b7b93db79db",
          "thumbnail_id": "61f706d1e3467b7b93db79dd"
        }
})
db.Buildings.insert({
    "building":
        {
            "companyCode": "9999",
            "businessEntity": 234567,
            "buildingID": 81011,
            "zipCode": 55555,
            "city": "München",
            "street": "Müllerstr.",
            "houseNr": "4",
            "rooms": "These are rooms",
            "details": "These are details",
            "validFrom": "2021-08-31",
            "validUntil": "2021-08-31",
            "edit": "This is the qrCode Code",
            "info": "Anzeigen 1"
        },
        "files": {
          "floorplan_0_id": "61f706d1e3467b7b93db79ae",
          "floorplan_1_id": "61f706d1e3467b7b93db79c3",
          "csv_id": "61f706d1e3467b7b93db79d7",
          "dataJSON_id": "61f706d1e3467b7b93db79d9",
          "infoJSON_id": "61f706d1e3467b7b93db79db",
          "thumbnail_id": "61f706d1e3467b7b93db79dd"
        }
})
db.Buildings.insert({
    "building":
        {
            "companyCode": "9999",
            "businessEntity": 234567,
            "buildingID": 81011,
            "zipCode": 66666,
            "city": "München",
            "street": "Müllerstr.",
            "houseNr": "4",
            "rooms": "These are rooms",
            "details": "These are details",
            "validFrom": "2021-08-31",
            "validUntil": "2021-08-31",
            "edit": "This is the qrCode Code",
            "info": "Anzeigen 1"
        },
        "files": {
          "floorplan_0_id": "61f706d1e3467b7b93db79ae",
          "floorplan_1_id": "61f706d1e3467b7b93db79c3",
          "csv_id": "61f706d1e3467b7b93db79d7",
          "dataJSON_id": "61f706d1e3467b7b93db79d9",
          "infoJSON_id": "61f706d1e3467b7b93db79db",
          "thumbnail_id": "61f706d1e3467b7b93db79dd"
        }
})
//this is all mock data
for (let i = 0; i < 100; i++) {
    db.Buildings.insert({
        "building":
            {
                "companyCode": "9999",
                "businessEntity": 234567,
                "buildingID": 81011,
                "zipCode": 12345,
                "city": "Bochum",
                "street": "Müllerstr.",
                "houseNr": "4",
                "rooms": "These are rooms",
                "details": "These are details",
                "validFrom": "2021-08-31",
                "validUntil": "2021-08-31",
                "edit": "This is the qrCode Code",
                "info": "Anzeigen 1"
            },
            "files": {
              "floorplan_0_id": "61f706d1e3467b7b93db79ae",
              "floorplan_1_id": "61f706d1e3467b7b93db79c3",
              "csv_id": "61f706d1e3467b7b93db79d7",
              "dataJSON_id": "61f706d1e3467b7b93db79d9",
              "infoJSON_id": "61f706d1e3467b7b93db79db",
              "thumbnail_id": "61f706d1e3467b7b93db79dd"
            }
    })
  }
