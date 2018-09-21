
export default class Model {
    
    private static temperature: any;
    private static humidity: any;
    private static pir: any;

    public static GetTemperature(): JSON{
        return <JSON> Model.temperature;
    }
    
    public static GetHumidity(): JSON{
        return <JSON> Model.humidity;
    }
    
    public static GetPir(): JSON{
        return <JSON> Model.pir;
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
}