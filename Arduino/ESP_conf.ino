
#include <ESP8266WiFi.h>
#include <PubSubClient.h>

//Credenciales para la red
int contconecxion = 0;
const char *ssid = "Gerardoz";
const char *pass = "gera1234";

//Calculo de delay para la conexion con MQTT
unsigned long prevmillis = 0;

//Credenciales para la conexion con MQTT
char SERVER[50] = "soldier.cloudmqtt.com";
int SERVERPORT = 12885;
String USERNAME = "Mesa1";
char PASSWORD[50] = "Mesa1rest";

//Data del borker al que conectarse
char ESTADO[50];
char PLACA[50];

//Variables del dato que se enviara a CloudMQTT
char valueEstado[20];
String strtemp = "";

//Pins de estado
int pin1 = 4;
int pin2 = 5;
int val = 16;

//------------------------Conexion a Wifi--------------------------------
WiFiClient wifi;
PubSubClient client(wifi);

//----------------------------Callback-----------------------------------
void callback(char *topic, byte *payload, unsigned int lenght)
{
    char PAYLOAD[5] = "";

    Serial.print("Mensaje Recibido: ");
    Serial.print(topic);

    for (int i = 0; i < lenght; i++)
    {
        PAYLOAD[i] = (char)payload[i];
    }

    Serial.print(PAYLOAD);
}

//----------------------------Reconnect-----------------------------------
void reconnect()
{
    uint8_t retries = 3;
    //loop hasta conectarse
    Serial.print("Intentando conectarse a MQTT");
    while (!client.connected())
    {
        Serial.print(".");
        String clientid = "ESP8266Client-";
        //Crea un id de cliente al azar
        clientid += String(random(0xffff), HEX);
        //Attemp to connect
        USERNAME.toCharArray(PLACA, 50);
        if (client.connect("", PLACA, PASSWORD))
        {
            Serial.println("Conectado");
        }
        else
        {
            Serial.print("fallo, rc=");
            Serial.print(client.state());
            Serial.println("intenta nuevamente en 5segundos");
            delay(5000);
        }
        retries--;
        if (retries == 0)
        {
            while (1)
                ;
        }
    }
}

void setup()
{
    //setup pins
    pinMode(pin1, INPUT);
    pinMode(pin2, INPUT);
    pinMode(val, INPUT);
    
    // put your setup code here, to run once:
    Serial.begin(9600);

    //conexion wifi
    WiFi.begin(ssid, pass);
    Serial.print("Conectando a wifi");
    while (WiFi.status() != WL_CONNECTED and contconecxion < 50)
    {
        ++contconecxion;
        delay(500);
        Serial.print(".");
    }

    client.setServer(SERVER, SERVERPORT);
    client.setCallback(callback);

    String estado = USERNAME + "/" + "estado";
    estado.toCharArray(ESTADO, 50);
}

void loop()
{
    // put your main code here, to run repeatedly:
    if (!(bool)client.connected())
    {
        reconnect();
    }
    client.loop();

    unsigned long currentmillis = millis();

    if (currentmillis - prevmillis >= 1000)
    {
        prevmillis = currentmillis;
        if(digitalRead(pin1) == LOW && digitalRead(pin2) == LOW && digitalRead(val) == HIGH){
          strtemp = "Azul";
          strtemp.toCharArray(valueEstado, 20);
          client.publish(ESTADO, valueEstado);
        }else if(digitalRead(pin1) == LOW && digitalRead(pin2) == HIGH && digitalRead(val) == HIGH){
          strtemp = "Rojo";
          strtemp.toCharArray(valueEstado, 20);
          client.publish(ESTADO, valueEstado);
        }else if(digitalRead(pin1) == HIGH && digitalRead(pin2) == LOW && digitalRead(val) == HIGH){
          strtemp = "Verde";
          strtemp.toCharArray(valueEstado, 20);
          client.publish(ESTADO, valueEstado);
        }else if(digitalRead(pin1) == HIGH && digitalRead(pin2) == HIGH && digitalRead(val) == HIGH){
          strtemp = "Vacio";
          strtemp.toCharArray(valueEstado, 20);
          client.publish(ESTADO, valueEstado);
        }
        
    }

}
