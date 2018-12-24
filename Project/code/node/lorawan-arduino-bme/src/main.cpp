/*******************************************************************************
 * Copyright (c) 2015 Thomas Telkamp and Matthijs Kooijman
 *
 * Permission is hereby granted, free of charge, to anyone
 * obtaining a copy of this document and accompanying files,
 * to do whatever they want with them without any restriction,
 * including, but not limited to, copying, modification and redistribution.
 * NO WARRANTY OF ANY KIND IS PROVIDED.
 *
 * This example sends a valid LoRaWAN packet with payload "Hello,
 * world!", using frequency and encryption settings matching those of
 * the (early prototype version of) The Things Network.
 *
 * Note: LoRaWAN per sub-band duty-cycle limitation is enforced (1% in g1,
 *  0.1% in g2).
 *
 * Change DEVADDR to a unique address!
 * See http://thethingsnetwork.org/wiki/AddressSpace
 *
 * Do not forget to define the radio type correctly in config.h.
 *
 *******************************************************************************/

//#include <Wire.h>
#include <lmic.h>
#include <hal/hal.h>
#include <SPI.h>

#include "Pressure.h"
//#include "LoraEncoder.h"
#include "Movement.h"
#include "Pulse.h"
#include <SoftwareSerial.h>
#include <GPS.h>
#define GPS_RX 12
#define GPS_TX 13
#define HEARTBEAT_PIN A15

//lefthandle(2) righthandle(2) hr(2) lat(4) long(4) mov(1)
#define DATA_SIZE 15
// LoRaWAN NwkSKey, network session key
// This is the default Semtech key, which is used by the prototype TTN
// network initially.
static const PROGMEM u1_t NWKSKEY[16] = {0xAE, 0x27, 0x06, 0x2D, 0xD5, 0x3C, 0x64, 0xEE, 0x38, 0x25, 0x52, 0xAD, 0xB9, 0x35, 0xB8, 0xE6};

// LoRaWAN AppSKey, application session key
// This is the default Semtech key, which is used by the prototype TTN
// network initially.
static const u1_t PROGMEM APPSKEY[16] = {0xB1, 0x8A, 0x0E, 0xE6, 0x37, 0x29, 0xDC, 0xF1, 0xB1, 0x35, 0x72, 0xD3, 0x56, 0x37, 0xF3, 0x1B};

// LoRaWAN end-device address (DevAddr)
// See http://thethingsnetwork.org/wiki/AddressSpace
static const u4_t DEVADDR = 0x26011086; // <-- Change this address for every node!

// void PrintPressure(){
//     PressureData rightHandleData = GetPressure(RightHandle, SensorID::ten);
//     rightHandleData.PrintValues();
// }
//BME280 bme;

// These callbacks are only used in over-the-air activation, so they are
// left empty here (we cannot leave them out completely unless
// DISABLE_JOIN is set in config.h, otherwise the linker will complain).
void os_getArtEui (u1_t* buf) { }
void os_getDevEui (u1_t* buf) { }
void os_getDevKey (u1_t* buf) { }

static uint8_t mydata[DATA_SIZE];
static osjob_t sendjob;

// Schedule TX every this many seconds (might become longer due to duty
// cycle limitations).
const unsigned TX_INTERVAL = 60;

// Pin mapping
const lmic_pinmap lmic_pins = {
    .nss = 10,
    .rxtx = LMIC_UNUSED_PIN,
    .rst = 9,
    .dio = {2, 6, 7},
};

void do_send(osjob_t* j){
    // HX711 RightHandle(52, 53); //Port 9 8
    // PressureData rightHandleData = GetPressure(RightHandle, SensorID::ten);
    // rightHandleData.PrintValues();
    // Check if there is not a current TX/RX job running
    if (LMIC.opmode & OP_TXRXPEND) {
        Serial.println(F("OP_TXRXPEND, not sending"));
    } else {
        // Prepare upstream data transmission at the next possible time.
        LMIC_setTxData2(1, mydata, sizeof(mydata), 0);
        Serial.println(F("Packet queued"));
    }
    // Next TX is scheduled after TX_COMPLETE event.
}

