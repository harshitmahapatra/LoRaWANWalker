import { pi } from "./resources.json";
import * as plugins from "../plugins/plugins"


setInterval(PoolSensors, 500);

function PoolSensors() : void{
    UpdateTemperature();
    UpdateHumidity();
    UpdatePIR();
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

function GetLEDInfoByColor(color: string){
    if (color == 'red') {
        return pi.actuators.leds["1"];
    } else if (color == 'yellow') {
        return pi.actuators.leds["2"];
    } else {
        return pi.actuators.leds["3"];
    }
}

function SetLEDState(color: string, value : number) : void {
    let led = plugins.GetLEDByColor(color);
    led.writeSync(value);
    GetLEDInfoByColor(color).value = !!value;
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
    GetLEDInfoByColor, SetLEDState, GetPIRInfo, GetAllData
};
