import sys
import serial
import serial.tools.list_ports

def set_led(port, led, state):
    ser = serial.Serial(port, 115200, timeout=1)
    ser.write(f'{led}{state}\r'.encode())
    ser.close()

ports = serial.tools.list_ports.comports()

device_port = None

for port in sorted(ports):
    if port.vid  == 0x239A and port.pid== 0x80F4:
        device_port = port
        print("Found device on port: " + port.device)

if device_port == None:
    print("Cannot find device")
    quit()

if len(sys.argv) == 1:
    print("No arguments")
    quit()

mode = sys.argv[1]

if mode == "led":
    if len(sys.argv) == 3 or len(sys.argv) == 4:
        led = int(sys.argv[2])
        if led < 0 or led > 1:
            print("Invalid LED number")
            quit()
        state = "ON"
        if len(sys.argv) == 4:
            state = sys.argv[3].upper()
            if state != "ON" and state != "OFF":
                print("Invalid state")
                quit()
        set_led(device_port.device, led, state)
    else:
        print("No LED specified")
        quit()