void onEvent (ev_t ev) {
    Serial.print(os_getTime());
    Serial.print(": ");
    switch(ev) {
        case EV_SCAN_TIMEOUT:
            Serial.println(F("EV_SCAN_TIMEOUT"));
            break;
        case EV_BEACON_FOUND:
            Serial.println(F("EV_BEACON_FOUND"));
            break;
        case EV_BEACON_MISSED:
            Serial.println(F("EV_BEACON_MISSED"));
            break;
        case EV_BEACON_TRACKED:
            Serial.println(F("EV_BEACON_TRACKED"));
            break;
        case EV_JOINING:
            Serial.println(F("EV_JOINING"));
            break;
        case EV_JOINED:
            Serial.println(F("EV_JOINED"));
            break;
        case EV_RFU1:
            Serial.println(F("EV_RFU1"));
            break;
        case EV_JOIN_FAILED:
            Serial.println(F("EV_JOIN_FAILED"));
            break;
        case EV_REJOIN_FAILED:
            Serial.println(F("EV_REJOIN_FAILED"));
            break;
            break;
        case EV_TXCOMPLETE:
            Serial.println(F("EV_TXCOMPLETE (includes waiting for RX windows)"));
            if(LMIC.dataLen) {
                // data received in rx slot after tx
                Serial.print(F("Data Received: "));
                Serial.write(LMIC.frame+LMIC.dataBeg, LMIC.dataLen);
                Serial.println();
            }
            // Schedule next transmission
            os_setTimedCallback(&sendjob, os_getTime()+sec2osticks(TX_INTERVAL), do_send);
            break;
        case EV_LOST_TSYNC:
            Serial.println(F("EV_LOST_TSYNC"));
            break;
        case EV_RESET:
            Serial.println(F("EV_RESET"));
            break;
        case EV_RXCOMPLETE:
            // data received in ping slot
            Serial.println(F("EV_RXCOMPLETE"));
            break;
        case EV_LINK_DEAD:
            Serial.println(F("EV_LINK_DEAD"));
            break;
        case EV_LINK_ALIVE:
            Serial.println(F("EV_LINK_ALIVE"));
            break;
         default:
            Serial.println(F("Unknown event"));
            break;
    }
}

////////////OUR STUFF//////////////////
SoftwareSerial gpsSensor(GPS_RX, GPS_TX);         //GPS
MPU9250 accelerometer(Wire, 0x68);                //Port SCL SDA       Accelerometer
HX711 LeftHandle = HX711(34, 35);                 //Port 34 35         Left handle pressure sensor
HX711 RightHandle = HX711(36, 37);                //Port 36 37         Right handle pressure sensor
unsigned long stopTime;
unsigned long maxStoppedTime = 30000;             //30 seconds
////////////OUR STUFF//////////////////

void setup() {
    Serial.begin(9600);

    gpsSensor.begin(9600);

    Serial.println(F("Starting"));

    //Heartbeatpin
    pinMode(HEARTBEAT_PIN, INPUT_PULLUP);

    // LMIC initf
    os_init();

    // Reset the MAC state. Session and pending data transfers will be discarded.
    LMIC_reset();

    // Set static session parameters. Instead of dynamically establishing a session
    // by joining the network, precomputed session parameters are be provided.
    #ifdef PROGMEM
    // On AVR, these values are stored in flash and only copied to RAM
    // once. Copy them to a temporary buffer here, LMIC_setSession will
    // copy them into a buffer of its own again.
    uint8_t appskey[sizeof(APPSKEY)];
    uint8_t nwkskey[sizeof(NWKSKEY)];
    memcpy_P(appskey, APPSKEY, sizeof(APPSKEY));
    memcpy_P(nwkskey, NWKSKEY, sizeof(NWKSKEY));
    LMIC_setSession (0x1, DEVADDR, nwkskey, appskey);
    #else
    // If not running an AVR with PROGMEM, just use the arrays directly 
    LMIC_setSession (0x1, DEVADDR, NWKSKEY, APPSKEY);
    #endif

    // Set up the channels used by the Things Network, which corresponds
    // to the defaults of most gateways. Without this, only three base
    // channels from the LoRaWAN specification are used, which certainly
    // works, so it is good for debugging, but can overload those
    // frequencies, so be sure to configure the full frequency range of
    // your network here (unless your network autoconfigures them).
    // Setting up channels should happen after LMIC_setSession, as that
    // configures the minimal channel set.
    LMIC_setupChannel(0, 868100000, DR_RANGE_MAP(DR_SF12, DR_SF7),  BAND_CENTI);      // g-band
    LMIC_setupChannel(1, 868300000, DR_RANGE_MAP(DR_SF12, DR_SF7B), BAND_CENTI);      // g-band
    LMIC_setupChannel(2, 868500000, DR_RANGE_MAP(DR_SF12, DR_SF7),  BAND_CENTI);      // g-band
    LMIC_setupChannel(3, 867100000, DR_RANGE_MAP(DR_SF12, DR_SF7),  BAND_CENTI);      // g-band
    LMIC_setupChannel(4, 867300000, DR_RANGE_MAP(DR_SF12, DR_SF7),  BAND_CENTI);      // g-band
    LMIC_setupChannel(5, 867500000, DR_RANGE_MAP(DR_SF12, DR_SF7),  BAND_CENTI);      // g-band
    LMIC_setupChannel(6, 867700000, DR_RANGE_MAP(DR_SF12, DR_SF7),  BAND_CENTI);      // g-band
    LMIC_setupChannel(7, 867900000, DR_RANGE_MAP(DR_SF12, DR_SF7),  BAND_CENTI);      // g-band
    LMIC_setupChannel(8, 868800000, DR_RANGE_MAP(DR_FSK,  DR_FSK),  BAND_MILLI);      // g2-band

    // TTN defines an additional channel at 869.525Mhz using SF9 for class B
    // devices' ping slots. LMIC does not have an easy way to define set this
    // frequency and support for class B is spotty and untested, so this
    // frequency is not configured here.

    // Disable link check validation
    LMIC_setLinkCheckMode(0);

    // Set data rate and transmit power (note: txpow seems to be ignored by the library)
    LMIC_setDrTxpow(DR_SF7,14);

    ////////////OUR STUFF//////////////////

    // start communication with Accelerometer
    int status = accelerometer.begin();
    if (status < 0)
    {
        Serial.println(status);
        Serial.println("accelerometer setup failed");
        while (1)
        {
        }
    }
    Serial.println("accelerometer setup was successful");
    ///////////**///////////////////

}

