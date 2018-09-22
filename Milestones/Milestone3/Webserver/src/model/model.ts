
export default class Model {
    
    private static temperature: any;
    private static humidity: any;
    private static pir: any;
    private static redLed: any;
    private static greenLed: any;
    private static yellowLed: any;

    public static GetTemperature(): JSON{
        return <JSON> Model.temperature;
    }
    
    public static GetHumidity(): JSON{
        return <JSON> Model.humidity;
    }
    
    public static GetPir(): JSON{
        return <JSON> Model.pir;
    }

    public static GetRedLed(): JSON{
        return <JSON> Model.redLed;
    }

    public static GetGreenLed(): JSON{
        return <JSON> Model.greenLed;
    }

    public static GetYellowLed(): JSON{
        return <JSON> Model.yellowLed;
    }

    public static SetTemperature(info: JSON) {
        return Model.temperature = info;
    }
    
    public static SetHumidity(info: JSON) {
        return Model.humidity = info;
    }
    
    public static SetPir(info: JSON) {
        return Model.pir = info;
    }
    
    public static SetRedLed(info: JSON) {
        return Model.redLed = info;
    }

    public static SetGreenLed(info: JSON) {
        return Model.greenLed = info;
    }

    public static SetYellowLed(info: JSON) {
        return Model.yellowLed = info;
    }
}