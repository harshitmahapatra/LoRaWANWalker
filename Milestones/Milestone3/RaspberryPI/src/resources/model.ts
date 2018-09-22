import { pi } from "./resources.json";
import * as plugins from "../plugins/plugins"


setInterval(PoolSensors, 200);

function PoolSensors() : void{
    UpdateTemperature();
    UpdateHumidity();
    UpdatePIR();
    UpdateLEDs();
}

function UpdateTemperature(){
    pi.sensors.temperature.value = plugins.TakeTemperature();
}
function UpdateHumidity(){
    pi.sensors.humidity.value = plugins.TakeHumidity();
}
function UpdatePIR(){
    pi.sensors.pir.value = (plugins.TakePIR() == 1) ? true : false;
}

function UpdateLEDs() {
    pi.actuators.leds.red.value = !!plugins.GetLedState('red');
    pi.actuators.leds.green.value = !!plugins.GetLedState('green');
    pi.actuators.leds.yellow.value = !!plugins.GetLedState('yellow');
}

function GetLEDInfo(color: string){
    if (color == 'red') {
        return pi.actuators.leds.red;
    } else if (color == 'yellow') {
        return pi.actuators.leds.yellow;
    } else {
        return pi.actuators.leds.green;
    }
}

function SetLEDState(color: string, value : number) : void {
    let led = plugins.SetLedState(color, value);
}

function GetPIRInfo() {
    return pi.sensors.pir;
}

function GetTemperature(){
    return pi.sensors.temperature;
}

function GetHumidity() {
    return pi.sensors.humidity;
}

function GetAllSensorData(){
    return pi.sensors;
}

function GetAllLEDInfo() {
    return pi.actuators;
}

function GetAllData(){
    return pi;
}

export { 
    GetAllLEDInfo, GetAllSensorData, GetTemperature, GetHumidity, 
    GetLEDInfo, SetLEDState, GetPIRInfo, GetAllData
};