int PollSensors(){
    /*---------------ACCELEROMETER DATA--------------------*/
    Serial.println("Getting Accelerometer data...");
    bool isMoving = IsMoving(accelerometer); //Get Accelerometer data
    /*-----------------------------------------------------*/

    if (!isMoving){
        Serial.print("Walker is Stopped");

        if (stopTime == 0) {
            Serial.println("Just Stopped");
            stopTime = millis();
        } else if(millis() - stopTime > maxStoppedTime){
            Serial.println("Been stopped for a while, dont read sensors");
            return 0;
        }
    }
    else {
        stopTime = 0;
    }

    Serial.println("Walker is active");

    /*---------------PRESSURE DATA--------------------*/
    // Serial.println("Getting Pressure data...");
    PressureData rightHandleData = GetPressure(RightHandle, SensorID::ten);
    PressureData leftHandleData = GetPressure(LeftHandle, SensorID::four_black);

    // translate float value to int 16 bit *100 get rid of the .
    int16_t rightAvg = (int16_t)(rightHandleData.GetAvg() * 100);
    int16_t leftAvg = (int16_t)(leftHandleData.GetAvg() * 100);
    rightAvg-=0;
    leftAvg-=0;
    if (rightAvg < 0)
        rightAvg = 0;
    if (leftAvg < 0)
        leftAvg = 0;
    Serial.println(rightAvg);
    Serial.println(leftAvg);

    /*------------------------------------------------*/

    /*---------------GPS DATA--------------------*/
    Serial.println("Getting GPS data...");
    String out = "";
    while (gpsSensor.available() > 0){
        // get the byte data from the GPS
        byte gpsData = gpsSensor.read();
        char h = (char)gpsData;
        out+= h;
    }
    ParseGpsData(out);
    int32_t latitude,longitude;
    latitude = GetLatitude();
    longitude = GetLongitude();
    /*-------------------------------------------*/

    /*---------------HEART RATE DATA---------------------*/
    Serial.println("Getting Heart Rate data...");
    int16_t avgHR;
    // if (isMoving == true)
    // {
    avgHR = (int16_t)GetAvgHRMain(HEARTBEAT_PIN); //Get Accelerometer data
    // }
    // else
    // {
    //     avgHR = (int16_t)0;
    // }
    /*---------------------------------------------------*/

    // /*---------------MOCK DATA (13 bytes)-------------*/
    // int16_t rightAvg = 60;
    // int16_t rightMax = 75;
    // int16_t rightMin = 30;
    // int16_t leftAvg = 45;
    // int16_t leftMax = 64;
    // int16_t leftMin = 12;
    // int16_t avgHR = 60;
    // bool isMoving = 1;
    /*---------------------------------------------------*/

    Serial.print("Right handle avg: ");
    Serial.println(rightAvg);
    Serial.print("Left handle avg: ");
    Serial.println(leftAvg);
    Serial.print("avgHR: ");
    Serial.println(avgHR);
    Serial.print("Latitude: ");
    Serial.println(latitude);
    Serial.print("Longitude: ");
    Serial.println(longitude);
    Serial.print("isMoving: ");
    Serial.println(isMoving);

    mydata[0] = (rightAvg >> 8) & 0xFF; //rightAvg
    mydata[1] = rightAvg & 0xFF;
    mydata[2] = (leftAvg >> 8) & 0xFF; //leftAvg
    mydata[3] = leftAvg & 0xFF;
    mydata[4] = (avgHR >> 8) & 0xFF; //avgHR
    mydata[5] = avgHR & 0xFF;
    mydata[6] = (latitude >> 24) & 0xFF;
    mydata[7] = (latitude >> 16) & 0xFF;
    mydata[8] = (latitude >> 8) & 0xFF;
    mydata[9] = latitude & 0xFF;
    mydata[10] = (longitude >> 24) & 0xFF;
    mydata[11] = (longitude >> 16) & 0xFF;
    mydata[12] = (longitude >> 8) & 0xFF;
    mydata[13] = longitude & 0xFF;
    mydata[14] = isMoving & 0xFF; //isMoving

    return 1;
}

void loop()
{
    if (PollSensors())
    {
        // Start job
        do_send(&sendjob);

        os_runloop_once();
    }
    delay(15000);
}