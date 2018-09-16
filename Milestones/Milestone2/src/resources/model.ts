//import { Gpio } from "onoff";
import * as resources from "./resources.json";
import * as plugins from "../plugins/plugins"


setInterval(PoolSensors, 100);

function PoolSensors() : void{
    UpdateTemperature();
    UpdateHumidity();
    UpdatePIR();
}

function UpdateTemperature(){
    resources.pi.sensors.temperature.value = plugins.TakeTemperature();
}
function UpdateHumidity(){
    resources.pi.sensors.humidity.value = plugins.TakeHumidity();
}
function UpdatePIR(){
    resources.pi.sensors.pir.value = (plugins.TakePIR() == 1) ? true : false;
}

function GetLEDInfoByColor(color: string){
    if (color == 'red') {
        return resources.pi.actuators.leds["1"];
    } else if (color == 'yellow') {
        return resources.pi.actuators.leds["2"];
    } else {
        return resources.pi.actuators.leds["3"];
    }
}

function SetLEDState(color: string, value : number) : void {
    let led = plugins.GetLEDByColor(color);
    led.writeSync(value);
    GetLEDInfoByColor(color).value = !!value;
}

function GetPIRInfo() {
    return resources.pi.sensors.pir;
}

function GetTemperature(){
    return resources.pi.sensors.temperature;
}

function GetHumidity() {
    return resources.pi.sensors.humidity;
}

function GetAllSensorData(){
    return resources.pi.sensors;
}

function GetAllLEDInfo() {
    return resources.pi.actuators;
}

function GetAllData(){
    return resources.pi;
}

export { 
    GetAllLEDInfo, GetAllSensorData, GetTemperature, GetHumidity, 
    GetLEDInfoByColor, SetLEDState, GetPIRInfo, GetAllData
};
